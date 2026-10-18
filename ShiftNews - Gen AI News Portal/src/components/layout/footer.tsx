import { Newspaper, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-gradient-to-b from-transparent to-muted/20 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Newspaper className="h-3.5 w-3.5" />
          </div>
          <span className="font-serif text-base font-bold tracking-tight">ShiftNews</span>
        </Link>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
          Rethinking news consumption for human situations. Every block is linked to verifiable source paragraphs and vetted component schemas.
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-2 border-t border-border/40">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            Source Verifiable
          </span>
          <span aria-hidden="true">·</span>
          <span>WCAG AAA Compliant</span>
          <span aria-hidden="true">·</span>
          <span>Built for Hackathon</span>
        </div>
      </div>
    </footer>
  );
}
