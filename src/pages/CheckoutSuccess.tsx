import { Link } from "react-router-dom";
import { CheckCircle2, Download, ArrowRight, FileText } from "lucide-react";

export default function CheckoutSuccess() {
  const raw = localStorage.getItem("fynx_last_order");
  const order = raw ? JSON.parse(raw) : null;

  const handleDownloadReceipt = () => {
    if (!order) return;
    const receipt = `
═══════════════════════════════════════
         FYNX FUNDED — RECEIPT
═══════════════════════════════════════

Company:      FYNX Funded
Website:      www.fynxfunded.com
Email:        support@fynxfunded.com

───────────────────────────────────────
ORDER DETAILS
───────────────────────────────────────

Order ID:     ${order.id}
Date:         ${new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Status:       ${order.status}

Challenge:    ${order.challenge}
Account Size: $${order.accountSize?.toLocaleString()}
Currency:     ${order.currency}
Style:        ${order.style === "swing" ? "Swing" : "Normal"}

───────────────────────────────────────
PAYMENT
───────────────────────────────────────

Method:       ${order.method}
Amount:       $${order.amount}
Status:       Paid

═══════════════════════════════════════
This is a simulated trading evaluation.
No real capital is at risk. Performance-
based payouts are subject to meeting
all challenge objectives and KYC.
═══════════════════════════════════════
    `.trim();

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FYNX-Receipt-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No order found.</p>
          <Link to="/challenge-builder" className="text-sm text-foreground underline">Go to Challenge Builder</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Thank you for your purchase</h1>
          <p className="text-sm text-muted-foreground mt-2">Your challenge has been created successfully.</p>
        </div>

        <div className="premium-card space-y-3 text-sm mb-6">
          <DetailRow label="Order ID" value={order.id} mono />
          <DetailRow label="Challenge" value={order.challenge} />
          <DetailRow label="Amount" value={`$${order.amount}`} />
          <DetailRow label="Payment Method" value={order.method} />
          <DetailRow label="Date" value={new Date(order.date).toLocaleDateString()} />
          <DetailRow label="Status" value={order.status} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 border border-border px-4 py-2.5 rounded-md text-sm font-medium hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2"
          >
            <Download size={14} /> Download Receipt
          </button>
          <Link
            to="/dashboard"
            className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            Go to Dashboard <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-6 p-3 rounded-md border border-border bg-secondary/30">
          <div className="flex items-start gap-2">
            <FileText size={14} className="text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              A confirmation has been sent to your email. Your trading account credentials will be available in your dashboard within minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
