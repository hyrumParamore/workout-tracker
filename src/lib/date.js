// Date helpers. All dates stored as local "YYYY-MM-DD" strings.

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function prettyDate(d = new Date()) {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

export function weekStart(d = new Date()) {
  // Monday as first day
  const day = d.getDay(); // 0 Sun - 6 Sat
  const diff = day === 0 ? -6 : 1 - day;
  const out = new Date(d);
  out.setDate(d.getDate() + diff);
  out.setHours(0, 0, 0, 0);
  return out;
}

export function daysAgo(dateStr) {
  const then = new Date(dateStr + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((now - then) / 86400000);
}
