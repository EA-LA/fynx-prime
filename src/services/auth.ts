// ═══════════════════════════════════════════════════════════
// AUTH SERVICE — Firebase Auth adapter with local fallback
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
import { auth as firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
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
}

// ── Firebase adapter ──────────────────────────────────────

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

class FirebaseAuthService implements AuthService {
  private currentUser: User | null = null;

  private getAuth() {
    if (!firebaseAuth) {
      console.error("[AuthService] Firebase not configured");
      throw new Error("Firebase not configured. Please set VITE_FIREBASE_* environment variables.");
    }
    return firebaseAuth;
  }

  async signUp(email: string, password: string, fullName: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(this.getAuth(), email, password);
    await updateProfile(cred.user, { displayName: fullName });
    // Send verification email immediately after account creation
    await firebaseSendEmailVerification(cred.user);
    console.log("[AuthService] Verification email sent to", email);
    const user = firebaseUserToUser(cred.user);
    user.fullName = fullName;
    this.currentUser = user;
    return user;
  }

  async signIn(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(this.getAuth(), email, password);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.getAuth(), provider);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async signInWithApple(): Promise<User> {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    if (isSafari()) {
      await signInWithRedirect(this.getAuth(), provider);
      return {} as User;
    }
    const cred = await signInWithPopup(this.getAuth(), provider);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async handleRedirectResult(): Promise<User | null> {
    try {
      const result = await getRedirectResult(this.getAuth());
      if (result?.user) {
        const user = firebaseUserToUser(result.user);
        this.currentUser = user;
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
    await sendPasswordResetEmail(this.getAuth(), email);
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
    // In local mode, only allow sign-in if user was previously registered
    const stored = localStorage.getItem("fynx_session");
    if (stored) {
      try {
        const existing = JSON.parse(stored);
        if (existing.email === email) {
          this.persist(existing);
          return existing;
        }
      } catch { /* ignore */ }
    }
    const registeredEmail = localStorage.getItem("fynx_user_email");
    if (registeredEmail !== email) {
      throw new Error("auth/user-not-found");
    }
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
    console.error("[AuthService] Google sign-in requires Firebase configuration");
    throw new Error("Google sign-in requires Firebase configuration");
  }
  async signInWithApple(): Promise<User> {
    console.error("[AuthService] Apple sign-in requires Firebase configuration");
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
}

// Pick adapter based on whether Firebase keys are present
export const authService: AuthService = isFirebaseConfigured
  ? new FirebaseAuthService()
  : new LocalAuthService();
