import { useMemo, useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import { meals, goodFoods, rules, nutritionTargets, lunchIdeas, dinnerIdeas } from "../data/nutritionPlan";
import { useNutritionLog } from "../hooks/useNutritionLog";
import { workoutForWeekday } from "../data/workoutPlan";
import { todayKey } from "../lib/date";
import { cn } from "../lib/cn";

export default function Nutrition() {
  const { getNutritionForDate, logNutrition } = useNutritionLog();
  const [date, setDate] = useState(todayKey());
  const saved = getNutritionForDate(date);
  const [draft, setDraft] = useState(saved);

  // Sync draft when date changes
  useMemo(() => setDraft(saved), [date]); // eslint-disable-line

  const isWorkoutDay = !!workoutForWeekday(new Date(date + "T00:00:00").getDay());
  const target = isWorkoutDay ? nutritionTargets.workoutDay : nutritionTargets.restDay;

  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value === "" ? 0 : Number(e.target.value) });

  const save = () => logNutrition(date, draft);

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-2xl font-bold">Nutrition</h1>

      {/* Daily log */}
      <Card>
        <CardHeader><CardTitle>Daily log</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <div className="mt-1 text-xs text-slate-500">
              {isWorkoutDay ? "Workout day target" : "Rest day target"}: {target.calories} kcal · {target.protein}P · {target.carbs}C · {target.fat}F
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Calories" value={draft.calories} onChange={set("calories")} target={target.calories} unit="kcal" />
            <Field label="Protein" value={draft.protein} onChange={set("protein")} target={target.protein} unit="g" />
            <Field label="Carbs" value={draft.carbs} onChange={set("carbs")} target={target.carbs} unit="g" />
            <Field label="Fat" value={draft.fat} onChange={set("fat")} target={target.fat} unit="g" />
          </div>

          <div>
            <Label>Water (gallons)</Label>
            <Input type="number" step="0.05" value={draft.water} onChange={set("water")} />
          </div>

          <div>
            <Label>Notes</Label>
            <Input value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="How did you feel today?" />
          </div>

          <Button variant="accent" onClick={save} className="w-full">Save</Button>
        </CardBody>
      </Card>

      {/* Meal timing */}
      <Card>
        <CardHeader><CardTitle>Meal timing</CardTitle></CardHeader>
        <CardBody className="space-y-3">
          {meals.map((m) => (
            <div key={m.time} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="font-medium">{m.title}</div>
                <Badge>{m.time}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{m.description}</p>
              <div className="mt-1 text-xs text-slate-500">~{m.approxProtein}g protein</div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Lunch ideas */}
      <RecipeList title="Lunch ideas" items={lunchIdeas} accent="text-emerald-600 dark:text-emerald-400" />

      {/* Dinner ideas */}
      <RecipeList title="Dinner ideas" items={dinnerIdeas} accent="text-purple-600 dark:text-purple-400" />

      {/* Good foods */}
      <Card>
        <CardHeader><CardTitle>Staple foods</CardTitle></CardHeader>
        <CardBody className="space-y-3 text-sm">
          <FoodGroup label="Proteins" items={goodFoods.proteins} />
          <FoodGroup label="Carbs" items={goodFoods.carbs} />
          <FoodGroup label="Fats" items={goodFoods.fats} />
          <FoodGroup label="Vegetables" items={goodFoods.vegetables} />
        </CardBody>
      </Card>

      {/* Rules */}
      <Card>
        <CardHeader><CardTitle>Key rules</CardTitle></CardHeader>
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">Do</div>
            <ul className="space-y-1 text-sm">
              {rules.do.map((r) => (
                <li key={r} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /><span>{r}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">Don't</div>
            <ul className="space-y-1 text-sm">
              {rules.dont.map((r) => (
                <li key={r} className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /><span>{r}</span></li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Field({ label, value, onChange, target, unit }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type="number" inputMode="numeric" value={value || ""} onChange={onChange} />
      <Progress value={value || 0} max={target} className="mt-1.5" />
      <div className="mt-1 text-right text-xs tabular-nums text-slate-500">{value || 0} / {target} {unit}</div>
    </div>
  );
}

function FoodGroup({ label, items }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {items.map((i) => <Badge key={i}>{i}</Badge>)}
      </div>
    </div>
  );
}

function RecipeList({ title, items, accent }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardBody className="space-y-2">
        {items.map((m, i) => {
          const open = openIdx === i;
          return (
            <div key={m.name} className="rounded-xl border border-slate-200 dark:border-slate-800">
              <button className="flex w-full items-center gap-3 px-4 py-3 text-left" onClick={() => setOpenIdx(open ? null : i)}>
                <div className="flex-1">
                  <div className={cn("font-medium", accent)}>{m.name}</div>
                  <div className="text-xs text-slate-500 tabular-nums">
                    {m.kcal} kcal · {m.protein}P · {m.carbs}C · {m.fat}F
                  </div>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", open && "rotate-180")} />
              </button>
              {open && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ingredients</div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
                    {m.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
                  </ul>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Steps</div>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                    {m.steps.map((s, j) => <li key={j}>{s}</li>)}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
