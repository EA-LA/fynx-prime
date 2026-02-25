# FYNX Funded — Integration Checklist

## Architecture Overview

All services use a **provider/adapter pattern**. Each service has a clean interface with a localStorage-based placeholder implementation. To go live, replace the adapter class with real SDK calls — zero UI changes needed.

---

## Integration Points

### 1. Firebase Authentication
**File:** `src/services/auth.ts`
**Class to replace:** `LocalAuthService` → `FirebaseAuthService`
**Methods:**
- `signUp(email, password, fullName)` → `createUserWithEmailAndPassword`
- `signIn(email, password)` → `signInWithEmailAndPassword`
- `signOut()` → `firebase.auth().signOut()`
- `resetPassword(email)` → `sendPasswordResetEmail`
- `getCurrentUser()` → `firebase.auth().currentUser`
- `onAuthStateChange(cb)` → `firebase.auth().onAuthStateChanged`
- `updatePassword(current, new)` → reauthenticate + `updatePassword`
- `sendEmailVerification()` → `currentUser.sendEmailVerification()`

**Env vars needed:**
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

### 2. Firestore Database
**File:** `src/services/database.ts`
**Class to replace:** `LocalDataService` → `FirestoreDataService`
**Collections:**
| Collection | Interface | Key ID |
|---|---|---|
| `users` | `User` | `userId` |
| `orders` | `Order` | `orderId` |
| `challenges` | `Challenge` | `challengeId` |
| `accounts` | `TradingAccount` | `accountId` |
| `tickets` | `Ticket` | `ticketId` |
| `payouts` | `PayoutRequest` | `payoutId` |
| `audit_logs` | `AuditLog` | `id` |
| `rule_evaluations` | `RuleEvaluation` | auto |

---

### 3. Payments (Stripe / PayPal / Crypto)
**File:** `src/services/payments.ts`
**Class to replace:** `LocalPaymentProvider`
**Methods:**
- `createCheckoutSession(order, method)` — per method:
  - `card` → Stripe Checkout Sessions
  - `paypal` → PayPal Orders API
  - `apple` → Stripe with Apple Pay
  - `crypto` → Coinbase Commerce
- `confirmPayment(sessionId)` → verify via respective API
- `handleWebhook(event)` → server-side webhook handler

**Env vars needed:**
```
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_PAYPAL_CLIENT_ID=
VITE_PAYPAL_MODE=sandbox|live
VITE_CRYPTO_PROVIDER_KEY=
VITE_CRYPTO_PROVIDER=coinbase
```

**Webhook endpoints to create:**
- Stripe: `/api/webhooks/stripe`
- PayPal: `/api/webhooks/paypal`
- Crypto: `/api/webhooks/crypto`

---

### 4. Broker / Trading Data
**File:** `src/services/rules-engine.ts`
**Class to replace:** `LocalTradingDataProvider`
**Methods:**
- `getEquityTimeline(accountId)` → broker equity API
- `getBalanceTimeline(accountId)` → broker balance API
- `getTrades(accountId)` → broker trades API
- `getDailyPnL(accountId, date)` → compute from trades
- `getDailyPnLRange(accountId, start, end)` → range query

**Env vars needed:**
```
VITE_BROKER_API_URL=
VITE_BROKER_API_KEY=
VITE_BROKER_PLATFORM=mt5|tradelocker|matchtrader
```

---

### 5. KYC Provider
**File:** `src/services/payouts.ts`
**Functions:** `getKycStatus()`, `updateKycStatus()`
**Replace with:** KYC provider webhook integration (Sumsub, Onfido, etc.)

**Env vars needed:**
```
VITE_KYC_PROVIDER=
VITE_KYC_API_KEY=
```

---

## Config File
**File:** `src/config/environment.ts`
All env vars are read here. Set values in `.env` or deployment environment.

## Data Types
**File:** `src/services/types.ts`
All shared interfaces: User, Order, Challenge, TradingAccount, Ticket, PayoutRequest, AuditLog, RuleEvaluation.

## React Auth Context
**File:** `src/contexts/AuthContext.tsx`
Provides `useAuth()` hook — wraps AuthService for React components.

## Protected Routes
**File:** `src/components/ProtectedRoute.tsx`
Wraps dashboard routes — redirects to `/login` if not authenticated.

---

## ✅ Checklist — What You Need to Add

- [ ] Firebase project credentials (6 env vars)
- [ ] Stripe publishable key + webhook secret
- [ ] PayPal client ID
- [ ] Crypto provider API key
- [ ] Broker API URL + key
- [ ] KYC provider API key
- [ ] Server-side webhook endpoints (3)
- [ ] Replace `LocalAuthService` with Firebase adapter
- [ ] Replace `LocalDataService` with Firestore adapter
- [ ] Replace `LocalPaymentProvider` with real payment adapters
- [ ] Replace `LocalTradingDataProvider` with broker API adapter

**No other code changes needed.** All UI, routing, state management, and business logic is wired and ready.
