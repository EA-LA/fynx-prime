// Central hook for trading data — currently returns empty state.
// When backend is connected, this will fetch real user data.

export interface Trade {
  id: string;
  symbol: string;
  type: "Buy" | "Sell";
  openTime: string;
  closeTime: string;
  lots: number;
  pnl: number;
  pips: number;
  duration: string;
  riskPercent: number;
  rr: number;
  session: "London" | "New York" | "Asia";
  result: "Win" | "Loss";
}

export interface AccountObjectives {
  profitTarget: { current: number; target: number };
  dailyLoss: { current: number; limit: number };
  maxLoss: { current: number; limit: number };
  minTradingDays: { current: number; target: number };
  consistency: { largestWinDay: number; threshold: number } | null;
}

export interface PayoutInfo {
  availableBalance: number;
  eligibleAmount: number;
  nextWindow: string;
  method: string;
  isEligible: boolean;
  ineligibleReason: string;
  history: PayoutRecord[];
}

export interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  status: "Pending" | "Approved" | "Paid" | "Rejected";
  method: string;
}

export interface TradingData {
  hasAccount: boolean;
  hasTrades: boolean;
  trades: Trade[];
  objectives: AccountObjectives | null;
  payout: PayoutInfo | null;
}

export function useTradingData(): TradingData {
  // No demo data — empty until real backend is connected
  return {
    hasAccount: false,
    hasTrades: false,
    trades: [],
    objectives: null,
    payout: null,
  };
}

// Derived analytics helpers
export function computeAnalytics(trades: Trade[]) {
  if (trades.length === 0) return null;

  const wins = trades.filter((t) => t.result === "Win");
  const losses = trades.filter((t) => t.result === "Loss");
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? Math.abs(losses.reduce((s, t) => s + t.pnl, 0) / losses.length) : 0;
  const profitFactor = avgLoss > 0 ? (avgWin * wins.length) / (avgLoss * losses.length) : 0;
  const expectancy = trades.length ? totalPnl / trades.length : 0;

  // Consecutive streaks
  let maxConsWins = 0, maxConsLosses = 0, cw = 0, cl = 0;
  trades.forEach((t) => {
    if (t.result === "Win") { cw++; cl = 0; maxConsWins = Math.max(maxConsWins, cw); }
    else { cl++; cw = 0; maxConsLosses = Math.max(maxConsLosses, cl); }
  });

  // Session performance
  const sessions = { London: 0, "New York": 0, Asia: 0 };
  trades.forEach((t) => { sessions[t.session] += t.pnl; });
  const bestSession = (Object.entries(sessions) as [string, number][]).sort((a, b) => b[1] - a[1])[0];

  // Instrument performance
  const instruments: Record<string, { pnl: number; count: number }> = {};
  trades.forEach((t) => {
    if (!instruments[t.symbol]) instruments[t.symbol] = { pnl: 0, count: 0 };
    instruments[t.symbol].pnl += t.pnl;
    instruments[t.symbol].count++;
  });
  const sortedInstruments = Object.entries(instruments).sort((a, b) => b[1].pnl - a[1].pnl);

  // Risk metrics
  let maxDrawdown = 0, peak = 0, runningPnl = 0;
  trades.forEach((t) => {
    runningPnl += t.pnl;
    if (runningPnl > peak) peak = runningPnl;
    const dd = peak - runningPnl;
    if (dd > maxDrawdown) maxDrawdown = dd;
  });
  const currentDrawdown = peak - runningPnl;
  const avgRisk = trades.reduce((s, t) => s + t.riskPercent, 0) / trades.length;
  const avgRR = trades.reduce((s, t) => s + t.rr, 0) / trades.length;

  return {
    totalTrades: trades.length,
    winRate: (wins.length / trades.length) * 100,
    avgWin,
    avgLoss,
    profitFactor,
    expectancy,
    maxDrawdown,
    currentDrawdown,
    avgRisk,
    avgRR,
    maxConsWins,
    maxConsLosses,
    sessions,
    bestSession: bestSession[0],
    instruments: sortedInstruments,
    bestPair: sortedInstruments[0]?.[0] || "—",
    worstPair: sortedInstruments[sortedInstruments.length - 1]?.[0] || "—",
  };
}
