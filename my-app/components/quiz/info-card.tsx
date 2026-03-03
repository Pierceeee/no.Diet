type InfoCardVariant = "success" | "warning" | "danger";

const variantStyles: Record<
  InfoCardVariant,
  {
    container: string;
    bar: string;
    icon: string;
    text: string;
  }
> = {
  success: {
    container:
      "border-[#3bb44a]/20 bg-[linear-gradient(145deg,#f0fdf4_0%,#dcfce7_45%,#ffffff_100%)] shadow-[0_14px_34px_rgba(59,180,74,0.15)]",
    bar: "bg-[linear-gradient(90deg,#22c55e_0%,#4ade80_45%,#86efac_100%)]",
    icon: "bg-[linear-gradient(145deg,#22c55e_0%,#4ade80_100%)] shadow-[0_8px_16px_rgba(34,197,94,0.35)]",
    text: "text-[#3f5f45]",
  },
  warning: {
    container:
      "border-[#f59e0b]/20 bg-[linear-gradient(145deg,#fffbeb_0%,#fef3c7_45%,#ffffff_100%)] shadow-[0_14px_34px_rgba(245,158,11,0.15)]",
    bar: "bg-[linear-gradient(90deg,#f59e0b_0%,#fbbf24_45%,#fcd34d_100%)]",
    icon: "bg-[linear-gradient(145deg,#f59e0b_0%,#fbbf24_100%)] shadow-[0_8px_16px_rgba(245,158,11,0.35)]",
    text: "text-[#78350f]",
  },
  danger: {
    container:
      "border-[#ef4444]/20 bg-[linear-gradient(145deg,#fef2f2_0%,#fecaca_45%,#ffffff_100%)] shadow-[0_14px_34px_rgba(239,68,68,0.15)]",
    bar: "bg-[linear-gradient(90deg,#ef4444_0%,#f87171_45%,#fca5a5_100%)]",
    icon: "bg-[linear-gradient(145deg,#ef4444_0%,#f87171_100%)] shadow-[0_8px_16px_rgba(239,68,68,0.35)]",
    text: "text-[#7f1d1d]",
  },
};

export function InfoCard({
  helper,
  helperBody,
  variant = "success",
}: {
  helper: string;
  helperBody?: string;
  variant?: InfoCardVariant;
}) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`animate-fade-in-up relative mx-auto mt-5 max-w-[520px] overflow-hidden rounded-2xl border p-4 text-left sm:mt-6 sm:p-5 ${styles.container}`}
      style={{ animationDelay: "0.1s", opacity: 0 }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${styles.bar}`}
      />
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 text-base text-white ${styles.icon}`}
        >
          💡
        </span>
        <div>
          <p className="font-body text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-base">
            {helper}
          </p>
          {helperBody && (
            <p
              className={`mt-1.5 font-body text-[13px] leading-[1.6] tracking-[-0.01em] sm:text-sm ${styles.text}`}
            >
              {helperBody}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
