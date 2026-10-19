"use client";

import Link from "next/link";
import { Newspaper, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform active:scale-[0.97]"
          aria-label="ShiftNews home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Newspaper className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              ShiftNews
            </span>
            <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
              v1.0
            </span>
          </div>
        </Link>

        {/* Dynamic Status Island */}
        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1 text-xs font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Generative Edition
            </span>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-primary-foreground shadow-xs transition-transform active:scale-[0.97] hover:opacity-95"
          >
            <Sparkles className="h-3 w-3" />
            <span>Feed</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
