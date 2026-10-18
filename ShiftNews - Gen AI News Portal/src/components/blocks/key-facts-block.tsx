"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { KeyFactsBlock as KeyFactsBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";

interface KeyFactsBlockProps {
  block: KeyFactsBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function KeyFactsBlockComponent({
  block,
  onSourceClick,
}: KeyFactsBlockProps) {
  return (
    <div className="rounded-2xl border border-blue-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border/40 pb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {block.title || "Key Facts to Know"}
        </h3>
      </div>

      {/* Fact List */}
      <ul className="space-y-3">
        {block.facts.map((fact, index) => (
          <li
            key={index}
            className="group flex items-start justify-between gap-4 p-3.5 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-start gap-3.5 flex-1">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-mono font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
                {fact.text}
              </span>
            </div>
            <SourceChip
              sourceRefs={fact.sourceRefs}
              onSourceClick={onSourceClick}
              className="shrink-0 mt-0.5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
