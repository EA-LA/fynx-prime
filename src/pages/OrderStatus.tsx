import { Link } from "react-router-dom";
import { FileText, CheckCircle2, XCircle, Clock, ArrowLeft, RefreshCw } from "lucide-react";

export default function OrderStatus() {
  const raw = localStorage.getItem("fynx_last_order");
  const order = raw ? JSON.parse(raw) : null;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <FileText size={40} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">No orders found</h2>
          <p className="text-sm text-muted-foreground mb-6">Purchase a challenge to see your order status here.</p>
          <Link to="/challenge-builder" className="text-sm text-foreground underline">Go to Challenge Builder</Link>
        </div>
      </div>
    );
  }

  const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    Paid: { icon: <CheckCircle2 size={20} />, color: "text-foreground" },
    Failed: { icon: <XCircle size={20} />, color: "text-muted-foreground" },
    Refunded: { icon: <RefreshCw size={20} />, color: "text-muted-foreground" },
    Pending: { icon: <Clock size={20} />, color: "text-muted-foreground" },
  };

  const sc = statusConfig[order.status] || statusConfig.Pending;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            FYNX<span className="text-muted-foreground font-light ml-1">Funded</span>
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Order Status</h1>
        <p className="text-sm text-muted-foreground mb-8">Track your challenge purchase.</p>

        <div className="premium-card">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full bg-secondary flex items-center justify-center ${sc.color}`}>
              {sc.icon}
            </div>
            <div>
              <h3 className="font-semibold">{order.challenge}</h3>
              <p className="text-xs text-muted-foreground">Order {order.id}</p>
            </div>
            <span className={`ml-auto text-xs font-medium px-3 py-1 rounded-full bg-secondary ${sc.color}`}>
              {order.status}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Row label="Order ID" value={order.id} />
            <Row label="Date" value={new Date(order.date).toLocaleDateString()} />
            <Row label="Amount" value={`$${order.amount}`} />
            <Row label="Payment Method" value={order.method} />
            <Row label="Account Size" value={`$${order.accountSize?.toLocaleString()}`} />
            <Row label="Status" value={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
