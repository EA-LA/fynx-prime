import { MessageSquare } from "lucide-react";

export default function Support() {
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
              placeholder="Brief description of your issue"
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Category</label>
            <select className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 appearance-none">
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
              placeholder="Describe your issue in detail..."
              className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 resize-none"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            <MessageSquare size={14} />
            Submit Ticket
          </button>
        </div>
      </div>

      <div className="premium-card text-center py-8">
        <p className="text-sm text-muted-foreground">
          For urgent issues, email us at <span className="text-foreground font-medium">support@fynxfunded.com</span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">Average response time: under 4 hours</p>
      </div>
    </div>
  );
}
