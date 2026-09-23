"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion } from "motion/react";
import { partnerProjects, partnerProjectsTerm } from "@/lib/constants";

type PartnerProject = (typeof partnerProjects)[number];

const STATUS = "Kicking off";
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const DARK_CARD = {
  background: "rgb(var(--color-dark-rgb))",
  boxShadow:
    "0 16px 40px rgba(var(--color-dark-rgb),0.22), inset 0 1px 0 rgba(var(--color-light-rgb),0.08)",
};
const INTRO =
  "Student teams are building custom tools, at no cost, for nonprofits in San Luis Obispo and Ventura counties. Three builds are kicking off this fall.";

function slotNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smoothstep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

/* ─── Shared pieces ─── */

function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.055]"
      style={{ backgroundImage: GRAIN, backgroundSize: "160px" }}
    />
  );
}

/* Mint only ever sits on the dark ink, never on a light ground. */
function StatusPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "rgb(var(--color-accent-rgb))" }}
      />
      {STATUS}
    </span>
  );
}

function Tags({
  tags,
  tone,
}: {
  tags: readonly string[];
  tone: "dark" | "light";
}) {
  return (
    <div className="relative flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={
            tone === "dark"
              ? "rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] tracking-wide text-white/75"
              : "rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[11px] tracking-wide text-neutral-600"
          }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* Full card with the description: phones and tablets. */
function PartnerCard({
  project,
  index,
}: {
  project: PartnerProject;
  index: number;
}) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7"
      style={DARK_CARD}
    >
      <Grain />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-700 to-brand-400 transition-transform duration-700 group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-4xl font-light leading-none tracking-[-0.03em] text-white">
          {slotNumber(index)}
        </span>
        <StatusPill />
      </div>

      <div className="relative my-5 h-px bg-white/15" />

      <span className="relative mb-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
        {project.partner}
      </span>
      <h3 className="relative mb-4 !text-2xl !leading-tight !text-white">
        {project.title}
      </h3>
      <p className="relative mb-6 flex-1 !text-sm !font-medium !leading-relaxed !text-white/70">
        {project.description}
      </p>
      <Tags tags={project.tags} tone="dark" />
    </article>
  );
}

function PhoneStack() {
  return (
    <div className="mt-8 grid gap-4">
      {partnerProjects.map((project, index) => (
        <PartnerCard key={project.partner} project={project} index={index} />
      ))}
    </div>
  );
}

/* ─── Rotating spotlight ───
   All three partners are always listed; the spotlight rotates between them
   every DWELL_MS, expanding one description at a time while the card deck on
   the right turns to match. Hovering or focusing the section pauses it, it
   only runs while on screen, and reduced-motion users get a static list they
   step through themselves. */

const DWELL_MS = 6500;
/* Front card half-height (118) + a back card's scaled half-height (99) + a
   24px gap, so the stacked cards never overlap. */
const DECK_STEP = 241;

function DeckCard({
  project,
  index,
  offset,
}: {
  project: PartnerProject;
  index: number;
  offset: number;
}) {
  const distance = Math.abs(offset);
  const focus = smoothstep(1 - distance / 1.1);
  const scale = Math.max(0.74, 1 - distance * 0.16);
  const edgeFade = distance <= 1 ? 1 : clamp((1.55 - distance) / 0.55, 0, 1);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: "min(380px, calc(100% - 32px))",
        height: 236,
        transform: `translate(-50%, calc(-50% + ${offset * DECK_STEP}px)) scale(${scale})`,
        zIndex: 1000 - Math.round(distance * 100),
        opacity: lerp(0.5, 1, focus) * edgeFade,
        willChange: "transform, opacity",
      }}
    >
      <div
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 px-8 py-7"
        style={{
          ...DARK_CARD,
          boxShadow: `0 ${lerp(12, 44, focus)}px ${lerp(24, 88, focus)}px rgba(var(--color-dark-rgb),0.28), inset 0 1px 0 rgba(var(--color-light-rgb),0.1)`,
        }}
      >
        <Grain />
        <div className="relative flex items-start justify-between">
          <span
            className="font-mono font-light leading-none tracking-[-0.03em] text-white"
            style={{ fontSize: lerp(38, 50, focus) }}
          >
            {slotNumber(index)}
          </span>
          <StatusPill />
        </div>
        <div className="relative h-px bg-white/15" />
        <div className="relative">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">
            {project.partner}
          </span>
          <span className="mt-1.5 block text-xl leading-tight tracking-[-0.04em] text-white [font-family:var(--font-display)]">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PartnerSpotlight({ id = "projects" }: { id?: string }) {
  const count = partnerProjects.length;
  const [frame, setFrame] = useState({ position: 0, target: 0, progress: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const targetRef = useRef(0);
  const positionRef = useRef(0);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedRef.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let previous = performance.now();
    let raf = 0;
    let last = { position: 0, target: 0, progress: 0 };

    const tick = (time: number) => {
      const delta = Math.min(time - previous, 64);
      previous = time;

      const rotating =
        inViewRef.current && !pausedRef.current && !reducedRef.current;
      if (rotating) {
        elapsedRef.current += delta;
        if (elapsedRef.current >= DWELL_MS) {
          elapsedRef.current = 0;
          targetRef.current += 1;
        }
      }

      positionRef.current = reducedRef.current
        ? targetRef.current
        : lerp(positionRef.current, targetRef.current, 0.075);

      const next = {
        position: positionRef.current,
        target: targetRef.current,
        progress: elapsedRef.current / DWELL_MS,
      };
      // Settled and idle: skip the re-render.
      if (
        inViewRef.current &&
        (next.target !== last.target ||
          Math.abs(next.position - last.position) > 0.0005 ||
          Math.abs(next.progress - last.progress) > 0.002)
      ) {
        last = next;
        setFrame(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Turn the deck the short way round to the chosen partner. */
  const select = useCallback(
    (index: number) => {
      const current = targetRef.current;
      const forward = mod(index - current, count);
      const step = forward > count / 2 ? forward - count : forward;
      targetRef.current = current + step;
      elapsedRef.current = 0;
      setFrame((previous) => ({
        ...previous,
        target: targetRef.current,
        progress: 0,
      }));
    },
    [count],
  );

  const active = mod(frame.target, count);

  const handleTabKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = mod(moves[event.key], count);
    select(next);
    tabRefs.current[next]?.focus();
  };

  const centerSlot = Math.round(frame.position);
  const deck = [-2, -1, 0, 1, 2]
    .map((shift) => {
      const slot = centerSlot + shift;
      return { slot, offset: slot - frame.position, index: mod(slot, count) };
    })
    .filter(({ offset }) => Math.abs(offset) < 1.55)
    .sort((a, b) => Math.abs(b.offset) - Math.abs(a.offset));

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full scroll-mt-24 overflow-hidden rounded-md bg-neutral-50"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      {/* Phones and tablets: every partner stacked, nothing hidden behind a
          rotation. Below lg the headline and a 380px deck can't share a row.
          The top padding clears the floating menu bar, as on desktop. */}
      <div className="px-4 pb-12 pt-24 sm:px-6 md:px-10 md:pb-16 md:pt-28 lg:hidden">
        <p className="section-kicker">
          Nonprofit Partners / {partnerProjectsTerm}
        </p>
        <h2 className="section-title max-w-lg">
          Free software for local nonprofits.
        </h2>
        <p className="section-intro mt-6 max-w-lg">{INTRO}</p>
        <PhoneStack />
      </div>

      <div className="relative hidden min-h-[760px] grid-cols-2 lg:grid">
        {/* pt-28 clears the sticky nav: the Projects link scrolls this
            section flush to the top of the viewport. */}
        <div className="flex items-center px-10 pb-16 pt-28">
          <div className="w-full max-w-xl">
            <p className="section-kicker">
              Nonprofit Partners / {partnerProjectsTerm}
            </p>
            <h2 className="section-title max-w-lg">
              Free software for local nonprofits.
            </h2>
            <p className="section-intro mt-6 max-w-lg">{INTRO}</p>

            <div
              role="tablist"
              aria-label="Nonprofit partner projects"
              aria-orientation="vertical"
              onKeyDown={handleTabKeys}
              className="mt-10 border-t border-neutral-200"
            >
              {partnerProjects.map((project, index) => {
                const selected = index === active;
                return (
                  <div key={project.partner}>
                    <button
                      ref={(node) => {
                        tabRefs.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`${id}-tab-${index}`}
                      aria-selected={selected}
                      aria-controls={`${id}-panel-${index}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(index)}
                      className="flex w-full items-baseline gap-4 py-4 text-left"
                    >
                      <span
                        className={`font-mono text-xs transition-colors duration-300 ${
                          selected ? "text-neutral-900" : "text-neutral-400"
                        }`}
                      >
                        {slotNumber(index)}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                            selected ? "text-neutral-700" : "text-neutral-400"
                          }`}
                        >
                          {project.partner}
                        </span>
                        <span
                          className={`mt-1 block text-lg leading-snug tracking-[-0.04em] transition-colors duration-300 [font-family:var(--font-display)] ${
                            selected ? "text-neutral-950" : "text-neutral-500"
                          }`}
                        >
                          {project.title}
                        </span>
                      </span>
                    </button>

                    <motion.div
                      role="tabpanel"
                      id={`${id}-panel-${index}`}
                      aria-labelledby={`${id}-tab-${index}`}
                      aria-hidden={!selected}
                      initial={false}
                      animate={{
                        height: selected ? "auto" : 0,
                        opacity: selected ? 1 : 0,
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-9">
                        <p className="mb-4 !text-sm !font-medium !leading-relaxed !text-neutral-700">
                          {project.description}
                        </p>
                        <Tags tags={project.tags} tone="light" />
                      </div>
                    </motion.div>

                    {/* Row rule doubles as the dwell timer for the active row. */}
                    <div className="relative h-px bg-neutral-200">
                      <div
                        className="absolute inset-y-0 left-0 w-full origin-left bg-neutral-900"
                        style={{
                          transform: `scaleX(${selected ? frame.progress : 0})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The deck repeats what the list says, so it is hidden from screen readers. */}
        <div aria-hidden="true" className="relative">
          {deck.map(({ slot, offset, index }) => (
            <DeckCard
              key={slot}
              project={partnerProjects[index]}
              index={index}
              offset={offset}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1100] h-16 bg-gradient-to-b from-neutral-50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1100] h-16 bg-gradient-to-t from-neutral-50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
