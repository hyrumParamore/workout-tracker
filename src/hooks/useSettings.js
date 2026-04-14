import { useLocalStorage } from "./useLocalStorage";
import { todayKey } from "../lib/date";

const KEY = "userSettings";
const defaults = {
  startWeight: 190,
  goalWeight: 175,
  startDate: todayKey(),
  restSeconds: 90,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage(KEY, defaults);
  return [{ ...defaults, ...settings }, setSettings];
}
