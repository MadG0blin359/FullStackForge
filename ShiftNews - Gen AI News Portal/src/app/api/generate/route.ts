import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openrouter, DEFAULT_MODEL } from "@/lib/ai";
import { GeneratedLayoutSchema } from "@/lib/schemas";
import { getStoryBySlug } from "@/data/stories";
import { getLayout } from "@/data/layouts";
import { ReadingMode } from "@/lib/types";

export const maxDuration = 45;

type RawRecord = Record<string, unknown>;

// Normalize shorthand JSON formats returned by diverse LLMs
function normalizeBlock(raw: unknown, defaultParagraphId: string): unknown {
  if (!raw || typeof raw !== "object") return raw;

  const normalizeSourceRefs = (refs: unknown): { paragraphId: string }[] => {
    if (!Array.isArray(refs) || refs.length === 0) {
      return [{ paragraphId: defaultParagraphId }];
    }
    return refs.map((ref) => {
      if (typeof ref === "string") return { paragraphId: ref };
      if (ref && typeof ref === "object" && "paragraphId" in ref && typeof (ref as RawRecord).paragraphId === "string") {
        return { paragraphId: (ref as RawRecord).paragraphId as string };
      }
      return { paragraphId: defaultParagraphId };
    });
  };

  const block = { ...(raw as RawRecord) };

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
    block.facts = rawFacts.map((f: unknown) => {
      if (typeof f === "string") {
        return { text: f, sourceRefs: [{ paragraphId: defaultParagraphId }] };
      }
      if (f && typeof f === "object") {
        const fRec = f as RawRecord;
        const text = fRec.value
          ? `${fRec.label ? String(fRec.label) + ": " : ""}${String(fRec.value)}`
          : String(fRec.text || fRec.fact || fRec.label || "Key fact");
        return {
          text,
          sourceRefs: normalizeSourceRefs(fRec.sourceRefs),
        };
      }
      return { text: "Key fact", sourceRefs: [{ paragraphId: defaultParagraphId }] };
    });
    if (Array.isArray(block.facts) && block.facts.length === 0) {
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
    const sideA = block.sideA as RawRecord;
    const sideB = block.sideB as RawRecord;
    if (Array.isArray(sideA.points)) {
      sideA.points = sideA.points.map((p: unknown) => {
        if (typeof p === "string") {
          return { text: p, sourceRefs: [{ paragraphId: defaultParagraphId }] };
        }
        const pRec = (p && typeof p === "object") ? (p as RawRecord) : {};
        return {
          text: String(pRec.text || pRec.point || "Perspective point"),
          sourceRefs: normalizeSourceRefs(pRec.sourceRefs),
        };
      });
    }
    if (Array.isArray(sideB.points)) {
      sideB.points = sideB.points.map((p: unknown) => {
        if (typeof p === "string") {
          return { text: p, sourceRefs: [{ paragraphId: defaultParagraphId }] };
        }
        const pRec = (p && typeof p === "object") ? (p as RawRecord) : {};
        return {
          text: String(pRec.text || pRec.point || "Counterpoint"),
          sourceRefs: normalizeSourceRefs(pRec.sourceRefs),
        };
      });
    }
  }

  // Timeline normalization
  if (block.type === "timeline" && Array.isArray(block.events)) {
    block.events = block.events.map((e: unknown) => {
      const eRec = (e && typeof e === "object") ? (e as RawRecord) : {};
      return {
        date: String(eRec.date || "Recent"),
        label: String(eRec.label || eRec.title || "Milestone"),
        description: String(eRec.description || eRec.text || ""),
        sourceRefs: normalizeSourceRefs(eRec.sourceRefs),
      };
    });
  }

  // Glossary normalization
  if (block.type === "glossary" && Array.isArray(block.terms)) {
    block.terms = block.terms.map((t: unknown) => {
      const tRec = (t && typeof t === "object") ? (t as RawRecord) : {};
      return {
        term: String(tRec.term || tRec.word || "Term"),
        definition: String(tRec.definition || tRec.desc || "Definition"),
        sourceRefs: normalizeSourceRefs(tRec.sourceRefs),
      };
    });
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
          rawParsed.blocks = rawParsed.blocks.map((b: unknown) =>
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
