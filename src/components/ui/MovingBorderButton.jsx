"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[MovingBorderButton] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[MovingBorderButton] ${context}:`, error, data)
  }
}

export function MovingBorderButton({
  borderRadius = "0px",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  size = "default",
  ...otherProps
}) {
  const sizeClasses = {
    sm: "h-10 w-auto px-4 text-xs",
    default: "h-12 w-auto px-6 text-sm",
    lg: "h-14 w-auto px-8 text-base",
  }

  return (
    <Component
      className={cn(
        "bg-transparent relative p-[2px] overflow-hidden cursor-pointer",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: borderRadius }}
      >
        <MovingBorder duration={duration} rx="0" ry="0">
          <div
            className={cn(
              "h-24 w-24 opacity-[0.6] bg-[radial-gradient(var(--secondary)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-white border border-gray-200 backdrop-blur-xl text-primary flex items-center justify-center text-sm antialiased font-semibold",
          sizeClasses[size],
          className
        )}
        style={{
          borderRadius: borderRadius,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    try {
      const length = pathRef.current?.getTotalLength();
      if (length) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    } catch (error) {
      logger.error('animationFrame', error, {})
    }
  });

  const x = useTransform(
    progress,
    (val) => {
      try {
        return pathRef.current?.getPointAtLength(val)?.x || 0;
      } catch (e) {
        return 0;
      }
    }
  );
  const y = useTransform(
    progress,
    (val) => {
      try {
        return pathRef.current?.getPointAtLength(val)?.y || 0;
      } catch (e) {
        return 0;
      }
    }
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default MovingBorderButton;
