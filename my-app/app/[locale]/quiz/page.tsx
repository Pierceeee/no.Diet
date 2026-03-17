"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useQuiz } from "@/lib/quiz-context";
import {
  fmt,
  getBMIGradientColor,
  toStr,
} from "@/lib/utils";
import type { Unit, WeightUnit } from "@/lib/quiz-data";
import {
  FAMILIARITY_EMOJIS,
  DAY_TO_DAY_EMOJIS,
  ENERGY_EMOJIS,
  EXERCISE_EMOJIS,
  WEIGHT_CHANGE_EMOJIS,
  IDEAL_WEIGHT_EMOJIS,
  PROTEIN_EMOJIS,
  VEGETABLE_EMOJIS,
  GRAIN_EMOJIS,
  GOAL_EMOJIS,
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
import { useIntlayer, useLocale } from "next-intlayer";

const BODY_TYPE_IMAGES = {
  male: {
    current: [
      "/docs/bodytype/11.svg",
      "/docs/bodytype/12.svg",
      "/docs/bodytype/13.svg",
      "/docs/bodytype/14.svg",
    ],
    target: [
      "/docs/bodytype/15.svg",
      "/docs/bodytype/16.svg",
      "/docs/bodytype/17.svg",
      "/docs/bodytype/18.svg",
    ],
  },
  female: {
    current: [
      "/docs/bodytype/3.svg",
      "/docs/bodytype/4.svg",
      "/docs/bodytype/5.svg",
      "/docs/bodytype/6.svg",
    ],
    target: [
      "/docs/bodytype/7.svg",
      "/docs/bodytype/8.svg",
      "/docs/bodytype/9.svg",
      "/docs/bodytype/10.svg",
    ],
  },
};

const BMI_IMAGES = {
  male: {
    healthy: "/docs/Bmi/47.svg",
    overweight: "/docs/Bmi/48.svg",
    obese: "/docs/Bmi/49.svg",
  },
  female: {
    healthy: "/docs/Bmi/50.svg",
    overweight: "/docs/Bmi/51.svg",
    obese: "/docs/Bmi/52.svg",
  },
};

const INFO_INTERSTITIAL_IMAGES = [
  "/quiz/blue-zones.png",
  "/quiz/page11.png",
  "/quiz/3.png",
  "/quiz/page12.png",
  "/quiz/mediterranean-spread.png",
];

export default function QuizPage() {
  const prefersReducedMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const router = useRouter();
  const { locale } = useLocale();
  const t = useIntlayer("quiz");
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
      router.replace(`/${locale}`);
    }
  }, [step, router, hydrated, locale]);

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

  useEffect(() => {
    if (!hydrated) return;
    
    const imagesToPreload: string[] = [...INFO_INTERSTITIAL_IMAGES];
    
    if (answers.gender) {
      const gender = answers.gender as "male" | "female";
      imagesToPreload.push(
        ...BODY_TYPE_IMAGES[gender].current,
        ...BODY_TYPE_IMAGES[gender].target,
        ...Object.values(BMI_IMAGES[gender])
      );
    } else {
      Object.values(BODY_TYPE_IMAGES).forEach((g) => {
        imagesToPreload.push(...g.current, ...g.target);
      });
      Object.values(BMI_IMAGES).forEach((g) => {
        imagesToPreload.push(...Object.values(g));
      });
    }
    
    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [hydrated, answers.gender]);

  const genderGoals: string[] = (answers.gender === "male" ? t.options.goalsMale : t.options.goalsFemale) as string[];
  const q3Bodies: string[] = (answers.gender === "male" ? t.options.q3BodiesMale : t.options.q3BodiesFemale) as string[];
  const q4Bodies: string[] = (answers.gender === "male" ? t.options.q4BodiesMale : t.options.q4BodiesFemale) as string[];
  const q12Reasons: string[] = t.options.q12Reasons as string[];

  const getLocalizedBmiMessage = (bmiLabel: string) => {
    switch (bmiLabel) {
      case "healthy":
        return t.bmiMessages.healthy;
      case "overweight":
        return t.bmiMessages.overweight;
      case "obese":
        return t.bmiMessages.obese;
      default:
        return t.bmiMessages.underweight;
    }
  };

  const getLocalizedWeightLossMessage = (lossPercent: number) => {
    if (lossPercent <= 20) {
      return {
        title: toStr(t.weightLoss.smallTitle).replace("{percent}", lossPercent.toFixed(0)),
        body: t.weightLoss.smallBody,
      };
    }

    return {
      title: toStr(t.weightLoss.bigTitle).replace("{percent}", lossPercent.toFixed(0)),
      body: t.weightLoss.bigBody,
    };
  };

  const handleGenerateComplete = useCallback(() => {
    setStep(27);
  }, [setStep]);

  const getBmiImage = () => {
    const gender = answers.gender as "male" | "female";
    const bmiImages = BMI_IMAGES[gender] || BMI_IMAGES.female;
    if (analysis.bmiLabel === "healthy") return bmiImages.healthy;
    if (analysis.bmiLabel === "overweight") return bmiImages.overweight;
    return bmiImages.obese;
  };

  const bmiTone = (() => {
    switch (analysis.bmiLabel) {
      case "healthy":
        return { accent: "#3aab4f", bg: "#edf7ee" };
      case "overweight":
        return { accent: "#e8a838", bg: "#fff7e8" };
      case "obese":
        return { accent: "#d94040", bg: "#fef2f2" };
      case "underweight":
      default:
        return { accent: "#4a9fd5", bg: "#eff6ff" };
    }
  })();
  const bmiMarkerColor = getBMIGradientColor(analysis.bmiPosition);

  if (!hydrated || step === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: 8 }
        }
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: smoothEase }
        }
      >
      {/* ── Step 1: Q1 - Mediterranean familiarity ── */}
      {step === 1 && (
        <SingleChoiceStep
          title={t.steps.s1}
          options={t.options.familiarity}
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
          title={t.infoBlocks.blueZones.title}
          body={t.infoBlocks.blueZones.body}
          image={t.infoBlocks.blueZones.image}
          onContinue={() => setStep(3)}
        />
      )}

      {/* ── Step 3: Q2 - Goals ── */}
      {step === 3 && (
        <QuizSection>
          <QuizTitle>{t.steps.s3}</QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            {t.labels.selectAll}
          </p>
          <div className="stagger-children mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {genderGoals.map((item, i) => (
              <OptionCard
                key={i}
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
            {t.common.continue}
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 4: Q3 - Current body type ── */}
      {step === 4 && (
        <QuizSection>
          <QuizTitle>{t.steps.s4}</QuizTitle>
          <div className="stagger-children mt-8 space-y-3">
            {q3Bodies.map((item, index) => {
              const gender = answers.gender as "male" | "female";
              const bodyImages = BODY_TYPE_IMAGES[gender]?.current || BODY_TYPE_IMAGES.female.current;
              
              return (
                <OptionCard
                  key={index}
                  onClick={() => {
                    setAnswer("q3", item);
                    setStep(5);
                  }}
                  className="relative overflow-visible"
                >
                  <div className="relative flex min-h-[40px] items-center pr-24 sm:min-h-[44px] sm:pr-28">
                    <span className="min-w-0 leading-tight break-words font-body text-base font-medium tracking-[-0.01em] text-[var(--text-primary)] sm:text-lg">
                      {item}
                    </span>
                    <div className="pointer-events-none absolute top-1/2 right-2 h-24 w-24 -translate-y-1/2 sm:right-3 sm:h-28 sm:w-28">
                      <Image
                        src={bodyImages[index] || bodyImages[1]}
                        alt=""
                        fill
                        className="object-contain object-right"
                        sizes="(max-width: 640px) 96px, 112px"
                        quality={100}
                        unoptimized
                      />
                    </div>
                  </div>
                </OptionCard>
              );
            })}
          </div>
        </QuizSection>
      )}

      {/* ── Step 5: Q4 - Target body ── */}
      {step === 5 && (
        <QuizSection>
          <QuizTitle>{t.steps.s5}</QuizTitle>
          <div className="stagger-children mt-8 space-y-3">
            {q4Bodies.map((item, idx) => {
              const gender = answers.gender as "male" | "female";
              const targetImages = BODY_TYPE_IMAGES[gender]?.target || BODY_TYPE_IMAGES.female.target;
              
              return (
                <OptionCard
                  key={idx}
                  onClick={() => {
                    setAnswer("q4", item);
                    setStep(6);
                  }}
                  className="relative overflow-visible"
                >
                  <div className="relative flex min-h-[40px] items-center pr-24 sm:min-h-[44px] sm:pr-28">
                    <span className="min-w-0 leading-tight break-words font-body text-base font-medium tracking-[-0.01em] text-[var(--text-primary)] sm:text-lg">
                      {item}
                    </span>
                    <div className="pointer-events-none absolute top-1/2 right-2 h-24 w-24 -translate-y-1/2 sm:right-3 sm:h-28 sm:w-28">
                      <Image
                        src={targetImages[idx] || targetImages[0]}
                        alt=""
                        fill
                        className="object-contain object-right"
                        sizes="(max-width: 640px) 96px, 112px"
                        quality={100}
                        unoptimized
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
          <QuizTitle>{t.steps.s6}</QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            {t.steps.s6Hint}
          </p>
          <div className="mt-4 mb-2 sm:mt-6">
            <BodyHighlight
              gender={answers.gender}
              selectedAreas={answers.q5}
              onToggle={(area) => toggleMulti("q5", area)}
            />
          </div>
          <CTAButton onClick={() => setStep(7)}>{t.common.continue}</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 7: Q6 - Day-to-day ── */}
      {step === 7 && (
        <SingleChoiceStep
          title={t.steps.s7}
          options={t.options.dayToDay}
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
          title={t.steps.s8}
          options={t.options.energy}
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
          title={t.steps.s9}
          options={t.options.exercise}
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
          title={t.steps.s10}
          options={t.options.weightChange}
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
          title={t.infoBlocks.metabolism.title}
          body={t.infoBlocks.metabolism.body}
          image={t.infoBlocks.metabolism.image}
          onContinue={() => setStep(12)}
        />
      )}

      {/* ── Step 12: Q10 - Best weight timing ── */}
      {step === 12 && (
        <SingleChoiceStep
          title={t.steps.s12}
          options={t.options.idealWeight}
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
            {t.steps.s13}
          </QuizTitle>
          <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
            {t.labels.selectAll}
          </p>
          <div className="stagger-children mt-8 space-y-3">
            {(t.options.diets as string[]).map((item: string, idx: number) => (
              <OptionCard
                key={idx}
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
            {t.common.continue}
          </CTAButton>
        </QuizSection>
      )}

      {/* ── Step 14: INFO - Diets wrong ── */}
      {step === 14 && (
        <InfoInterstitial
          title={t.infoBlocks.dietsWrong.title}
          body={t.infoBlocks.dietsWrong.body}
          image={t.infoBlocks.dietsWrong.image}
          onContinue={() => setStep(15)}
        />
      )}

      {/* ── Step 15: Q12 - Reason to get in shape ── */}
      {step === 15 && (
        <SingleChoiceStep
          title={t.steps.s15}
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
          title={t.steps.s16}
          unitA="in"
          unitB="cm"
          selectedUnit={answers.q13Unit}
          onUnitChange={(v) => setAnswer("q13Unit", v as Unit)}
          value={answers.q13}
          onChange={(v) => setAnswer("q13", v)}
          helper={t.infoBlocks.bmiExplanation.title}
          helperBody={t.infoBlocks.bmiExplanation.body}
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
          title={t.steps.s17}
          unitA="lbs"
          unitB="kg"
          selectedUnit={answers.q14Unit}
          onUnitChange={(v) => setAnswer("q14Unit", v as WeightUnit)}
          value={answers.q14}
          onChange={(v) => setAnswer("q14", v)}
          helper={`✔️ ${toStr(getLocalizedBmiMessage(analysis.bmiLabel).title)}`}
          helperBody={getLocalizedBmiMessage(analysis.bmiLabel).body}
          helperVariant={
            analysis.bmiLabel === "healthy"
              ? "success"
              : analysis.bmiLabel === "overweight"
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
          title={t.infoBlocks.adviceWrong.title}
          body={t.infoBlocks.adviceWrong.body}
          image={t.infoBlocks.adviceWrong.image}
          onContinue={() => setStep(19)}
        />
      )}

      {/* ── Step 19: Q15 - Target weight ── */}
      {step === 19 && (
        <NumericStep
          title={t.steps.s19}
          unitA="lbs"
          unitB="kg"
          selectedUnit={answers.q15Unit}
          onUnitChange={(v) => setAnswer("q15Unit", v as WeightUnit)}
          value={answers.q15}
          onChange={(v) => setAnswer("q15", v)}
          helper={`☝️ ${toStr(getLocalizedWeightLossMessage(analysis.targetLoss).title)}`}
          helperBody={getLocalizedWeightLossMessage(analysis.targetLoss).body}
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
          title={t.steps.s20}
          value={answers.q16}
          onChange={(v) => setAnswer("q16", v)}
          helper={`☝️ ${toStr(t.infoBlocks.ageMetabolism.title)}`}
          helperBody={t.infoBlocks.ageMetabolism.body}
          styleVariant="reference"
          ctaDisabled={answers.q16 < 18}
          onContinue={() => setStep(21)}
        />
      )}

      {/* ═══════════ STEP 21 — PERSONAL SUMMARY ═══════════ */}
      {step === 21 && (
        <QuizSection>
          <QuizTitle>{t.steps.s21Title}</QuizTitle>

          {/* BMI Card */}
          <div className="animate-scale-in mt-6 overflow-visible rounded-[14px] bg-[#f5f5f5] p-4 sm:mt-8 sm:rounded-[16px] sm:p-6">
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              {t.steps.s21BmiTitle}
            </h3>
            <div className="relative mt-8 mb-2 sm:mt-10">
              <div
                className="absolute bottom-full left-0 mb-1 flex -translate-x-1/2 items-center whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white sm:mb-1.5 sm:px-3 sm:py-1 sm:text-xs"
                style={{
                  left: `${analysis.bmiPosition}%`,
                  backgroundColor: bmiMarkerColor,
                }}
              >
                {t.labels.youValue} - {fmt(analysis.bmi)}
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
            <div className="relative mt-2.5 flex justify-between px-1 font-body text-[9px] text-[var(--text-muted)] sm:mt-3 sm:text-xs">
              <span className="text-center">
                <span className="sm:hidden">{t.labels.underweightShort}</span>
                <span className="hidden sm:inline">{t.labels.underweight}</span>
              </span>
              <span className="text-center">{t.labels.healthy}</span>
              <span className="text-center">
                <span className="sm:hidden">{t.labels.overweightShort}</span>
                <span className="hidden sm:inline">{t.labels.overweight}</span>
              </span>
              <span className="text-center">{t.labels.obese}</span>
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
              {getLocalizedBmiMessage(analysis.bmiLabel).title}
            </p>
            <p className="mt-1 font-body text-xs text-[var(--text-secondary)]">
              {getLocalizedBmiMessage(analysis.bmiLabel).body}
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
                    {t.labels.bodyFat}
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    🔍 {fmt(analysis.bodyFat, 2)}%
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.labels.activityLevel}
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    📊 {answers.q6 ? getActivityLevel(answers.q6) : t.common.notSet}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.labels.energyLevel}
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    😟 {answers.q7 ? getEnergyLevel(answers.q7) : t.common.notSet}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.labels.goal}
                  </p>
                  <p className="font-body text-lg font-bold text-[var(--text-primary)]">
                    ☀️ {answers.q2[0] || t.common.notSet}
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
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
          </div>

          <CTAButton onClick={() => setStep(22)}>{t.common.continue}</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 22: Q17 - Meals ── */}
      {step === 22 && (
        <SingleChoiceStep
          title={t.steps.s22}
          subtitle={t.steps.s22Subtitle}
          options={t.options.meals}
          descriptions={t.options.mealDescriptions}
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
            {t.steps.s23}
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            🥩 {t.steps.s23Label}
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {(t.options.proteins as string[]).map((item: string, idx: number) => (
              <OptionCard
                key={idx}
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
          <CTAButton onClick={() => setStep(24)}>{t.common.continue}</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 24: Q19 - Exclude vegetables (NEW) ── */}
      {step === 24 && (
        <QuizSection>
          <QuizTitle>
            {t.steps.s24}
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            🥗 {t.steps.s24Label}
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {(t.options.vegetables as string[]).map((item: string, idx: number) => (
              <OptionCard
                key={idx}
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
          <CTAButton onClick={() => setStep(25)}>{t.common.continue}</CTAButton>
        </QuizSection>
      )}

      {/* ── Step 25: Q20 - Exclude grains ── */}
      {step === 25 && (
        <QuizSection>
          <QuizTitle>
            {t.steps.s25}
          </QuizTitle>
          <p className="mt-2 font-body text-base font-semibold text-[var(--text-primary)]">
            🌾 {t.steps.s25Label}
          </p>
          <div className="stagger-children mt-6 space-y-3">
            {(t.options.grains as string[]).map((item: string, idx: number) => (
              <OptionCard
                key={idx}
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
          }}>{t.common.continue}</CTAButton>
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
              {t.steps.s27Title}
              </p>
              <div className="mt-5 border-t border-[#d5d5d5] pt-5">
                <p className="text-[62px] font-bold leading-none tracking-[-0.02em] text-[#3b82f6]">
                  {t.steps.s27Count}
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.45] tracking-[-0.01em] text-[#111]">
                  <span className="font-bold">{t.steps.s27Lead}</span>{" "}
                  <span className="font-normal text-[#2f2f2f]">
                    {t.steps.s27Body}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[448px] [font-family:var(--font-inter)] [&_button]:[font-family:var(--font-inter)] [&_button]:font-semibold">
            <CTAButton onClick={() => setStep(28)}>
              {t.common.continue}
            </CTAButton>
          </div>
        </QuizSection>
      )}

      {/* ═══════════ STEP 28 — PRE-EMAIL INFO BLOCK ═══════════ */}
      {step === 28 && (
        <InfoInterstitial
          title={t.infoBlocks.preEmail.title}
          body={t.infoBlocks.preEmail.body}
          image={t.infoBlocks.preEmail.image}
          onContinue={() => router.push(`/${locale}/email`)}
        />
      )}
      </motion.div>
    </AnimatePresence>
  );
}
