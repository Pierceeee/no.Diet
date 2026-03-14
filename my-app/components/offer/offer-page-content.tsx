"use client";

import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useIntlayer } from "next-intlayer";

type PlanType = "week" | "month" | "quarter";
type OfferPageContentProps = {
  useOrderPagePricing?: boolean;
};
type PlanDetails = {
  name: string;
  originalPrice: number;
  discountPrice: number;
  perDay: number;
  popular?: boolean;
};

const ORIGINAL_PRICES = {
  week: 12.98,
  month: 37.98,
  quarter: 75.98,
};

const DISCOUNT_PERCENT = 50;

export default function OfferPageContent({
  useOrderPagePricing = false,
}: OfferPageContentProps) {
  const t = useIntlayer("offer");
  const { analysis, answers } = useQuiz();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("month");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const discountMultiplier = (100 - DISCOUNT_PERCENT) / 100;

  const defaultPlans: Record<PlanType, PlanDetails> = {
    week: {
      name: "7-Day Plan",
      originalPrice: ORIGINAL_PRICES.week,
      discountPrice: +(ORIGINAL_PRICES.week * discountMultiplier).toFixed(2),
      perDay: +((ORIGINAL_PRICES.week * discountMultiplier) / 7).toFixed(2),
    },
    month: {
      name: "1-Month Plan",
      originalPrice: ORIGINAL_PRICES.month,
      discountPrice: +(ORIGINAL_PRICES.month * discountMultiplier).toFixed(2),
      perDay: +((ORIGINAL_PRICES.month * discountMultiplier) / 30).toFixed(2),
      popular: true,
    },
    quarter: {
      name: "3-Month Plan",
      originalPrice: ORIGINAL_PRICES.quarter,
      discountPrice: +(ORIGINAL_PRICES.quarter * discountMultiplier).toFixed(2),
      perDay: +((ORIGINAL_PRICES.quarter * discountMultiplier) / 90).toFixed(2),
    },
  };
  const orderPagePlans: Record<PlanType, PlanDetails> = {
    week: {
      name: "7-Day Plan",
      originalPrice: 12.98,
      discountPrice: 6.49,
      perDay: 0.92,
    },
    month: {
      name: "1-Month Plan",
      originalPrice: 37.98,
      discountPrice: 18.99,
      perDay: 0.63,
      popular: true,
    },
    quarter: {
      name: "3-Month Plan",
      originalPrice: 75.98,
      discountPrice: 37.99,
      perDay: 0.42,
    },
  };

  const plans = useOrderPagePricing ? orderPagePlans : defaultPlans;

  const selectedPlanData = plans[selectedPlan];

  const targetBodyFat = Math.max(
    analysis.bodyFat - analysis.targetLoss * 0.3,
    10
  );
  const currentFitness = analysis.bmi > 25 ? 1 : analysis.bmi > 22 ? 2 : 3;
  const goalFitness = 3;
  const isMale = answers.gender === "male";

  const nowImageSrc = isMale
    ? "/docs/goal/8.svg"
    : analysis.bmiLabel === "overweight"
    ? "/docs/goal/5.svg"
    : analysis.bmiLabel === "obese"
    ? "/docs/goal/2.svg"
    : "/docs/goal/6.svg";

  const goalImageSrc = isMale ? "/docs/goal/7.svg" : "/docs/goal/3.svg";

  const accentColor = "#3b82f6";

  const PricingPlans = () => (
    <div className="space-y-3 sm:space-y-4">
      {(["week", "month", "quarter"] as PlanType[]).map((plan) => {
        const isSelected = selectedPlan === plan;
        return (
          <button
            key={plan}
            onClick={() => setSelectedPlan(plan)}
            className={`flex w-full items-center gap-3 rounded-[14px] border-2 px-4 py-4 text-left transition-all sm:px-5 sm:py-5 ${
              isSelected
                ? "border-[#3b82f6] bg-[#f0f6ff]"
                : "border-[#e8e8e8] bg-white"
            }`}
          >
            {/* Radio dot */}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                isSelected ? "border-[#3b82f6]" : "border-[#d0d0d0]"
              }`}
            >
              {isSelected && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]" />
              )}
            </div>

            {/* Plan name + per day */}
            <div className="min-w-0 flex-1">
              <p className="font-body text-[14px] font-semibold text-[var(--text-primary)] sm:text-[15px]">
                {plans[plan].name}
              </p>
              <p className="font-body text-[12px] text-[var(--text-muted)] sm:text-[13px]">
                ${plans[plan].perDay} / day
              </p>
            </div>

            {/* Prices */}
            <div className="shrink-0 text-right">
              <p className="font-body text-[12px] text-[var(--text-muted)] line-through sm:text-[13px]">
                ${plans[plan].originalPrice}
              </p>
              <p className="font-body text-[20px] font-bold leading-tight text-[var(--text-primary)] sm:text-[22px]">
                ${plans[plan].discountPrice}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );

  const TermsCheckbox = () => (
    <div
      className="mt-4 flex cursor-pointer items-center gap-2.5"
      onClick={() => setAgreedToTerms(!agreedToTerms)}
    >
      <span
        className="flex shrink-0 items-center justify-center rounded border-2 transition-all"
        style={{
          width: 18,
          height: 18,
          borderColor: agreedToTerms ? accentColor : "#d0d0d0",
          backgroundColor: agreedToTerms ? accentColor : "white",
        }}
      >
        {agreedToTerms && (
          <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <p className="font-body text-xs leading-[1.35] text-[#666] sm:text-sm">
        {t.agreeTextStart}{" "}
        <a href="#" className="text-[#2f6ebf] underline">
          {t.agreeTerms}
        </a>{" "}
        {t.agreeMiddle}{" "}
        <a href="#" className="text-[#2f6ebf] underline">
          {t.agreePrivacy}
        </a>
        {t.agreeEnd}
      </p>
    </div>
  );

  const CTAButton = () => (
    <>
      <button
        disabled={!agreedToTerms}
        className="mt-4 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-bold text-white transition-all hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4 sm:text-lg"
      >
        {t.getMyPlan}
      </button>
      <p className="mt-3 text-center font-body text-[10px] leading-relaxed text-[#999] sm:text-xs">
        By clicking &quot;{t.getMyPlan},&quot; you agree to pay $
        {selectedPlanData.discountPrice} for your{" "}
        {selectedPlanData.name.toLowerCase()}. If you do not cancel before the
        end of the first period, your subscription will renew at $
        {selectedPlanData.originalPrice} until canceled. You can cancel anytime
        by contacting support at hello@mediet.app.
      </p>
      <div className="relative mt-4 h-[80px] w-full sm:h-[100px]">
        <Image
          src="/docs/offer-page/17.svg"
          alt="Secure payment methods"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 600px"
        />
      </div>
    </>
  );

  return (
    <section className="w-full max-w-[600px]">
      {/* Now vs Goal Card */}
      <div className="animate-scale-in overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white shadow-sm sm:rounded-[16px]">
        <div className="grid grid-cols-2">
          <div className="border-b border-r border-[#e8e8e8] py-2.5 text-center sm:py-3">
            <span className="font-body text-[18px] font-bold text-[#e53935] sm:text-[20px]">
              {t.now}
            </span>
          </div>
          <div className="border-b border-[#e8e8e8] py-2.5 text-center sm:py-3">
            <span className="font-body text-[18px] font-bold text-[#1a6b6e] sm:text-[20px]">
              {t.goal}
            </span>
          </div>
        </div>

        <div className="relative grid grid-cols-2">
          {/* Arrow overlay */}
          <div className="pointer-events-none absolute left-1/2 top-[80px] z-10 -translate-x-1/2 -translate-y-1/2 sm:top-[110px] md:top-[140px]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a6b6e] shadow-md sm:h-11 sm:w-11">
              <svg className="h-4 w-4 text-white sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
          <div className="relative border-r border-[#e8e8e8]">
            <div className="relative h-[160px] bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <Image
                src={nowImageSrc}
                alt="Current body"
                fill
                className="object-contain object-bottom grayscale"
                sizes="(max-width: 640px) 50vw, 300px"
                unoptimized
              />
            </div>
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.bodyFat}
                </p>
                <p className="text-center font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.bodyFat)}%
                </p>
              </div>
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.bmi}
                </p>
                <p className="text-center font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.bmi)}
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.fitnessLevel}
                </p>
                <div className="mt-1 flex justify-center gap-1 sm:mt-1.5 sm:gap-1.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-[10px] w-[42px] rounded-full sm:h-[12px] sm:w-[52px] ${
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
            <div className="relative h-[160px] bg-[#f9f9f9] sm:h-[220px] md:h-[280px]">
              <Image
                src={goalImageSrc}
                alt="Goal body"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 50vw, 300px"
                unoptimized
              />
            </div>
            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.bodyFat}
                </p>
                <p className="text-center font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(targetBodyFat)}%
                </p>
              </div>
              <div className="mb-2.5 border-b border-[#f0f0f0] pb-2.5 sm:mb-3 sm:pb-3">
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.bmi}
                </p>
                <p className="text-center font-body text-[18px] font-extrabold text-[var(--text-primary)] sm:text-[22px]">
                  {fmt(analysis.targetBmi)}
                </p>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-[var(--text-muted)] sm:text-[13px]">
                  {t.fitnessLevel}
                </p>
                <div className="mt-1 flex justify-center gap-1 sm:mt-1.5 sm:gap-1.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-[10px] w-[42px] rounded-full sm:h-[12px] sm:w-[52px] ${
                        level <= goalFitness
                          ? "bg-[#1a6b6e]"
                          : "bg-[#b2d8da] opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Ready Section */}
      <div className="mt-8 text-center sm:mt-10">
        <h2 className="font-body text-[22px] font-extrabold leading-snug text-[var(--text-primary)] sm:text-[26px] md:text-[32px]">
          {t.planReadyTitle}
        </h2>

        <div className="mx-auto mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
          <div className="flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="text-base sm:text-lg">🎯</span>
            <div className="text-left">
              <p className="font-body text-[10px] text-[var(--text-muted)] sm:text-[11px]">
                {t.yourGoal}
              </p>
              <p className="font-body text-[12px] font-bold text-[var(--text-primary)] sm:text-[13px]">
                {answers.q2.length > 0 ? answers.q2[0] : t.defaultGoal}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="text-base sm:text-lg">⚖️</span>
            <div className="text-left">
              <p className="font-body text-[10px] text-[var(--text-muted)] sm:text-[11px]">
                {t.targetWeight}
              </p>
              <p className="font-body text-[12px] font-bold text-[var(--text-primary)] sm:text-[13px]">
                {fmt(analysis.targetKg, 0)} kg
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-[#eef4fb] px-4 py-2 sm:mt-5">
          <span className="text-[#2f6ebf]">✓</span>
          <p className="font-body text-[12px] font-medium text-[#2f6ebf] sm:text-[13px]">
            {t.planIsReady}
          </p>
        </div>
      </div>

      {/* Choose Your Plan */}
      <div id="get-plan" className="mt-8 sm:mt-10">
        <PricingPlans />
        <TermsCheckbox />
        <CTAButton />
      </div>

      {/* Safe Checkout */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-sm">🔒</span>
        <p className="font-body text-xs font-medium text-[#666]">
          {t.safeCheckout}
        </p>
      </div>

      {/* Highlights of your plan */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-center font-display text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">
          {t.highlights}
        </h3>
        <div className="mt-6 space-y-4">
          {(t.features as Array<{ title: string; description: string }>).map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2f6ebf] text-xs text-white">
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
          ))}
        </div>
        <button
          disabled={!agreedToTerms}
          className="mt-6 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-bold text-white transition-all hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4 sm:text-lg"
        >
          {t.getMyPlan}
        </button>
      </div>

      {/* Get visible results */}
      <div className="mt-10 sm:mt-12">
        <h3 className="text-center font-display text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">
          {t.visibleResults}
        </h3>
        <div className="mt-6">
          <PricingPlans />
          <TermsCheckbox />
          <CTAButton />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10 rounded-xl bg-[#f9f9f9] p-5 sm:mt-12 sm:p-6">
        <h3 className="text-center font-display text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">
          {t.faqTitle}
        </h3>
        <div className="mt-6 space-y-3">
          {(t.faq as Array<{ question: string; answer: string }>).map((faq, i) => (
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

      {/* Risk-Free Guarantee */}
      <div className="mt-10 flex flex-col items-center text-center sm:mt-12">
        <div className="relative h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]">
          <Image
            src="/docs/offer-page/2.svg"
            alt="Risk-Free Guarantee"
            fill
            className="object-contain"
            sizes="150px"
          />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">
          {t.riskFreeTitle}
        </h3>
        <p className="mt-2 max-w-sm font-body text-sm text-[#666]">
          {t.riskFreeBody}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-[#e8e8e8] pt-6 text-center">
        <p className="font-body text-xs text-[#999]">{t.resultsMayVary}</p>
        <p className="mt-2 font-body text-xs text-[#ccc]">
          {t.copyright}
        </p>
      </div>
    </section>
  );
}
