export const plans = [
  {
    name: "$10K Challenge",
    price: 99,
    accountSize: "10,000",
    profitTarget: "8%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: 5,
    profitSplit: "80%",
    refund: true,
  },
  {
    name: "$25K Challenge",
    price: 199,
    accountSize: "25,000",
    profitTarget: "8%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: 5,
    profitSplit: "80%",
    refund: true,
    popular: true,
  },
  {
    name: "$50K Challenge",
    price: 349,
    accountSize: "50,000",
    profitTarget: "8%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: 5,
    profitSplit: "85%",
    refund: true,
  },
  {
    name: "$100K Challenge",
    price: 549,
    accountSize: "100,000",
    profitTarget: "8%",
    dailyLoss: "5%",
    maxLoss: "10%",
    minDays: 5,
    profitSplit: "90%",
    refund: true,
  },
];

export const aggressivePlans = plans.map((p) => ({
  ...p,
  profitTarget: "12%",
  dailyLoss: "4%",
  maxLoss: "8%",
  minDays: 3,
  price: Math.round(p.price * 1.3),
}));

export const mockAccounts = [
  {
    id: "FX-10241",
    plan: "$25K Challenge",
    status: "Funded" as const,
    balance: 26420,
    equity: 26380,
    startDate: "2026-01-15",
    phase: "Funded",
    pnl: 1420,
    pnlPercent: 5.68,
  },
  {
    id: "FX-10242",
    plan: "$50K Challenge",
    status: "Phase 1" as const,
    balance: 51200,
    equity: 51150,
    startDate: "2026-02-10",
    phase: "Phase 1",
    pnl: 1200,
    pnlPercent: 2.4,
  },
  {
    id: "FX-10238",
    plan: "$10K Challenge",
    status: "Breached" as const,
    balance: 8900,
    equity: 8900,
    startDate: "2025-12-01",
    phase: "Phase 1",
    pnl: -1100,
    pnlPercent: -11.0,
  },
];

export const mockTrades = [
  { id: 1, symbol: "EUR/USD", type: "Buy", openTime: "2026-02-19 09:32", closeTime: "2026-02-19 11:15", lots: 0.5, pnl: 145.20, pips: 29 },
  { id: 2, symbol: "GBP/JPY", type: "Sell", openTime: "2026-02-19 14:05", closeTime: "2026-02-19 15:42", lots: 0.3, pnl: -67.80, pips: -18 },
  { id: 3, symbol: "XAU/USD", type: "Buy", openTime: "2026-02-18 10:12", closeTime: "2026-02-18 13:30", lots: 0.2, pnl: 312.50, pips: 45 },
  { id: 4, symbol: "USD/CAD", type: "Sell", openTime: "2026-02-18 08:00", closeTime: "2026-02-18 09:22", lots: 0.4, pnl: 89.60, pips: 14 },
  { id: 5, symbol: "EUR/GBP", type: "Buy", openTime: "2026-02-17 11:45", closeTime: "2026-02-17 14:10", lots: 0.6, pnl: -42.30, pips: -7 },
  { id: 6, symbol: "NAS100", type: "Buy", openTime: "2026-02-17 15:30", closeTime: "2026-02-17 16:45", lots: 0.1, pnl: 223.00, pips: 52 },
  { id: 7, symbol: "USD/JPY", type: "Sell", openTime: "2026-02-16 09:00", closeTime: "2026-02-16 10:30", lots: 0.5, pnl: 178.40, pips: 22 },
  { id: 8, symbol: "GBP/USD", type: "Buy", openTime: "2026-02-16 13:15", closeTime: "2026-02-16 15:00", lots: 0.3, pnl: -95.20, pips: -19 },
];

export const mockObjectives = {
  profitTarget: { current: 5.68, target: 8, label: "Profit Target" },
  dailyLoss: { current: 1.2, limit: 5, label: "Daily Loss Limit" },
  maxLoss: { current: 3.1, limit: 10, label: "Max Loss Limit" },
  minDays: { current: 8, target: 5, label: "Min Trading Days" },
};

export const mockEquityCurve = [
  { day: "Feb 1", equity: 25000 },
  { day: "Feb 3", equity: 25320 },
  { day: "Feb 5", equity: 25180 },
  { day: "Feb 7", equity: 25650 },
  { day: "Feb 9", equity: 25420 },
  { day: "Feb 11", equity: 25890 },
  { day: "Feb 13", equity: 26100 },
  { day: "Feb 15", equity: 25950 },
  { day: "Feb 17", equity: 26320 },
  { day: "Feb 19", equity: 26420 },
];

export const mockPayoutHistory = [
  { id: "PO-001", date: "2026-02-01", amount: 850, status: "Paid", method: "Wire Transfer" },
  { id: "PO-002", date: "2026-01-15", amount: 620, status: "Paid", method: "Crypto" },
  { id: "PO-003", date: "2026-01-01", amount: 1100, status: "Paid", method: "Wire Transfer" },
];

export const faqItems = [
  {
    q: "What is FYNX Funded?",
    a: "FYNX Funded is a proprietary trading firm that provides funded trading accounts to skilled traders. Pass our evaluation challenge and trade with our capital.",
  },
  {
    q: "How does the evaluation work?",
    a: "Our evaluation consists of two phases. In Phase 1, you must reach the profit target while staying within risk limits. Phase 2 confirms your consistency. Pass both and receive a funded account.",
  },
  {
    q: "What instruments can I trade?",
    a: "You can trade Forex pairs, indices (NAS100, US30, etc.), commodities (Gold, Oil), and select crypto pairs.",
  },
  {
    q: "How quickly can I get paid?",
    a: "Once you're funded and meet payout eligibility, payouts are processed within 24-48 hours. We support wire transfer and cryptocurrency.",
  },
  {
    q: "Is the fee refundable?",
    a: "Yes. Once you receive your first payout as a funded trader, your evaluation fee is refunded in full.",
  },
  {
    q: "What happens if I breach a rule?",
    a: "If you violate a daily loss limit, max loss limit, or other trading rule, your account will be breached. You can always restart with a new challenge at a discounted rate.",
  },
  {
    q: "Can I hold trades over the weekend?",
    a: "Weekend holding is permitted on most instruments. Check our Rules page for specific restrictions.",
  },
  {
    q: "Is there a time limit to pass the challenge?",
    a: "No. There is no maximum time limit. Take as long as you need, as long as you meet the minimum trading days requirement.",
  },
];

export const testimonials = [
  {
    name: "Marcus T.",
    role: "Forex Trader",
    text: "Got funded in 12 days. The dashboard is incredibly clean and the payout was in my account within 24 hours. Best prop firm I've used.",
  },
  {
    name: "Sarah K.",
    role: "Index Trader",
    text: "The rules are transparent and the platform just works. No hidden catches. I'm scaling my account to $200K now.",
  },
  {
    name: "David L.",
    role: "Commodities Trader",
    text: "After trying 3 other firms, FYNX is the only one that feels professional. The real-time objectives tracker is a game changer.",
  },
];
