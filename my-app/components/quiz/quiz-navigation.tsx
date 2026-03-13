import { motion, useReducedMotion } from "framer-motion";

export function CTAButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const hoverMotion =
    disabled || prefersReducedMotion
      ? undefined
      : {
          scale: 1.005,
          transition: {
            duration: 0.25,
            ease: smoothEase,
          },
        };

  const tapMotion =
    disabled || prefersReducedMotion ? undefined : { scale: 0.992 };

  return (
    <div className="sticky bottom-0 z-10 -mx-1 mt-6 sm:mt-8">
      <div className="pointer-events-none h-6 bg-gradient-to-t from-white to-transparent" />
      <div className="bg-white pb-4 pt-1 sm:pb-6">
        <motion.button
          className="w-full rounded-[12px] bg-[#2f6ebf] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#245ba3] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#2f6ebf] disabled:active:scale-100 sm:px-6 sm:py-4 sm:text-lg"
          whileHover={hoverMotion}
          whileTap={tapMotion}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: smoothEase }
          }
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </motion.button>
      </div>
    </div>
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
          ? "border-[#2f6ebf] bg-[#2f6ebf]"
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
