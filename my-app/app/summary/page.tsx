"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

type SummaryStep = "bmi" | "snapshot" | "bmiStory" | "coach" | "features";

const SUMMARY_STEPS: SummaryStep[] = ["bmi", "snapshot", "bmiStory", "coach", "features"];

export default function SummaryPage() {
  const router = useRouter();
  const { analysis } = useQuiz();
  const [summaryStep, setSummaryStep] = useState<SummaryStep>("bmi");

  // Push browser history on step change
  useEffect(() => {
    const currentState = window.history.state;
    if (currentState?.summaryStep !== summaryStep) {
      window.history.pushState({ summaryStep }, "");
    }
  }, [summaryStep]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const prevStep = e.state?.summaryStep;
      if (prevStep && SUMMARY_STEPS.includes(prevStep)) {
        setSummaryStep(prevStep);
      } else {
        const idx = SUMMARY_STEPS.indexOf(summaryStep);
        if (idx > 0) {
          const prev = SUMMARY_STEPS[idx - 1];
          setSummaryStep(prev);
          window.history.pushState({ summaryStep: prev }, "");
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [summaryStep]);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3 sm:px-5 sm:py-4">
          <Logo size="md" />
        </div>
        <div className="h-[3px] w-full bg-[#3b82f6]" />
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-5 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        {/* Main Title */}
        {summaryStep !== "features" && (
          <h1 className="animate-fade-in-up text-center font-display text-[22px] font-semibold leading-snug tracking-[-0.02em] text-[#1a1a1a] sm:text-[28px] md:text-[32px]">
            Your Personalized Mediterranean Coach Is Ready
          </h1>
        )}

        {/* ═══════════ STEP 1: BMI Card ═══════════ */}
        {summaryStep === "bmi" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-scale-in overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-7">
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-xl">
                Current BMI
              </h3>
              <div className="relative mt-6 mb-2 sm:mt-7">
                <div
                  className="absolute -top-7 flex -translate-x-1/2 items-center rounded-md bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-white sm:-top-8 sm:px-3 sm:py-1 sm:text-xs"
                  style={{ left: `${analysis.bmiPosition}%` }}
                >
                  You – {fmt(analysis.bmi)}
                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--accent)]" />
                </div>
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

              <div className="mt-5 rounded-xl bg-white px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-body text-sm text-[#666] sm:text-base">
                  Your Weight Category:{" "}
                  <span className="font-bold text-[#1a1a1a]">{analysis.bmiLabel}</span>
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("snapshot")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ STEP 2: Metabolic Snapshot ═══════════ */}
        {summaryStep === "snapshot" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-fade-in-up rounded-2xl border-l-4 border-[var(--accent)] bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-6">
              <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-xl">
                Your Personal Metabolic Snapshot
              </h2>

              <div className="info-block-text mt-4 space-y-4 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a] sm:mt-5 sm:space-y-4 sm:text-base">
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
                <p className="font-semibold text-[#2f6ebf]">
                  Your plan is built on that science.
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("bmiStory")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ STEP 3: BMI Story ═══════════ */}
        {summaryStep === "bmiStory" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-fade-in-up rounded-2xl bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-6">
              <p className="font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a] sm:text-base">
                But BMI alone doesn&apos;t tell the full story.
              </p>
              <p className="mt-3 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a] sm:text-base">
                Two people can have the same BMI and completely different metabolic responses.
              </p>
              <p className="mt-3 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a] sm:text-base">
                That&apos;s why your plan is not based on generic calorie formulas.
              </p>
              <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#2f6ebf] sm:text-base">
                It&apos;s based on adaptive metabolic alignment.
              </p>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("coach")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 3: Bio-Adaptive Coach ═══════════ */}
        {summaryStep === "coach" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            {/* Header */}
            <div className="animate-fade-in-up text-center">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-2xl">
                Meet Your Bio-Adaptive Weight Coaching System
              </h2>
              <p className="mt-2 font-body text-[15px] tracking-[-0.01em] text-[#666] sm:text-base">
                Built on AI and 70 years of Blue Zone longevity &amp; weight-loss science.
              </p>
            </div>

            <div className="mt-6 space-y-4 sm:mt-8">
              {/* Card 1: AI Metabolic Intake Engine */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">1</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    AI Metabolic Intake Engine
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a]">
                  Your inputs (body type, activity level, energy patterns, food preferences) are analyzed to determine optimal food proportions for your metabolic stage.
                </p>
              </div>

              {/* Card 2: Adaptive Mediterranean Blueprint */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">2</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    Adaptive Mediterranean Blueprint
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a]">
                  Built on eating patterns observed in the world&apos;s longest-living Mediterranean regions.
                </p>
                <p className="mt-2 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a]">
                  Your plan adjusts as your body adapts, helping reduce plateaus and metabolic slowdown.
                </p>
              </div>

              {/* Card 3: Your Live AI Coach */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">3</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    Your Live AI Coach
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a]">
                  Most programs give you a plan and leave you to figure it out.
                </p>
                <p className="mt-2 font-body text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  This one listens.
                </p>
                <div className="mt-3 space-y-2 font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[#4a4a4a]">
                  <p>Don&apos;t like a meal? Tell your coach — it finds something you&apos;ll actually enjoy.</p>
                  <p>Skipping workouts? It adjusts the intensity until it fits your life.</p>
                  <p>Hit a plateau? It recalibrates before frustration sets in.</p>
                </div>
                <p className="mt-4 font-body text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  The longer you use it — the better it knows you. The better it knows you — the better it works.
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("features")}
            >
              Continue
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 4: What's Included ═══════════ */}
        {summaryStep === "features" && (
          <div className="mt-4 w-full max-w-[640px] sm:mt-5">
            <h2 className="animate-fade-in-up text-center font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#171717] sm:text-[46px]">
              What does your <span className="text-[#3b82f6]">meDiet</span> plan include?
            </h2>

            <div className="mt-9 space-y-3 sm:mt-10">
              {/* Feature 1 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.15s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[24px] align-middle">🍽️</span>
                  Unlimited Adaptive Mediterranean Meals
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  Matched to your preferences.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.3s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[24px] align-middle">💪</span>
                  Personalised Metabolic Movement
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  Strength, mobility, recovery.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.45s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[24px] align-middle">🔥</span>
                  Habit &amp; Consistency Challenges
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  Small strategic actions.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.6s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[24px] align-middle">📖</span>
                  Longevity &amp; Metabolism Guides
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  Learn why inflammation, processed foods, and modern diet rules disrupt fat loss.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.75s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[24px] align-middle">📊</span>
                  Adaptive Progress Tracking
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  Track weight, body changes, energy, and habits.
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-7 w-full rounded-[10px] bg-[#3b82f6] px-6 py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] active:scale-[0.99] sm:mt-8 sm:py-4 sm:text-[16px]"
              style={{ animationDelay: "0.9s", opacity: 0 }}
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
