"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useQuiz } from "@/lib/quiz-context";
import { fmt } from "@/lib/utils";
import type { Unit, WeightUnit } from "@/lib/quiz-data";
import {
  FAMILIARITY_OPTIONS,
  FAMILIARITY_EMOJIS,
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
  PROTEIN_EMOJIS,
  VEGETABLE_OPTIONS,
  VEGETABLE_EMOJIS,
  GRAIN_OPTIONS,
  GRAIN_EMOJIS,
  GOAL_EMOJIS,
  INFO_BLOCKS,
  getGenderGoals,
  getQ3Bodies,
  getQ4Bodies,
  getQ12Reasons,
  getBmiMessage,
  getWeightLossMessage,
  getActivityLevel,
  getEnergyLevel,
} from "@/lib/quiz-data";

import { QuizSection, QuizTitle } from "@/components/ui/quiz-section";
import { OptionCard } from "@/components/quiz/body-type-option";
import { BodyHighlight } from "@/components/quiz/body-highlight";
import {
  CTAButton,
  Checkbox,
} from "@/components/quiz/quiz-navigation";
import { SingleChoiceStep } from "@/components/quiz/question-card";
import { NumericStep } from "@/components/quiz/age-card";
import { LoadingScreen } from "@/components/quiz/loading-screen";
import { InfoInterstitial } from "@/components/quiz/info-interstitial";

export default function QuizPage() {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const {
    answers,
    step,
    setStep,
    setAnswer,
    toggleMulti,
    isGenerating,
    setIsGenerating,
    analysis,
    hydrated,
  } = useQuiz();

  useEffect(() => {
    if (hydrated && step === 0) {
      router.replace("/");
    }
  }, [step, router, hydrated]);

  // Push browser history on step change so back button goes to previous step
  useEffect(() => {
    if (!hydrated || step === 0 || step === 26) return;
    const currentState = window.history.state;
    if (currentState?.quizStep !== step) {
      window.history.pushState({ quizStep: step }, "");
    }
  }, [step, hydrated]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      let target = e.state?.quizStep;
      if (typeof target === "number" && target >= 1) {
        // Skip the generating step (26) — go to 25 instead
        if (target === 26) target = 25;
        setStep(target);
      } else if (step > 1) {
        const back = step === 27 || step === 26 ? 25 : Math.max(1, step - 1);
        setStep(back);
        window.history.pushState({ quizStep: back }, "");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step, setStep]);

  const genderGoals = getGenderGoals(answers.gender);
  const q3Bodies = getQ3Bodies(answers.gender);
  const q4Bodies = getQ4Bodies(answers.gender);
  const q12Reasons = getQ12Reasons();

  const handleGenerateComplete = useCallback(() => {
    setStep(27);
  }, [setStep]);

  const getBmiImage = () => {
    if (answers.gender === "male") {
      if (analysis.bmiLabel === "Healthy") return "/quiz/47.svg";
      if (analysis.bmiLabel === "Overweight") return "/quiz/48.svg";
      return "/quiz/49.svg";
    } else {
      if (analysis.bmiLabel === "Healthy") return "/quiz/50.svg";
      if (analysis.bmiLabel === "Overweight") return "/quiz/51.svg";
      return "/quiz/52.svg";
    }
  };

  const bmiTone =
    analysis.bmiLabel === "Healthy"
      ? {
          accent: "#3aab4f",
          bg: "#edf7ee",
        }
      : analysis.bmiLabel === "Overweight"
      ? {
          accent: "#e8a838",
          bg: "#fff7e8",
        }
      : {
          accent: "#d94040",
          bg: "#fdecec",
        };

  if (!hydrated || step === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.995 }
        }
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
        exit={prefersReducedMotion ? {} : { opacity: 0, y: -4, scale: 0.998 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
      >
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
          image={INFO_BLOCKS.blueZones.image}
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
                  <span className="text-2xl sm:text-3xl">{GOAL_EMOJIS[i]}</span>
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
          <div className="stagger-children mt-4 space-y-3">
            {q3Bodies.map((item) => {
              const maleBodyImages: Record<string, string> = {
                "Slim": "/docs/transparent/11.svg",
                "Average": "/docs/transparent/12.svg",
                "Some belly fat": "/docs/transparent/13.svg",
                "Overweight": "/docs/transparent/14.svg",
              };
              const femaleBodyImages: Record<string, string> = {
                "Slim": "/docs/transparent/3.svg",
                "Average": "/docs/transparent/4.svg",
                "Some belly fat": "/docs/transparent/5.svg",
                "Overweight": "/docs/transparent/6.svg",
              };
              const bodyImages = answers.gender === "male" ? maleBodyImages : femaleBodyImages;
              
              return (
                <motion.button
                  key={item}
                  onClick={() => {
                    setAnswer("q3", item);
                    setStep(5);
                  }}
                  className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-[#f8f8f8] py-4 pl-5 pr-2 transition-all duration-300 ease-out hover:border-[var(--accent)]/50 hover:shadow-md sm:py-5 sm:pl-6"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.005,
                          transition: {
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <span className="font-body text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                    {item}
                  </span>
                  <div className="relative h-20 w-24 flex-shrink-0 sm:h-24 sm:w-28">
                    <Image
                      src={bodyImages[item] || bodyImages["Average"]}
                      alt={item}
                      fill
                      className="object-contain object-center"
                      sizes="112px"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </QuizSection>
      )}

      {/* ── Step 5: Q4 - Target body ── */}
      {step === 5 && (
        <QuizSection>
          <QuizTitle>What body do you want?</QuizTitle>
          <div className="stagger-children mt-4 space-y-3">
            {q4Bodies.map((item) => {
              const maleTargetImages: Record<string, string> = {
                "A little slimmer": "/docs/transparent/15.svg",
                "Lean and fit": "/docs/transparent/16.svg",
                "Athletic": "/docs/transparent/17.svg",
                "Strong and defined": "/docs/transparent/18.svg",
              };
              const femaleTargetImages: Record<string, string> = {
                "Feel like myself again": "/docs/transparent/7.svg",
                "Lose stubborn belly fat": "/docs/transparent/8.svg",
                "Feel lighter and more confident": "/docs/transparent/9.svg",
                "Look toned and youthful": "/docs/transparent/10.svg",
              };
              const targetImages = answers.gender === "male" ? maleTargetImages : femaleTargetImages;
              
              return (
                <OptionCard
                  key={item}
                  onClick={() => {
                    setAnswer("q4", item);
                    setStep(6);
                  }}
                >
                  <div className="-my-0.5 flex items-center justify-between sm:-my-1">
                    <span className="font-body text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                      {item}
                    </span>
                    <div className="relative h-20 w-24 flex-shrink-0 sm:h-24 sm:w-28">
                      <Image
                        src={targetImages[item] || targetImages[Object.keys(targetImages)[0]]}
                        alt={item}
                        fill
                        className="object-contain object-center"
                        sizes="112px"
                      />
                    </div>
                  </div>
                </OptionCard>
              );
            })}
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
          <div className="mt-4 mb-2 sm:mt-6">
            <BodyHighlight
              gender={answers.gender}
              selectedAreas={answers.q5}
              onToggle={(area) => toggleMulti("q5", area)}
            />
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
          image={INFO_BLOCKS.metabolism.image}
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
          onChange={(v) => setAnswer("q13", v)}
          helper={INFO_BLOCKS.bmiExplanation.title}
          helperBody={INFO_BLOCKS.bmiExplanation.body}
          styleVariant="reference"
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
          onChange={(v) => setAnswer("q14", v)}
          helper={`✔️ ${getBmiMessage(analysis.bmiLabel).title}`}
          helperBody={getBmiMessage(analysis.bmiLabel).body}
          helperVariant={
            analysis.bmiLabel === "Healthy"
              ? "success"
              : analysis.bmiLabel === "Overweight"
              ? "warning"
              : "danger"
          }
          styleVariant="reference"
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
          image={INFO_BLOCKS.adviceWrong.image}
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
          onChange={(v) => setAnswer("q15", v)}
          helper={`☝️ ${getWeightLossMessage(analysis.targetLoss).title}`}
          helperBody={getWeightLossMessage(analysis.targetLoss).body}
          helperVariant="success"
          styleVariant="reference"
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
          onChange={(v) => setAnswer("q16", v)}
          helper={`☝️ ${INFO_BLOCKS.ageMetabolism.title}`}
          helperBody={INFO_BLOCKS.ageMetabolism.body}
          styleVariant="reference"
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
                className="absolute -top-7 flex -translate-x-1/2 items-center rounded-md px-1 py-0.5 text-[9px] font-bold text-white sm:-top-8 sm:px-3 sm:py-1 sm:text-xs"
                style={{
                  left: `clamp(15%, ${analysis.bmiPosition}%, 85%)`,
                  backgroundColor: bmiTone.accent,
                }}
              >
                <span className="whitespace-nowrap">You {fmt(analysis.bmi)}</span>
                <span
                  className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                  style={{ backgroundColor: bmiTone.accent }}
                />
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
            <div className="relative mt-3 h-8 font-body text-[10px] text-[var(--text-muted)] sm:h-5 sm:text-xs">
              <span className="absolute left-[9%] -translate-x-1/2 whitespace-nowrap sm:hidden">Under</span>
              <span className="absolute left-[34%] -translate-x-1/2 whitespace-nowrap sm:hidden">Healthy</span>
              <span className="absolute left-[62.5%] -translate-x-1/2 whitespace-nowrap sm:hidden">Over</span>
              <span className="absolute left-[87.5%] -translate-x-1/2 whitespace-nowrap sm:hidden">Obese</span>
              <span className="absolute left-[9%] -translate-x-1/2 whitespace-nowrap max-sm:hidden">Underweight</span>
              <span className="absolute left-[34%] -translate-x-1/2 whitespace-nowrap max-sm:hidden">Healthy</span>
              <span className="absolute left-[62.5%] -translate-x-1/2 whitespace-nowrap max-sm:hidden">Overweight</span>
              <span className="absolute left-[87.5%] -translate-x-1/2 whitespace-nowrap max-sm:hidden">Obese</span>
            </div>
          </div>

          {/* BMI message */}
          <div
            className="animate-fade-in-up mt-3 rounded-[10px] border-l-4 p-3 sm:mt-4 sm:rounded-[12px] sm:p-4"
            style={{
              animationDelay: "0.15s",
              opacity: 0,
              borderLeftColor: bmiTone.accent,
              backgroundColor: bmiTone.bg,
            }}
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
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full space-y-3 sm:space-y-4">
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Body fat
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🔍 {fmt(analysis.bodyFat, 2)}%
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Activity level
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    📊 {answers.q6 ? getActivityLevel(answers.q6) : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Energy level
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    😟 {answers.q7 ? getEnergyLevel(answers.q7) : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Goal
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    ☀️ {answers.q2[0] || "Not set"}
                  </p>
                </div>
              </div>
              <div className="relative h-52 w-56 flex-shrink-0 sm:h-60 sm:w-60">
                <Image
                  src={getBmiImage()}
                  alt=""
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 640px) 224px, 240px"
                  unoptimized
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
            🥩 Proteins &amp; dairy:
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {PROTEIN_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q18.includes(item)}
                onClick={() => toggleMulti("q18", item)}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Checkbox checked={answers.q18.includes(item)} />
                    <span className="font-body text-base font-medium text-[var(--text-primary)]">
                      {item}
                    </span>
                  </span>
                  <span className="text-2xl sm:text-3xl">{PROTEIN_EMOJIS[item]}</span>
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
            🥗 Fruits &amp; vegetables:
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {VEGETABLE_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q19.includes(item)}
                onClick={() => toggleMulti("q19", item)}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Checkbox checked={answers.q19.includes(item)} />
                    <span className="font-body text-base font-medium text-[var(--text-primary)]">
                      {item}
                    </span>
                  </span>
                  <span className="text-2xl sm:text-3xl">{VEGETABLE_EMOJIS[item]}</span>
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
            🌾 Grains &amp; nuts:
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {GRAIN_OPTIONS.map((item) => (
              <OptionCard
                key={item}
                selected={answers.q20.includes(item)}
                onClick={() => toggleMulti("q20", item)}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Checkbox checked={answers.q20.includes(item)} />
                    <span className="font-body text-base font-medium text-[var(--text-primary)]">
                      {item}
                    </span>
                  </span>
                  <span className="text-2xl sm:text-3xl">{GRAIN_EMOJIS[item]}</span>
                </span>
              </OptionCard>
            ))}
          </div>
          <CTAButton onClick={() => {
            setStep(26);
            setIsGenerating(true);
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
          <div className="mx-auto w-full max-w-[448px] [font-family:var(--font-inter)]">
            <div className="animate-scale-in overflow-hidden rounded-[14px] border border-[#d8d8d8] bg-[#f3f3f3] px-4 py-6 text-center">
              <p className="text-[18px] font-semibold leading-[1.32] tracking-[-0.01em] text-[#101010]">
              Based on your food preferences, we&apos;ve created
              </p>
              <div className="mt-5 border-t border-[#d5d5d5] pt-5">
                <p className="text-[62px] font-bold leading-none tracking-[-0.02em] text-[#3b82f6]">
                  500+
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111]">
                  <span className="font-bold">Meal combinations</span>{" "}
                  <span className="font-normal text-[#2f2f2f]">
                    that are the perfect fit for you and will help you reach a
                    healthy weight in the most enjoyable way!
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[448px] [font-family:var(--font-inter)] [&_button]:[font-family:var(--font-inter)] [&_button]:font-semibold">
            <CTAButton onClick={() => setStep(28)}>
              Continue
            </CTAButton>
          </div>
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
      </motion.div>
    </AnimatePresence>
  );
}
