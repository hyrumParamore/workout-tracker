import { useLocalStorage } from "./useLocalStorage";

const KEY = "weightLog";

export function useWeightLog() {
  const [entries, setEntries] = useLocalStorage(KEY, []);

  const addWeightEntry = (date, weight) => {
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== date);
      return [...filtered, { date, weight: Number(weight) }].sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  const removeWeightEntry = (date) => {
    setEntries((prev) => prev.filter((e) => e.date !== date));
  };

  const getCurrentWeight = () => (entries.length ? entries[entries.length - 1].weight : null);

  const getLbsToGoal = (goal) => {
    const cur = getCurrentWeight();
    if (cur == null) return null;
    return Math.max(0, cur - goal);
  };

  return { entries, addWeightEntry, removeWeightEntry, getCurrentWeight, getLbsToGoal };
}
