"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz-context";

export default function LandingPage() {
  const router = useRouter();
  const { setGender, setStep } = useQuiz();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGender = (gender: "male" | "female") => {
    setGender(gender);
    setStep(1);
    router.push("/quiz");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      {/* ─── Header ─── */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-20">
        <span className="text-[22px] font-black tracking-tight text-black" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          no.Diet
        </span>
        {/* Hamburger menu */}
        <button
          className="flex flex-col items-center gap-[6px] p-2"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-[2.5px] w-7 rounded-full bg-black" />
          <span className="block h-[2.5px] w-7 rounded-full bg-black" />
          <span className="block h-[2.5px] w-7 rounded-full bg-black" />
        </button>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[320px] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-5 py-5">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <nav className="flex flex-col px-6">
          {[
            { label: "Help Center", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Privacy Settings", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="border-b border-gray-100 py-4 font-body text-[15px] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex flex-1 flex-col items-center px-4 pb-10 sm:px-6 sm:pb-16">
        {/* Hero Image - Mediterranean food bowl */}
        <div className="relative flex w-full justify-center">
          <div className="relative h-[200px] w-[280px] overflow-hidden rounded-2xl xs:h-[230px] xs:w-[320px] sm:h-[280px] sm:w-[380px] md:h-[320px] md:w-[440px] lg:h-[360px] lg:w-[500px]">
            <Image
              src="/quiz/6.png"
              alt="Mediterranean food bowl"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 500px"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 max-w-[600px] text-center sm:mt-8 md:mt-10">
          <h1 className="font-display text-[22px] font-bold leading-[1.2] text-black sm:text-[28px] md:text-[34px] lg:text-[38px]">
            Let&apos;s personalize your Mediterranean Coach and build your program for weight-loss and longevity nutrition
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-5 text-center font-body text-[15px] font-medium text-gray-600 sm:mt-6 sm:text-base">
          Select your program :
        </p>

        {/* CTA Buttons */}
        <div className="mt-5 flex w-full max-w-[440px] flex-col items-center gap-3 px-4 sm:mt-6 sm:flex-row sm:gap-5 sm:px-0">
          {/* Program for Men - green button */}
          <button
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#3bb44a] font-body text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#33a041] hover:shadow-lg active:scale-[0.98] sm:w-[200px]"
            onClick={() => handleGender("male")}
          >
            <span>👨</span> Program for Men
          </button>

          {/* Program for Women - yellow/gold button */}
          <button
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#f9c823] font-body text-[15px] font-semibold text-black transition-all duration-200 hover:bg-[#e6b71e] hover:shadow-lg active:scale-[0.98] sm:w-[200px]"
            onClick={() => handleGender("female")}
          >
            <span>👩</span> Program for Women
          </button>
        </div>

        {/* Disclaimer Block */}
        <div className="mx-auto mt-8 max-w-[540px] rounded-2xl border-l-4 border-[#e74c3c] bg-[#fef5f5] p-5 text-left sm:mt-10 sm:rounded-3xl sm:p-6">
          <p className="font-body text-sm font-bold text-[#1a1a1a] sm:text-base">
            ‼️ Before we build your plan — read this.
          </p>
          <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-[#444] sm:text-[15px]">
            <p>
              If you&apos;ve tried keto, calorie counting, or intermittent fasting and felt like you failed.
            </p>
            <p className="font-semibold text-[#1a1a1a]">
              You didn&apos;t fail. The plan failed you.
            </p>
            <p>
              Those systems were built on old science. Fixed rules. Generic templates.
            </p>
            <p>
              They were never designed for how your body actually works.
            </p>
            <p className="font-semibold text-[#3bb44a]">
              That changes right now.
            </p>
            <p>
              Answer honestly. We&apos;ll do the rest.
            </p>
          </div>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-20">
        {/* Top row: brand + nav links */}
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 sm:gap-5 md:flex-row md:gap-8">
          <span className="text-[15px] font-black tracking-tight text-black" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
            no.Diet
          </span>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-[12px] text-gray-500 sm:gap-5 sm:text-[13px]">
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Help Center
            </a>
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-black"
            >
              Privacy Settings
            </a>
          </nav>
        </div>

        {/* Social icons + copyright */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-black transition-colors hover:text-gray-600"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-black transition-colors hover:text-gray-600"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
          <p className="font-body text-[12px] text-gray-400">
            &copy; 2026 no.Diet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
