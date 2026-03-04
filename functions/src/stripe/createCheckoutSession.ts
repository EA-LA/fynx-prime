import * as functions from "firebase-functions";
import Stripe from "stripe";
import { PRICE_MAP } from "./priceMap";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret_key || "", {
  apiVersion: "2023-10-16" as any,
});

/**
 * POST /api/stripe/create-checkout-session
 * Body: { accountSize: "100k", phase: "1", email: "user@email.com", style?: string, currency?: string }
 */
export const createCheckoutSession = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const { accountSize, phase, email, style, currency } = req.body;

    if (!accountSize || !phase || !email) {
      res.status(400).json({ error: "Missing required fields: accountSize, phase, email" });
      return;
    }

    const key = `${accountSize}_${phase}`;
    const priceId = PRICE_MAP[key];

    if (!priceId) {
      res.status(400).json({ error: `Invalid plan: ${key}. No matching Stripe price.` });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        accountSize,
        phase,
        style: style || "normal",
        currency: currency || "USD",
        email,
      },
      success_url: "https://elhamamini.cc/fynx-prime/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://elhamamini.cc/fynx-prime/checkout",
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    console.error("[Stripe] createCheckoutSession error:", err);
    res.status(500).json({ error: err.message || "Failed to create checkout session" });
  }
});
