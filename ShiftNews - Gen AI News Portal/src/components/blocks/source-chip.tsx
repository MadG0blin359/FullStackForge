"use client";

import React from "react";
import { Link2 } from "lucide-react";
import { SourceRef } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SourceChipProps {
  sourceRefs: SourceRef[];
  onSourceClick?: (paragraphId: string) => void;
  className?: string;
  variant?: "badge" | "inline";
}

export function SourceChip({
  sourceRefs,
  onSourceClick,
  className,
  variant = "badge",
}: SourceChipProps) {
  if (!sourceRefs || sourceRefs.length === 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 flex-wrap",
        className
      )}
      aria-label="Source citations"
    >
      {sourceRefs.map((ref, idx) => {
        // Extract paragraph number from ID like "battery-p3" -> "¶3"
        const match = ref.paragraphId.match(/p(\d+)$/i);
        const label = match ? `¶${match[1]}` : ref.paragraphId;

        return (
          <button
            key={`${ref.paragraphId}-${idx}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSourceClick?.(ref.paragraphId);
            }}
            className={cn(
              "group/chip inline-flex items-center gap-1.5 select-none cursor-pointer",
              "transition-[transform,background-color,color,border-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              variant === "badge"
                ? "px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-muted/60 text-muted-foreground hover:bg-primary hover:text-primary-foreground border border-border/70 shadow-2xs hover:border-primary"
                : "px-1.5 py-0.2 text-[11px] font-mono text-muted-foreground hover:text-primary underline decoration-dotted decoration-muted-foreground/50 hover:decoration-primary"
            )}
            title={`Verified citation — Click to jump to original paragraph ${label}`}
            aria-label={`Jump to original source paragraph ${label}`}
          >
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground/10 group-hover/chip:bg-primary-foreground/20 transition-colors duration-160">
              <Link2 className="h-2.5 w-2.5" />
            </div>
            <span>{label}</span>
          </button>
        );
      })}
    </span>
  );
}
