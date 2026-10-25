"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default 6. */
  maxTilt?: number;
  /** Spring stiffness for return-to-rest. Default 300. */
  stiffness?: number;
  /** Spring damping. Default 20. */
  damping?: number;
  /** Whether to show the specular sheen overlay. Default true. */
  showSheen?: boolean;
  /** Disable all tilt (for reduced-motion). Default false. */
  disabled?: boolean;
}

/**
 * Hardware-accelerated 3D perspective tilt card.
 * - Uses Framer Motion's useMotionValue + useSpring (zero re-renders).
 * - Specular sheen that follows the cursor for a polished glass effect.
 * - Compositor-only properties: transform + opacity.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
  stiffness = 300,
  damping = 20,
  showSheen = true,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Raw motion values (no re-renders)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);

  // Spring smoothing for the tilt
  const springConfig = { stiffness, damping, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalise to -1...1
      const normalX = (e.clientX - centerX) / (rect.width / 2);
      const normalY = (e.clientY - centerY) / (rect.height / 2);

      // Tilt: Y axis for horizontal mouse movement, X for vertical (inverted)
      rotateY.set(normalX * maxTilt);
      rotateX.set(-normalY * maxTilt);

      // Sheen position follows the cursor (percentages)
      sheenX.set(((e.clientX - rect.left) / rect.width) * 100);
      sheenY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [disabled, maxTilt, rotateX, rotateY, sheenX, sheenY]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovering(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
    sheenX.set(50);
    sheenY.set(50);
  }, [rotateX, rotateY, sheenX, sheenY]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d" as const,
      }}
      className={cn("relative will-change-transform", className)}
    >
      {children}

      {/* Specular sheen overlay */}
      {showSheen && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${sheenX.get()}% ${sheenY.get()}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
              : "none",
            opacity: isHovering ? 1 : 0,
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
