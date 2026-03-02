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

function parseTitle(title: string) {
  const parts = title.split(/\{\{(.*?)\}\}/g);
  if (parts.length === 1) return title;

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-[#0d7377]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function renderTextWithFormatting(text: string) {
  const hasBold = text.includes("**");
  const hasHighlight = text.includes("{{");

  if (!hasBold && !hasHighlight) return text;

  let result: (string | JSX.Element)[] = [text];

  if (hasBold) {
    result = result.flatMap((part, idx) => {
      if (typeof part !== "string") return part;
      const segments = part.split(/\*\*(.*?)\*\*/g);
      return segments.map((seg, j) =>
        j % 2 === 1 ? (
          <strong key={`b-${idx}-${j}`} className="font-bold text-[var(--text-primary)]">
            {seg}
          </strong>
        ) : (
          seg
        )
      );
    });
  }

  if (hasHighlight) {
    result = result.flatMap((part, idx) => {
      if (typeof part !== "string") return part;
      const segments = part.split(/\{\{(.*?)\}\}/g);
      return segments.map((seg, j) =>
        j % 2 === 1 ? (
          <span key={`h-${idx}-${j}`} className="text-[#0d7377]">
            {seg}
          </span>
        ) : (
          seg
        )
      );
    });
  }

  return result;
}

export function InfoInterstitial({
  title,
  body,
  image,
  onContinue,
}: InfoInterstitialProps) {
  const paragraphs = body.split("\n\n").filter(Boolean);

  const renderParagraph = (p: string, i: number) => {
    const isSubheading = p.startsWith("## ");
    if (isSubheading) {
      const headingText = p.slice(3);
      return (
        <p
          key={i}
          className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base"
        >
          {renderTextWithFormatting(headingText)}
        </p>
      );
    }

    const isBulletList = p.includes("\n- ") || p.startsWith("- ") || p.includes("\n✓ ") || p.startsWith("✓ ");
    if (isBulletList) {
      const lines = p.split("\n");
      const bullets: string[] = [];
      let intro = "";

      for (const line of lines) {
        if (line.startsWith("- ") || line.startsWith("✓ ")) {
          bullets.push(line.replace(/^[-✓]\s*/, ""));
        } else if (bullets.length === 0) {
          intro = line;
        }
      }

      return (
        <div key={i}>
          {intro && (
            <p className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base">
              {renderTextWithFormatting(intro)}
            </p>
          )}
          <ul className="mt-2 space-y-2">
            {bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d7377] text-xs text-white">
                  ✓
                </span>
                <span className="font-body text-sm leading-relaxed text-gray-600 sm:text-base">
                  {renderTextWithFormatting(bullet)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const isBold = p.startsWith("**") && p.endsWith("**");
    if (isBold) {
      const text = p.slice(2, -2);
      return (
        <p
          key={i}
          className="font-body text-sm font-bold leading-relaxed text-[var(--text-primary)] sm:text-base"
        >
          {renderTextWithFormatting(text)}
        </p>
      );
    }

    return (
      <p
        key={i}
        className="font-body text-sm leading-relaxed text-gray-600 sm:text-base"
      >
        {renderTextWithFormatting(p)}
      </p>
    );
  };

  return (
    <QuizSection>
      <div className="animate-fade-in-up overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:p-6">
        {image && (
          <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/10] w-[calc(100%+2.5rem)] overflow-hidden sm:-mx-6 sm:-mt-6 sm:mb-6 sm:w-[calc(100%+3rem)]">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 520px"
            />
          </div>
        )}

        <h2 className="font-display text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl">
          {parseTitle(title)}
        </h2>

        <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
          {paragraphs.map((p, i) => renderParagraph(p, i))}
        </div>
      </div>

      <CTAButton onClick={onContinue}>Continue</CTAButton>
    </QuizSection>
  );
}
