"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import {
  fmt,
  getBMIGradientColor,
} from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useIntlayer, useLocale } from "next-intlayer";

type SummaryStep = "bmi" | "bmiStory" | "coach" | "features";

const SUMMARY_STEPS: SummaryStep[] = ["bmi", "bmiStory", "coach", "features"];

export default function SummaryPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useIntlayer("results");
  const { analysis } = useQuiz();
  const [summaryStep, setSummaryStep] = useState<SummaryStep>("bmi");
  const bmiTone = (() => {
    switch (analysis.bmiLabel) {
      case "healthy":
        return { accent: "#3aab4f" };
      case "overweight":
        return { accent: "#e8a838" };
      case "obese":
        return { accent: "#d94040" };
      case "underweight":
      default:
        return { accent: "#4a9fd5" };
    }
  })();
  const bmiMarkerColor = getBMIGradientColor(analysis.bmiPosition);

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
            {t.summary.mainTitle}
          </h1>
        )}

        {/* ═══════════ STEP 1: BMI Card ═══════════ */}
        {summaryStep === "bmi" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-scale-in overflow-visible rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-7">
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-xl">
                {t.summary.currentBmi}
              </h3>
              <div className="relative mt-10 mb-2 sm:mt-12">
                <div
                  className="absolute bottom-full left-0 mb-1 flex -translate-x-1/2 items-center whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white sm:mb-1.5 sm:px-3 sm:py-1 sm:text-xs"
                  style={{
                    left: `${analysis.bmiPosition}%`,
                    backgroundColor: bmiMarkerColor,
                  }}
                >
                  {t.summary.currentBmi} - {fmt(analysis.bmi)}
                  <span
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                    style={{ backgroundColor: bmiMarkerColor }}
                  />
                </div>
                <div className="bmi-gradient h-2.5 w-full rounded-full sm:h-3" />
                <div
                  className="absolute top-0 h-2.5 w-1 rounded-full bg-white shadow-md sm:h-3"
                  style={{
                    left: `${analysis.bmiPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
              <div className="relative mt-2.5 flex justify-between px-1 font-body text-[10px] text-[#999] sm:mt-3 sm:text-xs">
                <span className={`text-center ${analysis.bmiLabel === "underweight" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  <span className="sm:hidden">Under</span>
                  <span className="hidden sm:inline">{t.summary.underweight}</span>
                </span>
                <span className={`text-center ${analysis.bmiLabel === "healthy" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  {t.summary.healthy}
                </span>
                <span className={`text-center ${analysis.bmiLabel === "overweight" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  <span className="sm:hidden">Over</span>
                  <span className="hidden sm:inline">{t.summary.overweight}</span>
                </span>
                <span className={`text-center ${analysis.bmiLabel === "obese" ? "font-bold text-[#1a1a1a]" : ""}`}>
                  {t.summary.obese}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-white px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-body text-sm text-[#666] sm:text-base">
                  {t.summary.weightCategory}{" "}
                  <span className="font-bold" style={{ color: bmiTone.accent }}>
                    {t.summary[analysis.bmiLabel as keyof typeof t.summary]}
                  </span>
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("bmiStory")}
            >
              {t.summary.continue}
            </button>
          </div>
        )}

        {/* ═══════════ STEP 3: BMI Story ═══════════ */}
        {summaryStep === "bmiStory" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            <div className="animate-fade-in-up rounded-2xl bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-6">
              <p className="font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a] sm:text-base">
                {t.summary.bmiStory1}
              </p>
              <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a] sm:text-base">
                {t.summary.bmiStory2}
              </p>
              <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a] sm:text-base">
                {t.summary.bmiStory3}
              </p>
              <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#2f6ebf] sm:text-base">
                {t.summary.bmiStory4}
              </p>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("coach")}
            >
              {t.summary.continue}
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 3: Bio-Adaptive Coach ═══════════ */}
        {summaryStep === "coach" && (
          <div className="mt-8 w-full max-w-[600px] sm:mt-10">
            {/* Header */}
            <div className="animate-fade-in-up text-center">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#1a1a1a] sm:text-2xl">
                {t.summary.coachTitle}
              </h2>
              <p className="mt-2 font-body text-[15px] font-semibold tracking-[-0.01em] text-[#666] sm:text-base">
                {t.summary.coachSubtitle}
              </p>
            </div>

            <div className="mt-6 space-y-4 sm:mt-8">
              {/* Card 1: AI Metabolic Intake Engine */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">1</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    {t.summary.card1Title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card1Body}
                </p>
              </div>

              {/* Card 2: Adaptive Mediterranean Blueprint */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">2</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    {t.summary.card2Title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card2Body1}
                </p>
                <p className="mt-2 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card2Body2}
                </p>
              </div>

              {/* Card 3: Your Live AI Coach */}
              <div className="animate-fade-in-up rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] font-body text-sm font-bold text-white">3</span>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-lg">
                    {t.summary.card3Title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-[15px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card3Body1}
                </p>
                <p className="mt-2 font-body text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card3Body2}
                </p>
                <p className="mt-4 font-body text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  {t.summary.card3Body3}
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
              onClick={() => setSummaryStep("features")}
            >
              {t.summary.continue}
            </button>
          </div>
        )}

        {/* ═══════════ SECTION 4: What's Included ═══════════ */}
        {summaryStep === "features" && (
          <div className="mt-4 w-full max-w-[640px] sm:mt-5">
            <h2 className="animate-fade-in-up text-center font-display text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#171717] sm:text-[46px]">
              {t.summary.featuresTitle}
            </h2>

            <div className="mt-9 space-y-3 sm:mt-10">
              {/* Feature 1 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.15s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[34px] align-middle leading-none">🍽️</span>
                  {t.summary.feature1Title}
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  {t.summary.feature1Body}
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.3s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[34px] align-middle leading-none">💪</span>
                  {t.summary.feature2Title}
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  {t.summary.feature2Body}
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.45s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[34px] align-middle leading-none">🔥</span>
                  {t.summary.feature3Title}
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  {t.summary.feature3Body}
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.6s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[34px] align-middle leading-none">📖</span>
                  {t.summary.feature4Title}
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  {t.summary.feature4Body}
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className="animate-fade-in-up rounded-[10px] border border-[#ececec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-6 sm:py-4.5"
                style={{ animationDelay: "0.75s", opacity: 0 }}
              >
                <p className="font-body text-[16px] font-semibold tracking-[-0.01em] text-[#1a1a1a] sm:text-[17px]">
                  <span className="mr-2 inline-block text-[34px] align-middle leading-none">📊</span>
                  {t.summary.feature5Title}
                </p>
                <p className="mt-1 pl-8 font-body text-[13.5px] leading-[1.4] tracking-[-0.01em] text-[#7b7b7b] sm:text-[14px]">
                  {t.summary.feature5Body}
                </p>
              </div>
            </div>

            <button
              className="animate-fade-in-up mt-7 w-full rounded-[10px] bg-[#3b82f6] px-6 py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] active:scale-[0.99] sm:mt-8 sm:py-4 sm:text-[16px]"
              style={{ animationDelay: "0.9s", opacity: 0 }}
              onClick={() => router.push(`/${locale}/offer`)}
            >
              {t.summary.continue}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
