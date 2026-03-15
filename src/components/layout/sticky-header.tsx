"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { navItems, siteConfig } from "@/lib/constants";
import { smoothScrollToHash } from "@/lib/utils";

interface StickyHeaderProps {
  visible: boolean;
  onJoinSlackClick?: () => void;
}

function RollingLink({ text, href }: { text: string; href: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = useCallback(() => {
    const element = linkRef.current;
    if (!element) {
      return;
    }

    const top = element.querySelector<HTMLSpanElement>("[data-top]");
    const bottom = element.querySelector<HTMLSpanElement>("[data-bottom]");
    if (!top || !bottom) {
      return;
    }

    gsap.killTweensOf([top, bottom]);
    gsap.to(top, { y: "-110%", duration: 0.35, ease: "power3.inOut" });
    gsap.fromTo(
      bottom,
      { y: "110%" },
      { y: "0%", duration: 0.35, ease: "power3.inOut" }
    );
  }, []);

  const handleLeave = useCallback(() => {
    const element = linkRef.current;
    if (!element) {
      return;
    }

    const top = element.querySelector<HTMLSpanElement>("[data-top]");
    const bottom = element.querySelector<HTMLSpanElement>("[data-bottom]");
    if (!top || !bottom) {
      return;
    }

    gsap.killTweensOf([top, bottom]);
    gsap.to(top, { y: "0%", duration: 0.35, ease: "power3.inOut" });
    gsap.to(bottom, { y: "110%", duration: 0.35, ease: "power3.inOut" });
  }, []);

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      smoothScrollToHash(href);
    },
    [href]
  );

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative inline-block h-[1.4em] cursor-pointer overflow-hidden"
      data-nav-link
    >
      <span data-top className="block text-sm tracking-[0.01em] text-black/60">
        {text}
      </span>
      <span
        data-bottom
        className="absolute left-0 top-0 block text-sm tracking-[0.01em] text-black"
        style={{ transform: "translateY(110%)" }}
      >
        {text}
      </span>
    </a>
  );
}

function HoverLine({ containerRef }: { containerRef: RefObject<HTMLElement> }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const links = container.querySelectorAll<HTMLElement>("[data-nav-link]");

    const handleEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const line = lineRef.current;
      if (!line || !container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      gsap.to(line, {
        width: targetRect.width,
        x: targetRect.left - containerRect.left,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      const line = lineRef.current;
      if (!line) {
        return;
      }

      gsap.to(line, { opacity: 0, duration: 0.25, ease: "power2.in" });
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [containerRef]);

  return (
    <div
      ref={lineRef}
      className="pointer-events-none absolute bottom-0 left-0 h-px bg-black/30 opacity-0"
      style={{ width: 0 }}
    />
  );
}

export function StickyHeader({ visible, onJoinSlackClick }: StickyHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [showHeader, setShowHeader] = useState(false);
  const hasShown = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const burgerTopRef = useRef<HTMLSpanElement>(null);
  const burgerMidRef = useRef<HTMLSpanElement>(null);
  const burgerBotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80 && !hasShown.current) {
        hasShown.current = true;
        setShowHeader(true);
      } else if (scrollY <= 80 && hasShown.current) {
        hasShown.current = false;
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    if (showHeader) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [showHeader]);

  useEffect(() => {
    const top = burgerTopRef.current;
    const middle = burgerMidRef.current;
    const bottom = burgerBotRef.current;
    if (!top || !middle || !bottom) {
      return;
    }

    if (mobileOpen) {
      gsap.to(top, { y: 6, rotation: 45, duration: 0.3, ease: "power2.inOut" });
      gsap.to(middle, { opacity: 0, scaleX: 0, duration: 0.15 });
      gsap.to(bottom, {
        y: -6,
        rotation: -45,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(top, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(middle, { opacity: 1, scaleX: 1, duration: 0.2, delay: 0.1 });
      gsap.to(bottom, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [mobileOpen]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-40 opacity-0"
      style={{ transform: "translateY(-100px)" }}
    >
      <div className="mx-4 mt-4">
        <div
          data-sticky-header-bar
          className="container flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/80 py-3 shadow-glass backdrop-blur-xl"
        >
          <button
            type="button"
            className="flex shrink-0 items-center"
            onClick={() => smoothScrollToHash("#about")}
            aria-label="Go to about section"
          >
            <Image
              src="/assets/CPVC_Full_Cropped.png"
              alt={siteConfig.name}
              width={743}
              height={214}
              className="h-auto w-[112px] sm:w-[126px] md:w-[148px] lg:w-[158px]"
              sizes="(max-width: 640px) 112px, (max-width: 768px) 126px, (max-width: 1280px) 148px, 158px"
              unoptimized
              priority
            />
          </button>

          <nav
            ref={navRef}
            className="relative hidden items-center gap-8 py-1 md:flex"
            aria-label="Main"
          >
            {navItems.map((item) => (
              <RollingLink
                key={item.label}
                text={item.label}
                href={item.href}
              />
            ))}
            <HoverLine containerRef={navRef} />
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              onClick={onJoinSlackClick}
              className="btn btn-primary rounded-md group cursor-pointer"
            >
              <span
                className="relative z-10 flex items-center gap-1.5"
                style={{ fontWeight: 500 }}
              >
                Join Us
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </span>
            </MagneticButton>
          </div>

          <button
            className="flex h-8 w-8 cursor-pointer flex-col items-end justify-center gap-[5px] md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <span
              ref={burgerTopRef}
              className="block h-[1.5px] w-6 origin-center bg-black"
            />
            <span
              ref={burgerMidRef}
              className="block h-[1.5px] w-4 origin-right bg-black"
            />
            <span
              ref={burgerBotRef}
              className="block h-[1.5px] w-6 origin-center bg-black"
            />
          </button>
        </div>

        {mobileOpen && (
          <div
            id="mobile-nav"
            className="mt-2 flex flex-col gap-3 rounded-2xl border border-zinc-200/50 bg-white/90 px-6 py-5 shadow-lg backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  setMobileOpen(false);
                  smoothScrollToHash(item.href);
                }}
                className="py-1 text-base tracking-[0.01em] text-black/75 transition-colors hover:text-black"
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn btn-primary mt-2 w-full"
              style={{ fontWeight: 500 }}
              onClick={() => {}}
              type="button"
            >
              Join Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
