import { useEffect, useRef, useState } from "react";
import { Pause, Play, Plus, SkipForward } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/cn";
import { colorClasses } from "../data/workoutPlan";

// Large circular countdown that sits on the exercise card during rest.
export default function RestRing({ seconds = 90, color = "slate", onDone, onSkip }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(true);
  const start = useRef(seconds);
  const tick = useRef();
  const cc = colorClasses[color] || colorClasses.slate;

  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(tick.current);
  }, [running]);

  useEffect(() => {
    if (remaining <= 0) {
      clearInterval(tick.current);
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; g.gain.value = 0.2;
        o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 300);
      } catch {}
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      onDone?.();
    }
  }, [remaining, onDone]);

  const addTime = (s) => { start.current += s; setRemaining((r) => r + s); };

  const r = 110;
  const C = 2 * Math.PI * r;
  const pct = Math.max(0, remaining) / start.current;
  const dash = C * pct;

  const mm = Math.max(0, Math.floor(remaining / 60));
  const ss = String(Math.max(0, remaining % 60)).padStart(2, "0");

  return (
    <div className="flex h-full flex-col items-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rest</div>
      <div className="relative my-4 grid place-items-center">
        <svg width="260" height="260" viewBox="0 0 260 260" className="-rotate-90">
          <circle
            cx="130" cy="130" r={r}
            className="fill-none stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="14"
          />
          <circle
            cx="130" cy="130" r={r}
            strokeWidth="14"
            strokeLinecap="round"
            className={cn("fill-none transition-[stroke-dashoffset] duration-1000 ease-linear", {
              blue: "stroke-blue-500", green: "stroke-green-500", orange: "stroke-orange-500",
              amber: "stroke-amber-500", purple: "stroke-purple-500", slate: "stroke-slate-500",
            }[color] || "stroke-slate-500")}
            strokeDasharray={C}
            strokeDashoffset={C - dash}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <div className={cn("font-mono text-6xl font-bold tabular-nums text-slate-900 dark:text-slate-100")}>
            {mm}:{ss}
          </div>
          <div className="mt-1 text-xs text-slate-500">of {start.current}s</div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <Button variant="secondary" onClick={() => addTime(15)}>
          <Plus className="h-4 w-4" /> 15s
        </Button>
        <Button variant="secondary" size="icon" onClick={() => setRunning((v) => !v)} aria-label={running ? "Pause" : "Resume"}>
          {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button variant="accent" onClick={onSkip}>
          <SkipForward className="h-4 w-4" /> Skip
        </Button>
      </div>
    </div>
  );
}
