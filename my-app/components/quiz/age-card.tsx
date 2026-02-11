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
}: NumericStepProps) {
  return (
    <QuizSection>
      <QuizTitle>{title}</QuizTitle>

      {unitA && unitB && onUnitChange && (
        <div className="animate-fade-in mx-auto mt-6 flex w-fit overflow-hidden rounded-full border border-[#e0e0e0] bg-[#f5f5f5] p-1 sm:mt-8">
          {[unitA, unitB].map((unit) => (
            <button
              key={unit}
              onClick={() => onUnitChange(unit)}
              className={`min-w-[70px] rounded-full px-4 py-2 font-body text-sm font-semibold transition-all sm:min-w-[80px] sm:px-5 ${
                selectedUnit === unit
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      )}

      <div className="animate-scale-in mx-auto mt-6 max-w-[260px] sm:mt-8 sm:max-w-[300px]">
        <div className="border-b-2 border-[var(--text-primary)] pb-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full bg-transparent text-center font-display text-5xl text-[var(--text-primary)] outline-none sm:text-6xl"
          />
        </div>
      </div>

      {helper && <InfoCard helper={helper} helperBody={helperBody} />}

      <CTAButton disabled={ctaDisabled} onClick={onContinue}>
        Continue
      </CTAButton>
    </QuizSection>
  );
}
