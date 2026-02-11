import type { Answers } from "./quiz-data";
import { clamp, toCm, toKg } from "./utils";

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

  const bmi = currentKg / ((heightCm / 100) ** 2);
  const targetBmi = targetKg / ((heightCm / 100) ** 2);
  const targetLoss = clamp(
    ((currentKg - targetKg) / currentKg) * 100,
    0,
    80,
  );

  const bodyFat =
    answers.gender === "male"
      ? 1.2 * bmi + 0.23 * answers.q16 - 16.2
      : 1.2 * bmi + 0.23 * answers.q16 - 5.4;

  let bmiLabel: string;
  if (bmi < 18.5) bmiLabel = "Underweight";
  else if (bmi < 25) bmiLabel = "Healthy";
  else if (bmi < 30) bmiLabel = "Overweight";
  else bmiLabel = "Obese";

  let bmiPosition: number;
  if (bmi < 15) bmiPosition = 0;
  else if (bmi > 40) bmiPosition = 100;
  else bmiPosition = ((bmi - 15) / 25) * 100;

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
