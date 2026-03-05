import * as functions from "firebase-functions";

const PAYPAL_API = process.env.PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || functions.config().paypal?.client_id || "";
  const clientSecret = process.env.PAYPAL_SECRET || functions.config().paypal?.secret || "";

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

/**
 * POST — Create PayPal order
 * Body: { amount, currency, orderData }
 */
export const createPayPalOrder = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const { amount, currency = "USD", orderData } = req.body;
    if (!amount) { res.status(400).json({ error: "Missing amount" }); return; }

    const accessToken = await getAccessToken();

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: currency, value: String(amount) },
          description: orderData?.challenge || "FYNX Funded Challenge",
          custom_id: JSON.stringify({
            userId: orderData?.userId || "",
            accountSize: orderData?.accountSize || 0,
            phase: orderData?.phase || "",
            style: orderData?.style || "normal",
          }),
        }],
      }),
    });

    if (!orderRes.ok) {
      const txt = await orderRes.text();
      console.error("[PayPal] Create order failed:", txt);
      res.status(500).json({ error: "Failed to create PayPal order" });
      return;
    }

    const order = await orderRes.json();
    res.json({ id: order.id, status: order.status });
  } catch (err: any) {
    console.error("[PayPal] createOrder error:", err);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
});
