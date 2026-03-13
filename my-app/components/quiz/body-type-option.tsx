import { motion, useReducedMotion } from "framer-motion";

export function OptionCard({
  children,
  onClick,
  selected = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <motion.button
      className={`option-card group w-full rounded-[12px] border px-4 py-3.5 text-left transition-all duration-300 ease-out sm:px-5 sm:py-4 ${
        selected
          ? "border-[#2f6ebf] bg-[#eef4fb] shadow-sm"
          : "border-transparent bg-[#f5f5f5] hover:bg-[#eeeeee]"
      }`}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.005,
              transition: {
                duration: 0.25,
                ease: smoothEase,
              },
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: smoothEase }
      }
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
