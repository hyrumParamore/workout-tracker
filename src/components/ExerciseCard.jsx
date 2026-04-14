import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, Timer } from "lucide-react";
import { Button } from "./ui/Button";
import { Input, Label } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { cn } from "../lib/cn";
import { colorClasses } from "../data/workoutPlan";

// Single exercise "recipe card" — logs sets one at a time.
// Props: exercise, existingSets, onLogSet(set), onFinish(), color, index, total
export default function ExerciseCard({ exercise, existingSets = [], onLogSet, onFinish, color = "slate", index, total }) {
  const targetSets = exercise.sets || 1;
  const targetReps = exercise.reps;
  const cc = colorClasses[color] || colorClasses.slate;

  const [reps, setReps] = useState(targetReps || 10);
  const [weight, setWeight] = useState("");

  // Countdown timer for timed exercises
  const [timeLeft, setTimeLeft] = useState(exercise.timed || 0);
  const [timerRunning, setTimerRunning] = useState(false);
  const tick = useRef();

  useEffect(() => {
    if (!timerRunning) return;
    tick.current = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(tick.current);
  }, [timerRunning]);

  useEffect(() => {
    if (exercise.timed && timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      if (navigator.vibrate) navigator.vibrate(300);
    }
  }, [timeLeft, timerRunning, exercise.timed]);

  const completedSets = existingSets.length;
  const allDone = completedSets >= targetSets;

  const handleLog = () => {
    const entry = {
      reps: targetReps ? Number(reps) : null,
      weight: weight === "" ? null : Number(weight),
      timed: exercise.timed || null,
      loggedAt: new Date().toISOString(),
    };
    onLogSet(entry);
    if (exercise.timed) {
      setTimeLeft(exercise.timed);
      setTimerRunning(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Badge className={cn("uppercase", cc.soft, cc.text, "border-current/20")}>
          {index + 1} / {total}
        </Badge>
        {exercise.sets > 1 && (
          <div className="text-xs text-slate-500">
            Set <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">{Math.min(completedSets + 1, targetSets)}</span> of {targetSets}
          </div>
        )}
      </div>

      <h1 className={cn("mt-3 text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-3xl")}>
        {exercise.name}
      </h1>

      <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
        {targetReps && <Badge>{targetReps} reps</Badge>}
        {exercise.timed && <Badge>{exercise.timed}s timed</Badge>}
        {exercise.restAfterSet && <Badge>{exercise.restAfterSet}s rest</Badge>}
      </div>

      {exercise.notes && (
        <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {exercise.notes}
        </p>
      )}

      {/* Set dots */}
      <div className="mt-5 flex items-center gap-2">
        {Array.from({ length: targetSets }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 flex-1 rounded-full",
              i < completedSets ? cc.bg : "bg-slate-200 dark:bg-slate-800"
            )}
          />
        ))}
      </div>

      {/* Timed exercise UI */}
      {exercise.timed ? (
        <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="font-mono text-center text-6xl tabular-nums text-slate-900 dark:text-slate-100">
            {String(Math.floor(timeLeft / 60)).padStart(1, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
          <Progress value={exercise.timed - timeLeft} max={exercise.timed} className="mt-3" barClassName={cc.bg} />
          <div className="mt-4 flex gap-2">
            <Button className="flex-1" variant={timerRunning ? "secondary" : "accent"} onClick={() => setTimerRunning((r) => !r)}>
              <Timer className="h-4 w-4" /> {timerRunning ? "Pause" : timeLeft === 0 ? "Restart" : "Start"}
            </Button>
            <Button variant="ghost" onClick={() => { setTimeLeft(exercise.timed); setTimerRunning(false); }}>Reset</Button>
          </div>
        </div>
      ) : (
        targetReps !== null && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <Label>Reps</Label>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon" onClick={() => setReps((r) => Math.max(0, Number(r) - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" inputMode="numeric" value={reps} onChange={(e) => setReps(e.target.value)} className="text-center text-lg tabular-nums" />
                <Button variant="secondary" size="icon" onClick={() => setReps((r) => Number(r) + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Weight (lbs)</Label>
              <Input type="number" inputMode="decimal" placeholder="—" value={weight} onChange={(e) => setWeight(e.target.value)} className="text-lg tabular-nums" />
            </div>
          </div>
        )
      )}

      {/* Previous sets this session */}
      {existingSets.length > 0 && (
        <div className="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-400">
          {existingSets.map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 dark:bg-slate-800/50">
              <span>Set {i + 1}</span>
              <span className="tabular-nums">
                {s.reps != null ? `${s.reps} reps` : s.timed ? `${s.timed}s` : ""}
                {s.weight != null ? ` · ${s.weight} lbs` : ""}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-6">
        {!allDone ? (
          <Button size="lg" className={cn("w-full", cc.bg, "text-white hover:opacity-90")} onClick={handleLog}>
            <Check className="h-5 w-5" />
            {completedSets + 1 === targetSets ? "Log final set" : "Log set"}
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={onFinish}>
            Next exercise →
          </Button>
        )}
      </div>
    </div>
  );
}
