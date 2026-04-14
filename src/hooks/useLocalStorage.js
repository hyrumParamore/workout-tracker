import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const nv = typeof next === "function" ? next(prev) : next;
        try { localStorage.setItem(key, JSON.stringify(nv)); } catch {}
        return nv;
      });
    },
    [key]
  );

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) {
        try { setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, defaultValue]);

  return [value, set];
}
