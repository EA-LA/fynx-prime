import { useState } from "react";
import MarketingLayout from "@/components/MarketingLayout";
import { plans, aggressivePlans } from "@/lib/mockData";
import { challengeConfigs } from "@/lib/challengeConfig";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Globe2 } from "lucide-react";

type CompareView = "quick" | "full";
type PhaseType = "1-phase" | "2-phase" | "3-phase";

export default function ChallengesPricing() {
  const [mode, setMode] = useState<"normal" | "aggressive">("normal");
  const [compareView, setCompareView] = useState<CompareView>("quick");
  const [comparePhase, setComparePhase] = useState<PhaseType>("2-phase");
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
                <PlanRow label="Account Size" value={`$${plan.accountSize}`} />
                <PlanRow label="Profit Target" value={plan.profitTarget} />
                <PlanRow label="Daily Loss Limit" value={plan.dailyLoss} />
                <PlanRow label="Max Loss Limit" value={plan.maxLoss} />
                <PlanRow label="Min Trading Days" value={`${plan.minDays} days`} />
                <PlanRow label="Profit Split" value={plan.profitSplit} />
                <PlanRow label="Fee Refund" value={plan.refund ? "Yes" : "No"} />
              </div>
              <Link
                to="/challenge-builder"
                className="mt-6 w-full inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                Start Challenge <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="glow-line mb-16" />

        {/* Compare Plans — Enhanced */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-up">
          <h2 className="text-2xl font-bold">Compare Plans</h2>
          <div className="flex items-center gap-2">
            {/* Phase filter */}
            <div className="inline-flex items-center gap-1 bg-secondary rounded-md p-0.5">
              {(["1-phase", "2-phase", "3-phase"] as PhaseType[]).map((pt) => (
                <button
                  key={pt}
                  onClick={() => setComparePhase(pt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                    comparePhase === pt ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pt.replace("-", " ")}
                </button>
              ))}
            </div>
            {/* View toggle */}
            <div className="inline-flex items-center gap-1 bg-secondary rounded-md p-0.5">
              <button
                onClick={() => setCompareView("quick")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  compareView === "quick" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Quick
              </button>
              <button
                onClick={() => setCompareView("full")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  compareView === "full" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Full
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto animate-fade-up delay-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
                {challengeConfigs.map((c) => (
                  <th key={c.accountSize} className="text-center py-3 px-4 font-medium">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <CompareRow
                label="Price"
                values={challengeConfigs.map((c) => `$${c.phases[comparePhase].price}`)}
              />
              <CompareRow
                label="Phase Type"
                values={challengeConfigs.map(() => comparePhase.replace("-", " "))}
              />
              <CompareRow
                label="Profit Target(s)"
                values={challengeConfigs.map((c) => c.phases[comparePhase].profitTargets.join(" → "))}
              />
              <CompareRow
                label="Daily Loss Limit"
                values={challengeConfigs.map((c) => c.phases[comparePhase].dailyLoss)}
              />
              <CompareRow
                label="Max Loss Limit"
                values={challengeConfigs.map((c) => c.phases[comparePhase].maxLoss)}
              />
              <CompareRow
                label="Min Trading Days"
                values={challengeConfigs.map((c) => `${c.phases[comparePhase].minDays} days`)}
              />
              <CompareRow
                label="Profit Split"
                values={challengeConfigs.map((c) => c.phases[comparePhase].profitSplit)}
              />
              {compareView === "full" && (
                <>
                  <CompareRow
                    label="Leverage (Forex)"
                    values={challengeConfigs.map((c) => c.phases[comparePhase].leverageForex)}
                  />
                  <CompareRow
                    label="Fee Refund"
                    values={challengeConfigs.map((c) => c.phases[comparePhase].refundEligible ? "Yes" : "No")}
                    isCheck
                  />
                  <CompareRow
                    label="Normal Style"
                    values={challengeConfigs.map(() => "Available")}
                    isCheck
                  />
                  <CompareRow
                    label="Swing Style"
                    values={challengeConfigs.map(() => "Available")}
                    isCheck
                  />
                  <CompareRow
                    label="Weekend Holding"
                    values={challengeConfigs.map(() => "Swing only")}
                  />
                  <CompareRow
                    label="News Trading"
                    values={challengeConfigs.map(() => "Allowed")}
                  />
                  <CompareRow
                    label="Consistency Rule"
                    values={challengeConfigs.map(() => "Applied")}
                  />
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Global scope statement */}
        <div className="mt-12 premium-card animate-fade-up">
          <div className="flex items-start gap-3">
            <Globe2 size={18} className="text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Global Market Coverage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FYNX Funded supports trading across all major global currencies and financial markets.
                Forex trading is available now. Additional asset classes — including Crypto, Indices, Stocks, Futures, Options, Bonds, and Funds — are being rolled out in future phases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/50 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function CompareRow({ label, values, isCheck }: { label: string; values: string[]; isCheck?: boolean }) {
  return (
    <tr>
      <td className="py-3 px-4 text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="py-3 px-4 text-center">
          {isCheck ? <Check size={16} className="mx-auto" /> : v}
        </td>
      ))}
    </tr>
  );
}
