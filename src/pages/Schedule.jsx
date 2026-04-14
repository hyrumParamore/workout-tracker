import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { workoutPlan, colorClasses } from "../data/workoutPlan";
import { useWorkoutLog } from "../hooks/useWorkoutLog";
import { cn } from "../lib/cn";
import { todayKey, weekStart } from "../lib/date";

export default function Schedule() {
  const { getWorkout } = useWorkoutLog();
  const [openIdx, setOpenIdx] = useState(null);

  const wkStart = weekStart();
  const thisWeek = workoutPlan.map((_, i) => {
    const d = new Date(wkStart);
    d.setDate(wkStart.getDate() + i);
    return getWorkout(todayKey(d));
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Weekly schedule</h1>
      <p className="text-sm text-slate-500">5-day split. Tap a day for details.</p>

      <div className="space-y-3">
        {workoutPlan.map((w, i) => {
          const cc = colorClasses[w.color];
          const done = thisWeek[i]?.completed;
          const open = openIdx === i;
          return (
            <Card key={w.day} className={cn("overflow-hidden")}>
              <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
                onClick={() => setOpenIdx(open ? null : i)}
              >
                <div className={cn("grid h-10 w-10 place-items-center rounded-xl text-white font-semibold", cc.bg)}>
                  {w.shortDay[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{w.day}</span>
                    {done && <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"><Check className="mr-1 h-3 w-3" />Done</Badge>}
                  </div>
                  <div className={cn("text-sm", cc.text)}>{w.title}</div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>{w.duration}</div>
                  <div>{w.time}</div>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform", open && "rotate-180")} />
              </button>

              {open && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-3 dark:border-slate-800">
                  {w.sections.map((sec) => (
                    <div key={sec.label} className="mt-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{sec.label}</div>
                      <ul className="mt-1.5 space-y-1 text-sm">
                        {sec.exercises.map((e, j) => (
                          <li key={j} className="flex justify-between gap-3">
                            <span className="text-slate-700 dark:text-slate-300">{e.name}</span>
                            <span className="shrink-0 text-slate-500 tabular-nums">
                              {e.timed ? `${e.timed}s` : e.reps ? `${e.sets}×${e.reps}` : `${e.sets}×`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className={cn("mt-4 rounded-lg px-3 py-2 text-sm", cc.soft, cc.text)}>
                    💡 {w.tip}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>Saturday & Sunday</CardTitle></CardHeader>
        <CardBody>
          <p className="text-sm text-slate-600 dark:text-slate-400">Rest, recover, walk, meal prep. Optional active recovery: a long walk, stretching, or light yoga.</p>
        </CardBody>
      </Card>
    </div>
  );
}
