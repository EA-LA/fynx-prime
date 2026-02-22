import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Target,
  BarChart3,
  LineChart,
  CreditCard,
  Award,
  BookOpen,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Accounts", to: "/dashboard/accounts", icon: Wallet },
  { label: "Objectives", to: "/dashboard/objectives", icon: Target },
  { label: "Trades", to: "/dashboard/trades", icon: BarChart3 },
  { label: "Analytics", to: "/dashboard/analytics", icon: LineChart },
  { label: "Payouts", to: "/dashboard/payouts", icon: CreditCard },
  { label: "Certificates", to: "/dashboard/certificates", icon: Award },
  { label: "Learning", to: "/dashboard/learning", icon: BookOpen },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
  { label: "Support", to: "/dashboard/support", icon: HelpCircle },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link to="/" className="text-lg font-bold tracking-tight text-sidebar-foreground">
            FYNX<span className="font-light ml-1 opacity-60">Funded</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive(link.to)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">trader@example.com</p>
            </div>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-2 px-3 py-2 mt-1 text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors rounded-md hover:bg-sidebar-accent/50"
          >
            <LogOut size={14} />
            Log out
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center px-6 gap-4 sticky top-0 z-20 glass">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Account:</span>
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">FX-10241</span>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
