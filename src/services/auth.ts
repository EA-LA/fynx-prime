// ═══════════════════════════════════════════════════════════
// AUTH SERVICE — Firebase-ready adapter
// ═══════════════════════════════════════════════════════════
// Replace the placeholder implementations with Firebase Auth
// calls (e.g. createUserWithEmailAndPassword, signInWithEmailAndPassword, etc.)

import type { User } from "./types";

export interface AuthService {
  signUp(email: string, password: string, fullName: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): User | null;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  sendEmailVerification(): Promise<void>;
}

// ── Placeholder adapter (localStorage-based) ──────────────
// This is the drop-in replacement target. Swap this class
// with FirebaseAuthService when ready.

class LocalAuthService implements AuthService {
  private listeners: Array<(user: User | null) => void> = [];
  private currentUser: User | null = null;

  constructor() {
    // Restore session
    const stored = localStorage.getItem("fynx_session");
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
      } catch {
        this.currentUser = null;
      }
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

  async signUp(email: string, password: string, fullName: string): Promise<User> {
    // 🔌 Replace with: firebase.auth().createUserWithEmailAndPassword(email, password)
    const user: User = {
      userId: `usr_${Date.now().toString(36)}`,
      email,
      fullName,
      nickname: "",
      country: "",
      createdAt: new Date().toISOString(),
      emailVerified: false,
      kycStatus: "not_started",
    };
    this.persist(user);
    return user;
  }

  async signIn(email: string, password: string): Promise<User> {
    // 🔌 Replace with: firebase.auth().signInWithEmailAndPassword(email, password)
    const existingName = localStorage.getItem("fynx_user_name") || "Trader";
    const user: User = {
      userId: `usr_${Date.now().toString(36)}`,
      email,
      fullName: existingName,
      nickname: localStorage.getItem("fynx_user_nickname") || "",
      country: localStorage.getItem("fynx_user_country") || "",
      createdAt: new Date().toISOString(),
      emailVerified: false,
      kycStatus: "not_started",
    };
    this.persist(user);
    return user;
  }

  async signOut(): Promise<void> {
    // 🔌 Replace with: firebase.auth().signOut()
    this.persist(null);
  }

  async resetPassword(email: string): Promise<void> {
    // 🔌 Replace with: firebase.auth().sendPasswordResetEmail(email)
    console.log(`[AuthService] Password reset sent to ${email}`);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    // Fire immediately with current state
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  async updatePassword(_current: string, _newPw: string): Promise<void> {
    // 🔌 Replace with: firebase reauthenticate + updatePassword
    console.log("[AuthService] Password updated");
  }

  async sendEmailVerification(): Promise<void> {
    // 🔌 Replace with: firebase.auth().currentUser.sendEmailVerification()
    console.log("[AuthService] Verification email sent");
  }
}

// Singleton export
export const authService: AuthService = new LocalAuthService();
