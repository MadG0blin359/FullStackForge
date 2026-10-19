import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/* ── Sans (UI & body) ── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* ── Mono (code, data) ── */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ── Serif (headlines, editorial) ── */
const sourceSerif = localFont({
  src: "../fonts/SourceSerif4Variable-Roman.ttf.woff2",
  variable: "--font-source-serif",
  display: "swap",
  weight: "200 900",
});

/* ── Accessible (dyslexia-friendly) ── */
const atkinson = localFont({
  src: [
    {
      path: "../fonts/AtkinsonHyperlegibleNext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AtkinsonHyperlegibleNext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShiftNews — Read it your way",
  description:
    "A news portal where stories reshape to match how you want to read them. Quick brief, deep explainer, balanced comparison, or calm mode.",
  keywords: ["news", "accessibility", "generative UI", "reading modes"],
};

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${atkinson.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TooltipProvider delay={150}>
          {children}
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
