"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RippleEffectProps {
  /**
   * Size of the ripple (width and height)
   */
  size?: number;
  /**
   * Border width
   */
  borderWidth?: number;
  /**
   * Border color
   */
  borderColor?: string;
  /**
   * Opacity of the ripple
   */
  opacity?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Top position (percentage)
   */
  top?: string;
  /**
   * Left position (percentage)
   */
  left?: string;
  /**
   * Number of ripple waves
   */
  count?: number;
  /**
   * Delay between each wave in seconds
   */
  waveDelay?: number;
  /**
   * Custom className
   */
  className?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  size = 80,
  borderWidth = 10,
  borderColor = "black",
  opacity = 0.5,
  delay = 1.5,
  top = "43%",
  left = "50%",
  count = 1,
  waveDelay = 0.5,
  className,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full animate-ripple pointer-events-none",
            className
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderWidth: `${borderWidth}px`,
            borderColor: borderColor,
            opacity: opacity,
            top: top,
            left: left,
            transform: "translate(-50%, -50%)",
            animationDelay: `${delay + index * waveDelay}s`,
          }}
        />
      ))}
    </>
  );
};

RippleEffect.displayName = "RippleEffect";

