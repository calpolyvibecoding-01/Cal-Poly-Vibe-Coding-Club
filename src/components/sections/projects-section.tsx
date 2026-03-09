"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { AdaptiveImage } from "@/components/ui/adaptive-image";
import { projects } from "@/lib/constants";

/* ─── Shared animation config ─── */
const STAGGER_EASING = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING_CONFIG = { damping: 25, stiffness: 200 };

/* ─── Featured (Hero) Card ─── */
function FeaturedCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  /* Parallax float — image shifts opposite to cursor */
  const imgX = useTransform(smoothX, [0, 1], [12, -12]);
  const imgY = useTransform(smoothY, [0, 1], [8, -8]);

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((event.clientX - rect.left) / rect.width);
      mouseY.set((event.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  /* Radial spotlight glow */
  const glowBg = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.12), transparent 60%)`,
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2, ease: STAGGER_EASING }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-soft transition-shadow duration-700 hover:shadow-2xl"
    >
      {/* Image — tall cinematic hero */}
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2/1]">
        <motion.div
          className="absolute inset-[-16px]"
          style={{ x: imgX, y: imgY }}
        >
          <AdaptiveImage
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />
        </motion.div>

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        {/* Radial spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />

        {/* Top accent bar */}
        <div
          className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${project.accent} transition-transform duration-700 group-hover:scale-x-100`}
        />

        {/* Year badge */}
        <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-zinc-900/70 px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
          {project.year}
        </span>

        {/* Overlaid content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10">
          {/* Category kicker */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.accent}`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
              {project.category}
            </span>
          </div>

          {/* Large title */}
          <h3 className="mb-4 text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {project.title}
          </h3>

          {/* Description — visible, fades up further on hover */}
          <p className="mb-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1 text-[11px] tracking-wide text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links row */}
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-white/90">
              <Github className="h-4 w-4" />
              Source
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-white/90">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </span>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", ...SPRING_CONFIG, delay: 0.6 }}
              viewport={{ once: true }}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 opacity-0 transition-all duration-500 group-hover:opacity-100"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Secondary project card ─── */
function SecondaryCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      });
    },
    [],
  );

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: index * 0.15,
        ease: STAGGER_EASING,
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <AdaptiveImage
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* Radial spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.1), transparent 60%)`,
            }}
          />

          {/* Top accent bar */}
          <div
            className={`absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${project.accent} transition-transform duration-600 group-hover:scale-x-100`}
          />

          {/* Overlaid badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full border border-white/10 bg-zinc-900/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/80">
              {project.year}
            </span>
            <span className="rounded-full border border-white/10 bg-zinc-900/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80">
              {project.category}
            </span>
          </div>

          {/* Arrow reveal */}
          <div className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-zinc-900/60 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          </div>

          {/* Overlaid title + text */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h4 className="mb-1.5 text-2xl tracking-tight text-white md:text-3xl">
              {project.title}
            </h4>
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/60">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-zinc-900/50 px-2 py-0.5 text-[10px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── "This could be you" CTA ─── */
function ThisCouldBeYouCard({ index }: { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: index * 0.15,
        ease: STAGGER_EASING,
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-500 hover:border-zinc-300 hover:shadow-xl">
        <div className="relative z-10">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            <Sparkles className="h-3 w-3" />
            Open Slot
          </span>

          <h4 className="mb-2 text-2xl tracking-tight text-black">
            This could be you
          </h4>
          <p className="mb-5 text-sm leading-relaxed text-black/70">
            Ship your idea with the club, get real feedback, and turn it into
            our next featured build.
          </p>

          <div className="flex flex-wrap gap-1.5">
            {["Your Idea", "Your Stack", "Your Team"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] tracking-wide text-black/65"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─── */
export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const moreProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section relative scroll-mt-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="section-header relative z-10"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">What we&apos;ve built</p>
            <h2 className="section-title">Endless Possibilities</h2>
          </div>
          <p className="section-intro max-w-md text-right">
            Learn to harness AI to create amazing projects
          </p>
        </div>

        <div className="section-rule">
          <motion.div
            className="absolute left-0 top-0 h-full bg-zinc-900"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, ease: STAGGER_EASING }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>

      {/* Featured projects — full-bleed cinematic hero cards */}
      <div className="relative z-10 mb-14 space-y-10">
        {featuredProjects.map((project, index) => (
          <FeaturedCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Secondary projects grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <p className="section-kicker mb-6 text-black/55">
          More from the club
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, index) => (
            <SecondaryCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
          <ThisCouldBeYouCard index={moreProjects.length} />
        </div>
      </motion.div>
    </section>
  );
}
