"use client";

import React, { useState, useRef } from "react";
import { Link2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SourceRef } from "@/lib/types";
import { stories } from "@/data/stories";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface SourceChipProps {
  sourceRefs: SourceRef[];
  onSourceClick?: (paragraphId: string) => void;
  className?: string;
  variant?: "badge" | "inline";
}

// Global cached paragraph lookup
function getParagraphExcerpt(paragraphId: string): string | null {
  for (const s of stories) {
    const p = s.paragraphs.find((para) => para.id === paragraphId);
    if (p) return p.text;
  }
  return null;
}

export function SourceChip({
  sourceRefs,
  onSourceClick,
  className,
  variant = "badge",
}: SourceChipProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!sourceRefs || sourceRefs.length === 0) return null;

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveHoverId(id);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverId(null);
    }, 180);
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 flex-wrap relative",
        className
      )}
      aria-label="Source citations"
    >
      {sourceRefs.map((ref, idx) => {
        // Extract paragraph number from ID like "battery-p3" -> "¶3"
        const match = ref.paragraphId.match(/p(\d+)$/i);
        const label = match ? `¶${match[1]}` : ref.paragraphId;
        const excerpt = getParagraphExcerpt(ref.paragraphId);
        const isHovered = activeHoverId === ref.paragraphId;

        return (
          <div
            key={`${ref.paragraphId}-${idx}`}
            className="relative inline-block"
            onMouseEnter={() => handleMouseEnter(ref.paragraphId)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                haptic.tick();
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

            {/* Holographic Citation Preview Popover */}
            <AnimatePresence>
              {isHovered && excerpt && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 sm:w-80 p-3.5 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-xl text-left pointer-events-auto space-y-2 select-text"
                  role="tooltip"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-border/40 pb-1.5">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Verified Citation</span>
                    </span>
                    <span className="bg-primary/10 text-primary px-1.5 py-0.2 rounded font-bold">
                      {label}
                    </span>
                  </div>

                  <p className="text-xs text-foreground/90 font-normal leading-relaxed italic line-clamp-4">
                    &ldquo;{excerpt}&rdquo;
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Click chip to jump to text</span>
                    <ArrowRight className="h-2.5 w-2.5 text-primary" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </span>
  );
}
