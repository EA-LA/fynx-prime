import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Block unverified email/password users (OAuth users are typically auto-verified)
  if (user.provider === "email" && !user.emailVerified) {
    return <Navigate to="/login" replace state={{ message: "Please verify your email before accessing the dashboard." }} />;
  }

  return <>{children}</>;
}
