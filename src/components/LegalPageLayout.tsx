import MarketingLayout from "./MarketingLayout";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  disclaimer?: string;
  sections: Section[];
}

export default function LegalPageLayout({ title, lastUpdated, disclaimer, sections }: LegalPageLayoutProps) {
  return (
    <MarketingLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          {disclaimer && (
            <div className="mt-4 border border-border bg-accent/30 rounded-md px-4 py-3">
              <p className="text-xs text-muted-foreground italic">⚠ {disclaimer}</p>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 border border-border rounded-md p-5 bg-card animate-fade-up delay-100">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Table of Contents</h2>
          <ol className="space-y-1.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.03}s` }}>
              <h2 className="text-lg font-semibold mb-3">
                {i + 1}. {s.title}
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                {s.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
