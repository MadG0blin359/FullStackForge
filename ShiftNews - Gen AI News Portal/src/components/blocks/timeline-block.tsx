"use client";

import React from "react";
import { History, Calendar } from "lucide-react";
import { TimelineBlock as TimelineBlockType } from "@/lib/types";
import { SourceChip } from "./source-chip";

interface TimelineBlockProps {
  block: TimelineBlockType;
  onSourceClick?: (paragraphId: string) => void;
}

export function TimelineBlockComponent({
  block,
  onSourceClick,
}: TimelineBlockProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-card/95 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border/40 pb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <History className="h-4 w-4" />
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {block.title || "How We Got Here: Timeline"}
        </h3>
      </div>

      {/* Timeline Sequence */}
      <div className="relative pl-7 space-y-6 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-border before:to-transparent">
        {block.events.map((event, index) => (
          <div key={index} className="relative group">
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500 ring-4 ring-emerald-500/15 group-hover:scale-115 transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)]" />

            <div className="space-y-2 rounded-xl border border-border/40 bg-muted/20 p-4 sm:p-5 transition-[background-color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted/40 hover:border-emerald-500/30">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                </span>
                <SourceChip
                  sourceRefs={event.sourceRefs}
                  onSourceClick={onSourceClick}
                />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-foreground">
                {event.label}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
