import { useState } from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { plans, aggressivePlans } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export default function ChallengesPricing() {
  const [mode, setMode] = useState<"normal" | "aggressive">("normal");
  const activePlans = mode === "normal" ? plans : aggressivePlans;

  return (
    <MarketingLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">
            Challenges & Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
            Choose the evaluation that matches your trading style.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 bg-secondary rounded-md p-1 animate-fade-up delay-300">
            <button
              onClick={() => setMode("normal")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "normal" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setMode("aggressive")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "aggressive" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Aggressive
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {activePlans.map((plan, i) => (
            <div
              key={plan.name}
              className={`premium-card hover-lift relative animate-fade-up delay-${(i + 1) * 100} ${
                plan.popular ? "border-foreground/30" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-4 bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">one-time</span>
              </div>
              <div className="space-y-3 text-sm">
                <Row label="Account Size" value={`$${plan.accountSize}`} />
                <Row label="Profit Target" value={plan.profitTarget} />
                <Row label="Daily Loss Limit" value={plan.dailyLoss} />
                <Row label="Max Loss Limit" value={plan.maxLoss} />
                <Row label="Min Trading Days" value={`${plan.minDays} days`} />
                <Row label="Profit Split" value={plan.profitSplit} />
                <Row label="Fee Refund" value={plan.refund ? "Yes" : "No"} />
              </div>
              <Link
                to="/signup"
                className="mt-6 w-full inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                Start Challenge <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="glow-line mb-16" />

        {/* Comparison table */}
        <h2 className="text-2xl font-bold text-center mb-8 animate-fade-up">Compare Plans</h2>
        <div className="overflow-x-auto animate-fade-up delay-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
                {activePlans.map((p) => (
                  <th key={p.name} className="text-center py-3 px-4 font-medium">{p.name.replace(" Challenge", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: "Price", key: "price", fmt: (v: number) => `$${v}` },
                { label: "Profit Target", key: "profitTarget" },
                { label: "Daily Loss", key: "dailyLoss" },
                { label: "Max Loss", key: "maxLoss" },
                { label: "Min Days", key: "minDays", fmt: (v: number) => `${v} days` },
                { label: "Profit Split", key: "profitSplit" },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="py-3 px-4 text-muted-foreground">{row.label}</td>
                  {activePlans.map((p) => (
                    <td key={p.name} className="py-3 px-4 text-center">
                      {row.fmt ? row.fmt((p as any)[row.key]) : (p as any)[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-3 px-4 text-muted-foreground">Fee Refund</td>
                {activePlans.map((p) => (
                  <td key={p.name} className="py-3 px-4 text-center">
                    <Check size={16} className="mx-auto" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </MarketingLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/50 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
