export const nutritionTargets = {
  workoutDay: { calories: 2300, protein: 185, carbs: 210, fat: 65 },
  restDay:    { calories: 2100, protein: 185, carbs: 160, fat: 65 },
  water: 1.0, // gallons
};

export const meals = [
  {
    time: "7:30 am",
    title: "Breakfast — high protein start",
    description: "4–5 eggs scrambled + 2 slices whole grain toast, or Greek yogurt + banana + nuts. Coffee is fine — skip sugary creamers.",
    approxProtein: 40,
  },
  {
    time: "12:00–1:00 pm",
    title: "Lunch — protein + carbs + veg",
    description: "Chicken breast or ground beef + rice or sweet potato + salad or vegetables. Biggest carb meal of the day.",
    approxProtein: 50,
  },
  {
    time: "5:30–6:30 pm",
    title: "Dinner / pre-workout meal",
    description: "Eat 90 min before workout. Salmon or chicken + rice or pasta + greens. Carbs here fuel the workout directly.",
    approxProtein: 50,
  },
  {
    time: "9:00–10:00 pm",
    title: "Post-workout recovery snack",
    description: "Protein shake + banana, or cottage cheese + fruit, or Greek yogurt. Low fat, moderate carbs, high protein.",
    approxProtein: 40,
  },
];

export const goodFoods = {
  proteins: ["Chicken breast / thighs", "Eggs + egg whites", "Salmon / tuna", "Greek yogurt (plain)", "Cottage cheese", "Ground beef (90/10)", "Protein powder"],
  carbs: ["White or brown rice", "Oats", "Sweet potato", "Whole grain bread", "Banana / fruit", "Pasta (pre-workout)"],
  fats: ["Avocado", "Olive oil", "Almonds / walnuts", "Nut butter", "Whole eggs"],
  vegetables: ["Broccoli / spinach", "Bell peppers", "Zucchini", "Asparagus", "Cucumbers / tomatoes"],
};

export const rules = {
  do: [
    "Eat your biggest carb meal at lunch or pre-workout",
    "Hit ~1g protein per lb bodyweight every day",
    "Drink a gallon of water (track it)",
    "Sleep 7+ hours — recovery is where fat burns",
    "Weigh yourself once a week, same morning, same scale",
  ],
  dont: [
    "No sugary drinks, sodas, or sweetened coffees",
    "No alcohol on workout days",
    "No snacking mindlessly after dinner",
    "No skipping breakfast — wrecks hunger later",
  ],
};

// Specific lunch + dinner recipe suggestions (expansion beyond spec)
export const lunchIdeas = [
  {
    name: "Chicken & rice power bowl",
    kcal: 640,
    protein: 55,
    carbs: 70,
    fat: 14,
    ingredients: ["6 oz grilled chicken breast", "1 cup cooked white rice", "1 cup broccoli", "1 tbsp olive oil", "Soy sauce / sriracha to taste"],
    steps: ["Season chicken with salt, pepper, garlic powder; grill or pan-sear 6 min/side.", "Steam broccoli 4 min.", "Plate rice, top with chicken + broccoli, drizzle olive oil + sauce."],
  },
  {
    name: "Ground beef sweet-potato hash",
    kcal: 680,
    protein: 48,
    carbs: 62,
    fat: 22,
    ingredients: ["6 oz 90/10 ground beef", "1 medium sweet potato, cubed", "1/2 onion, diced", "1 cup spinach", "Salt, pepper, paprika"],
    steps: ["Microwave diced sweet potato 5 min until tender.", "Brown beef with onion 8 min; season.", "Toss in sweet potato + spinach, cook 2 min more."],
  },
  {
    name: "Turkey & avocado wrap",
    kcal: 590,
    protein: 45,
    carbs: 55,
    fat: 20,
    ingredients: ["6 oz sliced turkey", "1 large whole-grain wrap", "1/2 avocado", "Lettuce, tomato, red onion", "Mustard or hummus"],
    steps: ["Spread mustard/hummus on wrap.", "Layer turkey, avocado, veg.", "Roll tightly, slice in half. Serve with baby carrots."],
  },
  {
    name: "Salmon rice bowl",
    kcal: 650,
    protein: 50,
    carbs: 60,
    fat: 20,
    ingredients: ["5 oz salmon fillet", "1 cup jasmine rice", "1/2 cucumber", "1/2 avocado", "Soy sauce, sesame seeds"],
    steps: ["Bake salmon at 400°F for 12 min.", "Cook rice per package.", "Plate rice, flake salmon on top, add cucumber + avocado, sauce."],
  },
  {
    name: "Greek yogurt chicken salad",
    kcal: 520,
    protein: 52,
    carbs: 35,
    fat: 18,
    ingredients: ["6 oz cooked chicken, shredded", "1/2 cup plain Greek yogurt", "1 tbsp Dijon mustard", "Celery, grapes, red onion", "Whole-grain toast (2 slices)"],
    steps: ["Mix chicken with yogurt, mustard, diced celery + onion + halved grapes.", "Toast bread. Spoon salad onto toast or eat open-faced."],
  },
];

export const dinnerIdeas = [
  {
    name: "Baked salmon + pasta + asparagus",
    kcal: 720,
    protein: 52,
    carbs: 75,
    fat: 22,
    ingredients: ["6 oz salmon", "1.5 cups cooked pasta", "1 bunch asparagus", "Olive oil, lemon, garlic, parmesan"],
    steps: ["Bake salmon at 400°F 12 min with lemon + olive oil.", "Boil pasta; toss with olive oil, garlic, parmesan.", "Roast asparagus 10 min at 400°F."],
  },
  {
    name: "Steak, potatoes & greens",
    kcal: 780,
    protein: 58,
    carbs: 55,
    fat: 32,
    ingredients: ["6 oz sirloin", "1 cup roasted baby potatoes", "2 cups spinach", "Butter, garlic, rosemary"],
    steps: ["Roast potatoes at 425°F 25 min, tossed with olive oil + rosemary.", "Sear steak 3–4 min/side; rest 5 min.", "Sauté spinach with garlic + butter 2 min."],
  },
  {
    name: "Chicken stir-fry + rice",
    kcal: 660,
    protein: 50,
    carbs: 72,
    fat: 14,
    ingredients: ["6 oz chicken breast, sliced", "1 cup rice", "2 cups mixed veg (peppers, broccoli, snap peas)", "Soy sauce, ginger, garlic, sesame oil"],
    steps: ["Cook rice.", "Stir-fry chicken in sesame oil 5 min; remove.", "Stir-fry veg 4 min with garlic + ginger; return chicken + soy sauce."],
  },
  {
    name: "Turkey chili",
    kcal: 620,
    protein: 48,
    carbs: 60,
    fat: 16,
    ingredients: ["1 lb ground turkey (makes 4 servings)", "1 can black beans", "1 can kidney beans", "1 can diced tomatoes", "Onion, bell pepper, chili powder, cumin"],
    steps: ["Brown turkey with diced onion + pepper 8 min.", "Add beans, tomatoes, spices.", "Simmer 20 min. Freezes great."],
  },
  {
    name: "Shrimp tacos + slaw",
    kcal: 640,
    protein: 46,
    carbs: 58,
    fat: 20,
    ingredients: ["8 oz shrimp", "3 corn tortillas", "Cabbage slaw (shredded cabbage + lime + Greek yogurt)", "Avocado, cilantro, lime"],
    steps: ["Season shrimp with chili powder, cumin, salt.", "Sauté 3 min until pink.", "Warm tortillas. Build tacos with shrimp, slaw, avocado, cilantro."],
  },
  {
    name: "Chicken & veg sheet pan",
    kcal: 590,
    protein: 50,
    carbs: 48,
    fat: 18,
    ingredients: ["6 oz chicken thighs (bone-in)", "1 sweet potato", "Bell peppers + zucchini", "Olive oil, paprika, garlic"],
    steps: ["Toss everything with olive oil + spices on sheet pan.", "Roast at 425°F for 28 min.", "One pan, one cleanup."],
  },
];
