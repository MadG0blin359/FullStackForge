"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Volume2, Play, Pause, Square } from "lucide-react";
import { Story, GeneratedLayout } from "@/lib/types";

interface AudioReaderProps {
  story: Story;
  layout: GeneratedLayout | null;
  mode: string | null;
}

export function AudioReader({ story, layout, mode }: AudioReaderProps) {
  const isSupported = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    () => false
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (isSupported) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [isSupported]);

  // Prepare full speech text based on active layout or original story
  const prepareSpeechText = (): string => {
    if (layout && layout.blocks.length > 0) {
      let text = `${story.title}. In ${layout.mode} reading mode. `;
      for (const block of layout.blocks) {
        if (block.type === "brief") {
          text += `Brief summary: ${block.summary}. What changed: ${block.whatChanged}. `;
        } else if (block.type === "key-facts") {
          text += `Key facts: ${block.facts.map((f) => f.text).join(". ")}. `;
        } else if (block.type === "timeline") {
          text += `Timeline: ${block.events.map((e) => `${e.date}, ${e.label}: ${e.description}`).join(". ")}. `;
        } else if (block.type === "glossary") {
          text += `Glossary: ${block.terms.map((t) => `${t.term}: ${t.definition}`).join(". ")}. `;
        } else if (block.type === "comparison") {
          text += `Comparison: For ${block.sideA.label}: ${block.sideA.points.map((p) => p.text).join(". ")}. For ${block.sideB.label}: ${block.sideB.points.map((p) => p.text).join(". ")}. `;
        } else if (block.type === "quote") {
          text += `Quote from ${block.attribution}: "${block.text}". `;
        } else if (block.type === "why-it-matters") {
          text += `Why it matters: ${block.explanation}. `;
        } else if (block.type === "section") {
          text += `${block.title ? block.title + ": " : ""}${block.content}. `;
        }
      }
      return text;
    }

    // Default: full story paragraphs
    return `${story.title}. By ${story.author}. ${story.subtitle}. ` +
      story.paragraphs.map((p) => p.text).join(" ");
  };

  const handlePlay = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synthRef.current.cancel();

    const fullText = prepareSpeechText();
    const utterance = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current = utterance;

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center rounded-full border border-border/80 bg-background/80 p-1 shadow-xs">
        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Listen to article"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>{isPaused ? "Resume" : "Listen"}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            aria-label="Pause audio reading"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-all cursor-pointer"
          >
            <Pause className="h-3 w-3 fill-current" />
            <span>Pause</span>
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            aria-label="Stop audio reading"
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Square className="h-3 w-3" />
          </button>
        )}
      </div>

      {isPlaying && (
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-primary font-mono animate-pulse">
          <Volume2 className="h-3.5 w-3.5" />
          <span>Reading {mode ? `${mode} layout` : "full story"}...</span>
        </span>
      )}
    </div>
  );
}
