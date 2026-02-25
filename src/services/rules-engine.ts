// ═══════════════════════════════════════════════════════════
// RULES ENGINE — Broker-feed ready
// ═══════════════════════════════════════════════════════════
// Consumes TradingDataProvider output and produces
// pass/fail, violations, and audit logs.

import { dataService } from "./database";
import type { RuleEvaluation, AuditLog } from "./types";

// ── Trading Data Provider Interface ───────────────────────
// 🔌 Replace with real broker API (MT5/TradeLocker/MatchTrader)

export interface EquityPoint {
  timestamp: string;
  equity: number;
  balance: number;
}

export interface TradeRecord {
  tradeId: string;
  symbol: string;
  type: "buy" | "sell";
  openTime: string;
  closeTime: string;
  lots: number;
  pnl: number;
  commission: number;
}

export interface DailyPnL {
  date: string;
  pnl: number;
  startBalance: number;
  endBalance: number;
  startEquity: number;
  lowestEquity: number;
}

export interface TradingDataProvider {
  getEquityTimeline(accountId: string): Promise<EquityPoint[]>;
  getBalanceTimeline(accountId: string): Promise<EquityPoint[]>;
  getTrades(accountId: string): Promise<TradeRecord[]>;
  getDailyPnL(accountId: string, date: string): Promise<DailyPnL | null>;
  getDailyPnLRange(accountId: string, startDate: string, endDate: string): Promise<DailyPnL[]>;
}

// ── Placeholder provider ──────────────────────────────────

class LocalTradingDataProvider implements TradingDataProvider {
  async getEquityTimeline(_accountId: string): Promise<EquityPoint[]> {
    // 🔌 Replace with: brokerApi.getEquityHistory(accountId)
    return [];
  }
  async getBalanceTimeline(_accountId: string): Promise<EquityPoint[]> {
    return [];
  }
  async getTrades(_accountId: string): Promise<TradeRecord[]> {
    return [];
  }
  async getDailyPnL(_accountId: string, _date: string): Promise<DailyPnL | null> {
    return null;
  }
  async getDailyPnLRange(_accountId: string, _start: string, _end: string): Promise<DailyPnL[]> {
    return [];
  }
}

export const tradingDataProvider: TradingDataProvider = new LocalTradingDataProvider();

// ── Rules Engine ──────────────────────────────────────────

export interface ChallengeRules {
  profitTargetPct: number;
  dailyLossPct: number;
  maxLossPct: number;
  minTradingDays: number;
  accountSize: number;
}

export interface RulesResult {
  status: "active" | "passed" | "failed";
  violations: RuleEvaluation[];
  evaluations: RuleEvaluation[];
  tradingDays: number;
  profitPct: number;
  dailyDrawdownPct: number;
  maxDrawdownPct: number;
}

export async function evaluateRules(
  accountId: string,
  rules: ChallengeRules,
  provider: TradingDataProvider = tradingDataProvider
): Promise<RulesResult> {
  const trades = await provider.getTrades(accountId);
  const equity = await provider.getEquityTimeline(accountId);

  const evaluations: RuleEvaluation[] = [];
  const violations: RuleEvaluation[] = [];
  const now = new Date().toISOString();

  // ── Calculate metrics ───────────────────────────────────
  const tradingDays = new Set(trades.map((t) => t.closeTime.slice(0, 10))).size;
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const profitPct = rules.accountSize > 0 ? (totalPnl / rules.accountSize) * 100 : 0;

  // Max drawdown from equity curve
  let peak = rules.accountSize;
  let maxDrawdown = 0;
  for (const pt of equity) {
    if (pt.equity > peak) peak = pt.equity;
    const dd = ((peak - pt.equity) / rules.accountSize) * 100;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }

  // Daily drawdown (worst day)
  let dailyDrawdown = 0;
  const dailyPnls = new Map<string, number>();
  trades.forEach((t) => {
    const day = t.closeTime.slice(0, 10);
    dailyPnls.set(day, (dailyPnls.get(day) || 0) + t.pnl);
  });
  for (const [, pnl] of dailyPnls) {
    const ddPct = Math.abs(Math.min(0, pnl)) / rules.accountSize * 100;
    if (ddPct > dailyDrawdown) dailyDrawdown = ddPct;
  }

  // ── Evaluate each rule ──────────────────────────────────

  // Profit target
  const profitEval: RuleEvaluation = {
    accountId, timestamp: now, rule: "profit_target",
    result: profitPct >= rules.profitTargetPct ? "pass" : "warning",
    value: profitPct, threshold: rules.profitTargetPct,
    details: `Profit ${profitPct.toFixed(2)}% / ${rules.profitTargetPct}% target`,
  };
  evaluations.push(profitEval);

  // Daily drawdown
  const dailyEval: RuleEvaluation = {
    accountId, timestamp: now, rule: "daily_drawdown",
    result: dailyDrawdown > rules.dailyLossPct ? "fail" : dailyDrawdown > rules.dailyLossPct * 0.7 ? "warning" : "pass",
    value: dailyDrawdown, threshold: rules.dailyLossPct,
    details: `Daily DD ${dailyDrawdown.toFixed(2)}% / ${rules.dailyLossPct}% limit`,
  };
  evaluations.push(dailyEval);
  if (dailyEval.result === "fail") violations.push(dailyEval);

  // Max drawdown
  const maxDdEval: RuleEvaluation = {
    accountId, timestamp: now, rule: "max_drawdown",
    result: maxDrawdown > rules.maxLossPct ? "fail" : maxDrawdown > rules.maxLossPct * 0.7 ? "warning" : "pass",
    value: maxDrawdown, threshold: rules.maxLossPct,
    details: `Max DD ${maxDrawdown.toFixed(2)}% / ${rules.maxLossPct}% limit`,
  };
  evaluations.push(maxDdEval);
  if (maxDdEval.result === "fail") violations.push(maxDdEval);

  // Min trading days
  const daysEval: RuleEvaluation = {
    accountId, timestamp: now, rule: "min_trading_days",
    result: tradingDays >= rules.minTradingDays ? "pass" : "warning",
    value: tradingDays, threshold: rules.minTradingDays,
    details: `${tradingDays} / ${rules.minTradingDays} days traded`,
  };
  evaluations.push(daysEval);

  // ── Determine status ────────────────────────────────────
  let status: RulesResult["status"] = "active";
  if (violations.length > 0) {
    status = "failed"; // AUTO FAIL on rule breach
  } else if (profitEval.result === "pass" && daysEval.result === "pass") {
    status = "passed"; // AUTO PASS on target hit + min days met
  }

  // ── Audit log ───────────────────────────────────────────
  await dataService.addAuditLog({
    accountId,
    action: "rules_evaluation",
    result: status,
    timestamp: now,
    details: {
      profitPct,
      dailyDrawdown,
      maxDrawdown,
      tradingDays,
      violations: violations.map((v) => v.rule),
    },
  });

  return {
    status,
    violations,
    evaluations,
    tradingDays,
    profitPct,
    dailyDrawdownPct: dailyDrawdown,
    maxDrawdownPct: maxDrawdown,
  };
}
