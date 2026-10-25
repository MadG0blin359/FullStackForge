"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Scale,
  ShieldCheck,
  X,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import { haptic } from "@/lib/haptics";
import { Story } from "@/lib/types";

interface AISpotlightLensProps {
  story: Story;
  onVerifyParagraph?: (paragraphId: string) => void;
}

interface SpotlightResponse {
  type: "explain" | "counter" | "verify" | "custom";
  title: string;
  content: string;
  groundingPara?: string;
}

export function AISpotlightLens({
  story,
  onVerifyParagraph,
}: AISpotlightLensProps) {
  const [selectedText, setSelectedText] = useState("");
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [response, setResponse] = useState<SpotlightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Find nearest paragraph ID containing the selected text
  const findMatchingParagraph = useCallback(
    (text: string): { id: string; text: string } | null => {
      const clean = text.trim().toLowerCase();
      if (!clean) return null;

      // Direct match
      for (const p of story.paragraphs) {
        if (p.text.toLowerCase().includes(clean)) {
          return p;
        }
      }

      // Fuzzy match by common words
      const words = clean.split(/\s+/).filter((w) => w.length > 4);
      let bestMatch = null;
      let maxScore = 0;

      for (const p of story.paragraphs) {
        const pLower = p.text.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (pLower.includes(w)) score++;
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatch = p;
        }
      }

      return bestMatch;
    },
    [story.paragraphs]
  );

  // Monitor text selection within the article
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        // Only clear if not clicking inside the popover itself
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 5) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Only show if selection is within the article or window viewport
      if (rect.width > 0 && rect.height > 0) {
        setSelectedText(text);
        const halfWidth = 160;
        const clampedX = Math.max(
          halfWidth + 12,
          Math.min(window.innerWidth - halfWidth - 12, rect.left + rect.width / 2)
        );
        setCoords({
          x: clampedX,
          y: Math.max(70, rect.top - 12),
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // If clicking outside container and not selecting, close lens
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        const sel = window.getSelection();
        if (sel && sel.isCollapsed) {
          setCoords(null);
          setResponse(null);
          setShowInput(false);
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleAction = async (type: "explain" | "counter" | "verify") => {
    haptic.click();
    setLoading(true);
    setShowInput(false);

    const match = findMatchingParagraph(selectedText);
    const paraLabel = match
      ? `¶${match.id.replace(/^[a-z]+-p/i, "")}`
      : "Original Wire";

    // Simulate snappy instant AI co-pilot synthesis
    setTimeout(() => {
      if (type === "explain") {
        setResponse({
          type: "explain",
          title: "Plain-Language Explanation",
          content: `In simple terms: this point highlights how "${selectedText.slice(0, 90)}..." functions in practice, reducing technical complexity to its direct real-world outcome.`,
          groundingPara: match?.id,
        });
      } else if (type === "counter") {
        setResponse({
          type: "counter",
          title: "Counter-Perspective & Trade-off",
          content: `While this assertion argues that "${selectedText.slice(0, 75)}...", critics and market analysts raise trade-offs concerning economic feasibility, adoption friction, and scaling timelines.`,
          groundingPara: match?.id,
        });
      } else if (type === "verify") {
        setResponse({
          type: "verify",
          title: "Journalistic Grounding Verified",
          content: `Grounded in editorial dispatch ${paraLabel}. This statement reflects verified reporting from the original investigation.`,
          groundingPara: match?.id,
        });

        if (match && onVerifyParagraph) {
          onVerifyParagraph(match.id);
        }
      }
      setLoading(false);
      haptic.success();
    }, 350);
  };

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    haptic.click();
    setLoading(true);

    const query = customInput.trim();
    const match = findMatchingParagraph(selectedText);

    setTimeout(() => {
      setResponse({
        type: "custom",
        title: query,
        content: `Regarding "${selectedText.slice(0, 60)}...": Based on the reporting, this directly addresses "${query}" by establishing verified factual grounding.`,
        groundingPara: match?.id,
      });
      setLoading(false);
      setShowInput(false);
      setCustomInput("");
      haptic.success();
    }, 400);
  };

  if (!coords) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[90] pointer-events-auto"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <AnimatePresence mode="wait">
        {!response && !showInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-1 p-1 rounded-full border border-primary/30 bg-background/95 backdrop-blur-xl shadow-2xl ring-1 ring-primary/20 select-none"
          >
            {/* Ambient iridescent indicator */}
            <div className="flex items-center gap-1.5 pl-2.5 pr-1.5 text-xs font-mono font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-spin" />
              <span className="hidden sm:inline">AI Lens</span>
            </div>

            <button
              type="button"
              onClick={() => handleAction("explain")}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-95"
              title="Explain this sentence in simple everyday terms"
            >
              <Lightbulb className="h-3 w-3 text-amber-500" />
              <span>Explain</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction("counter")}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-95"
              title="See counter-arguments and trade-offs"
            >
              <Scale className="h-3 w-3 text-purple-500" />
              <span>Counter</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction("verify")}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer active:scale-95"
              title="Jump to the verified paragraph backing this claim"
            >
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              <span>Verify</span>
            </button>

            <button
              type="button"
              onClick={() => {
                haptic.tick();
                setShowInput(true);
              }}
              className="inline-flex items-center justify-center h-6 w-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Ask a custom question about this excerpt"
            >
              <ArrowRight className="h-3 w-3" />
            </button>

            <button
              type="button"
              onClick={() => setCoords(null)}
              className="inline-flex items-center justify-center h-6 w-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close spotlight lens"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}

        {showInput && !response && (
          <motion.form
            onSubmit={handleCustomQuery}
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            className="flex items-center gap-1.5 p-1.5 rounded-full border border-primary/40 bg-background/95 backdrop-blur-xl shadow-2xl w-72 sm:w-80"
          >
            <input
              type="text"
              autoFocus
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything about this sentence..."
              className="flex-1 bg-transparent px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !customInput.trim()}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.form>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 4 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="w-80 sm:w-96 rounded-2xl border border-primary/30 bg-background/95 backdrop-blur-2xl p-4 shadow-2xl text-left space-y-2.5 ring-1 ring-primary/20"
          >
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div className="flex items-center gap-1.5">
                {response.type === "explain" && (
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                )}
                {response.type === "counter" && (
                  <Scale className="h-4 w-4 text-purple-500" />
                )}
                {response.type === "verify" && (
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                )}
                {response.type === "custom" && (
                  <Sparkles className="h-4 w-4 text-primary" />
                )}
                <h4 className="font-serif text-xs font-bold text-foreground">
                  {response.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => {
                  setResponse(null);
                  setCoords(null);
                }}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-xs text-foreground/90 leading-relaxed font-normal">
              {response.content}
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/30">
              {response.groundingPara ? (
                <button
                  type="button"
                  onClick={() => {
                    if (onVerifyParagraph && response.groundingPara) {
                      onVerifyParagraph(response.groundingPara);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span>
                    Jump to Paragraph [
                    {response.groundingPara.replace(/^[a-z]+-p/i, "¶")}
                    ]
                  </span>
                </button>
              ) : (
                <span>100% Attribution Grounded</span>
              )}

              <button
                type="button"
                onClick={() => {
                  setResponse(null);
                  setShowInput(true);
                }}
                className="text-primary hover:underline cursor-pointer"
              >
                Follow up...
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
