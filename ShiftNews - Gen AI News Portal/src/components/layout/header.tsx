"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Newspaper,
  Sparkles,
  Cpu,
  Sun,
  Moon,
  Info,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { haptic } from "@/lib/haptics";

export function Header() {
  const isDark = useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(() => onStoreChange());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    },
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
    () => false
  );

  const toggleTheme = () => {
    haptic.click();
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("shiftnews-theme", "light");
      toast("Light mode activated", { duration: 1500 });
    } else {
      root.classList.add("dark");
      localStorage.setItem("shiftnews-theme", "dark");
      toast("Dark mode activated", { duration: 1500 });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-chrome">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 pressable select-none"
          aria-label="ShiftNews home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground shadow-2xs">
            <Newspaper className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              ShiftNews
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-muted-foreground/75">
              Gen AI Portal
            </span>
          </div>
        </Link>

        {/* Dynamic Status & Controls Island */}
        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-2.5">
          {/* Free AI Active Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-1 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 shadow-2xs select-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 duration-1000" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              <span>Free Quota Ready</span>
            </span>
          </div>

          {/* Hackathon Judge Walkthrough Sheet */}
          <Sheet>
            <SheetTrigger
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 hover:bg-muted/60 px-3 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-all duration-150 pressable cursor-pointer shadow-2xs"
              aria-label="How ShiftNews Works"
            >
              <Info className="h-3.5 w-3.5 text-primary" />
              <span className="hidden xs:inline">Architecture</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="text-left space-y-2 pb-4 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <div>
                    <SheetTitle className="font-serif text-lg font-bold">
                      ShiftNews Architecture
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                      Built for Hackathon · Generative UI Editorial Engine
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="py-5 space-y-6 text-sm">
                {/* 1. The Core Insight */}
                <section className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    1. The Problem We Solve
                  </h4>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs leading-relaxed text-muted-foreground">
                    <p>
                      Every reader arrives at the news with a completely different cognitive situation:
                    </p>
                    <ul className="space-y-1 pl-1 text-foreground/90 font-medium">
                      <li>• <strong>Commuter in a rush:</strong> Needs key facts &amp; what changed in &lt;90 seconds.</li>
                      <li>• <strong>Newcomer:</strong> Gets overwhelmed by industry jargon &amp; acronyms.</li>
                      <li>• <strong>Voter / Analyst:</strong> Needs neutral, balanced side-by-side arguments.</li>
                      <li>• <strong>Anxious reader:</strong> Desires sensory-calm, unalarmist pacing.</li>
                    </ul>
                  </div>
                </section>

                {/* 2. Generative UI */}
                <section className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-primary" />
                    2. Generative UI vs Generic Chatbot
                  </h4>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs leading-relaxed text-muted-foreground">
                    <p>
                      Instead of a chat sidebar spitting out walls of markdown, ShiftNews dynamically restructures the article into <strong>8 strictly typed React component blocks</strong>:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <Badge variant="outline" className="text-[10px] font-mono">BriefBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">KeyFactsBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">TimelineBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">GlossaryBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">ComparisonBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">WhyItMattersBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">QuoteBlock</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">SectionBlock</Badge>
                    </div>
                  </div>
                </section>

                {/* 3. Provenance & Safety */}
                <section className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    3. Zero Hallucination Attribution
                  </h4>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3.5 space-y-2 text-xs leading-relaxed text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">Strict Grounding:</strong> Every claim, timeline milestone, and quote contains explicit <code className="font-mono text-primary">[¶P]</code> paragraph links to the source.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">Zod Runtime Validation:</strong> Every generated block is schema-checked. Malformed AI output is safely sanitized.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">Free OpenRouter Cascade:</strong> Automatically falls back across MiniMax M3.1 Flash, Liquid AI, NVIDIA Nemotron 120B, Cohere North Mini, and Poolside with 0s catalog safety net.
                      </span>
                    </div>
                  </div>
                </section>

                <div className="pt-2">
                  <Link
                    href="/story/quiet-revolution-battery-technology"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs pressable hover:opacity-95"
                  >
                    <span>Test Interactive Story Reader</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-[transform,colors] duration-150 pressable cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 overflow-hidden"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </motion.div>
          </button>

          {/* Feed Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-primary-foreground shadow-xs pressable hover:opacity-95"
          >
            <Sparkles className="h-3 w-3" />
            <span>Feed</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
