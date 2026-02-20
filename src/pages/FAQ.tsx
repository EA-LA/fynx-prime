import MarketingLayout from "@/components/MarketingLayout";
import { faqItems } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";

export default function FAQ() {
  return (
    <MarketingLayout>
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-up">FAQ</h1>
        <p className="text-lg text-muted-foreground mb-16 animate-fade-up delay-200">
          Everything you need to know about FYNX Funded.
        </p>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <details
              key={i}
              className={`group premium-card cursor-pointer animate-fade-up delay-${((i % 8) + 1) * 100}`}
            >
              <summary className="flex items-center justify-between text-sm font-medium list-none">
                {faq.q}
                <ChevronRight size={16} className="text-muted-foreground transition-transform group-open:rotate-90 shrink-0 ml-4" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
