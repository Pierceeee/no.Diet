"use client";

import { useEffect, useState } from "react";
import { QuizSection, QuizTitle } from "@/components/ui/quiz-section";
import { CTAButton } from "@/components/quiz/quiz-navigation";
import { InfoCard } from "@/components/quiz/info-card";

type NumericStepProps = {
  title: string;
  value: number;
  onChange: (v: number) => void;
  onContinue: () => void;
  ctaDisabled: boolean;
  unitA?: string;
  unitB?: string;
  selectedUnit?: string;
  onUnitChange?: (v: string) => void;
  helper?: string;
  helperBody?: string;
  helperVariant?: "success" | "warning" | "danger";
  styleVariant?: "default" | "reference";
};

export function NumericStep({
  title,
  value,
  onChange,
  onContinue,
  ctaDisabled,
  unitA,
  unitB,
  selectedUnit,
  onUnitChange,
  helper,
  helperBody,
  helperVariant,
  styleVariant = "default",
}: NumericStepProps) {
  const [inputValue, setInputValue] = useState(value ? String(value) : "");
  const showReferenceStyle = styleVariant === "reference";
  const shouldShowInlineUnit =
    showReferenceStyle && unitA && unitB && selectedUnit && onUnitChange;

  useEffect(() => {
    setInputValue(value ? String(value) : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setInputValue(digits);
    onChange(digits ? Number(digits) : 0);
  };

  return (
    <QuizSection>
      <QuizTitle>{title}</QuizTitle>
      <div className={showReferenceStyle ? "mx-auto w-full max-w-[460px]" : ""}>

        {unitA && unitB && onUnitChange && (
          <div
            className={`animate-fade-in mx-auto mt-6 flex w-fit overflow-hidden border border-[#d8d8d8] bg-white ${
              showReferenceStyle
                ? "rounded-[10px] p-1"
                : "rounded-full bg-[#f5f5f5] p-1"
            } sm:mt-8`}
          >
                {[unitA, unitB].map((unit) => (
              <button
                key={unit}
                onClick={() => onUnitChange(unit)}
                className={`min-w-[70px] px-4 py-2 font-body text-sm font-semibold transition-all sm:min-w-[80px] sm:px-5 ${
                  showReferenceStyle ? "rounded-[8px]" : "rounded-full"
                } ${
                  selectedUnit === unit
                    ? "bg-[#3b82f6] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        )}

        <div className="animate-scale-in mx-auto mt-5 max-w-[230px] sm:mt-6 sm:max-w-[260px]">
          <div
            className={`${
              showReferenceStyle
                ? "border-b border-[#808080] pb-1"
                : "border-b-2 border-[var(--text-primary)] pb-2"
            }`}
          >
            <div
              className={`flex items-end justify-center ${
                shouldShowInlineUnit ? "gap-3" : ""
              }`}
            >
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputValue}
                onChange={handleChange}
                className={`bg-transparent text-center font-display text-[var(--text-primary)] outline-none ${
                  showReferenceStyle
                    ? "w-[100px] text-[42px] leading-none sm:w-[120px] sm:text-[48px]"
                    : "w-full text-5xl sm:text-6xl"
                }`}
              />
              {shouldShowInlineUnit && (
                <span className="mb-1.5 font-body text-[18px] leading-none text-[var(--text-secondary)] sm:text-[20px]">
                  {selectedUnit}
                </span>
              )}
            </div>
          </div>
        </div>

        {helper &&
          (showReferenceStyle ? (
            <div
              className={`mx-auto mt-4 max-w-[460px] rounded-[12px] px-4 py-3.5 text-left sm:mt-5 sm:px-5 sm:py-4 ${
                helperVariant === "danger"
                  ? "bg-[#f8e7e7]"
                  : helperVariant === "warning"
                  ? "bg-[#fff1dc]"
                  : helperVariant === "success"
                  ? "bg-[#dff2e3]"
                  : "bg-[#f0f0f0]"
              }`}
            >
              <p className="font-body text-[14px] font-semibold leading-tight text-[var(--text-primary)] sm:text-[15px]">
                {helper}
              </p>
              {helperBody && (
                <p className="mt-1.5 font-body text-[12px] leading-[1.4] text-[#6a6a6a] sm:text-[13px]">
                  {helperBody}
                </p>
              )}
            </div>
          ) : (
            <InfoCard helper={helper} helperBody={helperBody} variant={helperVariant} />
          ))}

        {showReferenceStyle ? (
          <button
            className="mt-5 w-full rounded-[12px] bg-[#3b82f6] px-5 py-3 font-body text-[15px] font-semibold leading-none text-white transition-all duration-200 hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[16px]"
            disabled={ctaDisabled}
            onClick={onContinue}
          >
            Continue
          </button>
        ) : (
          <CTAButton disabled={ctaDisabled} onClick={onContinue}>
            Continue
          </CTAButton>
        )}
      </div>
    </QuizSection>
  );
}
