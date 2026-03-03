export function QuizSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-[680px] px-1 text-center sm:px-0">{children}</section>
  );
}

export function QuizTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="animate-fade-in-up font-display text-[22px] font-bold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px] md:text-[32px]">
      {children}
    </h2>
  );
}
