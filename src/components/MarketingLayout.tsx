import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import EcosystemSwitch from "@/components/EcosystemSwitch";
import { useI18n } from "@/lib/i18n";

const navLinks = [
  { key: "nav.home", to: "/" },
  { key: "nav.howItWorks", to: "/how-it-works" },
  { key: "nav.challenges", to: "/challenges" },
  { key: "nav.rules", to: "/rules" },
  { key: "nav.payouts", to: "/payouts" },
  { key: "nav.faq", to: "/faq" },
];

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold tracking-tight">
              FYNX<span className="text-muted-foreground font-light ml-1">Funded</span>
            </Link>
            <EcosystemSwitch />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 hover:text-foreground ${
                  location.pathname === link.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              {t("nav.getStarted")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                {t("nav.login")}
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md">
                {t("nav.getStarted")}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-sm font-semibold mb-4">{t("footer.product")}</h4>
              <div className="space-y-2">
                <Link to="/challenges" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.challenges")}</Link>
                <Link to="/rules" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.rules")}</Link>
                <Link to="/payouts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.payouts")}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">{t("footer.company")}</h4>
              <div className="space-y-2">
                <Link to="/how-it-works" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.howItWorks")}</Link>
                <Link to="/faq" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.faq")}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">{t("footer.legal")}</h4>
              <div className="space-y-2">
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
                <Link to="/risk-disclosure" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.risk")}</Link>
                <Link to="/refund-policy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.refund")}</Link>
                <Link to="/aml-kyc" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">AML/KYC Policy</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">{t("footer.connect")}</h4>
              <div className="space-y-2">
                <span className="block text-sm text-muted-foreground">Discord</span>
                <span className="block text-sm text-muted-foreground">Twitter</span>
                <span className="block text-sm text-muted-foreground">support@fynxfunded.com</span>
              </div>
            </div>
          </div>
          <div className="glow-line mb-8" />

          {/* Compliance area */}
          <div className="mb-6 p-4 border border-border rounded-md bg-card/50">
            <p className="text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-foreground/70">{t("footer.companyName")}</span> · support@fynxfunded.com
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
              <Link to="/risk-disclosure" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("footer.risk")}</Link>
              <Link to="/refund-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("footer.refund")}</Link>
              <Link to="/aml-kyc" className="text-xs text-muted-foreground hover:text-foreground transition-colors">AML/KYC Policy</Link>
            </div>
            <p className="text-xs text-muted-foreground/70">{t("footer.disclaimer")}</p>
          </div>

          <p className="text-xs text-muted-foreground/60 mb-6">
            FYNX Funded is building a multi-asset funded trading platform designed to support all major global markets and currencies.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t("footer.rights")}
            </p>
            <p className="text-xs text-muted-foreground max-w-md text-center md:text-right">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
