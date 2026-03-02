import type { Answers } from "./quiz-data";
import {
  calculateBMI,
  calculateBMIPosition,
  calculateWeightLossPercentage,
  clamp,
  getBMICategoryDisplay,
  toCm,
  toKg,
} from "./utils";

export interface AnalysisResult {
  heightCm: number;
  currentKg: number;
  targetKg: number;
  bmi: number;
  targetBmi: number;
  targetLoss: number;
  bodyFat: number;
  bmiLabel: string;
  bmiPosition: number;
}

export function generateAnalysis(answers: Answers): AnalysisResult {
  const heightCm = clamp(toCm(answers.q13, answers.q13Unit), 120, 220);
  const currentKg = clamp(toKg(answers.q14, answers.q14Unit), 40, 200);
  const targetKg = clamp(toKg(answers.q15, answers.q15Unit), 40, 200);

  const bmi = calculateBMI(heightCm, currentKg);
  const targetBmi = calculateBMI(heightCm, targetKg);
  const targetLoss = clamp(
    calculateWeightLossPercentage(currentKg, targetKg),
    0,
    80
  );

  const bodyFat =
    answers.gender === "male"
      ? 1.2 * bmi + 0.23 * answers.q16 - 16.2
      : 1.2 * bmi + 0.23 * answers.q16 - 5.4;

  const bmiLabel = getBMICategoryDisplay(bmi);
  const bmiPosition = calculateBMIPosition(bmi);

  return {
    heightCm,
    currentKg,
    targetKg,
    bmi,
    targetBmi,
    targetLoss,
    bodyFat: clamp(bodyFat, 8, 45),
    bmiLabel,
    bmiPosition,
  };
}
