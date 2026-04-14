import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import ExerciseCard from "./ExerciseCard";
import RestTimer from "./RestTimer";
import { Progress } from "./ui/Progress";
import { cn } from "../lib/cn";
import { colorClasses } from "../data/workoutPlan";

/**
 * Flattens the workout into a single list of exercises (preserving section labels)
 * and walks the user through them one card at a time, with rest timer between sets.
 */
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
    // Seed with existing logs if partially done
    const seed = {};
    flat.forEach((ex) => {
      seed[ex.name] = initialExercises[ex.name]?.sets ? [...initialExercises[ex.name].sets] : [];
    });
    return seed;
  });
  const [resting, setResting] = useState(false);

  const current = flat[idx];
  const cc = colorClasses[workout.color] || colorClasses.slate;
  const totalSets = flat.reduce((s, e) => s + (e.sets || 1), 0);
  const doneSets = Object.values(logs).reduce((s, arr) => s + arr.length, 0);

  const logSet = (entry) => {
    setLogs((prev) => ({ ...prev, [current.name]: [...(prev[current.name] || []), entry] }));
    const restDur = current.restAfterSet ?? restSeconds;
    if (restDur > 0) setResting(restDur);
  };

  const next = () => setIdx((i) => Math.min(i + 1, flat.length - 1));
  const prev = () => setIdx((i) => Math.max(i - 1, 0));

  const finishWorkout = () => {
    const exercisesPayload = {};
    Object.entries(logs).forEach(([k, v]) => { exercisesPayload[k] = { sets: v }; });
    onComplete(exercisesPayload);
  };

  const isLast = idx === flat.length - 1;
  const lastDone = isLast && (logs[current.name]?.length || 0) >= (current.sets || 1);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="safe-top border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onExit} aria-label="Exit">
            <X className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="text-xs text-slate-500">{current.section}</div>
            <div className="flex items-center gap-2">
              <div className={cn("h-2 w-2 rounded-full", cc.bg)} />
              <div className="text-sm font-semibold">{workout.title}</div>
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

      {/* Card body */}
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
          />
        </Card>
      </div>

      {/* Bottom nav for card flow */}
      <div className="safe-bottom border-t border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
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

      {resting && (
        <RestTimer seconds={resting} onDone={() => setResting(false)} onCancel={() => setResting(false)} />
      )}
    </div>
  );
}
