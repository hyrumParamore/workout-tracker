import { cn } from "../../lib/cn";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className
      )}
      {...props}
    />
  );
}
export function CardHeader({ className, ...props }) {
  return <div className={cn("px-5 pt-5 pb-2", className)} {...props} />;
}
export function CardBody({ className, ...props }) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
export function CardTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold text-slate-900 dark:text-slate-100", className)} {...props} />;
}
