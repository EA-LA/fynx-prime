import MarketingLayout from "@/components/MarketingLayout";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const timeline = [
  { step: "1", title: "Meet Profit Target", desc: "Reach the minimum profit threshold in your funded account." },
  { step: "2", title: "Request Payout", desc: "Submit a payout request through your dashboard." },
  { step: "3", title: "Review & Approval", desc: "Our team reviews within 24 hours." },
  { step: "4", title: "Receive Funds", desc: "Funds transferred via wire or crypto within 24-48 hours." },
];

const eligibility = [
  "Minimum 5 trading days since last payout",
  "No active rule violations",
  "All positions closed at time of request",
  "KYC verification completed",
  "Minimum payout amount: $50",
];

const calendarData = [
  { period: "1st – 15th", request: "1st – 3rd", payout: "5th – 7th" },
  { period: "16th – 31st", request: "16th – 18th", payout: "20th – 22nd" },
];

export default function PayoutsPage() {
  return (
    <MarketingLayout>
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-up">Payouts</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
            Fast, transparent, and on your schedule.
          </p>
        </div>

        {/* Profit split */}
        <div className="premium-card mb-12 animate-fade-up delay-300">
          <h2 className="text-xl font-bold mb-4">Profit Split</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Funded traders keep up to 90% of profits generated. The split scales with your account tier:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { tier: "$10K – $25K", split: "80/20" },
              { tier: "$50K", split: "85/15" },
              { tier: "$100K+", split: "90/10" },
            ].map((t) => (
              <div key={t.tier} className="bg-secondary rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">{t.tier}</p>
                <p className="text-2xl font-bold mt-1">{t.split}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <h2 className="text-2xl font-bold mb-8 animate-fade-up">Payout Timeline</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {timeline.map((t, i) => (
            <div key={t.step} className={`premium-card animate-fade-up delay-${(i + 1) * 100}`}>
              <span className="text-3xl font-bold text-muted-foreground/30">{t.step}</span>
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="glow-line mb-16" />

        {/* Eligibility */}
        <h2 className="text-2xl font-bold mb-8 animate-fade-up">Eligibility Checklist</h2>
        <div className="premium-card mb-16 animate-fade-up delay-200">
          <div className="space-y-3">
            {eligibility.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-muted-foreground shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <h2 className="text-2xl font-bold mb-8 animate-fade-up">Payout Calendar</h2>
        <div className="overflow-x-auto animate-fade-up delay-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Request Window</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payout Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {calendarData.map((row) => (
                <tr key={row.period}>
                  <td className="py-3 px-4">{row.period}</td>
                  <td className="py-3 px-4">{row.request}</td>
                  <td className="py-3 px-4">{row.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center animate-fade-up">
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your Challenge <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
