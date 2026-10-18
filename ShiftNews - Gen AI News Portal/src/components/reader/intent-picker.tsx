"use client";

import React, { useState } from "react";
import { ReadingMode, READING_MODES } from "@/lib/types";
import { Sparkles, Clock, BookOpen, Scale, ArrowRight, Compass, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntentPickerProps {
  currentMode: ReadingMode | null;
  onSelectMode: (mode: ReadingMode | null) => void;
  isGenerating?: boolean;
}

const modeIcons: Record<ReadingMode, React.ComponentType<{ className?: string }>> = {
  brief: Clock,
  explainer: BookOpen,
  comparison: Scale,
  calm: Sparkles,
};

export function IntentPicker({
  currentMode,
  onSelectMode,
  isGenerating = false,
}: IntentPickerProps) {
  const [customText, setCustomText] = useState("");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() || isGenerating) return;

    // Simple heuristic parser for free text
    const lower = customText.toLowerCase();
    if (lower.includes("brief") || lower.includes("minute") || lower.includes("rush") || lower.includes("quick") || lower.includes("short")) {
      onSelectMode("brief");
    } else if (lower.includes("explain") || lower.includes("new") || lower.includes("beginner") || lower.includes("learn") || lower.includes("teach") || lower.includes("kid") || lower.includes("dad")) {
      onSelectMode("explainer");
    } else if (lower.includes("both") || lower.includes("side") || lower.includes("compare") || lower.includes("debate") || lower.includes("bias") || lower.includes("neutral")) {
      onSelectMode("comparison");
    } else {
      onSelectMode("calm");
    }
  };

  return (
    <section
      aria-label="Reading mode selection"
      className="my-10 rounded-2xl border border-border/70 bg-card/95 p-6 sm:p-8 shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-5">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            How do you want to read this?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            Select an archetype below or describe your situation — the article dynamically restructures into a purpose-built view.
          </p>
        </div>

        {/* Active status indicator */}
        <div
          aria-live="polite"
          className="self-start sm:self-center shrink-0"
        >
          {isGenerating ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary animate-pulse">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              Reshaping...
            </span>
          ) : currentMode ? (
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5">
              Active: {READING_MODES[currentMode].badge}
            </Badge>
          ) : (
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-mono">
              Full Original Story
            </Badge>
          )}
        </div>
      </div>

      {/* Mode Selector Bento Grid */}
      <div
        role="radiogroup"
        aria-label="Preset reading modes"
        className="grid grid-cols-2 lg:grid-cols-5 gap-3"
      >
        {/* Full Story Default */}
        <button
          type="button"
          role="radio"
          aria-checked={currentMode === null}
          disabled={isGenerating}
          onClick={() => onSelectMode(null)}
          className={cn(
            "group relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer",
            "active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            currentMode === null
              ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-xs"
              : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border/60 text-muted-foreground group-hover:text-foreground">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
              Default
            </span>
          </div>
          <div>
            <p className="font-serif font-bold text-sm sm:text-base text-foreground leading-snug">
              Full Story
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              Standard editorial
            </p>
          </div>
        </button>

        {/* 4 Generated Modes */}
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
              onClick={() => onSelectMode(modeKey)}
              className={cn(
                "group relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer",
                "active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-xs"
                  : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border/60 transition-colors",
                  isSelected ? "text-primary border-primary/40" : "text-muted-foreground group-hover:text-primary"
                )}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
                  {meta.badge}
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm sm:text-base text-foreground leading-snug">
                  {meta.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {meta.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Free text prompt input with Button-in-Button submit */}
      <form
        onSubmit={handleCustomSubmit}
        className="relative flex items-center pt-1"
      >
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          disabled={isGenerating}
          placeholder="Describe your situation: 'explaining this to my dad', 'in a rush', 'show opposing arguments'..."
          aria-label="Custom reading situation or prompt"
          className="w-full rounded-xl border border-border/80 bg-background px-4 sm:px-5 py-3 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors shadow-2xs"
        />
        <button
          type="submit"
          disabled={!customText.trim() || isGenerating}
          className="group absolute right-2 top-2 inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform active:scale-[0.97] hover:opacity-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span>Reshape</span>
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-foreground/20 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="h-2.5 w-2.5" />
          </div>
        </button>
      </form>
    </section>
  );
}
