import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1rem" }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1.5rem", border: "1px solid #333", borderRadius: "6px", cursor: "pointer", background: "transparent", color: "inherit" }}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}