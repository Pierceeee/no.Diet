"use client";

import { useState, useEffect } from "react";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [seconds, setSeconds] = useState(15 * 60 - 3); // 14:57

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sticky discount banner */}
      <header className="sticky top-0 z-30 bg-[#e8f5e9]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3">
          <div>
            <p className="font-body text-[11px] text-[#3bb44a] sm:text-[13px]">
              50% discount reserved for:
            </p>
            <p className="font-body text-[22px] font-extrabold leading-tight text-[var(--text-primary)] sm:text-[28px]">
              {timeStr}
            </p>
          </div>
          <a
            href="#get-plan"
            className="rounded-[8px] bg-[#3bb44a] px-4 py-2.5 font-body text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#33a041] hover:shadow-lg sm:px-6 sm:py-3 sm:text-[13px]"
          >
            GET MY PLAN
          </a>
        </div>
        {/* Green progress bar full width */}
        <div className="h-[3px] w-full bg-[#3bb44a]" />
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-12 pt-6 sm:px-5 sm:pb-20 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
