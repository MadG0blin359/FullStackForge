"use client";

import React from "react";
import { Quote as QuoteIcon } from "lucide-react";
import { QuoteBlock as QuoteBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";

interface QuoteBlockProps {
  block: QuoteBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function QuoteBlockComponent({
  block,
  onSourceClick,
}: QuoteBlockProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/95 p-7 sm:p-8 relative overflow-hidden shadow-xs">
      <QuoteIcon className="absolute -right-3 -top-3 h-24 w-24 text-primary/5 pointer-events-none select-none" />

      <blockquote className="space-y-5 relative z-10">
        <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-foreground tracking-tight">
          &ldquo;{block.text}&rdquo;
        </p>

        <footer className="flex items-center justify-between gap-3 pt-4 border-t border-border/40 flex-wrap">
          <cite className="text-xs sm:text-sm font-semibold not-italic text-foreground/80 font-mono tracking-wide">
            — {block.attribution}
          </cite>
          <SourceChip
            sourceRefs={block.sourceRefs}
            onSourceClick={onSourceClick}
          />
        </footer>
      </blockquote>
    </div>
  );
}
