"use client";

import type { JSX } from "react";
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
  const blocks = title.split("\n\n");
  
  return blocks.map((block, blockIndex) => {
    const isAccent = block === block.toUpperCase() && block.length > 3;
    
    const parts = block.split(/\{\{(.*?)\}\}/g);
    const rendered = parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-semibold text-[#2f6ebf]">
          {part}
        </span>
      ) : (
        part
      )
    );

    const withLineBreaks = rendered.flatMap((part, i) => {
      if (typeof part !== "string") return part;
      const lines = part.split("\n");
      if (lines.length === 1) return part;
      return lines.flatMap((line, j) =>
        j < lines.length - 1 ? [line, <br key={`br-${i}-${j}`} />] : [line]
      );
    });

    if (isAccent) {
      return (
        <span
          key={blockIndex}
          className="mt-3 block text-[#2f6ebf]"
        >
          {withLineBreaks}
        </span>
      );
    }

    return (
      <span key={blockIndex} className={blockIndex > 0 ? "mt-2 block" : ""}>
        {withLineBreaks}
      </span>
    );
  });
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
          <strong key={`b-${idx}-${j}`} className="font-semibold text-[var(--text-primary)]">
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
          <span key={`h-${idx}-${j}`} className="text-[#2f6ebf]">
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
          className="font-body text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-base"
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
            <p className="font-body text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-base">
              {renderTextWithFormatting(intro)}
            </p>
          )}
          <ul className="mt-2.5 space-y-2.5">
            {bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#2f6ebf]/30 bg-[#2f6ebf]/10 text-xs font-semibold text-[#2f6ebf]">
                  ✓
                </span>
                <span className="font-body text-[15px] leading-[1.6] tracking-[-0.01em] text-[var(--text-secondary)] sm:text-base">
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
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 font-body text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-base"
        >
          {renderTextWithFormatting(text)}
        </p>
      );
    }

    return (
      <p
        key={i}
        className="font-body text-[15px] leading-[1.65] tracking-[-0.01em] text-[var(--text-secondary)] sm:text-base"
      >
        {renderTextWithFormatting(p)}
      </p>
    );
  };

  return (
    <QuizSection>
      <div className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-md)] sm:rounded-3xl">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#2f6ebf]/8 blur-2xl" />
        
        {image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 520px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="h-1 w-full bg-gradient-to-r from-[#2f6ebf] via-[#4a8ad4] to-[#2f6ebf]" />
        )}

        <div className="relative p-5 sm:p-6">
          <div className="mb-3 inline-flex items-center rounded-full border border-[#2f6ebf]/20 bg-[#2f6ebf]/6 px-3 py-1">
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-[#2f6ebf]">
              Personalized insight
            </span>
          </div>

          <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl">
            {parseTitle(title)}
          </h2>

          <div className="info-block-text stagger-children mx-auto mt-4 max-w-[620px] space-y-3.5 sm:mt-5 sm:space-y-4">
            {paragraphs.map((p, i) => renderParagraph(p, i))}
          </div>
        </div>
      </div>

      <CTAButton onClick={onContinue}>Continue</CTAButton>
    </QuizSection>
  );
}
