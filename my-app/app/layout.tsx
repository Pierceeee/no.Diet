import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { QuizProvider } from "@/lib/quiz-context";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "no.Diet - Personalized Mediterranean Diet Plan",
  description:
    "Get your personalized Mediterranean diet plan. Select diet plans designed specifically for men and women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${dmSerif.variable} ${dmSans.variable} antialiased overflow-x-hidden`}>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
