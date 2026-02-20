import { useState } from "react";
import { mockTrades } from "@/lib/mockData";
import { Search } from "lucide-react";

export default function Trades() {
  const [filter, setFilter] = useState("");
  const filtered = mockTrades.filter(
    (t) => t.symbol.toLowerCase().includes(filter.toLowerCase()) || t.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trades</h1>
        <p className="text-sm text-muted-foreground mt-1">Full trade history for your active account.</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter by symbol or type..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-card border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
        />
      </div>

      <div className="premium-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Symbol</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Type</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Open</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs">Close</th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">Lots</th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">Pips</th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground text-xs">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-secondary/50 transition-colors">
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
    </div>
  );
}
