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
      <div className="animate-fade-in-up relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-[linear-gradient(145deg,#fff8f4_0%,#ffe7de_40%,#ffffff_100%)] p-5 shadow-[0_20px_44px_rgba(200,85,58,0.18)] sm:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#c8553a_0%,#dd6b4f_45%,#e8a838_100%)]" />

        <div className="inline-flex items-center rounded-full border border-white/60 bg-[linear-gradient(145deg,#c8553a_0%,#dd6b4f_100%)] px-3 py-1 text-white shadow-[0_10px_20px_rgba(200,85,58,0.3)]">
          <span className="text-sm">🔥</span>
        </div>

        <h2 className="mt-3 font-display text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl md:text-[27px]">
          ☝️ {title}
        </h2>

        {image && (
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--accent)]/20 shadow-[0_10px_24px_rgba(200,85,58,0.14)] sm:mt-5">
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
                  className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base"
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
                  className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base"
                >
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="font-bold text-[var(--text-primary)]">
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
                className="font-body text-sm leading-relaxed text-[#5f4e45] sm:text-base"
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
