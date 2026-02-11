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
            <h1 className="font-body text-[26px] font-extrabold leading-tight text-[#1a1a1a] sm:text-[32px] md:text-[38px]">
              Enter your email to get your
            </h1>
            <h1 className="font-body text-[26px] font-extrabold leading-tight text-[#3bb44a] sm:text-[32px] md:text-[38px]">
              Personalized no.Diet Plan
            </h1>
          </div>

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
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <button
              className="w-full rounded-[12px] bg-[#3bb44a] px-5 py-3.5 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#3bb44a] disabled:hover:shadow-none disabled:active:scale-100 sm:px-6 sm:py-4 sm:text-lg"
              disabled={!/\S+@\S+\.\S+/.test(email)}
              onClick={() => router.push("/summary")}
            >
              Claim my plan
            </button>
          </div>

          {/* Privacy text */}
          <p
            className="animate-fade-in mx-auto mt-4 max-w-[480px] text-center font-body text-[11px] leading-relaxed text-[#999] sm:mt-5 sm:text-xs"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            By continuing this, you agree to our Privacy policy. We respect your
            privacy. We will never sell, rent or share your email address.
            That&apos;s more than a policy, it&apos;s our personal guarantee!
          </p>
        </div>
      </main>
    </div>
  );
}
