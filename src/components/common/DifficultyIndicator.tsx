"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DifficultyIndicatorProps {
  /**
   * Difficulty level (1-3)
   * Level 1: Green
   * Level 2: Yellow
   * Level 3: Red
   */
  level?: number;
  /**
   * Inactive bar color
   */
  inactiveColor?: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Bar width
   */
  barWidth?: string;
  /**
   * Bar height
   */
  barHeight?: string;
  /**
   * Gap between bars
   */
  gap?: string;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  level = 1,
  inactiveColor = "#B8D8ED", // Light blue for inactive
  className,
  barWidth = "12px",
  barHeight = "24px",
  gap = "4px",
}) => {
  // Ensure level is between 1 and 3
  const normalizedLevel = Math.max(1, Math.min(3, level));

  // Color mapping based on level
  const levelColors: Record<number, string> = {
    1: "#22C55E", // Green
    2: "#EAB308", // Yellow
    3: "#EF4444", // Red
  };

  const activeColor = levelColors[normalizedLevel] || levelColors[1];

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      style={{ gap }}
    >
      {Array.from({ length: 3 }).map((_, index) => {
        const isActive = index < normalizedLevel;
        return (
          <div
            key={index}
            className="rounded-sm transition-colors duration-200"
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: isActive ? activeColor : inactiveColor,
            }}
          />
        );
      })}
    </div>
  );
};

DifficultyIndicator.displayName = "DifficultyIndicator";

