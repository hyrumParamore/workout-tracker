import { useLocalStorage } from "./useLocalStorage";

const KEY = "nutritionLog";
const empty = { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0, notes: "" };

export function useNutritionLog() {
  const [log, setLog] = useLocalStorage(KEY, {});

  const logNutrition = (date, data) => {
    setLog((prev) => ({ ...prev, [date]: { ...empty, ...(prev[date] || {}), ...data } }));
  };

  const getNutritionForDate = (date) => log[date] || { ...empty };

  const addWater = (date, amt = 8 / 128) => {
    // default +8oz in gallons
    setLog((prev) => {
      const cur = prev[date] || { ...empty };
      return { ...prev, [date]: { ...cur, water: Math.round((cur.water + amt) * 100) / 100 } };
    });
  };

  return { log, logNutrition, getNutritionForDate, addWater };
}
