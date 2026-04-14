import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function RestTimer({ seconds = 90, onDone, onCancel }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(true);
  const ref = useRef();

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  useEffect(() => {
    if (remaining <= 0) {
      clearInterval(ref.current);
      try {
        // Short beep via WebAudio (no asset)
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; g.gain.value = 0.15;
        o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 250);
      } catch {}
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      onDone?.();
    }
  }, [remaining, onDone]);

  const pct = Math.max(0, (remaining / seconds) * 100);
  const mm = String(Math.max(0, Math.floor(remaining / 60))).padStart(1, "0");
  const ss = String(Math.max(0, remaining % 60)).padStart(2, "0");

  return (
    <div className="fixed inset-x-0 bottom-20 z-30 mx-auto max-w-2xl px-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-400">Rest</div>
            <div className="font-mono text-4xl tabular-nums">{mm}:{ss}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" onClick={() => setRemaining((r) => r + 15)} aria-label="Add 15s">
              +15s
            </Button>
            <Button variant="secondary" size="icon" onClick={() => setRunning((r) => !r)} aria-label={running ? "Pause" : "Play"}>
              {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="secondary" size="icon" onClick={() => setRemaining(seconds)} aria-label="Reset">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button variant="danger" size="icon" onClick={onCancel} aria-label="Skip rest">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
