"use client";

import * as React from "react";
export type ResourceBarVariant = "heart" | "score" | "fire";

export interface ResourceBarProps {
  number?: number;
  variant?: ResourceBarVariant;
  className?: string;
}

const variantConfig: Record<
  ResourceBarVariant,
  {
    emoji: string;
    leftBg: string;
    rightText: string;
  }
> = {
  heart: {
    emoji: "❤️",
    leftBg: "#FFD54F",
    rightText: "#FF6B6B", // Red pastel color
  },
  score: {
    emoji: "🏆",
    leftBg: "#FFD54F",
    rightText: "#FFD700", // Yellow pastel color
  },
  fire: {
    emoji: "🔥",
    leftBg: "#FF6B6B",
    rightText: "#FF9800", // Orange pastel color
  },
};

export const ResourceBar: React.FC<ResourceBarProps> = ({
  number = 0,
  variant = "heart",
  className,
}) => {
  const config = variantConfig[variant];

  return (
    <div
      className={`inline-flex w-[6em] h-[2.2em] items-stretch overflow-hidden rounded-[0.5em] bg-white ${
        className || ""
      }`}
    >
      {/* Left Part */}
      <div
        className="flex items-center justify-center"
      >
        <span className="text-[1.8em] leading-none">{config.emoji}</span>
      </div>

      {/* Right Part */}
      <div className="flex items-center justify-start pl-1">
        <span
          className="font-['Trebuchet_MS',sans-serif] text-[1em] font-bold"
          style={{ color: config.rightText }}
        >
          {number}
        </span>
      </div>
    </div>
  );
};

ResourceBar.displayName = "ResourceBar";
