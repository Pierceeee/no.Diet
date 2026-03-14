"use client";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-white">
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-12 pt-6 sm:px-5 sm:pb-20 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
