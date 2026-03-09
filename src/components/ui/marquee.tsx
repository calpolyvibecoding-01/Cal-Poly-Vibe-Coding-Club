"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { marqueeItems } from "@/lib/constants";

export function Marquee() {
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track1.current || !track2.current) {
      return;
    }

    const tween1 = gsap.fromTo(
      track1.current,
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
        force3D: true,
      },
    );

    const tween2 = gsap.fromTo(
      track2.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        duration: 35,
        ease: "none",
        repeat: -1,
        force3D: true,
      },
    );

    return () => {
      tween1.kill();
      tween2.kill();
    };
  }, []);

  const renderItems = () =>
    [...marqueeItems, ...marqueeItems].map((item, index) => (
      <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-6">
        <span className="whitespace-nowrap">{item}</span>
        <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-300" />
      </span>
    ));

  return (
    <div className="w-full select-none overflow-hidden py-12" aria-hidden>
      <div className="mb-4">
        <div
          ref={track1}
          className="flex w-max whitespace-nowrap text-4xl font-light tracking-tight text-zinc-200 will-change-transform md:text-6xl"
        >
          {renderItems()}
        </div>
      </div>

      <div>
        <div
          ref={track2}
          className="flex w-max whitespace-nowrap text-4xl font-light tracking-tight text-zinc-100 will-change-transform md:text-6xl"
        >
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
