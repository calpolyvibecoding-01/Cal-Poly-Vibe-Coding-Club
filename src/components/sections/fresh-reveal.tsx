"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas3DScene } from "@/components/ui/canvas-3d-scene";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextScramble } from "@/components/ui/text-scramble";
import { smoothScrollToHash } from "@/lib/utils";

interface FreshRevealProps {
  onCanvasReady?: () => void;
  startAnimation?: boolean;
  onJoinSlackClick?: () => void;
}

let hasPlayedFreshRevealIntro = false;

export function FreshReveal({
  onCanvasReady,
  startAnimation = false,
  onJoinSlackClick,
}: FreshRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const slackRef = useRef<HTMLButtonElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);
  const hasReportedReady = useRef(false);
  const lastFrameAtRef = useRef(0);
  const isInViewRef = useRef(true);

  const introAlreadyPlayed = hasPlayedFreshRevealIntro;

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  const handleCanvasReady = useCallback(() => {
    setSceneReady(true);
    lastFrameAtRef.current = performance.now();
    if (!hasReportedReady.current) {
      hasReportedReady.current = true;
      onCanvasReady?.();
    }
  }, [onCanvasReady]);

  const handleCanvasFrame = useCallback(() => {
    lastFrameAtRef.current = performance.now();
    if (isInViewRef.current) {
      setShowPoster((prev) => (prev ? false : prev));
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        // When returning to hero, show poster immediately until a fresh canvas frame arrives.
        if (visible) {
          setShowPoster(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!sceneReady || !isInView) {
      return;
    }

    const interval = window.setInterval(() => {
      const stale = performance.now() - lastFrameAtRef.current > 320;
      if (stale) {
        setShowPoster(true);
      }
    }, 120);

    return () => {
      window.clearInterval(interval);
    };
  }, [isInView, sceneReady]);

  useEffect(() => {
    if (!startAnimation || hasAnimated.current) {
      return;
    }

    if (
      !taglineRef.current ||
      !canvasWrapRef.current ||
      !headingRef.current ||
      !subheadingRef.current ||
      !buttonRef.current ||
      !slackRef.current
    ) {
      return;
    }

    hasAnimated.current = true;

    if (hasPlayedFreshRevealIntro) {
      gsap.set(taglineRef.current, { opacity: 1, y: 0 });
      gsap.set(canvasWrapRef.current, { opacity: 1, scale: 1 });
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
      gsap.set(subheadingRef.current, { opacity: 1, x: 0 });
      gsap.set(buttonRef.current, { opacity: 1, y: 0 });
      gsap.set(slackRef.current, { opacity: 1, y: 0 });
      return;
    }

    const timeline = gsap.timeline({ delay: 0.3 });

    timeline.fromTo(
      taglineRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 1, ease: "power1.out" },
      0
    );

    timeline.fromTo(
      canvasWrapRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 2.4, ease: "power1.out" },
      0.1
    );

    timeline.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 2, ease: "power1.out" },
      0.4
    );

    timeline.fromTo(
      subheadingRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1.6, ease: "power1.out" },
      0.5
    );

    timeline.fromTo(
      buttonRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power1.out" },
      0.56
    );

    timeline.fromTo(
      slackRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power1.out" },
      0.59
    );

    timeline.call(() => {
      hasPlayedFreshRevealIntro = true;
    });

    return () => {
      timeline.kill();
    };
  }, [startAnimation]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-0 py-0"
    >
      <h3
        ref={taglineRef}
        className={`hero-h3 absolute left-12 top-16 z-20 select-none text-[20px] tracking-[0.26em] text-brand-900 md:left-20 md:text-[25px]  ${
          introAlreadyPlayed ? "opacity-100" : "opacity-0"
        }`}
      >
        <TextScramble text="Create, Learn, Explore" className="font-sans" autoScramble={false} />
      </h3>

      <h1
        ref={headingRef}
        className={`pointer-events-none absolute left-0 right-0 top-0 z-0 flex h-screen select-none items-center justify-center text-center text-6xl text-zinc-200 md:text-8xl ${
          introAlreadyPlayed ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="hero-wordmark">
          <span className="hero-wordmark-calpoly-coding">CAL POLY</span>{" "}
          <span className="hero-wordmark-vibe">VIBE</span>{" "}
          <span className="hero-wordmark-calpoly-coding">CODING</span>
        </span>
      </h1>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700 ${
          showPoster ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(113,153,158,0.24),rgba(243,247,248,0.96)_55%)]" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/80" />
        <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/80" />
        <div className="absolute right-[14%] top-[22%] h-32 w-32 rounded-full border border-brand-300/80" />
        <div className="absolute left-[14%] top-[58%] h-24 w-24 rounded-full border border-brand-200/80" />
      </div>

      <div
        ref={canvasWrapRef}
        className={`absolute left-0 right-0 top-0 z-[2] h-screen ${
          introAlreadyPlayed ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas3DScene
          onReady={handleCanvasReady}
          onFrame={handleCanvasFrame}
          isActive={isInView}
        />
      </div>

      <div className="absolute inset-0 z-[3] bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container relative z-10 flex w-full flex-col justify-end pb-8 pt-[70vh] md:pb-12">
        <div className="flex w-full flex-col items-end self-end md:w-auto">
          <h3
            ref={subheadingRef}
            className={`hero-h3 mb-8 max-w-2xl text-right text-lg text-black/70 md:text-2xl ${
              introAlreadyPlayed ? "opacity-100" : "opacity-0"
            }`}
          >
            Make stunning, intentional projects - all without writing a single
            line of code.
          </h3>
          <div className="flex w-full flex-col items-stretch mt-4 gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 md:w-auto">
            <MagneticButton
              ref={buttonRef}
              onClick={onJoinSlackClick}
              className={`btn btn-primary w-full px-7 py-3 text-sm shadow-lg transition-[transform,box-shadow] duration-150 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.04] active:translate-y-0 active:scale-[0.99] sm:w-auto sm:px-10 sm:py-4 sm:text-base ${
                introAlreadyPlayed ? "opacity-100" : "opacity-0"
              }`}
            >
              Get Involved
            </MagneticButton>
            <MagneticButton
              ref={slackRef}
              onClick={() => {
                smoothScrollToHash("#about");
              }}
              className={`btn btn-secondary w-full border-zinc-700 bg-white/75 px-7 py-3 text-sm text-zinc-900 shadow-lg backdrop-blur-sm transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.04] hover:border-zinc-900 hover:bg-white active:translate-y-0 active:scale-[0.99] sm:w-auto sm:px-10 sm:py-4 sm:text-base ${
                introAlreadyPlayed ? "opacity-100" : "opacity-0"
              }`}
            >
              Prove It
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
