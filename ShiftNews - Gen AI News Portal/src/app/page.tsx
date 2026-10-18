import { Header, Footer, StoryCard } from "@/components/layout";
import { stories } from "@/data/stories";
import { Clock, BookOpen, Scale, Sparkles, ShieldCheck, Accessibility, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [heroStory, ...secondaryStories] = stories;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
      {/* Subtle ambient lighting (neutral, clean) */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-primary/[0.02] blur-3xl"
        aria-hidden="true"
      />

      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section with Macro-Whitespace */}
        <section
          className="relative pt-16 sm:pt-24 pb-16 px-6 max-w-5xl mx-auto space-y-8"
          aria-labelledby="hero-heading"
        >
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-3.5 py-1 text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generative UI News Architecture</span>
          </div>

          {/* Heading */}
          <div className="space-y-5 max-w-4xl">
            <h1
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08]"
            >
              Stories that reshape to match <span className="italic font-normal text-muted-foreground">how you need to read them.</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal">
              One person has 90 seconds on a commute. Another is new to the topic and lost in jargon. Another needs both sides of a debate. Open any article below to reshape the layout in real time.
            </p>
          </div>

          {/* 4 Situations Interactive Showcase Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-blue-500/20 bg-card/90 hover:border-blue-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 font-semibold">
                  Fast Brief
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;I have 2 minutes&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  What changed + key facts
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-emerald-500/20 bg-card/90 hover:border-emerald-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                  Deep Explainer
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;I&apos;m new to this&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Timeline + glossary chips
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-purple-500/20 bg-card/90 hover:border-purple-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400">
                  <Scale className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400 font-semibold">
                  Dual Lens
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;Show both sides&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Balanced side-by-side
                </p>
              </div>
            </Link>

            <Link
              href={`/story/${heroStory.slug}`}
              className="group rounded-2xl border border-amber-500/20 bg-card/90 hover:border-amber-500/50 hover:bg-card p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
                  Calm Read
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-foreground">
                  &ldquo;Low-energy mode&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quiet, alarm-free pace
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Lead Featured Story Section */}
        <section
          className="mx-auto max-w-5xl px-6 pt-4 pb-12"
          aria-label="Lead Story"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                Lead Story
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Click to open interactive reader
            </span>
          </div>

          <StoryCard story={heroStory} variant="hero" />
        </section>

        {/* Secondary Stories Bento Grid */}
        <section
          className="mx-auto max-w-5xl px-6 pt-6 pb-24"
          aria-label="More Stories"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
              In Today&apos;s Dispatch
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {secondaryStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* Design Architecture Principles Section */}
        <section
          className="border-t border-border/40 bg-muted/10 py-24 px-6"
          aria-labelledby="principles-heading"
        >
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h3
                id="principles-heading"
                className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Generative UI as the solution, not a chatbot gimmick.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Rather than an unpredictable text assistant beside a generic card grid, the layout itself adapts safely through a constrained component catalog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Principle 1 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-all shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Visible Source Citations
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    Every generated block carries interactive source chips (`¶1`, `¶3`). Clicking any chip scrolls to and highlights the original reporting.
                  </p>
                </div>
                <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>100% Verifiable</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              {/* Principle 2 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-all shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Vetted Component Catalog
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    The model cannot generate unvetted HTML. It populates typed Zod schemas into tested components: Timelines, Comparisons, Key Facts, and Pull Quotes.
                  </p>
                </div>
                <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-blue-700 dark:text-blue-400 font-semibold">
                  <span>Zod Runtime Validated</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              {/* Principle 3 */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 h-full flex flex-col justify-between space-y-4 hover:border-border transition-all shadow-xs">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400">
                    <Accessibility className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    Inclusive Accessibility
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    First-class dyslexia-friendly font (`Atkinson Hyperlegible`), Web Speech API audio reader, contrast compliance, and reduced-motion overrides.
                  </p>
                </div>
                <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-xs font-mono text-purple-700 dark:text-purple-400 font-semibold">
                  <span>WCAG AAA Ready</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
