import { mockEquityCurve, mockTrades, mockObjectives } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Activity, Target, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const stats = [
  { label: "Today P/L", value: "+$145.20", positive: true, icon: TrendingUp },
  { label: "Total P/L", value: "+$1,420.00", positive: true, icon: Activity },
  { label: "Win Rate", value: "62.5%", positive: true, icon: Target },
  { label: "Avg R:R", value: "1.8:1", positive: true, icon: TrendingUp },
  { label: "Drawdown", value: "3.1%", positive: false, icon: TrendingDown },
];

const ruleMonitor = [
  { rule: "Daily Loss Limit", status: "ok" as const, value: "1.2% / 5%" },
  { rule: "Max Loss Limit", status: "ok" as const, value: "3.1% / 10%" },
  { rule: "Min Trading Days", status: "ok" as const, value: "8 / 5" },
  { rule: "Consistency Rule", status: "ok" as const, value: "Within range" },
  { rule: "Weekend Holding", status: "neutral" as const, value: "No open positions" },
];

const notifications = [
  { text: "Payout of $850 processed successfully", time: "2h ago" },
  { text: "Daily loss limit at 1.2% — within safe range", time: "4h ago" },
  { text: "New trade opened: EUR/USD Buy 0.5 lots", time: "5h ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, John. Here's your trading overview.</p>
      </div>

      {/* Account status */}
      <div className="premium-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Account FX-10241 • $25K Challenge</p>
            <p className="text-lg font-semibold mt-1">Status: <span className="text-foreground">Funded</span></p>
          </div>
          <div className="bg-secondary px-3 py-1.5 rounded-md text-xs font-medium">Funded</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="premium-card">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Equity curve */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Equity Curve</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockEquityCurve}>
              <XAxis
                dataKey="day"
                stroke="hsl(0 0% 30%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(0 0% 30%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 16%)",
                  borderRadius: "6px",
                  fontSize: 12,
                  color: "hsl(0 0% 96%)",
                }}
              />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="hsl(0 0% 96%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Objectives */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Objective Progress</h3>
          <div className="space-y-4">
            {Object.values(mockObjectives).map((obj) => {
              const isLimit = "limit" in obj;
              const pct = isLimit
                ? (obj.current / (obj as any).limit) * 100
                : (obj.current / (obj as any).target) * 100;
              const cappedPct = Math.min(pct, 100);
              const isWarning = isLimit && pct > 70;

              return (
                <div key={obj.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{obj.label}</span>
                    <span className="font-medium">
                      {obj.current}
                      {isLimit ? `% / ${(obj as any).limit}%` : typeof (obj as any).target === "number" && obj.label.includes("Days") ? ` / ${(obj as any).target}` : `% / ${(obj as any).target}%`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isWarning ? "bg-muted-foreground" : "bg-foreground"}`}
                      style={{ width: `${cappedPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rules monitor */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Rules Monitor</h3>
          <div className="space-y-3">
            {ruleMonitor.map((r) => (
              <div key={r.rule} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {r.status === "ok" ? (
                    <CheckCircle2 size={14} className="text-muted-foreground" />
                  ) : r.status === "neutral" ? (
                    <Clock size={14} className="text-muted-foreground/50" />
                  ) : (
                    <AlertTriangle size={14} className="text-muted-foreground" />
                  )}
                  <span className="text-muted-foreground">{r.rule}</span>
                </div>
                <span className="text-xs font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent trades */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Symbol</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockTrades.slice(0, 5).map((t) => (
                  <tr key={t.id}>
                    <td className="py-2 font-medium">{t.symbol}</td>
                    <td className="py-2 text-muted-foreground">{t.type}</td>
                    <td className={`py-2 text-right font-medium ${t.pnl >= 0 ? "" : "text-muted-foreground"}`}>
                      {t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">{n.text}</p>
                  <p className="text-xs text-muted-foreground/50 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
