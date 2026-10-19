"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ReadingMode, READING_MODES, AVAILABLE_MODELS } from "@/lib/types";
import { Sparkles, Clock, BookOpen, Scale, ArrowRight, FileText, Cpu, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntentPickerProps {
  currentMode: ReadingMode | null;
  onSelectMode: (mode: ReadingMode | null, customPrompt?: string, model?: string) => void;
  isGenerating?: boolean;
  activeModelName?: string;
  fallbackUsed?: boolean;
}

const modeIcons: Record<ReadingMode, React.ComponentType<{ className?: string }>> = {
  brief: Clock,
  explainer: BookOpen,
  comparison: Scale,
  calm: Sparkles,
};

const SUGGESTED_SITUATIONS = [
  "Explain for a non-technical reader",
  "Focus on economic & timeline impacts",
  "Key arguments and quotes only",
  "High-level executive brief in 60s",
];

export function IntentPicker({
  currentMode,
  onSelectMode,
  isGenerating = false,
  activeModelName,
  fallbackUsed = false,
}: IntentPickerProps) {
  const [customText, setCustomText] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_MODELS[0].id);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() || isGenerating) return;

    // Detect archetype heuristically for badge styling while sending raw prompt to LLM
    const lower = customText.toLowerCase();
    let mode: ReadingMode = "calm";
    if (
      lower.includes("brief") ||
      lower.includes("minute") ||
      lower.includes("rush") ||
      lower.includes("quick") ||
      lower.includes("short") ||
      lower.includes("executive")
    ) {
      mode = "brief";
    } else if (
      lower.includes("explain") ||
      lower.includes("new") ||
      lower.includes("beginner") ||
      lower.includes("learn") ||
      lower.includes("teach") ||
      lower.includes("dad") ||
      lower.includes("kid")
    ) {
      mode = "explainer";
    } else if (
      lower.includes("both") ||
      lower.includes("side") ||
      lower.includes("compare") ||
      lower.includes("debate") ||
      lower.includes("argument") ||
      lower.includes("trade-off")
    ) {
      mode = "comparison";
    }

    onSelectMode(mode, customText.trim(), selectedModel);
  };

  const handleQuickChipClick = (suggestion: string) => {
    setCustomText(suggestion);
    let mode: ReadingMode = "explainer";
    const lower = suggestion.toLowerCase();
    if (lower.includes("brief") || lower.includes("60s")) mode = "brief";
    if (lower.includes("argument")) mode = "comparison";

    onSelectMode(mode, suggestion, selectedModel);
  };

  const selectedModelMeta =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  return (
    <section
      aria-label="Reading mode selection"
      className="my-8 rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-7 shadow-xs space-y-6"
    >
      {/* Header with Title and Engine Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            How do you want to read this?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Select an archetype or describe your situation — powered by free OpenRouter models.
          </p>
        </div>

        {/* Dynamic Status Badges */}
        <div aria-live="polite" className="flex items-center gap-2 self-start sm:self-center shrink-0 flex-wrap">
          {isGenerating ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary animate-pulse select-none">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>Reshaping Layout...</span>
            </span>
          ) : currentMode ? (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
            >
              Active: {READING_MODES[currentMode].badge}
            </Badge>
          ) : (
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-mono">
              Full Editorial Dispatch
            </Badge>
          )}

          {fallbackUsed && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-amber-700 dark:text-amber-400"
              title="A fallback model or catalog was activated seamlessly to guarantee zero downtime"
            >
              <ShieldCheck className="h-3 w-3" />
              <span>Fallback Active</span>
            </span>
          )}
        </div>
      </div>

      {/* Mode Selector Cards (Fully Readable & Responsive, Zero Truncation) */}
      <div
        role="radiogroup"
        aria-label="Preset reading modes"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5"
      >
        {/* Full Story Default Card */}
        <motion.button
          type="button"
          role="radio"
          aria-checked={currentMode === null}
          disabled={isGenerating}
          onClick={() => onSelectMode(null)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          className={cn(
            "group relative flex items-start gap-3.5 p-4 rounded-xl border text-left select-none cursor-pointer",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
            currentMode === null
              ? "border-primary bg-primary/5 text-foreground shadow-xs"
              : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
          )}
        >
          {currentMode === null && (
            <motion.div
              layoutId="intent-picker-active-card-pill"
              className="absolute inset-0 rounded-xl border-2 border-primary bg-primary/[0.04] pointer-events-none"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background border transition-colors mt-0.5",
              currentMode === null
                ? "text-primary border-primary/40 bg-primary/10"
                : "text-muted-foreground border-border/60 group-hover:text-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1.5">
              <p className="font-serif font-bold text-sm sm:text-base text-foreground leading-snug">
                Full Story
              </p>
              {currentMode === null && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Standard editorial dispatch with complete reporting.
            </p>
          </div>
        </motion.button>

        {/* 4 Generated Reading Modes */}
        {(Object.keys(READING_MODES) as ReadingMode[]).map((modeKey) => {
          const meta = READING_MODES[modeKey];
          const Icon = modeIcons[modeKey];
          const isSelected = currentMode === modeKey;

          return (
            <motion.button
              key={modeKey}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isGenerating}
              onClick={() => onSelectMode(modeKey, undefined, selectedModel)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              className={cn(
                "group relative flex items-start gap-3.5 p-4 rounded-xl border text-left select-none cursor-pointer",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                isSelected
                  ? "border-primary bg-primary/5 text-foreground shadow-xs"
                  : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="intent-picker-active-card-pill"
                  className="absolute inset-0 rounded-xl border-2 border-primary bg-primary/[0.04] pointer-events-none"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background border transition-colors mt-0.5",
                  isSelected
                    ? "text-primary border-primary/40 bg-primary/10"
                    : "text-muted-foreground border-border/60 group-hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5">
                  <p className="font-serif font-bold text-sm sm:text-base text-foreground leading-snug">
                    {meta.label}
                  </p>
                  {isSelected && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-normal">
                  <span className="font-semibold text-foreground/90">{meta.badge}</span> · {meta.tagline}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Free Text Custom Prompt + Clean Free Model Selector Row */}
      <div className="space-y-3.5 pt-3 border-t border-border/40">
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          {/* Text Input with Non-Overlapping Action Button */}
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              disabled={isGenerating}
              placeholder="Or describe your situation: 'explain for my dad', 'focus on timeline', 'show promises'..."
              aria-label="Custom reading situation or prompt"
              className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors shadow-2xs"
            />
            <button
              type="submit"
              disabled={!customText.trim() || isGenerating}
              className="absolute right-2 top-2 bottom-2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform active:scale-[0.97] hover:opacity-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <span>Reshape</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Model Selector Bar (Strictly 100% Free OpenRouter Models) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium text-muted-foreground">
                Active Free Model:
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-1.5 shadow-2xs">
                <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isGenerating}
                  className="bg-transparent text-xs font-mono text-foreground focus-visible:outline-none cursor-pointer font-medium"
                  title="Select OpenRouter free model"
                  aria-label="Select Free LLM model"
                >
                  {AVAILABLE_MODELS.map((m) => (
                    <option key={m.id} value={m.id} className="bg-popover text-popover-foreground">
                      {m.label} ({m.badge})
                    </option>
                  ))}
                </select>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                100% Free Quota
              </span>
            </div>

            {selectedModelMeta.description && (
              <span className="text-[11px] font-mono text-muted-foreground/80 sm:text-right">
                {selectedModelMeta.description}
              </span>
            )}
          </div>
        </form>

        {/* Quick Situation Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-mono text-muted-foreground select-none">
            Quick situations:
          </span>
          {SUGGESTED_SITUATIONS.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              disabled={isGenerating}
              onClick={() => handleQuickChipClick(suggestion)}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:border-border transition-colors cursor-pointer active:scale-[0.97] select-none text-left"
            >
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
