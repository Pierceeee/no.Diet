import type { Unit, WeightUnit } from "./quiz-data";

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Converts a value to a plain string, unwrapping intlayer v8 node proxies.
 * Intlayer wraps every translated string in a React-element Proxy with a `.value`
 * getter; calling String() or using template literals on such a proxy yields
 * "[object Object]".  Accessing `.value` triggers the proxy's get trap and
 * returns the raw string.
 */
export function toStr(val: unknown): string {
  if (val !== null && typeof val === "object") {
    const v = (val as Record<string, unknown>).value;
    if (typeof v === "string" || typeof v === "number") {
      return String(v);
    }
  }
  return String(val);
}

export const fmt = (v: number, d = 1) =>
  Number.isFinite(v) ? v.toFixed(d) : "0.0";

export const toCm = (v: number, u: Unit) => (u === "cm" ? v : v * 2.54);

export const toKg = (v: number, u: WeightUnit) =>
  u === "kg" ? v : v * 0.453592;

export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export type BMICategory = "underweight" | "healthy" | "overweight" | "obese";

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  return "obese";
}

export function getBMICategoryDisplay(bmi: number): BMICategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  return "obese";
}

export type MetabolismStatus = "slow" | "normal" | "fast";

export function getMetabolismStatus(bmi: number): MetabolismStatus {
  if (bmi >= 25) return "slow";
  if (bmi < 18.5) return "fast";
  return "normal";
}

export function calculateWeightLossPercentage(
  currentWeight: number,
  targetWeight: number
): number {
  if (currentWeight <= 0) return 0;
  const percentage = ((currentWeight - targetWeight) / currentWeight) * 100;
  return Math.round(percentage * 10) / 10;
}

export function calculateBMIPosition(bmi: number): number {
  // Standard BMI ranges:
  // Underweight: < 18.5 (0-25%)
  // Healthy: 18.5-24.9 (25-50%)
  // Overweight: 25-29.9 (50-75%)
  // Obese: 30+ (75-100%)
  
  if (bmi < 18.5) {
    // Underweight: map BMI 10-18.5 to 0-25%
    const progress = (bmi - 10) / (18.5 - 10);
    return clamp(progress * 25, 2, 25);
  } else if (bmi < 25) {
    // Healthy: map BMI 18.5-25 to 25-50%
    const progress = (bmi - 18.5) / (25 - 18.5);
    return 25 + progress * 25;
  } else if (bmi < 30) {
    // Overweight: map BMI 25-30 to 50-75%
    const progress = (bmi - 25) / (30 - 25);
    return 50 + progress * 25;
  } else {
    // Obese: map BMI 30-60 to 75-100% so higher values
    // still spread across the final segment instead of pinning early.
    const progress = (bmi - 30) / (60 - 30);
    return clamp(75 + progress * 25, 75, 98);
  }
}

const BMI_GRADIENT_STOPS = [
  { position: 0, color: "#4a9fd5" },
  { position: 14, color: "#3f96d0" },
  { position: 24, color: "#2f8fc9" },
  { position: 34, color: "#43a95b" },
  { position: 48, color: "#67bd4b" },
  { position: 60, color: "#c9c34a" },
  { position: 72, color: "#e8a838" },
  { position: 86, color: "#e77342" },
  { position: 88, color: "#dd4747" },
  { position: 100, color: "#d94040" },
] as const;

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function getBMIGradientColor(position: number): string {
  const clampedPosition = clamp(position, 0, 100);

  for (let i = 1; i < BMI_GRADIENT_STOPS.length; i++) {
    const prev = BMI_GRADIENT_STOPS[i - 1];
    const next = BMI_GRADIENT_STOPS[i];

    if (clampedPosition <= next.position) {
      const progress =
        (clampedPosition - prev.position) / (next.position - prev.position);
      const start = hexToRgb(prev.color);
      const end = hexToRgb(next.color);

      return rgbToHex(
        start.r + (end.r - start.r) * progress,
        start.g + (end.g - start.g) * progress,
        start.b + (end.b - start.b) * progress,
      );
    }
  }

  return BMI_GRADIENT_STOPS[BMI_GRADIENT_STOPS.length - 1].color;
}
