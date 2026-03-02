// ═══════════════════════════════════════════════════════════
// AUTH CONTEXT — React provider wrapping AuthService
// ═══════════════════════════════════════════════════════════

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "@/services/auth";
import type { User } from "@/services/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (current: string, newPw: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle redirect results from signInWithRedirect (Safari)
  useEffect(() => {
    let cancelled = false;
    authService.handleRedirectResult().then((redirectUser) => {
      if (!cancelled && redirectUser) {
        setUser(redirectUser);
        window.location.replace(
          (import.meta.env.BASE_URL || "/") + "dashboard"
        );
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    await authService.signUp(email, password, fullName);
  };

  const signIn = async (email: string, password: string) => {
    await authService.signIn(email, password);
  };

  const signInWithGoogle = async () => {
    await authService.signInWithGoogle();
  };

  const signInWithApple = async () => {
    await authService.signInWithApple();
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email);
  };

  const updatePassword = async (current: string, newPw: string) => {
    await authService.updatePassword(current, newPw);
  };

  const sendEmailVerification = async () => {
    await authService.sendEmailVerification();
  };

  const refreshUser = async () => {
    const refreshed = await authService.refreshCurrentUser();
    if (refreshed) setUser(refreshed);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signInWithApple, signOut, resetPassword, updatePassword, sendEmailVerification, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
