"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { Story, ReadingMode, GeneratedLayout, READING_MODES, AVAILABLE_MODELS } from "@/lib/types";
import { getLayout } from "@/data/layouts";
import { formatDate, readingTime, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Header, Footer } from "@/components/layout";
import { BlockRenderer, BlockSkeleton } from "@/components/blocks";
import { IntentPicker } from "./intent-picker";
import { TrustDrawer } from "./trust-drawer";
import { AccessibilityPanel, AccessibilitySettings } from "./accessibility-panel";
import { AudioReader } from "./audio-reader";

interface StoryReaderProps {
  story: Story;
}

export function StoryReader({ story }: StoryReaderProps) {
  const [currentMode, setCurrentMode] = useState<ReadingMode | null>(null);
  const [layout, setLayout] = useState<GeneratedLayout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedBlockCount, setStreamedBlockCount] = useState<number>(0);
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [activeModel, setActiveModel] = useState<string>(AVAILABLE_MODELS[0].id);
  const [generationSource, setGenerationSource] = useState<"openrouter" | "catalog">("catalog");

  // Accessibility state
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontFamily: "sans",
    textSize: "base",
    lineHeight: "normal",
    highContrast: false,
    reduceMotion: false,
    theme: "system",
  });

  const paragraphRefs = useRef<Map<string, HTMLElement>>(new Map());
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Function to register paragraph DOM nodes
  const registerParagraphRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) {
      paragraphRefs.current.set(id, el);
    } else {
      paragraphRefs.current.delete(id);
    }
  }, []);

  // Jump to & highlight source paragraph
  const handleSourceClick = useCallback((paragraphId: string) => {
    // If in generated mode and original text is collapsed, expand it
    setShowOriginalText(true);
    setHighlightedParagraphId(paragraphId);

    setTimeout(() => {
      const el = paragraphRefs.current.get(paragraphId);
      if (el) {
        el.scrollIntoView({ behavior: settings.reduceMotion ? "auto" : "smooth", block: "center" });
        el.focus?.();
      }
    }, 150);

    // Auto-clear highlight ring after 3.2 seconds
    setTimeout(() => {
      setHighlightedParagraphId((curr) => (curr === paragraphId ? null : curr));
    }, 3200);
  }, [settings.reduceMotion]);

  // Mode selection & live OpenRouter generation
  const handleSelectMode = async (
    newMode: ReadingMode | null,
    customPrompt?: string,
    modelName?: string
  ) => {
    if (newMode === null) {
      setCurrentMode(null);
      setLayout(null);
      setIsGenerating(false);
      setStreamedBlockCount(0);
      return;
    }

    const modelToUse = modelName || activeModel;
    setActiveModel(modelToUse);
    setIsGenerating(true);
    setStreamedBlockCount(0);
    setCurrentMode(newMode);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storySlug: story.slug,
          mode: newMode,
          userPrompt: customPrompt,
          model: modelToUse,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const data = await res.json();
      const targetLayout: GeneratedLayout = data.layout;

      if (!targetLayout || !targetLayout.blocks || targetLayout.blocks.length === 0) {
        throw new Error("Empty layout returned");
      }

      setGenerationSource(data.source === "openrouter" ? "openrouter" : "catalog");
      setLayout(targetLayout);
      setIsGenerating(false);

      // Stream cascade of blocks
      const totalBlocks = targetLayout.blocks.length;
      let count = 1;
      setStreamedBlockCount(1);
      const interval = setInterval(() => {
        count++;
        setStreamedBlockCount(count);
        if (count >= totalBlocks) {
          clearInterval(interval);
        }
      }, 100);
    } catch (err) {
      console.warn("Live generation error, using catalog fallback:", err);
      const fallbackLayout = getLayout(story.slug, newMode);
      setGenerationSource("catalog");
      setLayout(fallbackLayout || null);
      setIsGenerating(false);
      if (fallbackLayout) {
        setStreamedBlockCount(fallbackLayout.blocks.length);
      }
    }
  };

  const allWords = story.paragraphs.map((p) => p.text).join(" ");
  const baseMinutes = readingTime(allWords);

  // Typography class based on accessibility settings
  const getTextSizeClass = () => {
    switch (settings.textSize) {
      case "sm": return "text-sm";
      case "lg": return "text-lg";
      case "xl": return "text-xl";
      default: return "text-base";
    }
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case "relaxed": return "leading-loose";
      case "loose": return "leading-[2.2]";
      default: return "leading-relaxed";
    }
  };

  return (
    <div
      data-mode={currentMode === "calm" ? "calm" : undefined}
      className={cn(
        "min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative",
        currentMode === "calm" && "selection:bg-amber-100 dark:selection:bg-amber-950"
      )}
    >
      <Header />

      <main id="main-content" className="flex-1 pb-24">
        <article className="prose-measure mx-auto px-4 sm:px-6 pt-10">
          {/* Back button & Category */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all active:scale-[0.97]"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10 group-hover:-translate-x-0.5 transition-transform">
                <ArrowLeft className="h-2.5 w-2.5" />
              </div>
              <span>Back to Dispatch</span>
            </Link>

            <Badge
              variant="outline"
              className={cn(
                "rounded-full text-[11px] font-semibold tracking-wide px-3 py-1 shadow-2xs",
                story.category === "Technology" && "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5",
                story.category === "Local" && "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5",
                story.category === "World" && "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/5"
              )}
            >
              {story.category}
            </Badge>
          </div>

          {/* Story Header */}
          <header className="space-y-5 mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.12]">
              {story.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal">
              {story.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-border/40 pb-5 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground">{story.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-xs">{baseMinutes} min standard read</span>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <AudioReader story={story} layout={layout} mode={currentMode} />
                <TrustDrawer
                  story={story}
                  layout={layout}
                  mode={currentMode}
                  onSourceClick={handleSourceClick}
                />
                <AccessibilityPanel
                  settings={settings}
                  onSettingsChange={setSettings}
                />
              </div>
            </div>
          </header>

          {/* Generative UI Intent Picker */}
          <IntentPicker
            currentMode={currentMode}
            onSelectMode={handleSelectMode}
            isGenerating={isGenerating}
          />

          {/* Dynamic Content View Area */}
          <div ref={articleContentRef} className="space-y-7 pt-2">
            {/* Live generation loading skeleton */}
            {isGenerating && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-mono text-primary font-medium">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Synthesizing custom layout blocks...</span>
                </div>
                <BlockSkeleton />
                <BlockSkeleton />
              </div>
            )}

            {/* Generated Layout View */}
            {!isGenerating && layout && (
              <motion.div
                initial={settings.reduceMotion ? false : { opacity: 0, transform: "translateY(12px) scale(0.98)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-7"
              >
                {/* Mode active banner */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-primary/20 bg-primary/5 text-xs flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-semibold text-foreground">
                      Active: {READING_MODES[layout.mode].badge}
                    </span>
                    <span className="text-muted-foreground" aria-hidden="true">·</span>
                    <span className="font-mono text-xs text-primary font-medium">
                      {generationSource === "openrouter"
                        ? `Live AI: ${activeModel.split("/").pop()}`
                        : "Deterministic Catalog"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectMode(null)}
                    className="font-mono text-primary hover:underline cursor-pointer active:scale-[0.97]"
                  >
                    Reset to original story
                  </button>
                </div>

                {/* Rendered Blocks with Stagger Motion */}
                <div className="space-y-6">
                  {layout.blocks.map((block, index) => {
                    const isVisible = index < streamedBlockCount;
                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={index}
                        initial={settings.reduceMotion ? false : { opacity: 0, transform: "translateY(10px) scale(0.98)" }}
                        animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                        transition={{ duration: 0.22, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <BlockRenderer
                          block={block}
                          onSourceClick={handleSourceClick}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Calm mode specific ending note */}
                {layout.mode === "calm" && (
                  <div className="my-10 rounded-2xl border border-amber-500/25 bg-amber-500/[0.03] p-8 text-center space-y-2">
                    <p className="text-base font-serif italic text-foreground">
                      That&apos;s all, you&apos;re caught up.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      No infinite scroll. No urgent alarms. Have a peaceful rest of your day.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Original Story View */}
            {(!layout || showOriginalText) && (
              <div className="pt-4 space-y-6">
                {layout && (
                  <div className="border-t border-border/40 pt-8">
                    <button
                      type="button"
                      onClick={() => setShowOriginalText(!showOriginalText)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-all text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer active:scale-[0.99]"
                    >
                      <span className="font-mono uppercase tracking-wider">
                        Full Original Reporting ({story.paragraphs.length} Paragraphs)
                      </span>
                      {showOriginalText ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}

                {(!layout || showOriginalText) && (
                  <div className={cn("space-y-6", getTextSizeClass(), getLineHeightClass())}>
                    {story.paragraphs.map((para) => {
                      const isHighlighted = highlightedParagraphId === para.id;
                      const match = para.id.match(/p(\d+)$/i);
                      const paragraphNumber = match ? match[1] : para.id;

                      return (
                        <div
                          key={para.id}
                          ref={registerParagraphRef(para.id)}
                          id={`paragraph-${para.id}`}
                          tabIndex={-1}
                          className={cn(
                            "group flex items-start gap-4 transition-all duration-300 rounded-2xl p-4 sm:p-5",
                            isHighlighted
                              ? "bg-primary/10 ring-2 ring-primary ring-offset-4 ring-offset-background shadow-sm"
                              : "hover:bg-muted/20"
                          )}
                        >
                          <span
                            className="mt-0.5 inline-flex h-6 min-w-8 shrink-0 items-center justify-center rounded-md bg-muted/60 border border-border/50 font-mono text-xs font-bold text-muted-foreground select-none group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors"
                            aria-hidden="true"
                          >
                            ¶{paragraphNumber}
                          </span>
                          <p className="flex-1 text-foreground/90 font-normal leading-relaxed">
                            {para.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
