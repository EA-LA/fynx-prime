// Firebase error code → user-friendly message
const errorMap: Record<string, string> = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/user-not-found": "Account not found. Please sign up.",
  "auth/wrong-password": "Incorrect password.",
  "auth/email-already-in-use": "This email is already registered. Please log in.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/expired-action-code": "This link has expired. Please request a new one.",
  "auth/invalid-action-code": "This link is invalid or has already been used.",
};

export function mapFirebaseError(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    if (errorMap[code]) return errorMap[code];
  }
  if (error instanceof Error) {
    // Strip "Firebase: " prefix if present
    const msg = error.message.replace(/^Firebase:\s*/i, "").replace(/\s*\(auth\/[^)]+\)\.?$/, "");
    return msg || "An unexpected error occurred.";
  }
  return "An unexpected error occurred.";
}
