"use client";

import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import { useState } from "react";

type PlanType = "week" | "month" | "quarter";

interface OfferPageContentProps {
  discountPercent: number;
  nextDiscountUrl?: string;
  isNonbuyers?: boolean;
}

const ORIGINAL_PRICES = {
  week: 12.98,
  month: 37.98,
  quarter: 75.98,
};

const FAQ_ITEMS = [
  {
    question: 'What are "Blue Zones" and why are they important?',
    answer:
      "Blue Zones are regions in the world where people live the longest and healthiest lives. In these regions, people eat mostly whole foods, healthy fats, vegetables, beans, and balanced portions. Your plan uses these proven eating patterns — but adjusts them to your body, your goals, and your lifestyle. It is not just a diet. It is a longevity-based system.",
  },
  {
    question: "How is this different from a normal Mediterranean diet plan?",
    answer:
      "Most Mediterranean plans are fixed. Your body is not. Your Personalized Mediterranean Coach uses your quiz results to create a plan based on: your metabolism, your activity level, your food preferences, and your goals. As your body changes, your plan can adjust. That is the difference.",
  },
  {
    question: "What does the AI Coach actually do?",
    answer:
      "The AI Coach helps personalize your nutrition and guide your progress. It uses your data and progress updates to: adjust meal combinations, suggest movement routines, keep you consistent, and help prevent plateaus. Instead of starting over, your plan evolves.",
  },
  {
    question: "Do I need to count calories or track macros?",
    answer:
      "No. Your plan is structured using balanced Mediterranean proportions. You focus on eating real food in the right combinations — not on daily numbers.",
  },
  {
    question: "I've tried many diets. Why would this work for me?",
    answer:
      "Many diets fail because they are: too strict, too generic, based on old calorie rules, or not adjusted to your stage of life. This system focuses on metabolic balance, not punishment. It is designed to be sustainable.",
  },
  {
    question: "Is this safe for people over 40?",
    answer:
      "Yes. In fact, the system is especially helpful for people over 30 and 40, when metabolism naturally changes. The plan focuses on balanced meals, whole foods, and steady progress — not extreme restriction.",
  },
  {
    question: "Will I feel hungry all the time?",
    answer:
      "No. The Mediterranean structure focuses on: fiber-rich vegetables, healthy fats, and balanced protein. These foods help you feel full and satisfied.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Many users notice improvements in: energy, bloating, and cravings within the first few weeks. Visible body changes usually require consistency. Your plan is built for steady progress — not quick fixes.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription anytime by contacting support by email hello@mediet.app. There are no extra cancellation fees.",
  },
];

const FEATURES = [
  {
    title: "Unlimited Adaptive Mediterranean Meal Combinations",
    description:
      "Precision-matched to your preferences and exclusions. Enjoyable. Structured. Sustainable.",
  },
  {
    title: "Unlimited Personalised Metabolic-Support Movement Protocols",
    description:
      "Strength, mobility, yoga, recovery. Designed to stimulate fat loss without burnout.",
  },
  {
    title: "Habit & Consistency Challenges",
    description:
      "Small, strategic momentum builders. Because rhythm beats motivation.",
  },
  {
    title: "Mediterranean Longevity & Metabolism Guides",
    description:
      "Understand: why inflammation disrupts fat loss, why modern processed food derails metabolism, why longevity populations eat differently. Clarity removes confusion.",
  },
  {
    title: "Progress Visualization & Adaptive Tracking",
    description:
      "Track: weight trends, body composition shifts, energy levels, habit consistency. So the system can stay aligned with you.",
  },
];

export default function OfferPageContent({
  discountPercent,
  nextDiscountUrl,
  isNonbuyers = false,
}: OfferPageContentProps) {
  const { analysis, answers } = useQuiz();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("month");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const discountMultiplier = (100 - discountPercent) / 100;

  const plans = {
    week: {
      name: "7-Day Plan",
      originalPrice: ORIGINAL_PRICES.week,
      discountPrice: +(ORIGINAL_PRICES.week * discountMultiplier).toFixed(2),
      perDay: +(
        (ORIGINAL_PRICES.week * discountMultiplier) /
        7
      ).toFixed(2),
    },
    month: {
      name: "1-Month Plan",
      originalPrice: ORIGINAL_PRICES.month,
      discountPrice: +(ORIGINAL_PRICES.month * discountMultiplier).toFixed(2),
      perDay: +(
        (ORIGINAL_PRICES.month * discountMultiplier) /
        30
      ).toFixed(2),
      popular: true,
    },
    quarter: {
      name: "3-Month Plan",
      originalPrice: ORIGINAL_PRICES.quarter,
      discountPrice: +(ORIGINAL_PRICES.quarter * discountMultiplier).toFixed(2),
      perDay: +(
        (ORIGINAL_PRICES.quarter * discountMultiplier) /
        90
      ).toFixed(2),
    },
  };

  const selectedPlanData = plans[selectedPlan];

  const targetBodyFat = Math.max(
    analysis.bodyFat - analysis.targetLoss * 0.3,
    10
  );
  const currentFitness = analysis.bmi > 25 ? 1 : analysis.bmi > 22 ? 2 : 3;
  const goalFitness = 3;

  const accentColor = discountPercent >= 60 ? "#1565c0" : "#3bb44a";
  const accentColorLight = discountPercent >= 60 ? "#e3f2fd" : "#f0faf2";

  const PricingPlans = () => (
    <div className="space-y-3 sm:space-y-4">
      {(["week", "month", "quarter"] as PlanType[]).map((plan) => (
        <div key={plan} className="relative">
          {plan === "month" && (
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
              <span
                className="flex items-center gap-1 rounded-full px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-white sm:px-4 sm:text-[11px]"
                style={{ backgroundColor: accentColor }}
              >
                MOST POPULAR: {discountPercent}% OFF
              </span>
            </div>
          )}
          <button
            onClick={() => setSelectedPlan(plan)}
            className={`flex w-full items-center justify-between rounded-[12px] border-2 px-3 py-3 text-left transition-all sm:px-5 sm:py-4 ${
              plan === "month" ? "pt-4 sm:pt-5" : ""
            } ${
              selectedPlan === plan
                ? `border-[${accentColor}]`
                : "border-[#e8e8e8] bg-white"
            }`}
            style={{
              borderColor: selectedPlan === plan ? accentColor : "#e8e8e8",
              backgroundColor: selectedPlan === plan ? accentColorLight : "white",
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: selectedPlan === plan ? accentColor : "#d0d0d0",
                }}
              >
                {selectedPlan === plan && (
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </div>
              <div>
                <p className="font-body text-[13px] font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-[15px]">
                  {plans[plan].name}
                </p>
                <p className="font-body text-[11px] text-[var(--text-muted)] sm:text-[12px]">
                  <span className="line-through">
                    ${plans[plan].originalPrice}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{ color: accentColor }}
                  >
                    ${plans[plan].discountPrice}
                  </span>
                </p>
              </div>
            </div>
            <div
              className="flex shrink-0 items-baseline gap-0.5 rounded-[8px] px-2 py-1 sm:px-3 sm:py-1.5"
              style={{
                backgroundColor:
                  selectedPlan === plan && plan === "month"
                    ? accentColor
                    : "#f5f5f5",
              }}
            >
              <span
                className="font-body text-[11px] font-bold sm:text-[13px]"
                style={{
                  color:
                    selectedPlan === plan && plan === "month"
                      ? "white"
                      : "var(--text-primary)",
                }}
              >
                $
              </span>
              <span
                className="font-body text-[24px] font-extrabold leading-none sm:text-[32px]"
                style={{
                  color:
                    selectedPlan === plan && plan === "month"
                      ? "white"
                      : "var(--text-primary)",
                }}
              >
                {Math.floor(plans[plan].perDay)}
              </span>
              <span
                className="font-body text-[13px] font-extrabold sm:text-[16px]"
                style={{
                  color:
                    selectedPlan === plan && plan === "month"
                      ? "white"
                      : "var(--text-primary)",
                }}
              >
                {(plans[plan].perDay % 1).toFixed(2).substring(2)}
              </span>
              <span
                className="ml-0.5 font-body text-[9px] sm:ml-1 sm:text-[11px]"
                style={{
                  color:
                    selectedPlan === plan && plan === "month"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--text-muted)",
                }}
              >
                per day
              </span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );

  const TermsCheckbox = () => (
    <div className="mt-4 flex items-start gap-3">
      <button
        onClick={() => setAgreedToTerms(!agreedToTerms)}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all"
        style={{
          borderColor: agreedToTerms ? accentColor : "#d0d0d0",
          backgroundColor: agreedToTerms ? accentColor : "white",
        }}
      >
        {agreedToTerms && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <p className="font-body text-xs text-[#666] sm:text-sm">
        I agree to the{" "}
        <a href="#" className="underline" style={{ color: accentColor }}>
          T&Cs
        </a>{" "}
        and{" "}
        <a href="#" className="underline" style={{ color: accentColor }}>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );

  const CTAButton = () => (
    <>
      <button
        disabled={!agreedToTerms}
        className="mt-4 w-full rounded-[12px] px-5 py-3.5 font-body text-base font-bold text-white transition-all hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4 sm:text-lg"
        style={{ backgroundColor: accentColor }}
      >
        GET MY PLAN
      </button>
      <p className="mt-3 text-center font-body text-[10px] leading-relaxed text-[#999] sm:text-xs">
        By clicking &quot;GET MY PLAN,&quot; you agree to pay $
        {selectedPlanData.discountPrice} for your{" "}
        {selectedPlanData.name.toLowerCase()}. If you do not cancel before the
        end of the first period, your subscription will renew at $
        {selectedPlanData.originalPrice} until canceled. You can cancel anytime
        by contacting support at hello@mediet.app.
      </p>
    </>
  );

  if (isNonbuyers) {
    return (
      <section className="w-full max-w-[600px]">
        <div className="rounded-2xl bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8] p-6 text-center sm:p-8">
          <p className="text-4xl">👋</p>
          <h1 className="mt-4 font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            We understand.
          </h1>
          <p className="mt-3 font-body text-sm text-[#666] sm:text-base">
            Maybe now isn&apos;t the right time for you.
          </p>
          <p className="mt-2 font-body text-sm text-[#666] sm:text-base">
            That&apos;s completely okay.
          </p>
        </div>

        <div className="mt-8 text-center">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            Before you go...
          </h2>
          <p className="mt-3 font-body text-sm text-[#666] sm:text-base">
            Your personalized Mediterranean Coach plan has been created based on
            your unique profile:
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 text-center">
            <p className="font-body text-xs text-[var(--text-muted)]">
              Current weight
            </p>
            <p className="mt-1 font-body text-lg font-bold text-[var(--text-primary)]">
              {fmt(analysis.currentKg, 0)} kg
            </p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 text-center">
            <p className="font-body text-xs text-[var(--text-muted)]">
              Target weight
            </p>
            <p className="mt-1 font-body text-lg font-bold text-[#3bb44a]">
              {fmt(analysis.targetKg, 0)} kg
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border-2 border-dashed border-[#d0d0d0] bg-[#fafafa] p-5 text-center">
          <p className="font-body text-sm font-medium text-[#666]">
            Your plan will be saved for <strong>24 hours</strong>.
          </p>
          <p className="mt-2 font-body text-xs text-[#999]">
            If you change your mind, you can return and claim your discount.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-center font-body text-sm font-semibold text-[var(--text-primary)]">
            In case you reconsider:
          </p>
          <div className="mt-4 rounded-xl border border-[#3bb44a] bg-[#f0faf2] p-4">
            <p className="text-center font-body text-sm text-[#3bb44a]">
              Your special {discountPercent}% discount is still available
            </p>
            <p className="mt-1 text-center font-body text-xs text-[#666]">
              1-Month Plan:{" "}
              <span className="line-through">${ORIGINAL_PRICES.month}</span>{" "}
              <span className="font-bold text-[#3bb44a]">
                ${plans.month.discountPrice}
              </span>
            </p>
          </div>
        </div>

        <a
          href="/offer"
          className="mt-6 block w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 text-center font-body text-base font-bold text-white transition-all hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] sm:px-6 sm:py-4 sm:text-lg"
        >
          Yes, I want my personalized plan
        </a>

        <p className="mt-4 text-center font-body text-xs text-[#999]">
          No pressure. We just want you to have the option.
        </p>

        <div className="mt-8 border-t border-[#e8e8e8] pt-6 text-center">
          <p className="font-body text-xs text-[#999]">
            Questions? Contact us at hello@mediet.app
          </p>
          <p className="mt-4 font-body text-xs text-[#ccc]">
            © 2026 Mediet.app. All rights reserved.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[600px]">
      {/* ─── Now vs Goal Card ─── */}
      <div className="animate-scale-in overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white shadow-sm sm:rounded-[16px]">
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

        <div className="grid grid-cols-2">
          <div className="relative border-r border-[#e8e8e8]">
            <div className="flex h-[160px] items-center justify-center bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <span className="text-[60px] opacity-60 grayscale sm:text-[80px] md:text-[100px]">
                {answers.gender === "male" ? "🧍‍♂️" : "🧍‍♀️"}
              </span>
            </div>
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

          <div className="relative">
            <div className="flex h-[160px] items-center justify-center bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <span className="text-[60px] sm:text-[80px] md:text-[100px]">
                {answers.gender === "male" ? "🏋️‍♂️" : "🏋️‍♀️"}
              </span>
            </div>
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
          Your Personalized Mediterranean
          <br />
          Coach Plan Is Ready
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-[#666] sm:text-base">
          You completed the quiz. Your metabolism profile is calculated. Your
          plan is prepared. Now choose the option that fits you best.
        </p>

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

      {/* ─── Choose Your Plan ─── */}
      <div id="get-plan" className="mt-8 sm:mt-10">
        <h3 className="mb-4 text-center font-display text-lg font-bold text-[var(--text-primary)] sm:mb-5 sm:text-xl">
          Choose Your Plan
        </h3>
        <PricingPlans />
        <TermsCheckbox />
        <CTAButton />
      </div>

      {/* ─── Safe Checkout ─── */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-sm">🔒</span>
        <p className="font-body text-xs font-medium text-[#666]">
          GUARANTEED SAFE CHECKOUT
        </p>
      </div>

      {/* ─── What's Included ─── */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-center font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
          What&apos;s Included Inside Your Plan
        </h3>
        <div className="mt-6 space-y-4">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  ✓
                </span>
                <div>
                  <p className="font-body text-sm font-bold text-[var(--text-primary)] sm:text-base">
                    {feature.title}
                  </p>
                  <p className="mt-1 font-body text-xs text-[#666] sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── See Visible Results ─── */}
      <div className="mt-10 rounded-xl bg-gradient-to-br from-[#f0faf2] to-[#e8f5e9] p-5 sm:mt-12 sm:p-6">
        <h3 className="text-center font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
          See Visible Results in 4 Weeks
        </h3>
        <p className="mt-4 text-center font-body text-sm text-[#666]">
          Many users begin to notice:
        </p>
        <ul className="mt-3 space-y-2 text-center">
          <li className="font-body text-sm text-[#444]">
            ✓ More stable energy
          </li>
          <li className="font-body text-sm text-[#444]">✓ Less bloating</li>
          <li className="font-body text-sm text-[#444]">
            ✓ Better control over cravings
          </li>
          <li className="font-body text-sm text-[#444]">
            ✓ Visible body changes
          </li>
        </ul>
        <p className="mt-4 text-center font-body text-sm font-medium text-[#444]">
          The key is consistency. Your system helps you stay on track.
        </p>
      </div>

      {/* ─── Second Pricing Section ─── */}
      <div className="mt-10 sm:mt-12">
        <h3 className="mb-4 text-center font-display text-lg font-bold text-[var(--text-primary)] sm:mb-5 sm:text-xl">
          Choose Your Plan
        </h3>
        <PricingPlans />
        <TermsCheckbox />
        <CTAButton />
      </div>

      {/* ─── FAQ Section ─── */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-center font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
          Got Questions?
        </h3>
        <div className="mt-6 space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <p className="pr-4 font-body text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  {faq.question}
                </p>
                <svg
                  className={`h-5 w-5 shrink-0 text-[#999] transition-transform ${
                    expandedFaq === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedFaq === i && (
                <div className="border-t border-[#e8e8e8] px-4 py-4">
                  <p className="font-body text-sm leading-relaxed text-[#666]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Risk-Free Cancellation ─── */}
      <div className="mt-10 rounded-xl border-2 border-[#3bb44a] bg-[#f0faf2] p-5 text-center sm:mt-12 sm:p-6">
        <p className="text-2xl">🛡️</p>
        <h3 className="mt-2 font-display text-lg font-bold text-[var(--text-primary)]">
          Risk-Free Cancellation
        </h3>
        <p className="mt-2 font-body text-sm text-[#666]">
          You can cancel your subscription anytime.
        </p>
        <p className="font-body text-sm text-[#666]">No extra charges.</p>
      </div>

      {/* ─── No Thanks Link (for discount pages) ─── */}
      {nextDiscountUrl && (
        <a
          href={nextDiscountUrl}
          className="mt-6 block w-full text-center font-body text-sm text-[#999] underline transition-colors hover:text-[#666]"
        >
          No thanks, I don&apos;t want to try this system
        </a>
      )}

      {/* ─── Footer ─── */}
      <div className="mt-8 border-t border-[#e8e8e8] pt-6 text-center">
        <p className="font-body text-xs text-[#999]">Results may vary.</p>
        <p className="mt-2 font-body text-xs text-[#ccc]">
          © 2026 Mediet.app. All rights reserved.
        </p>
      </div>
    </section>
  );
}
