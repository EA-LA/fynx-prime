import { mockObjectives } from "@/lib/mockData";
import { AlertTriangle } from "lucide-react";

export default function Objectives() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Objectives</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your progress toward each trading objective.</p>
      </div>

      <div className="grid gap-6">
        {Object.values(mockObjectives).map((obj) => {
          const isLimit = "limit" in obj;
          const max = isLimit ? (obj as any).limit : (obj as any).target;
          const pct = (obj.current / max) * 100;
          const cappedPct = Math.min(pct, 100);
          const isWarning = isLimit && pct > 70;
          const remaining = isLimit ? max - obj.current : max - obj.current;
          const unit = obj.label.includes("Days") ? "" : "%";

          return (
            <div key={obj.label} className="premium-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold">{obj.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isLimit ? "Limit" : "Target"}: {max}{unit}
                  </p>
                </div>
                {isWarning && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    <AlertTriangle size={12} />
                    Approaching limit
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold">{obj.current}{unit}</span>
                <span className="text-sm text-muted-foreground">
                  {remaining.toFixed(1)}{unit} remaining
                </span>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isWarning ? "bg-muted-foreground" : "bg-foreground"}`}
                  style={{ width: `${cappedPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
