"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";
import { preloadForGender, preloadInfoImages } from "@/lib/preload-images";
import { QuizSection } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";
import { Logo } from "@/components/ui/logo";

export default function IntroPage() {
  const router = useRouter();
  const { answers, setStep } = useQuiz();

  useEffect(() => {
    preloadForGender(answers.gender);
    preloadInfoImages();
  }, [answers.gender]);

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
          <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-[#d8e5f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] shadow-[0_16px_36px_rgba(47,110,191,0.12)]">
            <div className="h-2 w-full bg-gradient-to-r from-[#2f6ebf] via-[#4a8ad4] to-[#7bb0e8]" />

            <div className="px-6 py-6 sm:px-7 sm:py-7">
              <h2 className="font-heading text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px]">
                Before we build your plan — <span className="text-[#2f6ebf]">READ THIS</span>.
              </h2>

              <div className="mt-4 space-y-3.5">
                <p className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]">
                  If you&apos;ve tried keto, calorie counting, or intermittent fasting and felt like you failed.
                </p>

                <p className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]">
                  You didn&apos;t fail. The plan failed you.
                </p>

                <p className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]">
                  Those systems were built on old science. Fixed rules. Generic templates.
                </p>

                <p className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]">
                  They were never designed for how a {genderText} body actually works.
                </p>

                <p className="font-body text-[15px] font-semibold leading-relaxed text-[#2f6ebf]">
                  That changes right now.
                </p>

                <div className="h-px w-16 bg-[#d4e2f2]" />

                <p className="font-body text-[14px] font-semibold leading-snug text-[var(--text-secondary)]">
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
