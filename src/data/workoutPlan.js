export const workoutPlan = [
  {
    day: "Monday",
    shortDay: "Mon",
    title: "Upper push",
    type: "Push",
    duration: "~50 min",
    time: "8–9 pm",
    color: "blue",
    sections: [
      {
        label: "Chest & shoulders",
        exercises: [
          { name: "Barbell bench press", sets: 4, reps: 8, notes: "Add weight when all 4 sets feel easy" },
          { name: "Dumbbell shoulder press", sets: 3, reps: 10 },
          { name: "Cable fly", sets: 3, reps: 12 },
          { name: "Lateral raises", sets: 3, reps: 15 },
        ],
      },
      {
        label: "Triceps",
        exercises: [
          { name: "Cable tricep pushdown", sets: 3, reps: 12 },
          { name: "Overhead tricep extension", sets: 3, reps: 12 },
        ],
      },
      {
        label: "Finisher",
        exercises: [
          { name: "Incline treadmill walk", sets: 1, reps: null, notes: "10 min · 3.5 mph · 12% incline", timed: 600 },
        ],
      },
    ],
    tip: "High incline at low speed burns fat without the misery of jogging. You'll barely notice it after lifting.",
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    title: "Upper pull",
    type: "Pull",
    duration: "~50 min",
    time: "8–9 pm",
    color: "green",
    sections: [
      {
        label: "Back",
        exercises: [
          { name: "Pull-ups (or lat pulldown)", sets: 4, reps: 8 },
          { name: "Barbell row", sets: 4, reps: 8 },
          { name: "Cable seated row", sets: 3, reps: 12 },
          { name: "Face pulls", sets: 3, reps: 15 },
        ],
      },
      {
        label: "Biceps",
        exercises: [
          { name: "Dumbbell curl", sets: 3, reps: 12 },
          { name: "Hammer curl", sets: 3, reps: 12 },
        ],
      },
      {
        label: "Finisher",
        exercises: [
          { name: "Incline treadmill walk", sets: 1, reps: null, notes: "10 min · 3.5 mph · 12% incline", timed: 600 },
        ],
      },
    ],
    tip: "Back work builds the most metabolically active upper-body muscles — meaning more calories burned at rest.",
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    title: "HIIT circuit",
    type: "HIIT",
    duration: "~35 min",
    time: "8–8:35 pm",
    color: "orange",
    sections: [
      {
        label: "Warm-up",
        exercises: [
          { name: "Dynamic stretch / light jog", sets: 1, reps: null, notes: "5 min", timed: 300 },
        ],
      },
      {
        label: "5 rounds · 40 sec on / 20 sec off",
        exercises: [
          { name: "Dumbbell thrusters", sets: 5, reps: null, notes: "40 sec on / 20 sec off", timed: 40, restAfterSet: 20 },
          { name: "Jump squats (or box jumps)", sets: 5, reps: null, notes: "40 sec on / 20 sec off", timed: 40, restAfterSet: 20 },
          { name: "Burpees", sets: 5, reps: null, notes: "40 sec on / 20 sec off", timed: 40, restAfterSet: 20 },
          { name: "Dumbbell renegade rows", sets: 5, reps: null, notes: "40 sec on / 20 sec off", timed: 40, restAfterSet: 20 },
          { name: "Mountain climbers", sets: 5, reps: null, notes: "40 sec on / 20 sec off", timed: 40, restAfterSet: 20 },
        ],
      },
    ],
    tip: "This is your cardio done right. HIIT burns more fat than jogging and the afterburn lasts hours.",
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    title: "Legs + core",
    type: "Legs",
    duration: "~55 min",
    time: "8–9 pm",
    color: "amber",
    sections: [
      {
        label: "Legs",
        exercises: [
          { name: "Barbell back squat", sets: 4, reps: 8, notes: "King of fat burn exercises" },
          { name: "Romanian deadlift", sets: 3, reps: 10 },
          { name: "Leg press", sets: 3, reps: 12 },
          { name: "Walking lunges", sets: 3, reps: 12, notes: "Each leg" },
          { name: "Leg curl (machine)", sets: 3, reps: 12 },
          { name: "Calf raises", sets: 4, reps: 15 },
        ],
      },
      {
        label: "Core",
        exercises: [
          { name: "Plank hold", sets: 3, reps: null, notes: "1 min per set", timed: 60 },
          { name: "Cable crunch", sets: 3, reps: 15 },
          { name: "Russian twist", sets: 3, reps: 20 },
        ],
      },
    ],
    tip: "Squats and deadlifts recruit the most muscle mass of any exercise, spiking your metabolism for 24–48 hrs.",
  },
  {
    day: "Friday",
    shortDay: "Fri",
    title: "Full body + athletic",
    type: "Full body",
    duration: "~45 min",
    time: "8–8:45 pm",
    color: "purple",
    sections: [
      {
        label: "Compound strength",
        exercises: [
          { name: "Deadlift (heavier, low reps)", sets: 3, reps: 5, notes: "Focus on heavy weight and perfect form" },
          { name: "Push-ups (weighted or standard)", sets: 3, reps: 15 },
          { name: "Pull-ups (max reps)", sets: 3, reps: null, notes: "Max reps each set" },
          { name: "Dumbbell walking lunges", sets: 3, reps: 10, notes: "Each leg" },
        ],
      },
      {
        label: "Athletic finisher",
        exercises: [
          { name: "Farmer's carry (heavy DBs)", sets: 3, reps: null, notes: "40m each set" },
          { name: "Battle ropes (if available)", sets: 3, reps: null, notes: "30 sec on / 30 sec rest", timed: 30, restAfterSet: 30 },
        ],
      },
      {
        label: "Cool-down",
        exercises: [
          { name: "Incline treadmill walk", sets: 1, reps: null, notes: "15 min · easy cool-down pace", timed: 900 },
        ],
      },
    ],
    tip: "Deadlifts and carries build the kind of athletic strength you feel in real life. End the week strong but not destroyed.",
  },
];

export const colorClasses = {
  blue:   { bg: "bg-blue-500",   text: "text-blue-600 dark:text-blue-400",   soft: "bg-blue-500/10 border-blue-500/30",   ring: "ring-blue-500" },
  green:  { bg: "bg-green-500",  text: "text-green-600 dark:text-green-400",  soft: "bg-green-500/10 border-green-500/30",  ring: "ring-green-500" },
  orange: { bg: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", soft: "bg-orange-500/10 border-orange-500/30", ring: "ring-orange-500" },
  amber:  { bg: "bg-amber-500",  text: "text-amber-600 dark:text-amber-400",  soft: "bg-amber-500/10 border-amber-500/30",  ring: "ring-amber-500" },
  purple: { bg: "bg-purple-500", text: "text-purple-600 dark:text-purple-400", soft: "bg-purple-500/10 border-purple-500/30", ring: "ring-purple-500" },
  slate:  { bg: "bg-slate-500",  text: "text-slate-600 dark:text-slate-400",  soft: "bg-slate-500/10 border-slate-500/30",  ring: "ring-slate-500" },
};

// Maps JS Date.getDay() → plan index. Sun=0,Mon=1,...Sat=6
export function workoutForWeekday(weekday) {
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
  const idx = map[weekday];
  return idx === undefined ? null : workoutPlan[idx];
}
