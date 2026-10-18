"use client";

import React from "react";
import { Block } from "@/lib/types";
import { safeValidateBlock } from "@/lib/schemas";
import { BriefBlockComponent } from "./brief-block";
import { KeyFactsBlockComponent } from "./key-facts-block";
import { TimelineBlockComponent } from "./timeline-block";
import { GlossaryBlockComponent } from "./glossary-block";
import { ComparisonBlockComponent } from "./comparison-block";
import { QuoteBlockComponent } from "./quote-block";
import { WhyItMattersBlockComponent } from "./why-it-matters-block";
import { SectionBlockComponent } from "./section-block";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlockRendererProps {
  block: Block;
  onSourceClick?: (paragraphId: string) => void;
}

export function BlockRenderer({ block, onSourceClick }: BlockRendererProps) {
  // Validate block with Zod schema
  const validation = safeValidateBlock(block);

  if (!validation.success) {
    return (
      <Card className="border-dashed border-amber-500/40 bg-amber-500/5 p-4">
        <CardContent className="p-0 flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Invalid block schema encountered</p>
            <p className="opacity-80">
              Type: {block.type || "unknown"} - falling back safely to avoid layout break.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const validBlock = validation.data;

  switch (validBlock.type) {
    case "brief":
      return (
        <BriefBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "key-facts":
      return (
        <KeyFactsBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "timeline":
      return (
        <TimelineBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "glossary":
      return (
        <GlossaryBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "comparison":
      return (
        <ComparisonBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "quote":
      return (
        <QuoteBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "why-it-matters":
      return (
        <WhyItMattersBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    case "section":
      return (
        <SectionBlockComponent
          block={validBlock}
          onSourceClick={onSourceClick}
        />
      );

    default: {
      const exhaustiveCheck: never = validBlock;
      return (
        <Card className="border-border bg-muted/40 p-4">
          <p className="text-xs text-muted-foreground">
            Unsupported block type: {(exhaustiveCheck as { type?: string })?.type}
          </p>
        </Card>
      );
    }
  }
}
