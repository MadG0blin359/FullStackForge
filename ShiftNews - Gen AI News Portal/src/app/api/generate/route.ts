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

  // Brief normalization
  if (block.type === "brief") {
    if (!block.title) block.title = "Executive Brief";
    if (!block.summary) block.summary = block.content || block.description || "Executive overview of current reporting.";
    if (!block.whatChanged) block.whatChanged = block.change || "Key architectural shift described in reporting.";
  }

  // Key facts normalization
  if (block.type === "key-facts") {
    if (!block.title) block.title = "Key Takeaways";
    const rawFacts = Array.isArray(block.facts) ? block.facts : (Array.isArray(block.items) ? block.items : []);
    block.facts = rawFacts.map((f: any) => {
      if (typeof f === "string") {
        return { text: f, sourceRefs: [{ paragraphId: defaultParagraphId }] };
      }
      if (f && typeof f === "object") {
        const text = f.value
          ? `${f.label ? f.label + ": " : ""}${f.value}`
          : String(f.text || f.fact || f.label || "Key fact");
        return {
          text,
          sourceRefs: normalizeSourceRefs(f.sourceRefs),
        };
      }
      return { text: "Key fact", sourceRefs: [{ paragraphId: defaultParagraphId }] };
    });
    if (block.facts.length === 0) {
      block.facts = [{ text: "Key factual point established in story.", sourceRefs: [{ paragraphId: defaultParagraphId }] }];
    }
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

    // Build focused multi-model fallback chain from verified active free models
    const validInitial = (requestedModel && requestedModel !== "offline-catalog" && requestedModel !== "fallback")
      ? requestedModel
      : DEFAULT_MODEL;

    // Verified live OpenRouter free models, ordered by speed & availability
    const verifiedFreeModels = [
      "minimax/minimax-m3.1-flash:free",
      "liquid/lfm-2.5-2.6b:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "cohere/north-mini-code:free",
      "poolside/laguna-s-2.1:free",
    ];

    const candidateModels: string[] = [];
    if (verifiedFreeModels.includes(validInitial)) {
      candidateModels.push(validInitial);
    }
    for (const m of verifiedFreeModels) {
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
    // Output 2 to 3 block objects chosen from the catalog below
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
Generate ONLY 2 to 3 blocks total. Keep each summary, description, and fact to 1 concise sentence so that the JSON completes swiftly.`;

    const userInstructions = userPrompt
      ? `The reader has requested this specific custom situation: "${userPrompt}".
Reshape this article into 2-3 components from the catalog that best serve this reader.`
      : `The reader chose mode: "${effectiveMode}".
Reshape this article into 2-3 appropriate catalog components for this mode.`;

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
          temperature: 0.1,
          maxRetries: 0,
          abortSignal: AbortSignal.timeout(30000),
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
          requestedModel: validInitial,
          fallbackUsed: currentModel !== validInitial,
        });
      } catch (err) {
        lastError = err as Error;
        console.warn(
          `[ShiftNews AI] Model '${currentModel}' failed (${lastError.message}). Cascading to next candidate...`
        );
      }
    }

    // If all models in the cascade failed, gracefully return deterministic fallback
    console.warn(
      `[ShiftNews AI] All free models queued or busy (${lastError?.message || "timeout"}). Serving deterministic catalog fallback.`
    );
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
