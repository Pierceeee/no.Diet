"use client";

import { useEffect } from "react";
import { useQuiz } from "@/lib/quiz-context";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const { progress, setProgress, isGenerating, setIsGenerating } = useQuiz();

  useEffect(() => {
    if (!isGenerating) return;
    if (progress >= 100) {
      const t = setTimeout(() => {
        setIsGenerating(false);
        onComplete();
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 8)), 280);
    return () => clearTimeout(t);
  }, [isGenerating, progress, setProgress, setIsGenerating, onComplete]);

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
            stroke="#3bb44a"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl font-bold text-black sm:text-4xl">
            {progress}%
          </span>
        </div>
      </div>

      <h2 className="mt-6 font-display text-2xl font-bold text-black sm:mt-8 sm:text-3xl md:text-4xl">
        Generating...
      </h2>
      <div className="mt-4 space-y-2.5 font-body text-sm text-gray-600 sm:mt-6 sm:space-y-3 sm:text-base">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--green)] text-xs text-white">
            ✓
          </span>
          Reviewing your answers...
        </p>
        <p className="flex items-center justify-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--green)] text-xs text-white">
            ✓
          </span>
          Analyzing your preferences...
        </p>
        {progress > 60 && (
          <p className="animate-fade-in flex items-center justify-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--green)] text-xs text-white">
              ✓
            </span>
            Building your meal plan...
          </p>
        )}
      </div>
    </section>
  );
}
