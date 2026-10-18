import { z } from 'zod';
import type { Story, Block, GeneratedLayout } from './types';

export const ReadingModeSchema = z.enum(['brief', 'explainer', 'comparison', 'calm']);

export const ParagraphSchema = z.object({
  id: z.string().min(1, 'Paragraph ID is required'),
  text: z.string().min(1, 'Paragraph text is required')
});

export const StorySchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string(),
  author: z.string().min(1, 'Author is required'),
  publishedAt: z.string().min(1, 'Published date is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  imageAlt: z.string().min(1, 'Image alt text is required'),
  paragraphs: z.array(ParagraphSchema).min(1, 'Story must have at least one paragraph')
});

export const SourceRefSchema = z.object({
  paragraphId: z.string().min(1, 'Source paragraph ID is required')
});

export const KeyFactsBlockSchema = z.object({
  type: z.literal('key-facts'),
  title: z.string(),
  facts: z.array(
    z.object({
      text: z.string().min(1),
      sourceRefs: z.array(SourceRefSchema)
    })
  )
});

export const TimelineBlockSchema = z.object({
  type: z.literal('timeline'),
  title: z.string(),
  events: z.array(
    z.object({
      date: z.string(),
      label: z.string().min(1),
      description: z.string().min(1),
      sourceRefs: z.array(SourceRefSchema)
    })
  )
});

export const GlossaryBlockSchema = z.object({
  type: z.literal('glossary'),
  title: z.string(),
  terms: z.array(
    z.object({
      term: z.string().min(1),
      definition: z.string().min(1),
      sourceRefs: z.array(SourceRefSchema)
    })
  )
});

export const ComparisonBlockSchema = z.object({
  type: z.literal('comparison'),
  title: z.string(),
  sideA: z.object({
    label: z.string().min(1),
    points: z.array(
      z.object({
        text: z.string().min(1),
        sourceRefs: z.array(SourceRefSchema)
      })
    )
  }),
  sideB: z.object({
    label: z.string().min(1),
    points: z.array(
      z.object({
        text: z.string().min(1),
        sourceRefs: z.array(SourceRefSchema)
      })
    )
  })
});

export const QuoteBlockSchema = z.object({
  type: z.literal('quote'),
  text: z.string().min(1),
  attribution: z.string().min(1),
  sourceRefs: z.array(SourceRefSchema)
});

export const BriefBlockSchema = z.object({
  type: z.literal('brief'),
  title: z.string(),
  summary: z.string().min(1),
  whatChanged: z.string().min(1),
  sourceRefs: z.array(SourceRefSchema)
});

export const WhyItMattersBlockSchema = z.object({
  type: z.literal('why-it-matters'),
  title: z.string(),
  explanation: z.string().min(1),
  sourceRefs: z.array(SourceRefSchema)
});

export const SectionBlockSchema = z.object({
  type: z.literal('section'),
  title: z.string(),
  content: z.string().min(1),
  sourceRefs: z.array(SourceRefSchema)
});

export const BlockSchema = z.discriminatedUnion('type', [
  KeyFactsBlockSchema,
  TimelineBlockSchema,
  GlossaryBlockSchema,
  ComparisonBlockSchema,
  QuoteBlockSchema,
  BriefBlockSchema,
  WhyItMattersBlockSchema,
  SectionBlockSchema
]);

export const GeneratedLayoutSchema = z.object({
  storySlug: z.string().min(1),
  mode: ReadingModeSchema,
  blocks: z.array(BlockSchema),
  generatedAt: z.string()
});

// Type assertions to ensure schemas align with types.ts
export type InferredReadingMode = z.infer<typeof ReadingModeSchema>;
export type InferredParagraph = z.infer<typeof ParagraphSchema>;
export type InferredStory = z.infer<typeof StorySchema>;
export type InferredSourceRef = z.infer<typeof SourceRefSchema>;
export type InferredBlock = z.infer<typeof BlockSchema>;
export type InferredGeneratedLayout = z.infer<typeof GeneratedLayoutSchema>;

// Validation functions
export function validateStory(data: unknown): Story {
  return StorySchema.parse(data);
}

export function safeValidateStory(data: unknown): { success: true; data: Story } | { success: false; error: z.ZodError } {
  const result = StorySchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateLayout(data: unknown): GeneratedLayout {
  return GeneratedLayoutSchema.parse(data);
}

export function safeValidateLayout(data: unknown): { success: true; data: GeneratedLayout } | { success: false; error: z.ZodError } {
  const result = GeneratedLayoutSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateBlock(data: unknown): Block {
  return BlockSchema.parse(data);
}

export function safeValidateBlock(data: unknown): { success: true; data: Block } | { success: false; error: z.ZodError } {
  const result = BlockSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
