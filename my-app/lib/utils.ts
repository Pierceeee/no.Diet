import type { Unit, WeightUnit } from "./quiz-data";

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const fmt = (v: number, d = 1) =>
  Number.isFinite(v) ? v.toFixed(d) : "0.0";

export const toCm = (v: number, u: Unit) => (u === "cm" ? v : v * 2.54);

export const toKg = (v: number, u: WeightUnit) =>
  u === "kg" ? v : v * 0.453592;
