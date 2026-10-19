import { createOpenAI } from "@ai-sdk/openai";
import { AVAILABLE_MODELS } from "./types";

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://shiftnews.vercel.app",
    "X-Title": "ShiftNews Generative UI",
  },
});

export const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || AVAILABLE_MODELS[0].id;
