import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openrouter, DEFAULT_MODEL } from "@/lib/ai";
import { GeneratedLayoutSchema } from "@/lib/schemas";
import { getStoryBySlug } from "@/data/stories";
import { getLayout } from "@/data/layouts";
import { ReadingMode } from "@/lib/types";

export const maxDuration = 45;

// Normalize shorthand JSON formats returned by diverse LLMs
function normalizeBlock(raw: any, defaultParagraphId: string): any {
  if (!raw || typeof raw !== "object") return raw;

  const normalizeSourceRefs = (refs: any): { paragraphId: string }[] => {
    if (!Array.isArray(refs) || refs.length === 0) {
      return [{ paragraphId: defaultParagraphId }];
    }
    return refs.map((ref) => {
      if (typeof ref === "string") return { paragraphId: ref };
      if (ref && typeof ref === "object" && typeof ref.paragraphId === "string") {
        return { paragraphId: ref.paragraphId };
      }
      return { paragraphId: defaultParagraphId };
    });
  };

  const block = { ...raw };

  if ("sourceRefs" in block) {
    block.sourceRefs = normalizeSourceRefs(block.sourceRefs);
  }

  // Key facts normalization
  if (block.type === "key-facts" && Array.isArray(block.facts)) {
    block.facts = block.facts.map((f: any) => {
      if (typeof f === "string") {
        return { text: f, sourceRefs: [{ paragraphId: defaultParagraphId }] };
      }
      if (f && typeof f === "object") {
        return {
          text: String(f.text || f.fact || "Key fact"),
          sourceRefs: normalizeSourceRefs(f.sourceRefs),
        };
      }
      return { text: "Key fact", sourceRefs: [{ paragraphId: defaultParagraphId }] };
    });
  }

  // Comparison normalization
  if (block.type === "comparison") {
    if (!block.sideA || typeof block.sideA !== "object") {
      block.sideA = { label: "Perspective A", points: [] };
    }
    if (!block.sideB || typeof block.sideB !== "object") {
      block.sideB = { label: "Perspective B", points: [] };
    }
    if (Array.isArray(block.sideA.points)) {
      block.sideA.points = block.sideA.points.map((p: any) => {
        if (typeof p === "string") {
          return { text: p, sourceRefs: [{ paragraphId: defaultParagraphId }] };
        }
        return {
          text: String(p?.text || p?.point || "Perspective point"),
          sourceRefs: normalizeSourceRefs(p?.sourceRefs),
        };
      });
    }
    if (Array.isArray(block.sideB.points)) {
      block.sideB.points = block.sideB.points.map((p: any) => {
        if (typeof p === "string") {
          return { text: p, sourceRefs: [{ paragraphId: defaultParagraphId }] };
        }
        return {
          text: String(p?.text || p?.point || "Counterpoint"),
          sourceRefs: normalizeSourceRefs(p?.sourceRefs),
        };
      });
    }
  }

  // Timeline normalization
  if (block.type === "timeline" && Array.isArray(block.events)) {
    block.events = block.events.map((e: any) => ({
      date: String(e.date || "Recent"),
      label: String(e.label || e.title || "Milestone"),
      description: String(e.description || e.text || ""),
      sourceRefs: normalizeSourceRefs(e.sourceRefs),
    }));
  }

  // Glossary normalization
  if (block.type === "glossary" && Array.isArray(block.terms)) {
    block.terms = block.terms.map((t: any) => ({
      term: String(t.term || t.word || "Term"),
      definition: String(t.definition || t.desc || "Definition"),
      sourceRefs: normalizeSourceRefs(t.sourceRefs),
    }));
  }

  return block;
}

export async function POST(req: NextRequest) {
  let requestBody: {
    storySlug?: string;
    mode?: ReadingMode;
    userPrompt?: string;
    model?: string;
  } = {};

  try {
    requestBody = await req.json();
  } catch {
    requestBody = {};
  }

  const {
    storySlug = "quiet-revolution-battery-technology",
    mode = "brief",
    userPrompt,
    model: requestedModel,
  } = requestBody;

  const effectiveMode = (mode as ReadingMode) || "brief";
  const deterministicFallback = getLayout(storySlug, effectiveMode);

  try {
    const story = getStoryBySlug(storySlug);
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const defaultParagraphId = story.paragraphs[0]?.id || "p1";
    const apiKey = process.env.OPENROUTER_API_KEY;

    // If no API key configured, return catalog fallback
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json({
        layout: deterministicFallback,
        source: "fallback",
        model: "offline-catalog",
        fallbackUsed: false,
      });
    }

    // Build focused multi-model fallback chain
    const initialModel = requestedModel || DEFAULT_MODEL;
    const candidateModels: string[] = [initialModel];

    // Priority fallbacks (Strictly 100% Free OpenRouter Models)
    const priorityFallbacks = [
      "openrouter/free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "nvidia/nemotron-3.5-lightning:free",
      "cohere/north-mini-code:free",
      "deepseek/deepseek-r1:free",
    ];

    for (const m of priorityFallbacks) {
      if (!candidateModels.includes(m)) {
        candidateModels.push(m);
      }
    }

    // Paragraphs context
    const paragraphsContext = story.paragraphs
      .map((p) => `[Paragraph ID: "${p.id}"]\n${p.text}`)
      .join("\n\n");

    const systemPrompt = `You are the Generative UI engine for ShiftNews, an accessible news portal.
Your job is to read the original news article and dynamically reshape its layout into a tailored sequence of vetted components matching the reader's intent.

YOU MUST OUTPUT PURE, VALID JSON AND NOTHING ELSE. Do not include markdown fences, code blocks, or preamble.

OUTPUT SCHEMA SPECIFICATION:
{
  "storySlug": "${storySlug}",
  "mode": "${effectiveMode}",
  "generatedAt": "${new Date().toISOString()}",
  "blocks": [
    // 3 to 6 block objects chosen from the catalog below
  ]
}

CATALOG OF VETTED BLOCKS:
1. "brief": { "type": "brief", "title": string, "summary": string, "whatChanged": string, "sourceRefs": [{"paragraphId": string}] }
2. "key-facts": { "type": "key-facts", "title": string, "facts": [{"text": string, "sourceRefs": [{"paragraphId": string}]}] }
3. "timeline": { "type": "timeline", "title": string, "events": [{"date": string, "label": string, "description": string, "sourceRefs": [{"paragraphId": string}]}] }
4. "glossary": { "type": "glossary", "title": string, "terms": [{"term": string, "definition": string, "sourceRefs": [{"paragraphId": string}]}] }
5. "comparison": { "type": "comparison", "title": string, "sideA": {"label": string, "points": [{"text": string, "sourceRefs": [{"paragraphId": string}]}]}, "sideB": {"label": string, "points": [{"text": string, "sourceRefs": [{"paragraphId": string}]}]} }
6. "quote": { "type": "quote", "text": string, "attribution": string, "sourceRefs": [{"paragraphId": string}] }
7. "why-it-matters": { "type": "why-it-matters", "title": string, "explanation": string, "sourceRefs": [{"paragraphId": string}] }
8. "section": { "type": "section", "title": string, "content": string, "sourceRefs": [{"paragraphId": string}] }

CRITICAL ACCREDITATION & TRUST RULE:
Every fact, point, quote, and summary MUST include at least one "sourceRefs" containing the exact "paragraphId" from the text above (e.g. {"paragraphId": "${defaultParagraphId}"}).
Do NOT invent paragraph IDs. Only cite the real paragraph IDs provided in the article.

CONCISENESS GUIDELINE:
Keep summaries, descriptions, and points concise (1-2 sentences each) so that the structured layout is punchy, focused, and completes within the token limit.`;

    const userInstructions = userPrompt
      ? `The reader has requested this specific custom situation: "${userPrompt}".
Reshape this article into 3-6 components from the catalog that best serve this reader.`
      : `The reader chose mode: "${effectiveMode}".
Reshape this article into 3-6 appropriate catalog components for this mode.`;

    const prompt = `ARTICLE METADATA:
Title: ${story.title}
Category: ${story.category}
Author: ${story.author}
Subtitle: ${story.subtitle}

FULL ORIGINAL ARTICLE:
${paragraphsContext}

READER INSTRUCTIONS:
${userInstructions}

OUTPUT: Return only the JSON object.`;

    let lastError: Error | null = null;

    for (const currentModel of candidateModels) {
      try {
        const res = await generateText({
          model: openrouter.chat(currentModel),
          system: systemPrompt,
          prompt,
          maxOutputTokens: 2500,
          temperature: 0.2,
          abortSignal: AbortSignal.timeout(12000),
        });

        const jsonMatch = res.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error(`Model ${currentModel} returned non-JSON text output`);
        }

        const rawParsed = JSON.parse(jsonMatch[0]);
        rawParsed.storySlug = storySlug;
        rawParsed.mode = effectiveMode;
        if (!rawParsed.generatedAt) {
          rawParsed.generatedAt = new Date().toISOString();
        }

        // Normalize blocks before schema validation
        if (Array.isArray(rawParsed.blocks)) {
          rawParsed.blocks = rawParsed.blocks.map((b: any) =>
            normalizeBlock(b, defaultParagraphId)
          );
        }

        const validatedLayout = GeneratedLayoutSchema.parse(rawParsed);

        return NextResponse.json({
          layout: validatedLayout,
          source: "openrouter",
          model: currentModel,
          requestedModel: initialModel,
          fallbackUsed: currentModel !== initialModel,
        });
      } catch (err) {
        lastError = err as Error;
        console.warn(
          `[ShiftNews AI] Model '${currentModel}' failed: ${lastError.message}. Cascading to next candidate...`
        );
      }
    }

    // If all models in the cascade failed, gracefully return deterministic fallback
    console.error("[ShiftNews AI] All OpenRouter cascade models exhausted, using deterministic catalog fallback:", lastError);
    return NextResponse.json({
      layout: deterministicFallback,
      source: "fallback",
      model: "offline-catalog",
      error: lastError?.message || "Model cascade exhausted",
      fallbackUsed: true,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("OpenRouter catastrophic error, falling back to deterministic layout:", err);

    return NextResponse.json({
      layout: deterministicFallback,
      source: "fallback",
      model: "offline-catalog",
      error: err.message,
      fallbackUsed: true,
    });
  }
}
