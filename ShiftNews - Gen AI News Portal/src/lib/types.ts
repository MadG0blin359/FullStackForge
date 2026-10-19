export type ReadingMode = 'brief' | 'explainer' | 'comparison' | 'calm';

export interface Paragraph {
  id: string;
  text: string;
}

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  paragraphs: Paragraph[];
}

export interface SourceRef {
  paragraphId: string;
}

export interface KeyFactsBlock {
  type: 'key-facts';
  title: string;
  facts: {
    text: string;
    sourceRefs: SourceRef[];
  }[];
}

export interface TimelineBlock {
  type: 'timeline';
  title: string;
  events: {
    date: string;
    label: string;
    description: string;
    sourceRefs: SourceRef[];
  }[];
}

export interface GlossaryBlock {
  type: 'glossary';
  title: string;
  terms: {
    term: string;
    definition: string;
    sourceRefs: SourceRef[];
  }[];
}

export interface ComparisonBlock {
  type: 'comparison';
  title: string;
  sideA: {
    label: string;
    points: {
      text: string;
      sourceRefs: SourceRef[];
    }[];
  };
  sideB: {
    label: string;
    points: {
      text: string;
      sourceRefs: SourceRef[];
    }[];
  };
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution: string;
  sourceRefs: SourceRef[];
}

export interface BriefBlock {
  type: 'brief';
  title: string;
  summary: string;
  whatChanged: string;
  sourceRefs: SourceRef[];
}

export interface WhyItMattersBlock {
  type: 'why-it-matters';
  title: string;
  explanation: string;
  sourceRefs: SourceRef[];
}

export interface SectionBlock {
  type: 'section';
  title: string;
  content: string;
  sourceRefs: SourceRef[];
}

export type Block =
  | KeyFactsBlock
  | TimelineBlock
  | GlossaryBlock
  | ComparisonBlock
  | QuoteBlock
  | BriefBlock
  | WhyItMattersBlock
  | SectionBlock;

export type BlockType = Block['type'];

export interface GeneratedLayout {
  storySlug: string;
  mode: ReadingMode;
  blocks: Block[];
  generatedAt: string;
}

export interface ReadingModeMeta {
  id: ReadingMode;
  label: string;
  tagline: string;
  description: string;
  badge: string;
}

export const READING_MODES: Record<ReadingMode, ReadingModeMeta> = {
  brief: {
    id: 'brief',
    label: 'I have 2 minutes',
    tagline: 'Quick scan & key takeaways',
    description: 'Condenses the story into essential points, immediate changes, and key facts for busy readers.',
    badge: 'Fast Brief'
  },
  explainer: {
    id: 'explainer',
    label: "I'm new to this",
    tagline: 'Background, timeline & glossary',
    description: 'Breaks down complex background, unpacks jargon terms, and contextualizes why this development matters.',
    badge: 'Deep Explainer'
  },
  comparison: {
    id: 'comparison',
    label: 'Show me both sides',
    tagline: 'Balanced perspectives & arguments',
    description: 'Presents contrasting arguments side-by-side with verified quotes and direct source citations.',
    badge: 'Dual Perspective'
  },
  calm: {
    id: 'calm',
    label: 'Low-energy mode',
    tagline: 'Gentle pacing & low sensory load',
    description: 'Thoughtful long-form sections with soft narrative transitions, free of frantic urgency or sensory overload.',
    badge: 'Calm Read'
  }
};

export interface AIModelOption {
  id: string;
  label: string;
  provider: "Liquid AI" | "NVIDIA" | "Cohere" | "Poolside" | "MiniMax" | "OpenRouter";
  isFree: boolean;
  badge?: string;
  description?: string;
}

export const AVAILABLE_MODELS: AIModelOption[] = [
  {
    id: "minimax/minimax-m3.1-flash:free",
    label: "MiniMax M3.1 Flash",
    provider: "MiniMax",
    isFree: true,
    badge: "Fast & Free",
    description: "High-throughput free model with 1,000,000 token context window and active quota.",
  },
  {
    id: "liquid/lfm-2.5-2.6b:free",
    label: "Liquid LFM 2.5",
    provider: "Liquid AI",
    isFree: true,
    badge: "Sub-5s (Free)",
    description: "Ultra-fast lightweight reasoning model optimized for rapid structured generation.",
  },
  {
    id: "nvidia/nemotron-3-super-120b-a12b:free",
    label: "Nemotron 3 Super 120B",
    provider: "NVIDIA",
    isFree: true,
    badge: "Flagship 120B",
    description: "Powerful 120B instruction model with deep contextual layout understanding.",
  },
  {
    id: "cohere/north-mini-code:free",
    label: "Cohere North Mini",
    provider: "Cohere",
    isFree: true,
    badge: "Code & Schema",
    description: "Accurate structured JSON layout generation with validated source citations.",
  },
  {
    id: "poolside/laguna-s-2.1:free",
    label: "Poolside Laguna S",
    provider: "Poolside",
    isFree: true,
    badge: "Free Tier",
    description: "Balanced reasoning engine with active free quota.",
  },
];

