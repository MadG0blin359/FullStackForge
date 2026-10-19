"use client";

import React, { useState } from "react";
import { BookOpen, HelpCircle, ChevronDown, Search, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  const [filterQuery, setFilterQuery] = useState("");

  const filteredTerms = block.terms.filter((t) =>
    t.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.definition.toLowerCase().includes(filterQuery.toLowerCase())
  );

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
          {block.terms.length} Terms Explained
        </Badge>
      </div>

      {/* Concept Filter Input for Quick Lookups */}
      {block.terms.length > 2 && (
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search jargon terms (e.g. 'Solid-State', 'Electrolyte')..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-muted/20 pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors shadow-2xs"
          />
        </div>
      )}

      {/* Interactive Term Cards with Expanded Explanations */}
      <div className="space-y-3">
        {filteredTerms.map((item, index) => {
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base text-foreground">
                      {item.term}
                    </span>
                    <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10">
                      Plain English
                    </span>
                  </div>
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

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3.5 pt-3.5 border-t border-amber-500/15 space-y-2.5">
                      <p className="text-sm leading-relaxed text-foreground/90 pl-1 font-normal">
                        {item.definition}
                      </p>
                      {item.sourceRefs.length > 0 && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSourceClick?.(item.sourceRefs[0].paragraphId);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline cursor-pointer"
                          >
                            <span>Read context in reporting</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
