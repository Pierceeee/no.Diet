"use client";

import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function OfferPage() {
  const { analysis, answers } = useQuiz();

  const [seconds, setSeconds] = useState(15 * 60 - 3);
  const [selectedPlan, setSelectedPlan] = useState<"month" | "week">("month");

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  // Calculate target body fat (lower by the loss percentage, clamped)
  const targetBodyFat = Math.max(
    analysis.bodyFat - analysis.targetLoss * 0.3,
    10
  );

  // Fitness level: 1 = low, 2 = medium, 3 = high
  const currentFitness = analysis.bmi > 25 ? 1 : analysis.bmi > 22 ? 2 : 3;
  const goalFitness = 3;

  return (
    <section className="w-full max-w-[600px]">
      {/* ─── Now vs Goal Card ─── */}
      <div className="animate-scale-in overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white shadow-sm sm:rounded-[16px]">
        {/* Header tabs */}
        <div className="grid grid-cols-2">
          <div className="border-b border-r border-[#e8e8e8] py-2.5 text-center sm:py-3">
            <span className="font-body text-[14px] font-bold text-[#e53935] sm:text-[15px]">
              Now
            </span>
          </div>
          <div className="border-b border-[#e8e8e8] py-2.5 text-center sm:py-3">
            <span className="font-body text-[14px] font-bold text-[#3bb44a] sm:text-[15px]">
              Goal
            </span>
          </div>
        </div>

        {/* Body comparison */}
        <div className="grid grid-cols-2">
          {/* Now side */}
          <div className="relative border-r border-[#e8e8e8]">
            {/* Body silhouette area */}
            <div className="flex h-[160px] items-center justify-center bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <span className="text-[60px] opacity-60 grayscale sm:text-[80px] md:text-[100px]">
                {answers.gender === "male" ? "🧍‍♂️" : "🧍‍♀️"}
              </span>
            </div>
            {/* Stats */}
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  Body fat:
                </p>
                <p className="font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.bodyFat)}%
                </p>
              </div>
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  BMI:
                </p>
                <p className="font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.bmi)}
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  Fitness level:
                </p>
                <div className="mt-1 flex gap-1 sm:mt-1.5 sm:gap-1.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-[5px] w-[22px] rounded-full sm:h-[6px] sm:w-[28px] ${
                        level <= currentFitness
                          ? "bg-[#e53935]"
                          : "bg-[#fcc] opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Goal side */}
          <div className="relative">
            {/* Body silhouette area */}
            <div className="flex h-[160px] items-center justify-center bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <span className="text-[60px] sm:text-[80px] md:text-[100px]">
                {answers.gender === "male" ? "🏋️‍♂️" : "🏋️‍♀️"}
              </span>
            </div>
            {/* Stats */}
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  Body fat:
                </p>
                <p className="font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(targetBodyFat)}%
                </p>
              </div>
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  BMI:
                </p>
                <p className="font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.targetBmi)}
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[13px]">
                  Fitness level:
                </p>
                <div className="mt-1 flex gap-1 sm:mt-1.5 sm:gap-1.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-[5px] w-[22px] rounded-full sm:h-[6px] sm:w-[28px] ${
                        level <= goalFitness
                          ? "bg-[#3bb44a]"
                          : "bg-[#c8e6c9] opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Plan Ready Section ─── */}
      <div className="mt-8 text-center sm:mt-10">
        <h2 className="font-body text-[22px] font-extrabold leading-snug text-[var(--text-primary)] sm:text-[26px] md:text-[32px]">
          Your personalized no.Diet
          <br />
          plan is ready!
        </h2>

        {/* Goal + Target weight badges */}
        <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl">🎯</span>
            <div className="text-left">
              <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                Goal
              </p>
              <p className="font-body text-[13px] font-bold text-[var(--text-primary)] sm:text-[14px]">
                Lose weight
              </p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-[#e8e8e8]" />
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl">⚖️</span>
            <div className="text-left">
              <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                Target weight
              </p>
              <p className="font-body text-[13px] font-bold text-[var(--text-primary)] sm:text-[14px]">
                {fmt(analysis.targetKg, 0)} kg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Countdown Timer Bar ─── */}
      <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#f9a825] px-4 py-2.5 sm:mt-8 sm:px-6 sm:py-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="font-body text-[13px] font-bold text-white sm:text-[14px]">
          This offer ends in {timeStr}
        </span>
      </div>

      {/* ─── Pricing Plans ─── */}
      <div id="get-plan" className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
        {/* 7-Day Plan */}
        <button
          onClick={() => setSelectedPlan("week")}
          className={`flex w-full items-center justify-between rounded-[12px] border-2 px-3 py-3 text-left transition-all sm:px-5 sm:py-4 ${
            selectedPlan === "week"
              ? "border-[#3bb44a] bg-[#f0faf2]"
              : "border-[#e8e8e8] bg-white"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                selectedPlan === "week"
                  ? "border-[#3bb44a]"
                  : "border-[#d0d0d0]"
              }`}
            >
              {selectedPlan === "week" && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#3bb44a]" />
              )}
            </div>
            <div>
              <p className="font-body text-[13px] font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-[15px]">
                7-DAY PLAN
              </p>
              <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                <span className="line-through">$19.99</span>{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  $6.93
                </span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-baseline gap-0.5 rounded-[8px] bg-[#f5f5f5] px-2 py-1 sm:px-3 sm:py-1.5">
            <span className="font-body text-[11px] font-bold text-[var(--text-primary)] sm:text-[13px]">
              $
            </span>
            <span className="font-body text-[24px] font-extrabold leading-none text-[var(--text-primary)] sm:text-[32px]">
              0
            </span>
            <span className="font-body text-[13px] font-extrabold text-[var(--text-primary)] sm:text-[16px]">
              99
            </span>
            <span className="ml-0.5 font-body text-[9px] text-[var(--text-muted)] sm:ml-1 sm:text-[11px]">
              per day
            </span>
          </div>
        </button>

        {/* 1-Month Plan - Most Popular */}
        <div className="relative">
          <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
            <span className="flex items-center gap-1 rounded-full bg-[#3bb44a] px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-white sm:px-4 sm:text-[11px]">
              👍 MOST POPULAR: 50% OFF
            </span>
          </div>
          <button
            onClick={() => setSelectedPlan("month")}
            className={`flex w-full items-center justify-between rounded-[12px] border-2 px-3 pb-3 pt-4 text-left transition-all sm:px-5 sm:pb-4 sm:pt-5 ${
              selectedPlan === "month"
                ? "border-[#3bb44a] bg-[#f0faf2]"
                : "border-[#e8e8e8] bg-white"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selectedPlan === "month"
                    ? "border-[#3bb44a]"
                    : "border-[#d0d0d0]"
                }`}
              >
                {selectedPlan === "month" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#3bb44a]" />
                )}
              </div>
              <div>
                <p className="font-body text-[13px] font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-[15px]">
                  1-MONTH PLAN
                </p>
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                  <span className="line-through">$39.99</span>{" "}
                  <span className="font-semibold text-[var(--text-secondary)]">
                    $19.99
                  </span>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-baseline gap-0.5 rounded-[8px] bg-[#3bb44a] px-2 py-1 sm:px-3 sm:py-1.5">
              <span className="font-body text-[11px] font-bold text-white sm:text-[13px]">
                $
              </span>
              <span className="font-body text-[24px] font-extrabold leading-none text-white sm:text-[32px]">
                0
              </span>
              <span className="font-body text-[13px] font-extrabold text-white sm:text-[16px]">
                66
              </span>
              <span className="ml-0.5 font-body text-[9px] text-white/70 sm:ml-1 sm:text-[11px]">
                per day
              </span>
            </div>
          </button>
        </div>

        {/* 3-Month Plan */}
        <button
          onClick={() => setSelectedPlan("week")}
          className="flex w-full items-center justify-between rounded-[12px] border-2 border-[#e8e8e8] bg-white px-3 py-3 text-left transition-all sm:px-5 sm:py-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#d0d0d0]" />
            <div>
              <p className="font-body text-[13px] font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-[15px]">
                3-MONTH PLAN
              </p>
              <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                <span className="line-through">$89.99</span>{" "}
                <span className="font-semibold text-[var(--text-secondary)]">
                  $44.99
                </span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-baseline gap-0.5 rounded-[8px] bg-[#f5f5f5] px-2 py-1 sm:px-3 sm:py-1.5">
            <span className="font-body text-[11px] font-bold text-[var(--text-primary)] sm:text-[13px]">
              $
            </span>
            <span className="font-body text-[24px] font-extrabold leading-none text-[var(--text-primary)] sm:text-[32px]">
              0
            </span>
            <span className="font-body text-[13px] font-extrabold text-[var(--text-primary)] sm:text-[16px]">
              50
            </span>
            <span className="ml-0.5 font-body text-[9px] text-[var(--text-muted)] sm:ml-1 sm:text-[11px]">
              per day
            </span>
          </div>
        </button>
      </div>

      {/* ─── Get Plan CTA ─── */}
      <button className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-bold text-white transition-all hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg">
        GET MY PLAN
      </button>

      {/* ─── Guarantee ─── */}
      <p className="mt-3 text-center font-body text-[11px] text-[var(--text-muted)] sm:mt-4 sm:text-[12px]">
        30-day money-back guarantee. Cancel anytime.
      </p>
    </section>
  );
}
