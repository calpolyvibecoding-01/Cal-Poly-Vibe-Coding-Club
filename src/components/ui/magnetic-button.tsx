"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      strength = 0.18,
      type = "button",
      onMouseMove,
      onMouseLeave,
      onBlur,
      onPointerUp,
      onPointerCancel,
      style,
      ...props
    },
    ref,
  ) => {
    const disableMagnetism = useMediaQuery(
      "(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)",
    );
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 200 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    const resetOffset = useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    useEffect(() => {
      if (!disableMagnetism) {
        return;
      }

      resetOffset();
    }, [disableMagnetism, resetOffset]);

    const handleMouseMove = useCallback(
      (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (disableMagnetism) {
          onMouseMove?.(event);
          return;
        }

        const button = buttonRef.current;
        if (!button) {
          return;
        }

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * strength);
        y.set((event.clientY - centerY) * strength);
        onMouseMove?.(event);
      },
      [disableMagnetism, onMouseMove, strength, x, y],
    );

    const handleMouseLeave = useCallback(
      (event: ReactMouseEvent<HTMLButtonElement>) => {
        resetOffset();
        onMouseLeave?.(event);
      },
      [onMouseLeave, resetOffset],
    );

    const handleBlur = useCallback(
      (event: ReactFocusEvent<HTMLButtonElement>) => {
        resetOffset();
        onBlur?.(event);
      },
      [onBlur, resetOffset],
    );

    const handlePointerUp = useCallback(
      (event: ReactPointerEvent<HTMLButtonElement>) => {
        resetOffset();
        onPointerUp?.(event);
      },
      [onPointerUp, resetOffset],
    );

    const handlePointerCancel = useCallback(
      (event: ReactPointerEvent<HTMLButtonElement>) => {
        resetOffset();
        onPointerCancel?.(event);
      },
      [onPointerCancel, resetOffset],
    );

    const setButtonRef = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <motion.button
        ref={setButtonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={disableMagnetism ? style : { ...style, x: smoothX, y: smoothY }}
        className={cn(className)}
        type={type}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";
