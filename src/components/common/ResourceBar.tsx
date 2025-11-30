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
    rightText: "#C25100",
  },
  score: {
    emoji: "🏆",
    leftBg: "#FFD54F",
    rightText: "#9B3B00",
  },
  fire: {
    emoji: "🔥",
    leftBg: "#FF6B6B",
    rightText: "#9C1E1E",
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
      className={`inline-flex w-[6em] h-[2.2em] items-stretch overflow-hidden rounded-[0.5em] border border-[#D9D9D9] bg-white shadow-[0px_1px_0px_rgba(45,45,45,0.1)] transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer ${
        className || ""
      }`}
    >
      {/* Left Part */}
      <div
        className="flex w-[40%] items-center justify-center border-r border-[#D9D9D9]"
      >
        <span className="text-[1.8em] leading-none">{config.emoji}</span>
      </div>

      {/* Right Part */}
      <div className="flex w-[60%] items-center justify-center px-1.5">
        <span
          className="font-['Trebuchet_MS',sans-serif] text-[1em] font-bold text-[#3C3C3C]"
        >
          {number}
        </span>
      </div>
    </div>
  );
};

ResourceBar.displayName = "ResourceBar";
