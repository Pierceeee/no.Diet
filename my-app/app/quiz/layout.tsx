"use client";

import { useQuiz } from "@/lib/quiz-context";
import { TOTAL_STEPS } from "@/lib/quiz-data";
import { ProgressBar } from "@/components/quiz/progress-bar";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { step, isGenerating } = useQuiz();

  return (
    <div className="min-h-[100dvh] bg-white">
      {step >= 1 && step <= 20 && !isGenerating && <ProgressBar />}
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-12 pt-6 sm:px-5 sm:pb-20 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
