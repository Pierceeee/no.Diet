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
