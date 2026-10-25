"use client";

import React, { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  History,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ListTree,
  Sparkles,
} from "lucide-react";
import { TimelineBlock as TimelineBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

interface TimelineBlockProps {
  block: TimelineBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function TimelineBlockComponent({
  block,
  onSourceClick,
}: TimelineBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"scrubber" | "tree">("scrubber");
  const tabId = useId();

  const events = block.events || [];
  const activeEvent = events[activeIndex] || events[0];
  const totalEvents = events.length;

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      haptic.tick();
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < totalEvents - 1) {
      haptic.tick();
      setActiveIndex((prev) => prev + 1);
    }
  }, [activeIndex, totalEvents]);

  // Keyboard navigation when scrubber mode is active
  useEffect(() => {
    if (viewMode !== "scrubber") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handlePrev, handleNext]);

  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-card/95 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header with Dual View Segmented Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <History className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {block.title || "How We Got Here: Timeline"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Chronological milestones reconstructed from original journalistic reporting.
            </p>
          </div>
        </div>

        {/* View Toggle: Interactive Scrubber vs Full Chronological Tree */}
        <div
          role="tablist"
          aria-label="Timeline display view"
          className="flex items-center p-1 rounded-full bg-muted/60 border border-border/50 self-start sm:self-center"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "scrubber"}
            onClick={() => {
              haptic.tick();
              setViewMode("scrubber");
            }}
            className={cn(
              "relative px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors select-none pressable flex items-center gap-1.5 cursor-pointer",
              viewMode === "scrubber"
                ? "text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewMode === "scrubber" && (
              <motion.div
                layoutId={`timeline-view-pill-${tabId}`}
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sliders className="h-3 w-3" />
              <span>Chrono-Scrubber</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "tree"}
            onClick={() => {
              haptic.tick();
              setViewMode("tree");
            }}
            className={cn(
              "relative px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors select-none pressable flex items-center gap-1.5 cursor-pointer",
              viewMode === "tree"
                ? "text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewMode === "tree" && (
              <motion.div
                layoutId={`timeline-view-pill-${tabId}`}
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <ListTree className="h-3 w-3" />
              <span>Full Roadmap</span>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "scrubber" ? (
          <motion.div
            key="scrubber-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-6"
          >
            {/* Horizontal Timeline Rail */}
            <div className="space-y-3 px-2 pt-2">
              <div className="relative flex items-center h-10">
                {/* Background Guide Line */}
                <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted/80 border border-border/50" />

                {/* Animated Luminous Fill Track */}
                <motion.div
                  className="absolute left-0 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-xs"
                  style={{
                    width: `${totalEvents > 1 ? (activeIndex / (totalEvents - 1)) * 100 : 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />

                {/* Milestone Snap Nodes */}
                {events.map((event, idx) => {
                  const isCurrent = idx === activeIndex;
                  const isPassed = idx <= activeIndex;
                  const positionPercent =
                    totalEvents > 1 ? (idx / (totalEvents - 1)) * 100 : 50;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        haptic.tick();
                        setActiveIndex(idx);
                      }}
                      className="absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer focus-visible:outline-none"
                      style={{ left: `${positionPercent}%` }}
                      title={`${event.date}: ${event.label}`}
                      aria-label={`Jump to ${event.date}`}
                    >
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-125 flex items-center justify-center",
                          isCurrent
                            ? "border-emerald-500 bg-background ring-4 ring-emerald-500/25 scale-125 shadow-md"
                            : isPassed
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-border bg-background"
                        )}
                      >
                        {isCurrent && (
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Date Labels Under Snapping Ticks */}
              <div className="relative flex justify-between text-[11px] font-mono text-muted-foreground pt-1">
                {events.map((event, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        haptic.tick();
                        setActiveIndex(idx);
                      }}
                      className={cn(
                        "transition-colors text-center cursor-pointer select-none",
                        isCurrent
                          ? "text-emerald-600 dark:text-emerald-400 font-bold"
                          : "hover:text-foreground text-muted-foreground"
                      )}
                    >
                      <span>{event.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Active Milestone Showcase Card */}
            {activeEvent && (
              <motion.div
                key={`milestone-card-${activeIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-2xl border border-emerald-500/30 bg-muted/20 p-5 sm:p-7 space-y-4 shadow-sm"
              >
                {/* Milestone Navigation & Era Badge */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      <Calendar className="h-3 w-3" />
                      <span>{activeEvent.date}</span>
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      Era {activeIndex + 1} of {totalEvents}
                    </span>
                  </div>

                  {/* Scrubber Arrow Navigation Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      aria-label="Previous chronological milestone"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed pressable cursor-pointer"
                      title="Previous Era (Arrow Left)"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeIndex === totalEvents - 1}
                      aria-label="Next chronological milestone"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed pressable cursor-pointer"
                      title="Next Era (Arrow Right)"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Milestone Title & Description */}
                <div className="space-y-2">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground leading-snug">
                    {activeEvent.label}
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                    {activeEvent.description}
                  </p>
                </div>

                {/* Attribution Citation Grounding */}
                <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground flex-wrap gap-2">
                  <span className="font-mono text-[11px] flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    <span>Attributed historical milestone</span>
                  </span>
                  <SourceChip
                    sourceRefs={activeEvent.sourceRefs}
                    onSourceClick={onSourceClick}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tree-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="relative pl-7 space-y-6 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-border before:to-transparent"
          >
            {events.map((event, index) => (
              <div key={index} className="relative group">
                {/* Pulsing Timeline Node */}
                <div className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500 ring-4 ring-emerald-500/15 group-hover:scale-125 transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)]" />

                <div className="space-y-2 rounded-xl border border-border/40 bg-muted/20 p-4 sm:p-5 transition-[background-color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted/40 hover:border-emerald-500/30">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <SourceChip
                      sourceRefs={event.sourceRefs}
                      onSourceClick={onSourceClick}
                    />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-foreground">
                    {event.label}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
