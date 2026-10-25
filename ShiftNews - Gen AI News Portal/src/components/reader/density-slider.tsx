"use client";

import React from "react";
import { motion } from "motion/react";
import { Zap, Clock, BookOpen, Scale, FileText, Sliders } from "lucide-react";
import { ReadingMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface DensitySliderProps {
  currentMode: ReadingMode | null;
  onSelectMode: (mode: ReadingMode | null) => void;
  className?: string;
}

export interface DensityLevel {
  level: number;
  label: string;
  subLabel: string;
  mode: ReadingMode | null;
  timeEst: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DENSITY_LEVELS: DensityLevel[] = [
  {
    level: 1,
    label: "30s Rapid Skim",
    subLabel: "Key facts & numbers only",
    mode: "brief",
    timeEst: "30 sec",
    icon: Zap,
  },
  {
    level: 2,
    label: "2-Min Executive Brief",
    subLabel: "What changed today + summary",
    mode: "brief",
    timeEst: "2 min",
    icon: Clock,
  },
  {
    level: 3,
    label: "Deep Explainer",
    subLabel: "Timeline & context glossary",
    mode: "explainer",
    timeEst: "4 min",
    icon: BookOpen,
  },
  {
    level: 4,
    label: "Dual Lens Debate",
    subLabel: "Balanced opposing trade-offs",
    mode: "comparison",
    timeEst: "3.5 min",
    icon: Scale,
  },
  {
    level: 5,
    label: "Full Wire Dispatch",
    subLabel: "Complete original journalistic copy",
    mode: null,
    timeEst: "6 min",
    icon: FileText,
  },
];

export function DensitySlider({
  currentMode,
  onSelectMode,
  className = "",
}: DensitySliderProps) {
  // Map current mode to a density index
  const getIndexFromMode = (mode: ReadingMode | null): number => {
    if (mode === null) return 4;
    if (mode === "brief") return 1;
    if (mode === "explainer") return 2;
    if (mode === "comparison") return 3;
    if (mode === "calm") return 0;
    return 1;
  };

  const activeStep = getIndexFromMode(currentMode);

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep) return;
    haptic.tick();
    const target = DENSITY_LEVELS[newStep];
    onSelectMode(target.mode);
  };

  const currentLevel = DENSITY_LEVELS[activeStep];
  const Icon = currentLevel.icon;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5 space-y-4 select-none",
        className
      )}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sliders className="h-4 w-4" />
          </span>
          <div>
            <h4 className="font-serif text-sm font-bold text-foreground flex items-center gap-2">
              <span>Information Density Dial</span>
              <span className="font-mono text-[11px] font-normal text-muted-foreground">
                (Continuous Granularity)
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Slide to scale journalistic depth from quick glance to deep investigation.
            </p>
          </div>
        </div>

        {/* Current Level Pill */}
        <div className="flex items-center gap-2 bg-background/80 border border-border/60 rounded-full px-3 py-1 shadow-2xs text-xs font-mono">
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold text-foreground">
            {currentLevel.label}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-primary font-medium">{currentLevel.timeEst}</span>
        </div>
      </div>

      {/* Slider Track with Snapping Ticks */}
      <div className="space-y-2 pt-2">
        <div className="relative flex items-center h-8">
          {/* Background Rail */}
          <div className="absolute inset-x-0 h-2 rounded-full bg-muted/80 border border-border/50" />

          {/* Active Gradient Fill */}
          <motion.div
            className="absolute left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-primary"
            style={{
              width: `${(activeStep / (DENSITY_LEVELS.length - 1)) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />

          {/* Step Snap Nodes */}
          {DENSITY_LEVELS.map((step, idx) => {
            const isPassed = idx <= activeStep;
            const isCurrent = idx === activeStep;

            return (
              <button
                key={step.level}
                type="button"
                onClick={() => handleStepChange(idx)}
                className="absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer focus-visible:outline-none"
                style={{
                  left: `${(idx / (DENSITY_LEVELS.length - 1)) * 100}%`,
                }}
                title={step.label}
                aria-label={`Set density to ${step.label}`}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-125",
                    isCurrent
                      ? "border-primary bg-background ring-4 ring-primary/20 scale-125 shadow-sm"
                      : isPassed
                      ? "border-primary bg-primary"
                      : "border-border bg-background"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Labels below ticks */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1 px-1">
          <span>Skim (30s)</span>
          <span className="hidden sm:inline">Brief (2m)</span>
          <span>Explainer (4m)</span>
          <span className="hidden sm:inline">Dual Lens</span>
          <span>Full Wire</span>
        </div>
      </div>
    </div>
  );
}
