import { Link } from "react-router-dom";
import { Wallet, ArrowRight, Calendar, Shield, Eye, EyeOff, CheckCircle2, XCircle, AlertTriangle, MessageSquare, TrendingUp } from "lucide-react";
import { useTradingData } from "@/hooks/use-trading-data";
import { useState } from "react";

export default function DashboardOverview() {
  const { hasAccount, objectives, hasTrades } = useTradingData();

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

      {hasAccount && objectives ? (
        <ActiveDashboard objectives={objectives} hasTrades={hasTrades} />
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

function ActiveDashboard({ objectives, hasTrades }: { objectives: any; hasTrades: boolean }) {
  const [showCreds, setShowCreds] = useState(false);

  // Demo challenge info (would come from backend)
  const challenge = {
    name: "Phase 1 Evaluation",
    phase: "Phase 1",
    startDate: new Date().toLocaleDateString(),
    status: "Active",
    accountId: "FX-" + Date.now().toString(36).toUpperCase().slice(0, 6),
    platform: "MetaTrader 5",
    login: "50012345",
    password: "Ax7$kL9m",
    server: "FynxFunded-Live",
  };

  const profitPct = objectives ? (objectives.profitTarget.current / objectives.profitTarget.target) * 100 : 0;
  const dailyPct = objectives ? (objectives.dailyLoss.current / objectives.dailyLoss.limit) * 100 : 0;
  const maxPct = objectives ? (objectives.maxLoss.current / objectives.maxLoss.limit) * 100 : 0;
  const daysPct = objectives ? (objectives.minTradingDays.current / objectives.minTradingDays.target) * 100 : 0;

  type RuleStatus = "ok" | "warning" | "violated";

  const getRuleStatus = (current: number, limit: number, isLimit: boolean): RuleStatus => {
    if (isLimit) {
      if (current >= limit) return "violated";
      if (current / limit > 0.7) return "warning";
      return "ok";
    }
    return "ok";
  };

  const rules = [
    { label: "Profit Target", status: profitPct >= 100 ? "ok" as RuleStatus : "ok" as RuleStatus },
    { label: "Daily Loss", status: getRuleStatus(objectives?.dailyLoss.current || 0, objectives?.dailyLoss.limit || 5, true) },
    { label: "Max Loss", status: getRuleStatus(objectives?.maxLoss.current || 0, objectives?.maxLoss.limit || 10, true) },
    { label: "Min Trading Days", status: "ok" as RuleStatus },
  ];

  const StatusIcon = ({ status }: { status: RuleStatus }) => {
    if (status === "ok") return <CheckCircle2 size={14} className="text-foreground" />;
    if (status === "warning") return <AlertTriangle size={14} className="text-muted-foreground" />;
    return <XCircle size={14} className="text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Active Challenge Card */}
      <div className="premium-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{challenge.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Account: {challenge.accountId}</p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-foreground">
            {challenge.status}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Phase</p>
            <p className="font-medium">{challenge.phase}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Start Date</p>
            <p className="font-medium">{challenge.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium">{challenge.status}</p>
          </div>
        </div>
      </div>

      {/* Progress + Drawdown Meters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MeterCard label="Profit Target" value={profitPct} suffix="%" icon={<TrendingUp size={14} />} />
        <MeterCard label="Daily Drawdown" value={dailyPct} suffix="%" warn={dailyPct > 70} />
        <MeterCard label="Max Drawdown" value={maxPct} suffix="%" warn={maxPct > 70} />
        <MeterCard label="Trading Days" value={daysPct} suffix="" subtext={`${objectives?.minTradingDays.current || 0} / ${objectives?.minTradingDays.target || 5} days`} icon={<Calendar size={14} />} />
      </div>

      {/* Rules Status Panel */}
      <div className="premium-card">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Rules Status</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {rules.map((r) => (
            <div key={r.label} className="flex items-center gap-2 p-3 rounded-md bg-secondary/40">
              <StatusIcon status={r.status} />
              <span className="text-sm font-medium">{r.label}</span>
              <span className={`ml-auto text-xs font-medium ${r.status === "ok" ? "text-foreground" : r.status === "warning" ? "text-muted-foreground" : "text-muted-foreground"}`}>
                {r.status === "ok" ? "OK" : r.status === "warning" ? "Warning" : "Violated"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Credentials */}
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
            <p className="font-medium">{challenge.platform}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Server</p>
            <p className="font-medium">{challenge.server}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Login</p>
            <p className="font-medium font-mono">{showCreds ? challenge.login : "••••••••"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Password</p>
            <p className="font-medium font-mono">{showCreds ? challenge.password : "••••••••"}</p>
          </div>
        </div>
      </div>

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

function MeterCard({ label, value, suffix, subtext, warn, icon }: {
  label: string; value: number; suffix: string; subtext?: string; warn?: boolean; icon?: React.ReactNode;
}) {
  const cappedValue = Math.min(value, 100);
  return (
    <div className="premium-card">
      <div className="flex items-center gap-1.5 mb-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-2xl font-bold mb-2">{cappedValue.toFixed(1)}{suffix}</p>
      {subtext && <p className="text-xs text-muted-foreground mb-2">{subtext}</p>}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${warn ? "bg-muted-foreground" : "bg-foreground"}`}
          style={{ width: `${cappedValue}%` }}
        />
      </div>
    </div>
  );
}
