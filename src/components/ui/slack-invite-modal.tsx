"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface SlackInviteModalProps {
  open: boolean;
  onClose: () => void;
  slackInviteUrl: string;
  formInviteUrl: string;
}

const previewMessages = [
  {
    accent: "rgba(var(--color-accent-rgb), 0.9)",
    lines: [84, 62, 46],
  },
  {
    accent: "rgba(var(--color-accent-rgb), 0.8)",
    lines: [72, 56],
  },
  {
    accent: "rgba(var(--color-accent-rgb), 0.65)",
    lines: [78, 64, 58],
  },
  {
    accent: "rgba(var(--color-dark-rgb), 0.58)",
    lines: [68, 52],
  },
  {
    accent: "rgba(var(--color-dark-rgb), 0.65)",
    lines: [86, 58, 40],
  },
  {
    accent: "rgba(var(--color-accent-rgb), 0.72)",
    lines: [70, 64],
  },
] as const;

function SlackMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      focusable="false"
    >
      <rect x="2" y="2" width="5" height="9" rx="2.5" fill="#36C5F0" />
      <rect x="2" y="2" width="9" height="5" rx="2.5" fill="#36C5F0" />

      <rect x="17" y="2" width="5" height="9" rx="2.5" fill="#2EB67D" />
      <rect x="13" y="2" width="9" height="5" rx="2.5" fill="#2EB67D" />

      <rect x="17" y="13" width="5" height="9" rx="2.5" fill="#ECB22E" />
      <rect x="13" y="17" width="9" height="5" rx="2.5" fill="#ECB22E" />

      <rect x="2" y="13" width="5" height="9" rx="2.5" fill="#E01E5A" />
      <rect x="2" y="17" width="9" height="5" rx="2.5" fill="#E01E5A" />
    </svg>
  );
}

function VibeCodingLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative block overflow-hidden ${className}`}>
      <Image
        src="/assets/CPVC_Full_Logo.png"
        alt=""
        fill
        sizes="20px"
        className="object-contain p-[1px]"
      />
    </span>
  );
}

export function SlackInviteModal({
  open,
  onClose,
  slackInviteUrl,
  formInviteUrl,
}: SlackInviteModalProps) {
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
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-3 sm:p-4 md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close Slack invite"
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
            aria-label="Join our Slack community"
            className="relative my-2 w-full max-w-6xl max-h-[calc(100svh-1.5rem)] overflow-x-hidden overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_40px_120px_rgba(var(--color-dark-rgb),0.22)] sm:p-5 md:my-0 md:max-h-[min(920px,calc(100svh-4rem))] md:p-8"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-zinc-950 via-zinc-900 to-brand-500"
            />

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex min-h-0 flex-col justify-between bg-white p-1 sm:p-2 md:min-h-[450px] md:p-4">
                <div>
                  <h2 className="mb-3 max-w-lg text-[2rem] leading-tight tracking-tight text-black sm:text-3xl md:mb-4 md:text-5xl">
                    Think it&apos;s too good to be true?
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
                    Let us prove you wrong. Join our Slack to get details on
                    future club meetings and events.
                  </p>
                  <div className="mt-8 max-w-xl border-t border-zinc-900/15 pt-3">
                    <p className="text-sm font-medium tracking-[0.08em] text-zinc-700 md:text-sm">
                      <span className="text-zinc-900">NEXT MEETING</span>
                      &nbsp;|&nbsp; Friday, 12PM - 2PM in Frost 0102
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                  <MagneticButton
                    strength={0.1}
                    onClick={() => openExternalLink(slackInviteUrl)}
                    className="btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-zinc-900 shadow-md shadow-zinc-950/20 sm:w-auto"
                  >
                    <SlackMark className="h-4 w-4" />
                    Join Slack
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </MagneticButton>
                  <MagneticButton
                    strength={0.04}
                    onClick={() => openExternalLink(formInviteUrl)}
                    className="btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-zinc-900 shadow-md shadow-zinc-950/20 sm:w-auto"
                  >
                    Fill out the Interest Form
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </MagneticButton>
                  <MagneticButton
                    strength={0}
                    onClick={onClose}
                    className="btn btn-secondary btn-jiggle w-full border-zinc-300 text-black/75 hover:border-zinc-400 hover:text-black sm:w-auto"
                  >
                    Maybe later
                  </MagneticButton>
                </div>
              </div>

              <div className="hidden items-center justify-center p-2 md:flex">
                <div className="w-full max-w-[340px] overflow-hidden rounded-lg border border-brand-200 bg-white shadow-md sm:max-w-[360px]">
                  <div className="flex h-[300px] sm:h-[360px] md:h-[410px]">
                    <div className="w-16 border-r border-zinc-200 bg-zinc-200 p-2 sm:w-20 sm:p-2.5">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm sm:h-11 sm:w-11">
                          <VibeCodingLogo className="h-7 w-7 sm:h-9 sm:w-9" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-10 rounded bg-white/35" />
                        <div className="h-2 w-8 rounded bg-white/20" />
                        <div className="h-2 w-9 rounded bg-white/25" />
                        <div className="h-2 w-7 rounded bg-white/20" />
                      </div>
                    </div>

                    <div className="flex-1 bg-neutral-50 p-2.5 sm:p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-2.5 w-20 rounded bg-brand-500/30" />
                        <div className="h-2 w-8 rounded bg-zinc-300" />
                      </div>

                      <div className="relative h-[248px] overflow-hidden sm:h-[308px] md:h-[358px]">
                        <motion.div
                          className="space-y-2.5"
                          animate={{ y: ["0%", "-50%"] }}
                          transition={{
                            duration: 10,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                        >
                          {[...previewMessages, ...previewMessages].map(
                            (message, index) => (
                              <div
                                key={`${message.accent}-${index}`}
                                className="rounded-md border border-zinc-200 bg-white p-2.5"
                              >
                                <div className="mb-2 flex items-center gap-2">
                                  <div className="h-5 w-5 shrink-0 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-300" />
                                  <span
                                    className="h-2.5 w-2.5 rounded-sm"
                                    style={{ backgroundColor: message.accent }}
                                  />
                                  <div className="h-2 w-16 rounded bg-zinc-300" />
                                  <div className="ml-auto h-1.5 w-7 rounded bg-zinc-200" />
                                </div>

                                <div className="space-y-1.5">
                                  {message.lines.map((width, lineIndex) => (
                                    <div
                                      key={`${width}-${lineIndex}`}
                                      className="h-1.5 rounded bg-zinc-200"
                                      style={{ width: `${width}%` }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
