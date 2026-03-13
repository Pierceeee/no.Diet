"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Answers, Gender, Unit, WeightUnit } from "./quiz-data";
import { DEFAULT_ANSWERS, TOTAL_STEPS } from "./quiz-data";
import { generateAnalysis, type AnalysisResult } from "./generate-analysis";

/* ─── Storage key ─── */
const STORAGE_KEY = "carni-quiz";
const FORWARD_STEP_DELAY_MS = 420;

/* ─── Context shape ─── */
interface QuizContextValue {
  /* State */
  answers: Answers;
  step: number;
  email: string;
  isGenerating: boolean;
  progress: number;
  hydrated: boolean;

  /* Setters */
  setGender: (g: Gender) => void;
  setAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  toggleMulti: (
    key: "q2" | "q5" | "q11" | "q18" | "q19" | "q20",
    value: string,
  ) => void;
  setStep: (s: number | ((prev: number) => number)) => void;
  setEmail: (e: string) => void;
  setIsGenerating: (v: boolean) => void;
  setProgress: (v: number | ((prev: number) => number)) => void;

  /* Computed */
  analysis: AnalysisResult;
  stepProgress: number;

  /* Actions */
  goBack: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

/* ─── Provider ─── */
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
  const [step, setStepRaw] = useState(0);
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(36);
  const [hydrated, setHydrated] = useState(false);
  const stepTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const clearPendingStepTransition = useCallback(() => {
    if (stepTransitionTimeoutRef.current) {
      clearTimeout(stepTransitionTimeoutRef.current);
      stepTransitionTimeoutRef.current = null;
    }
  }, []);

  /* ── Hydrate from localStorage on mount ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.answers) setAnswers(data.answers);
        if (typeof data.step === "number") setStepRaw(data.step);
        if (typeof data.email === "string") setEmail(data.email);
      }
    } catch {
      /* ignore corrupt data */
    }
    setHydrated(true);
  }, []);

  /* ── Persist to localStorage on change ── */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, step, email }),
      );
    } catch {
      /* storage full or unavailable */
    }
  }, [answers, step, email, hydrated]);

  useEffect(() => {
    if (step !== 26 && isGenerating) {
      setIsGenerating(false);
    }
  }, [step, isGenerating]);

  useEffect(() => {
    return () => {
      clearPendingStepTransition();
    };
  }, [clearPendingStepTransition]);

  /* ── Setters ── */
  const setGender = useCallback((g: Gender) => {
    setAnswers((prev) => ({ ...prev, gender: g }));
  }, []);

  const setAnswer = useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleMulti = useCallback(
    (key: "q2" | "q5" | "q11" | "q18" | "q19" | "q20", value: string) => {
      setAnswers((prev) => {
        const exists = prev[key].includes(value);
        return {
          ...prev,
          [key]: exists
            ? prev[key].filter((i) => i !== value)
            : [...prev[key], value],
        };
      });
    },
    [],
  );

  const setStep = useCallback(
    (s: number | ((prev: number) => number)) => {
      const applyStep = (nextStep: number) => {
        setStepRaw(nextStep);
      };

      if (typeof s !== "number") {
        clearPendingStepTransition();
        setStepRaw((prev) => s(prev));
        return;
      }

      clearPendingStepTransition();

      const isForwardQuestionStep =
        s > step && step >= 1 && s >= 1 && s <= 25;
      const shouldReduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stepDelayMs = shouldReduceMotion ? 0 : FORWARD_STEP_DELAY_MS;

      if (isForwardQuestionStep) {
        stepTransitionTimeoutRef.current = setTimeout(() => {
          applyStep(s);
          stepTransitionTimeoutRef.current = null;
        }, stepDelayMs);
        return;
      }

      applyStep(s);
    },
    [clearPendingStepTransition, step],
  );

  const goBack = useCallback(() => {
    if (step <= 0 || isGenerating) return;
    clearPendingStepTransition();
    setIsGenerating(false);
    setStepRaw((p) => Math.max(0, p - 1));
  }, [clearPendingStepTransition, step, isGenerating]);

  const resetQuiz = useCallback(() => {
    clearPendingStepTransition();
    setAnswers(DEFAULT_ANSWERS);
    setStepRaw(0);
    setEmail("");
    setIsGenerating(false);
    setProgress(36);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [clearPendingStepTransition]);

  /* ── Computed ── */
  const analysis = useMemo(() => generateAnalysis(answers), [answers]);
  const stepProgress = useMemo(() => Math.min(step + 1, TOTAL_STEPS), [step]);

  const value = useMemo<QuizContextValue>(
    () => ({
      answers,
      step,
      email,
      isGenerating,
      progress,
      hydrated,
      setGender,
      setAnswer,
      toggleMulti,
      setStep,
      setEmail,
      setIsGenerating,
      setProgress,
      analysis,
      stepProgress,
      goBack,
      resetQuiz,
    }),
    [
      answers,
      step,
      email,
      isGenerating,
      progress,
      hydrated,
      setGender,
      setAnswer,
      toggleMulti,
      setStep,
      setEmail,
      setIsGenerating,
      setProgress,
      analysis,
      stepProgress,
      goBack,
      resetQuiz,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

/* ─── Hook ─── */
export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return ctx;
}
