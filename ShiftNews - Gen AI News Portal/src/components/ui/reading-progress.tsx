"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface ReadingProgressProps {
  className?: string;
}

/**
 * High-visibility scroll-linked reading progress bar.
 * - Sits at z-[100] strictly above all headers and floating chrome.
 * - Uses a vibrant, high-contrast gradient (electric blue -> indigo -> emerald).
 * - Soft ambient specular glow so it stands out immediately on any background.
 * - Luminous leading-edge tip for intuitive visual tracking.
 * - Spring-damped for silky smooth Apple-grade motion.
 */
export function ReadingProgress({ className = "" }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Background track (subtle translucent guide so reader sees total length) */}
      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-foreground/5" />

      {/* Main progress fill with luminous gradient & glow */}
      <motion.div
        className="relative h-[3.5px] origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 dark:from-blue-400 dark:via-cyan-300 dark:to-emerald-400 shadow-[0_1px_12px_rgba(59,130,246,0.85),0_0_4px_rgba(16,185,129,0.9)]"
        style={{ scaleX }}
      >
        {/* Leading edge energetic bead */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white dark:bg-cyan-100 shadow-[0_0_6px_#38bdf8,0_0_12px_#3b82f6]" />
      </motion.div>
    </div>
  );
}
