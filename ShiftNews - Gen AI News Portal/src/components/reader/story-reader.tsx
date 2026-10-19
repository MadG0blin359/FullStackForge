"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Share2,
  Copy,
  Clock,
  BookOpen,
  Scale,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  Story,
  ReadingMode,
  GeneratedLayout,
  READING_MODES,
  AVAILABLE_MODELS,
} from "@/lib/types";
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

const DOCK_ICONS: Record<ReadingMode, React.ComponentType<{ className?: string }>> = {
  brief: Clock,
  explainer: BookOpen,
  comparison: Scale,
  calm: Sparkles,
};

export function StoryReader({ story }: StoryReaderProps) {
  const [currentMode, setCurrentMode] = useState<ReadingMode | null>(null);
  const [layout, setLayout] = useState<GeneratedLayout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedBlockCount, setStreamedBlockCount] = useState<number>(0);
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [activeModel, setActiveModel] = useState<string>(AVAILABLE_MODELS[0].id);
  const [generationSource, setGenerationSource] = useState<"openrouter" | "catalog">("catalog");
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showFloatingDock, setShowFloatingDock] = useState(false);

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

  // Reading progress and floating dock visibility tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }
      setShowFloatingDock(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to register paragraph DOM nodes
  const registerParagraphRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) {
      paragraphRefs.current.set(id, el);
    } else {
      paragraphRefs.current.delete(id);
    }
  }, []);

  // Jump to & highlight source paragraph with fluid animation and Sonner toast
  const handleSourceClick = useCallback((paragraphId: string) => {
    setShowOriginalText(true);
    setHighlightedParagraphId(paragraphId);

    const match = paragraphId.match(/p(\d+)$/i);
    const paraNum = match ? match[1] : paragraphId;

    toast.info(`Source Citation: Paragraph ${paraNum}`, {
      description: "Grounded directly in original journalistic reporting.",
      duration: 2500,
    });

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

  // Share or copy link with Sonner toast
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!", {
          description: currentMode
            ? `Shared active ${READING_MODES[currentMode].badge} mode.`
            : "Shared full editorial dispatch.",
          duration: 2500,
        });
      }
    } catch {
      toast.error("Failed to copy link to clipboard.");
    }
  };

  // 1-Click Copy Executive Brief / Social Snapshot (Tier 3)
  const handleCopyBrief = async () => {
    try {
      let briefMarkdown = "";
      if (layout) {
        const briefBlock = layout.blocks.find((b) => b.type === "brief");
        const keyFactsBlock = layout.blocks.find((b) => b.type === "key-facts");
        const modeLabel = READING_MODES[layout.mode].badge;

        briefMarkdown = `⚡ ShiftNews Executive Brief: ${story.title}\n` +
          `Mode: ${modeLabel} | Category: ${story.category}\n\n`;

        if (briefBlock && "summary" in briefBlock) {
          briefMarkdown += `Summary:\n${briefBlock.summary}\n\n`;
          if (briefBlock.whatChanged) {
            briefMarkdown += `What Changed Today:\n${briefBlock.whatChanged}\n\n`;
          }
        }

        if (keyFactsBlock && "facts" in keyFactsBlock) {
          briefMarkdown += `Key Facts to Know:\n` +
            keyFactsBlock.facts
              .map((f, i) => `${i + 1}. ${f.text} [${f.sourceRefs.map((r) => r.paragraphId).join(", ")}]`)
              .join("\n") +
            "\n\n";
        }

        briefMarkdown += `Verified with 100% Attribution Grounding.\n` +
          `Read reshaped dispatch on ShiftNews: ${window.location.href}`;
      } else {
        briefMarkdown = `⚡ ShiftNews Dispatch: ${story.title}\n` +
          `By ${story.author} | ${formatDate(story.publishedAt)}\n\n` +
          `${story.subtitle}\n\n` +
          `Read full dispatch: ${window.location.href}`;
      }

      await navigator.clipboard.writeText(briefMarkdown);
      toast.success("Executive brief copied!", {
        description: "Formatted markdown ready to paste into Slack, Notion, or Twitter.",
        duration: 3500,
      });
    } catch {
      toast.error("Failed to copy brief to clipboard.");
    }
  };

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
      setFallbackUsed(false);
      toast("Restored full editorial dispatch", { duration: 1800 });
      return;
    }

    const modelToUse = modelName || activeModel;
    setActiveModel(modelToUse);
    setIsGenerating(true);
    setStreamedBlockCount(0);
    setCurrentMode(newMode);
    setFallbackUsed(false);

    const toastId = toast.loading(`Reshaping layout into ${READING_MODES[newMode].badge}...`);

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

      const isLiveAI = data.source === "openrouter";
      setGenerationSource(isLiveAI ? "openrouter" : "catalog");
      setFallbackUsed(Boolean(data.fallbackUsed));
      if (data.model && data.model !== "offline-catalog" && AVAILABLE_MODELS.some((m) => m.id === data.model)) {
        setActiveModel(data.model);
      }

      setLayout(targetLayout);
      setIsGenerating(false);

      if (data.fallbackUsed) {
        toast.warning(`Reshaped into ${READING_MODES[newMode].badge}`, {
          id: toastId,
          description: `Cascaded seamlessly to ${data.model?.split("/").pop() || "catalog"} fallback.`,
          duration: 3000,
        });
      } else {
        toast.success(`Reshaped into ${READING_MODES[newMode].badge}`, {
          id: toastId,
          description: isLiveAI
            ? `Synthesized live via ${data.model?.split("/").pop() || "OpenRouter"}.`
            : "Loaded verified component catalog.",
          duration: 3000,
        });
      }

      // Stagger stream cascade of blocks (70ms interval per Emil Kowalski stagger rule)
      const totalBlocks = targetLayout.blocks.length;
      let count = 1;
      setStreamedBlockCount(1);
      const interval = setInterval(() => {
        count++;
        setStreamedBlockCount(count);
        if (count >= totalBlocks) {
          clearInterval(interval);
        }
      }, 70);
    } catch (err) {
      console.warn("Live generation error, using catalog fallback:", err);
      const fallbackLayout = getLayout(story.slug, newMode);
      setGenerationSource("catalog");
      setFallbackUsed(true);
      setLayout(fallbackLayout || null);
      setIsGenerating(false);
      if (fallbackLayout) {
        setStreamedBlockCount(fallbackLayout.blocks.length);
      }
      toast.warning(`Reshaped into ${READING_MODES[newMode].badge}`, {
        id: toastId,
        description: "Zero downtime fail-safe activated.",
        duration: 3000,
      });
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

  const activeModelMeta = AVAILABLE_MODELS.find((m) => m.id === activeModel);

  return (
    <div
      data-mode={currentMode === "calm" ? "calm" : undefined}
      className={cn(
        "min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative selection:bg-primary/20",
        currentMode === "calm" && "selection:bg-amber-100 dark:selection:bg-amber-950"
      )}
    >
      {/* Editorial Reading Progress Bar (Hardware Accelerated ScaleX) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary z-[60] origin-left pointer-events-none"
        style={{
          transform: `scaleX(${readProgress})`,
          transition: settings.reduceMotion ? "none" : "transform 100ms cubic-bezier(0.23,1,0.32,1)",
        }}
        aria-hidden="true"
      />

      <Header />

      <main id="main-content" className="flex-1 pb-28">
        <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Back button & Category */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-[transform,background-color] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10 group-hover:-translate-x-0.5 transition-transform duration-160">
                <ArrowLeft className="h-2.5 w-2.5" />
              </div>
              <span>Back to Dispatch</span>
            </Link>

            <Badge
              variant="outline"
              className={cn(
                "rounded-full text-[11px] font-semibold tracking-wide px-3 py-1 shadow-2xs select-none",
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
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer pressable"
                  title="Share or copy story link"
                >
                  <Share2 className="h-3.5 w-3.5 text-primary" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer pressable"
                  title="Copy formatted markdown executive summary"
                >
                  <Copy className="h-3.5 w-3.5 text-primary" />
                  <span>Copy Brief</span>
                </button>
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

          {/* Generative UI Intent Picker with Free & Fallback Models */}
          <IntentPicker
            currentMode={currentMode}
            onSelectMode={handleSelectMode}
            isGenerating={isGenerating}
            activeModelName={activeModel}
            fallbackUsed={fallbackUsed}
          />

          {/* Dynamic Content View Area with Seamless Mode Morphing */}
          <div ref={articleContentRef} className="space-y-7 pt-2">
            <AnimatePresence mode="wait">
              {/* Live generation loading skeleton */}
              {isGenerating && (
                <motion.div
                  key="generating-skeleton"
                  initial={settings.reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-primary font-medium">
                    <Sparkles className="h-4 w-4 animate-spin text-primary" />
                    <span>Synthesizing vetted layout blocks via OpenRouter...</span>
                  </div>
                  <BlockSkeleton />
                  <BlockSkeleton />
                </motion.div>
              )}

              {/* Generated Layout View (Hardware-accelerated Emil Kowalski entry) */}
              {!isGenerating && layout && (
                <motion.div
                  key={`layout-${layout.mode}-${layout.storySlug}`}
                  initial={settings.reduceMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={settings.reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
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
                          ? `Live AI: ${activeModelMeta ? activeModelMeta.label : activeModel.split("/").pop()} ${activeModelMeta?.isFree ? "(Free)" : ""}`
                          : "Deterministic Catalog"}
                      </span>
                      {fallbackUsed && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          <span>Auto-Fallback Active</span>
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectMode(null)}
                      className="font-mono text-primary hover:underline cursor-pointer active:scale-[0.97] transition-transform duration-150"
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
                          key={`${layout.mode}-block-${index}`}
                          initial={settings.reduceMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.22, delay: index * 0.035, ease: [0.23, 1, 0.32, 1] }}
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
            </AnimatePresence>

            {/* Original Story View */}
            {(!layout || showOriginalText) && (
              <div className="pt-4 space-y-6">
                {layout && (
                  <div className="border-t border-border/40 pt-8">
                    <button
                      type="button"
                      onClick={() => setShowOriginalText(!showOriginalText)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-[background-color,border-color] duration-160 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer active:scale-[0.99]"
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
                            "group flex items-start gap-4 rounded-2xl p-4 sm:p-5 transition-[background-color,box-shadow] duration-250",
                            isHighlighted
                              ? "bg-primary/10 ring-2 ring-primary ring-offset-4 ring-offset-background shadow-sm"
                              : "hover:bg-muted/20"
                          )}
                        >
                          <span
                            className="mt-0.5 inline-flex h-6 min-w-8 shrink-0 items-center justify-center rounded-md bg-muted/60 border border-border/50 font-mono text-xs font-bold text-muted-foreground select-none group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors duration-160"
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

      {/* Floating Intent Quick Dock (Appears when scrolled down) */}
      <AnimatePresence>
        {showFloatingDock && (
          <motion.div
            initial={settings.reduceMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={settings.reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] overflow-x-auto rounded-full border border-border/80 bg-background/90 backdrop-blur-xl p-1.5 shadow-2xl flex items-center gap-1 select-none"
            role="navigation"
            aria-label="Floating quick intent switcher"
          >
          <button
            type="button"
            onClick={() => handleSelectMode(null)}
            className={cn(
              "relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors pressable whitespace-nowrap cursor-pointer select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              currentMode === null
                ? "text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {currentMode === null && (
              <motion.div
                layoutId="floating-dock-active-bubble"
                className="absolute inset-0 rounded-full bg-primary shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">Full Story</span>
          </button>
          {(Object.keys(READING_MODES) as ReadingMode[]).map((mKey) => {
            const Icon = DOCK_ICONS[mKey];
            const isSelected = currentMode === mKey;
            return (
              <button
                key={mKey}
                type="button"
                onClick={() => handleSelectMode(mKey)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors pressable flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                  isSelected
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="floating-dock-active-bubble"
                    className="absolute inset-0 rounded-full bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3 w-3" />
                  <span>{READING_MODES[mKey].badge}</span>
                </span>
              </button>
            );
          })}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
