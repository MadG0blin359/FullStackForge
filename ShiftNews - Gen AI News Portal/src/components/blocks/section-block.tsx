"use client";

import React from "react";
import { SectionBlock as SectionBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";

interface SectionBlockProps {
  block: SectionBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function SectionBlockComponent({
  block,
  onSourceClick,
}: SectionBlockProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/95 p-6 sm:p-7 shadow-xs space-y-4">
      {block.title && (
        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border/40 pb-3">
          {block.title}
        </h3>
      )}
      <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
        {block.content}
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
