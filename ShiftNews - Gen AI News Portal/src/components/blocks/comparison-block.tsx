"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale, ThumbsUp, ThumbsDown, SplitSquareVertical } from "lucide-react";
import { ComparisonBlock as ComparisonBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComparisonBlockProps {
  block: ComparisonBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

type ViewFilter = "both" | "sideA" | "sideB";

export function ComparisonBlockComponent({
  block,
  onSourceClick,
}: ComparisonBlockProps) {
  const [viewFilter, setViewFilter] = useState<ViewFilter>("both");

  const totalPoints = block.sideA.points.length + block.sideB.points.length;
  const sideAPercent = totalPoints > 0 ? Math.round((block.sideA.points.length / totalPoints) * 100) : 50;
  const sideBPercent = 100 - sideAPercent;

  return (
    <div className="rounded-2xl border border-purple-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Scale className="h-4 w-4" />
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {block.title || "Balanced Perspectives: Both Sides"}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/5 font-semibold"
        >
          Side-by-Side Analysis
        </Badge>
      </div>

      {/* Dynamic Editorial Balance Meter (Tier 2 Upgrade) */}
      <div className="space-y-2 p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/[0.03]">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{block.sideA.label} ({sideAPercent}%)</span>
          </span>
          <span className="text-muted-foreground">Editorial Balance Ratio</span>
          <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
            <span>({sideBPercent}%) {block.sideB.label}</span>
            <ThumbsDown className="h-3 w-3" />
          </span>
        </div>

        {/* Proportional Balance Bar */}
        <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden flex">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${sideAPercent}%` }}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${sideBPercent}%` }}
          />
        </div>
      </div>

      {/* Perspective Filter Segmented Pill Control */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center p-1 rounded-full bg-muted/60 border border-border/50">
          <button
            type="button"
            onClick={() => setViewFilter("both")}
            className={cn(
              "relative px-3 py-1 text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer",
              viewFilter === "both" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewFilter === "both" && (
              <motion.div
                layoutId="comparison-filter-active-pill"
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <SplitSquareVertical className="h-3 w-3" />
              <span>Split View</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewFilter("sideA")}
            className={cn(
              "relative px-3 py-1 text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer",
              viewFilter === "sideA" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewFilter === "sideA" && (
              <motion.div
                layoutId="comparison-filter-active-pill"
                className="absolute inset-0 rounded-full bg-blue-600 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <ThumbsUp className="h-3 w-3" />
              <span>{block.sideA.label}</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewFilter("sideB")}
            className={cn(
              "relative px-3 py-1 text-xs font-mono font-medium transition-colors select-none pressable cursor-pointer",
              viewFilter === "sideB" ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewFilter === "sideB" && (
              <motion.div
                layoutId="comparison-filter-active-pill"
                className="absolute inset-0 rounded-full bg-amber-600 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <ThumbsDown className="h-3 w-3" />
              <span>{block.sideB.label}</span>
            </span>
          </button>
        </div>

        <span className="text-xs font-mono text-muted-foreground">
          Click any citation to verify claim
        </span>
      </div>

      {/* Columns Container */}
      <div className={cn(
        "grid gap-5",
        viewFilter === "both" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {/* Side A */}
          {(viewFilter === "both" || viewFilter === "sideA") && (
            <motion.div
              key="sideA"
              layout
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], layout: { type: "spring", stiffness: 420, damping: 32 } }}
              className="rounded-xl border border-blue-500/25 bg-blue-500/[0.03] p-5 flex flex-col h-full space-y-4"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-blue-500/15">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs shadow-2xs">
                  <ThumbsUp className="h-3 w-3" />
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                  {block.sideA.label}
                </h4>
              </div>

              <ul className="space-y-3.5 flex-1">
                {block.sideA.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-3 text-sm leading-relaxed"
                  >
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span className="text-foreground/90 font-normal">{point.text}</span>
                    </div>
                    <SourceChip
                      sourceRefs={point.sourceRefs}
                      onSourceClick={onSourceClick}
                      className="shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Side B */}
          {(viewFilter === "both" || viewFilter === "sideB") && (
            <motion.div
              key="sideB"
              layout
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], layout: { type: "spring", stiffness: 420, damping: 32 } }}
              className="rounded-xl border border-amber-500/25 bg-amber-500/[0.03] p-5 flex flex-col h-full space-y-4"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/15">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs shadow-2xs">
                  <ThumbsDown className="h-3 w-3" />
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                  {block.sideB.label}
                </h4>
              </div>

              <ul className="space-y-3.5 flex-1">
                {block.sideB.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-3 text-sm leading-relaxed"
                  >
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span className="text-foreground/90 font-normal">{point.text}</span>
                    </div>
                    <SourceChip
                      sourceRefs={point.sourceRefs}
                      onSourceClick={onSourceClick}
                      className="shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
