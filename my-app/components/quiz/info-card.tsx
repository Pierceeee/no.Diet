export function InfoCard({
  helper,
  helperBody,
}: {
  helper: string;
  helperBody?: string;
}) {
  return (
    <div
      className="animate-fade-in-up mx-auto mt-5 max-w-[520px] rounded-[10px] bg-[#f5f5f5] p-3 text-left sm:mt-6 sm:rounded-[12px] sm:p-4"
      style={{ animationDelay: "0.1s", opacity: 0 }}
    >
      <p className="font-body text-[13px] font-semibold text-[var(--text-primary)] sm:text-sm">
        {helper}
      </p>
      {helperBody && (
        <p className="mt-1 font-body text-[11px] leading-relaxed text-[var(--text-secondary)] sm:mt-1.5 sm:text-xs">
          {helperBody}
        </p>
      )}
    </div>
  );
}
