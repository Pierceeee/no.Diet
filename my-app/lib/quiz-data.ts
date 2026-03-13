/* Core quiz data model (translation strings live in intlayer content files). */

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

export const FAMILIARITY_EMOJIS = ["🌱", "🧐", "🏆"];
export const DAY_TO_DAY_EMOJIS = ["💻", "🚶", "🏃", "🏠"];
export const ENERGY_EMOJIS = ["😴", "🥱", "😕", "🤩"];
export const EXERCISE_EMOJIS = ["🚫", "🗓️", "💪", "🔥"];
export const WEIGHT_CHANGE_EMOJIS = ["⚖️", "🔄", "➖", "🏋️"];
export const IDEAL_WEIGHT_EMOJIS = ["📅", "📆", "⏳", "❌"];
export const GOAL_EMOJIS = ["🔥", "💪", "🏋️", "☀️", "❤️", "🌿"];

export const PROTEIN_EMOJIS: Record<string, string> = {
  "I eat everything": "✅",
  Chicken: "🍗",
  "Red meat": "🥩",
  Cheese: "🧀",
  Tuna: "🐟",
  "Greek yogurt": "🥛",
  Salmon: "🐠",
  Shrimp: "🦐",
  Eggs: "🥚",
  Chickpeas: "🌰",
  Lentils: "🥜",
  Tofu: "🥡",
};

export const VEGETABLE_EMOJIS: Record<string, string> = {
  "I eat everything": "✅",
  Tomatoes: "🍅",
  Cucumber: "🥒",
  Broccoli: "🥦",
  Spinach: "🥬",
  Zucchini: "🥒",
  "Bell pepper": "🌶️",
  Avocado: "🥑",
  Olives: "🫒",
  Onions: "🧅",
};

export const GRAIN_EMOJIS: Record<string, string> = {
  "I eat everything": "✅",
  Rice: "🍚",
  Couscous: "🥣",
  Quinoa: "🌾",
  Oats: "🌾",
  Almonds: "🌰",
  Walnuts: "🥜",
  Peanuts: "🥜",
  Corn: "🌽",
};

export type ActivityLevel = "Low" | "Medium" | "High";
export type EnergyLevel = "Low" | "Medium" | "High";

// Internal scoring still uses canonical English answer keys.
export function getActivityLevel(answer: string): ActivityLevel {
  switch (answer) {
    case "I sit most of the day":
    case "I stay at home":
      return "Low";
    case "I move a lot":
      return "Medium";
    case "I exercise often":
      return "High";
    default:
      return "Medium";
  }
}

export function getEnergyLevel(answer: string): EnergyLevel {
  switch (answer) {
    case "Low most of the time":
    case "I feel tired after lunch":
      return "Low";
    case "My energy goes up and down":
      return "Medium";
    case "My energy is steady":
      return "High";
    default:
      return "Medium";
  }
}
