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
          <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
            <div className="h-6 w-full bg-gradient-to-r from-[#2f6ebf] via-[#4a8ad4] to-[#2f6ebf]" />

            <div className="px-6 py-5">
              <h2 className="font-heading text-[22px] font-extrabold leading-tight text-[var(--text-primary)]">
                Before we build your plan —{" "}
                <span className="text-[#2f6ebf]">READ THIS</span>.
              </h2>

              <div className="mt-4 space-y-3">
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

                <div className="h-px w-14 bg-[var(--border)]" />

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
