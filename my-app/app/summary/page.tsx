"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import { PLAN_FEATURES } from "@/lib/quiz-data";

export default function SummaryPage() {
  const router = useRouter();
  const { analysis } = useQuiz();
  const [summaryStep, setSummaryStep] = useState<"bmi" | "features">("bmi");

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3 sm:px-5 sm:py-4">
          <p className="font-display text-xl tracking-tight text-[#1a1a1a] italic sm:text-2xl">
            no.Diet
          </p>
        </div>
        <div className="h-[3px] w-full bg-[#3bb44a]" />
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-5 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        {/* ═══════════ BMI Summary ═══════════ */}
        {summaryStep === "bmi" && (
          <div className="w-full max-w-[680px] text-center">
            <h1 className="animate-fade-in-up font-body text-[26px] font-extrabold leading-tight text-[#1a1a1a] sm:text-[32px] md:text-[38px]">
              Your personal summary
            </h1>
            <p
              className="animate-fade-in-up mt-3 text-center font-body text-base leading-relaxed text-[#666] sm:mt-4 sm:text-lg"
              style={{ animationDelay: "0.05s", opacity: 0 }}
            >
              Based on your quiz answers, it looks like you might have an{" "}
              <span className="font-semibold text-[#c8553a]">
                increased metabolic age
              </span>
              , which can lead to{" "}
              <span className="font-semibold text-[#1a1a1a]">
                excess body weight
              </span>
              .
            </p>

            {/* BMI card */}
            <div
              className="animate-scale-in mx-auto mt-6 max-w-[540px] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:mt-8 sm:rounded-3xl sm:p-7"
            >
              <h3 className="text-left font-body text-base font-bold text-[#1a1a1a] sm:text-lg">
                <span className="mr-1.5 text-[#999]">⚖️</span> Current BMI
              </h3>
              <div className="relative mt-6 mb-2 sm:mt-7">
                {/* BMI indicator label */}
                <div
                  className="absolute -top-7 flex -translate-x-1/2 items-center rounded-md border border-[#e74c3c] bg-[#fde8e8] px-2.5 py-0.5 text-[11px] font-bold text-[#e74c3c] sm:-top-8 sm:px-3 sm:py-1 sm:text-xs"
                  style={{ left: `${analysis.bmiPosition}%` }}
                >
                  You - {fmt(analysis.bmi)}
                </div>
                {/* BMI gradient bar with dot indicator */}
                <div className="relative">
                  <div className="bmi-gradient h-3 w-full rounded-full" />
                  <div
                    className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-white shadow-md"
                    style={{ left: `${analysis.bmiPosition}%` }}
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-between font-body text-xs text-[#999] sm:text-sm">
                <span>Underweight</span>
                <span>Healthy</span>
                <span>Overweight</span>
                <span
                  className={
                    analysis.bmiLabel === "Obese"
                      ? "font-bold text-[#1a1a1a]"
                      : ""
                  }
                >
                  Obese
                </span>
              </div>
              {/* Weight category info */}
              <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#fde8e8] px-4 py-3 sm:mt-5 sm:px-5 sm:py-3.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e74c3c] text-[11px] text-[#e74c3c]">
                  i
                </span>
                <p className="font-body text-xs text-[#666] sm:text-sm">
                  Your weight category:{" "}
                  <span className="font-bold text-[#1a1a1a]">
                    {analysis.bmiLabel}
                  </span>
                </p>
              </div>
            </div>

            {/* Continue button */}
            <div className="mx-auto mt-6 max-w-[540px] sm:mt-8">
              <button
                className="w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:px-6 sm:py-4 sm:text-lg"
                onClick={() => setSummaryStep("features")}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════ Plan Features ═══════════ */}
        {summaryStep === "features" && (
          <div className="w-full max-w-[680px] text-center">
            <div className="animate-fade-in-up">
              <h1 className="font-body text-[26px] font-extrabold leading-tight text-[#1a1a1a] sm:text-[32px] md:text-[38px]">
                What does your{" "}
                <span className="text-[#3bb44a]">no.Diet</span> plan
                include?
              </h1>
            </div>

            <div className="stagger-children mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
              {PLAN_FEATURES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 text-left shadow-sm transition-all hover:shadow-md sm:p-5"
                >
                  <p className="font-body text-[15px] font-bold text-[#1a1a1a] sm:text-base">
                    <span className="mr-2">{icon}</span>
                    {title}
                  </p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-[#666] sm:mt-1.5 sm:text-sm">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <button
                className="w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:px-6 sm:py-4 sm:text-lg"
                onClick={() => router.push("/offer")}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
