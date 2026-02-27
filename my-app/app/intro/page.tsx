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
          <div className="animate-fade-in-up relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-[linear-gradient(145deg,#fff8f4_0%,#ffe7de_40%,#ffffff_100%)] p-5 shadow-[0_20px_44px_rgba(200,85,58,0.18)] sm:p-7">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#c8553a_0%,#dd6b4f_45%,#e8a838_100%)]" />

            <div className="inline-flex items-center rounded-full border border-white/60 bg-[linear-gradient(145deg,#c8553a_0%,#dd6b4f_100%)] px-3 py-1 text-white shadow-[0_10px_20px_rgba(200,85,58,0.3)]">
              <span className="text-sm">‼️</span>
            </div>

            <h2 className="mt-3 font-display text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl md:text-[27px]">
              Before we build your plan — read this.
            </h2>

            <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
              <p className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base">
                If you&apos;ve tried keto, calorie counting, or intermittent fasting and felt like you failed.
              </p>

              <p className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base">
                You didn&apos;t fail. The plan failed you.
              </p>

              <p className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base">
                Those systems were built on old science. Fixed rules. Generic templates.
              </p>

              <p className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base">
                They were never designed for how a {genderText} body actually works.
              </p>

              <p className="font-body text-sm font-bold leading-relaxed text-[var(--accent)] sm:text-base">
                That changes right now.
              </p>

              <p className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base">
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
