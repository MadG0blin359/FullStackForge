"use client";

/**
 * Web Audio micro-haptics engine.
 * Synthesises lightweight clicks using the Web Audio API for tactile UI feedback.
 * No audio files required — pure oscillator synthesis.
 *
 * Usage:
 *   import { haptic } from "@/lib/haptics";
 *   haptic.tick();   // Light UI tick (tab switch, toggle)
 *   haptic.click();  // Medium click (button press)
 *   haptic.success();  // Positive confirmation (generation complete)
 */

let audioCtx: AudioContext | null = null;
let enabled = true;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine"
) {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;

  // Resume if suspended (browser autoplay policy)
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Sharp attack, fast decay for click feel
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export const haptic = {
  /** Light UI tick — tab switches, toggles, hover snaps. */
  tick() {
    playTone(1800, 0.03, 0.04, "sine");
  },

  /** Medium click — button presses, mode selections. */
  click() {
    playTone(1200, 0.045, 0.06, "triangle");
  },

  /** Positive confirmation — generation complete, copy success. */
  success() {
    playTone(880, 0.06, 0.05, "sine");
    setTimeout(() => playTone(1320, 0.06, 0.04, "sine"), 60);
  },

  /** Set whether haptics are enabled. */
  setEnabled(value: boolean) {
    enabled = value;
  },

  /** Check if haptics are currently enabled. */
  isEnabled() {
    return enabled;
  },
};
