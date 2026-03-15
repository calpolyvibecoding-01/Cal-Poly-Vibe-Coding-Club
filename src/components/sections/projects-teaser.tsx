"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const CARDS = [
  { number: "01", label: "Featured Slot", sub: "Your project here" },
  { number: "02", label: "Featured Slot", sub: "Your project here" },
  { number: "03", label: "Featured Slot", sub: "Your project here" },
  { number: "04", label: "Featured Slot", sub: "Your project here" },
  { number: "05", label: "Featured Slot", sub: "Your project here" },
];
const TEMP_MOBILE_CARD = {
  badge: "TEMP",
  title: "Temp Project",
  sub: "Your project could be featured here soon.",
} as const;

const CARD_H = 220;
const CARD_GAP = 32;
const STEP = CARD_H + CARD_GAP;
const VISIBLE = 5; // odd number — center is always index Math.floor(VISIBLE/2)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function smoothstep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function CardItem({
  card,
  offset, // distance from center in "slots" — 0 = center
}: {
  card: (typeof CARDS)[number];
  offset: number;
}) {
  const abs = Math.abs(offset);
  const focus = smoothstep(1 - abs / 1.15);
  const scale = Math.max(0.58, 1 - abs * 0.13);
  const zIndex = 1000 - Math.round(abs * 100);
  const numberSize = lerp(40, 52, focus);
  const borderAlpha = lerp(0.12, 0.35, focus);
  const dotAlpha = lerp(0.2, 0.8, focus);
  const subOpacity = focus;
  const subLift = lerp(6, 0, focus);
  const depthShadow = lerp(12, 48, focus);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 340,
        height: CARD_H,
        transform: `translate(-50%, calc(-50% + ${offset * STEP}px)) scale(${scale})`,
        zIndex,
        willChange: "transform",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: "rgb(var(--color-dark-rgb))",
          border: `1px solid rgba(var(--color-light-rgb),${borderAlpha * 0.18})`,
          boxShadow: `0 ${depthShadow}px ${depthShadow * 2}px rgba(var(--color-dark-rgb),0.28), 0 ${
            depthShadow * 0.33
          }px ${depthShadow * 0.83}px rgba(var(--color-dark-rgb),0.18), inset 0 1px 0 rgba(var(--color-light-rgb),0.1)`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.055,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }}
        />

        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "28px 32px",
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: numberSize,
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "rgb(var(--color-light-rgb))",
              }}
            >
              {card.number}
            </span>
            <span
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgb(var(--color-light-rgb))",
                marginTop: 4,
              }}
            >
              Vibe Coding Club
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(var(--color-light-rgb),0.16)",
              width: "100%",
            }}
          />

          {/* Bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgb(var(--color-light-rgb))",
                  margin: 0,
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgb(var(--color-light-rgb))",
                  margin: "6px 0 0",
                  letterSpacing: "0.04em",
                  opacity: subOpacity,
                  transform: `translateY(${subLift}px)`,
                }}
              >
                {card.sub}
              </p>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: `rgba(var(--color-accent-rgb),${dotAlpha * 0.85})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function VerticalCardScroller() {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };
    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    let previousTime = performance.now();

    const tick = (time: number) => {
      const deltaMs = time - previousTime;
      previousTime = time;
      const delta = Math.min(deltaMs, 32);

      const autoStepPerMs = reducedMotionRef.current ? 0 : 1 / 2600;
      targetRef.current += autoStepPerMs * delta;

      positionRef.current = lerp(positionRef.current, targetRef.current, 0.12);
      setPosition(positionRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Render absolute track slots around the current center. Content never remaps
  // on an in-view card; new cards are only created at the far edges.
  const centerSlot = Math.floor(position);
  const renderRange = Math.floor(VISIBLE / 2) + 2;
  const visibilityRange = Math.floor(VISIBLE / 2) + 1.6;

  const slots = Array.from({ length: renderRange * 2 + 1 }, (_, i) => {
    const slot = centerSlot - renderRange + i;
    const offset = slot - position;
    const cardIndex = mod(slot, CARDS.length);

    return {
      slot,
      offset,
      card: CARDS[cardIndex],
    };
  })
    .filter((entry) => Math.abs(entry.offset) <= visibilityRange)
    .sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset));

  const nearestIndex = mod(Math.round(position), CARDS.length);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "default",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* Fade masks — top and bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(var(--color-light-rgb),1) 0%, transparent 22%, transparent 78%, rgba(var(--color-light-rgb),1) 100%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Cards */}
      {slots.map(({ slot, offset, card }) => (
        <CardItem key={slot} card={card} offset={offset} />
      ))}

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.4,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {CARDS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === nearestIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: "rgba(var(--color-dark-rgb),0.8)",
                transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsTeaser() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <section
        id="projects"
        className="relative w-full overflow-hidden rounded-md bg-neutral-50 scroll-mt-24"
      >
        <div className="px-4 py-12 sm:px-6">
          <div className="max-w-xl">
            <p className="section-kicker">Projects / Coming Soon</p>
            <h2 className="section-title max-w-lg">
            Future projects will be featured here.
            </h2>
            <p className="section-intro mt-6 max-w-lg">
              We are curating a live showcase of the club&apos;s strongest
              work. Five projects will be featured here next, and one slot may
              be yours.
            </p>
          </div>

          <article
            className="relative mt-8 overflow-hidden rounded-2xl border border-white/20 px-5 py-5"
            style={{
              background: "rgb(var(--color-dark-rgb))",
              boxShadow:
                "0 16px 40px rgba(var(--color-dark-rgb),0.26), inset 0 1px 0 rgba(var(--color-light-rgb),0.1)",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "150px",
              }}
            />

            <div className="relative flex items-start justify-between">
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                {TEMP_MOBILE_CARD.badge}
              </span>
              <span className="pt-1 text-[10px] uppercase tracking-[0.2em] !text-white">
                Vibe Coding Club
              </span>
            </div>

            <div className="relative mt-4 h-px bg-white/20" />

            <div className="relative mt-4">
              <p className="m-0 text-[10px] uppercase tracking-[0.18em] !text-white">
                Featured Slot
              </p>
              <h3 className="mt-1 text-xl font-light tracking-tight !text-white">
                {TEMP_MOBILE_CARD.title}
              </h3>
              <p className="mt-2 text-sm tracking-[0.01em] !text-white">
                {TEMP_MOBILE_CARD.sub}
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative h-full min-h-screen w-full rounded-md overflow-hidden bg-neutral-50 scroll-mt-24"
    >
      <div className="relative grid h-full min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left — text */}
        <div className="flex items-center border-b border-neutral-200/80 px-4 py-16 sm:px-6 md:border-b-0 md:px-10">
          <div className="max-w-xl">
            <p className="section-kicker">Projects / Coming Soon</p>
            <h2 className="section-title max-w-lg">
            Future projects will be featured here.
            </h2>
            <p className="section-intro mt-6 max-w-lg">
              We are curating a live showcase of the club&apos;s strongest work.
              Five projects will be featured here next, and one slot may be yours.
            </p>
            <p className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-neutral-700">
            </p>
          </div>
        </div>

        {/* Right — vertical card scroller */}
        <div className="relative h-[70vh] md:h-full md:min-h-screen">
          <VerticalCardScroller />
        </div>
      </div>
    </section>
  );
}
