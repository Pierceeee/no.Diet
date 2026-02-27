"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";

export default function EmailPage() {
  const router = useRouter();
  const { email, setEmail } = useQuiz();

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3 sm:px-5 sm:py-4">
          <p className="font-display text-xl tracking-tight text-[#1a1a1a] italic sm:text-2xl">
            no.Diet
          </p>
        </div>
        <div className="h-[3px] w-full bg-[#3bb44a]" />
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-5 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="w-full text-center">
          {/* Title */}
          <div className="animate-fade-in-up">
            <h1 className="font-display text-[24px] font-bold leading-tight text-[#1a1a1a] sm:text-[30px] md:text-[36px]">
              Your plan is ready.
            </h1>
            <h1 className="font-display text-[24px] font-bold leading-tight text-[#3bb44a] sm:text-[30px] md:text-[36px]">
              One step to unlock it.
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up mx-auto mt-4 max-w-[460px] font-body text-sm leading-relaxed text-[#666] sm:mt-5 sm:text-base"
            style={{ animationDelay: "0.05s", opacity: 0 }}
          >
            Your Mediterranean Coach has been built around your body, your goals, and your history.
          </p>

          {/* Email input */}
          <div
            className="animate-fade-in-up mx-auto mt-8 max-w-[500px] sm:mt-10"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-[#d0d0d0] bg-white px-6 py-3.5 font-body text-base text-[#1a1a1a] outline-none transition-all placeholder:text-[#999] focus:border-[#3bb44a] focus:shadow-[0_0_0_3px_rgba(59,180,74,0.15)] sm:py-4 sm:text-lg"
              placeholder="Your email"
            />
          </div>

          {/* CTA Button */}
          <div
            className="animate-fade-in-up mx-auto mt-5 max-w-[500px] sm:mt-6"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            <button
              className="w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#3bb44a] disabled:hover:shadow-none disabled:active:scale-100 sm:px-6 sm:py-4 sm:text-lg"
              disabled={!/\S+@\S+\.\S+/.test(email)}
              onClick={() => router.push("/summary")}
            >
              Unlock My Personalized Program →
            </button>
          </div>

          {/* Info text */}
          <div
            className="animate-fade-in-up mx-auto mt-8 max-w-[480px] rounded-xl bg-[#f8f8f8] p-4 text-left sm:mt-10 sm:p-5"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <p className="font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
              This isn&apos;t a static meal plan.
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
              It&apos;s the beginning of your personalization.
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
              Your coach learns as you progress. Every week it gets smarter — refining recommendations, adjusting to your results, improving until it works perfectly for you.
            </p>
          </div>

          {/* Privacy text */}
          <div
            className="animate-fade-in mx-auto mt-6 max-w-[480px] text-center sm:mt-8"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            <p className="font-body text-xs leading-relaxed text-[#888] sm:text-sm">
              🔒 Your email is used only to deliver your plan.
            </p>
            <p className="mt-1 font-body text-xs leading-relaxed text-[#888] sm:text-sm">
              We will never sell, rent, or share your information.
            </p>
            <p className="mt-1 font-body text-xs font-medium leading-relaxed text-[#666] sm:text-sm">
              That&apos;s our commitment to you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
