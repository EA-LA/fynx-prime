import { Link } from "react-router-dom";
import { Wallet, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { dataService } from "@/services/database";
import { useState, useEffect } from "react";
import type { Challenge } from "@/services/types";

export default function MyAccounts() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    dataService.getChallenges(user.userId).then((ch) => {
      setChallenges(ch);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Accounts</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage your trading accounts.</p>
      </div>

      {challenges.length > 0 ? (
        <div className="grid gap-4">
          {challenges.map((ch) => (
            <div key={ch.challengeId} className="premium-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{ch.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{ch.challengeId}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  ch.status === "active" ? "bg-secondary text-foreground" :
                  ch.status === "funded" ? "bg-secondary text-foreground" :
                  "bg-secondary/60 text-muted-foreground"
                }`}>
                  {ch.status.charAt(0).toUpperCase() + ch.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Account Size</p>
                  <p className="font-medium">${ch.accountSize.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phase</p>
                  <p className="font-medium capitalize">{ch.phase.replace("-", " ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Broker Account</p>
                  <p className="font-medium text-muted-foreground">{ch.brokerAccountId || "Pending"}</p>
                </div>
              </div>
            </div>
          ))}
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
