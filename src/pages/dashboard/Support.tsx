import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createTicket, getUserTickets } from "@/services/tickets";
import type { Ticket, TicketPriority } from "@/services/types";

export default function Support() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Account Issue");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      getUserTickets(user.userId).then(setTickets).catch(console.error);
    }
  }, [user?.userId]);

  const handleSubmit = async () => {
    if (!user?.userId || !subject.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await createTicket({
        userId: user.userId,
        subject: subject.trim(),
        category,
        priority: "medium" as TicketPriority,
        message: message.trim(),
      });
      // Refresh list
      const updated = await getUserTickets(user.userId);
      setTickets(updated);
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("[Support] Failed to create ticket:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Need help? Reach out to our team.</p>
      </div>

      <div className="premium-card">
        <h3 className="text-sm font-semibold mb-4">Submit a Ticket</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none"
            >
              <option>Account Issue</option>
              <option>Payout Question</option>
              <option>Technical Problem</option>
              <option>Rule Clarification</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue in detail..."
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 resize-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || !subject.trim() || !message.trim()}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            <MessageSquare size={14} />
            {submitting ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </div>

      {/* Ticket list */}
      {tickets.length > 0 && (
        <div className="premium-card">
          <h3 className="text-sm font-semibold mb-4">Your Tickets</h3>
          <div className="divide-y divide-border">
            {tickets.map((t) => (
              <div key={t.ticketId} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  t.status === "open" ? "bg-secondary text-foreground" :
                  t.status === "waiting" ? "bg-secondary text-muted-foreground" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="premium-card text-center py-8">
        <p className="text-sm text-muted-foreground">
          For urgent issues, email us at <span className="text-foreground font-medium">support@fynxfunded.com</span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">Average response time: under 4 hours</p>
      </div>
    </div>
  );
}
