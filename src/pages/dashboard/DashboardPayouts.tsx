import { useState, useEffect } from "react";
import { useTradingData } from "@/hooks/use-trading-data";
import { CreditCard, Wallet, ShieldAlert, CheckCircle2, Clock, BookOpen } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { canRequestPayout, getUserPayouts, requestPayout } from "@/services/payouts";
import type { PayoutRequest } from "@/services/types";

export default function DashboardPayouts() {
  const { hasAccount, payout } = useTradingData();
  const { user } = useAuth();
  const [kycAllowed, setKycAllowed] = useState(false);
  const [kycReason, setKycReason] = useState("");
  const [payoutHistory, setPayoutHistory] = useState<PayoutRequest[]>([]);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("Bank Card");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      canRequestPayout(user.userId).then((result) => {
        setKycAllowed(result.allowed);
        setKycReason(result.reason || "");
      }).catch(console.error);

      getUserPayouts(user.userId).then(setPayoutHistory).catch(console.error);
    }
  }, [user?.userId]);

  const isVerified = kycAllowed;

  const handleRequestPayout = async () => {
    if (!user?.userId || !payoutAmount) return;
    setSubmitting(true);
    try {
      await requestPayout({
        userId: user.userId,
        accountId: "",
        amount: parseFloat(payoutAmount),
        method: payoutMethod,
      });
      const updated = await getUserPayouts(user.userId);
      setPayoutHistory(updated);
      setPayoutAmount("");
    } catch (err) {
      console.error("[Payouts] Request failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasAccount || !payout) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
          <p className="text-sm text-muted-foreground mt-1">Request payouts and view history.</p>
        </div>

        {/* KYC Requirement */}
        <div className="premium-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <ShieldAlert size={20} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">KYC Verification Required</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Identity verification must be completed before any payout can be requested.
              </p>
            </div>
          </div>
        </div>

        {/* Payout Rules */}
        <div className="premium-card">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-muted-foreground" />
            <h3 className="text-sm font-semibold">Payout Rules</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <RuleBox label="Profit Split" value="Up to 90%" desc="Based on your challenge tier" />
            <RuleBox label="Payout Schedule" value="Bi-weekly" desc="Every 14 calendar days" />
            <RuleBox label="Min Trading Days" value="5 days" desc="Must be met before first payout" />
            <RuleBox label="KYC Required" value="Yes" desc="Identity verification mandatory" />
          </div>
        </div>

        <EmptyState
          icon={<Wallet size={24} />}
          title="No payout data"
          description="Payout information will be available once you have a funded account and meet eligibility requirements."
        />
      </div>
    );
  }

  const statusClasses: Record<string, string> = {
    Pending: "bg-secondary text-muted-foreground",
    Approved: "bg-secondary text-foreground",
    Paid: "bg-secondary text-foreground",
    Rejected: "bg-secondary text-muted-foreground",
    Denied: "bg-secondary text-muted-foreground",
    requested: "bg-secondary text-muted-foreground",
    approved: "bg-secondary text-foreground",
    paid: "bg-secondary text-foreground",
    denied: "bg-secondary text-muted-foreground",
    blocked: "bg-secondary text-muted-foreground",
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
        <p className="text-sm text-muted-foreground mt-1">Request payouts and view history.</p>
      </div>

      {/* KYC Gate */}
      {!isVerified && (
        <div className="premium-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <ShieldAlert size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">KYC Required for Payouts</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {kycReason || "Complete identity verification in Settings before requesting a payout."}
              </p>
            </div>
            <a href="/dashboard/settings" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors shrink-0">
              Verify Now
            </a>
          </div>
        </div>
      )}

      {/* Payout Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
          <p className="text-2xl font-bold">${payout.availableBalance.toLocaleString()}</p>
        </div>
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Eligible Payout</p>
          <p className="text-2xl font-bold">${payout.eligibleAmount.toLocaleString()}</p>
        </div>
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Next Window</p>
          <p className="text-2xl font-bold">{payout.nextWindow}</p>
        </div>
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Payout Method</p>
          <p className="text-2xl font-bold">{payout.method}</p>
        </div>
      </div>

      {/* Payout Rules */}
      <div className="premium-card">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Payout Rules</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RuleBox label="Profit Split" value="Up to 90%" desc="Based on your challenge tier" />
          <RuleBox label="Schedule" value="Bi-weekly" desc="Every 14 calendar days" />
          <RuleBox label="Min Days" value="5 days" desc="Before first payout" />
          <RuleBox label="KYC" value={isVerified ? "Verified" : "Required"} desc={isVerified ? "You're eligible" : "Complete in Settings"} />
        </div>
      </div>

      {/* Request form */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Request Payout</h3>
        {payout.isEligible && isVerified ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Amount</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="$0.00"
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none"
                >
                  <option>Bank Card</option>
                  <option>Crypto (USDT)</option>
                  <option>Crypto (BTC)</option>
                  <option>Crypto (ETH)</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleRequestPayout}
              disabled={submitting || !payoutAmount}
              className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={14} />
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </>
        ) : (
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              {!isVerified
                ? "KYC verification is required before you can request a payout. Complete verification in Settings."
                : payout.ineligibleReason || "You are not currently eligible for a payout. Please ensure all objectives are met and your account is in good standing."}
            </p>
          </div>
        )}
      </div>

      {/* Payout Status Tracking */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Payout Status Tracking</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {["Requested", "Approved", "Paid", "Denied"].map((s) => (
            <div key={s} className="flex items-center gap-2 p-3 rounded-md bg-secondary/40">
              {s === "Paid" ? <CheckCircle2 size={14} className="text-foreground" /> : <Clock size={14} className="text-muted-foreground" />}
              <span className="text-xs font-medium">{s}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Payouts may be blocked if fraud is detected, chargebacks are flagged, or KYC is incomplete.
        </p>
      </div>

      {/* History — from service */}
      {payoutHistory.length > 0 && (
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Payout History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">ID</th>
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">Date</th>
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">Method</th>
                <th className="text-right py-3 font-medium text-muted-foreground text-xs">Amount</th>
                <th className="text-right py-3 font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payoutHistory.map((p) => (
                <tr key={p.payoutId}>
                  <td className="py-3 font-medium font-mono text-xs">{p.payoutId}</td>
                  <td className="py-3 text-muted-foreground">{new Date(p.requestedAt).toLocaleDateString()}</td>
                  <td className="py-3 text-muted-foreground">{p.method}</td>
                  <td className="py-3 text-right font-medium">${p.amount.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusClasses[p.status] || "bg-secondary"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Legacy payout history from useTradingData (if populated by backend later) */}
      {payout.history.length > 0 && payoutHistory.length === 0 && (
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Payout History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">ID</th>
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">Date</th>
                <th className="text-left py-3 font-medium text-muted-foreground text-xs">Method</th>
                <th className="text-right py-3 font-medium text-muted-foreground text-xs">Amount</th>
                <th className="text-right py-3 font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payout.history.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-medium font-mono text-xs">{p.id}</td>
                  <td className="py-3 text-muted-foreground">{p.date}</td>
                  <td className="py-3 text-muted-foreground">{p.method}</td>
                  <td className="py-3 text-right font-medium">${p.amount.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusClasses[p.status] || "bg-secondary"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RuleBox({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="bg-secondary/40 rounded-lg p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
    </div>
  );
}
