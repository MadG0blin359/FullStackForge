import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openrouter, DEFAULT_MODEL } from "@/lib/ai";
import { GeneratedLayoutSchema } from "@/lib/schemas";
import { getStoryBySlug } from "@/data/stories";
import { getLayout } from "@/data/layouts";
import { ReadingMode } from "@/lib/types";

export const maxDuration = 45;

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
  const fallback = getLayout(storySlug, effectiveMode);

  try {
    const story = getStoryBySlug(storySlug);
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // If no API key configured, use deterministic fallback
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json({
        layout: fallback,
        source: "fallback",
        model: "offline-catalog",
      });
    }

    const selectedModel = requestedModel || DEFAULT_MODEL;

    // Build context with paragraph IDs
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
Every fact, point, quote, and summary MUST include at least one "sourceRefs" containing the exact "paragraphId" from the text above (e.g. {"paragraphId": "${story.paragraphs[0]?.id || "p1"}"}).
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

    const res = await generateText({
      model: openrouter.chat(selectedModel),
      system: systemPrompt,
      prompt,
      maxOutputTokens: 4000,
      temperature: 0.2,
    });

    const jsonMatch = res.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in model response");
    }

    const rawParsed = JSON.parse(jsonMatch[0]);
    // Ensure storySlug and mode are set properly
    rawParsed.storySlug = storySlug;
    rawParsed.mode = effectiveMode;
    if (!rawParsed.generatedAt) {
      rawParsed.generatedAt = new Date().toISOString();
    }

    const validatedLayout = GeneratedLayoutSchema.parse(rawParsed);

    return NextResponse.json({
      layout: validatedLayout,
      source: "openrouter",
      model: selectedModel,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("OpenRouter generation error, falling back to deterministic layout:", err);

    return NextResponse.json({
      layout: fallback,
      source: "fallback",
      error: err.message,
    });
  }
}
