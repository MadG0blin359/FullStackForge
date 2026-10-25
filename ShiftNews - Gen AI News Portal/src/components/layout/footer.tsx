import { Newspaper, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/10 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity pressable"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shadow-2xs">
                <Newspaper className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight">ShiftNews</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              An AI-native editorial portal where stories reshape into vetted, type-safe UI blocks tailored to your immediate cognitive situation.
            </p>
          </div>

          {/* Quick Links & Stories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2.5">
              <p className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Dispatches
              </p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <Link
                    href="/story/quiet-revolution-battery-technology"
                    className="hover:text-foreground transition-colors line-clamp-1"
                  >
                    Solid-State Batteries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/story/city-council-zoning-overhaul"
                    className="hover:text-foreground transition-colors line-clamp-1"
                  >
                    Zoning Overhaul
                  </Link>
                </li>
                <li>
                  <Link
                    href="/story/global-climate-agreement-hurdles"
                    className="hover:text-foreground transition-colors line-clamp-1"
                  >
                    Climate Implementation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Reading Modes
              </p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>⚡ 2-Minute Brief</li>
                <li>🔍 Deep Explainer</li>
                <li>⚖️ Dual Perspectives</li>
                <li>🍃 Sensory Calm Mode</li>
              </ul>
            </div>

            <div className="space-y-2.5 col-span-2 sm:col-span-1">
              <p className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Engine &amp; Models
              </p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-1">
                  <Cpu className="h-3 w-3 text-emerald-500" />
                  <span>OpenRouter Free Pool</span>
                </li>
                <li>Llama 3.3 70B &amp; Nemotron</li>
                <li>Zod Schema Validation</li>
                <li>Catalog Zero-Lag Fallback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% Attribution Grounded
            </span>
            <span aria-hidden="true">·</span>
            <span>WCAG AAA Accessible</span>
            <span aria-hidden="true">·</span>
            <span>Next.js 16 App Router</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Built for Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
