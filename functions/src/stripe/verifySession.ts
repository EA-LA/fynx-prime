import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret_key || "", {
  apiVersion: "2023-10-16" as any,
});

/**
 * POST /api/stripe/verify-session
 * Body: { sessionId: string }
 * Returns order data if payment is confirmed.
 */
export const verifySession = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const { sessionId } = req.body;
    if (!sessionId) { res.status(400).json({ error: "Missing sessionId" }); return; }

    // Verify with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      res.status(402).json({ error: "Payment not completed", status: session.payment_status });
      return;
    }

    // Find order in Firestore by stripeSessionId
    const db = admin.firestore();
    const snap = await db.collection("orders")
      .where("stripeSessionId", "==", sessionId)
      .limit(1)
      .get();

    if (snap.empty) {
      // Webhook may not have fired yet — return Stripe confirmation
      res.json({
        verified: true,
        status: "paid",
        order: null,
        message: "Payment confirmed by Stripe. Order is being processed.",
      });
      return;
    }

    const orderDoc = snap.docs[0];
    const order = { ...orderDoc.data(), orderId: orderDoc.id };

    res.json({ verified: true, status: "paid", order });
  } catch (err: any) {
    console.error("[Stripe] verifySession error:", err);
    res.status(500).json({ error: err.message || "Verification failed" });
  }
});
