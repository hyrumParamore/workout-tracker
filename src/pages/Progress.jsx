import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { Card, CardBody, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useWeightLog } from "../hooks/useWeightLog";
import { useWorkoutLog } from "../hooks/useWorkoutLog";
import { useSettings } from "../hooks/useSettings";
import { todayKey, daysAgo } from "../lib/date";

const phases = [
  { name: "Month 1 — Fat burn foundation", desc: "Build the habit. Full 5-day split. Calories tight but not extreme. Expect 4–6 lbs off." },
  { name: "Month 2 — Metabolic ramp",       desc: "Same lifts, heavier. HIIT intensity up. Protein holds, carbs adjust. 3–5 lbs." },
  { name: "Month 3 — Visible leanness",     desc: "Cut rest times. Add volume. Dial in nutrition. 3–4 lbs and muscle shows." },
  { name: "Month 4 — Lock it in",           desc: "Hit 175. Transition to maintenance. Keep lifting heavy; add a weekly long walk." },
];

export default function Progress() {
  const { entries, addWeightEntry } = useWeightLog();
  const { getTotalWorkouts, getWeekSummary, getStreak } = useWorkoutLog();
  const [settings, setSettings] = useSettings();
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(todayKey());

  const currentWeight = entries.length ? entries[entries.length - 1].weight : settings.startWeight;
  const lbsToGo = Math.max(0, currentWeight - settings.goalWeight);
  const weeksLeft = Math.ceil(lbsToGo); // 1 lb/week pace
  const lost = settings.startWeight - currentWeight;

  const phase = Math.min(3, Math.max(0, Math.floor(daysAgo(settings.startDate) / 30)));

  const chartData = useMemo(
    () => entries.map((e) => ({ date: e.date.slice(5), weight: e.weight })),
    [entries]
  );

  const weekSummary = getWeekSummary();
  const weekDone = weekSummary.filter((d) => d.completed).length;

  const submit = () => {
    if (!weight) return;
    addWeightEntry(date, weight);
    setWeight("");
  };

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-2xl font-bold">Progress</h1>

      {/* Weight tracker */}
      <Card>
        <CardHeader><CardTitle>Weight</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Start" value={`${settings.startWeight}`} unit="lb" />
            <Stat label="Now"   value={`${currentWeight}`}          unit="lb" />
            <Stat label="Goal"  value={`${settings.goalWeight}`}    unit="lb" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Badge>{lost > 0 ? `−${lost.toFixed(1)} lb` : `${(-lost).toFixed(1)} lb`}</Badge>
            <span className="text-slate-500">{lbsToGo.toFixed(1)} lb to go · ~{weeksLeft} wks</span>
          </div>

          {chartData.length > 0 ? (
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                  <XAxis dataKey="date" fontSize={11} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #334155", background: "#0f172a", color: "#f1f5f9" }} />
                  <ReferenceLine y={settings.goalWeight} stroke="#22c55e" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-100 p-4 text-center text-sm text-slate-500 dark:bg-slate-800">
              Log a weigh-in to start the chart.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>Weight (lb)</Label>
              <Input type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="190.0" />
            </div>
          </div>
          <Button onClick={submit} className="w-full" variant="accent">Log weigh-in</Button>
        </CardBody>
      </Card>

      {/* Workout streak */}
      <Card>
        <CardHeader><CardTitle>Workouts</CardTitle></CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="This week" value={`${weekDone} / 5`} />
            <Stat label="All-time"  value={`${getTotalWorkouts()}`} />
            <Stat label="Streak"    value={`${getStreak()} wk`} />
          </div>
          <div className="mt-4 flex gap-1.5">
            {weekSummary.map((d, i) => (
              <div key={i} className={"h-2 flex-1 rounded-full " + (d.completed ? "bg-green-500" : "bg-slate-200 dark:bg-slate-800")} />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Phase timeline */}
      <Card>
        <CardHeader><CardTitle>Phase timeline</CardTitle></CardHeader>
        <CardBody className="space-y-3">
          {phases.map((p, i) => (
            <div key={i} className={"rounded-xl border p-3 " + (i === phase ? "border-blue-500 bg-blue-500/5" : "border-slate-200 dark:border-slate-800")}>
              <div className="flex items-center justify-between">
                <div className="font-medium">{p.name}</div>
                {i === phase && <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Current</Badge>}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.desc}</div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardBody className="grid grid-cols-2 gap-3">
          <div>
            <Label>Start weight</Label>
            <Input type="number" value={settings.startWeight} onChange={(e) => setSettings({ ...settings, startWeight: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Goal weight</Label>
            <Input type="number" value={settings.goalWeight} onChange={(e) => setSettings({ ...settings, goalWeight: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Start date</Label>
            <Input type="date" value={settings.startDate} onChange={(e) => setSettings({ ...settings, startDate: e.target.value })} />
          </div>
          <div>
            <Label>Rest timer (sec)</Label>
            <Input type="number" value={settings.restSeconds} onChange={(e) => setSettings({ ...settings, restSeconds: Number(e.target.value) })} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-bold tabular-nums">{value}{unit && <span className="ml-1 text-sm font-medium text-slate-500">{unit}</span>}</div>
    </div>
  );
}
