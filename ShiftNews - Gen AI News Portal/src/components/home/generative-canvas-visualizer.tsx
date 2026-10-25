"use client";

import React, { useEffect, useRef } from "react";

interface GenerativeCanvasVisualizerProps {
  mode: "raw" | "brief" | "debate";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  cluster: number; // 0 = neutral, 1 = blue/sideA, 2 = purple/sideB
}

export function GenerativeCanvasVisualizer({
  mode,
  className = "",
}: GenerativeCanvasVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 110);

    const isDarkMode = document.documentElement.classList.contains("dark");
    const numParticles = 45;
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: Math.random() * 2 + 2,
        color: isDarkMode ? "#3b82f6" : "#2563eb",
        cluster: i % 2 === 0 ? 1 : 2,
      });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 110;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Compute targets depending on active mode
      particles.forEach((p, i) => {
        if (mode === "raw") {
          // Linear wire rows: ordered in 3 horizontal lanes like newspaper lines
          const lane = i % 3;
          const col = Math.floor(i / 3);
          p.targetX = (col / (numParticles / 3)) * (width - 40) + 20;
          p.targetY = 25 + lane * 30;
          p.color = isDarkMode ? "rgba(148, 163, 184, 0.75)" : "rgba(100, 116, 139, 0.75)";
        } else if (mode === "brief") {
          // Condensed hexagonal central core
          const angle = (i / numParticles) * Math.PI * 4;
          const radius = (i % 3 + 1) * 16;
          p.targetX = width / 2 + Math.cos(angle) * radius;
          p.targetY = height / 2 + Math.sin(angle) * (radius * 0.55);
          p.color = isDarkMode ? "rgba(59, 130, 246, 0.85)" : "rgba(37, 99, 235, 0.85)";
        } else if (mode === "debate") {
          // Dual lens: binary poles (side A left, side B right)
          if (p.cluster === 1) {
            // Left Blue Cluster
            const angle = (i / (numParticles / 2)) * Math.PI * 2;
            const radius = 22 + (i % 3) * 8;
            p.targetX = width * 0.32 + Math.cos(angle) * radius;
            p.targetY = height / 2 + Math.sin(angle) * (radius * 0.6);
            p.color = isDarkMode ? "rgba(59, 130, 246, 0.85)" : "rgba(37, 99, 235, 0.85)";
          } else {
            // Right Purple/Amber Cluster
            const angle = (i / (numParticles / 2)) * Math.PI * 2;
            const radius = 22 + (i % 3) * 8;
            p.targetX = width * 0.68 + Math.cos(angle) * radius;
            p.targetY = height / 2 + Math.sin(angle) * (radius * 0.6);
            p.color = isDarkMode ? "rgba(168, 85, 247, 0.85)" : "rgba(147, 51, 234, 0.85)";
          }
        }

        // Spring towards target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.04;
        p.vy += dy * 0.04;

        // Mouse avoidance / subtle attraction
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < 70 && dist > 0) {
            p.vx -= (mdx / dist) * 1.5;
            p.vy -= (mdy / dist) * 1.5;
          }
        }

        // Friction damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connective neural strands between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const maxDist = mode === "raw" ? 40 : mode === "brief" ? 55 : 48;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle =
              p1.cluster === 1 && p2.cluster === 1
                ? `rgba(59, 130, 246, ${alpha})`
                : p1.cluster === 2 && p2.cluster === 2
                ? `rgba(168, 85, 247, ${alpha})`
                : `rgba(148, 163, 184, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-muted/20 border border-border/40 select-none ${className}`}>
      <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span>Synthesis Topology Visualizer</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[110px] block cursor-crosshair"
      />
    </div>
  );
}
