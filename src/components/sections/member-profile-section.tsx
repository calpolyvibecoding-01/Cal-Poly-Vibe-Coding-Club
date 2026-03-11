"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserRound } from "lucide-react";

const standoutFeatures = [
  {
    number: "",
    title: "Curious About AI",
    copy: "Looking for a clear place to start.",
  },
  {
    number: "",
    title: "Looking To Stand Out In Their Career",
    copy: "Use AI projects and knowlage to stand out to recruiters.",
  },
  {
    number: "",
    title: "Looking For A Community Of Forward Thinkers",
    copy: "Join a group of driven, ready to learn people.",
  },
] as const;

const ENDING_LINE_ONE = "No matter your skill,";
const ENDING_LINE_TWO = "Vibe Coding Club is for you.";

interface HoverCardProps {
  children: ReactNode;
  className: string;
  cardRef?: (element: HTMLElement | null) => void;
}

function HoverCard({ children, className, cardRef }: HoverCardProps) {
  return (
    <article
      ref={cardRef}
      className={`relative overflow-hidden transition-[transform,box-shadow] duration-300 will-change-transform ${className}`}
    >
      {children}
    </article>
  );
}

gsap.registerPlugin(ScrollTrigger);

export function MemberProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const railDotRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const endingTextRef = useRef<HTMLDivElement>(null);
  const endingLineOneRef = useRef<HTMLSpanElement>(null);
  const endingLineTwoRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    const section = sectionRef.current;
    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;
    const railFill = railFillRef.current;
    const railDot = railDotRef.current;
    const icon = iconRef.current;
    const endingText = endingTextRef.current;
    const endingLineOne = endingLineOneRef.current;
    const endingLineTwo = endingLineTwoRef.current;
    const cards = cardRefs.current.filter(
      (card): card is HTMLElement => card !== null
    );

    if (
      !section ||
      !leftColumn ||
      !rightColumn ||
      !railFill ||
      !railDot ||
      !icon ||
      !endingText ||
      !endingLineOne ||
      !endingLineTwo ||
      cards.length !== standoutFeatures.length
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const railStartPercent = 4;
      const railEndPercent = 96;
      const railRangePercent = railEndPercent - railStartPercent;
      const railStartAt = 0.08;
      const railEndAt = 0.82;
      const cardTwoBeat = 0.42;
      const cardThreeBeat = 0.68;
      const endingBeat = 0.84;
      const storySpeedMultiplier = 1.6;
      const endingCharsTotal = ENDING_LINE_ONE.length + ENDING_LINE_TWO.length;
      const endingState = { chars: 0 };
      let endingStarted = false;

      const setTypedEnding = (typedChars: number) => {
        const clampedChars = gsap.utils.clamp(0, endingCharsTotal, typedChars);
        const firstLineChars = Math.min(clampedChars, ENDING_LINE_ONE.length);
        const secondLineChars = Math.max(
          0,
          clampedChars - ENDING_LINE_ONE.length
        );

        endingLineOne.textContent = ENDING_LINE_ONE.slice(0, firstLineChars);
        endingLineTwo.textContent = ENDING_LINE_TWO.slice(0, secondLineChars);
      };

      const playEndingTypeReveal = () => {
        if (endingStarted) {
          return;
        }

        endingStarted = true;

        gsap
          .timeline()
          .to(endingText, {
            autoAlpha: 1,
            y: 0,
            duration: 0.16,
            ease: "power2.out",
          })
          .to(
            endingState,
            {
              chars: endingCharsTotal,
              duration: 1.15,
              ease: "none",
              onUpdate: () => {
                setTypedEnding(Math.round(endingState.chars));
              },
            },
            "<+=0.02"
          );
      };

      gsap.set(leftColumn, { autoAlpha: 0, y: 26 });
      gsap.set(rightColumn, { autoAlpha: 0, y: 24 });
      gsap.set(icon, { y: 10, rotate: -6 });
      gsap.set(cards, { autoAlpha: 0, y: 20, scale: 0.97 });
      gsap.set(endingText, { autoAlpha: 0, y: 26 });
      setTypedEnding(0);
      gsap.set(railFill, { scaleY: 0.06, transformOrigin: "top center" });
      gsap.set(railDot, { top: "4%" });

      const updateRail = (progress: number) => {
        const railProgress = gsap.utils.clamp(
          0,
          1,
          (progress - railStartAt) / (railEndAt - railStartAt)
        );
        const dotTopPercent =
          railStartPercent + railRangePercent * railProgress;
        gsap.set(railFill, { scaleY: 0.06 + railProgress * 0.94 });
        gsap.set(railDot, { top: `${dotTopPercent}%` });
      };

      const timeline = gsap.timeline({ paused: true });

      timeline.to(
        leftColumn,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.16,
          ease: "power2.out",
        },
        0.02
      );

      timeline.to(
        rightColumn,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        0.06
      );

      timeline.to(
        leftColumn,
        {
          y: -12,
          duration: 0.86,
          ease: "none",
        },
        0.1
      );

      timeline.to(
        rightColumn,
        {
          y: -16,
          duration: 0.86,
          ease: "none",
        },
        0.1
      );

      timeline.to(
        icon,
        {
          y: -10,
          rotate: 6,
          duration: 0.5,
          ease: "none",
        },
        0.1
      );

      timeline.to(
        icon,
        {
          y: 4,
          rotate: 2,
          duration: 0.38,
          ease: "none",
        },
        0.6
      );

      timeline.to(
        cards[0],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        0.14
      );

      timeline.to(
        cards[1],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        cardTwoBeat
      );

      timeline.to(
        cards[2],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        cardThreeBeat
      );

      timeline.progress(0);
      updateRail(0);
      let heldStoryProgress = 0;

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        end: "bottom 28%",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const storyProgress = gsap.utils.clamp(
            0,
            1,
            self.progress * storySpeedMultiplier
          );
          heldStoryProgress = Math.max(heldStoryProgress, storyProgress);
          timeline.progress(heldStoryProgress);
          updateRail(heldStoryProgress);

          if (heldStoryProgress >= endingBeat) {
            playEndingTypeReveal();
          }
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mb-16 scroll-mt-24 overflow-hidden pt-14 md:mb-20 md:pt-20"
    >
      <div className="lg:hidden">
        <h2 className="section-title text-4xl leading-[1.02]">
          What Does a CPVC Member Look Like?
        </h2>

        <div className="mt-6 grid gap-4">
          {standoutFeatures.map((feature) => (
            <HoverCard
              key={feature.title}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 md:min-h-[172px]"
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
            </HoverCard>
          ))}
        </div>

        <div className="mt-8 mb-10 ml-auto max-w-4xl text-right text-2xl font-semibold leading-[1.04] tracking-tight text-black/90 [text-wrap:balance] md:text-4xl">
          <span className="block">No matter your skill,</span>
          <span className="block">Vibe Coding Club is for you.</span>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr] lg:items-stretch">
          <div ref={leftColumnRef}>
            <HoverCard className="h-full p-2 md:p-3">
              <div className="flex h-full flex-col">
                <h2 className="section-title text-4xl leading-[1.02] md:text-5xl">
                  What Does a CPVC Member Look Like?
                </h2>

                <div className="mt-8 flex flex-1 items-center justify-center">
                  <div ref={iconRef}>
                    <UserRound
                      className="h-[17rem] w-[17rem] text-brand-700/90 md:h-[20rem] md:w-[20rem]"
                      strokeWidth={1.35}
                    />
                  </div>
                </div>
              </div>
            </HoverCard>
          </div>

          <div ref={rightColumnRef} className="relative pl-8 md:pl-10">
            <div
              aria-hidden
              className="absolute bottom-2 left-1 top-2 w-px bg-zinc-200/90"
            />
            <div
              aria-hidden
              ref={railFillRef}
              className="absolute bottom-2 left-1 top-2 w-px origin-top bg-zinc-900/80"
            />
            <div
              aria-hidden
              ref={railDotRef}
              className="absolute left-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full border border-zinc-900/20 bg-zinc-900 shadow-[0_0_0_6px_rgba(13,29,48,0.12)]"
            />

            <div className="grid gap-4">
              {standoutFeatures.map((feature, index) => (
                <HoverCard
                  key={feature.title}
                  cardRef={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="rounded-2xl border border-zinc-200/80 bg-white p-6 md:min-h-[172px]"
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
                </HoverCard>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={endingTextRef}
          aria-label={`${ENDING_LINE_ONE} ${ENDING_LINE_TWO}`}
          className="mt-8 mb-10 ml-auto max-w-4xl text-right text-2xl font-semibold leading-[1.04] tracking-tight text-black/90 [text-wrap:balance] md:text-4xl"
        >
          <span className="relative block">
            <span aria-hidden className="invisible">
              {ENDING_LINE_ONE}
            </span>
            <span
              ref={endingLineOneRef}
              aria-hidden
              className="absolute inset-0 block"
            />
          </span>
          <span className="relative block">
            <span aria-hidden className="invisible">
              {ENDING_LINE_TWO}
            </span>
            <span
              ref={endingLineTwoRef}
              aria-hidden
              className="absolute inset-0 block"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
