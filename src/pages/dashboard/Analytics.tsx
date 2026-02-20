import { mockTrades } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const winCount = mockTrades.filter((t) => t.pnl > 0).length;
const lossCount = mockTrades.filter((t) => t.pnl <= 0).length;

const winLossData = [
  { name: "Wins", value: winCount },
  { name: "Losses", value: lossCount },
];

const pieColors = ["hsl(0 0% 85%)", "hsl(0 0% 30%)"];

const pairPerformance = mockTrades.reduce((acc, t) => {
  if (!acc[t.symbol]) acc[t.symbol] = 0;
  acc[t.symbol] += t.pnl;
  return acc;
}, {} as Record<string, number>);

const pairData = Object.entries(pairPerformance)
  .map(([symbol, pnl]) => ({ symbol, pnl: Math.round(pnl * 100) / 100 }))
  .sort((a, b) => b.pnl - a.pnl);

const sessionData = [
  { session: "London", pnl: 423 },
  { session: "New York", pnl: 312 },
  { session: "Asian", pnl: -89 },
  { session: "Overlap", pnl: 567 },
];

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance breakdown and insights.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Win/Loss */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Win / Loss Distribution</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {winLossData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 7%)",
                    border: "1px solid hsl(0 0% 16%)",
                    borderRadius: "6px",
                    fontSize: 12,
                    color: "hsl(0 0% 96%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: pieColors[0] }} />
              Wins: {winCount}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: pieColors[1] }} />
              Losses: {lossCount}
            </div>
          </div>
        </div>

        {/* Session Performance */}
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Session Performance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <XAxis dataKey="session" stroke="hsl(0 0% 30%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(0 0% 30%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 7%)",
                    border: "1px solid hsl(0 0% 16%)",
                    borderRadius: "6px",
                    fontSize: 12,
                    color: "hsl(0 0% 96%)",
                  }}
                />
                <Bar dataKey="pnl" fill="hsl(0 0% 70%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best/Worst Pairs */}
        <div className="premium-card lg:col-span-2">
          <h3 className="text-sm font-semibold mb-4">Performance by Pair</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pairData} layout="vertical">
                <XAxis type="number" stroke="hsl(0 0% 30%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <YAxis type="category" dataKey="symbol" stroke="hsl(0 0% 30%)" fontSize={11} tickLine={false} axisLine={false} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 7%)",
                    border: "1px solid hsl(0 0% 16%)",
                    borderRadius: "6px",
                    fontSize: 12,
                    color: "hsl(0 0% 96%)",
                  }}
                />
                <Bar dataKey="pnl" fill="hsl(0 0% 60%)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
