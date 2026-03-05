import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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
 * POST — Capture PayPal order after buyer approval
 * Body: { paypalOrderId }
 */
export const capturePayPalOrder = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const { paypalOrderId } = req.body;
    if (!paypalOrderId) { res.status(400).json({ error: "Missing paypalOrderId" }); return; }

    const accessToken = await getAccessToken();

    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!captureRes.ok) {
      const txt = await captureRes.text();
      console.error("[PayPal] Capture failed:", txt);
      res.status(500).json({ error: "Failed to capture PayPal order" });
      return;
    }

    const captureData = await captureRes.json();

    if (captureData.status === "COMPLETED") {
      // Extract metadata from custom_id
      const purchaseUnit = captureData.purchase_units?.[0];
      let meta: any = {};
      try {
        meta = JSON.parse(purchaseUnit?.payments?.captures?.[0]?.custom_id || purchaseUnit?.custom_id || "{}");
      } catch {}

      const amount = parseFloat(purchaseUnit?.payments?.captures?.[0]?.amount?.value || "0");
      const currency = purchaseUnit?.payments?.captures?.[0]?.amount?.currency_code || "USD";

      // Create order + challenge in Firestore
      const db = admin.firestore();
      const userId = meta.userId || "";
      const accountSize = meta.accountSize || 0;
      const phase = meta.phase || "";
      const style = meta.style || "normal";
      const challengeName = `$${accountSize >= 1000 ? `${accountSize / 1000}K` : accountSize} ${phase.replace("-", " ")}`;

      const orderRef = await db.collection("orders").add({
        userId,
        challengeId: "",
        amount,
        currency,
        paymentMethod: "paypal",
        status: "paid",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
        challenge: challengeName,
        accountSize,
        phase,
        style,
        paypalOrderId,
      });

      const challengeRef = await db.collection("challenges").add({
        userId,
        orderId: orderRef.id,
        name: challengeName,
        phase,
        accountSize,
        style,
        status: "active",
        startDate: admin.firestore.FieldValue.serverTimestamp(),
        brokerAccountId: null,
        currency,
      });

      await orderRef.update({ challengeId: challengeRef.id });

      console.log(`[PayPal] Order ${orderRef.id} + Challenge ${challengeRef.id} created`);
      res.json({ status: "COMPLETED", orderId: orderRef.id, challengeId: challengeRef.id });
    } else {
      res.json({ status: captureData.status });
    }
  } catch (err: any) {
    console.error("[PayPal] captureOrder error:", err);
    res.status(500).json({ error: err.message || "Failed to capture order" });
  }
});
