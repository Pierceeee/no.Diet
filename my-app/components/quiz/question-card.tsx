import { QuizSection, QuizTitle } from "@/components/ui/quiz-section";
import { OptionCard } from "@/components/quiz/body-type-option";
import { Chevron } from "@/components/quiz/quiz-navigation";

type SingleChoiceProps = {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
  subtitle?: string;
  descriptions?: string[];
  emojis?: string[];
};

export function SingleChoiceStep({
  title,
  options,
  onSelect,
  subtitle,
  descriptions = [],
  emojis = [],
}: SingleChoiceProps) {
  return (
    <QuizSection>
      <QuizTitle>{title}</QuizTitle>
      {subtitle && (
        <p className="mt-2 font-body text-base text-[var(--text-secondary)]">
          {subtitle}
        </p>
      )}
      <div className="stagger-children mt-8 space-y-3">
        {options.map((item, idx) => (
          <OptionCard key={item} onClick={() => onSelect(item)}>
            <span className="flex items-center justify-between gap-3">
              <span className="text-left">
                <span className="block font-body text-base font-medium text-[var(--text-primary)] sm:text-lg">
                  {item}
                </span>
                {descriptions[idx] && (
                  <span className="mt-0.5 block font-body text-sm text-[var(--text-muted)]">
                    {descriptions[idx]}
                  </span>
                )}
              </span>
              {emojis[idx] ? (
                <span className="text-2xl sm:text-3xl">{emojis[idx]}</span>
              ) : (
                <Chevron />
              )}
            </span>
          </OptionCard>
        ))}
      </div>
    </QuizSection>
  );
}
