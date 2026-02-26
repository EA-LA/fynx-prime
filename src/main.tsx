import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

// Global error handlers
window.onerror = (msg, src, line, col, err) => {
  console.error("[Global] Uncaught error:", msg, src, line, col, err);
};
window.addEventListener("unhandledrejection", (e) => {
  console.error("[Global] Unhandled promise rejection:", e.reason);
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
