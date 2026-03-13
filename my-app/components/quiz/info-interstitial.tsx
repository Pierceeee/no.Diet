"use client";

import type { JSX } from "react";
import { QuizSection } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";
import { useIntlayer } from "next-intlayer";
import { toStr } from "@/lib/utils";

interface InfoInterstitialProps {
  // Accept intlayer node proxies (which have a .value property) or plain strings
  title: unknown;
  body: unknown;
  image?: unknown;
  eyebrow?: string;
  highlight?: string;
  onContinue: () => void;
}


function parseTitle(title: unknown) {
  const blocks = toStr(title).split("\n\n");
  
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
          className="mt-1 block text-[#2f6ebf]"
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

function renderTextWithFormatting(text: unknown) {
  const str = toStr(text);
  const hasBold = str.includes("**");
  const hasHighlight = str.includes("{{");

  if (!hasBold && !hasHighlight) return str;

  let result: (string | JSX.Element)[] = [str];

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
  eyebrow,
  highlight,
  onContinue,
}: InfoInterstitialProps) {
  const t = useIntlayer("quiz");
  const bodyStr = toStr(body);
  const imageStr = image ? toStr(image) : undefined;
  const paragraphs = bodyStr.split("\n\n").filter(Boolean);
  const showEyebrowBadge = Boolean(eyebrow) || Boolean(imageStr);

  const renderParagraph = (p: string, i: number) => {
    const isSubheading = p.startsWith("## ");
    if (isSubheading) {
      const headingText = p.slice(3);
      return (
        <p
          key={i}
          className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]"
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
            <p className="font-body mb-3 text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]">
              {renderTextWithFormatting(intro)}
            </p>
          )}
          <ul className="mt-2.5 space-y-2.5">
            {bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#2f6ebf]">
                  <span
                    className="text-[10px] font-bold leading-none text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </span>
                <span className="font-body text-[14px] font-semibold leading-snug text-[var(--text-secondary)]">
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
          className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]"
        >
          {renderTextWithFormatting(text)}
        </p>
      );
    }

    return (
      <p
        key={i}
        className="font-body text-[15px] font-semibold leading-relaxed text-[var(--text-primary)]"
      >
        {renderTextWithFormatting(p)}
      </p>
    );
  };

  return (
    <QuizSection>
      <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-[#d8e5f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] shadow-[0_16px_36px_rgba(47,110,191,0.12)]">
        {imageStr ? (
          <div className="flex items-center justify-center overflow-hidden border-b border-[#d9e6f5] bg-gradient-to-br from-[#e8f0fb] to-[#dbe8f8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageStr}
              alt=""
              className="h-auto w-full"
              loading="eager"
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center border-b border-[#d9e6f5] bg-gradient-to-br from-[#e8f0fb] to-[#dbe8f8]">
            <div className="rounded-full border border-[#2f6ebf]/20 bg-white px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.06em] text-[#2f6ebf]">
              {t.infoBlocks.eyebrow}
            </div>
          </div>
        )}

        <div className="px-6 py-6 sm:px-7 sm:py-7">
          {showEyebrowBadge && (
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-center">
              <span className="rounded-full border border-[#cfe0f4] bg-[#edf4fc] px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2f6ebf]">
                {eyebrow ?? t.infoBlocks.eyebrow}
              </span>
              {highlight && (
                <span className="rounded-full border border-[#e1ebf8] bg-white px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                  {highlight}
                </span>
              )}
            </div>
          )}

          <h2 className="font-heading mb-2.5 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px]">
            {parseTitle(title)}
          </h2>

          <div className="info-block-text space-y-3.5">
            {paragraphs.map((p, i) => renderParagraph(p, i))}
          </div>
        </div>
      </div>

      <CTAButton onClick={onContinue}>{t.common.continue}</CTAButton>
    </QuizSection>
  );
}
