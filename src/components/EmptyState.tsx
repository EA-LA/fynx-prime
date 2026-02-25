import { type ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl" />

      {/* Scan line animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-scan-line" />
      </div>

      <div className="relative flex flex-col items-center justify-center py-20 px-6">
        {/* Icon with pulse ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-foreground/5 animate-ping-slow scale-150" />
          <div className="relative w-16 h-16 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm text-center leading-relaxed">
          {description}
        </p>

        {/* Status indicator */}
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/20" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/30" />
          </span>
          Awaiting data
        </div>
      </div>
    </div>
  );
}
