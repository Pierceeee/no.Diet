export function QuizSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-[680px] px-1 text-center sm:px-0">{children}</section>
  );
}

export function QuizTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="animate-fade-in-up font-body text-[22px] font-extrabold leading-snug text-[var(--text-primary)] sm:text-[26px] md:text-[32px]">
      {children}
    </h2>
  );
}
