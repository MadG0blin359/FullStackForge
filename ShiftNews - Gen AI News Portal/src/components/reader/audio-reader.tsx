"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Play, Pause, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Story, GeneratedLayout } from "@/lib/types";
import { haptic } from "@/lib/haptics";

interface AudioReaderProps {
  story: Story;
  layout?: GeneratedLayout | null;
  mode?: string | null;
  onParagraphHighlight?: (paragraphId: string | null) => void;
}

export function AudioReader({
  story,
  onParagraphHighlight,
}: AudioReaderProps) {
  const isSupported = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    () => false
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentParaIndex, setCurrentParaIndex] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (isSupported) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      isCancelledRef.current = true;
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      onParagraphHighlight?.(null);
    };
  }, [isSupported, onParagraphHighlight]);

  // Clean sequential reading paragraph by paragraph for real-time karaoke tracking
  const playParagraph = (index: number) => {
    if (!synthRef.current || isCancelledRef.current) return;

    if (index >= story.paragraphs.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentParaIndex(-1);
      onParagraphHighlight?.(null);
      haptic.success();
      return;
    }

    const para = story.paragraphs[index];
    setCurrentParaIndex(index);
    onParagraphHighlight?.(para.id);

    // Scroll paragraph gently into view if user isn't overriding
    const el = document.getElementById(`paragraph-${para.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    const utteranceText = index === 0
      ? `${story.title}. By ${story.author}. ${para.text}`
      : para.text;

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    currentUtteranceRef.current = utterance;
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (!isCancelledRef.current && isPlaying) {
        playParagraph(index + 1);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentParaIndex(-1);
      onParagraphHighlight?.(null);
    };

    synthRef.current.speak(utterance);
  };

  const handlePlay = () => {
    if (!synthRef.current) return;
    haptic.click();

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    isCancelledRef.current = false;
    synthRef.current.cancel();
    setIsPlaying(true);
    setIsPaused(false);

    const startIdx = currentParaIndex >= 0 ? currentParaIndex : 0;
    playParagraph(startIdx);
  };

  const handlePause = () => {
    haptic.tick();
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    haptic.tick();
    isCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentParaIndex(-1);
    onParagraphHighlight?.(null);
  };

  const toggleSpeed = () => {
    haptic.tick();
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);

    // If currently speaking, restart current paragraph with new speed
    if (synthRef.current && isPlaying) {
      synthRef.current.cancel();
      playParagraph(Math.max(0, currentParaIndex));
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <div className="inline-flex items-center rounded-full border border-border/80 bg-background/90 backdrop-blur-md p-1 shadow-xs gap-1">
        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Listen to article with karaoke tracking"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-95"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>{isPaused ? "Resume" : "Listen"}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            aria-label="Pause audio reading"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-all cursor-pointer active:scale-95"
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
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer active:scale-95"
            title="Stop audio playback"
          >
            <Square className="h-3 w-3" />
          </button>
        )}

        {/* Speed toggle pill */}
        <button
          type="button"
          onClick={toggleSpeed}
          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors cursor-pointer"
          title={`Speech speed: ${playbackSpeed}x (Click to cycle 1x -> 1.25x -> 1.5x)`}
        >
          {playbackSpeed}x
        </button>
      </div>

      {/* Dynamic Animated Audio Waveform & Karaoke Indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -6 }}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-mono"
          >
            {/* 5-Bar Dancing Waveform */}
            <div className="flex items-center gap-0.5 h-3.5">
              {[0.4, 0.9, 0.6, 1.0, 0.5].map((scale, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: ["30%", "100%", "40%"],
                  }}
                  transition={{
                    duration: 0.45 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="w-0.75 rounded-full bg-primary"
                  style={{ height: `${scale * 100}%` }}
                />
              ))}
            </div>

            <span className="truncate max-w-[140px]">
              {currentParaIndex >= 0
                ? `Karaoke ¶${currentParaIndex + 1}`
                : "Voicing Dispatch..."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
