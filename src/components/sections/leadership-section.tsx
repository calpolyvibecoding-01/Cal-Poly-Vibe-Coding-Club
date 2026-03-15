"use client";

import {
  type CSSProperties,
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { AdaptiveImage } from "@/components/ui/adaptive-image";
import {
  leadershipMembers,
  openLeadershipRoles,
  siteConfig,
} from "@/lib/constants";
import { useMediaQuery } from "@/lib/use-media-query";

/* Staggered vertical offsets — keeps the scattered visual rhythm */
const staggerOffsets = [
  "lg:-mt-2",
  "lg:mt-4",
  "lg:-mt-1",
  "lg:mt-3",
  "lg:-mt-2",
  "lg:mt-2",
  "lg:-mt-1",
  "lg:mt-3",
] as const;

/* ─── Compact portrait card ─── */
function LeaderCard({
  leader,
  index,
  disableAnimation = false,
}: {
  leader: (typeof leadershipMembers)[number];
  index: number;
  disableAnimation?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (disableAnimation) {
        return;
      }

      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      });
    },
    [disableAnimation]
  );

  return (
    <motion.a
      ref={cardRef}
      href={leader.linkedin}
      target="_blank"
      rel="noreferrer"
      aria-label={`${leader.name} LinkedIn profile`}
      initial={disableAnimation ? false : { opacity: 0, y: 40 }}
      animate={disableAnimation ? { opacity: 1, y: 0 } : undefined}
      whileInView={disableAnimation ? undefined : { opacity: 1, y: 0 }}
      transition={
        disableAnimation
          ? undefined
          : {
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
      }
      viewport={disableAnimation ? undefined : { once: true }}
      onMouseEnter={disableAnimation ? undefined : () => setHovered(true)}
      onMouseLeave={disableAnimation ? undefined : () => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer"
      style={
        {
          "--leader-hover-hue": `${leader.hoverHueShift}deg`,
          "--leader-hover-glow": leader.hoverGlow,
          "--leader-float-delay": `${index * 120}ms`,
        } as CSSProperties
      }
    >
      <motion.div
        style={
          {
            animationName: disableAnimation ? "none" : "leader-card-float",
            animationDuration: "3.8s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: "var(--leader-float-delay)",
            animationPlayState: hovered ? "paused" : "running",
          } as CSSProperties
        }
        className={`relative overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 will-change-transform ${
          disableAnimation
            ? ""
            : "transition-[border-color,box-shadow] duration-500 group-hover:border-zinc-300 group-hover:shadow-[0_24px_40px_-24px_var(--leader-hover-glow)]"
        }`}
      >
        {/* Mouse-tracking spotlight */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 ${
            disableAnimation
              ? "opacity-0"
              : "opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          }`}
          style={{
            background: hovered
              ? `radial-gradient(200px circle at ${mousePos.x * 100}% ${
                  mousePos.y * 100
                }%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(220px circle at 50% 110%, var(--leader-hover-glow), transparent 65%)`
              : "none",
          }}
        />

        {/* Portrait image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <AdaptiveImage
            src={leader.image}
            alt={leader.name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1280px) 25vw, 12.5vw"
            className={`h-full w-full object-cover ${
              disableAnimation
                ? "grayscale-0"
                : "grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            }`}
          />

          {/* Flat matte overlay on mobile; gradient restored on larger screens */}
          <div className="absolute inset-0 bg-zinc-950/55 sm:bg-gradient-to-t sm:from-zinc-950/90 sm:via-zinc-950/30 sm:to-transparent" />

          {/* Top accent bar */}
          <div
            className={`absolute left-0 right-0 top-0 h-0.5 origin-left bg-gradient-to-r ${
              leader.accent
            } ${
              disableAnimation
                ? "scale-x-100"
                : "scale-x-0 transition-[transform,filter] duration-700 group-hover:scale-x-100 group-hover:[filter:hue-rotate(var(--leader-hover-hue))]"
            }`}
          />

          {/* LinkedIn icon — slides in on hover */}
          <div
            className={`absolute left-2 top-2 z-20 flex gap-1.5 sm:left-3 sm:top-3 ${
              disableAnimation
                ? "translate-x-0 opacity-100"
                : "-translate-x-5 opacity-0 transition-all delay-100 duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-zinc-900/60 transition-colors hover:bg-zinc-800/80 sm:h-7 sm:w-7">
              <Linkedin className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" />
            </span>
          </div>

          {/* Name, role, tagline overlaid */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-3">
            <div className="mb-1 inline-flex items-center gap-1">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${leader.accent} transition-[filter] duration-700 group-hover:[filter:hue-rotate(var(--leader-hover-hue))]`}
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-300 sm:text-[9px] sm:tracking-[0.2em]">
                {leader.role}
              </span>
            </div>
            <h4 className="mb-0 text-sm tracking-tight text-white sm:mb-0.5 sm:text-base">
              {leader.name}
            </h4>
            <p className="hidden max-h-0 overflow-hidden text-[11px] leading-snug text-zinc-400 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100 sm:block">
              {leader.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

function OpenRoleCard({
  role,
  index,
  disableAnimation = false,
}: {
  role: (typeof openLeadershipRoles)[number];
  index: number;
  disableAnimation?: boolean;
}) {
  const roleNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={siteConfig.applicationForm}
      target="_blank"
      rel="noreferrer"
      aria-label={`Apply for ${role.title}`}
      initial={disableAnimation ? false : { opacity: 0, y: 24 }}
      animate={disableAnimation ? { opacity: 1, y: 0 } : undefined}
      whileInView={disableAnimation ? undefined : { opacity: 1, y: 0 }}
      whileHover={disableAnimation ? undefined : { y: -3 }}
      transition={
        disableAnimation
          ? undefined
          : {
              duration: 0.35,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
      }
      viewport={disableAnimation ? undefined : { once: true }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-[2px] transition-[border-color,box-shadow,background-color] duration-300 hover:border-zinc-300 hover:bg-white hover:shadow-[0_14px_32px_-28px_rgba(var(--color-dark-rgb),0.65)]"
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Actively Recruiting
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          {roleNumber}
        </span>
      </div>
      <h3 className="text-lg leading-tight text-zinc-900 sm:text-xl">
        {role.title}
      </h3>
      <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        <span className="h-px w-8 bg-zinc-300 transition-all duration-300 group-hover:w-10 group-hover:bg-zinc-500" />
        <span className="transition-colors group-hover:text-zinc-900 group-hover:underline">
          Apply Here
        </span>
      </div>
    </motion.a>
  );
}

/* ─── Main Section ─── */
export function LeadershipSection() {
  const disableCardAnimations = useMediaQuery("(max-width: 767px)");

  return (
    <section id="leadership" className="scroll-mt-24 py-10 md:py-14">
      {/* Section header — compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-8 md:mb-10"
      >
        <div className="mb-5">
          <p className="section-kicker">Who runs the club</p>
          <h2 className="section-title">Leadership</h2>
        </div>

        <div className="section-rule">
          <motion.div
            className="absolute left-0 top-0 h-full bg-zinc-900"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>

      {/* Mobile: vertical stack list */}
      <div className="divide-y divide-zinc-200 md:hidden mb-20">
        {leadershipMembers.map((leader) => (
          <a
            key={leader.name}
            href={leader.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${leader.name} LinkedIn profile`}
            className="group flex items-center justify-between gap-3 py-3"
          >
            <div className="min-w-0">
              <h4 className="truncate text-base tracking-tight text-zinc-900">
                {leader.name}
              </h4>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                {leader.role}
              </p>
            </div>
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors group-hover:border-zinc-400 group-hover:text-zinc-900">
              <Linkedin className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>

      {/* Tablet/Desktop: portrait cards */}
      <div className="hidden gap-4 md:grid md:grid-cols-4 lg:grid-cols-8">
        {leadershipMembers.map((leader, index) => (
          <div
            key={leader.name}
            className={staggerOffsets[index % staggerOffsets.length]}
          >
            <LeaderCard
              leader={leader}
              index={index}
              disableAnimation={disableCardAnimations}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 mb-6">
        {openLeadershipRoles.map((role, index) => (
          <OpenRoleCard
            key={role.title}
            role={role}
            index={index}
            disableAnimation={disableCardAnimations}
          />
        ))}
      </div>
    </section>
  );
}
