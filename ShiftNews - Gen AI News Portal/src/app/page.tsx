"use client";

import React, { useState } from "react";
import { Header, Footer, StoryCard } from "@/components/layout";
import { HeroMorphWidget } from "@/components/home/hero-morph-widget";
import { stories } from "@/data/stories";
import {
  Clock,
  BookOpen,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All Dispatches", "Technology", "Local", "World"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.26,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.99,
    transition: { duration: 0.15 },
  },
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Dispatches");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      selectedCategory === "All Dispatches" ||
      story.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const heroStory = filteredStories.length > 0 ? filteredStories[0] : stories[0];
  const secondaryStories = filteredStories.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-primary/20">
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-primary/[0.03] blur-3xl"
        aria-hidden="true"
      />

      {/* Live Hackathon Status Ticker */}
      <div className="w-full bg-primary/[0.04] border-b border-border/40 py-1.5 px-4 overflow-hidden select-none">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-foreground truncate">
              GEN AI NEWS ENGINE ACTIVE
            </span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline truncate">
              4 Adaptive Archetypes · 100% Attribution Grounding · Sub-second Fallbacks
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              OpenRouter Free Tier Ready
            </span>
          </div>
        </div>
      </div>

      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section with Macro-Whitespace */}
        <section
          className="relative pt-12 sm:pt-20 pb-14 px-4 sm:px-6 max-w-5xl mx-auto space-y-8"
          aria-labelledby="hero-heading"
        >
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-3.5 py-1 text-xs uppercase tracking-[0.16em] font-mono font-semibold text-primary shadow-2xs select-none">
            <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Generative UI News Portal · Free OpenRouter Cascade</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl">
            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08]"
            >
              Stories that reshape to match{" "}
              <span className="italic font-normal text-muted-foreground">
                how you need to read them.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal">
              One reader has 90 seconds on a commute. Another is new to the topic and lost in jargon. Another needs both sides of a debate. Open any dispatch below to reshape the layout in real time.
            </p>
          </div>

          {/* 4 Interactive Situations Showcase Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-blue-500/20 bg-card/90 hover:border-blue-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 shadow-2xs select-none transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 font-semibold">
                  Fast Brief
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;I have 2 minutes&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  What changed + key facts
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-emerald-500/20 bg-card/90 hover:border-emerald-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 shadow-2xs select-none transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                  Deep Explainer
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;I&apos;m new to this&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Timeline + glossary chips
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-purple-500/20 bg-card/90 hover:border-purple-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 shadow-2xs select-none transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400">
                  <Scale className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 font-semibold">
                  Dual Lens
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;Show both sides&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Balanced side-by-side
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-amber-500/20 bg-card/90 hover:border-amber-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 shadow-2xs select-none transition-[transform,border-color,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
                  Calm Read
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;Low-energy mode&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quiet, alarm-free pace
                </p>
              </div>
            </Link>
          </div>

          {/* Interactive Live Morph Hero Showcase */}
          <div className="pt-4">
            <HeroMorphWidget />
          </div>
        </section>

        {/* Filter Bar & Search */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-y border-border/40 py-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="News categories">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors select-none cursor-pointer whitespace-nowrap",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                      isSelected
                        ? "text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="category-active-pill"
                        className="absolute inset-0 rounded-full bg-primary shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative flex items-center min-w-[200px] sm:w-64">
              <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Filter stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border/60 bg-muted/20 pl-8 pr-3 py-1 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Lead Featured Story Section */}
        {filteredStories.length > 0 ? (
          <>
            <section
              className="mx-auto max-w-5xl px-4 sm:px-6 pt-2 pb-10"
              aria-label="Lead Story"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    Lead Story
                  </h2>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Click to open interactive reader
                </span>
              </div>

              <motion.div
                key={`hero-${heroStory.slug}`}
                initial={{ opacity: 0, y: 10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <StoryCard story={heroStory} variant="hero" />
              </motion.div>
            </section>

            {/* Secondary Stories Grid with Staggered Cascading */}
            {secondaryStories.length > 0 && (
              <section
                className="mx-auto max-w-5xl px-4 sm:px-6 pt-2 pb-20"
                aria-label="More Stories"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    In Today&apos;s Dispatch ({secondaryStories.length})
                  </h2>
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${selectedCategory}-${searchQuery}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    {secondaryStories.map((story) => (
                      <motion.div key={story.slug} variants={itemVariants}>
                        <StoryCard story={story} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </section>
            )}
          </>
        ) : (
          <div className="mx-auto max-w-5xl px-6 py-20 text-center space-y-3">
            <p className="text-lg font-serif font-bold text-foreground">
              No matching stories found
            </p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search query or switching categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All Dispatches");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-primary-foreground pressable"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Hackathon Architecture Pillars Section */}
        <section
          className="border-t border-border/40 bg-muted/10 py-20 px-4 sm:px-6"
          aria-labelledby="principles-heading"
        >
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary bg-primary/5">
                Built For Hackathon
              </Badge>
              <h3
                id="principles-heading"
                className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Generative UI as the solution, not a chatbot gimmick.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Rather than an unpredictable text assistant beside a generic card grid, the layout itself adapts safely through a constrained, type-safe component catalog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Principle 1 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-[border-color,box-shadow] duration-200 shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Accreditation &amp; Provenance
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Zero hallucinations. Every generated fact, timeline event, and comparison point is backlinked to its source paragraph. Readers can inspect citations with one click.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Paragraph Grounding</span>
                </div>
              </div>

              {/* Principle 2 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-[border-color,box-shadow] duration-200 shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Constrained UI Component Catalog
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The model never injects raw HTML. It selects and fills strictly typed Zod schemas: Timelines, Glossaries, Side-by-Side Debates, and Key Fact cards.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>8 Strictly Typed Zod Blocks</span>
                </div>
              </div>

              {/* Principle 3 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-[border-color,box-shadow] duration-200 shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Multi-Model Fallback Resilience
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Powered by OpenRouter free tiers (Llama 3.3 70B, Nvidia Nemotron, Cohere) with 12s timeout shielding and instant deterministic catalog fail-safe for zero downtime.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-purple-600 dark:text-purple-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Zero Downtime Architecture</span>
                </div>
              </div>
            </div>

            {/* Try it CTA */}
            <div className="text-center pt-4">
              <Link
                href="/story/quiet-revolution-battery-technology"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md pressable hover:opacity-95"
              >
                <span>Try the Live Intent Engine</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
