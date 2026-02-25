import { useState } from "react";
import { useTradingData } from "@/hooks/use-trading-data";
import { Search, Download, ListX } from "lucide-react";

export default function Trades() {
  const { hasTrades, trades } = useTradingData();
  const [symbolFilter, setSymbolFilter] = useState("");
  const [resultFilter, setResultFilter] = useState<"" | "Win" | "Loss">("");

  const filtered = trades.filter((t) => {
    if (symbolFilter && !t.symbol.toLowerCase().includes(symbolFilter.toLowerCase())) return false;
    if (resultFilter && t.result !== resultFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trades</h1>
        <p className="text-sm text-muted-foreground mt-1">Full trade history for your active account.</p>
      </div>

      {!hasTrades ? (
        <div className="premium-card text-center py-20">
          <ListX size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No trades recorded yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your trade history will appear here once you start trading on your challenge account.
          </p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter by symbol..."
                value={symbolFilter}
                onChange={(e) => setSymbolFilter(e.target.value)}
                className="w-full bg-card border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              />
            </div>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value as "" | "Win" | "Loss")}
              className="bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none"
            >
              <option value="">All Results</option>
              <option value="Win">Wins</option>
              <option value="Loss">Losses</option>
            </select>
            <button className="ml-auto inline-flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
              <Download size={14} />
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="premium-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Trade ID</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Symbol</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Type</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Open</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Close</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">Lots</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">Pips</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">P/L</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground text-xs">Duration</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">Risk %</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">R:R</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground text-xs">Session</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground text-xs">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-2 text-xs text-muted-foreground font-mono">{t.id}</td>
                    <td className="py-3 px-2 font-medium">{t.symbol}</td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${t.type === "Buy" ? "bg-secondary" : "bg-secondary text-muted-foreground"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{t.openTime}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{t.closeTime}</td>
                    <td className="py-3 px-2 text-right">{t.lots}</td>
                    <td className={`py-3 px-2 text-right ${t.pips >= 0 ? "" : "text-muted-foreground"}`}>{t.pips >= 0 ? "+" : ""}{t.pips}</td>
                    <td className={`py-3 px-2 text-right font-medium ${t.pnl >= 0 ? "" : "text-muted-foreground"}`}>
                      {t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-center text-xs text-muted-foreground">{t.duration}</td>
                    <td className="py-3 px-2 text-right text-xs">{t.riskPercent.toFixed(1)}%</td>
                    <td className="py-3 px-2 text-right text-xs">{t.rr.toFixed(1)}</td>
                    <td className="py-3 px-2 text-center text-xs text-muted-foreground">{t.session}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${t.result === "Win" ? "bg-secondary" : "bg-secondary text-muted-foreground"}`}>
                        {t.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No trades match your filter.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
