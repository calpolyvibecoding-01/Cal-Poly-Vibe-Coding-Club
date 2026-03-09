"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { StickyHeader } from "@/components/layout/sticky-header";
import { FreshReveal } from "@/components/sections/fresh-reveal";
import { InfoSection } from "@/components/sections/info-section";
import { SlackInviteModal } from "@/components/ui/slack-invite-modal";
import { siteConfig } from "@/lib/constants";

export function HomePage() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [showSlackModal, setShowSlackModal] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const openSlackModal = useCallback(() => {
    setShowSlackModal(true);
  }, []);

  const closeSlackModal = useCallback(() => {
    setShowSlackModal(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!logoRef.current || !textRef.current || !progressRef.current) {
      return;
    }

    const timeline = gsap.timeline();

    timeline.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
      0
    );

    timeline.fromTo(
      textRef.current,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.15
    );

    timeline.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power1.inOut" },
      0.1
    );

    return () => void timeline.kill();
  }, []);

  useEffect(() => {
    if (!canvasReady || !minTimePassed || loadingDone) {
      return;
    }

    if (
      !loaderRef.current ||
      !progressRef.current ||
      !logoRef.current ||
      !textRef.current
    ) {
      return;
    }

    const timeline = gsap.timeline({ onComplete: () => setLoadingDone(true) });

    timeline.to(
      progressRef.current,
      { opacity: 0, duration: 0.2, ease: "power2.in" },
      0
    );
    timeline.to(
      logoRef.current,
      { y: -15, opacity: 0, duration: 0.4, ease: "power2.in" },
      0
    );
    timeline.to(
      textRef.current,
      { y: -8, opacity: 0, duration: 0.3, ease: "power2.in" },
      0.05
    );
    timeline.to(
      loaderRef.current,
      { opacity: 0, duration: 0.4, ease: "power2.inOut" },
      0.2
    );

    return () => void timeline.kill();
  }, [canvasReady, loadingDone, minTimePassed]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {!loadingDone && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-5">
            <div ref={logoRef} className="flex items-center gap-3 opacity-0">
              <Image
                src="/assets/Logo-transparent.png"
                alt={siteConfig.name}
                width={190}
                height={53}
                priority
                className="h-auto w-[150px] md:w-[190px]"
                sizes="(max-width: 768px) 150px, 190px"
              />
            </div>

            <p ref={textRef} className="type-muted opacity-0">
              Loading
            </p>

            <div className="h-px w-40 overflow-hidden rounded-full bg-zinc-200">
              <div
                ref={progressRef}
                className="h-full origin-left bg-zinc-900"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      )}

      <StickyHeader 
        visible={loadingDone}
        onJoinSlackClick={openSlackModal}
         />
      <FreshReveal
        onCanvasReady={() => setCanvasReady(true)}
        startAnimation={loadingDone}
        onJoinSlackClick={openSlackModal}
      />
      <InfoSection onJoinSlackClick={openSlackModal} />
      <SlackInviteModal
        open={showSlackModal}
        onClose={closeSlackModal}
        slackInviteUrl={siteConfig.slackInviteUrl}
        formInviteUrl={siteConfig.formInviteUrl}
      />
    </main>
  );
}
