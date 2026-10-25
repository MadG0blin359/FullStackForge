"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles, BookOpen, Scale } from "lucide-react";
import { cn, formatDate, readingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import type { Story } from "@/lib/types";

interface StoryCardProps {
  story: Story;
  variant?: "hero" | "default";
}

export function StoryCard({ story, variant = "default" }: StoryCardProps) {
  const allText = story.paragraphs.map((p) => p.text).join(" ");
  const minutes = readingTime(allText);
  const isHero = variant === "hero";

  return (
    <TiltCard
      maxTilt={isHero ? 4 : 6}
      stiffness={280}
      damping={22}
      className={cn(
        "rounded-[1.75rem]",
        isHero && "lg:col-span-full"
      )}
    >
      <div
        className={cn(
          "rounded-[1.75rem] p-1 sm:p-1.5 bg-muted/40 border border-border/50 ring-1 ring-border/20 shadow-2xs select-none",
          "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/5 active:scale-[0.985]"
        )}
      >
        <article
          className={cn(
            "group relative flex flex-col h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-border/40 bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] cursor-pointer",
            isHero && "lg:flex-row lg:items-stretch"
          )}
        >
          {/* Visual Frame */}
          <div
            className={cn(
              "relative overflow-hidden bg-muted/60 min-h-[220px]",
              isHero ? "lg:w-5/12 lg:min-h-[380px]" : "aspect-[16/10]"
            )}
          >
            {/* Subtle dynamic backdrop */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]",
                story.category === "Technology" && "from-blue-500/20 via-muted to-muted/80",
                story.category === "Local" && "from-emerald-500/20 via-muted to-muted/80",
                story.category === "World" && "from-purple-500/20 via-muted to-muted/80"
              )}
              role="img"
              aria-label={story.imageAlt}
            >
              {/* Category & Tagline Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "border text-xs font-semibold tracking-wide backdrop-blur-md px-3 py-1 rounded-full shadow-2xs",
                    story.category === "Technology" && "border-blue-500/30 text-blue-700 dark:text-blue-400 bg-background/90",
                    story.category === "Local" && "border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-background/90",
                    story.category === "World" && "border-purple-500/30 text-purple-700 dark:text-purple-400 bg-background/90"
                  )}
                >
                  {story.category}
                </Badge>

                {isHero && (
                  <Badge
                    variant="outline"
                    className="hidden sm:inline-flex border-primary/30 text-primary bg-background/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-semibold"
                  >
                    Featured Dispatch
                  </Badge>
                )}
              </div>

              {/* Sub-label */}
              <div
                aria-hidden="true"
                className="absolute bottom-4 right-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/80 select-none bg-background/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-border/30"
              >
                ShiftNews Vetted
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div
            className={cn(
              "flex flex-1 flex-col justify-between p-6 sm:p-7",
              isHero && "lg:p-9"
            )}
          >
            <div className="space-y-3.5">
              {/* Read time & date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-mono font-medium">
                  <Clock className="h-3 w-3 text-primary" />
                  {minutes} min standard
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={story.publishedAt}>
                  {formatDate(story.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  4 Generative Views
                </span>
              </div>

              {/* Title with full card link */}
              <Link
                href={`/story/${story.slug}`}
                className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              >
                <h2
                  className={cn(
                    "font-serif font-bold tracking-tight text-foreground leading-[1.18] transition-colors duration-200 group-hover:text-primary",
                    isHero ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl"
                  )}
                >
                  {story.title}
                </h2>
              </Link>

              {/* Subtitle */}
              <p
                className={cn(
                  "text-sm leading-relaxed text-muted-foreground font-normal",
                  isHero ? "line-clamp-3 sm:text-base" : "line-clamp-2"
                )}
              >
                {story.subtitle}
              </p>

              {/* Intent Preview Chips */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                  <Sparkles className="h-2.5 w-2.5" />
                  2-Min Brief
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <BookOpen className="h-2.5 w-2.5" />
                  Explainer
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  <Scale className="h-2.5 w-2.5" />
                  Both Sides
                </span>
              </div>
            </div>

            {/* Footer: Author & Nested Action Pill */}
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-border/40 mt-6">
              <span className="text-xs font-medium text-muted-foreground">
                By <strong className="text-foreground font-semibold">{story.author}</strong>
              </span>

              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-2xs">
                <Sparkles className="h-3 w-3 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                <span>Reshape View</span>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10 group-hover:bg-primary-foreground/20 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </TiltCard>
  );
}
