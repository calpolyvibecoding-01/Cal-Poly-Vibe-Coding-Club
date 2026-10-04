"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
  givingUrl: string;
  sponsorPaypalUrl: string;
}

export function SupportModal({
  open,
  onClose,
  givingUrl,
  sponsorPaypalUrl,
}: SupportModalProps) {
  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close support options"
            className="absolute inset-0 cursor-pointer bg-black/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Support Cal Poly Vibe Coding"
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_40px_120px_rgba(var(--color-dark-rgb),0.22)] sm:p-10"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-black to-brand-500"
            />

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black/60 transition-colors hover:bg-zinc-100 hover:text-black sm:right-5 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-3 text-balance pr-10 text-3xl leading-tight tracking-tight text-black sm:text-4xl lg:whitespace-nowrap">
              Support Cal Poly Vibe Coding
            </h2>
            <p className="mb-8 text-base leading-relaxed text-black/70 sm:text-lg lg:whitespace-nowrap">
              Help keep CPVC building. Give any amount, or sponsor our
              Nov 13&ndash;15 AI hackathon.
            </p>

            <div className="flex flex-col gap-3">
              <MagneticButton
                strength={0.08}
                onClick={() => openExternalLink(givingUrl)}
                className="btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-black py-4 text-base shadow-md shadow-zinc-950/20"
              >
                CPVC Giving Link
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                strength={0.08}
                onClick={() => openExternalLink(sponsorPaypalUrl)}
                className="btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-black py-4 text-base shadow-md shadow-zinc-950/20"
              >
                CPVC Sponsor PayPal Page
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <Link
                href="/give"
                onClick={onClose}
                className="btn btn-secondary btn-jiggle w-full justify-center py-4 text-base"
              >
                See Giving Levels
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
