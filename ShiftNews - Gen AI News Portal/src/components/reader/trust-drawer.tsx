"use client";

import React from "react";
import { ShieldCheck, Cpu, Database, CheckCircle, ArrowRight } from "lucide-react";
import { ReadingMode, GeneratedLayout, Story, READING_MODES } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface TrustDrawerProps {
  story: Story;
  layout: GeneratedLayout | null;
  mode: ReadingMode | null;
  onSourceClick?: (paragraphId: string) => void;
}

export function TrustDrawer({
  story,
  layout,
  mode,
  onSourceClick,
}: TrustDrawerProps) {
  // Extract all cited paragraph IDs across all blocks
  const citedParagraphIds = Array.from(
    new Set(
      layout?.blocks.flatMap((block) => {
        if ("sourceRefs" in block) {
          return block.sourceRefs.map((r) => r.paragraphId);
        }
        if (block.type === "key-facts") {
          return block.facts.flatMap((f) => f.sourceRefs.map((r) => r.paragraphId));
        }
        if (block.type === "timeline") {
          return block.events.flatMap((e) => e.sourceRefs.map((r) => r.paragraphId));
        }
        if (block.type === "glossary") {
          return block.terms.flatMap((t) => t.sourceRefs.map((r) => r.paragraphId));
        }
        if (block.type === "comparison") {
          return [
            ...block.sideA.points.flatMap((p) => p.sourceRefs.map((r) => r.paragraphId)),
            ...block.sideB.points.flatMap((p) => p.sourceRefs.map((r) => r.paragraphId)),
          ];
        }
        return [];
      }) || []
    )
  );

  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
        <span>How this view was made</span>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left space-y-2 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <SheetTitle className="font-serif text-lg font-bold">
                Trust & Verification Ledger
              </SheetTitle>
              <SheetDescription className="text-xs">
                Inspect how generative UI safely reshaped this article.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-5 space-y-6 text-sm">
          {/* Mode & Prompt explanation */}
          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-primary" />
              Active Reading Mode
            </h4>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {mode ? READING_MODES[mode].label : "Standard Editorial View"}
                </span>
                <Badge variant="secondary" className="text-xs font-mono">
                  {mode ? READING_MODES[mode].badge : "Full Story"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {mode
                  ? READING_MODES[mode].description
                  : "The complete, original reporting displayed in rhythmic typography."}
              </p>
            </div>
          </section>

          {/* Architecture Guardrails */}
          <section className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-primary" />
              Constrained Generation Guardrails
            </h4>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 space-y-2 text-xs text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Vetted Component Catalog:</strong> AI can only assemble strictly typed blocks (Timeline, KeyFacts, Comparison, Brief), preventing erratic raw HTML injection.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Zod Schema Validation:</strong> Every generated layout is runtime-validated before rendering. Any malformed structure falls back safely.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Deterministic Safety:</strong> If network or generation fails, instant zero-loss fallback displays the standard article layout.
                </span>
              </div>
            </div>
          </section>

          {/* Source paragraph mapping */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Source Citations ({citedParagraphIds.length} Paragraphs)
              </h4>
              <span className="text-[11px] text-muted-foreground">
                Click to jump & highlight
              </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {citedParagraphIds.length === 0 ? (
                <p className="text-xs text-muted-foreground italic p-2">
                  No citations in current view (full original text displayed).
                </p>
              ) : (
                citedParagraphIds.map((pId) => {
                  const para = story.paragraphs.find((p) => p.id === pId);
                  const match = pId.match(/p(\d+)$/i);
                  const label = match ? `Paragraph ${match[1]}` : pId;

                  return (
                    <button
                      key={pId}
                      type="button"
                      onClick={() => onSourceClick?.(pId)}
                      className="w-full text-left rounded-lg border border-border/50 bg-background p-2.5 hover:bg-muted/40 hover:border-primary/50 transition-all group flex items-start justify-between gap-2 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary">
                          {label}
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {para?.text || "Original text snippet"}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
