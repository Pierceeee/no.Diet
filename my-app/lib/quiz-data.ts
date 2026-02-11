/* ─── Types ─── */
export type Gender = "male" | "female";
export type Unit = "cm" | "in";
export type WeightUnit = "kg" | "lbs";

export type Answers = {
  gender: Gender;
  q1: string;
  q2: string[];
  q3: string;
  q4: string;
  q5: string[];
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string[];
  q12: string;
  q13: number;
  q13Unit: Unit;
  q14: number;
  q14Unit: WeightUnit;
  q15: number;
  q15Unit: WeightUnit;
  q16: number;
  q17: string;
  q18: string[];
  q19: string[];
};

export const TOTAL_STEPS = 22;

export const DEFAULT_ANSWERS: Answers = {
  gender: "male",
  q1: "",
  q2: [],
  q3: "",
  q4: "",
  q5: [],
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  q11: [],
  q12: "",
  q13: 175,
  q13Unit: "cm",
  q14: 80,
  q14Unit: "kg",
  q15: 72,
  q15Unit: "kg",
  q16: 30,
  q17: "",
  q18: [],
  q19: [],
};

/* ─── Gender-specific option arrays ─── */

export function getGenderGoals(gender: Gender): string[] {
  return gender === "male"
    ? ["Manage weight", "Tone my body", "Get fit and healthy", "Improve energy levels"]
    : ["Lose stubborn fat", "Feel lean and toned", "Boost confidence", "Improve energy levels"];
}

export function getQ3Bodies(gender: Gender): string[] {
  return gender === "male"
    ? ["Skinny", "Regular", "Pot belly", "Extra"]
    : ["Slim", "Average", "Curvy", "Plus size"];
}

export function getQ4Bodies(gender: Gender): string[] {
  return gender === "male"
    ? ["Just a few sizes smaller", "Lean", "Athletic", "Shredded"]
    : ["A little slimmer", "Toned", "Fit", "Athletic"];
}

export function getQ12Reasons(gender: Gender): string[] {
  return gender === "male"
    ? [
        "Feel more confident in my body",
        "Become more attractive",
        "Feel healthier and more energetic",
        "Improve my mental health",
        "Fit in my clothes better",
        "Other",
      ]
    : [
        "Feel more confident in my body",
        "Look great in my clothes",
        "Feel healthier and more energetic",
        "Improve my mental health",
        "Feel strong and feminine",
        "Other",
      ];
}

/* ─── Static option arrays ─── */

export const FAMILIARITY_OPTIONS = [
  "Beginner",
  "I've heard a thing or two",
  "Expert",
];
export const FAMILIARITY_EMOJIS = ["🌱", "🧐", "🏆"];

export const BODY_AREAS = ["Arms", "Chest", "Back", "Belly", "Butt", "Legs"];

export const DAY_TO_DAY_OPTIONS = [
  "Desk job",
  "Moving a lot",
  "Always working out",
  "Spending time at home",
];
export const DAY_TO_DAY_EMOJIS = ["👨‍💻", "🚶", "🏃", "🏠"];

export const ENERGY_OPTIONS = [
  "Low, I feel tired throughout the day",
  "Post lunch slump",
  "Dragging before meals",
  "High and steady",
];
export const ENERGY_EMOJIS = ["😴", "🥱", "😕", "🤩"];

export const EXERCISE_OPTIONS = [
  "Never",
  "Several times per month",
  "Several times per week",
  "Almost every day",
];
export const EXERCISE_EMOJIS = ["🚫", "🗓️", "💪", "🔥"];

export const WEIGHT_CHANGE_OPTIONS = [
  "I gain weight fast but lose it slowly",
  "I gain and lose weight easily",
  "I struggle to gain weight or muscle",
];
export const WEIGHT_CHANGE_EMOJIS = ["⚖️", "🔄", "🏋️"];

export const IDEAL_WEIGHT_OPTIONS = [
  "Less than a year ago",
  "1-3 years ago",
  "More than 3 years ago",
  "Never",
];
export const IDEAL_WEIGHT_EMOJIS = ["📅", "📆", "⏳", "❌"];

export const DIET_OPTIONS = [
  "Keto diet",
  "Intermittent fasting",
  "Vegetarian diet",
  "Vegan diet",
  "Low-carb diet",
  "Gluten free diet",
  "Other",
  "None of the above",
];

export const MEAL_OPTIONS = ["Two", "Three", "Four", "Five"];

export const MEAL_DESCRIPTIONS = [
  "Breakfast, dinner, optional snacks",
  "Breakfast, lunch, and dinner",
  "Breakfast, snack, lunch, and dinner",
  "Breakfast, lunch, dinner, and two snacks",
];

export const PROTEIN_OPTIONS = [
  "I eat them all",
  "Chicken",
  "Red meat",
  "Cheese",
  "Tuna",
  "Greek yogurt",
  "Salmon",
  "Cod",
  "Eggs",
  "Chickpeas",
  "Lentils",
  "Tofu",
];

export const GRAIN_OPTIONS = [
  "I eat them all",
  "Almonds",
  "Walnuts",
  "Peanuts",
  "Rice",
  "Couscous",
  "Quinoa",
  "Oats",
  "Buckwheat",
  "Corn",
];

export const GOAL_EMOJIS = ["🔥", "💪", "🏃", "☀️"];

export const PLAN_FEATURES = [
  {
    icon: "🔎",
    title: "Over 500 Mediterranean Recipes",
    desc: "Personalized plan that is the perfect fit for you and will help you manage weight in the most enjoyable way.",
  },
  {
    icon: "✨",
    title: "100+ Workouts & Exercises",
    desc: "Simple workouts, yoga exercises, meditation guides, and much more to help you manage weight and see results sooner.",
  },
  {
    icon: "⚡",
    title: "Motivating Challenges",
    desc: "Healthy challenges designed to keep you consistent and motivated, taking your weight loss and wellness journey to the next level.",
  },
  {
    icon: "🌱",
    title: "Nutrition & Health Guides",
    desc: "In depth guides on nutrition, workouts, healthy lifestyle, and other useful tips written by the top nutrition experts, personal trainers, and psychologists.",
  },
  {
    icon: "🔍",
    title: "Progress tracking & visualization",
    desc: "All the tools in your pocket to track and visualize your incredible progress and reach your weight goals on time.",
  },
];
