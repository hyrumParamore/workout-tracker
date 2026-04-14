import { useState } from "react";
import { Link } from "react-router-dom";
import { Droplet, Flame, Play, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import WorkoutFlow from "../components/WorkoutFlow";
import { workoutForWeekday, colorClasses } from "../data/workoutPlan";
import { nutritionTargets } from "../data/nutritionPlan";
import { useWorkoutLog } from "../hooks/useWorkoutLog";
import { useNutritionLog } from "../hooks/useNutritionLog";
import { useSettings } from "../hooks/useSettings";
import { prettyDate, todayKey } from "../lib/date";
import { cn } from "../lib/cn";

export default function Today() {
  const now = new Date();
  const today = todayKey(now);
  const workout = workoutForWeekday(now.getDay());
  const { getWorkout, logWorkout } = useWorkoutLog();
  const { getNutritionForDate, addWater } = useNutritionLog();
  const [settings] = useSettings();
  const [flowing, setFlowing] = useState(false);

  const existing = getWorkout(today);
  const nutrition = getNutritionForDate(today);
  const target = workout ? nutritionTargets.workoutDay : nutritionTargets.restDay;
  const cc = workout ? colorClasses[workout.color] : colorClasses.slate;

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-500">{prettyDate(now)}</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {workout ? `Time to ${workout.title.toLowerCase()}` : "Rest day"}
        </h1>
      </div>

      {/* Workout card */}
      {workout ? (
        <Card className={cn("overflow-hidden border-2", cc.soft)}>
          <div className={cn("h-1.5 w-full", cc.bg)} />
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className={cn("text-xs font-semibold uppercase tracking-wide", cc.text)}>{workout.type}</div>
                <CardTitle className="mt-1">{workout.title}</CardTitle>
                <div className="mt-1 text-sm text-slate-500">{workout.duration} · {workout.time}</div>
              </div>
              {existing?.completed && <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-300/30">✓ Done</Badge>}
            </div>
          </CardHeader>
          <CardBody>
            <ul className="space-y-1.5 text-sm">
              {workout.sections.flatMap((sec) =>
                sec.exercises.map((e, i) => (
                  <li key={sec.label + e.name + i} className="flex justify-between gap-2">
                    <span className="truncate text-slate-700 dark:text-slate-300">{e.name}</span>
                    <span className="shrink-0 text-slate-500">
                      {e.timed ? `${e.timed}s` : e.reps ? `${e.sets}×${e.reps}` : `${e.sets}×`}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Sparkles className="mr-1 inline h-4 w-4 text-amber-500" />
              {workout.tip}
            </div>
            <Button size="lg" className={cn("mt-4 w-full", cc.bg, "text-white hover:opacity-90")} onClick={() => setFlowing(true)}>
              <Play className="h-5 w-5" /> {existing?.completed ? "Repeat workout" : "Start workout"}
            </Button>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <p className="text-slate-600 dark:text-slate-400">
              Weekend. Recover, hydrate, stretch, and meal-prep for the week. Walk if you want.
            </p>
            <Link to="/progress" className="mt-3 inline-block text-sm text-blue-600 underline dark:text-blue-400">Log weekly weigh-in →</Link>
          </CardBody>
        </Card>
      )}

      {/* Nutrition summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" /> Nutrition today
          </CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <MacroRow label="Calories" value={nutrition.calories} target={target.calories} unit="kcal" />
          <MacroRow label="Protein"  value={nutrition.protein}  target={target.protein}  unit="g" />
          <MacroRow label="Carbs"    value={nutrition.carbs}    target={target.carbs}    unit="g" />
          <MacroRow label="Fat"      value={nutrition.fat}      target={target.fat}      unit="g" />
          <Link to="/nutrition" className="mt-2 inline-block text-sm text-blue-600 underline dark:text-blue-400">Edit today's log →</Link>
        </CardBody>
      </Card>

      {/* Water */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-sky-500" /> Water
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-2xl font-bold tabular-nums">
                {(nutrition.water * 128).toFixed(0)}<span className="text-base font-medium text-slate-500"> / {(nutritionTargets.water * 128).toFixed(0)} oz</span>
              </div>
              <div className="text-xs text-slate-500">{nutrition.water.toFixed(2)} / {nutritionTargets.water.toFixed(1)} gal</div>
            </div>
            <Button variant="accent" onClick={() => addWater(today)}>
              +8 oz
            </Button>
          </div>
          <Progress className="mt-3" value={nutrition.water} max={nutritionTargets.water} barClassName="bg-sky-500" />
        </CardBody>
      </Card>

      {flowing && workout && (
        <WorkoutFlow
          workout={workout}
          initialExercises={existing?.exercises || {}}
          restSeconds={settings.restSeconds}
          onExit={() => setFlowing(false)}
          onComplete={(payload) => {
            logWorkout(today, workout.day, payload);
            setFlowing(false);
          }}
        />
      )}
    </div>
  );
}

function MacroRow({ label, value, target, unit }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="tabular-nums"><span className="font-semibold">{value}</span><span className="text-slate-500"> / {target} {unit}</span></span>
      </div>
      <Progress value={value} max={target} className="mt-1" />
    </div>
  );
}
