import MarketingLayout from "@/components/MarketingLayout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const phases = [
  {
    num: "Phase 1",
    title: "Evaluation",
    desc: "Demonstrate your trading ability by reaching the profit target while staying within risk limits.",
    details: ["Hit 8% profit target", "Stay within 5% daily loss", "Stay within 10% max loss", "Trade minimum 5 days", "No time limit"],
  },
  {
    num: "Phase 2",
    title: "Verification",
    desc: "Confirm your consistency with a second round of trading under the same risk parameters.",
    details: ["Hit 5% profit target", "Same risk limits apply", "Trade minimum 5 days", "Prove consistency", "No time limit"],
  },
  {
    num: "Funded",
    title: "Live Trading",
    desc: "Trade with our capital. Keep up to 90% of profits. Scale your account with performance.",
    details: ["Up to 90% profit split", "Bi-weekly payouts", "Account scaling plan", "Full dashboard access", "Fee refunded on first payout"],
  },
];

export default function HowItWorks() {
  return (
    <MarketingLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">How It Works</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
            A transparent, straightforward path from evaluation to funded trader.
          </p>
        </div>

        <div className="space-y-8">
          {phases.map((phase, i) => (
            <div key={phase.num} className={`premium-card hover-lift animate-fade-up delay-${(i + 1) * 200}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="shrink-0">
                  <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">{phase.num}</span>
                  <h2 className="text-2xl font-bold mt-1">{phase.title}</h2>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">{phase.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {phase.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-muted-foreground shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up delay-800">
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            View Challenges <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
