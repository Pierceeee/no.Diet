"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { QuizSection } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";

export default function IntroPage() {
  const router = useRouter();
  const { answers, setStep } = useQuiz();

  const handleContinue = () => {
    setStep(1);
    router.push("/quiz");
  };

  const genderText = answers.gender === "male" ? "man's" : "woman's";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg-page)]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-20">
        <span
          className="text-[22px] font-black tracking-tight text-black"
          style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
        >
          no.Diet
        </span>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-4 pb-10 sm:px-6 sm:pb-16">
        <QuizSection>
          <div className="animate-fade-in-up overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:p-6">
            <h2 className="font-display text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl">
              Before we build your plan — <span className="text-[#0d7377]">read this</span>.
            </h2>

            <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
              <p className="font-body text-sm leading-relaxed text-gray-600 sm:text-base">
                If you&apos;ve tried keto, calorie counting, or intermittent fasting and felt like you failed.
              </p>

              <p className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base">
                You didn&apos;t fail. The plan failed you.
              </p>

              <p className="font-body text-sm leading-relaxed text-gray-600 sm:text-base">
                Those systems were built on old science. Fixed rules. Generic templates.
              </p>

              <p className="font-body text-sm leading-relaxed text-gray-600 sm:text-base">
                They were never designed for how a {genderText} body actually works.
              </p>

              <p className="font-body text-sm font-bold leading-relaxed text-[#0d7377] sm:text-base">
                That changes right now.
              </p>

              <p className="font-body text-sm leading-relaxed text-gray-600 sm:text-base">
                Answer honestly. We&apos;ll do the rest.
              </p>
            </div>
          </div>

          <CTAButton onClick={handleContinue}>Continue</CTAButton>
        </QuizSection>
      </main>
    </div>
  );
}
