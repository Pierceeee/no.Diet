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
  q20: string[];
};

export const TOTAL_STEPS = 28;

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
  q20: [],
};

/* ─── Gender-specific option arrays ─── */

export function getGenderGoals(gender: Gender): string[] {
  return gender === "male"
    ? [
        "Lose body fat",
        "Get a lean body",
        "Build muscle",
        "Have more energy",
        "Improve my health",
        "Live longer",
      ]
    : [
        "Lose body fat",
        "Get a slimmer body",
        "Tone my body",
        "Have more energy",
        "Improve my health",
        "Live longer",
      ];
}

export function getQ3Bodies(gender: Gender): string[] {
  return gender === "male"
    ? ["Slim", "Average", "Some belly fat", "Overweight"]
    : ["Slim", "Average", "Some belly fat", "Overweight"];
}

export function getQ4Bodies(gender: Gender): string[] {
  return gender === "male"
    ? ["A little slimmer", "Lean and fit", "Athletic", "Strong and defined"]
    : [
        "Feel like myself again",
        "Lose stubborn belly fat",
        "Feel lighter and more confident",
        "Look toned and youthful",
      ];
}

export function getQ12Reasons(): string[] {
  return [
    "How I feel when I look in the mirror",
    "Feeling like myself again",
    "My energy with my kids / family",
    "My confidence around others",
    "How I feel for my partner",
    "My long term health",
    "How my clothes fit",
  ];
}

/* ─── Static option arrays ─── */

export const FAMILIARITY_OPTIONS = [
  "I'm new to it",
  "I know the basics",
  "I've tried it before",
];
export const FAMILIARITY_EMOJIS = ["🌱", "🧐", "🏆"];

export const BODY_AREAS = ["Arms", "Chest", "Back", "Stomach", "Legs", "Glutes"];

export const DAY_TO_DAY_OPTIONS = [
  "I sit most of the day",
  "I move a lot",
  "I exercise often",
  "I stay at home",
];
export const DAY_TO_DAY_EMOJIS = ["💻", "🚶", "🏃", "🏠"];

export const ENERGY_OPTIONS = [
  "Low most of the time",
  "I feel tired after lunch",
  "My energy goes up and down",
  "My energy is steady",
];
export const ENERGY_EMOJIS = ["😴", "🥱", "😕", "🤩"];

export const EXERCISE_OPTIONS = [
  "Never",
  "A few times a month",
  "A few times a week",
  "Almost every day",
];
export const EXERCISE_EMOJIS = ["🚫", "🗓️", "💪", "🔥"];

export const WEIGHT_CHANGE_OPTIONS = [
  "I gain weight fast and lose it slowly",
  "I lose weight but gain it back",
  "My weight stays the same",
  "I find it hard to build muscle",
];
export const WEIGHT_CHANGE_EMOJIS = ["⚖️", "🔄", "➖", "🏋️"];

export const IDEAL_WEIGHT_OPTIONS = [
  "Less than 1 year ago",
  "1–3 years ago",
  "More than 3 years ago",
  "I have never been at my best weight",
];
export const IDEAL_WEIGHT_EMOJIS = ["📅", "📆", "⏳", "❌"];

export const DIET_OPTIONS = [
  "Keto",
  "Intermittent fasting",
  "Low-carb",
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Other",
  "None of these",
];

export const MEAL_OPTIONS = ["Two", "Three", "Four", "Five"];

export const MEAL_DESCRIPTIONS = [
  "Breakfast and dinner, with optional snacks",
  "Breakfast, lunch, and dinner",
  "Breakfast, snack, lunch, and dinner",
  "Breakfast, lunch, dinner, and two snacks",
];

export const PROTEIN_OPTIONS = [
  "I eat everything",
  "Chicken",
  "Red meat",
  "Cheese",
  "Tuna",
  "Greek yogurt",
  "Salmon",
  "Shrimp",
  "Eggs",
  "Chickpeas",
  "Lentils",
  "Tofu",
];

export const VEGETABLE_OPTIONS = [
  "I eat everything",
  "Tomatoes",
  "Cucumber",
  "Broccoli",
  "Spinach",
  "Zucchini",
  "Bell pepper",
  "Avocado",
  "Olives",
  "Onions",
];

export const GRAIN_OPTIONS = [
  "I eat everything",
  "Rice",
  "Couscous",
  "Quinoa",
  "Oats",
  "Almonds",
  "Walnuts",
  "Peanuts",
  "Corn",
];

export const GOAL_EMOJIS = ["🔥", "💪", "🏋️", "☀️", "❤️", "🌿"];

/* ─── Info Block Content ─── */

export const INFO_BLOCKS = {
  blueZones: {
    title: "Their Secret To A Lean Body And Long Life. Now Finally Yours.",
    body: `People in the world's longest-living regions called **Blue Zones** — outlive everyone else.

They're also in better shape. Leaner. More energetic. And by every measure, among the happiest people on earth.

They don't count calories. They don't cut carbs. They eat real food, healthy fats, good ingredients.

It works because it was always personal.

Until now, nobody could replicate that for you. Specialist teams couldn't. Generic plans couldn't.

Now, an AI trained on millions of cases can.

It reads decades of research. It builds around your exact profile, in minutes.

**For the first time, the world's most proven longevity diet is being built around you, not everyone.**`,
  },
  metabolism: {
    title: "Your metabolism isn't broken. It's been given the wrong plan.",
    body: `Your body changes. Most plans don't.

A nutritionist sees you once a week. One hour. Limited data.

That's not personalization. That's guesswork on a schedule.

**Our AI-powered system runs 24/7.**

Trained on hundreds of years of research. Millions of real cases.

It adjusts when you adjust.

It never stops working on you.`,
  },
  dietsWrong: {
    title: "Those diets weren't wrong because you did them wrong.",
    body: `They were wrong because they never changed.

Keto. Calorie counting. Low fat. High grain.

You followed the rules. Your body adapted. The plan didn't.

That's why it stopped working.

A diet that can't evolve with you isn't a diet. It's a timer.

**The science is clear now. Static plans fail. Always.**

Your body is not static. Your plan shouldn't be either.`,
    image: "/quiz/3.png",
  },
  bmiExplanation: {
    title: "We use your height and weight to calculate your Body Mass Index (BMI).",
    body: "BMI helps us understand your current weight range.",
  },
  adviceWrong: {
    title: "That advice you were given? It was wrong.",
    body: `For years they said eat less fat. Count every calorie. Follow the pyramid.

Millions followed it perfectly. Millions still struggled.

The foundation was backwards. Not you.

The science has caught up. Your plan reflects that.`,
  },
  ageMetabolism: {
    title: "Age changes your metabolism, but it doesn't stop results.",
    body: `As we get older, the body responds differently to food.

That's why one-size-fits-all diets often fail after 30 or 40.

Your plan must adjust to your stage of life.`,
  },
  preEmail: {
    title: "This is not another fixed meal plan.",
    body: `Your Mediterranean Program is powered by AI coaching.

It adapts based on your progress, energy levels, and feedback.

You don't need to guess.

The system evolves with you.`,
    image: "/quiz/mediterranean-spread.png",
  },
};

export function getBmiMessage(bmiLabel: string): { title: string; body: string } {
  switch (bmiLabel) {
    case "Healthy":
      return {
        title: "Your BMI is in the healthy range.",
        body: "That's a great starting point. Now the goal is to maintain your weight, improve body shape, and support your metabolism. We will use your BMI to create your Personalized Mediterranean Coaching System and help you stay fit and strong.",
      };
    case "Overweight":
      return {
        title: "Your BMI is in the overweight range.",
        body: "This means your body may be storing extra fat. With the right nutrition plan, you can move toward a healthier weight. We will use your BMI to build your Personalized Mediterranean Coaching System.",
      };
    case "Obese":
      return {
        title: "Your BMI is in the obese range.",
        body: "This means your body is carrying more weight than recommended. Losing even a small amount of weight can improve your health and energy. We will use your BMI to create a Personalized Mediterranean Coaching System that helps you lose weight in a healthy and steady way.",
      };
    default:
      return {
        title: "Your BMI is in the underweight range.",
        body: "We will help you build a healthy nutrition plan to support your metabolism and overall well-being.",
      };
  }
}

export function getWeightLossMessage(lossPercent: number): { title: string; body: string } {
  if (lossPercent <= 20) {
    return {
      title: `Health Benefits: Lose ${lossPercent.toFixed(0)}% of your weight`,
      body: "Studies show that losing even 10% of your body weight can improve your health. It may help lower the risk of heart disease, high blood sugar, and inflammation in the body. Small changes can make a big difference.",
    };
  }
  return {
    title: `Bigger Goal: Lose ${lossPercent.toFixed(0)}% of your weight`,
    body: "Research shows that people who lose more than 20% of their body weight often improve their metabolic health more than those who lose only 5–10%. Losing more weight can lead to better energy, better blood sugar control, and better overall health.",
  };
}
