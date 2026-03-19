import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { QuizProvider } from "@/lib/quiz-context";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "greek"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "meDiet - Personalized Mediterranean Diet Plan",
  description:
    "Get your personalized Mediterranean diet plan. Select diet plans designed specifically for men and women.",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const textDir = locale === "il" ? "rtl" : getHTMLTextDir(locale);
  
  return (
    <html lang={locale} dir={textDir}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${dmSans.variable} ${inter.variable} ${playfairDisplay.variable} antialiased overflow-x-hidden`}>
        <IntlayerClientProvider locale={locale}>
          <QuizProvider>{children}</QuizProvider>
        </IntlayerClientProvider>
      </body>
    </html>
  );
}

export { generateStaticParams } from "next-intlayer";
