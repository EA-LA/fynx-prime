// ═══════════════════════════════════════════════════════════
// PAYMENT SERVICE — Stripe / PayPal / Crypto ready
// ═══════════════════════════════════════════════════════════
// Each payment method is a plug-in adapter. Replace the
// placeholder with real SDK calls.

import type { Order, PaymentMethodType, OrderStatus } from "./types";
import { dataService } from "./database";

export interface CheckoutSession {
  sessionId: string;
  orderId: string;
  redirectUrl?: string;
  walletAddress?: string;
  status: OrderStatus;
}

export interface PaymentProvider {
  createCheckoutSession(order: Omit<Order, "orderId" | "status" | "paidAt">, method: PaymentMethodType): Promise<CheckoutSession>;
  confirmPayment(sessionId: string): Promise<{ status: OrderStatus; orderId: string }>;
  handleWebhook(event: Record<string, unknown>): Promise<void>;
}

// ── Placeholder adapter ───────────────────────────────────

class LocalPaymentProvider implements PaymentProvider {
  async createCheckoutSession(
    orderData: Omit<Order, "orderId" | "status" | "paidAt">,
    method: PaymentMethodType
  ): Promise<CheckoutSession> {
    // 🔌 Replace per method:
    //   card   → Stripe.checkout.sessions.create(...)
    //   paypal → PayPal Orders API
    //   apple  → Stripe with Apple Pay payment method
    //   crypto → Coinbase Commerce charges.create(...)

    const order = await dataService.createOrder({
      ...orderData,
      paymentMethod: method,
      status: "pending",
    });

    return {
      sessionId: `sess_${Date.now().toString(36)}`,
      orderId: order.orderId,
      status: "pending",
      redirectUrl: method === "paypal" ? "https://paypal.com/checkout" : undefined,
      walletAddress: method === "crypto" ? "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38" : undefined,
    };
  }

  async confirmPayment(sessionId: string): Promise<{ status: OrderStatus; orderId: string }> {
    // 🔌 Replace with: Stripe.checkout.sessions.retrieve(sessionId)
    // For now, simulate success
    const orders = await dataService.getOrders("");
    const latestOrder = orders[orders.length - 1];
    if (latestOrder) {
      await dataService.updateOrderStatus(latestOrder.orderId, "paid");
      return { status: "paid", orderId: latestOrder.orderId };
    }
    return { status: "failed", orderId: "" };
  }

  async handleWebhook(event: Record<string, unknown>): Promise<void> {
    // 🔌 Replace with real webhook handler:
    //   Stripe: stripe.webhooks.constructEvent(...)
    //   PayPal: verify webhook signature
    //   Crypto: Coinbase Commerce webhook verification
    console.log("[PaymentProvider] Webhook received:", event);

    const type = event.type as string;
    const orderId = event.orderId as string;

    if (type === "payment.succeeded") {
      await dataService.updateOrderStatus(orderId, "paid");
    } else if (type === "payment.failed") {
      await dataService.updateOrderStatus(orderId, "failed");
    } else if (type === "payment.refunded") {
      await dataService.updateOrderStatus(orderId, "refunded");
    }
  }
}

export const paymentProvider: PaymentProvider = new LocalPaymentProvider();

// ── Receipt / Invoice generator ───────────────────────────

export function generateReceipt(order: Order): string {
  return `
═══════════════════════════════════════
         FYNX FUNDED — RECEIPT
═══════════════════════════════════════

Company:      FYNX Funded
Website:      www.fynxfunded.com
Email:        support@fynxfunded.com

───────────────────────────────────────
ORDER DETAILS
───────────────────────────────────────

Order ID:     ${order.orderId}
Date:         ${new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Status:       ${order.status.toUpperCase()}

Challenge:    ${order.challenge}
Account Size: $${order.accountSize.toLocaleString()}
Currency:     ${order.currency}
Style:        ${order.style === "swing" ? "Swing" : "Normal"}

───────────────────────────────────────
PAYMENT
───────────────────────────────────────

Method:       ${formatPaymentMethod(order.paymentMethod)}
Amount:       $${order.amount}
Status:       ${order.status.toUpperCase()}

═══════════════════════════════════════
This is a simulated trading evaluation.
No real capital is at risk. Performance-
based payouts are subject to meeting
all challenge objectives and KYC.
═══════════════════════════════════════
  `.trim();
}

function formatPaymentMethod(method: PaymentMethodType): string {
  const map: Record<PaymentMethodType, string> = {
    card: "Credit/Debit Card",
    paypal: "PayPal",
    apple: "Apple Pay",
    crypto: "Cryptocurrency",
  };
  return map[method] || method;
}

export function downloadReceipt(order: Order) {
  const receipt = generateReceipt(order);
  const blob = new Blob([receipt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `FYNX-Receipt-${order.orderId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
