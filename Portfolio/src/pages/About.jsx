import React from "react";
import { Link } from "react-scroll";
import {
  Briefcase,
  Calendar,
  MapPin,
  GraduationCap,
  Zap,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const experiences = [
    {
      role: "Backend Engineer Intern",
      company: "FlyRank AI",
      location: "Chicago, Illinois, USA (Remote)",
      period: "July 2026 – Sept. 2026",
      type: "Internship",
      highlights: [
        "Implemented stateless JWT authentication via Supabase with strict HttpOnly cookies and cryptographically signed Double-Submit Cookie patterns to eliminate XSS & CSRF risks.",
        "Built an O(1) Redis token denylist for instant JWT revocation and a cache-aside layer that cut read latency by ~94% (80 ms → 5 ms).",
        "Configured PostgreSQL with PgBouncer connection pooling to sustain 5,000+ concurrent client connections while minimizing database memory overhead.",
        "Engineered an asynchronous Sharp image processing pipeline streaming real-time progress via Server-Sent Events (SSE), coupled with direct presigned Supabase uploads and HMAC-signed URLs.",
        "Architected a cross-origin embeddable lead-capture widget with Zod payload validation, per-IP burst rate limiting, and a 3-tier geolocation fallback chain.",
      ],
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Redis",
        "Docker",
        "PgBouncer",
        "Supabase",
        "Sharp",
        "SSE",
        "Zod",
      ],
    },
    {
      role: "Frontend React Intern",
      company: "Elevvo Pathways",
      location: "Cairo, Egypt (Remote)",
      period: "Sept. 2025 – Oct. 2025",
      type: "Internship",
      highlights: [
        "Built a comprehensive admin dashboard for team, task, budget, and risk management from scratch using React, React Router, and Tailwind CSS.",
        "Translated Figma design specifications into reusable multi-theme UI components with 5 integrated Chart.js visualization modules.",
        "Achieved a 98+ Google Lighthouse score, sub-0.8s load times, and reduced client bundle size by 30% through code splitting and tree shaking.",
        "Developed a responsive, animated SaaS landing page using React, Tailwind CSS v4, and Framer Motion with smooth scroll-based interactions.",
      ],
      technologies: [
        "React",
        "Tailwind CSS",
        "React Router",
        "Chart.js",
        "Framer Motion",
        "Figma",
        "Vercel",
      ],
    },
  ];

  const metrics = [
    { label: "Read Latency Cut", value: "~94%", sub: "80ms → 5ms with Redis" },
    { label: "Concurrent Clients", value: "5,000+", sub: "PgBouncer Connection Pool" },
    { label: "Lighthouse Score", value: "98+", sub: "Sub-0.8s Frontend Load" },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 relative min-h-dvh z-10 flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Proven track record in building high-concurrency backend APIs, caching layers, and responsive web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio, Metrics, Education & CTAs */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-left">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Full-Stack & Backend Engineering
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Specializing in building secure, resilient REST APIs and performant user interfaces. Hands-on experience architecting authentication systems, caching strategies, containerized workflows, and database connection pooling.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-card/60 border border-border text-center hover:border-primary/40 transition-colors"
                >
                  <p className="text-xl md:text-2xl font-bold text-primary">{item.value}</p>
                  <p className="text-xs font-semibold mt-1">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base md:text-lg">
                    FAST-NUCES
                  </h4>
                  <p className="text-sm text-foreground/90 font-medium">
                    B.S. in Computer Science (Software Engineering)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Faisalabad, Pakistan • Aug. 2023 – June 2027
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      <Zap size={12} /> CGPA: 3.38 / 4.00 (84%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="contact" smooth={true} duration={500} className="flex-1">
                <button className="cosmic-button w-full text-base px-6 py-3">
                  Get in Touch
                </button>
              </Link>
              <a
                href="/Resume.pdf"
                download
                className="px-6 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-base flex-1"
              >
                <ArrowDown size={18} />
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Work Timeline */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-right">
            {experiences.map((exp, expIdx) => (
              <div
                key={expIdx}
                className="relative p-6 md:p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] group"
              >
                {/* Header with Title & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-primary/90 flex items-center gap-2 mt-0.5">
                      <Briefcase size={16} />
                      {exp.company}
                    </p>
                  </div>
                  <span className="self-start sm:self-center text-xs font-mono px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    {exp.type}
                  </span>
                </div>

                {/* Metadata: Date & Location */}
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary/70" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary/70" />
                    {exp.location}
                  </span>
                </div>

                {/* Highlights List */}
                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                  {exp.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2.5 py-0.5 bg-primary/10 text-primary/80 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;