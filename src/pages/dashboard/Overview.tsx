import { Link } from "react-router-dom";
import { Wallet, ArrowRight } from "lucide-react";

export default function DashboardOverview() {
  // No demo data — empty state until user purchases a challenge
  const hasAccounts = false;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's your trading overview.</p>
        </div>
        <Link
          to="/challenge-builder"
          className="bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          New Challenge
        </Link>
      </div>

      {hasAccounts ? (
        <div>{/* Future: account stats, equity curve, objectives, trades, notifications */}</div>
      ) : (
        <div className="premium-card text-center py-20">
          <Wallet size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active accounts</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            You don't have any trading accounts yet. Start a challenge to begin your evaluation and get funded.
          </p>
          <Link
            to="/challenge-builder"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your First Challenge <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
