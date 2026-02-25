// ═══════════════════════════════════════════════════════════
// ENVIRONMENT CONFIGURATION
// ═══════════════════════════════════════════════════════════
// Replace placeholder values with real keys to activate integrations.
// All values are read from environment variables (Vite import.meta.env).

export const config = {
  // ── Firebase ────────────────────────────────────────────
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  },

  // ── Stripe ──────────────────────────────────────────────
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
    // Secret key is SERVER-SIDE ONLY — never expose in client
  },

  // ── PayPal ──────────────────────────────────────────────
  paypal: {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
    mode: (import.meta.env.VITE_PAYPAL_MODE || "sandbox") as "sandbox" | "live",
  },

  // ── Crypto (Coinbase Commerce / custom) ─────────────────
  crypto: {
    apiKey: import.meta.env.VITE_CRYPTO_PROVIDER_KEY || "",
    provider: (import.meta.env.VITE_CRYPTO_PROVIDER || "coinbase") as string,
  },

  // ── Broker / Trading Platform ───────────────────────────
  broker: {
    apiUrl: import.meta.env.VITE_BROKER_API_URL || "",
    apiKey: import.meta.env.VITE_BROKER_API_KEY || "",
    platform: (import.meta.env.VITE_BROKER_PLATFORM || "mt5") as "mt5" | "tradelocker" | "matchtrader",
  },

  // ── KYC Provider ────────────────────────────────────────
  kyc: {
    provider: import.meta.env.VITE_KYC_PROVIDER || "",
    apiKey: import.meta.env.VITE_KYC_API_KEY || "",
  },

  // ── App ─────────────────────────────────────────────────
  app: {
    name: "FYNX Funded",
    url: import.meta.env.VITE_APP_URL || "https://www.fynxfunded.com",
    supportEmail: "support@fynxfunded.com",
  },
} as const;

// Helper: check if a service is configured
export const isConfigured = {
  firebase: () => !!config.firebase.apiKey,
  stripe: () => !!config.stripe.publishableKey,
  paypal: () => !!config.paypal.clientId,
  crypto: () => !!config.crypto.apiKey,
  broker: () => !!config.broker.apiUrl,
  kyc: () => !!config.kyc.provider,
};
