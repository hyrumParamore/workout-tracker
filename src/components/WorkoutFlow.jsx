import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import ExerciseCard from "./ExerciseCard";
import { Progress } from "./ui/Progress";
import { cn } from "../lib/cn";
import { colorClasses } from "../data/workoutPlan";

export default function WorkoutFlow({ workout, initialExercises = {}, onExit, onComplete, restSeconds = 90 }) {
  const flat = useMemo(() => {
    const out = [];
    workout.sections.forEach((sec) =>
      sec.exercises.forEach((ex) => out.push({ ...ex, section: sec.label }))
    );
    return out;
  }, [workout]);

  const [idx, setIdx] = useState(0);
  const [logs, setLogs] = useState(() => {
    const seed = {};
    flat.forEach((ex) => {
      seed[ex.name] = initialExercises[ex.name]?.sets ? [...initialExercises[ex.name].sets] : [];
    });
    return seed;
  });
  const [resting, setResting] = useState(0); // seconds > 0 means actively resting

  // Lock body scroll while the flow is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const current = flat[idx];
  const cc = colorClasses[workout.color] || colorClasses.slate;
  const totalSets = flat.reduce((s, e) => s + (e.sets || 1), 0);
  const doneSets = Object.values(logs).reduce((s, arr) => s + arr.length, 0);

  const logSet = (entry) => {
    setLogs((prev) => ({ ...prev, [current.name]: [...(prev[current.name] || []), entry] }));
    const restDur = current.restAfterSet ?? restSeconds;
    if (restDur > 0) setResting(restDur);
  };

  const next = () => { setResting(0); setIdx((i) => Math.min(i + 1, flat.length - 1)); };
  const prev = () => { setResting(0); setIdx((i) => Math.max(i - 1, 0)); };

  const finishWorkout = () => {
    const payload = {};
    Object.entries(logs).forEach(([k, v]) => { payload[k] = { sets: v }; });
    onComplete(payload);
  };

  const isLast = idx === flat.length - 1;
  const lastDone = isLast && (logs[current.name]?.length || 0) >= (current.sets || 1);

  const ui = (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-slate-50 dark:bg-slate-950"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Header — fully opaque */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onExit} aria-label="Exit">
            <X className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="truncate text-xs text-slate-500">{current.section}</div>
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 shrink-0 rounded-full", cc.bg)} />
              <div className="truncate text-sm font-semibold">{workout.title}</div>
            </div>
          </div>
          <div className="text-right text-xs tabular-nums text-slate-500">
            {doneSets}/{totalSets} sets
          </div>
        </div>
        <div className="mx-auto mt-2 max-w-2xl">
          <Progress value={doneSets} max={totalSets} barClassName={cc.bg} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 items-stretch overflow-y-auto px-4 py-5">
        <Card className="mx-auto flex w-full max-w-xl flex-col p-6">
          <ExerciseCard
            key={current.name + idx}
            exercise={current}
            existingSets={logs[current.name] || []}
            onLogSet={logSet}
            onFinish={isLast ? finishWorkout : next}
            color={workout.color}
            index={idx}
            total={flat.length}
            resting={resting}
            onRestDone={() => setResting(0)}
            onRestSkip={() => setResting(0)}
          />
        </Card>
      </div>

      {/* Footer — fully opaque */}
      <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-2">
          <Button variant="ghost" onClick={prev} disabled={idx === 0}>
            <ChevronLeft className="h-5 w-5" /> Prev
          </Button>
          {lastDone ? (
            <Button variant="accent" onClick={finishWorkout}>Complete workout ✓</Button>
          ) : (
            <Button variant="ghost" onClick={next} disabled={idx === flat.length - 1}>
              Next <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
