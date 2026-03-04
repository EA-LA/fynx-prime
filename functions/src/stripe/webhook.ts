import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret_key || "", {
  apiVersion: "2023-10-16" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || functions.config().stripe?.webhook_secret || "";

/**
 * POST /api/stripe/webhook
 * Stripe sends checkout.session.completed events here.
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") { res.status(405).send("Method not allowed"); return; }

  const signature = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

  res.status(200).json({ received: true });
});

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const db = admin.firestore();
  const meta = session.metadata || {};
  const email = session.customer_email || meta.email || "";
  const accountSize = meta.accountSize || "";
  const phase = meta.phase || "";
  const style = meta.style || "normal";
  const currency = meta.currency || "USD";

  // Find user by email
  let userId = "";
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    userId = userRecord.uid;
  } catch {
    console.warn(`[Stripe Webhook] No Firebase user found for email: ${email}`);
    // Order will still be created with empty userId — can be linked later
  }

  const accountSizeNum = parseAccountSize(accountSize);
  const phaseLabel = `${phase}-phase`;
  const challengeName = `$${accountSize.toUpperCase()} ${phaseLabel.replace("-", " ")}`;

  // Create order
  const orderRef = await db.collection("orders").add({
    userId,
    challengeId: "",
    amount: (session.amount_total || 0) / 100,
    currency,
    paymentMethod: "card",
    status: "paid",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    paidAt: admin.firestore.FieldValue.serverTimestamp(),
    challenge: challengeName,
    accountSize: accountSizeNum,
    phase: phaseLabel,
    style,
    stripeSessionId: session.id,
    stripePaymentIntentId: session.payment_intent,
  });

  // Create challenge
  const challengeRef = await db.collection("challenges").add({
    userId,
    orderId: orderRef.id,
    name: challengeName,
    phase: phaseLabel,
    accountSize: accountSizeNum,
    style,
    status: "active",
    startDate: admin.firestore.FieldValue.serverTimestamp(),
    brokerAccountId: null,
    currency,
  });

  // Link challenge back to order
  await orderRef.update({ challengeId: challengeRef.id });

  console.log(`[Stripe Webhook] Order ${orderRef.id} + Challenge ${challengeRef.id} created for ${email}`);
}

function parseAccountSize(size: string): number {
  const map: Record<string, number> = {
    "5k": 5000, "10k": 10000, "25k": 25000,
    "50k": 50000, "100k": 100000, "200k": 200000,
  };
  return map[size.toLowerCase()] || 0;
}
