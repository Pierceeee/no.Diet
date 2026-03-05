import type { Unit, WeightUnit } from "./quiz-data";

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const fmt = (v: number, d = 1) =>
  Number.isFinite(v) ? v.toFixed(d) : "0.0";

export const toCm = (v: number, u: Unit) => (u === "cm" ? v : v * 2.54);

export const toKg = (v: number, u: WeightUnit) =>
  u === "kg" ? v : v * 0.453592;

export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getBMICategoryDisplay(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getMetabolismStatus(bmi: number): "Slow" | "Normal" | "Fast" {
  if (bmi >= 25) return "Slow";
  if (bmi < 18.5) return "Fast";
  return "Normal";
}

export function calculateWeightLossPercentage(
  currentWeight: number,
  targetWeight: number
): number {
  if (currentWeight <= 0) return 0;
  const percentage = ((currentWeight - targetWeight) / currentWeight) * 100;
  return Math.round(percentage * 10) / 10;
}

const BMI_SEGMENTS = [
  { min: 15, max: 18.5, width: 25 },
  { min: 18.5, max: 25, width: 25 },
  { min: 25, max: 30, width: 25 },
  // Extend the obese segment so high BMI values do not all pin to 100%.
  { min: 30, max: 60, width: 25 },
];

const BMI_MIN = BMI_SEGMENTS[0].min;
const BMI_MAX = BMI_SEGMENTS[BMI_SEGMENTS.length - 1].max;
const BMI_POSITION_PADDING = 4;

export function calculateBMIPosition(bmi: number): number {
  const clampedBmi = Math.min(Math.max(bmi, BMI_MIN), BMI_MAX);
  let position = 0;

  for (const seg of BMI_SEGMENTS) {
    if (clampedBmi <= seg.min) break;
    if (clampedBmi >= seg.max) {
      position += seg.width;
    } else {
      const segmentProgress = (clampedBmi - seg.min) / (seg.max - seg.min);
      position += segmentProgress * seg.width;
      break;
    }
  }
  // Keep marker and tooltip visually inside the graph container.
  return clamp(position, BMI_POSITION_PADDING, 100 - BMI_POSITION_PADDING);
}
