"use client";

import { useEffect, useRef } from "react";
import { useQuiz } from "@/lib/quiz-context";
import { useIntlayer } from "next-intlayer";

const DURATION_MS = 5500;
const START_PROGRESS = 1;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const t = useIntlayer("quiz");
  const loadingMessages: string[] = t.loading.messages as string[];
  const { progress, setProgress, isGenerating, setIsGenerating } = useQuiz();
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);
  const autoAdvanceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isGenerating) return;

    setProgress(START_PROGRESS);
    startTimeRef.current = null;
    completedRef.current = false;
    if (autoAdvanceTimeoutRef.current !== null) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

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
        autoAdvanceTimeoutRef.current = window.setTimeout(() => {
          setIsGenerating(false);
          onComplete();
        }, 400);
        return;
      }

      if (newProgress < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (autoAdvanceTimeoutRef.current !== null) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
        autoAdvanceTimeoutRef.current = null;
      }
    };
  }, [isGenerating, onComplete, setIsGenerating, setProgress]);

  const isMessageVisible = (index: number) => {
    const threshold = ((index + 1) / (loadingMessages.length + 1)) * 100;
    return progress >= threshold;
  };

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
          <span className="font-display tabular-nums text-3xl font-bold tracking-[-0.02em] text-black sm:text-4xl">
            {progress}%
          </span>
        </div>
      </div>

      <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em] text-black sm:mt-8 sm:text-3xl md:text-4xl">
        {t.loading.title}
      </h2>
      
      <div className="mx-auto mt-4 min-h-[210px] w-full max-w-[460px] font-body text-[15px] tracking-[-0.01em] text-[#4a4a4a] sm:mt-6 sm:min-h-[228px] sm:text-base">
        {loadingMessages.map((msg: string, i: number) => (
          <p
            key={i}
            className={`flex items-center gap-2.5 py-1 text-left transition-opacity duration-300 ${
              isMessageVisible(i) ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-xs text-white">
              ✓
            </span>
            <span className="leading-[1.45]">{msg}</span>
          </p>
        ))}
      </div>

    </section>
  );
}
