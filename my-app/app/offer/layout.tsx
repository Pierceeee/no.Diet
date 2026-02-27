"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function getDiscountInfo(pathname: string) {
  if (pathname.includes("/discount3") || pathname.includes("/nonbuyers")) {
    return { percent: 65, color: "#1565c0", bgColor: "#e3f2fd" };
  }
  if (pathname.includes("/discount2")) {
    return { percent: 60, color: "#1565c0", bgColor: "#e3f2fd" };
  }
  if (pathname.includes("/discount1")) {
    return { percent: 55, color: "#3bb44a", bgColor: "#e8f5e9" };
  }
  return { percent: 50, color: "#3bb44a", bgColor: "#e8f5e9" };
}

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [seconds, setSeconds] = useState(15 * 60 - 3);

  const discountInfo = getDiscountInfo(pathname);
  const isNonbuyers = pathname.includes("/nonbuyers");

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  if (isNonbuyers) {
    return (
      <div className="min-h-[100dvh] bg-white">
        <header className="sticky top-0 z-30 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3 sm:px-5 sm:py-4">
            <p className="font-display text-xl tracking-tight text-[#1a1a1a] italic sm:text-2xl">
              no.Diet
            </p>
          </div>
          <div className="h-[3px] w-full bg-[#e8e8e8]" />
        </header>

        <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-12 pt-6 sm:px-5 sm:pb-20 sm:pt-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <header
        className="sticky top-0 z-30"
        style={{ backgroundColor: discountInfo.bgColor }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3">
          <div>
            <p
              className="font-body text-[11px] sm:text-[13px]"
              style={{ color: discountInfo.color }}
            >
              {discountInfo.percent}% discount reserved for:
            </p>
            <p className="font-body text-[22px] font-extrabold leading-tight text-[var(--text-primary)] sm:text-[28px]">
              {timeStr}
            </p>
          </div>
          <a
            href="#get-plan"
            className="rounded-[8px] px-4 py-2.5 font-body text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg sm:px-6 sm:py-3 sm:text-[13px]"
            style={{ backgroundColor: discountInfo.color }}
          >
            GET MY PLAN
          </a>
        </div>
        <div
          className="h-[3px] w-full"
          style={{ backgroundColor: discountInfo.color }}
        />
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-12 pt-6 sm:px-5 sm:pb-20 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
