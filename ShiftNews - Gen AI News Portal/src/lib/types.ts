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
  provider: 'OpenAI' | 'Anthropic' | 'Google';
}

export const AVAILABLE_MODELS: AIModelOption[] = [
  { id: 'openai/gpt-4o-mini', label: 'ChatGPT 4o-mini', provider: 'OpenAI' },
  { id: 'anthropic/claude-haiku-5.5', label: 'Claude Haiku 5.5', provider: 'Anthropic' },
  { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'Google' },
  { id: 'anthropic/claude-sonnet-5.5', label: 'Claude Sonnet 5.5', provider: 'Anthropic' },
  { id: 'openai/gpt-4o-2024-11-20', label: 'ChatGPT 4o', provider: 'OpenAI' },
];
