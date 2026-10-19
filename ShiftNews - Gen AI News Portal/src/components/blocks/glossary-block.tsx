"use client";

import React, { useState } from "react";
import { BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import { GlossaryBlock as GlossaryBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GlossaryBlockProps {
  block: GlossaryBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function GlossaryBlockComponent({
  block,
  onSourceClick,
}: GlossaryBlockProps) {
  const [activeTermIndex, setActiveTermIndex] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-amber-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <BookOpen className="h-4 w-4" />
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {block.title || "Key Concepts & Terminology"}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5 font-semibold"
        >
          {block.terms.length} Terms Defined
        </Badge>
      </div>

      {/* Term Cards */}
      <div className="space-y-3">
        {block.terms.map((item, index) => {
          const isSelected = activeTermIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveTermIndex(isSelected ? null : index)}
              className={cn(
                "rounded-xl border p-4 cursor-pointer select-none",
                "transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985]",
                isSelected
                  ? "border-amber-500/40 bg-amber-500/[0.04] shadow-xs"
                  : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-serif font-bold text-base text-foreground">
                    {item.term}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <SourceChip
                    sourceRefs={item.sourceRefs}
                    onSourceClick={onSourceClick}
                    className="shrink-0"
                  />
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isSelected && "rotate-180 text-foreground"
                    )}
                  />
                </div>
              </div>

              {isSelected && (
                <p className="mt-3 text-sm leading-relaxed text-foreground/90 pl-8.5 font-normal border-t border-amber-500/10 pt-3">
                  {item.definition}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
