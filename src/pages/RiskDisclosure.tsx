import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  {
    id: "general-risk",
    title: "General Risk of Trading",
    content: (
      <p>Trading financial instruments including forex, contracts for difference (CFDs), indices, commodities, and cryptocurrencies involves substantial risk of loss. Losses can exceed your initial expectations and, in certain environments, your initial capital. You should not trade with money you cannot afford to lose.</p>
    ),
  },
  {
    id: "leverage",
    title: "Leverage Risk",
    content: (
      <p>Leverage amplifies both gains and losses. A small market movement can result in proportionally much larger gains or losses. While leverage can increase potential profits, it equally increases potential losses. You should fully understand how leverage works before engaging in leveraged trading.</p>
    ),
  },
  {
    id: "volatility",
    title: "Market Volatility, Gaps & Slippage",
    content: (
      <>
        <p>Financial markets are subject to rapid and unpredictable price movements. Factors such as economic data releases, geopolitical events, central bank decisions, and market sentiment can cause significant volatility.</p>
        <p>Price gaps (differences between the closing price and the next opening price) can occur, particularly around weekends, holidays, and major news events. Slippage (execution at a different price than expected) may occur during volatile conditions or low liquidity.</p>
      </>
    ),
  },
  {
    id: "tech-risk",
    title: "Technology Risks",
    content: (
      <p>Trading platforms, internet connections, and electronic systems are subject to interruptions, outages, delays, and errors. Platform downtime, connectivity issues, data feed errors, and execution delays may prevent you from managing positions effectively. We are not liable for losses resulting from technology failures beyond our reasonable control.</p>
    ),
  },
  {
    id: "past-performance",
    title: "Past Performance",
    content: (
      <p>Past performance is not indicative of future results. Historical returns, statistics, and simulated performance data do not guarantee future profitability. Market conditions change, and strategies that performed well historically may not perform well in the future.</p>
    ),
  },
  {
    id: "simulated",
    title: "Simulated Trading Environments",
    content: (
      <p>Evaluation and challenge accounts may operate in simulated environments with virtual capital. Simulated results may differ significantly from live trading due to factors including but not limited to execution quality, liquidity, slippage, and emotional factors. Success in a simulated environment does not guarantee success in live trading.</p>
    ),
  },
  {
    id: "responsibility",
    title: "User Responsibility",
    content: (
      <p>You are solely responsible for your trading decisions and their outcomes. The Platform does not provide investment advice, trading signals, or recommendations. Any educational content, market analysis, or commentary provided is for informational purposes only and should not be construed as advice.</p>
    ),
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction Restrictions",
    content: (
      <p>The availability and legality of trading certain financial instruments varies by jurisdiction. It is your responsibility to ensure compliance with all applicable local laws and regulations. The Platform may not be available or authorized for use in all jurisdictions. We reserve the right to restrict access based on geographic location.</p>
    ),
  },
];

export default function RiskDisclosure() {
  return (
    <LegalPageLayout
      title="Risk Disclosure"
      lastUpdated="February 2026"
      disclaimer="This is a template for informational purposes and does not constitute legal advice. Consult a qualified attorney and financial advisor for guidance specific to your situation."
      sections={sections}
    />
  );
}
