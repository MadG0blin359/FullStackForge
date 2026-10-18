export { cn } from "cn";

/** Format a date string for display */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

/** Approximate reading time in minutes */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

/** Map free-text user input to the nearest reading mode */
export function matchMode(
  input: string
): "brief" | "explainer" | "comparison" | "calm" {
  const lower = input.toLowerCase();

  const patterns: Record<string, "brief" | "explainer" | "comparison" | "calm"> = {
    brief: "brief",
    quick: "brief",
    fast: "brief",
    minute: "brief",
    hurry: "brief",
    summary: "brief",
    tldr: "brief",
    "tl;dr": "brief",
    short: "brief",

    explain: "explainer",
    new: "explainer",
    learn: "explainer",
    understand: "explainer",
    context: "explainer",
    background: "explainer",
    "what is": "explainer",
    "who is": "explainer",
    beginner: "explainer",
    history: "explainer",
    timeline: "explainer",
    dad: "explainer",
    mom: "explainer",
    parent: "explainer",
    kid: "explainer",
    child: "explainer",

    both: "comparison",
    sides: "comparison",
    compare: "comparison",
    versus: "comparison",
    vs: "comparison",
    debate: "comparison",
    perspectives: "comparison",
    arguments: "comparison",
    "pros and cons": "comparison",
    balanced: "comparison",

    calm: "calm",
    quiet: "calm",
    gentle: "calm",
    relax: "calm",
    "low energy": "calm",
    "low-energy": "calm",
    anxious: "calm",
    overwhelm: "calm",
    peace: "calm",
    soft: "calm",
    easy: "calm",
    stress: "calm",
  };

  for (const [keyword, mode] of Object.entries(patterns)) {
    if (lower.includes(keyword)) return mode;
  }

  // Default to brief if no match
  return "brief";
}

/** Reading mode display labels and descriptions */
export const modeConfig = {
  brief: {
    label: "I have 2 minutes",
    description: "Key facts and what changed",
    icon: "Clock" as const,
  },
  explainer: {
    label: "I'm new to this",
    description: "Timeline, glossary, and why it matters",
    icon: "BookOpen" as const,
  },
  comparison: {
    label: "Show me both sides",
    description: "Balanced perspectives with sources",
    icon: "Scale" as const,
  },
  calm: {
    label: "Low-energy mode",
    description: "Calm pacing, gentle framing",
    icon: "Leaf" as const,
  },
} as const;

/** Category color class mapping */
export const categoryColorClass: Record<string, string> = {
  Technology: "bg-news-tech",
  Local: "bg-news-local",
  World: "bg-news-world",
  Politics: "bg-news-politics",
};
