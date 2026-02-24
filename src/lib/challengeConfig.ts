export interface ChallengeConfig {
  accountSize: number;
  label: string;
  phases: {
    [key in "1-phase" | "2-phase" | "3-phase"]: {
      price: number;
      profitTargets: string[];
      dailyLoss: string;
      maxLoss: string;
      minDays: number;
      profitSplit: string;
      refundEligible: boolean;
      leverageForex: string;
    };
  };
}

export const challengeConfigs: ChallengeConfig[] = [
  {
    accountSize: 5000,
    label: "$5K",
    phases: {
      "1-phase": { price: 49, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "75%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 39, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 29, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
    },
  },
  {
    accountSize: 10000,
    label: "$10K",
    phases: {
      "1-phase": { price: 99, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "75%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 79, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 59, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
    },
  },
  {
    accountSize: 25000,
    label: "$25K",
    phases: {
      "1-phase": { price: 229, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 199, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 149, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "85%", refundEligible: true, leverageForex: "1:100" },
    },
  },
  {
    accountSize: 50000,
    label: "$50K",
    phases: {
      "1-phase": { price: 399, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "80%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 349, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "85%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 279, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "85%", refundEligible: true, leverageForex: "1:100" },
    },
  },
  {
    accountSize: 100000,
    label: "$100K",
    phases: {
      "1-phase": { price: 699, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "85%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 549, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "90%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 449, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "90%", refundEligible: true, leverageForex: "1:100" },
    },
  },
  {
    accountSize: 200000,
    label: "$200K",
    phases: {
      "1-phase": { price: 1199, profitTargets: ["10%"], dailyLoss: "4%", maxLoss: "8%", minDays: 3, profitSplit: "85%", refundEligible: true, leverageForex: "1:100" },
      "2-phase": { price: 999, profitTargets: ["8%", "5%"], dailyLoss: "5%", maxLoss: "10%", minDays: 5, profitSplit: "90%", refundEligible: true, leverageForex: "1:100" },
      "3-phase": { price: 799, profitTargets: ["6%", "5%", "4%"], dailyLoss: "5%", maxLoss: "12%", minDays: 5, profitSplit: "90%", refundEligible: true, leverageForex: "1:100" },
    },
  },
];

export const accountStyles = [
  { id: "normal", label: "Normal", desc: "Standard rules. No weekend holding restrictions vary by instrument." },
  { id: "swing", label: "Swing", desc: "Weekend holding allowed on all instruments. Ideal for swing traders." },
] as const;

export const tradingCurrencies = [
  "USD", "EUR", "GBP", "CAD", "AUD", "CHF", "JPY", "NZD",
  "SEK", "NOK", "DKK", "SGD", "HKD", "AED", "SAR", "TRY",
  "ZAR", "INR", "PKR", "MXN", "BRL", "PLN", "CZK", "HUF",
] as const;

export const marketCategories = [
  { id: "forex", label: "Forex", available: true },
  { id: "crypto", label: "Cryptocurrency", available: false },
  { id: "indices", label: "Indices", available: false },
  { id: "stocks", label: "Stocks", available: false },
  { id: "futures", label: "Futures", available: false },
  { id: "options", label: "Options", available: false },
  { id: "bonds", label: "Bonds", available: false },
  { id: "etfs", label: "Funds / ETFs", available: false },
  { id: "macro", label: "Economy / Macro", available: false },
] as const;
