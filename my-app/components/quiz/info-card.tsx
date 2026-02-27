export function InfoCard({
  helper,
  helperBody,
}: {
  helper: string;
  helperBody?: string;
}) {
  return (
    <div
      className="animate-fade-in-up relative mx-auto mt-5 max-w-[520px] overflow-hidden rounded-2xl border border-[var(--accent)]/20 bg-[linear-gradient(145deg,#fff7f3_0%,#ffe9e2_45%,#ffffff_100%)] p-4 text-left shadow-[0_14px_34px_rgba(200,85,58,0.18)] sm:mt-6 sm:p-5"
      style={{ animationDelay: "0.1s", opacity: 0 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#c8553a_0%,#d97858_45%,#e8a838_100%)]" />
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(145deg,#c8553a_0%,#d97858_100%)] text-base text-white shadow-[0_8px_16px_rgba(200,85,58,0.35)]">
          💡
        </span>
        <div>
          <p className="font-body text-sm font-bold leading-snug text-[var(--text-primary)] sm:text-base">
            {helper}
          </p>
          {helperBody && (
            <p className="mt-1.5 font-body text-xs leading-relaxed text-[#5f4e45] sm:text-sm">
              {helperBody}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
