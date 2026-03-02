import { useState } from "react";
import { AlertTriangle, Mail, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailVerificationBanner() {
  const { user, sendEmailVerification, refreshUser } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  const handleResend = async () => {
    setSending(true);
    setError("");
    try {
      await sendEmailVerification();
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send verification email");
    } finally {
      setSending(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshUser();
    } catch {
      // silently fail
    }
  };

  return (
    <div className="bg-secondary border border-border rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
      <AlertTriangle size={16} className="text-muted-foreground mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">Email not verified</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {sent
            ? "Verification email sent. Check your inbox and click the link, then refresh."
            : "Verify your email address to unlock payouts and full account access."}
        </p>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        <div className="flex items-center gap-2 mt-2">
          {!sent ? (
            <button
              onClick={handleResend}
              disabled={sending}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Mail size={12} />
              {sending ? "Sending..." : "Resend Verification Email"}
            </button>
          ) : (
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-md hover:bg-secondary transition-colors"
            >
              I've verified — refresh
            </button>
          )}
        </div>
      </div>
      <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}
