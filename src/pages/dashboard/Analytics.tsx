import { useTradingData, computeAnalytics } from "@/hooks/use-trading-data";
import { BarChart3 } from "lucide-react";
import EmptyState from "@/components/EmptyState";

export default function Analytics() {
  const { hasTrades, trades } = useTradingData();
  const analytics = computeAnalytics(trades);

  if (!hasTrades || !analytics) {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance breakdown and insights.</p>
        </div>
        <EmptyState
          icon={<BarChart3 size={24} />}
          title="No analytics yet"
          description="Analytics will appear once trading begins. Start a challenge and place your first trade."
        />
      </div>
    );
  }

  const statBlock = (label: string, value: string | number, sub?: string) => (
    <div className="bg-secondary/50 rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance breakdown and insights.</p>
      </div>

      {/* Trade Performance */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Trade Performance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {statBlock("Total Trades", analytics.totalTrades)}
          {statBlock("Win Rate", `${analytics.winRate.toFixed(1)}%`)}
          {statBlock("Avg Win", `$${analytics.avgWin.toFixed(2)}`)}
          {statBlock("Avg Loss", `$${analytics.avgLoss.toFixed(2)}`)}
          {statBlock("Profit Factor", analytics.profitFactor.toFixed(2))}
          {statBlock("Expectancy", `$${analytics.expectancy.toFixed(2)}`)}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Risk Metrics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {statBlock("Max Drawdown", `$${analytics.maxDrawdown.toFixed(2)}`)}
          {statBlock("Current Drawdown", `$${analytics.currentDrawdown.toFixed(2)}`)}
          {statBlock("Avg Risk/Trade", `${analytics.avgRisk.toFixed(1)}%`)}
          {statBlock("Avg R:R", analytics.avgRR.toFixed(2))}
          {statBlock("Max Consec. Wins", analytics.maxConsWins)}
          {statBlock("Max Consec. Losses", analytics.maxConsLosses)}
        </div>
      </div>

      {/* Session Analysis */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Session Analysis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(analytics.sessions).map(([session, pnl]) => (
            <div key={session} className={`bg-secondary/50 rounded-lg p-4 ${session === analytics.bestSession ? "ring-1 ring-foreground/20" : ""}`}>
              <p className="text-xs text-muted-foreground mb-1">{session}</p>
              <p className={`text-xl font-bold ${pnl >= 0 ? "" : "text-muted-foreground"}`}>
                {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
              </p>
              {session === analytics.bestSession && (
                <p className="text-[10px] font-medium mt-1 text-muted-foreground">Best Session</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instrument Performance */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Instrument Performance</h3>
        <div className="space-y-2">
          {analytics.instruments.map(([symbol, data]) => (
            <div key={symbol} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3">
              <div>
                <span className="text-sm font-medium">{symbol}</span>
                <span className="text-xs text-muted-foreground ml-2">{data.count} trades</span>
              </div>
              <span className={`text-sm font-bold ${data.pnl >= 0 ? "" : "text-muted-foreground"}`}>
                {data.pnl >= 0 ? "+" : ""}${data.pnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-4 text-xs text-muted-foreground">
          <span>Best: <span className="text-foreground font-medium">{analytics.bestPair}</span></span>
          <span>Worst: <span className="text-foreground font-medium">{analytics.worstPair}</span></span>
        </div>
      </div>
    </div>
  );
}
