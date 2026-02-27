"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  VEGETABLE_OPTIONS,
  GRAIN_OPTIONS,
  GOAL_EMOJIS,
  INFO_BLOCKS,
  getGenderGoals,
  getQ3Bodies,
  getQ4Bodies,
  getQ12Reasons,
  getBmiMessage,
  getWeightLossMessage,
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
import { InfoInterstitial } from "@/components/quiz/info-interstitial";

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

  useEffect(() => {
    if (step === 0) {
      router.replace("/");
    }
  }, [step, router]);

  const genderGoals = getGenderGoals(answers.gender);
  const q3Bodies = getQ3Bodies(answers.gender);
  const q4Bodies = getQ4Bodies(answers.gender);
  const q12Reasons = getQ12Reasons();

  const handleGenerateComplete = useCallback(() => {
    setStep(27);
  }, [setStep]);

  const getBmiImage = () => {
    if (answers.gender === "male") {
      if (analysis.bmiLabel === "Healthy") return "/quiz/12.png";
      if (analysis.bmiLabel === "Overweight") return "/quiz/11.png";
      return "/quiz/10.png";
    } else {
      if (analysis.bmiLabel === "Healthy") return "/quiz/7.png";
      if (analysis.bmiLabel === "Overweight") return "/quiz/woman-overweight.png";
      return "/quiz/5.png";
    }
  };

  if (step === 0) return null;

  return (
    <div key={animKey}>
      {/* ── Step 1: Q1 - Mediterranean familiarity ── */}
      {step === 1 && (
        <SingleChoiceStep
          title="How familiar are you with Mediterranean diet & Blue Zones phenomena?"
          options={FAMILIARITY_OPTIONS}
          emojis={FAMILIARITY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q1", v);
            setStep(2);
          }}
        />
      )}

      {/* ── Step 2: INFO - Blue Zones ── */}
      {step === 2 && (
        <InfoInterstitial
          title={INFO_BLOCKS.blueZones.title}
          body={INFO_BLOCKS.blueZones.body}
          onContinue={() => setStep(3)}
        />
      )}

      {/* ── Step 3: Q2 - Goals ── */}
      {step === 3 && (
        <QuizSection>
          <QuizTitle>What do you want to achieve?</QuizTitle>
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
          <CTAButton disabled={!answers.q2.length} onClick={() => setStep(4)}>
            Continue
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 4: Q3 - Current body type ── */}
      {step === 4 && (
        <QuizSection>
          <QuizTitle>How would you describe your body now?</QuizTitle>
          <div className="relative mt-4 mb-4 aspect-[4/1] w-full overflow-hidden rounded-xl sm:mt-6">
            <Image
              src={answers.gender === "male" 
                ? "/quiz/Screenshot_2026-02-19_at_22.39.19.png"
                : "/quiz/Screenshot_2026-02-19_at_22.37.19.png"}
              alt="Body types"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 520px"
            />
          </div>
          <div className="stagger-children mt-4 space-y-3">
            {q3Bodies.map((item) => (
              <OptionCard
                key={item}
                onClick={() => {
                  setAnswer("q3", item);
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

      {/* ── Step 5: Q4 - Target body ── */}
      {step === 5 && (
        <QuizSection>
          <QuizTitle>What body do you want?</QuizTitle>
          <div className="relative mt-4 mb-4 aspect-[4/1] w-full overflow-hidden rounded-xl sm:mt-6">
            <Image
              src={answers.gender === "male" 
                ? "/quiz/Screenshot_2026-02-19_at_22.38.58.png"
                : "/quiz/Screenshot_2026-02-19_at_22.37.40.png"}
              alt="Target body types"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 520px"
            />
          </div>
          <div className="stagger-children mt-4 space-y-3">
            {q4Bodies.map((item) => (
              <OptionCard
                key={item}
                onClick={() => {
                  setAnswer("q4", item);
                  setStep(6);
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

      {/* ── Step 6: Q5 - Areas to improve ── */}
      {step === 6 && (
        <QuizSection>
          <QuizTitle>Which areas would you like to improve?</QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            If you are happy with your body, press Continue
          </p>
          <div className="relative mt-4 mb-4 aspect-[2/1] w-full overflow-hidden rounded-xl sm:mt-6">
            <Image
              src={answers.gender === "male" ? "/quiz/2.png" : "/quiz/1.png"}
              alt="Body areas"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 520px"
            />
          </div>
          <div className="stagger-children mx-auto mt-4 grid max-w-[520px] grid-cols-2 gap-2 sm:gap-3">
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
          <CTAButton onClick={() => setStep(7)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 7: Q6 - Day-to-day ── */}
      {step === 7 && (
        <SingleChoiceStep
          title="What does your day usually look like?"
          options={DAY_TO_DAY_OPTIONS}
          emojis={DAY_TO_DAY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q6", v);
            setStep(8);
          }}
        />
      )}

      {/* ── Step 8: Q7 - Energy levels ── */}
      {step === 8 && (
        <SingleChoiceStep
          title="How is your energy during the day?"
          options={ENERGY_OPTIONS}
          emojis={ENERGY_EMOJIS}
          onSelect={(v) => {
            setAnswer("q7", v);
            setStep(9);
          }}
        />
      )}

      {/* ── Step 9: Q8 - Exercise frequency ── */}
      {step === 9 && (
        <SingleChoiceStep
          title="How often do you exercise?"
          options={EXERCISE_OPTIONS}
          emojis={EXERCISE_EMOJIS}
          onSelect={(v) => {
            setAnswer("q8", v);
            setStep(10);
          }}
        />
      )}

      {/* ── Step 10: Q9 - Weight changes ── */}
      {step === 10 && (
        <SingleChoiceStep
          title="How does your weight usually change?"
          options={WEIGHT_CHANGE_OPTIONS}
          emojis={WEIGHT_CHANGE_EMOJIS}
          onSelect={(v) => {
            setAnswer("q9", v);
            setStep(11);
          }}
        />
      )}

      {/* ── Step 11: INFO - Metabolism ── */}
      {step === 11 && (
        <InfoInterstitial
          title={INFO_BLOCKS.metabolism.title}
          body={INFO_BLOCKS.metabolism.body}
          onContinue={() => setStep(12)}
        />
      )}

      {/* ── Step 12: Q10 - Best weight timing ── */}
      {step === 12 && (
        <SingleChoiceStep
          title="When were you last at your best weight?"
          options={IDEAL_WEIGHT_OPTIONS}
          emojis={IDEAL_WEIGHT_EMOJIS}
          onSelect={(v) => {
            setAnswer("q10", v);
            setStep(13);
          }}
        />
      )}

      {/* ── Step 13: Q11 - Diets tried ── */}
      {step === 13 && (
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
            onClick={() => setStep(14)}
          >
            Continue
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 14: INFO - Diets wrong ── */}
      {step === 14 && (
        <InfoInterstitial
          title={INFO_BLOCKS.dietsWrong.title}
          body={INFO_BLOCKS.dietsWrong.body}
          image={INFO_BLOCKS.dietsWrong.image}
          onContinue={() => setStep(15)}
        />
      )}

      {/* ── Step 15: Q12 - Reason to get in shape ── */}
      {step === 15 && (
        <SingleChoiceStep
          title="What would getting in shape change most for you?"
          options={q12Reasons}
          onSelect={(v) => {
            setAnswer("q12", v);
            setStep(16);
          }}
        />
      )}

      {/* ── Step 16: Q13 - Height ── */}
      {step === 16 && (
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
          helper={INFO_BLOCKS.bmiExplanation.title}
          helperBody={INFO_BLOCKS.bmiExplanation.body}
          ctaDisabled={
            answers.q13 < (answers.q13Unit === "cm" ? 120 : 47)
          }
          onContinue={() => setStep(17)}
        />
      )}

      {/* ── Step 17: Q14 - Current weight ── */}
      {step === 17 && (
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
          helper={`✔️ ${getBmiMessage(analysis.bmiLabel).title}`}
          helperBody={getBmiMessage(analysis.bmiLabel).body}
          ctaDisabled={
            answers.q14 < (answers.q14Unit === "kg" ? 40 : 88)
          }
          onContinue={() => setStep(18)}
        />
      )}

      {/* ── Step 18: INFO - Advice wrong ── */}
      {step === 18 && (
        <InfoInterstitial
          title={INFO_BLOCKS.adviceWrong.title}
          body={INFO_BLOCKS.adviceWrong.body}
          onContinue={() => setStep(19)}
        />
      )}

      {/* ── Step 19: Q15 - Target weight ── */}
      {step === 19 && (
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
          helper={`☝️ ${getWeightLossMessage(analysis.targetLoss).title}`}
          helperBody={getWeightLossMessage(analysis.targetLoss).body}
          ctaDisabled={
            answers.q15 < (answers.q15Unit === "kg" ? 40 : 88)
          }
          onContinue={() => setStep(20)}
        />
      )}

      {/* ── Step 20: Q16 - Age ── */}
      {step === 20 && (
        <NumericStep
          title="What is your age?"
          value={answers.q16}
          onChange={(v) => setAnswer("q16", clamp(v, 18, 85))}
          helper={INFO_BLOCKS.ageMetabolism.title}
          helperBody={INFO_BLOCKS.ageMetabolism.body}
          ctaDisabled={answers.q16 < 18}
          onContinue={() => setStep(21)}
        />
      )}

      {/* ═══════════ STEP 21 — PERSONAL SUMMARY ═══════════ */}
      {step === 21 && (
        <QuizSection>
          <QuizTitle>Here&apos;s What We Found</QuizTitle>

          {/* BMI Card */}
          <div className="animate-scale-in mt-6 overflow-hidden rounded-[14px] bg-[#f5f5f5] p-4 sm:mt-8 sm:rounded-[16px] sm:p-6">
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              Your Body Mass Index (BMI)
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
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          {/* BMI message */}
          <div
            className={`animate-fade-in-up mt-3 rounded-[10px] border-l-4 p-3 sm:mt-4 sm:rounded-[12px] sm:p-4 ${
              analysis.bmiLabel === "Healthy"
                ? "border-[#3bb44a] bg-[#f0fdf4]"
                : analysis.bmiLabel === "Overweight"
                ? "border-[#f59e0b] bg-[#fffbeb]"
                : "border-[#ef4444] bg-[#fef2f2]"
            }`}
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            <p className="font-body text-sm font-semibold text-[var(--text-primary)]">
              {getBmiMessage(analysis.bmiLabel).title}
            </p>
            <p className="mt-1 font-body text-xs text-[var(--text-secondary)]">
              {getBmiMessage(analysis.bmiLabel).body}
            </p>
          </div>

          {/* Stats card with image */}
          <div
            className="animate-fade-in-up mt-3 overflow-hidden rounded-[14px] bg-[#f5f5f5] p-4 sm:mt-4 sm:rounded-[16px] sm:p-6"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    BMI
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    📊 {fmt(analysis.bmi)}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Energy
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    ⚡ {answers.q7 || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Metabolism
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🔥 Adaptable — not broken
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Goals
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🎯 {answers.q2[0] || "Not set"}
                  </p>
                </div>
              </div>
              <div className="relative hidden h-48 w-32 overflow-hidden rounded-[12px] bg-gradient-to-b from-[#eeeeee] to-[#e0e0e0] sm:block">
                <Image
                  src={getBmiImage()}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              </div>
            </div>
          </div>

          <CTAButton onClick={() => setStep(22)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 22: Q17 - Meals ── */}
      {step === 22 && (
        <SingleChoiceStep
          title="How many meals would you like to eat each day?"
          subtitle="You can change this later in your settings."
          options={MEAL_OPTIONS}
          descriptions={MEAL_DESCRIPTIONS}
          onSelect={(v) => {
            setAnswer("q17", v);
            setStep(23);
          }}
        />
      )}

      {/* ── Step 23: Q18 - Exclude proteins ── */}
      {step === 23 && (
        <QuizSection>
          <QuizTitle>
            Would you like to exclude any of these foods?
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            Proteins &amp; dairy:
          </p>
          <div className="stagger-children mt-6 space-y-3">
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
          <CTAButton onClick={() => setStep(24)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 24: Q19 - Exclude vegetables (NEW) ── */}
      {step === 24 && (
        <QuizSection>
          <QuizTitle>
            Would you like to exclude any of these foods?
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            Fruits &amp; vegetables:
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {VEGETABLE_OPTIONS.map((item) => (
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
          <CTAButton onClick={() => setStep(25)}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 25: Q20 - Exclude grains ── */}
      {step === 25 && (
        <QuizSection>
          <QuizTitle>
            Would you like to exclude any of these foods?
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            Grains &amp; nuts:
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {GRAIN_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q20.includes(item)}
                onClick={() => toggleMulti("q20", item)}
              >
                <span className="flex items-center gap-3">
                  <Checkbox checked={answers.q20.includes(item)} />
                  <span className="font-body text-base font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton onClick={() => {
            setStep(26);
            setIsGenerating(true);
            setProgress(38);
          }}>Continue</CTAButton>
        </QuizSection>
      )}

      {/* ═══════════ GENERATING ═══════════ */}
      {isGenerating && (
        <LoadingScreen onComplete={handleGenerateComplete} />
      )}

      {/* ═══════════ STEP 27 — RESULT ═══════════ */}
      {step === 27 && (
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
          <CTAButton onClick={() => setStep(28)}>
            Continue
          </CTAButton>
        </QuizSection>
      )}

      {/* ═══════════ STEP 28 — PRE-EMAIL INFO BLOCK ═══════════ */}
      {step === 28 && (
        <InfoInterstitial
          title={INFO_BLOCKS.preEmail.title}
          body={INFO_BLOCKS.preEmail.body}
          image={INFO_BLOCKS.preEmail.image}
          onContinue={() => router.push("/email")}
        />
      )}
    </div>
  );
}
