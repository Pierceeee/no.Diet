"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { QuizSection } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";
import { Logo } from "@/components/ui/logo";

export default function IntroPage() {
  const router = useRouter();
  const { answers, setStep } = useQuiz();

  const handleContinue = () => {
    setStep(1);
    router.push("/quiz");
  };

  const genderText = answers.gender === "male" ? "man's" : "woman's";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-20">
        <Logo size="md" />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-6 sm:pb-16">
        <QuizSection>
          <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-md)] sm:rounded-3xl">
            <div className="h-1 w-full bg-gradient-to-r from-[#0d7377] via-[#1a8f95] to-[#0d7377]" />

            <div className="p-6 sm:p-8">
              <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-[#0d7377]/20 bg-[#0d7377]/6 px-3 py-1">
                <span className="font-body text-xs font-medium tracking-[0.02em] text-[#0d7377]">
                  Quick note
                </span>
              </div>

              <h2 className="text-center font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[27px]">
                Before we build your plan —{" "}
                <span className="text-[#0d7377]">read this</span>.
              </h2>

              <div className="mx-auto mt-6 max-w-[620px] space-y-4 text-center sm:mt-7 sm:space-y-4.5">
                <p className="font-body text-[15px] leading-[1.65] text-[var(--text-secondary)] sm:text-base">
                If you&apos;ve tried keto, calorie counting, or intermittent fasting and felt like you failed.
                </p>

                <p className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 font-body text-[16px] font-semibold leading-snug text-[var(--text-primary)] sm:text-[17px]">
                  You didn&apos;t fail. The plan failed you.
                </p>

                <p className="font-body text-[15px] leading-[1.65] text-[var(--text-secondary)] sm:text-base">
                  Those systems were built on old science. Fixed rules. Generic templates.
                </p>

                <p className="font-body text-[15px] leading-[1.65] text-[var(--text-secondary)] sm:text-base">
                  They were never designed for how a {genderText} body actually works.
                </p>

                <p className="font-body text-[16px] font-semibold leading-snug text-[#0d7377] sm:text-[17px]">
                  That changes right now.
                </p>

                <div className="mx-auto h-px w-14 bg-[var(--border)]" />

                <p className="font-body text-[15px] text-[var(--text-muted)] sm:text-base">
                  Answer honestly. We&apos;ll do the rest.
                </p>
              </div>
            </div>
          </div>

          <CTAButton onClick={handleContinue}>Continue</CTAButton>
        </QuizSection>
      </main>
    </div>
  );
}
