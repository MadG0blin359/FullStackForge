"use client";

import React from "react";
import { Scale, ThumbsUp, ThumbsDown } from "lucide-react";
import { ComparisonBlock as ComparisonBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { Badge } from "@/components/ui/badge";

interface ComparisonBlockProps {
  block: ComparisonBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function ComparisonBlockComponent({
  block,
  onSourceClick,
}: ComparisonBlockProps) {
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

      {/* Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Side A */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.03] p-5 flex flex-col h-full space-y-4">
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
        </div>

        {/* Side B */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 flex flex-col h-full space-y-4">
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
        </div>
      </div>
    </div>
  );
}
