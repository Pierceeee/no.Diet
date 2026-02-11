"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { clamp } from "@/lib/utils";
import { fmt } from "@/lib/utils";
import type { Unit, WeightUnit } from "@/lib/quiz-data";
import {
  FAMILIARITY_OPTIONS,
  FAMILIARITY_EMOJIS,
  BODY_AREAS,
  DAY_TO_DAY_OPTIONS,
  DAY_TO_DAY_EMOJIS,
  ENERGY_OPTIONS,
  ENERGY_EMOJIS,
  EXERCISE_OPTIONS,
  EXERCISE_EMOJIS,
  WEIGHT_CHANGE_OPTIONS,
  WEIGHT_CHANGE_EMOJIS,
  IDEAL_WEIGHT_OPTIONS,
  IDEAL_WEIGHT_EMOJIS,
  DIET_OPTIONS,
  MEAL_OPTIONS,
  MEAL_DESCRIPTIONS,
  PROTEIN_OPTIONS,
  GRAIN_OPTIONS,
  GOAL_EMOJIS,
  getGenderGoals,
  getQ3Bodies,
  getQ4Bodies,
  getQ12Reasons,
} from "@/lib/quiz-data";

import { QuizSection, QuizTitle } from "@/components/ui/quiz-section";
import { OptionCard } from "@/components/quiz/body-type-option";
import {
  CTAButton,
  Chevron,
  Checkbox,
} from "@/components/quiz/quiz-navigation";
import { SingleChoiceStep } from "@/components/quiz/question-card";
import { NumericStep } from "@/components/quiz/age-card";
import { LoadingScreen } from "@/components/quiz/loading-screen";

export default function QuizPage() {
  const router = useRouter();
  const {
    answers,
    step,
    setStep,
    setAnswer,
    toggleMulti,
    isGenerating,
    setIsGenerating,
    setProgress,
    analysis,
  } = useQuiz();

  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [step]);

  /* Redirect to landing if no gender selected */
  useEffect(() => {
    if (step === 0) {
      router.replace("/");
    }
  }, [step, router]);

  const genderGoals = getGenderGoals(answers.gender);
  const q3Bodies = getQ3Bodies(answers.gender);
  const q4Bodies = getQ4Bodies(answers.gender);
  const q12Reasons = getQ12Reasons(answers.gender);

  const handleGenerateComplete = useCallback(() => {
    setStep(22);
  }, [setStep]);

  if (step === 0) return null;

  return (
    <div key={animKey}>
      {/* ── Step 1 ── */}
      {step === 1 && (
        <SingleChoiceStep
          title="How familiar are you with the Mediterranean diet?"
          options={FAMILIARITY_OPTIONS}
          emojis={FAMILIARITY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q1", v);
            setStep(2);
          }}
        />
      )}

      {/* ── Step 2 — Goals ── */}
      {step === 2 && (
        <QuizSection>
          <QuizTitle>What are your goals?</QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            Select all that apply:
          </p>
          <div className="stagger-children mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {genderGoals.map((item, i) => (
              <OptionCard
                key={item}
                selected={answers.q2.includes(item)}
                onClick={() => toggleMulti("q2", item)}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <Checkbox checked={answers.q2.includes(item)} />
                    <span className="font-body text-[15px] font-medium text-[var(--text-primary)] sm:text-base md:text-lg">
                      {item}
                    </span>
                  </span>
                  <span className="text-base sm:text-lg">{GOAL_EMOJIS[i]}</span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton disabled={!answers.q2.length} onClick={() => setStep(3)}>
            Continue
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 3 — Body type ── */}
      {step === 3 && (
        <QuizSection>
          <QuizTitle>Choose your current body type:</QuizTitle>
          <div className="stagger-children mt-8 space-y-3">
            {q3Bodies.map((item) => (
              <OptionCard
                key={item}
                onClick={() => {
                  setAnswer("q3", item);
                  setStep(4);
                }}
              >
                <span className="flex items-center justify-between">
                  <span className="font-body text-base font-medium text-[var(--text-primary)] sm:text-lg">
                    {item}
                  </span>
                  <Chevron />
                </span>
              </OptionCard>
            ))}
          </div>
        </QuizSection>
      )}

      {/* ── Step 4 — Target body ── */}
      {step === 4 && (
        <QuizSection>
          <QuizTitle>Choose the body you want:</QuizTitle>
          <div className="stagger-children mt-8 space-y-3">
            {q4Bodies.map((item) => (
              <OptionCard
                key={item}
                onClick={() => {
                  setAnswer("q4", item);
                  setStep(5);
                }}
              >
                <span className="flex items-center justify-between">
                  <span className="font-body text-base font-medium text-[var(--text-primary)] sm:text-lg">
                    {item}
                  </span>
                  <Chevron />
                </span>
              </OptionCard>
            ))}
          </div>
        </QuizSection>
      )}

      {/* ── Step 5 — Areas to improve ── */}
      {step === 5 && (
        <QuizSection>
          <QuizTitle>Any areas you&apos;d like to improve?</QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            If you&apos;re happy with your appearance, press Continue
          </p>
          <div className="stagger-children mx-auto mt-6 grid max-w-[520px] grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
            {BODY_AREAS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q5.includes(item)}
                onClick={() => toggleMulti("q5", item)}
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <Checkbox checked={answers.q5.includes(item)} />
                  <span className="font-body text-[13px] font-medium text-[var(--text-primary)] sm:text-base">
                    {item}
                  </span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton onClick={() => setStep(6)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 6 ── */}
      {step === 6 && (
        <SingleChoiceStep
          title="What does your day-to-day look like?"
          options={DAY_TO_DAY_OPTIONS}
          emojis={DAY_TO_DAY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q6", v);
            setStep(7);
          }}
        />
      )}

      {/* ── Step 7 ── */}
      {step === 7 && (
        <SingleChoiceStep
          title="What are your energy levels throughout the day?"
          options={ENERGY_OPTIONS}
          emojis={ENERGY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q7", v);
            setStep(8);
          }}
        />
      )}

      {/* ── Step 8 ── */}
      {step === 8 && (
        <SingleChoiceStep
          title="How often do you exercise?"
          options={EXERCISE_OPTIONS}
          emojis={EXERCISE_EMOJIS}
          onSelect={(v) => {
            setAnswer("q8", v);
            setStep(9);
          }}
        />
      )}

      {/* ── Step 9 ── */}
      {step === 9 && (
        <SingleChoiceStep
          title="How does your weight typically change?"
          options={WEIGHT_CHANGE_OPTIONS}
          emojis={WEIGHT_CHANGE_EMOJIS}
          onSelect={(v) => {
            setAnswer("q9", v);
            setStep(10);
          }}
        />
      )}

      {/* ── Step 10 ── */}
      {step === 10 && (
        <SingleChoiceStep
          title="When was the last time you were your ideal weight?"
          options={IDEAL_WEIGHT_OPTIONS}
          emojis={IDEAL_WEIGHT_EMOJIS}
          onSelect={(v) => {
            setAnswer("q10", v);
            setStep(11);
          }}
        />
      )}

      {/* ── Step 11 — Diets tried ── */}
      {step === 11 && (
        <QuizSection>
          <QuizTitle>
            Have you tried any of these diets in the last 3 years?
          </QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            Select all that apply:
          </p>
          <div className="stagger-children mt-8 space-y-3">
            {DIET_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q11.includes(item)}
                onClick={() => toggleMulti("q11", item)}
              >
                <span className="flex items-center gap-3">
                  <Checkbox checked={answers.q11.includes(item)} />
                  <span className="font-body text-base font-medium text-[var(--text-primary)] sm:text-lg">
                    {item}
                  </span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton
            disabled={!answers.q11.length}
            onClick={() => setStep(12)}
          >
            Continue
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 12 — Reason ── */}
      {step === 12 && (
        <SingleChoiceStep
          title="What&apos;s the main reason why you want to get in shape?"
          options={q12Reasons}
          onSelect={(v) => {
            setAnswer("q12", v);
            setStep(13);
          }}
        />
      )}

      {/* ── Step 13 — Height ── */}
      {step === 13 && (
        <NumericStep
          title="What is your height?"
          unitA="in"
          unitB="cm"
          selectedUnit={answers.q13Unit}
          onUnitChange={(v) => setAnswer("q13Unit", v as Unit)}
          value={answers.q13}
          onChange={(v) =>
            setAnswer(
              "q13",
              clamp(
                v,
                answers.q13Unit === "cm" ? 120 : 47,
                answers.q13Unit === "cm" ? 220 : 87,
              ),
            )
          }
          helper="☝️ Calculating your body mass index"
          helperBody="The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy."
          ctaDisabled={
            answers.q13 < (answers.q13Unit === "cm" ? 120 : 47)
          }
          onContinue={() => setStep(14)}
        />
      )}

      {/* ── Step 14 — Current weight ── */}
      {step === 14 && (
        <NumericStep
          title="What is your current weight?"
          unitA="lbs"
          unitB="kg"
          selectedUnit={answers.q14Unit}
          onUnitChange={(v) => setAnswer("q14Unit", v as WeightUnit)}
          value={answers.q14}
          onChange={(v) =>
            setAnswer(
              "q14",
              clamp(
                v,
                answers.q14Unit === "kg" ? 40 : 88,
                answers.q14Unit === "kg" ? 200 : 440,
              ),
            )
          }
          ctaDisabled={
            answers.q14 < (answers.q14Unit === "kg" ? 40 : 88)
          }
          onContinue={() => setStep(15)}
        />
      )}

      {/* ── Step 15 — Target weight ── */}
      {step === 15 && (
        <NumericStep
          title="What is your target weight?"
          unitA="lbs"
          unitB="kg"
          selectedUnit={answers.q15Unit}
          onUnitChange={(v) => setAnswer("q15Unit", v as WeightUnit)}
          value={answers.q15}
          onChange={(v) =>
            setAnswer(
              "q15",
              clamp(
                v,
                answers.q15Unit === "kg" ? 40 : 88,
                answers.q15Unit === "kg" ? 200 : 440,
              ),
            )
          }
          ctaDisabled={
            answers.q15 < (answers.q15Unit === "kg" ? 40 : 88)
          }
          onContinue={() => setStep(16)}
        />
      )}

      {/* ── Step 16 — Age ── */}
      {step === 16 && (
        <NumericStep
          title="What is your age?"
          value={answers.q16}
          onChange={(v) => setAnswer("q16", clamp(v, 18, 85))}
          helper="☝️ We ask your age to create your personal plan"
          helperBody="Older people tend to have more body fat and slower metabolism than younger people with the same BMI."
          ctaDisabled={answers.q16 < 18}
          onContinue={() => setStep(17)}
        />
      )}

      {/* ═══════════ STEP 17 — PERSONAL SUMMARY ═══════════ */}
      {step === 17 && (
        <QuizSection>
          <QuizTitle>Your personal summary</QuizTitle>

          {/* BMI Card */}
          <div className="animate-scale-in mt-6 overflow-hidden rounded-[14px] bg-[#f5f5f5] p-4 sm:mt-8 sm:rounded-[16px] sm:p-6">
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              Body Mass Index (BMI)
            </h3>
            <div className="relative mt-5 mb-2 sm:mt-6">
              <div
                className="absolute -top-7 flex -translate-x-1/2 items-center rounded-md bg-[var(--accent)] px-2 py-0.5 text-[11px] font-bold text-white sm:-top-8 sm:px-3 sm:py-1 sm:text-xs"
                style={{ left: `${analysis.bmiPosition}%` }}
              >
                You - {fmt(analysis.bmi)}
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
            <div className="mt-3 flex justify-between font-body text-xs text-[var(--text-muted)]">
              <span>Underweight</span>
              <span>Healthy</span>
              <span
                className={
                  analysis.bmiLabel === "Overweight"
                    ? "font-bold text-[var(--text-primary)]"
                    : ""
                }
              >
                Overweight
              </span>
              <span>Obese</span>
            </div>
          </div>

          {/* BMI message */}
          <div
            className="animate-fade-in-up mt-3 rounded-[10px] border-l-4 border-[var(--accent)] bg-[#f5f5f5] p-3 sm:mt-4 sm:rounded-[12px] sm:p-4"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            <p className="font-body text-sm text-[var(--text-primary)]">
              <span className="font-semibold">
                Your BMI is {fmt(analysis.bmi)}
              </span>
              , which is considered{" "}
              <span className="font-semibold lowercase">
                {analysis.bmiLabel}
              </span>
              .
            </p>
            <p className="mt-1 font-body text-xs text-[var(--text-secondary)]">
              {analysis.bmiLabel === "Healthy"
                ? "Great job! We'll help you maintain this with the right nutrition plan."
                : "We'll use your BMI to create a weight loss program just for you."}
            </p>
          </div>

          {/* Stats card */}
          <div
            className="animate-fade-in-up mt-3 overflow-hidden rounded-[14px] bg-[#f5f5f5] p-4 sm:mt-4 sm:rounded-[16px] sm:p-6"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Body fat
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🔍 {fmt(analysis.bodyFat)}%
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Activity level
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    📊 Low
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Energy level
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    😮‍💨 Low
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Goal
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🔥 Lose weight
                  </p>
                </div>
              </div>
              <div className="hidden h-48 w-32 items-end justify-center rounded-[12px] bg-gradient-to-b from-[#eeeeee] to-[#e0e0e0] sm:flex">
                <span className="mb-4 text-5xl opacity-40">
                  {answers.gender === "male" ? "🧍‍♂️" : "🧍‍♀️"}
                </span>
              </div>
            </div>
          </div>

          <CTAButton onClick={() => setStep(18)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 18 — Meals ── */}
      {step === 18 && (
        <SingleChoiceStep
          title="How many meals a day would you like to have?"
          subtitle="You can always change it in settings later"
          options={MEAL_OPTIONS}
          descriptions={MEAL_DESCRIPTIONS}
          onSelect={(v) => {
            setAnswer("q17", v);
            setStep(19);
          }}
        />
      )}

      {/* ── Step 19 — Exclude proteins ── */}
      {step === 19 && (
        <QuizSection>
          <QuizTitle>
            Would you like to exclude any of these products?
          </QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            Proteins and dairy:
          </p>
          <div className="stagger-children mt-8 space-y-3">
            {PROTEIN_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q18.includes(item)}
                onClick={() => toggleMulti("q18", item)}
              >
                <span className="flex items-center gap-3">
                  <Checkbox checked={answers.q18.includes(item)} />
                  <span className="font-body text-base font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton onClick={() => setStep(20)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 20 — Exclude grains ── */}
      {step === 20 && (
        <QuizSection>
          <QuizTitle>
            Would you like to exclude any of these products?
          </QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            Nuts and grains:
          </p>
          <div className="stagger-children mt-8 space-y-3">
            {GRAIN_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q19.includes(item)}
                onClick={() => toggleMulti("q19", item)}
              >
                <span className="flex items-center gap-3">
                  <Checkbox checked={answers.q19.includes(item)} />
                  <span className="font-body text-base font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton onClick={() => {
            setStep(21);
            setIsGenerating(true);
            setProgress(38);
          }}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ═══════════ GENERATING ═══════════ */}
      {isGenerating && (
        <LoadingScreen onComplete={handleGenerateComplete} />
      )}

      {/* ═══════════ STEP 22 — RESULT ═══════════ */}
      {step === 22 && (
        <QuizSection>
          <div className="animate-scale-in overflow-hidden rounded-[14px] bg-[#f5f5f5] p-5 sm:rounded-[16px] sm:p-8">
            <p className="font-body text-sm font-medium text-gray-500 sm:text-base">
              Based on your food preferences, we&apos;ve created
            </p>
            <div className="mt-3 border-t border-[#e0e0e0] pt-3 sm:pt-4">
              <p className="font-display text-4xl text-[#3bb44a] sm:text-5xl md:text-6xl">
                500+
              </p>
              <p className="mt-2 font-body text-base text-black sm:text-lg">
                <span className="font-bold">Meal combinations</span>{" "}
                <span className="text-gray-600">
                  that are the perfect fit for you and will help you reach a
                  healthy weight in the most enjoyable way!
                </span>
              </p>
            </div>
          </div>
          <CTAButton onClick={() => router.push("/email")}>
            Continue
          </CTAButton>
        </QuizSection>
      )}
    </div>
  );
}
