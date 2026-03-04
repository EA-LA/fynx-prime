// ═══════════════════════════════════════════════════════════
// PAYMENT SERVICE — Receipt / Invoice utilities
// ═══════════════════════════════════════════════════════════
// All actual payment processing happens server-side via
// Firebase Cloud Functions (Stripe, PayPal).
// This file only contains client-side receipt generation.

import type { Order, PaymentMethodType } from "./types";

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
