import { useEffect } from "react";

/**
 * Keyboard navigation hook for the quiz.
 * - Enter key triggers the onContinue callback (if provided and enabled).
 */
export function useQuizKeyboard({
  onContinue,
  enabled = true,
}: {
  onContinue?: () => void;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled || !onContinue) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onContinue();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onContinue, enabled]);
}
