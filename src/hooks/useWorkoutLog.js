import { useLocalStorage } from "./useLocalStorage";
import { todayKey, weekStart } from "../lib/date";

const KEY = "workoutLog";

export function useWorkoutLog() {
  const [log, setLog] = useLocalStorage(KEY, {});

  const logWorkout = (date, dayName, exerciseLogs) => {
    setLog((prev) => ({
      ...prev,
      [date]: { day: dayName, completed: true, exercises: exerciseLogs, savedAt: new Date().toISOString() },
    }));
  };

  const updateWorkout = (date, partial) => {
    setLog((prev) => ({
      ...prev,
      [date]: { ...(prev[date] || { exercises: {} }), ...partial },
    }));
  };

  const getWorkout = (date) => log[date] || null;

  const getWeekSummary = (startDate = weekStart()) => {
    const out = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = todayKey(d);
      out.push({ date: key, completed: !!log[key]?.completed });
    }
    return out;
  };

  const getTotalWorkouts = () => Object.values(log).filter((w) => w.completed).length;

  // Consecutive weeks where all 5 weekdays were completed
  const getStreak = () => {
    let streak = 0;
    let cursor = weekStart();
    // include the current week only if it's already fully complete
    while (true) {
      const summary = getWeekSummary(cursor);
      if (summary.every((d) => d.completed)) {
        streak++;
        cursor.setDate(cursor.getDate() - 7);
      } else {
        break;
      }
    }
    return streak;
  };

  return { log, logWorkout, updateWorkout, getWorkout, getWeekSummary, getTotalWorkouts, getStreak };
}
