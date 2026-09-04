"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  Calendar,
  Code2,
  Lightbulb,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { activities, siteConfig } from "@/lib/constants";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { MemberProfileSection } from "@/components/sections/member-profile-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ProjectsTeaser } from "@/components/sections/projects-teaser";
import { Marquee } from "@/components/ui/marquee";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";
import { TiltCard } from "@/components/ui/tilt-card";
import { smoothScrollToHash } from "@/lib/utils";

const iconMap = {
  code2: Code2,
  sparkles: Sparkles,
  users: Users,
  lightbulb: Lightbulb,
} as const;

interface InfoSectionProps {
  onJoinSlackClick?: () => void;
}

export function InfoSection({ onJoinSlackClick }: InfoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-0"
    >
      <div
        className="absolute inset-0 bg-[size:64px_64px] opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--color-dark-rgb),0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--color-dark-rgb),0.02) 1px, transparent 1px)",
        }}
      />


      <div className="container relative z-10 pb-14 pt-0 md:pb-20">
        <MemberProfileSection />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-header scroll-mt-24"
        >
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="section-kicker">What we believe</p>
            <h2 className="section-title">Our Mission</h2>
          </div>
          <p className="section-intro max-w-lg leading-relaxed md:text-right">
            Bring students of every background together to build with AI, learning
            from peers and the people already shaping the industry, so every member
            walks away with a portfolio of real projects and the confidence to
            build whatever comes next.
          </p>
        </div>

          <div className="section-rule">
            <motion.div
              className="absolute left-0 top-0 h-full bg-zinc-900"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        <div
          id="activities"
          className="mb-20 grid gap-6 scroll-mt-24 md:grid-cols-2"
        >
          {activities.map((activity, index) => {
            const ActivityIcon = iconMap[activity.icon];

            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard glowColor={activity.glowColor}>
                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-zinc-200 bg-white transition-transform group-hover:scale-105">
                      <ActivityIcon className="h-7 w-7 text-black" />
                    </div>
                    <h3 className="mb-4 text-2xl text-black">
                      {activity.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-black/75">
                      {activity.description}
                    </p>
                    {"schedule" in activity && activity.schedule ? (
                      <div className="flex items-center gap-2 text-black/80">
                        <Calendar className="h-5 w-5" />
                        <span>{activity.schedule}</span>
                      </div>
                    ) : null}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <ProjectsTeaser />

        {/* ============================================================
            PROJECTS SECTION — PRESERVED FOR FUTURE USE
            Uncomment and replace <ProjectsTeaser /> when ready to launch
            ============================================================ */}
        {/* <ProjectsSection /> */}

        <LeadershipSection />

        <Marquee />

        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950 p-8 shadow-2xl md:p-12"
        >
          <div className="relative z-10">
            <h3 className="mb-8 text-3xl leading-tight tracking-tight !text-zinc-100 md:text-5xl">
              Ready to learn a new skill?
            </h3>

            <div className="mb-10 grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-xs uppercase tracking-[0.24em] text-zinc-400">
                  Location
                </h4>
                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="leading-relaxed">
                    {siteConfig.location[0]}
                    <br />
                    {siteConfig.location[1]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="mb-3 text-xs uppercase tracking-[0.24em] text-zinc-400">
                  Contact
                </h4>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>{siteConfig.email}</span>
                </div>
                {/*
                <h4 className="mb-3 mt-10 text-xs uppercase tracking-[0.24em] text-zinc-400">
                  Business Inquiries
                </h4>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>{siteConfig.email}</span>
                </div>
               */}
              </div>
            </div>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
              We welcome developers of all skill levels. Whether you&apos;re
              just starting out or have years of experience, there&apos;s a
              place for you here.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                onClick={onJoinSlackClick}
                className="btn group flex cursor-pointer items-center gap-2 bg-white text-zinc-900 shadow-lg transition-colors hover:bg-zinc-100"
              >
                <span>Join Our Slack</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-zinc-400"
        >
          <p className="text-base md:text-lg">
            <TextScramble text="© 2026 Cal Poly Vibe Coding Club — California Polytechnic State University, San Luis Obispo" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
