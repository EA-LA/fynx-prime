import { useTradingData } from "@/hooks/use-trading-data";
import { CreditCard, Wallet } from "lucide-react";

export default function DashboardPayouts() {
  const { hasAccount, payout } = useTradingData();

  if (!hasAccount || !payout) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
          <p className="text-sm text-muted-foreground mt-1">Request payouts and view history.</p>
        </div>
        <div className="premium-card text-center py-20">
          <Wallet size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No payout data</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Payout information will be available once you have a funded account and meet eligibility requirements.
          </p>
        </div>
      </div>
    );
  }

  const statusClasses: Record<string, string> = {
    Pending: "bg-secondary text-muted-foreground",
    Approved: "bg-secondary text-foreground",
    Paid: "bg-secondary text-foreground",
    Rejected: "bg-secondary text-muted-foreground",
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
        <p className="text-sm text-muted-foreground mt-1">Request payouts and view history.</p>
      </div>

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

      {/* Request form */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Request Payout</h3>
        {payout.isEligible ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Amount</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Method</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none">
                  <option>Wire Transfer</option>
                  <option>Crypto (USDT)</option>
                  <option>Crypto (BTC)</option>
                </select>
              </div>
            </div>
            <button className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
              <CreditCard size={14} />
              Submit Request
            </button>
          </>
        ) : (
          <div className="bg-secondary/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              {payout.ineligibleReason || "You are not currently eligible for a payout. Please ensure all objectives are met and your account is in good standing."}
            </p>
          </div>
        )}
      </div>

      {/* History */}
      {payout.history.length > 0 && (
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
