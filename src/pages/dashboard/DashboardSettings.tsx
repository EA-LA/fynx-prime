import { useState } from "react";

export default function DashboardSettings() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences.</p>
      </div>

      {/* Profile */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Profile Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="trader@example.com"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Country</label>
            <input
              type="text"
              defaultValue="United States"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 000-0000"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Security */}
      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`w-10 h-5 rounded-full transition-colors relative ${twoFA ? "bg-foreground" : "bg-secondary"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-background absolute top-0.5 transition-all ${twoFA ? "left-5.5 right-0.5" : "left-0.5"}`}
                style={{ left: twoFA ? "calc(100% - 18px)" : "2px" }}
              />
            </button>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium mb-2">Change Password</p>
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
      </div>
    </div>
  );
}
