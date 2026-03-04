import { Link } from "react-router-dom";
import { Wallet, ArrowRight, Calendar, Shield, Eye, EyeOff, CheckCircle2, XCircle, AlertTriangle, MessageSquare, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { dataService } from "@/services/database";
import { useState, useEffect } from "react";
import type { Challenge, TradingAccount } from "@/services/types";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [ch, acc] = await Promise.all([
        dataService.getChallenges(user.userId),
        dataService.getAccounts(user.userId),
      ]);
      setChallenges(ch);
      setAccounts(acc);
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  const activeChallenge = challenges.find((c) => c.status === "active");
  const linkedAccount = activeChallenge
    ? accounts.find((a) => a.challengeId === activeChallenge.challengeId)
    : null;

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

      {activeChallenge ? (
        <ActiveDashboard challenge={activeChallenge} account={linkedAccount} />
      ) : (
        <div className="premium-card text-center py-20">
          <Wallet size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active challenges</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            You don't have any active challenges yet. Start a challenge to begin your evaluation and get funded.
          </p>
          <Link
            to="/challenge-builder"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your First Challenge <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* All challenges list */}
      {challenges.length > 0 && (
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">All Challenges</h3>
          <div className="space-y-3">
            {challenges.map((ch) => (
              <div key={ch.challengeId} className="flex items-center justify-between p-3 rounded-md bg-secondary/40">
                <div>
                  <p className="text-sm font-medium">{ch.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${ch.accountSize.toLocaleString()} · {ch.phase.replace("-", " ")} · Started {new Date(ch.startDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  ch.status === "active" ? "bg-secondary text-foreground" :
                  ch.status === "passed" ? "bg-secondary text-foreground" :
                  ch.status === "funded" ? "bg-secondary text-foreground" :
                  "bg-secondary/60 text-muted-foreground"
                }`}>
                  {ch.status.charAt(0).toUpperCase() + ch.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveDashboard({ challenge, account }: { challenge: Challenge; account: TradingAccount | null }) {
  const [showCreds, setShowCreds] = useState(false);

  return (
    <div className="space-y-6">
      {/* Active Challenge Card */}
      <div className="premium-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{challenge.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Challenge: {challenge.challengeId}</p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-foreground">
            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Phase</p>
            <p className="font-medium">{challenge.phase.replace("-", " ")}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Account Size</p>
            <p className="font-medium">${challenge.accountSize.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Start Date</p>
            <p className="font-medium">{new Date(challenge.startDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Trading Platform Credentials */}
      {account ? (
        <div className="premium-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Trading Platform Credentials</h3>
            <button onClick={() => setShowCreds(!showCreds)} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              {showCreds ? <EyeOff size={12} /> : <Eye size={12} />}
              {showCreds ? "Hide" : "Show"}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Platform</p>
              <p className="font-medium">{account.platform}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Server</p>
              <p className="font-medium">{account.server}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Login</p>
              <p className="font-medium font-mono">{showCreds ? account.login : "••••••••"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Password</p>
              <p className="font-medium font-mono">{showCreds ? account.password : "••••••••"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="premium-card text-center py-8">
          <Shield size={24} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium mb-1">Trading credentials pending</p>
          <p className="text-xs text-muted-foreground">
            Your trading account will be provisioned once broker integration is activated.
          </p>
        </div>
      )}

      {/* Support Button */}
      <Link
        to="/dashboard/support"
        className="premium-card flex items-center gap-3 hover:bg-secondary/40 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <MessageSquare size={18} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">Need help?</p>
          <p className="text-xs text-muted-foreground">Open a support ticket</p>
        </div>
        <ArrowRight size={16} className="ml-auto text-muted-foreground" />
      </Link>
    </div>
  );
}
