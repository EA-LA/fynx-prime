// ═══════════════════════════════════════════════════════════
// AUTH SERVICE — Firebase Auth + Firestore adapter
// ═══════════════════════════════════════════════════════════

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  sendEmailVerification as firebaseSendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth as firebaseAuth, db as firebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { recordLoginSession } from "@/services/session-tracker";
import type { User } from "./types";

export interface AuthService {
  signUp(email: string, password: string, fullName: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  signInWithGoogle(): Promise<User>;
  signInWithApple(): Promise<User>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): User | null;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  sendEmailVerification(): Promise<void>;
  handleRedirectResult(): Promise<User | null>;
  refreshCurrentUser(): Promise<User | null>;
}

// ── Firestore user doc helpers ────────────────────────────

async function createOrUpdateFirestoreUser(
  uid: string,
  data: { email: string; displayName: string; provider: string },
) {
  if (!firebaseDb) return;
  const userRef = doc(firebaseDb, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid,
      email: data.email,
      displayName: data.displayName,
      provider: data.provider,
      createdAt: serverTimestamp(),
    });
  }
}

// ── Map Firebase user → app User ─────────────────────────

function firebaseUserToUser(fbUser: import("firebase/auth").User): User {
  return {
    userId: fbUser.uid,
    email: fbUser.email || "",
    fullName: fbUser.displayName || "",
    nickname: "",
    country: "",
    createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
    emailVerified: fbUser.emailVerified,
    kycStatus: "not_started",
  };
}

function isSafari(): boolean {
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

// ── Firebase adapter ──────────────────────────────────────

class FirebaseAuthService implements AuthService {
  private currentUser: User | null = null;

  private getAuth() {
    if (!firebaseAuth) throw new Error("Firebase not configured");
    return firebaseAuth;
  }

  async signUp(email: string, password: string, fullName: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(this.getAuth(), email, password);
    await updateProfile(cred.user, { displayName: fullName });
    await firebaseSendEmailVerification(cred.user);

    await createOrUpdateFirestoreUser(cred.user.uid, {
      email,
      displayName: fullName,
      provider: "email",
    });

    const user = firebaseUserToUser(cred.user);
    user.fullName = fullName;
    this.currentUser = user;

    // Sign out — user must verify email before logging in
    await firebaseSignOut(this.getAuth());
    this.currentUser = null;

    return user;
  }

  async signIn(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(this.getAuth(), email, password);

    // Block login if email is not verified
    if (!cred.user.emailVerified) {
      await firebaseSignOut(this.getAuth());
      throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
    }

    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;

    // Record session
    recordLoginSession(user.userId).catch(console.error);

    return user;
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    if (isSafari()) {
      await signInWithRedirect(this.getAuth(), provider);
      return {} as User;
    }
    const cred = await signInWithPopup(this.getAuth(), provider);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;

    await createOrUpdateFirestoreUser(cred.user.uid, {
      email: cred.user.email || "",
      displayName: cred.user.displayName || "",
      provider: "google",
    });

    // Record session
    recordLoginSession(user.userId).catch(console.error);

    return user;
  }

  async signInWithApple(): Promise<User> {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    try {
      await signInWithRedirect(this.getAuth(), provider);
    } catch (err: any) {
      // Surface clear error if Apple provider isn't configured in Firebase
      if (err?.code === "auth/operation-not-allowed") {
        throw new Error("Apple Sign-In is not configured yet. Enable it in Firebase Console.");
      }
      throw err;
    }
    return {} as User;
  }

  async handleRedirectResult(): Promise<User | null> {
    try {
      const result = await getRedirectResult(this.getAuth());
      if (result?.user) {
        const user = firebaseUserToUser(result.user);
        this.currentUser = user;

        const providerId = result.providerId || "oauth";
        const providerName = providerId.includes("apple") ? "apple" : providerId.includes("google") ? "google" : providerId;

        await createOrUpdateFirestoreUser(result.user.uid, {
          email: result.user.email || "",
          displayName: result.user.displayName || "",
          provider: providerName,
        });

        // Record session after redirect login
        recordLoginSession(user.userId).catch(console.error);

        return user;
      }
    } catch (err) {
      console.error("[AuthService] Redirect result error:", err);
    }
    return null;
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(this.getAuth());
    this.currentUser = null;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.getAuth(), email, {
      url: window.location.origin + (import.meta.env.BASE_URL || "/") + "reset-password",
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.getAuth(), (fbUser) => {
      const user = fbUser ? firebaseUserToUser(fbUser) : null;
      this.currentUser = user;
      callback(user);
    });
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const fbUser = this.getAuth().currentUser;
    if (!fbUser || !fbUser.email) throw new Error("Not authenticated");
    const credential = EmailAuthProvider.credential(fbUser.email, currentPassword);
    await reauthenticateWithCredential(fbUser, credential);
    await firebaseUpdatePassword(fbUser, newPassword);
  }

  async sendEmailVerification(): Promise<void> {
    const fbUser = this.getAuth().currentUser;
    if (!fbUser) throw new Error("Not authenticated");
    await firebaseSendEmailVerification(fbUser);
  }

  async refreshCurrentUser(): Promise<User | null> {
    const fbUser = this.getAuth().currentUser;
    if (!fbUser) return null;
    await fbUser.reload();
    const user = firebaseUserToUser(fbUser);
    this.currentUser = user;
    return user;
  }
}

// ── Local fallback (no Firebase keys) ─────────────────────

class LocalAuthService implements AuthService {
  private listeners: Array<(user: User | null) => void> = [];
  private currentUser: User | null = null;

  constructor() {
    const stored = localStorage.getItem("fynx_session");
    if (stored) {
      try { this.currentUser = JSON.parse(stored); } catch { this.currentUser = null; }
    }
  }

  private persist(user: User | null) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem("fynx_session", JSON.stringify(user));
      localStorage.setItem("fynx_user_name", user.fullName);
      localStorage.setItem("fynx_user_email", user.email);
    } else {
      localStorage.removeItem("fynx_session");
    }
    this.listeners.forEach((cb) => cb(user));
  }

  async signUp(email: string, _password: string, fullName: string): Promise<User> {
    const user: User = {
      userId: `usr_${Date.now().toString(36)}`, email, fullName, nickname: "", country: "",
      createdAt: new Date().toISOString(), emailVerified: false, kycStatus: "not_started",
    };
    this.persist(user);
    return user;
  }

  async signIn(email: string, _password: string): Promise<User> {
    const user: User = {
      userId: `usr_${Date.now().toString(36)}`, email,
      fullName: localStorage.getItem("fynx_user_name") || "Trader",
      nickname: "", country: "",
      createdAt: new Date().toISOString(), emailVerified: false, kycStatus: "not_started",
    };
    this.persist(user);
    return user;
  }

  async signInWithGoogle(): Promise<User> {
    throw new Error("Google sign-in requires Firebase configuration");
  }
  async signInWithApple(): Promise<User> {
    throw new Error("Apple sign-in requires Firebase configuration");
  }
  async handleRedirectResult(): Promise<User | null> { return null; }
  async signOut(): Promise<void> { this.persist(null); }
  async resetPassword(_email: string): Promise<void> { console.log("[AuthService] Password reset (local mode)"); }
  getCurrentUser(): User | null { return this.currentUser; }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => { this.listeners = this.listeners.filter((cb) => cb !== callback); };
  }

  async updatePassword(): Promise<void> { console.log("[AuthService] Password updated (local mode)"); }
  async sendEmailVerification(): Promise<void> { console.log("[AuthService] Verification email (local mode)"); }
  async refreshCurrentUser(): Promise<User | null> { return this.currentUser; }
}

// In production, LocalAuth is NEVER allowed — Firebase must be configured.
// In dev, LocalAuth is only allowed if VITE_ALLOW_LOCAL_AUTH=true.
const allowLocalFallback =
  import.meta.env.DEV && import.meta.env.VITE_ALLOW_LOCAL_AUTH === "true";

export const authService: AuthService = isFirebaseConfigured
  ? new FirebaseAuthService()
  : allowLocalFallback
    ? new LocalAuthService()
    : (() => {
        const msg = "Firebase is not configured. Set VITE_FIREBASE_* environment variables.";
        if (!import.meta.env.DEV) {
          // Production: throw hard — app cannot function without auth
          throw new Error(msg);
        }
        console.error("[AuthService]", msg, "Using LocalAuthService as fallback (dev only).");
        return new LocalAuthService();
      })();
