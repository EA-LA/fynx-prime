import { mockAccounts } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  Funded: "bg-foreground/10 text-foreground",
  "Phase 1": "bg-secondary text-muted-foreground",
  "Phase 2": "bg-secondary text-muted-foreground",
  Breached: "bg-secondary text-muted-foreground/60",
  Passed: "bg-foreground/10 text-foreground",
};

export default function MyAccounts() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Accounts</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage your trading accounts.</p>
      </div>

      <div className="grid gap-4">
        {mockAccounts.map((acc) => (
          <div key={acc.id} className="premium-card hover-lift">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{acc.id}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[acc.status] || "bg-secondary text-muted-foreground"}`}>
                      {acc.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{acc.plan} • Started {acc.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-medium">${acc.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">P/L</p>
                  <p className={`font-medium ${acc.pnl >= 0 ? "" : "text-muted-foreground"}`}>
                    {acc.pnl >= 0 ? "+" : ""}${acc.pnl.toLocaleString()} ({acc.pnlPercent}%)
                  </p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
