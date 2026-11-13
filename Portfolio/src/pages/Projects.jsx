import React, { useState } from "react";
import { getImageUrl } from "../lib/imageURL";
import {
  Github,
  Eye,
  BookOpen,
  Sparkles,
  Database,
  Cpu,
  Terminal,
} from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projectsData = [
    {
      id: 1,
      title: "ShiftNews – Gen AI News Portal",
      description:
        "Generative-UI news platform whose layout and components adapt in real time to reader habits. Powered by Claude via OpenRouter API with strict Zod validation.",
      image: null,
      icon: Sparkles,
      tag: "Next.js • Claude API • Generative UI",
      gradient: "from-purple-950 via-slate-900 to-violet-950",
      iconColor: "text-purple-400",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Zod",
        "Framer Motion",
        "Radix UI",
        "Claude API",
      ],
      category: "web",
      isApi: false,
      liveDemo: "https://shiftnews-gen-ai.vercel.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/ShiftNews%20-%20Gen%20AI%20News%20Portal",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management API",
      description:
        "High-performance REST API with stateless Supabase JWT auth, O(1) Redis token revocation & cache-aside layer (cutting latency by ~94%), and PostgreSQL connection pooling for 5,000+ clients.",
      image: null,
      icon: Database,
      tag: "REST API • Redis Caching • PgBouncer",
      gradient: "from-emerald-950 via-slate-900 to-teal-950",
      iconColor: "text-emerald-400",
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Redis",
        "Docker",
        "PgBouncer",
        "Swagger UI",
      ],
      category: "api",
      isApi: true,
      liveDemo: "https://api-lab-task-api-postgres.onrender.com/docs",
      github:
        "https://github.com/MadG0blin359/API-Lab/tree/main/task-api-postgres",
      featured: true,
    },
    {
      id: 3,
      title: "Project Management Dashboard",
      description:
        "Front-End design of an admin dashboard for team, task, budget, and risk management with reusable multi-theme components and Chart.js metrics.",
      image: getImageUrl("Project 2.jpg"),
      technologies: [
        "React",
        "React Router",
        "Tailwind CSS",
        "Lucide Icons",
        "Chart.js",
      ],
      category: "web",
      isApi: false,
      liveDemo: "https://panelflow.vercel.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Project%20Management%20Dashboard",
      featured: true,
    },
    {
      id: 4,
      title: "Media Processing Pipeline",
      description:
        "Direct-to-storage upload pipeline via presigned Supabase URLs, with an asynchronous Sharp worker generating WebP variants off-thread and streaming real-time progress via Server-Sent Events.",
      image: null,
      icon: Cpu,
      tag: "Sharp Pipeline • SSE Streaming • Presigned URLs",
      gradient: "from-blue-950 via-slate-900 to-cyan-950",
      iconColor: "text-cyan-400",
      technologies: [
        "Node.js",
        "Express",
        "Sharp",
        "Supabase",
        "Server-Sent Events",
        "HMAC",
        "Render",
      ],
      category: "api",
      isApi: true,
      liveDemo: "https://api-lab-media-processing-api.onrender.com/docs",
      github:
        "https://github.com/MadG0blin359/API-Lab/tree/main/media-processing-api",
      featured: false,
    },
    {
      id: 5,
      title: "Lead-Capture API & Embeddable Widget",
      description:
        "Cross-origin embed-snippet engine injecting dynamic forms via a single-line script bundle, with strict Zod validation, per-IP rate limiting, honeypot spam protection, and 3-tier geolocation fallback.",
      image: null,
      icon: Terminal,
      tag: "Embed Script • Zod Validation • Geolocation",
      gradient: "from-amber-950 via-slate-900 to-orange-950",
      iconColor: "text-amber-400",
      technologies: [
        "TypeScript",
        "Node.js",
        "Redux",
        "Firebase",
        "Zod",
        "Render",
        "Swagger UI",
      ],
      category: "api",
      isApi: true,
      liveDemo: "https://api-lab-lead-capture-api.onrender.com/docs",
      github:
        "https://github.com/MadG0blin359/API-Lab/tree/main/lead-capture-api",
      featured: false,
    },
    {
      id: 6,
      title: "Streamer SaaS App",
      description:
        "A modern, responsive SaaS website built with React and Tailwind CSS, featuring smooth animations and cosmic visual aesthetics.",
      image: getImageUrl("Project 1.jpg"),
      technologies: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "Framer Motion",
        "React Icons",
        "React Scroll",
        "Figma",
      ],
      category: "web",
      isApi: false,
      liveDemo: "https://streamer-saas.vercel.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Streamer%20-%20SaaS%20App",
      featured: false,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-primary">Selected</span> Work
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Explore full-stack web applications, scalable REST APIs, and background processing systems
        </p>

        {/* Category Filter Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {[
            { id: "all", label: "All Projects" },
            { id: "web", label: "Web Applications" },
            { id: "api", label: "Backend & APIs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-105"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] flex flex-col"
            >
              {/* Project Image or Visual Header */}
              <div className="relative h-52 overflow-hidden bg-card/60 flex flex-col justify-between">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                  </>
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}
                  >
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Window Header */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground/80 tracking-wider">
                        {project.isApi ? "API SERVICE" : "WEB APP"}
                      </span>
                    </div>

                    {/* Center Icon & Tag */}
                    <div className="flex flex-col items-center justify-center my-auto z-10">
                      <div
                        className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md ${project.iconColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}
                      >
                        {project.icon && <project.icon size={32} />}
                      </div>
                      {project.tag && (
                        <span className="mt-3 text-xs font-mono text-white/70 px-2.5 py-1 rounded bg-black/30 border border-white/10">
                          {project.tag}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-20">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-primary/10 text-primary/80 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto pt-2">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-lg bg-primary text-white text-sm font-medium text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
                  >
                    {project.isApi ? (
                      <>
                        <BookOpen size={16} />
                        API Docs
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        Live Demo
                      </>
                    )}
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-lg bg-gray-800 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg active:scale-95 flex items-center justify-center"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
