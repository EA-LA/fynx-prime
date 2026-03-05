import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Download, FileText, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { dataService } from "@/services/database";
import { downloadReceipt } from "@/services/payments";
import type { Order } from "@/services/types";

const statusConfig: Record<string, { icon: React.ReactNode; classes: string; label: string }> = {
  pending: {
    icon: <Clock size={14} />,
    classes: "bg-secondary text-muted-foreground",
    label: "Waiting",
  },
  paid: {
    icon: <CheckCircle2 size={14} />,
    classes: "bg-secondary text-foreground",
    label: "Paid",
  },
  failed: {
    icon: <XCircle size={14} />,
    classes: "bg-secondary text-muted-foreground",
    label: "Failed",
  },
  refunded: {
    icon: <AlertCircle size={14} />,
    classes: "bg-secondary text-muted-foreground",
    label: "Refunded",
  },
};

export default function Billing() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;
    dataService.getOrders(user.userId)
      .then((data) => {
        // Sort by date descending
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.userId]);

  const totalPaid = orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.amount, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">View your orders, payment history, and download receipts.</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
          <p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="premium-card">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
      </div>

      {/* Orders table */}
      <div className="premium-card">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Order History</h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard size={24} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No orders yet.</p>
            <Link
              to="/challenge-builder"
              className="text-sm text-foreground underline mt-2 inline-block"
            >
              Start a Challenge
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Date</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Challenge / Order</th>
                  <th className="text-left py-3 font-medium text-muted-foreground text-xs">Method</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Amount</th>
                  <th className="text-center py-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-right py-3 font-medium text-muted-foreground text-xs">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => {
                  const sc = statusConfig[order.status] || statusConfig.pending;
                  return (
                    <tr key={order.orderId}>
                      <td className="py-3 text-muted-foreground text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3">
                        <p className="font-medium text-xs">{order.challenge || "Challenge"}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{order.orderId}</p>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground capitalize">{order.paymentMethod}</td>
                      <td className="py-3 text-right font-medium text-xs">
                        ${order.amount.toLocaleString()} {order.currency}
                      </td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium ${sc.classes}`}>
                          {sc.icon}
                          {sc.label}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {order.status === "pending" ? (
                          <Link
                            to={`/checkout?size=${order.accountSize}&phase=${order.phase}&style=${order.style}&currency=${order.currency}`}
                            className="text-xs text-foreground underline hover:no-underline"
                          >
                            Pay Now
                          </Link>
                        ) : order.status === "paid" ? (
                          <button
                            onClick={() => downloadReceipt(order)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            <Download size={12} /> Receipt
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
