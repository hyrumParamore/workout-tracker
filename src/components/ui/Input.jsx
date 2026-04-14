import { cn } from "../../lib/cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }) {
  return <label className={cn("mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500", className)} {...props} />;
}
