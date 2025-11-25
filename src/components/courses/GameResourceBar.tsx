"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface GameResourceBarProps {
  className?: string;
  barColor?: string;
  circleColor?: string;
  circleBorderColor?: string;
  size?: "sm" | "md";
  barWidth?: number;
  barHeight?: number;
  barOffset?: number;
  heartSize?: number;
  heartOffsetX?: number;
  heartOffsetY?: number;
  heartSymbol?: string;
}

const sizeConfig = {
  sm: {
    bar: { width: 80, height: 32, offset: 12 },
    heart: { size: 42, offsetX: 2, offsetY: 0 },
  },
  md: {
    bar: { width: 110, height: 30, offset: 18 },
    heart: { size: 50, offsetX: 4, offsetY: 0 },
  },
};

export const GameResourceBar: React.FC<GameResourceBarProps> = ({
  className,
  barColor = "#1CB0F6",
  circleColor = "#FF4D6D",
  circleBorderColor = "#AFB5CF",
  size = "sm",
  barWidth,
  barHeight,
  barOffset,
  heartSize,
  heartOffsetX,
  heartOffsetY,
  heartSymbol = "❤️",
}) => {
  const sizeStyles = sizeConfig[size];
  const width = barWidth ?? sizeStyles.bar.width;
  const height = barHeight ?? sizeStyles.bar.height;
  const offset = barOffset ?? sizeStyles.bar.offset;
  const resolvedHeartSize = heartSize ?? sizeStyles.heart.size;
  const resolvedHeartOffsetX = heartOffsetX ?? sizeStyles.heart.offsetX;
  const resolvedHeartOffsetY = heartOffsetY ?? sizeStyles.heart.offsetY;

  return (
    <div className={cn("flex items-center justify-start", className)}>
      <div className="relative inline-flex items-center justify-center flex-shrink-0">
        <div
          className="absolute rounded-full shadow-md"
          style={{
            backgroundColor: barColor,
            width: `${width}px`,
            height: `${height}px`,
            left: `${offset}px`,
          }}
        />
        <span
          className="relative z-10 flex items-center justify-center"
          style={{
            fontSize: `${resolvedHeartSize}px`,
            lineHeight: 1,
            transform: `translate(${resolvedHeartOffsetX}px, ${resolvedHeartOffsetY}px)`,
            color: circleColor,
            textShadow: `0 3px 0 ${circleBorderColor}`,
          }}
        >
          {heartSymbol}
        </span>
      </div>
    </div>
  );
};

GameResourceBar.displayName = "GameResourceBar";


