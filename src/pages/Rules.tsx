import MarketingLayout from "@/components/MarketingLayout";
import {
  AlertTriangle,
  Clock,
  Globe,
  Copy,
  TrendingDown,
  ShieldAlert,
  Newspaper,
  Monitor,
} from "lucide-react";

const rules = [
  {
    icon: TrendingDown,
    title: "Daily Loss Limit",
    desc: "Your equity cannot drop more than 5% from the previous day's closing balance within a single trading day.",
    tip: "Calculated at server EOD (5 PM EST). Includes floating P/L.",
  },
  {
    icon: AlertTriangle,
    title: "Maximum Loss Limit",
    desc: "Your equity cannot drop more than 10% from your initial account balance at any point.",
    tip: "This is a hard limit. Breaching this results in immediate account termination.",
  },
  {
    icon: Newspaper,
    title: "News Trading",
    desc: "Trading during high-impact news events is permitted. However, we reserve the right to review trades placed within 2 minutes of major releases.",
    tip: "Check the economic calendar before placing trades near major events.",
  },
  {
    icon: Clock,
    title: "Weekend Holding",
    desc: "Holding positions over the weekend is allowed on most instruments. Crypto positions may remain open.",
    tip: "Be mindful of gap risk on Monday opens.",
  },
  {
    icon: Copy,
    title: "Copy Trading",
    desc: "Copy trading from external signals or other FYNX accounts is not permitted. All trades must be independently executed.",
    tip: "Automated EAs are allowed if they are your own strategy.",
  },
  {
    icon: ShieldAlert,
    title: "Consistency Rule",
    desc: "No single trading day should account for more than 40% of total profits. This ensures consistent performance.",
    tip: "Aim for steady, repeatable results across multiple sessions.",
  },
  {
    icon: Globe,
    title: "Martingale / Grid / HFT",
    desc: "Martingale strategies, grid trading without stop losses, and high-frequency trading (latency arbitrage) are prohibited.",
    tip: "Standard automated strategies with proper risk management are welcome.",
  },
  {
    icon: Monitor,
    title: "IP & Device Policy",
    desc: "Your account should be accessed from a consistent IP and device. Significant changes may trigger a security review.",
    tip: "Using a VPN is allowed but keep it consistent.",
  },
];

export default function RulesPage() {
  return (
    <MarketingLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">Trading Rules</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
            Clear, fair, and fully transparent. Know exactly what's expected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {rules.map((rule, i) => (
            <div key={rule.title} className={`premium-card hover-lift animate-fade-up delay-${(i + 1) * 100}`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                  <rule.icon size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{rule.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
                  <div className="mt-3 px-3 py-2 bg-secondary/50 rounded text-xs text-muted-foreground">
                    💡 {rule.tip}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
