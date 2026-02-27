"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";

type SummaryStep = "metabolic" | "bmi" | "coach" | "features";

export default function SummaryPage() {
  const router = useRouter();
  const { analysis } = useQuiz();
  const [summaryStep, setSummaryStep] = useState<SummaryStep>("metabolic");

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
        {/* Main Title */}
        <h1 className="animate-fade-in-up text-center font-display text-[22px] font-bold leading-tight text-[#1a1a1a] sm:text-[28px] md:text-[32px]">
          Your Personalized Mediterranean Coach Is Ready
        </h1>

        {/* ═══════════ SECTION 1: Metabolic Snapshot ═══════════ */}
        {summaryStep === "metabolic" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-fade-in-up rounded-2xl border-l-4 border-[var(--accent)] bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-6">
              <h2 className="font-display text-lg font-bold text-[#1a1a1a] sm:text-xl">
                Your Personal Metabolic Snapshot
              </h2>
              
              <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-[#444] sm:mt-5 sm:space-y-4 sm:text-[15px]">
                <p>
                  Based on your answers, your metabolism may be slightly out of balance.
                </p>
                <p>
                  This can make fat loss harder, increase belly storage, and raise inflammation.
                </p>
                <p>
                  Over time, metabolic imbalance is linked to lower energy and higher risk of chronic disease.
                </p>
                <p className="font-semibold text-[#1a1a1a]">
                  This isn&apos;t a discipline issue.
                </p>
                <p>
                  It&apos;s a mismatch between outdated diet rules and your current metabolic stage.
                </p>
                <p>
                  The good news? It&apos;s reversible.
                </p>
                <p>
                  Blue Zone research shows that when you eat in alignment with your body, metabolism stabilizes and inflammation drops.
                </p>
                <p className="font-semibold text-[#3bb44a]">
                  Your plan is built on that science.
                </p>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("bmi")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 2: BMI ═══════════ */}
        {summaryStep === "bmi" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            {/* BMI Card */}
            <div className="animate-scale-in overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-7">
              <h3 className="font-display text-lg font-bold text-[#1a1a1a] sm:text-xl">
                Current BMI
              </h3>
              <div className="relative mt-6 mb-2 sm:mt-7">
                {/* BMI indicator label */}
                <div
                  className="absolute -top-7 flex -translate-x-1/2 items-center rounded-md bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-white sm:-top-8 sm:px-3 sm:py-1 sm:text-xs"
                  style={{ left: `${analysis.bmiPosition}%` }}
                >
                  You – {fmt(analysis.bmi)}
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--accent)]" />
                </div>
                {/* BMI gradient bar */}
                <div className="bmi-gradient h-3 w-full rounded-full" />
                <div
                  className="absolute top-0 h-3 w-1 rounded-full bg-white shadow-md"
                  style={{
                    left: `${analysis.bmiPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
              <div className="relative mt-3 h-5 font-body text-xs text-[#999] sm:text-sm">
                <span className={`absolute left-[9%] -translate-x-1/2 ${analysis.bmiLabel === "Underweight" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  Underweight
                </span>
                <span className={`absolute left-[34%] -translate-x-1/2 ${analysis.bmiLabel === "Healthy" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  Healthy
                </span>
                <span className={`absolute left-[62.5%] -translate-x-1/2 ${analysis.bmiLabel === "Overweight" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  Overweight
                </span>
                <span className={`absolute left-[87.5%] -translate-x-1/2 ${analysis.bmiLabel === "Obese" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  Obese
                </span>
              </div>
              
              {/* Weight category */}
              <div className="mt-5 rounded-xl bg-white px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-body text-sm text-[#666] sm:text-base">
                  Your Weight Category:{" "}
                  <span className="font-bold text-[#1a1a1a]">{analysis.bmiLabel}</span>
                </p>
              </div>
            </div>

            {/* Additional info */}
            <div
              className="animate-fade-in-up mt-4 rounded-2xl bg-[#f8f8f8] p-5 sm:mt-5 sm:rounded-3xl sm:p-6"
              style={{ animationDelay: "0.15s", opacity: 0 }}
            >
              <p className="font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
                But BMI alone doesn&apos;t tell the full story.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
                Two people can have the same BMI and completely different metabolic responses.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
                That&apos;s why your plan is not based on generic calorie formulas.
              </p>
              <p className="mt-3 font-body text-sm font-semibold leading-relaxed text-[#3bb44a] sm:text-[15px]">
                It&apos;s based on adaptive metabolic alignment.
              </p>
            </div>

            <button
              className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("coach")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 3: Bio-Adaptive Coach ═══════════ */}
        {summaryStep === "coach" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-fade-in-up rounded-2xl border-l-4 border-[var(--accent)] bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-6">
              <h2 className="font-display text-lg font-bold text-[#1a1a1a] sm:text-xl">
                Meet Your Bio-Adaptive Weight Coaching System
              </h2>
              <p className="mt-2 font-body text-sm text-[#666] sm:text-[15px]">
                Built on AI and 70 years of Blue Zone longevity &amp; weight-loss science.
              </p>

              {/* Feature 1 */}
              <div className="mt-6 border-t border-[#e5e5e5] pt-5">
                <h3 className="font-body text-base font-bold text-[#1a1a1a]">
                  1️⃣ AI Metabolic Intake Engine
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#444]">
                  Your inputs (body type, activity level, energy patterns, food preferences) are analyzed to determine optimal food proportions for your metabolic stage.
                </p>
                <p className="mt-2 font-body text-sm font-medium text-[#1a1a1a]">
                  Not yesterday&apos;s nutrition model. Today&apos;s.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="mt-5 border-t border-[#e5e5e5] pt-5">
                <h3 className="font-body text-base font-bold text-[#1a1a1a]">
                  2️⃣ Adaptive Mediterranean Blueprint
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#444]">
                  Built on eating patterns observed in the world&apos;s longest-living Mediterranean regions:
                </p>
                <ul className="mt-2 space-y-1 font-body text-sm text-[#444]">
                  <li>• Emphasis on whole foods</li>
                  <li>• Strategic healthy fats</li>
                  <li>• Balanced protein</li>
                  <li>• Controlled refined carbs</li>
                  <li>• Anti-inflammatory focus</li>
                </ul>
                <p className="mt-3 font-body text-sm font-medium text-[#3bb44a]">
                  But personalized.
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#444]">
                  Your plan adjusts as your body adapts, helping reduce plateaus and metabolic slowdown.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="mt-5 border-t border-[#e5e5e5] pt-5">
                <h3 className="font-body text-base font-bold text-[#1a1a1a]">
                  3️⃣ Your Live AI Coach
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#444]">
                  Most programs give you a plan and leave you to figure it out.
                </p>
                <p className="mt-2 font-body text-sm font-semibold text-[#1a1a1a]">
                  This one listens.
                </p>
                <div className="mt-3 space-y-2 font-body text-sm text-[#444]">
                  <p>Don&apos;t like a meal? Tell your coach — it finds something you&apos;ll actually enjoy.</p>
                  <p>Skipping workouts? It adjusts the intensity until it fits your life.</p>
                  <p>Hit a plateau? It recalibrates before frustration sets in.</p>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-[#444]">
                  As your weight, energy and consistency change:
                </p>
                <ul className="mt-2 space-y-1 font-body text-sm text-[#444]">
                  <li>• Meals shift to what works for you</li>
                  <li>• Workouts adapt to what you&apos;ll actually do</li>
                  <li>• Balance recalibrates to where your body is now</li>
                </ul>
                <p className="mt-3 font-body text-sm text-[#444]">
                  No guessing. No white-knuckling through food you hate.
                </p>
                <p className="mt-2 font-body text-sm font-bold text-[#3bb44a]">
                  You don&apos;t restart. You refine.
                </p>
                <p className="mt-3 font-body text-sm text-[#444]">
                  The longer you use it — the better it knows you.
                </p>
                <p className="font-body text-sm text-[#444]">
                  The better it knows you — the better it works.
                </p>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("features")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 4: What's Included ═══════════ */}
        {summaryStep === "features" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <h2 className="animate-fade-in-up text-center font-display text-lg font-bold text-[#1a1a1a] sm:text-xl">
              What&apos;s Included Inside Your System
            </h2>

            <div className="mt-6 space-y-4 sm:mt-8">
              {/* Feature 1 */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 shadow-sm sm:p-5">
                <p className="font-body text-base font-bold text-[#1a1a1a]">
                  ✔ Unlimited Adaptive Mediterranean Meals
                </p>
                <p className="mt-1 font-body text-sm text-[#666]">
                  Matched to your preferences.
                </p>
                <p className="font-body text-sm font-medium text-[#3bb44a]">
                  Enjoyable. Structured. Sustainable.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 shadow-sm sm:p-5"
                style={{ animationDelay: "0.05s", opacity: 0 }}
              >
                <p className="font-body text-base font-bold text-[#1a1a1a]">
                  ✔ Personalised Metabolic Movement
                </p>
                <p className="mt-1 font-body text-sm text-[#666]">
                  Strength, mobility, recovery.
                </p>
                <p className="font-body text-sm font-medium text-[#3bb44a]">
                  Fat-loss support without burnout.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 shadow-sm sm:p-5"
                style={{ animationDelay: "0.1s", opacity: 0 }}
              >
                <p className="font-body text-base font-bold text-[#1a1a1a]">
                  ✔ Habit &amp; Consistency Challenges
                </p>
                <p className="mt-1 font-body text-sm text-[#666]">
                  Small strategic actions.
                </p>
                <p className="font-body text-sm font-medium text-[#3bb44a]">
                  Rhythm beats motivation.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 shadow-sm sm:p-5"
                style={{ animationDelay: "0.15s", opacity: 0 }}
              >
                <p className="font-body text-base font-bold text-[#1a1a1a]">
                  ✔ Longevity &amp; Metabolism Guides
                </p>
                <p className="mt-1 font-body text-sm text-[#666]">
                  Learn why inflammation, processed foods, and modern diet rules disrupt fat loss.
                </p>
                <p className="font-body text-sm font-medium text-[#3bb44a]">
                  Clarity removes confusion.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-4 shadow-sm sm:p-5"
                style={{ animationDelay: "0.2s", opacity: 0 }}
              >
                <p className="font-body text-base font-bold text-[#1a1a1a]">
                  ✔ Adaptive Progress Tracking
                </p>
                <p className="mt-1 font-body text-sm text-[#666]">
                  Track weight, body changes, energy, and habits.
                </p>
                <p className="font-body text-sm font-medium text-[#3bb44a]">
                  Your plan adjusts as you progress.
                </p>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => router.push("/offer")}
            >
              Continue
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
