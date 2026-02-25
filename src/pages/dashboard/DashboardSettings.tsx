import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Mail, Smartphone, Monitor, Key, CheckCircle2, AlertTriangle, Globe2 } from "lucide-react";
import { countries } from "@/lib/countries";

export default function DashboardSettings() {
  // Profile from signup (read-only)
  const fullName = localStorage.getItem("fynx_user_name") || "";
  const email = localStorage.getItem("fynx_user_email") || "";

  const [nickname, setNickname] = useState(() => localStorage.getItem("fynx_user_nickname") || "");
  const [country, setCountry] = useState(() => localStorage.getItem("fynx_user_country") || "");

  // Security toggles
  const [emailVerification, setEmailVerification] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(false);
  const [sessionMgmt, setSessionMgmt] = useState(false);
  const [backupCodes, setBackupCodes] = useState(false);

  // Verification status
  const isVerified = false; // Will be connected to backend later

  const handleSaveProfile = () => {
    localStorage.setItem("fynx_user_nickname", nickname.trim());
    localStorage.setItem("fynx_user_country", country);
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${enabled ? "bg-foreground" : "bg-secondary"}`}
    >
      <div
        className="w-4 h-4 rounded-full bg-background absolute top-0.5 transition-all"
        style={{ left: enabled ? "calc(100% - 18px)" : "2px" }}
      />
    </button>
  );

  const SecurityRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    onToggle,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <Icon size={16} className="text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences.</p>
      </div>

      {/* Verification Status */}
      <div className={`premium-card border ${isVerified ? "border-foreground/20" : "border-border"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isVerified ? (
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-foreground" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ShieldAlert size={20} className="text-muted-foreground" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Identity Verification</h3>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-foreground/10 text-foreground px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                    <AlertTriangle size={10} /> Not Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isVerified
                  ? "Your identity has been verified. You are eligible for payouts."
                  : "Verification is required before payout. Complete KYC to become eligible."}
              </p>
            </div>
          </div>
          {!isVerified && (
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors shrink-0">
              Start Verification
            </button>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Profile Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Full Name</label>
            <input
              type="text"
              value={fullName}
              disabled
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-[10px] text-muted-foreground mt-1">Name cannot be changed after registration.</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-[10px] text-muted-foreground mt-1">Email cannot be changed.</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Display Name (Nickname)</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Choose a display name"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
            <p className="text-[10px] text-muted-foreground mt-1">This is your public display name.</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5 flex items-center gap-1">
              <Globe2 size={12} /> Country of Trading
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none"
            >
              <option value="">Select country...</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="text-[10px] text-muted-foreground mt-1">Your country of trading residence.</p>
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>

      {/* Security Options */}
      <div className="premium-card">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Security</h3>
        </div>
        <div className="divide-y divide-border">
          <SecurityRow
            icon={Mail}
            title="Email Verification"
            description="Verify your email address for account recovery."
            enabled={emailVerification}
            onToggle={() => setEmailVerification(!emailVerification)}
          />
          <SecurityRow
            icon={Smartphone}
            title="Two-Factor Authentication (2FA)"
            description="Use an authenticator app for additional login security."
            enabled={twoFA}
            onToggle={() => setTwoFA(!twoFA)}
          />
          <SecurityRow
            icon={Mail}
            title="Login Alerts"
            description="Receive email notifications for new sign-ins."
            enabled={loginAlerts}
            onToggle={() => setLoginAlerts(!loginAlerts)}
          />
          <SecurityRow
            icon={Monitor}
            title="Device & Session Management"
            description="Monitor and control active sessions across devices."
            enabled={sessionMgmt}
            onToggle={() => setSessionMgmt(!sessionMgmt)}
          />
          <SecurityRow
            icon={Key}
            title="Backup Recovery Codes"
            description="Generate one-time codes for account recovery."
            enabled={backupCodes}
            onToggle={() => setBackupCodes(!backupCodes)}
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Change Password</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current password"
            className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
          />
        </div>
        <button className="mt-4 border border-border px-6 py-2.5 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
          Update Password
        </button>
      </div>
    </div>
  );
}
