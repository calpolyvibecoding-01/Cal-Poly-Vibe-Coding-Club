"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const scenePalette = {
  dark: "25, 65, 72",
  mid: "73, 104, 111",
  light: "113, 153, 158",
  glow: "201, 219, 222",
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function project(
  p: Point3D,
  w: number,
  h: number,
  fov: number,
): { x: number; y: number; scale: number } {
  const f = fov / (fov + p.z);
  return { x: p.x * f + w / 2, y: p.y * f + h / 2, scale: f };
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function generateTorusKnot(
  R: number,
  r: number,
  p: number,
  q: number,
  segments: number,
): Point3D[] {
  const points: Point3D[] = [];

  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2 * p;
    const rr = R + r * Math.cos((q * t) / p);
    points.push({
      x: rr * Math.cos(t),
      y: rr * Math.sin(t),
      z: r * Math.sin((q * t) / p) * 2,
    });
  }

  return points;
}

function generateRing(radius: number, segments: number): Point3D[] {
  const points: Point3D[] = [];

  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push({ x: Math.cos(t) * radius, y: Math.sin(t) * radius, z: 0 });
  }

  return points;
}

function generateStars(count: number, spread: number): Point3D[] {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spread,
    y: (Math.random() - 0.5) * spread,
    z: (Math.random() - 0.5) * spread,
  }));
}

function generateIcosahedron(size: number): {
  verts: Point3D[];
  edges: [number, number][];
} {
  const t = (1 + Math.sqrt(5)) / 2;
  const s = size / Math.sqrt(1 + t * t);
  const verts: Point3D[] = [
    { x: -s, y: t * s, z: 0 },
    { x: s, y: t * s, z: 0 },
    { x: -s, y: -t * s, z: 0 },
    { x: s, y: -t * s, z: 0 },
    { x: 0, y: -s, z: t * s },
    { x: 0, y: s, z: t * s },
    { x: 0, y: -s, z: -t * s },
    { x: 0, y: s, z: -t * s },
    { x: t * s, y: 0, z: -s },
    { x: t * s, y: 0, z: s },
    { x: -t * s, y: 0, z: -s },
    { x: -t * s, y: 0, z: s },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 5],
    [0, 7],
    [0, 10],
    [0, 11],
    [1, 5],
    [1, 7],
    [1, 8],
    [1, 9],
    [2, 3],
    [2, 4],
    [2, 6],
    [2, 10],
    [2, 11],
    [3, 4],
    [3, 6],
    [3, 8],
    [3, 9],
    [4, 5],
    [4, 9],
    [4, 11],
    [5, 9],
    [5, 11],
    [6, 7],
    [6, 8],
    [6, 10],
    [7, 8],
    [7, 10],
    [8, 9],
    [10, 11],
  ];

  return { verts, edges };
}

function generateOctahedron(size: number): {
  verts: Point3D[];
  edges: [number, number][];
} {
  const verts: Point3D[] = [
    { x: 0, y: size, z: 0 },
    { x: 0, y: -size, z: 0 },
    { x: size, y: 0, z: 0 },
    { x: -size, y: 0, z: 0 },
    { x: 0, y: 0, z: size },
    { x: 0, y: 0, z: -size },
  ];

  const edges: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [4, 3],
    [3, 5],
    [5, 2],
  ];

  return { verts, edges };
}

interface Canvas3DSceneProps {
  onReady?: () => void;
  onFrame?: () => void;
  isActive?: boolean;
  className?: string;
}

export function Canvas3DScene({
  onReady,
  onFrame,
  isActive = true,
  className,
}: Canvas3DSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const readyFired = useRef(false);
  const isActiveRef = useRef(isActive);
  const onFrameRef = useRef(onFrame);

  const starsRef = useRef(generateStars(200, 800));
  const knotRef = useRef(generateTorusKnot(80, 30, 3, 2, 200));
  const ring1Ref = useRef(generateRing(180, 60));
  const ring2Ref = useRef(generateRing(210, 60));
  const ring3Ref = useRef(generateRing(240, 60));
  const icoRef = useRef(generateIcosahedron(60));
  const octRef = useRef(generateOctahedron(50));

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    mouseRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    const stars = starsRef.current;
    const knotPts = knotRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const ring3 = ring3Ref.current;
    const ico = icoRef.current;
    const oct = octRef.current;

    function drawLine(
      context: CanvasRenderingContext2D,
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      color: string,
      width: number,
    ) {
      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.strokeStyle = color;
      context.lineWidth = width;
      context.stroke();
    }

    const animate = () => {
      if (!isActiveRef.current || document.hidden) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sceneScale = clamp(Math.min(w, h) / 800, 0.68, 1.28);
      const fov = 500;
      const time = performance.now() * 0.001;
      const mx = mouseRef.current.x * 0.15;
      const my = mouseRef.current.y * 0.15;

      ctx.clearRect(0, 0, w, h);

      if (!readyFired.current) {
        readyFired.current = true;
        onReady?.();
      }

      for (const star of stars) {
        let pt = {
          x: star.x * sceneScale,
          y: star.y * sceneScale,
          z: star.z * sceneScale,
        };
        pt = rotateY(pt, time * 0.05 + mx);
        pt = rotateX(pt, my * 0.3);

        const proj = project(pt, w, h, fov);

        if (proj.scale > 0) {
          const brightness = Math.min(1, proj.scale * 1.5);
          const starColor = proj.scale > 0.85 ? scenePalette.glow : scenePalette.light;

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.5, proj.scale * 2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${starColor}, ${brightness * 0.7})`;
          ctx.fill();
        }
      }

      let prevKnot: { x: number; y: number; scale: number } | null = null;
      for (let i = 0; i < knotPts.length; i += 1) {
        let pt = {
          x: knotPts[i].x * sceneScale,
          y: knotPts[i].y * sceneScale,
          z: knotPts[i].z * sceneScale,
        };
        pt = rotateY(pt, time * 0.3 + mx);
        pt = rotateX(pt, time * 0.2 + my);
        const proj = project(pt, w, h, fov);

        if (prevKnot && proj.scale > 0) {
          const alpha = Math.min(0.9, proj.scale * 0.8);
          ctx.beginPath();
          ctx.moveTo(prevKnot.x, prevKnot.y);
          ctx.lineTo(proj.x, proj.y);
          ctx.strokeStyle = `rgba(${scenePalette.light}, ${alpha})`;
          ctx.lineWidth = Math.max(0.5, proj.scale * 2.5);
          ctx.stroke();
        }

        prevKnot = proj;
      }

      if (prevKnot) {
        let pt = {
          x: knotPts[0].x * sceneScale,
          y: knotPts[0].y * sceneScale,
          z: knotPts[0].z * sceneScale,
        };
        pt = rotateY(pt, time * 0.3 + mx);
        pt = rotateX(pt, time * 0.2 + my);
        const proj = project(pt, w, h, fov);

        ctx.beginPath();
        ctx.moveTo(prevKnot.x, prevKnot.y);
        ctx.lineTo(proj.x, proj.y);
        ctx.strokeStyle = `rgba(${scenePalette.light}, 0.7)`;
        ctx.lineWidth = Math.max(0.5, proj.scale * 2.5);
        ctx.stroke();
      }

      const gradientRadius = Math.max(160, Math.min(w, h) * 0.28);
      const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        gradientRadius,
      );
      gradient.addColorStop(0, `rgba(${scenePalette.light}, 0.18)`);
      gradient.addColorStop(1, `rgba(${scenePalette.light}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const rings = [
        { pts: ring1, color: scenePalette.light, rotOffset: 0 },
        { pts: ring2, color: scenePalette.mid, rotOffset: Math.PI / 3 },
        { pts: ring3, color: scenePalette.dark, rotOffset: (Math.PI * 2) / 3 },
      ];

      for (const ring of rings) {
        let prevRing: { x: number; y: number; scale: number } | null = null;

        for (let i = 0; i < ring.pts.length; i += 1) {
          let pt = {
            x: ring.pts[i].x * sceneScale,
            y: ring.pts[i].y * sceneScale,
            z: ring.pts[i].z * sceneScale,
          };
          pt = rotateX(pt, Math.PI / 2 + ring.rotOffset);
          pt = rotateY(pt, time * 0.15 + mx);
          pt = rotateX(pt, time * 0.1 + my);
          const proj = project(pt, w, h, fov);

          if (prevRing && proj.scale > 0) {
            ctx.beginPath();
            ctx.moveTo(prevRing.x, prevRing.y);
            ctx.lineTo(proj.x, proj.y);
            ctx.strokeStyle = `rgba(${ring.color}, ${Math.min(0.5, proj.scale * 0.6)})`;
            ctx.lineWidth = Math.max(0.3, proj.scale * 1.5);
            ctx.stroke();
          }

          prevRing = proj;
        }

        if (prevRing) {
          let pt = {
            x: ring.pts[0].x * sceneScale,
            y: ring.pts[0].y * sceneScale,
            z: ring.pts[0].z * sceneScale,
          };
          pt = rotateX(pt, Math.PI / 2 + ring.rotOffset);
          pt = rotateY(pt, time * 0.15 + mx);
          pt = rotateX(pt, time * 0.1 + my);
          const proj = project(pt, w, h, fov);

          ctx.beginPath();
          ctx.moveTo(prevRing.x, prevRing.y);
          ctx.lineTo(proj.x, proj.y);
          ctx.strokeStyle = `rgba(${ring.color}, 0.4)`;
          ctx.lineWidth = Math.max(0.3, proj.scale * 1.5);
          ctx.stroke();
        }
      }

      const icoOffset: Point3D = {
        x: -200 * sceneScale,
        y: -100 * sceneScale,
        z: 0,
      };
      for (const [a, b] of ico.edges) {
        let pa = {
          x: ico.verts[a].x * sceneScale + icoOffset.x,
          y: ico.verts[a].y * sceneScale + icoOffset.y,
          z: ico.verts[a].z * sceneScale + icoOffset.z,
        };

        let pb = {
          x: ico.verts[b].x * sceneScale + icoOffset.x,
          y: ico.verts[b].y * sceneScale + icoOffset.y,
          z: ico.verts[b].z * sceneScale + icoOffset.z,
        };

        pa = rotateY(pa, time * 0.5 + mx);
        pa = rotateX(pa, time * 0.3 + my);
        pb = rotateY(pb, time * 0.5 + mx);
        pb = rotateX(pb, time * 0.3 + my);

        pa.y += Math.sin(time * 0.8) * 20;
        pb.y += Math.sin(time * 0.8) * 20;

        const projA = project(pa, w, h, fov);
        const projB = project(pb, w, h, fov);

        if (projA.scale > 0 && projB.scale > 0) {
          drawLine(
            ctx,
            projA,
            projB,
            `rgba(${scenePalette.mid}, ${Math.min(0.7, projA.scale * 0.7)})`,
            Math.max(0.5, projA.scale * 1.5),
          );
        }
      }

      const octOffset: Point3D = {
        x: 200 * sceneScale,
        y: 80 * sceneScale,
        z: 0,
      };
      for (const [a, b] of oct.edges) {
        let pa = {
          x: oct.verts[a].x * sceneScale + octOffset.x,
          y: oct.verts[a].y * sceneScale + octOffset.y,
          z: oct.verts[a].z * sceneScale + octOffset.z,
        };

        let pb = {
          x: oct.verts[b].x * sceneScale + octOffset.x,
          y: oct.verts[b].y * sceneScale + octOffset.y,
          z: oct.verts[b].z * sceneScale + octOffset.z,
        };

        pa = rotateY(pa, time * 0.6 + mx);
        pa = rotateX(pa, time * 0.4 + my);
        pb = rotateY(pb, time * 0.6 + mx);
        pb = rotateX(pb, time * 0.4 + my);

        pa.y += Math.sin(time * 0.7 + 1) * 25;
        pb.y += Math.sin(time * 0.7 + 1) * 25;

        const projA = project(pa, w, h, fov);
        const projB = project(pb, w, h, fov);

        if (projA.scale > 0 && projB.scale > 0) {
          drawLine(
            ctx,
            projA,
            projB,
            `rgba(${scenePalette.dark}, ${Math.min(0.7, projA.scale * 0.7)})`,
            Math.max(0.5, projA.scale * 1.5),
          );
        }
      }

      for (const v of ico.verts) {
        let pt = {
          x: v.x * sceneScale + icoOffset.x,
          y: v.y * sceneScale + icoOffset.y,
          z: v.z * sceneScale + icoOffset.z,
        };

        pt = rotateY(pt, time * 0.5 + mx);
        pt = rotateX(pt, time * 0.3 + my);
        pt.y += Math.sin(time * 0.8) * 20;

        const proj = project(pt, w, h, fov);
        if (proj.scale > 0) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.scale * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${scenePalette.mid}, ${Math.min(0.5, proj.scale * 0.5)})`;
          ctx.fill();
        }
      }

      for (const v of oct.verts) {
        let pt = {
          x: v.x * sceneScale + octOffset.x,
          y: v.y * sceneScale + octOffset.y,
          z: v.z * sceneScale + octOffset.z,
        };

        pt = rotateY(pt, time * 0.6 + mx);
        pt = rotateX(pt, time * 0.4 + my);
        pt.y += Math.sin(time * 0.7 + 1) * 25;

        const proj = project(pt, w, h, fov);
        if (proj.scale > 0) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.scale * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${scenePalette.dark}, ${Math.min(0.5, proj.scale * 0.5)})`;
          ctx.fill();
        }
      }

      onFrameRef.current?.();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, onReady]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ display: "block" }}
    />
  );
}
