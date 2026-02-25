import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  CreditCard,
  FileText,
  Settings,
  Activity,
  ArrowLeft,
  Search,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Pause,
  RefreshCw,
  Eye,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

const tabs = [
  { id: "users", label: "Users", icon: Users },
  { id: "challenges", label: "Challenges", icon: Target },
  { id: "plans", label: "Plans", icon: Settings },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "logs", label: "Logs / Activity", icon: Activity },
] as const;

type Tab = typeof tabs[number]["id"];

// Mock admin data
const mockUsers = [
  { id: "USR-001", email: "john@example.com", name: "John Doe", joined: "2026-01-10", challenges: 3, status: "Active" },
  { id: "USR-002", email: "sarah@example.com", name: "Sarah Kim", joined: "2026-01-22", challenges: 1, status: "Active" },
  { id: "USR-003", email: "marcus@example.com", name: "Marcus Taylor", joined: "2025-12-05", challenges: 5, status: "Suspended" },
  { id: "USR-004", email: "fatima@example.com", name: "Fatima Al-Rashid", joined: "2026-02-01", challenges: 2, status: "Active" },
  { id: "USR-005", email: "david@example.com", name: "David Lee", joined: "2026-02-14", challenges: 1, status: "Active" },
];

const mockAdminChallenges = [
  { id: "CH-001", user: "john@example.com", plan: "$25K", phase: "2-Phase", status: "Funded", startDate: "2026-01-15", result: "Passed" },
  { id: "CH-002", user: "john@example.com", plan: "$50K", phase: "2-Phase", status: "Phase 1", startDate: "2026-02-10", result: "Active" },
  { id: "CH-003", user: "sarah@example.com", plan: "$10K", phase: "1-Phase", status: "Breached", startDate: "2026-02-01", result: "Failed" },
  { id: "CH-004", user: "marcus@example.com", plan: "$100K", phase: "3-Phase", status: "Phase 2", startDate: "2026-01-20", result: "Active" },
  { id: "CH-005", user: "fatima@example.com", plan: "$25K", phase: "2-Phase", status: "Passed", startDate: "2026-02-05", result: "Passed" },
];

const mockPlans = [
  { name: "$5K", price: 49, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "80%", enabled: true },
  { name: "$10K", price: 99, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "80%", enabled: true },
  { name: "$25K", price: 199, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "80%", enabled: true },
  { name: "$50K", price: 349, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "85%", enabled: true },
  { name: "$100K", price: 549, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "90%", enabled: true },
  { name: "$200K", price: 999, profitTarget: "8%", dailyLoss: "5%", maxLoss: "10%", minDays: 5, split: "90%", enabled: true },
];

const mockPayments = [
  { id: "PAY-001", user: "john@example.com", amount: 199, date: "2026-01-15", status: "Completed", method: "Card" },
  { id: "PAY-002", user: "sarah@example.com", amount: 99, date: "2026-02-01", status: "Completed", method: "Crypto" },
  { id: "PAY-003", user: "john@example.com", amount: 349, date: "2026-02-10", status: "Completed", method: "Card" },
  { id: "PAY-004", user: "marcus@example.com", amount: 549, date: "2026-01-20", status: "Refunded", method: "Card" },
  { id: "PAY-005", user: "fatima@example.com", amount: 199, date: "2026-02-05", status: "Completed", method: "Card" },
  { id: "PAY-006", user: "david@example.com", amount: 99, date: "2026-02-14", status: "Chargeback", method: "Card" },
];

const mockLogs = [
  { time: "2026-02-25 14:32", type: "Login", user: "john@example.com", detail: "Successful login from 192.168.1.1" },
  { time: "2026-02-25 14:28", type: "Purchase", user: "david@example.com", detail: "Purchased $10K 2-Phase challenge" },
  { time: "2026-02-25 13:15", type: "Rule Violation", user: "sarah@example.com", detail: "Daily loss limit breached (-5.2%)" },
  { time: "2026-02-25 12:00", type: "Pass", user: "fatima@example.com", detail: "Phase 1 target reached (8.3%)" },
  { time: "2026-02-25 11:45", type: "Payout", user: "john@example.com", detail: "Payout $850 approved (Wire Transfer)" },
  { time: "2026-02-24 16:30", type: "Fail", user: "marcus@example.com", detail: "Max loss limit breached (-10.4%)" },
  { time: "2026-02-24 14:00", type: "Login", user: "fatima@example.com", detail: "Successful login from 10.0.0.5" },
  { time: "2026-02-24 10:22", type: "Refund", user: "marcus@example.com", detail: "Refund issued for PAY-004 ($549)" },
];

const logTypeStyles: Record<string, string> = {
  Login: "bg-secondary text-muted-foreground",
  Purchase: "bg-secondary text-foreground",
  "Rule Violation": "bg-secondary text-muted-foreground",
  Pass: "bg-secondary text-foreground",
  Fail: "bg-secondary text-muted-foreground",
  Payout: "bg-secondary text-foreground",
  Refund: "bg-secondary text-muted-foreground",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("users");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold tracking-tight">
              FYNX<span className="text-muted-foreground font-light ml-1">Admin</span>
            </Link>
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">Internal</span>
          </div>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Users" value={mockUsers.length.toString()} icon={Users} />
          <StatCard label="Active Challenges" value={mockAdminChallenges.filter(c => c.result === "Active").length.toString()} icon={Target} />
          <StatCard label="Revenue (MTD)" value={`$${mockPayments.filter(p => p.status === "Completed").reduce((s, p) => s + p.amount, 0).toLocaleString()}`} icon={DollarSign} />
          <StatCard label="Chargebacks" value={mockPayments.filter(p => p.status === "Chargeback").length.toString()} icon={AlertTriangle} />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users, challenges, payments..."
            className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
          />
        </div>

        {/* Tab content */}
        {tab === "users" && (
          <div className="premium-card overflow-x-auto">
            <h3 className="text-sm font-semibold mb-4">All Users ({mockUsers.length})</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">ID</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Name</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Email</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Joined</th>
                  <th className="text-center py-3 font-medium text-muted-foreground text-xs">Challenges</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockUsers.filter(u => u.email.includes(search) || u.name.toLowerCase().includes(search.toLowerCase())).map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 font-medium text-xs">{u.id}</td>
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="py-3 text-muted-foreground">{u.email}</td>
                    <td className="py-3 text-muted-foreground">{u.joined}</td>
                    <td className="py-3 text-center">{u.challenges}</td>
                    <td className="py-3 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${u.status === "Active" ? "bg-secondary text-foreground" : "bg-secondary text-muted-foreground"}`}>{u.status}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "challenges" && (
          <div className="premium-card overflow-x-auto">
            <h3 className="text-sm font-semibold mb-4">All Challenges ({mockAdminChallenges.length})</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">ID</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">User</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Plan</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Phase</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Start</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockAdminChallenges.filter(c => c.user.includes(search) || c.id.includes(search)).map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 font-medium text-xs">{c.id}</td>
                    <td className="py-3 text-muted-foreground">{c.user}</td>
                    <td className="py-3 font-medium">{c.plan}</td>
                    <td className="py-3 text-muted-foreground">{c.phase}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        c.result === "Passed" ? "bg-secondary text-foreground" :
                        c.result === "Failed" ? "bg-secondary text-muted-foreground" :
                        "bg-secondary text-foreground"
                      }`}>{c.result}</span>
                    </td>
                    <td className="py-3 text-muted-foreground">{c.startDate}</td>
                    <td className="py-3 text-right flex items-center justify-end gap-2">
                      <button title="Override Pass" className="text-muted-foreground hover:text-foreground transition-colors"><CheckCircle2 size={14} /></button>
                      <button title="Override Fail" className="text-muted-foreground hover:text-foreground transition-colors"><XCircle size={14} /></button>
                      <button title="Pause" className="text-muted-foreground hover:text-foreground transition-colors"><Pause size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-4">
              System automatically fails challenges on rule violations and passes on target completion. Use override buttons for manual control.
            </p>
          </div>
        )}

        {tab === "plans" && (
          <div className="premium-card overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Manage Plans ({mockPlans.length})</h3>
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">+ New Plan</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Plan</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Price</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Target</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Daily Loss</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Max Loss</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Min Days</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Split</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockPlans.map((p) => (
                  <tr key={p.name}>
                    <td className="py-3 font-semibold">{p.name}</td>
                    <td className="py-3">${p.price}</td>
                    <td className="py-3 text-muted-foreground">{p.profitTarget}</td>
                    <td className="py-3 text-muted-foreground">{p.dailyLoss}</td>
                    <td className="py-3 text-muted-foreground">{p.maxLoss}</td>
                    <td className="py-3 text-muted-foreground">{p.minDays}</td>
                    <td className="py-3 text-muted-foreground">{p.split}</td>
                    <td className="py-3 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${p.enabled ? "bg-secondary text-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {p.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "payments" && (
          <div className="premium-card overflow-x-auto">
            <h3 className="text-sm font-semibold mb-4">All Payments ({mockPayments.length})</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">ID</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">User</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Method</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Date</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Amount</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockPayments.filter(p => p.user.includes(search) || p.id.includes(search)).map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 font-medium text-xs">{p.id}</td>
                    <td className="py-3 text-muted-foreground">{p.user}</td>
                    <td className="py-3 text-muted-foreground">{p.method}</td>
                    <td className="py-3 text-muted-foreground">{p.date}</td>
                    <td className="py-3 text-right font-medium">${p.amount}</td>
                    <td className="py-3 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        p.status === "Completed" ? "bg-secondary text-foreground" :
                        p.status === "Chargeback" ? "bg-secondary text-muted-foreground" :
                        "bg-secondary text-muted-foreground"
                      }`}>{p.status}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button title="Issue Refund" className="text-xs text-muted-foreground hover:text-foreground transition-colors"><RefreshCw size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "logs" && (
          <div className="premium-card">
            <h3 className="text-sm font-semibold mb-4">Activity Log</h3>
            <div className="space-y-3">
              {mockLogs.filter(l => l.user.includes(search) || l.type.toLowerCase().includes(search.toLowerCase())).map((l, i) => (
                <div key={i} className="flex items-start gap-4 text-sm py-3 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground/60 whitespace-nowrap min-w-[120px]">{l.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap ${logTypeStyles[l.type] || "bg-secondary text-muted-foreground"}`}>{l.type}</span>
                  <span className="text-xs text-muted-foreground">{l.user}</span>
                  <span className="text-xs text-muted-foreground/80 flex-1">{l.detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="premium-card">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
