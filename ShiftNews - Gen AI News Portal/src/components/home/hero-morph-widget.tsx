"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Sparkles,
  Scale,
  ArrowRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Zap,
  History,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";
import { GenerativeCanvasVisualizer } from "./generative-canvas-visualizer";

type MorphMode = "raw" | "brief" | "debate" | "timeline";

export function HeroMorphWidget() {
  const [activeTab, setActiveTab] = useState<MorphMode>("brief");

  return (
    <div className="w-full rounded-[2rem] p-1.5 sm:p-2 bg-muted/40 border border-border/60 ring-1 ring-border/20 shadow-md">
      <div className="rounded-[calc(2rem-0.375rem)] border border-border/40 bg-card/95 p-5 sm:p-7 space-y-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden">
        {/* Top Control Bar with Segmented Sliding Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-tight text-foreground">
                Interactive Layout Transformation
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Click tabs to witness how generative UI reshapes the identical journalistic facts.
            </p>
          </div>

          {/* Segmented Control Pill with Fluid Motion Indicator */}
          <div
            role="tablist"
            aria-label="Morph preview tabs"
            className="flex items-center p-1 rounded-full bg-muted/60 border border-border/50 self-start sm:self-center shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "raw"}
              onClick={() => {
                haptic.tick();
                setActiveTab("raw");
              }}
              className={cn(
                "relative px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer",
                activeTab === "raw" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "raw" && (
                <motion.div
                  layoutId="hero-morph-active-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                <span>Raw Wire</span>
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "brief"}
              onClick={() => {
                haptic.tick();
                setActiveTab("brief");
              }}
              className={cn(
                "relative px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer",
                activeTab === "brief" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "brief" && (
                <motion.div
                  layoutId="hero-morph-active-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>2-Min Brief</span>
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "debate"}
              onClick={() => {
                haptic.tick();
                setActiveTab("debate");
              }}
              className={cn(
                "relative px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer focus-visible:outline-none",
                activeTab === "debate" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "debate" && (
                <motion.div
                  layoutId="hero-morph-active-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Scale className="h-3 w-3" />
                <span>Dual Lens</span>
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "timeline"}
              onClick={() => {
                haptic.tick();
                setActiveTab("timeline");
              }}
              className={cn(
                "relative px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer focus-visible:outline-none",
                activeTab === "timeline" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "timeline" && (
                <motion.div
                  layoutId="hero-morph-active-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <History className="h-3 w-3" />
                <span>Timeline</span>
              </span>
            </button>
          </div>
        </div>

        {/* Morphing Content Area */}
        <div className="min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* View 1: Raw Wall of Text */}
            {activeTab === "raw" && (
              <motion.div
                key="raw"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Standard Journalistic Paragraph (Dense Copy)
                  </span>
                  <span>Est. Read: 2.5 min</span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-border/60 bg-muted/20 text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                  <span className="inline-flex mr-2 text-[11px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                    ¶1
                  </span>
                  Solid-state lithium batteries have cleared critical safety trials at the National Renewable Energy Laboratory, proving non-flammable under puncture stresses while delivering a 72% volumetric energy density leap over today&apos;s liquid NMC chemistries. Automotive engineering consortia report prototype cell charge velocities reaching 80% state-of-charge in just 11.4 minutes. However, roll-to-roll manufacturing yield rates remain below 42%, driving near-term unit costs above $210/kWh compared to $78/kWh for standard LFP cells.
                </div>
              </motion.div>
            )}

            {/* View 2: 2-Min Executive Brief */}
            {activeTab === "brief" && (
              <motion.div
                key="brief"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 inline-flex items-center gap-1.5">
                    <Zap className="h-3 w-3" />
                    <span>BriefBlock + KeyFactsBlock</span>
                  </Badge>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    Read Time: 45 Seconds
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-blue-500/25 bg-blue-500/[0.03] space-y-3.5">
                  <div className="space-y-1">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      What Changed Today
                    </p>
                    <p className="text-sm sm:text-base font-medium text-foreground">
                      Lab puncture trials confirm solid-state battery safety with 72% higher energy density and 11-minute fast charging.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-1 border-t border-blue-500/15">
                    <li className="flex items-center justify-between text-xs sm:text-sm text-foreground/90 gap-2">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        80% charge achieved in 11.4 minutes in NREL stress tests.
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                        [¶1]
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-xs sm:text-sm text-foreground/90 gap-2">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Current manufacturing cost is $210/kWh (vs $78/kWh standard).
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                        [¶1]
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* View 3: Dual Lens Perspectives */}
            {activeTab === "debate" && (
              <motion.div
                key="debate"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/5 inline-flex items-center gap-1.5">
                    <Scale className="h-3 w-3" />
                    <span>ComparisonBlock (Balanced Perspective)</span>
                  </Badge>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    Side-by-Side Balance: 50% / 50%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.04] p-3.5 space-y-2">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-foreground">
                      <ThumbsUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Technological Breakthrough</span>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      72% volumetric gain enables 600-mile range with non-flammable puncture safety.
                    </p>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      Cited: [¶1]
                    </span>
                  </div>

                  <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-3.5 space-y-2">
                    <div className="flex items-center gap-2 font-serif font-bold text-xs sm:text-sm text-foreground">
                      <ThumbsDown className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Commercialization Barrier</span>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      $210/kWh unit cost &amp; 42% manufacturing yield delay mass affordability to 2028.
                    </p>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      Cited: [¶1]
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View 4: Chronological Timeline Scrubber */}
            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 inline-flex items-center gap-1.5">
                    <History className="h-3 w-3" />
                    <span>TimelineBlock (Chrono-Scrubber)</span>
                  </Badge>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Interactive Historical Rail
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.03] space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                        1991 &rarr; 2026 Breakthrough
                      </span>
                      <span className="text-xs text-muted-foreground">3 Historical Turning Points</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">
                      Grounded: [¶1]
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed">
                    Traces the evolution from Sony&apos;s first liquid lithium-ion cells to next-generation solid ceramic electrolytes, with interactive scrub controls.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generative Synthesis Topology Visualizer (Interactive 3D / 2D Canvas) */}
        <GenerativeCanvasVisualizer mode={activeTab} />

        {/* Bottom Bar: Zero Hallucination Guarantee & Deep Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-semibold">100% Attribution Grounded:</span>
            <span className="text-muted-foreground">Every block cites paragraph [¶1]</span>
          </div>

          <Link
            href="/story/quiet-revolution-battery-technology"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline pressable self-start sm:self-center"
          >
            <span>Open full dispatch reader</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
