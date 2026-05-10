"use client";

import React from "react";

interface TwemojiIconProps {
  emoji: string;
  size?: number;
  className?: string;
}

export const TwemojiIcon = ({ emoji, size = 40, className = "" }: TwemojiIconProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ fontSize: size, lineHeight: 1, width: size, height: size }}
      role="img"
      aria-label={emoji}
    >
      {emoji}
    </span>
  );
};
