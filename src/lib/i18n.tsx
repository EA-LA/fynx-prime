import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "fil", name: "Filipino", flag: "🇵🇭" },
  { code: "zh-CN", name: "中文 (简体)", flag: "🇨🇳" },
  { code: "zh-TW", name: "中文 (繁體)", flag: "🇹🇼" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "zu", name: "isiZulu", flag: "🇿🇦" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "so", name: "Soomaali", flag: "🇸🇴" },
];

type Translations = Record<string, string>;

const en: Translations = {
  "nav.home": "Home",
  "nav.howItWorks": "How It Works",
  "nav.challenges": "Challenges",
  "nav.rules": "Rules",
  "nav.payouts": "Payouts",
  "nav.faq": "FAQ",
  "nav.login": "Log in",
  "nav.getStarted": "Get Started",
  "nav.signup": "Sign up",
  "hero.headline": "Trade With Institutional Capital",
  "hero.subheadline": "Prove your edge. Get funded. Keep up to 90% of profits.",
  "btn.startChallenge": "Start Challenge",
  "btn.viewPlans": "View Plans",
  "btn.continue": "Continue",
  "btn.back": "Back",
  "btn.submit": "Submit",
  "form.email": "Email",
  "form.password": "Password",
  "form.fullName": "Full Name",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.connect": "Connect",
  "footer.terms": "Terms of Service",
  "footer.privacy": "Privacy Policy",
  "footer.risk": "Risk Disclosure",
  "footer.refund": "Refund Policy",
  "footer.rights": "© 2026 FYNX Funded. All rights reserved.",
  "footer.disclaimer": "Trading involves substantial risk. Past performance is not indicative of future results. This is a simulated trading environment.",
  "footer.companyName": "FYNX Funded LLC (Draft)",
  "theme.dark": "Dark",
  "theme.light": "Light",
  "lang.translationNote": "Translations coming soon",
};

const es: Translations = {
  "nav.home": "Inicio",
  "nav.howItWorks": "Cómo Funciona",
  "nav.challenges": "Desafíos",
  "nav.rules": "Reglas",
  "nav.payouts": "Pagos",
  "nav.faq": "Preguntas",
  "nav.login": "Iniciar sesión",
  "nav.getStarted": "Comenzar",
  "nav.signup": "Registrarse",
  "hero.headline": "Opera con Capital Institucional",
  "hero.subheadline": "Demuestra tu ventaja. Obtén financiación. Conserva hasta el 90% de las ganancias.",
  "btn.startChallenge": "Iniciar Desafío",
  "btn.viewPlans": "Ver Planes",
  "btn.continue": "Continuar",
  "btn.back": "Atrás",
  "btn.submit": "Enviar",
  "form.email": "Correo electrónico",
  "form.password": "Contraseña",
  "form.fullName": "Nombre Completo",
  "footer.product": "Producto",
  "footer.company": "Empresa",
  "footer.legal": "Legal",
  "footer.connect": "Contacto",
  "footer.terms": "Términos de Servicio",
  "footer.privacy": "Política de Privacidad",
  "footer.risk": "Divulgación de Riesgos",
  "footer.refund": "Política de Reembolso",
  "footer.rights": "© 2026 FYNX Funded. Todos los derechos reservados.",
  "footer.disclaimer": "El trading implica riesgo sustancial. El rendimiento pasado no es indicativo de resultados futuros.",
  "footer.companyName": "FYNX Funded LLC (Borrador)",
  "theme.dark": "Oscuro",
  "theme.light": "Claro",
  "lang.translationNote": "Traducciones próximamente",
};

const fr: Translations = {
  "nav.home": "Accueil",
  "nav.howItWorks": "Comment ça marche",
  "nav.challenges": "Défis",
  "nav.rules": "Règles",
  "nav.payouts": "Paiements",
  "nav.faq": "FAQ",
  "nav.login": "Connexion",
  "nav.getStarted": "Commencer",
  "nav.signup": "S'inscrire",
  "hero.headline": "Tradez avec du Capital Institutionnel",
  "hero.subheadline": "Prouvez votre avantage. Soyez financé. Conservez jusqu'à 90% des profits.",
  "btn.startChallenge": "Lancer le Défi",
  "btn.viewPlans": "Voir les Plans",
  "btn.continue": "Continuer",
  "btn.back": "Retour",
  "btn.submit": "Soumettre",
  "form.email": "E-mail",
  "form.password": "Mot de passe",
  "form.fullName": "Nom Complet",
  "footer.product": "Produit",
  "footer.company": "Entreprise",
  "footer.legal": "Juridique",
  "footer.connect": "Contact",
  "footer.terms": "Conditions d'Utilisation",
  "footer.privacy": "Politique de Confidentialité",
  "footer.risk": "Divulgation des Risques",
  "footer.refund": "Politique de Remboursement",
  "footer.rights": "© 2026 FYNX Funded. Tous droits réservés.",
  "footer.disclaimer": "Le trading comporte des risques substantiels. Les performances passées ne sont pas indicatives des résultats futurs.",
  "footer.companyName": "FYNX Funded LLC (Brouillon)",
  "theme.dark": "Sombre",
  "theme.light": "Clair",
  "lang.translationNote": "Traductions à venir",
};

const allTranslations: Record<string, Translations> = { en, es, fr };

interface I18nContextType {
  lang: string;
  setLang: (code: string) => void;
  t: (key: string) => string;
  currentLanguage: Language;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  currentLanguage: languages[0],
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("fynx-lang") || "en";
    } catch {
      return "en";
    }
  });

  const setLang = useCallback((code: string) => {
    setLangState(code);
    try {
      localStorage.setItem("fynx-lang", code);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = allTranslations[lang] || allTranslations["en"];
      return dict[key] || allTranslations["en"][key] || key;
    },
    [lang]
  );

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  return (
    <I18nContext.Provider value={{ lang, setLang, t, currentLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
