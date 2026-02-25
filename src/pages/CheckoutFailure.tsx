import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function CheckoutFailure() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md animate-fade-up text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <XCircle size={32} className="text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Failed</h1>
        <p className="text-sm text-muted-foreground mt-2 mb-8">
          Your payment could not be processed. Please try again or use a different payment method.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/challenge-builder"
            className="border border-border px-5 py-2.5 rounded-md text-sm font-medium hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Back to Builder
          </Link>
          <Link
            to="/checkout"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} /> Try Again
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          If the issue persists, contact <span className="text-foreground">support@fynxfunded.com</span>
        </p>
      </div>
    </div>
  );
}
