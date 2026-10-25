"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  LayoutGrid,
  List,
  Zap,
  DollarSign,
  Scale,
  Gauge,
  Percent,
  Sparkles,
} from "lucide-react";
import { KeyFactsBlock as KeyFactsBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

interface KeyFactsBlockProps {
  block: KeyFactsBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

interface ParsedMetric {
  hasMetric: boolean;
  metric: string;
  unit?: string;
  label: string;
  comparison?: string;
  percentage?: number;
  iconType: "tech" | "finance" | "policy" | "gauge" | "percent" | "general";
}

/**
 * Heuristically extracts numerical metrics, units, and comparative benchmarks
 * from journalistic fact statements to construct generative micro-charts.
 */
function parseFactMetric(text: string): ParsedMetric {
  // 1. Wh/kg or Energy density
  const whMatch = text.match(/(\d+\+?\s*Wh\/kg)/i);
  if (whMatch) {
    const compMatch = text.match(/(\d+\s*Wh\/kg)/gi);
    const baseline = compMatch && compMatch.length > 1 ? compMatch[1] : "270 Wh/kg";
    return {
      hasMetric: true,
      metric: whMatch[1],
      label: "Energy Density",
      comparison: `vs ${baseline} baseline`,
      percentage: 85,
      iconType: "tech",
    };
  }

  // 2. Miles / Distance Range
  const rangeMatch = text.match(/(\d+\+?\s*miles)/i);
  if (rangeMatch) {
    return {
      hasMetric: true,
      metric: rangeMatch[1],
      label: "Cruising Range",
      comparison: "Single-charge potential",
      percentage: 92,
      iconType: "gauge",
    };
  }

  // 3. Currency (Billions / Millions)
  const moneyMatch = text.match(/(\$\d+(?:\.\d+)?\s*(?:billion|million|B|M)?)/i);
  if (moneyMatch) {
    return {
      hasMetric: true,
      metric: moneyMatch[1].replace(/billion/i, "B").replace(/million/i, "M"),
      label: "Committed Capital",
      comparison: "Global factory investments",
      percentage: 75,
      iconType: "finance",
    };
  }

  // 4. Percentage Surge / Drop
  const pctMatch = text.match(/(\d+(?:\.\d+)?%)/);
  if (pctMatch) {
    const isRise = /rose|surge|increase|jump|up/i.test(text);
    const val = parseFloat(pctMatch[1]);
    return {
      hasMetric: true,
      metric: `${isRise ? "+" : ""}${pctMatch[1]}`,
      label: isRise ? "Growth Surge" : "Rate Metric",
      comparison: isRise ? "5-year cumulative change" : "Statutory threshold",
      percentage: Math.min(100, Math.max(15, val)),
      iconType: "percent",
    };
  }

  // 5. Council Vote / Ratio (e.g. 7 to 2)
  const voteMatch = text.match(/(\d+)\s*(?:to|-)\s*(\d+)/i);
  if (voteMatch && /approved|vote|council|passed/i.test(text)) {
    const yes = parseInt(voteMatch[1], 10);
    const no = parseInt(voteMatch[2], 10);
    const pct = Math.round((yes / (yes + no)) * 100);
    return {
      hasMetric: true,
      metric: `${yes}–${no}`,
      label: "Council Decision",
      comparison: `${pct}% affirmative supermajority`,
      percentage: pct,
      iconType: "policy",
    };
  }

  // 6. Generic number detection
  const genericMatch = text.match(/(\b\d{1,3}(?:,\d{3})*(?:\+)?\b)/);
  if (genericMatch && genericMatch[1].length > 1) {
    return {
      hasMetric: true,
      metric: genericMatch[1],
      label: "Key Figure",
      comparison: "Documented reporting metric",
      percentage: 60,
      iconType: "general",
    };
  }

  return {
    hasMetric: false,
    metric: "Insight",
    label: "Journalistic Fact",
    iconType: "general",
  };
}

/**
 * Animated SVG circular progress ring
 */
function RadialProgressRing({ value, className }: { value: number; className?: string }) {
  const radius = 18;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
        {/* Track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-muted/80 fill-none"
          strokeWidth={stroke}
        />
        {/* Fill */}
        <motion.circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-primary fill-none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-bold text-foreground">
        {value}%
      </span>
    </div>
  );
}

/**
 * Comparative dual-tier horizontal sparkline bar
 */
function SparklineDualBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="space-y-1 w-full pt-1.5">
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span>Standard Baseline</span>
        <span className="text-primary font-bold">{label || `${value}% Breakthrough`}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted/80 overflow-hidden relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-primary shadow-xs"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(10, value))}%` }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
}

export function KeyFactsBlockComponent({
  block,
  onSourceClick,
}: KeyFactsBlockProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const layoutTabId = useId();

  const getMetricIcon = (type: ParsedMetric["iconType"]) => {
    switch (type) {
      case "tech":
        return <Zap className="h-3.5 w-3.5 text-blue-500" />;
      case "finance":
        return <DollarSign className="h-3.5 w-3.5 text-emerald-500" />;
      case "policy":
        return <Scale className="h-3.5 w-3.5 text-purple-500" />;
      case "gauge":
        return <Gauge className="h-3.5 w-3.5 text-cyan-500" />;
      case "percent":
        return <Percent className="h-3.5 w-3.5 text-amber-500" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-primary" />;
    }
  };

  return (
    <div className="rounded-2xl border border-blue-500/25 bg-card/95 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header with Segmented View Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {block.title || "Key Facts to Know"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Extracted from verified ground-truth journalistic reporting.
            </p>
          </div>
        </div>

        {/* View Toggle: Visual Bento Grid vs Structured List */}
        <div
          role="tablist"
          aria-label="Fact layout view toggle"
          className="flex items-center p-1 rounded-full bg-muted/60 border border-border/50 self-start sm:self-center"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "grid"}
            onClick={() => {
              haptic.tick();
              setViewMode("grid");
            }}
            className={cn(
              "relative px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors select-none pressable flex items-center gap-1.5 cursor-pointer",
              viewMode === "grid"
                ? "text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewMode === "grid" && (
              <motion.div
                layoutId={`fact-view-pill-${layoutTabId}`}
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3" />
              <span>Data Grid</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "list"}
            onClick={() => {
              haptic.tick();
              setViewMode("list");
            }}
            className={cn(
              "relative px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors select-none pressable flex items-center gap-1.5 cursor-pointer",
              viewMode === "list"
                ? "text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {viewMode === "list" && (
              <motion.div
                layoutId={`fact-view-pill-${layoutTabId}`}
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <List className="h-3 w-3" />
              <span>Checklist</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="fact-grid"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {block.facts.map((fact, index) => {
              const parsed = parseFactMetric(fact.text);

              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-blue-500/35 p-4 sm:p-5 transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 shadow-2xs"
                >
                  <div className="space-y-3">
                    {/* Top Row: Metric Callout & Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background/80 border border-border/60 shadow-2xs">
                          {getMetricIcon(parsed.iconType)}
                        </span>
                        <div>
                          <span className="font-mono text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                            {parsed.label}
                          </span>
                          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground block">
                            {parsed.metric}
                          </span>
                        </div>
                      </div>

                      {parsed.percentage && parsed.iconType === "percent" ? (
                        <RadialProgressRing value={parsed.percentage} />
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Explanatory Body */}
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-normal">
                      {fact.text}
                    </p>

                    {/* Comparative Sparkline Bar if available */}
                    {parsed.percentage && parsed.iconType !== "percent" && (
                      <SparklineDualBar
                        value={parsed.percentage}
                        label={parsed.comparison}
                      />
                    )}
                  </div>

                  {/* Footer Citation & Jump */}
                  <div className="flex items-center justify-between border-t border-border/30 pt-3 mt-4 text-[11px] text-muted-foreground">
                    <span className="font-mono truncate max-w-[180px]">
                      {parsed.comparison || "Journalistic Ground Truth"}
                    </span>
                    <SourceChip
                      sourceRefs={fact.sourceRefs}
                      onSourceClick={onSourceClick}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.ul
            key="fact-list"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            {block.facts.map((fact, index) => {
              const parsed = parseFactMetric(fact.text);

              return (
                <li
                  key={index}
                  className="group flex items-start justify-between gap-4 p-3.5 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/40 hover:border-blue-500/30 transition-[background-color,border-color,transform] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-mono font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-160">
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      {parsed.hasMetric && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 mr-2">
                          {parsed.metric}
                        </span>
                      )}
                      <span className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                        {fact.text}
                      </span>
                    </div>
                  </div>
                  <SourceChip
                    sourceRefs={fact.sourceRefs}
                    onSourceClick={onSourceClick}
                    className="shrink-0 mt-0.5"
                  />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
