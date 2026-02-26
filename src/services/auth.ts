// ═══════════════════════════════════════════════════════════
// AUTH SERVICE — Firebase Auth adapter
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
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
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
}

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

class FirebaseAuthService implements AuthService {
  private currentUser: User | null = null;

  async signUp(email: string, password: string, fullName: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: fullName });
    const user = firebaseUserToUser(cred.user);
    user.fullName = fullName;
    this.currentUser = user;
    return user;
  }

  async signIn(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async signInWithApple(): Promise<User> {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    const cred = await signInWithPopup(auth, provider);
    const user = firebaseUserToUser(cred.user);
    this.currentUser = user;
    return user;
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
    this.currentUser = null;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (fbUser) => {
      const user = fbUser ? firebaseUserToUser(fbUser) : null;
      this.currentUser = user;
      callback(user);
    });
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const fbUser = auth.currentUser;
    if (!fbUser || !fbUser.email) throw new Error("Not authenticated");
    const credential = EmailAuthProvider.credential(fbUser.email, currentPassword);
    await reauthenticateWithCredential(fbUser, credential);
    await firebaseUpdatePassword(fbUser, newPassword);
  }

  async sendEmailVerification(): Promise<void> {
    const fbUser = auth.currentUser;
    if (!fbUser) throw new Error("Not authenticated");
    await firebaseSendEmailVerification(fbUser);
  }
}

// Singleton export
export const authService: AuthService = new FirebaseAuthService();
