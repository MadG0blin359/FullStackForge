"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { BriefBlock as BriefBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { Badge } from "@/components/ui/badge";

interface BriefBlockProps {
  block: BriefBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function BriefBlockComponent({ block, onSourceClick }: BriefBlockProps) {
  return (
    <div className="rounded-2xl border border-blue-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Sparkles className="h-4 w-4" />
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {block.title || "Executive Brief"}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/5 font-semibold"
        >
          2-Min Reading Mode
        </Badge>
      </div>

      {/* Summary */}
      <div className="space-y-3">
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
          {block.summary}
        </p>
        <div className="flex justify-end pt-1">
          <SourceChip
            sourceRefs={block.sourceRefs}
            onSourceClick={onSourceClick}
          />
        </div>
      </div>

      {/* What Changed Strip */}
      {block.whatChanged && (
        <div className="group/strip rounded-xl border border-blue-500/25 bg-blue-500/[0.04] hover:bg-blue-500/[0.07] p-4 transition-[background-color,border-color] duration-160">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xs group-hover/strip:translate-x-0.5 transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <ArrowRight className="h-3 w-3" />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                What Changed Today
              </p>
              <p className="text-sm leading-relaxed text-foreground font-medium">
                {block.whatChanged}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
