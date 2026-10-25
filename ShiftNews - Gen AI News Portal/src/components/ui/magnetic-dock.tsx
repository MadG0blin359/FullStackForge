"use client";

import React, { useRef, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticDockProps {
  children: React.ReactNode[];
  className?: string;
  /** Maximum scale factor for nearest item. Default 1.3. */
  maxScale?: number;
  /** Pixel radius of influence. Default 110. */
  magnetRadius?: number;
  /** Disable magnification (for reduced-motion). Default false. */
  disabled?: boolean;
}

/**
 * macOS-style magnification dock.
 * Uses Framer Motion useTransform to compute proximity-based scale
 * for each child with spring dampening. Zero re-renders.
 */
export function MagneticDock({
  children,
  className,
  maxScale = 1.3,
  magnetRadius = 110,
  disabled = false,
}: MagneticDockProps) {
  const mouseX = useMotionValue<number>(Infinity);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) {
        mouseX.set(e.clientX);
      }
    },
    [disabled, mouseX]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(Infinity);
  }, [mouseX]);

  if (disabled) {
    return <div className={cn("flex items-center gap-1", className)}>{children}</div>;
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("flex items-center gap-0.5", className)}
    >
      {React.Children.map(children, (child, index) => (
        <DockItem
          key={index}
          mouseX={mouseX}
          maxScale={maxScale}
          magnetRadius={magnetRadius}
        >
          {child}
        </DockItem>
      ))}
    </motion.div>
  );
}

interface DockItemProps {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  maxScale: number;
  magnetRadius: number;
}

function DockItem({ children, mouseX, maxScale, magnetRadius }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({ x: 0, width: 0 });

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setRect({ x: r.x + r.width / 2, width: r.width });
    }
  }, []);

  // Direct calculation of distance to scale (clean single transformer)
  const scale = useTransform(mouseX, (val: number): number => {
    const centerX = rect.x || 0;
    if (centerX === 0 || !isFinite(val)) return 1;
    const distance = Math.abs(val - centerX);
    if (distance >= magnetRadius) return 1;
    // Cosine smoothing for fluid Apple Dock feel
    const factor = (Math.cos((distance / magnetRadius) * Math.PI) + 1) / 2;
    return 1 + (maxScale - 1) * factor;
  });

  const springScale = useSpring(scale, {
    stiffness: 380,
    damping: 26,
    mass: 0.25,
  });

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      style={{ scale: springScale }}
      className="origin-bottom will-change-transform"
    >
      {children}
    </motion.div>
  );
}
