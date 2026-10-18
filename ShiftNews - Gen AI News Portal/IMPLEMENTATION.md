# For Reference

## Architecture

Story (source of truth: paragraphs with IDs)
│
▼
Reader intent
"2 min" / "new to this"
"both sides" / "calm"
│
▼
Generator (mocked, swappable)
│
▼
Layout JSON (Zod-validated)
│
▼
Component catalog renderer
(Brief, Timeline, Glossary,
Comparison, KeyFacts, Quote…)
│
▼
Every block carries sourceRefs → paragraph IDs

## Phases

Phase 0: Foundations (about 10% of time)
Scaffold the project and set up the folder structure (below).
Define design tokens: type scale, spacing, 2 themes (light/dark), and a semantic color palette.
Pick one serif for headlines, one sans for UI, and a dyslexia-friendly option (e.g. Atkinson Hyperlegible) for the accessibility mode.
Write 3-4 seed stories with paragraph IDs. Choose varied topics (e.g. a policy change, a science story, a local-government story) so each mode has something real to show.
Phase 1: Static reader (about 20%)
Home: calm editorial feed (hero story, secondary stories, quiet footer).
Story page with the default layout: typography, measure (60-75 characters), and rhythm.
Routing between the home page and the story page.
Exit check: it already looks good with no AI involved.
Phase 2: Catalog and renderer (about 25%)
Build each block component with proper semantics (headings, lists, <time>, <blockquote>).
Build the renderer that maps JSON to components, with Zod validation and a safe fallback for unknown blocks.
Add source chips to every block. Clicking one scrolls to and highlights the original paragraph.
Hand-write the layout JSON for each (story × mode) pair. Four stories times four modes is 16 files, so trim to 2 full stories if time is short.
Phase 3: Intent picker and generation illusion (about 20%)
The “How do you want to read this?” control, as chips plus a free-text field (“I’m explaining this to my dad”).
Mock generator: a function that waits roughly 600-1200 ms, then returns the pre-authored JSON. Free text maps to the nearest mode via simple keyword matching.
Streaming effect: blocks appear one by one, with skeletons in the gaps.
Morph transition: shared-element animation from the default layout to the generated one, with spring physics that can be interrupted if the user switches modes mid-animation.
Fallback state: if generation “fails,” show the default layout with a small, honest notice.
Phase 4: Trust and accessibility layer (about 15%)
“How this view was made” drawer: shows the mode, the blocks chosen, and the source mapping.
Accessibility panel: font family, size, line height, and reduced motion override.
Audio mode: use the Web Speech API (speechSynthesis) to read the generated view, with a visible play/pause and per-block highlight.
Low-energy mode: muted palette, no animation, and a “that’s all, you’re caught up” ending.
Phase 5: Polish and demo (about 10%)
Motion pass: only meaningful transitions, 150-300 ms, and everything off under prefers-reduced-motion.
Audit with axe DevTools and Lighthouse, and test keyboard-only and screen-reader flows.
Mobile pass (this is where the “90 seconds on a bus” story lives).

# More

5. Accessibility checklist (build in, don’t bolt on)
   Semantic landmarks and a skip link; logical heading order inside generated layouts.
   When the layout morphs, move focus sensibly and announce it via an aria-live="polite" region (“Showing 2-minute brief”).
   Color contrast of at least 4.5:1 in every theme and mode; never use color alone to convey meaning.
   Targets of at least 44×44 px, with visible focus rings.
   Full keyboard path: feed, story, picker, generated view, drawer.
   Respect prefers-reduced-motion, prefers-color-scheme, and prefers-contrast.
6. Demo script (about 2 minutes)
   Problem (15 s): “Same story, five different readers, one layout.”
   Home to story (15 s): a calm feed, and opening a story.
   “I have 2 minutes” (20 s): the morph into the brief.
   “I’m new to this” (20 s): the timeline and glossary.
   Trust (20 s): click a source chip, then open “how this view was made.”
   Accessibility (20 s): dyslexia font, audio mode, and keyboard-only navigation.
   Close (10 s): “The catalog is constrained, so generation can’t break the design.”

7. Risks and mitigations
   Risk Mitigation
   Live AI is slow or flaky - Mock generation by default; add a real LLM behind a feature flag only if time remains
   Too many modes, all shallow - Ship 4 modes done well; the rest go on a “next” slide
   Motion feels gimmicky - One signature transition (the morph); everything else is near-instant
   Generated layouts look inconsistent - A fixed catalog and a shared token system
   Scope creep - A hard feature freeze before Phase 5
