# Problem/Task

i am participating in a hackathon and i need to design and build a frontend and deploy it on vercel:
Design something people will actually want to use.
This hackathon is all about rethinking how people interact with technology. Identify a problem, understand the people experiencing it, and create a digital experience that makes their lives simpler, clearer, or more engaging.
Build a website, web app, mobile interface, dashboard, interactive experience, or prototype that puts thoughtful design and usability at its centre. You can start with a completely new idea, redesign an existing experience, or explore an unconventional way of solving a familiar problem.
Your project could be anything from an accessible education platform or student productivity tool to a healthcare interface, financial dashboard, interactive portfolio, civic-service website, or immersive web experience.
You don't need to build a complex backend. A polished Figma prototype, interactive mockup, or frontend implementation is just as welcome as a fully functional application. What matters is how thoughtfully you approach the user, the problem, and the experience.
🔎 What We're Looking For

- 🧭 Thoughtful UX and user flows
- 🎨 Intuitive and visually compelling UI
- ♿ Accessibility and inclusive design
- ✨ Creative interaction and information architecture
- 💡 Strong problem-solving and originality
  🚀 A polished prototype or working implementation

# Solution/Idea

Good direction, with one caveat: judges score on problem, people, and UX, so generative UI should be the means, not the pitch.

The risk

“News portal with generative UI” is a technology looking for a problem. Many teams will do “AI-personalized news feed,” and it usually ends up as a chatbot beside a card grid. Open with a human problem instead.

A stronger framing

Problem: News is built for one kind of reader, but people read it in very different situations. One person has 90 seconds on a bus, another is anxious and doomscrolling, another is dyslexic, another is new to the topic and lost in jargon.

Idea: A portal where the story reshapes itself to the reader’s situation, not just the feed order. Examples:

“I have 2 minutes” turns the story into a brief with key facts and a “what changed” strip.
“I’m new to this” turns it into an explainer with a timeline, glossary chips and “why it matters.”
“Show me both sides” turns it into a side-by-side comparison with sources.
“Low-energy mode” gives calm pacing, no autoplay, and no alarming visuals.
Accessibility modes (dyslexia-friendly type, screen-reader-first structure, audio) are first-class, not afterthoughts.

This is where generative UI earns its place, because the layout itself is the answer to the user’s need.

How to make it work technically
Constrain the generation. Have the model choose from a vetted component catalog (Timeline, Comparison, KeyFacts, Glossary, Quote, etc.) and fill typed JSON, rather than inventing arbitrary UI. This keeps visual quality, accessibility, and performance under your control, and it’s also a strong story for judges.
Make trust visible. In news, every generated block should link to the source paragraph. Add a “how this view was made” toggle. Judges notice this.
Always have a deterministic fallback. If generation is slow or fails, show a clean default layout. Demo reliability matters more than live-AI bravado, so pre-seed 3 or 4 stories and mock the generation with streaming and skeletons.
Where your design tools fit

I’m confident about Emil Kowalski’s approach (purposeful, fast, restrained motion, springs, interruptible transitions), and it suits the moment a layout morphs between modes. I’m less sure of the exact contents of the Taste and Impeccable skills and of OpenUI’s current API, so I’d check their docs rather than rely on my memory. In general, use them to enforce a strong typographic system, and respect prefers-reduced-motion.

Scope for the hackathon

One polished flow beats five half-built ones:

Home with a calm editorial feed
Open a story, choose “how do you want to read this?”
Watch it morph into the generated layout
Accessibility and source-transparency panel

# Example Tech Stack and Libraries

Next.js
TypeScript
Tailwind CSS
shadcn/ui
Radix UI
Motion (Framer Motion)
Lucide React
Vercel AI SDK
Zod
Vercel

# Preferred Skills

Skills installation location: "C:\Users\Shawaiz\.gemini\antigravity\skills"

OpenUI: This is the official generative UI skill for agents. Instead of Claude responding with plain Markdown text, this skill teaches the agent how to seamlessly scaffold, inject, and debug live interactive components (like your Timeline, KeyFacts, or Comparison blocks) directly into the UI.

```
npx @openuidev/cli@latest create
```

Emil Kowalski Motions - Available Skills
emil-design-eng - The main skill that consists of mostly animation, but also some design advice.
animate - Builds an animation from scratch while choosing the correct curve, duration, properties, and so on.
animate-expo - The same bar, for React Native and Expo: gestures, sheets, haptics, screen transitions, and keeping motion off the JS thread.
review-animations - Review your animations in a strict way, based on my rules.
improve-animations - Audit all the animations in your codebase and get prioritized, self-contained plans that any agent can execute.
find-animation-opportunities - Search your UI for places that would genuinely benefit from motion, while also telling you what not to animate.
animation-performance - Fix animations that drop frames. It includes lots of subtle issues that most agents miss.
animation-vocabulary - Get better animations from an AI by telling it exactly what you want by using the right words.
apple-design - Apple’s principles for interface design and fluid motion, distilled from their WWDC design talks and translated for the web.
write-swift - Write modern Swift. Includes: value types, Swift 6 concurrency, generics, performance, and Swift Testing.
pick-ui-library - Have your agent pick the right library for the task based on libraries I use and trust, instead of letting AI hand-roll a toast component or install an abandoned package.
prototype - Build multiple different versions of a UI piece you describe and go through them using a switcher.
mobile-native - Make your web app feel native on a phone: sticky hover states, tap highlight flashes, the 100vh bug, inputs that zoom the page, laggy taps, safe areas, and the rest of the small fixes that separate a website from an app.
break-ui - Try to break the UI you built with worst-case data: long names, unusual emails, one-letter names, huge counts, empty lists, long labels.
ask-sonner - Your guide to working with Sonner, my toast library. Contains setup, styling, recipes, and fixes for the most common issues.

```
npx skills add emilkowalski/skill
```

Impeccable: Described as a design language for AI-built frontends, this skill provides 24 specific workflow commands (such as shape, audit, polish, or animate) and runs 59 automatic checks to prevent generic "AI slop". It forces Claude to act as an "award-winning design director" rather than a timid code generator. Crucially for a news portal, it enforces surface "modes"—ensuring Claude uses the "Read" mode (optimizing for comprehension) rather than defaulting to the "Persuade" mode used for landing pages.

```
npx impeccable install
/impeccable init
/impeccable hooks on
```

Taste Skill: Acting as an "Anti-Slop Frontend Framework," this pack gives Claude concrete, metric-driven instructions specifically focused on layout, typography, motion, and spacing. You use this to set strict "taste dials" and references, ensuring that when Claude implements your Framer Motion transitions or adjusts Tailwind padding, the resulting UI looks deliberately crafted rather than AI-generated.

```
npx skills add Leonxlnx/taste-skill
```
