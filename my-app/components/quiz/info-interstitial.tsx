"use client";

import Image from "next/image";
import { QuizSection } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";

interface InfoInterstitialProps {
  title: string;
  body: string;
  image?: string;
  onContinue: () => void;
}

export function InfoInterstitial({
  title,
  body,
  image,
  onContinue,
}: InfoInterstitialProps) {
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <QuizSection>
      <div className="animate-fade-in-up rounded-2xl border-l-4 border-[var(--accent)] bg-[#f8f8f8] p-5 sm:rounded-3xl sm:p-7">
        <h2 className="font-display text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl md:text-[26px]">
          ☝️ {title}
        </h2>

        {image && (
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl sm:mt-5">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 520px"
            />
          </div>
        )}

        <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
          {paragraphs.map((p, i) => {
            const isBold = p.startsWith("**") && p.endsWith("**");
            const text = isBold ? p.slice(2, -2) : p;
            const hasBoldParts = p.includes("**");

            if (isBold) {
              return (
                <p
                  key={i}
                  className="font-body text-sm font-semibold text-[var(--text-primary)] sm:text-base"
                >
                  {text}
                </p>
              );
            }

            if (hasBoldParts) {
              const parts = p.split(/\*\*(.*?)\*\*/g);
              return (
                <p
                  key={i}
                  className="font-body text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
                >
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="font-semibold text-[var(--text-primary)]">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            }

            return (
              <p
                key={i}
                className="font-body text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
              >
                {p}
              </p>
            );
          })}
        </div>
      </div>

      <CTAButton onClick={onContinue}>Continue</CTAButton>
    </QuizSection>
  );
}
