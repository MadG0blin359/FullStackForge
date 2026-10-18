"use client";

import React from "react";
import { Compass } from "lucide-react";
import { WhyItMattersBlock as WhyItMattersBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";

interface WhyItMattersBlockProps {
  block: WhyItMattersBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function WhyItMattersBlockComponent({
  block,
  onSourceClick,
}: WhyItMattersBlockProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border/40 pb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Compass className="h-4 w-4" />
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {block.title || "Why It Matters"}
        </h3>
      </div>

      {/* Content */}
      <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
        {block.explanation}
      </p>

      <div className="flex justify-end pt-2">
        <SourceChip
          sourceRefs={block.sourceRefs}
          onSourceClick={onSourceClick}
        />
      </div>
    </div>
  );
}
