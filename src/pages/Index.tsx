import { Link } from "react-router-dom";
import MarketingLayout from "@/components/MarketingLayout";
import { plans, testimonials, faqItems } from "@/lib/mockData";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Calendar,
  TrendingUp,
  Shield,
  Target,
  ChevronRight,
} from "lucide-react";

const proofItems = [
  "Fast payouts",
  "Real-time dashboard",
  "Clear rules",
  "Scalable funding",
];

const features = [
  { icon: BarChart3, title: "Real-time Stats", desc: "Live P/L, equity curves, and performance metrics updated in real-time." },
  { icon: Target, title: "Objectives Tracker", desc: "Visual progress bars for every trading objective and risk limit." },
  { icon: Calendar, title: "Payout Calendar", desc: "Know exactly when you're eligible and track your payout history." },
  { icon: TrendingUp, title: "Account Scaling", desc: "Grow from $10K to $200K+ with consistent performance." },
  { icon: Shield, title: "Rules Clarity", desc: "No hidden rules. Every policy is documented and tracked live." },
  { icon: Zap, title: "Risk Engine", desc: "Automated daily loss and max loss monitoring with real-time alerts." },
];

const steps = [
  { num: "01", title: "Choose Your Challenge", desc: "Select an account size and evaluation type that matches your trading style." },
  { num: "02", title: "Pass the Evaluation", desc: "Hit the profit target while respecting risk limits. No time pressure." },
  { num: "03", title: "Get Funded & Earn", desc: "Trade with our capital. Keep up to 90% of the profits you generate." },
];

export default function Index() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative dot-grid">
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-44">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up">
              Get Funded.
              <br />
              Trade with Discipline.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up delay-200">
              Prove your edge. Access up to $100K in trading capital with transparent rules, real-time tracking, and fast payouts.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Challenge <ArrowRight size={16} />
              </Link>
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Proof strip */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {proofItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 3-step flow */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 animate-fade-up">
          Three Steps to Funded
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`premium-card hover-lift animate-fade-up delay-${(i + 1) * 200}`}
            >
              <span className="text-4xl font-bold text-muted-foreground/30">{step.num}</span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="glow-line" /></div>

      {/* Plan cards preview */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-up">
            Choose Your Challenge
          </h2>
          <p className="mt-4 text-muted-foreground animate-fade-up delay-200">
            Select the account size that fits your strategy.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`premium-card hover-lift relative animate-fade-up delay-${(i + 1) * 100} ${
                plan.popular ? "border-foreground/30" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-4 bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold">${plan.price}</span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Account Size</span>
                  <span className="text-foreground">${plan.accountSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Target</span>
                  <span className="text-foreground">{plan.profitTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Split</span>
                  <span className="text-foreground">{plan.profitSplit}</span>
                </div>
              </div>
              <Link
                to="/challenges"
                className="mt-6 w-full inline-flex items-center justify-center gap-1 border border-border text-sm font-medium py-2.5 rounded-md hover:bg-secondary transition-colors"
              >
                View Details <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="glow-line" /></div>

      {/* Feature grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 animate-fade-up">
          Built for Serious Traders
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={feat.title} className={`premium-card hover-lift animate-fade-up delay-${(i + 1) * 100}`}>
              <feat.icon size={20} className="text-muted-foreground" />
              <h3 className="mt-4 text-base font-semibold">{feat.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="glow-line" /></div>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 animate-fade-up">
          Trusted by Traders
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`premium-card animate-fade-up delay-${(i + 1) * 200}`}>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="glow-line" /></div>

      {/* FAQ preview */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 animate-fade-up">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqItems.slice(0, 4).map((faq, i) => (
            <details
              key={i}
              className={`group premium-card cursor-pointer animate-fade-up delay-${(i + 1) * 100}`}
            >
              <summary className="flex items-center justify-between text-sm font-medium list-none">
                {faq.q}
                <ChevronRight size={16} className="text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            View all FAQ <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border dot-grid relative">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight animate-fade-up">
            Ready to Prove Your Edge?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
            Join thousands of traders funded by FYNX.
          </p>
          <div className="mt-8 animate-fade-up delay-300">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Your Challenge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
