import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, name.trim());
      navigate("/dashboard");
    } catch (err) {
      console.error("[Signup] Sign up failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dot-grid relative px-6">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            FYNX<span className="text-muted-foreground font-light ml-1">Funded</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Create your account and start trading.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow"
              placeholder="trader@example.com"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-shadow pr-10"
                placeholder="Min. 8 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground hover:underline">Log in</Link>
        </p>
        <p className="mt-2 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
