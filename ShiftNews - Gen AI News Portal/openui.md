# Introduction

> Learn to build Generative UI with OpenUI. Define your components, generate OpenUI Lang with any model, and render it as it streams.

Source: https://www.openui.com/docs

OpenUI is the open standard for Generative UI. At its core is **OpenUI Lang**, a compact language that lets models respond with live, interactive interfaces built from your own components, instead of only text. OpenUI Lang works with any model, agent framework, or chat UI.

<div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border">
  <video src="/videos/openui-introduction.mp4" poster="/videos/openui-introduction-poster.jpg" aria-label="An OpenUI agent answering a question with a generated interface of stat cards and tables" preload="metadata" className="block h-auto w-full" />
</div>

[Try the live demo →](/chat)

Most AI applications are limited to returning text as Markdown or rendering pre-built UI responses. Markdown isn't interactive, and pre-built responses are rigid. They don't adapt to the context of the conversation.

With Generative UI, the model composes the interface itself. It selects, configures, and combines components from your component library to build an interface for each request, whether that's an interactive chart, a form, or a multi-tab dashboard.

## How it works [#how-it-works]

You define the components. The model decides how to combine them for each request, and your application renders the result.

<OpenUIFlowDiagram />

1. **Define your component library:** the components the model can use to generate UI.
2. **Generate the system prompt:** OpenUI turns the library into instructions for the model.
3. **Call a model:** through [OpenUI Gateway](/docs/gateway) (recommended), which validates and fixes the generation as it streams, or directly with your own provider, using [Autofix](/docs/autofix) to repair invalid output.
4. **Render the stream:** the `Renderer` draws each component as its line arrives.

See it end to end in [Getting Started](/docs/getting-started).

## What's in OpenUI [#whats-in-openui]

OpenUI gives you the tools to build Generative UI into your application and run it reliably in production.

To build Generative UI:

- **[OpenUI Lang](/docs/openui-lang):** Describes interfaces with your own components. Models generate it in less than half the tokens of JSON-based formats, and the renderer displays it progressively as it streams.
- **[Agent Interface](/docs/agent/getting-started/introduction):** A React SDK for a complete chat interface, with threads, streaming messages, tool activity, and generated components. Connect it to your existing agent backend, or add the renderer to assistant-ui, CopilotKit, or your own chat UI instead.

To run it in production:

- **[Gateway](/docs/gateway):** OpenRouter for Generative UI. One API for models across providers, with automatic failover when a provider is unavailable and Autofix built in to correct invalid OpenUI Lang as it streams.
- **[Autofix](/docs/autofix):** Repairs invalid OpenUI Lang after generation with one API call. Keep your existing model provider, inference setup, and agent framework.
- **[Reliability Monitoring](/docs/reliability):** Shows how often generated interfaces fail, which errors recur, and the generation behind each failure. It's enabled automatically with Gateway and Autofix, or through the Observability SDK with your own inference.

Learn about correction and monitoring options in [OpenUI in production](/docs/production).

## Integrations [#integrations]

OpenUI works with the agent frameworks and frontends you already use, including [LangChain & LangGraph](/integrations/langchain-langgraph), [Vercel AI SDK](/integrations/vercel-ai-sdk), [Google ADK](/integrations/google-adk), [Mastra](/integrations/mastra), [AG-UI](/integrations/ag-ui), [assistant-ui](/integrations/assistant-ui), [Vue](/integrations/vue), [Angular](/integrations/angular), [Svelte](/integrations/svelte) and [React Native](/integrations/react-native). See [all integrations](/integrations).

# Getting Started

> Create a new OpenUI application or add OpenUI to an existing agent.

Source: https://www.openui.com/docs/getting-started

## Create a new app [#create-a-new-app]

You need Node.js 20 or later. Run:

```bash
npx @openuidev/cli@latest create
```

The setup asks which agent framework to use, then creates the project, installs its dependencies, and can start the development server for you. See the [CLI reference](/docs/api-reference/cli) for framework options and deploying a preview.

## End-to-end integration [#end-to-end-integration]

Add OpenUI to an existing application: define the components the model can use, call a model with a system prompt generated from them, and render the response.

<OpenUIFlowDiagram />

### 1. Create a component library [#1-create-a-component-library]

Create a library containing the components the model can use:

```tsx title="src/lib/openui.tsx"
import { createLibrary } from "@openuidev/react-lang";
import { Chart, Metric, Stack } from "./components";

export const library = createLibrary({
  root: "Stack",
  components: [Stack, Metric, Chart],
});
```

Learn more about defining components in the [OpenUI Lang documentation](/docs/openui-lang/defining-components).

### 2. Export the library specification [#2-export-the-library-specification]

Use the OpenUI CLI to serialize the component library for your server:

```bash
npx @openuidev/cli@latest generate src/lib/openui.tsx --spec --out src/lib/openui.spec.json
```

The generated specification describes the available components and their properties. Regenerate it whenever the component library changes.

### 3. Call a model [#3-call-a-model]

Generate the system prompt from the library specification and send it with the user's message.

```ts title="server.ts"
import OpenAI from "openai";
import { generateSystemPrompt } from "@openuidev/lang-core";
import library from "./lib/openui.spec.json";

const gateway = new OpenAI({
  apiKey: process.env.THESYS_API_KEY,
  baseURL: "https://api.thesys.dev/v1/embed",
});

const completion = await gateway.chat.completions.create({
  model: "openai/gpt-5",
  messages: [
    { role: "system", content: generateSystemPrompt({ cloud: true, library }) },
    { role: "user", content: "Compare quarterly revenue by region." },
  ],
  stream: true,
});
```

Generate an API key and write it to `.env` with the command below. Keep the key on the server and never expose it to browser code.

```bash
npx @openuidev/cli@latest generate-api-key
```

Gateway repairs invalid OpenUI Lang as the response streams.

### 4. Render the UI [#4-render-the-ui]

Pass the accumulated OpenUI Lang text to `<Renderer />`. Set `isStreaming` until the server stream closes.

```tsx title="src/components/generated-interface.tsx"
"use client";

import { Renderer } from "@openuidev/react-lang";
import { library } from "@/lib/openui";

export function GeneratedInterface({ response, isStreaming }) {
  return (
    <Renderer
      response={response}
      library={library}
      isStreaming={isStreaming}
      onAction={(action) => console.log(action)}
    />
  );
}
```

The renderer displays the interface progressively as the response arrives.

## Next steps [#next-steps]

- **Add a chat interface:** use [Agent Interface](/docs/agent/getting-started/introduction) for a complete chat UI, add OpenUI to [assistant-ui or CopilotKit](/docs/build-agents), or render generated UI in a [custom chat UI](/docs/build-agents/custom-chat-ui).
- **Go deeper on OpenUI Lang:** learn about [defining components](/docs/openui-lang/defining-components), [system prompts](/docs/openui-lang/system-prompts), and the [renderer](/docs/openui-lang/renderer).
- **Run it in production:** read [OpenUI in production](/docs/production), set up [Reliability Monitoring](/docs/reliability), and [deploy your app](/docs/deploy).
