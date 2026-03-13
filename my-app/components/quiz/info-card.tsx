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
      "border-[#2f6ebf]/20 bg-[linear-gradient(145deg,#eef4fb_0%,#dbe8f8_45%,#ffffff_100%)] shadow-[0_14px_34px_rgba(47,110,191,0.15)]",
    bar: "bg-[linear-gradient(90deg,#2f6ebf_0%,#4a8ad4_45%,#7bb0e8_100%)]",
    icon: "bg-[linear-gradient(145deg,#2f6ebf_0%,#4a8ad4_100%)] shadow-[0_8px_16px_rgba(47,110,191,0.35)]",
    text: "text-[#1e3a5f]",
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
      "border-[#2f6ebf]/20 bg-[linear-gradient(145deg,#eef4fb_0%,#dbe8f8_45%,#ffffff_100%)] shadow-[0_14px_34px_rgba(47,110,191,0.15)]",
    bar: "bg-[linear-gradient(90deg,#2f6ebf_0%,#4a8ad4_45%,#7bb0e8_100%)]",
    icon: "bg-[linear-gradient(145deg,#2f6ebf_0%,#4a8ad4_100%)] shadow-[0_8px_16px_rgba(47,110,191,0.35)]",
    text: "text-[#1e3a5f]",
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
      className={`animate-fade-in-up relative mx-auto mt-5 max-w-[520px] overflow-hidden rounded-3xl border p-4 text-left sm:mt-6 sm:p-5 ${styles.container}`}
      style={{ animationDelay: "0.1s", opacity: 0 }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 ${styles.bar}`}
      />
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/70 text-base text-white ${styles.icon}`}
          aria-hidden="true"
        >
          💡
        </span>
        <div>
          <p className="font-body text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text-primary)] sm:text-[17px]">
            {helper}
          </p>
          {helperBody && (
            <p
              className={`mt-2 font-body text-[13px] leading-[1.6] tracking-[-0.01em] sm:text-sm ${styles.text}`}
            >
              {helperBody}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
