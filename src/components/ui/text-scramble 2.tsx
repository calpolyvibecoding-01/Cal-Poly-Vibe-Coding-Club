"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  autoScramble?: boolean;
}

export function TextScramble({
  text,
  className = "",
  speed = 30,
  autoScramble = true,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScramblingRef = useRef(false);

  const scramble = useCallback(() => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    isScramblingRef.current = true;

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") {
              return " ";
            }
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iteration += 0.5;

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplay(text);
        isScramblingRef.current = false;
      }
    }, speed);
  }, [speed, text]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (!autoScramble) {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isScramblingRef.current) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [autoScramble, scramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isScramblingRef.current = false;
    };
  }, []);

  return (
    <span
      ref={containerRef}
      onMouseEnter={scramble}
      className={`cursor-default font-mono ${className}`}
    >
      {display}
    </span>
  );
}
