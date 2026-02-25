import { useTradingData } from "@/hooks/use-trading-data";
import { Target, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type RuleStatus = "ok" | "warning" | "violated";

function getStatus(current: number, limit: number, isLimit: boolean): RuleStatus {
  if (isLimit) {
    if (current >= limit) return "violated";
    if (current / limit > 0.7) return "warning";
    return "ok";
  }
  // target-based (profit, min days)
  if (current >= limit) return "ok";
  return "ok"; // in progress
}

function StatusIcon({ status }: { status: RuleStatus }) {
  if (status === "ok") return <CheckCircle2 size={14} className="text-foreground" />;
  if (status === "warning") return <AlertTriangle size={14} className="text-muted-foreground" />;
  return <XCircle size={14} className="text-muted-foreground" />;
}

function StatusLabel({ status }: { status: RuleStatus }) {
  const labels = { ok: "OK", warning: "Approaching Limit", violated: "Violated" };
  const classes = {
    ok: "bg-secondary text-foreground",
    warning: "bg-secondary text-muted-foreground",
    violated: "bg-secondary text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-medium ${classes[status]}`}>
      <StatusIcon status={status} />
      {labels[status]}
    </span>
  );
}

export default function Objectives() {
  const { hasAccount, objectives } = useTradingData();

  if (!hasAccount || !objectives) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Objectives</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your progress toward each trading objective.</p>
        </div>
        <div className="premium-card text-center py-20">
          <Target size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active objectives</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Objectives will appear once you have an active challenge account. Start a challenge to begin tracking your progress.
          </p>
        </div>
      </div>
    );
  }

  const rules = [
    {
      label: "Profit Target",
      current: objectives.profitTarget.current,
      max: objectives.profitTarget.target,
      isLimit: false,
      unit: "%",
    },
    {
      label: "Daily Loss Limit",
      current: objectives.dailyLoss.current,
      max: objectives.dailyLoss.limit,
      isLimit: true,
      unit: "%",
    },
    {
      label: "Max Loss Limit",
      current: objectives.maxLoss.current,
      max: objectives.maxLoss.limit,
      isLimit: true,
      unit: "%",
    },
    {
      label: "Min Trading Days",
      current: objectives.minTradingDays.current,
      max: objectives.minTradingDays.target,
      isLimit: false,
      unit: "",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Objectives</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your progress toward each trading objective.</p>
      </div>

      {/* Core Objectives */}
      <div className="grid gap-6">
        {rules.map((rule) => {
          const pct = (rule.current / rule.max) * 100;
          const cappedPct = Math.min(pct, 100);
          const status = getStatus(rule.current, rule.max, rule.isLimit);
          const remaining = rule.max - rule.current;

          return (
            <div key={rule.label} className="premium-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold">{rule.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rule.isLimit ? "Limit" : "Target"}: {rule.max}{rule.unit}
                  </p>
                </div>
                <StatusLabel status={status} />
              </div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">{rule.current}{rule.unit}</span>
                <span className="text-sm text-muted-foreground">
                  {remaining > 0 ? `${remaining.toFixed(1)}${rule.unit} remaining` : "Complete"}
                </span>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    status === "violated" ? "bg-muted-foreground" : status === "warning" ? "bg-muted-foreground/70" : "bg-foreground"
                  }`}
                  style={{ width: `${cappedPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Consistency Rule */}
      {objectives.consistency && (
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Consistency Rule</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Largest Winning Day</p>
              <p className="text-xl font-bold">{objectives.consistency.largestWinDay.toFixed(1)}%</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Consistency Threshold</p>
              <p className="text-xl font-bold">{objectives.consistency.threshold.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
