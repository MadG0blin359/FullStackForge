"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn, formatDate, readingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/5 active:scale-[0.99] cursor-pointer",
        isHero && "lg:flex-row lg:items-stretch"
      )}
    >
      {/* Visual Frame */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted/60 min-h-[220px]",
          isHero ? "lg:w-5/12 lg:min-h-[360px]" : "aspect-[16/10]"
        )}
      >
        {/* Category badge floating on card */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-105",
            story.category === "Technology" && "from-blue-500/10 via-muted to-muted/80",
            story.category === "Local" && "from-emerald-500/10 via-muted to-muted/80",
            story.category === "World" && "from-purple-500/10 via-muted to-muted/80"
          )}
          role="img"
          aria-label={story.imageAlt}
        >
          <div className="absolute top-4 left-4 z-10">
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
          </div>

          <div aria-hidden="true" className="absolute bottom-4 right-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/75 select-none">
            ShiftNews
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between p-6 sm:p-7",
          isHero && "lg:p-10"
        )}
      >
        <div className="space-y-3.5">
          {/* Read time & date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-mono">
              <Clock className="h-3 w-3" />
              {minutes} min read
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={story.publishedAt}>
              {formatDate(story.publishedAt)}
            </time>
          </div>

          {/* Title with full card link */}
          <Link
            href={`/story/${story.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            <h2
              className={cn(
                "font-serif font-bold tracking-tight text-foreground leading-[1.18] transition-colors group-hover:text-primary",
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
        </div>

        {/* Footer: Author & Nested Action Pill */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-border/40 mt-6">
          <span className="text-xs font-medium text-muted-foreground">
            By <strong className="text-foreground font-semibold">{story.author}</strong>
          </span>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-2xs">
            <span>Read in 4 Modes</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 group-hover:bg-primary-foreground/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
