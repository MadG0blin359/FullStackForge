"use client";

import React, { useEffect } from "react";
import { SlidersHorizontal, Sun, Moon, Eye } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export interface AccessibilitySettings {
  fontFamily: "sans" | "serif" | "accessible";
  textSize: "sm" | "base" | "lg" | "xl";
  lineHeight: "normal" | "relaxed" | "loose";
  highContrast: boolean;
  reduceMotion: boolean;
  theme: "system" | "light" | "dark";
}

interface AccessibilityPanelProps {
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

export function AccessibilityPanel({
  settings,
  onSettingsChange,
}: AccessibilityPanelProps) {
  // Apply HTML class/attributes when settings change
  useEffect(() => {
    const root = document.documentElement;

    // Font family
    if (settings.fontFamily === "accessible") {
      root.setAttribute("data-font", "accessible");
    } else {
      root.removeAttribute("data-font");
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Dark/Light theme
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else if (settings.theme === "light") {
      root.classList.remove("dark");
    } else {
      // System
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [settings]);

  const update = (partial: Partial<AccessibilitySettings>) => {
    onSettingsChange({ ...settings, ...partial });
  };

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open accessibility and reading preferences"
        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
        <span>Accessibility</span>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left space-y-2 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Eye className="h-5 w-5" />
            </span>
            <div>
              <SheetTitle className="font-serif text-lg font-bold">
                Accessibility Preferences
              </SheetTitle>
              <SheetDescription className="text-xs">
                Fine-tune typography, spacing, contrast, and sensory load.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-5 space-y-6 text-sm">
          {/* Typography Choice */}
          <section className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Typeface Family</span>
              {settings.fontFamily === "accessible" && (
                <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">
                  Dyslexia-Optimized
                </Badge>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => update({ fontFamily: "sans" })}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer font-sans ${
                  settings.fontFamily === "sans"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                Geist Sans
              </button>
              <button
                type="button"
                onClick={() => update({ fontFamily: "serif" })}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer font-serif ${
                  settings.fontFamily === "serif"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                Source Serif
              </button>
              <button
                type="button"
                onClick={() => update({ fontFamily: "accessible" })}
                className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer font-mono ${
                  settings.fontFamily === "accessible"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                Atkinson
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Atkinson Hyperlegible improves character distinction for low-vision and dyslexic readers.
            </p>
          </section>

          {/* Text Size */}
          <section className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Text Size</span>
              <span className="font-mono text-[11px] uppercase">{settings.textSize}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["sm", "base", "lg", "xl"] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => update({ textSize: sz })}
                  className={`py-2 px-3 rounded-lg border text-xs text-center uppercase font-mono transition-all cursor-pointer ${
                    settings.textSize === sz
                      ? "border-primary bg-primary/10 font-bold text-foreground"
                      : "border-border/60 hover:bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {sz === "sm" ? "Small" : sz === "base" ? "Default" : sz === "lg" ? "Large" : "X-Large"}
                </button>
              ))}
            </div>
          </section>

          {/* Line Spacing */}
          <section className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Line Spacing (Leading)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["normal", "relaxed", "loose"] as const).map((lh) => (
                <button
                  key={lh}
                  type="button"
                  onClick={() => update({ lineHeight: lh })}
                  className={`py-2 px-2.5 rounded-lg border text-xs capitalize transition-all cursor-pointer ${
                    settings.lineHeight === lh
                      ? "border-primary bg-primary/10 font-bold text-foreground"
                      : "border-border/60 hover:bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {lh}
                </button>
              ))}
            </div>
          </section>

          {/* Theme & Contrast */}
          <section className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => update({ theme: "system" })}
                className={`py-2 px-2.5 rounded-lg border text-xs capitalize transition-all cursor-pointer ${
                  settings.theme === "system"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                System
              </button>
              <button
                type="button"
                onClick={() => update({ theme: "light" })}
                className={`py-2 px-2.5 rounded-lg border text-xs capitalize transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  settings.theme === "light"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => update({ theme: "dark" })}
                className={`py-2 px-2.5 rounded-lg border text-xs capitalize transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  settings.theme === "dark"
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
            </div>
          </section>

          {/* Motion preference */}
          <section className="space-y-2 pt-2 border-t border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-xs">Reduced Motion</p>
                <p className="text-[11px] text-muted-foreground">
                  Disable spring morphs and layout transitions.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.reduceMotion}
                onClick={() => update({ reduceMotion: !settings.reduceMotion })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  settings.reduceMotion ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${
                    settings.reduceMotion ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
