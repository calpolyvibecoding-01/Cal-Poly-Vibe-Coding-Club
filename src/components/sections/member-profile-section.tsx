"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { TextScramble } from "@/components/ui/text-scramble";

const standoutFeatures = [
  {
    number: "01",
    title: "A new member to the world of AI ",
    copy: "Learn fast through guided builds.",
  },
  {
    number: "02",
    title: "Looking to set themselves apart",
    copy: "Ship portfolio work that gets noticed.",
  },
  {
    number: "03",
    title: "Striving for AI proffeicniy",
    copy: "Grow with peers who keep you moving.",
  },
] as const;

interface HoverCardProps {
  children: ReactNode;
  className: string;
  initial: { opacity: number; x?: number; y?: number };
  delay?: number;
}

function HoverCard({
  children,
  className,
  initial,
  delay = 0,
}: HoverCardProps) {
  return (
    <motion.article
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative overflow-hidden transition-shadow duration-300 will-change-transform ${className}`}
    >
      {children}
    </motion.article>
  );
}

export function MemberProfileSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-16 scroll-mt-24 pt-14 md:mb-20 md:pt-20"
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr] lg:items-stretch">
        <HoverCard
          initial={{ opacity: 0, x: -16 }}
          className="h-full rounded-2xl border border-zinc-200/80 bg-white/75 p-6 backdrop-blur-[1px] md:p-7"
        >
          <div className="flex h-full flex-col">
            <h2 className="section-title text-4xl leading-[1.02] md:text-5xl">
              Who is a vibe coding club member?
            </h2>

            <div className="mt-7 rounded-xl border border-brand-200/80 bg-white/80 p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-brand-300/80 bg-brand-100/55">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-700">
                    ANON
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Anonymous Profile
                  </p>
                  <p className="mt-1 text-lg tracking-tight text-black/85 md:text-xl">
                    Future Builder
                  </p>
                </div>
              </div>

              <p className="mt-4 text-lg leading-snug text-black/70">
                New to AI. Wants to build projects that stand out.
              </p>
            </div>
          </div>
        </HoverCard>

        <div className="grid gap-4">
          {standoutFeatures.map((feature, index) => (
            <HoverCard
              key={feature.number}
              initial={{ opacity: 0, y: 18 }}
              delay={0.08 + index * 0.08}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_14px_30px_rgba(13,29,48,0.07)] md:min-h-[172px]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {feature.number}
              </p>
              <h3 className="mt-2 text-2xl leading-tight tracking-tight text-black md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-lg leading-snug text-black/70">
                {feature.copy}
              </p>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-zinc-900/85"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.22 + index * 0.08 }}
                viewport={{ once: true, amount: 0.9 }}
              />
            </HoverCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
