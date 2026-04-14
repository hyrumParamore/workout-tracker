import { cn } from "../../lib/cn";

export function Progress({ value = 0, max = 100, className, barClassName }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", className)}>
      <div
        className={cn("h-full rounded-full bg-slate-900 transition-all dark:bg-slate-200", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
