"use client";

import { useEffect, useRef, useState } from "react";
import { useQuiz } from "@/lib/quiz-context";

const LOADING_MESSAGES = [
  "Analyzing your metabolic profile…",
  "Reviewing food preferences…",
  "Comparing with Blue Zone longevity data…",
  "Processing latest nutrition research…",
  "Adjusting macro proportions…",
  "Building your adaptive Mediterranean Coaching system…",
];

const DURATION_MS = 5500;
const START_PROGRESS = 1;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { progress, setProgress, isGenerating, setIsGenerating } = useQuiz();
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isGenerating) return;

    setProgress(START_PROGRESS);
    startTimeRef.current = null;
    completedRef.current = false;
    setDone(false);

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const remaining = 100 - START_PROGRESS;
      const newProgress = Math.min(
        100,
        START_PROGRESS + (elapsed / DURATION_MS) * remaining
      );

      const roundedProgress = Math.round(newProgress);
      setProgress(roundedProgress);

      if (roundedProgress >= 100 && !completedRef.current) {
        completedRef.current = true;
        setTimeout(() => setDone(true), 400);
        return;
      }

      if (newProgress < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isGenerating, setProgress]);

  const handleContinue = () => {
    setIsGenerating(false);
    onComplete();
  };

  const visibleMessages = LOADING_MESSAGES.filter((_, i) => {
    const threshold = ((i + 1) / (LOADING_MESSAGES.length + 1)) * 100;
    return progress >= threshold;
  });

  return (
    <section className="w-full max-w-[520px] px-4 pt-10 text-center sm:px-0 sm:pt-16">
      {/* SVG Progress Ring */}
      <div className="animate-scale-in relative mx-auto h-36 w-36 sm:h-48 sm:w-48">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            strokeWidth="8"
            fill="none"
            stroke="#e8e8e8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            strokeWidth="8"
            fill="none"
            stroke="#2f6ebf"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] text-black sm:text-4xl">
            {progress}%
          </span>
        </div>
      </div>

      <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em] text-black sm:mt-8 sm:text-3xl md:text-4xl">
        Generating...
      </h2>
      
      <div className="mt-4 space-y-2.5 font-body text-[15px] tracking-[-0.01em] text-[#4a4a4a] sm:mt-6 sm:space-y-3 sm:text-base">
        {visibleMessages.map((msg) => (
          <p
            key={msg}
            className="animate-fade-in flex items-start justify-center gap-2 px-4 text-left"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-xs text-white">
              ✓
            </span>
            <span>{msg}</span>
          </p>
        ))}
      </div>

      {/* Continue button after generation completes */}
      {done && (
        <button
          className="animate-fade-in-up mt-8 w-full max-w-[460px] rounded-[12px] bg-[#3b82f6] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#2563eb] hover:shadow-lg active:scale-[0.99] sm:mt-10 sm:px-6 sm:py-4 sm:text-lg"
          onClick={handleContinue}
        >
          Continue
        </button>
      )}
    </section>
  );
}
