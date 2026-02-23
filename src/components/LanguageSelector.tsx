import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n, languages } from "@/lib/i18n";

export default function LanguageSelector() {
  const { lang, setLang, currentLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md border border-transparent hover:border-border"
      >
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-xs">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 max-h-80 bg-card border border-border rounded-md shadow-xl z-[100] overflow-hidden animate-fade-in">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language..."
              className="w-full bg-background border border-border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground/20"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-60">
            {filtered.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-accent transition-colors text-left ${
                  lang === l.code ? "text-foreground bg-accent/50" : "text-muted-foreground"
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="truncate">{l.name}</span>
                {lang === l.code && <span className="ml-auto text-xs opacity-50">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
