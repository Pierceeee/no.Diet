"use client";

import { useQuiz } from "@/lib/quiz-context";
import { TOTAL_STEPS } from "@/lib/quiz-data";

export function ProgressBar() {
  const { stepProgress, goBack, step, isGenerating } = useQuiz();

  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        {/* Back arrow */}
        <button
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] disabled:opacity-30 sm:h-9 sm:w-9"
          disabled={step <= 0 || isGenerating}
          aria-label="Back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 10H5" />
            <path d="M10 15L5 10L10 5" />
          </svg>
        </button>

        {/* Brand name */}
        <p className="text-[18px] font-black tracking-tight text-black sm:text-[22px]" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          no.Diet
        </p>

        {/* Step counter */}
        <p className="font-body text-xs font-medium text-[var(--text-muted)] sm:text-sm">
          {stepProgress}/{TOTAL_STEPS}
        </p>
      </div>

      {/* Progress bar - green like the reference */}
      <div className="h-[3px] w-full bg-[#e8e8e8]">
        <div
          className="h-[3px] rounded-r-full transition-all duration-500 ease-out"
          style={{
            width: `${(stepProgress / TOTAL_STEPS) * 100}%`,
            background: "#3bb44a",
          }}
        />
      </div>
    </header>
  );
}
