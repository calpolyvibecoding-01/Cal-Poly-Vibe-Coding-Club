"use client";

import { useCallback, useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: [number, number, number];
}

export function TiltCard({
  children,
  className,
  glowColor = [113, 153, 158],
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  const glowX = useTransform(smoothX, [0, 1], [0, 100]);
  const glowY = useTransform(smoothY, [0, 1], [0, 100]);

  const [r, g, b] = glowColor;

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent) => {
      const card = cardRef.current;
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width);
      mouseY.set((event.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      className={cn("group relative", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(350px circle at ${x}% ${y}%, rgba(${r},${g},${b},0.3), rgba(${r},${g},${b},0.08), transparent 70%)`,
          ),
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(250px circle at ${x}% ${y}%, rgba(${r},${g},${b},0.06), transparent 60%)`,
          ),
        }}
      />

      <div
        className="relative h-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(13,29,48,1)_1px,transparent_1px),linear-gradient(90deg,rgba(13,29,48,1)_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 transition-opacity duration-700 group-hover:opacity-[0.03]" />
        {children}
      </div>
    </motion.div>
  );
}
