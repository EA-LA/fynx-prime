import { mockPayoutHistory } from "@/lib/mockData";
import { CreditCard } from "lucide-react";

export default function DashboardPayouts() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
        <p className="text-sm text-muted-foreground mt-1">Request payouts and view history.</p>
      </div>

      {/* Request form */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Request Payout</h3>
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
      </div>

      {/* History */}
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
            {mockPayoutHistory.map((p) => (
              <tr key={p.id}>
                <td className="py-3 font-medium">{p.id}</td>
                <td className="py-3 text-muted-foreground">{p.date}</td>
                <td className="py-3 text-muted-foreground">{p.method}</td>
                <td className="py-3 text-right font-medium">${p.amount}</td>
                <td className="py-3 text-right">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded font-medium">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calendar */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Payout Calendar</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-md p-4 text-center">
            <p className="text-xs text-muted-foreground">Next Window</p>
            <p className="text-lg font-bold mt-1">Mar 1 – 3</p>
          </div>
          <div className="bg-secondary rounded-md p-4 text-center">
            <p className="text-xs text-muted-foreground">Estimated Payout</p>
            <p className="text-lg font-bold mt-1">Mar 5 – 7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
