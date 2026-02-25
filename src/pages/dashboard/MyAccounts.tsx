import { Link } from "react-router-dom";
import { Wallet, ArrowRight } from "lucide-react";

export default function MyAccounts() {
  // No demo accounts — show empty state until user buys a challenge
  const accounts: any[] = [];

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Accounts</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage your trading accounts.</p>
      </div>

      {accounts.length > 0 ? (
        <div className="grid gap-4">
          {/* Account cards would render here */}
        </div>
      ) : (
        <div className="premium-card text-center py-16">
          <Wallet size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No accounts yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Purchase a challenge to get started. Your trading accounts will appear here once activated.
          </p>
          <Link
            to="/challenge-builder"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Start a Challenge <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
