"use client";

import React, { useState } from "react";
import { ReadingMode, READING_MODES, AVAILABLE_MODELS } from "@/lib/types";
import { Sparkles, Clock, BookOpen, Scale, ArrowRight, FileText, Cpu, Check, ShieldCheck } from "lucide-react";
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
    if (lower.includes("brief") || lower.includes("minute") || lower.includes("rush") || lower.includes("quick") || lower.includes("short") || lower.includes("executive")) {
      mode = "brief";
    } else if (lower.includes("explain") || lower.includes("new") || lower.includes("beginner") || lower.includes("learn") || lower.includes("teach") || lower.includes("dad") || lower.includes("kid")) {
      mode = "explainer";
    } else if (lower.includes("both") || lower.includes("side") || lower.includes("compare") || lower.includes("debate") || lower.includes("argument") || lower.includes("trade-off")) {
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

  const selectedModelMeta = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  return (
    <section
      aria-label="Reading mode selection"
      className="my-10 rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-7 shadow-xs space-y-6"
    >
      {/* Header with Title and Engine Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              How do you want to read this?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select an archetype or describe your situation — powered by free & multi-fallback OpenRouter models.
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
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5">
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

      {/* Mode Selector Cards (Emil Kowalski Micro-Interactions) */}
      <div
        role="radiogroup"
        aria-label="Preset reading modes"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      >
        {/* Full Story Default Card */}
        <button
          type="button"
          role="radio"
          aria-checked={currentMode === null}
          disabled={isGenerating}
          onClick={() => onSelectMode(null)}
          className={cn(
            "group relative flex items-start gap-3 p-3.5 rounded-xl border text-left select-none cursor-pointer",
            "transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            currentMode === null
              ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-xs"
              : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
          )}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background border transition-colors mt-0.5",
              currentMode === null
                ? "text-primary border-primary/40 bg-primary/10"
                : "text-muted-foreground border-border/60 group-hover:text-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
          </div>
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <p className="font-serif font-bold text-sm text-foreground leading-snug truncate">
                Full Story
              </p>
              {currentMode === null && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              Standard editorial dispatch
            </p>
          </div>
        </button>

        {/* 4 Generated Reading Modes */}
        {(Object.keys(READING_MODES) as ReadingMode[]).map((modeKey) => {
          const meta = READING_MODES[modeKey];
          const Icon = modeIcons[modeKey];
          const isSelected = currentMode === modeKey;

          return (
            <button
              key={modeKey}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isGenerating}
              onClick={() => onSelectMode(modeKey, undefined, selectedModel)}
              className={cn(
                "group relative flex items-start gap-3 p-3.5 rounded-xl border text-left select-none cursor-pointer",
                "transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-xs"
                  : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background border transition-colors mt-0.5",
                  isSelected
                    ? "text-primary border-primary/40 bg-primary/10"
                    : "text-muted-foreground border-border/60 group-hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-serif font-bold text-sm text-foreground leading-snug truncate">
                    {meta.label}
                  </p>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  <span className="font-semibold text-foreground/80">{meta.badge}</span> · {meta.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Free Text Custom Prompt + Model Switcher */}
      <div className="space-y-3 pt-2">
        <form onSubmit={handleCustomSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Text Input with Submit Button */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                disabled={isGenerating}
                placeholder="Or describe: 'explain for my dad', 'focus on timeline', 'show promises'..."
                aria-label="Custom reading situation or prompt"
                className="w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 pr-24 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors shadow-2xs"
              />
              <button
                type="submit"
                disabled={!customText.trim() || isGenerating}
                className="absolute right-1.5 top-1.5 bottom-1.5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-xs transition-transform active:scale-[0.97] hover:opacity-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <span>Reshape</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Model Selector Dropdown with Free Badging */}
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-2 shrink-0 shadow-2xs">
              <Cpu className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isGenerating}
                className="bg-transparent text-xs font-mono text-foreground focus-visible:outline-none cursor-pointer font-medium"
                title="Select OpenRouter model (free & fallback enabled)"
                aria-label="Select LLM model"
              >
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-popover text-popover-foreground">
                    {m.isFree ? `[FREE] ${m.label}` : m.label}
                  </option>
                ))}
              </select>
              {selectedModelMeta.isFree && (
                <span className="hidden md:inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Zero Cost
                </span>
              )}
            </div>
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
              className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:border-border transition-colors cursor-pointer active:scale-[0.97] select-none"
            >
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
