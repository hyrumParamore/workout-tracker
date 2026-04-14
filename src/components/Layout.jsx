import { NavLink, Outlet } from "react-router-dom";
import { CalendarDays, Dumbbell, Salad, TrendingUp } from "lucide-react";
import { cn } from "../lib/cn";

const tabs = [
  { to: "/",          label: "Today",     icon: Dumbbell },
  { to: "/schedule",  label: "Schedule",  icon: CalendarDays },
  { to: "/nutrition", label: "Nutrition", icon: Salad },
  { to: "/progress",  label: "Progress",  icon: TrendingUp },
];

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col">
      <main className="flex-1 px-4 pb-28 pt-6 safe-top sm:px-6">
        <Outlet />
      </main>
      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="safe-bottom mx-auto flex max-w-2xl items-stretch justify-around px-2 py-1.5">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2.25} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
