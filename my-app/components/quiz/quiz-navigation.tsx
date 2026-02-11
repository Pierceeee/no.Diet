export function CTAButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="mt-6 w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#3bb44a] disabled:active:scale-100 sm:mt-8 sm:px-6 sm:py-4 sm:text-lg"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Chevron() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4L12 9L7 14" />
      </svg>
    </span>
  );
}

export function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
        checked
          ? "border-[#3bb44a] bg-[#3bb44a]"
          : "border-[#d0d0d0] bg-white"
      }`}
    >
      {checked && (
        <svg
          className="animate-check-pop h-3 w-3 text-white"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6L5 8.5L9.5 3.5" />
        </svg>
      )}
    </span>
  );
}
