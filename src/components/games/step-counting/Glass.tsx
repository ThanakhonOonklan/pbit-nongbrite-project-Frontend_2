import React, { useState } from "react";
import type { LoopTheme } from "@/constants/games/step-counting-levels";
import { THEME } from "./constants";

const STRAW_COLOR: Record<LoopTheme, string> = {
  orange: "#FF8C00",
  watermelon: "#22C55E",
  pineapple: "#EAB308",
  apple: "#DC2626",
};

const FRUIT_EMOJI: Record<LoopTheme, string> = {
  orange: "🍊",
  watermelon: "🍉",
  pineapple: "🍍",
  apple: "\uD83C\uDF4F",
};

// Glass inner fill area (y coords in viewBox 0 0 100 120)
const FILL_START_Y = 25;
const FILL_END_Y = 105;
const FILL_H = FILL_END_Y - FILL_START_Y; // 80

interface GlassProps {
  index: number;
  taskIndex: number;
  currentAmount: number;
  currentGlass: number;
  isRunning: boolean;
  theme: LoopTheme;
  actualTheme?: LoopTheme | null;
  showOverflow?: boolean;
  showLabel?: boolean;
  sizeOverride?: number;
  enterDelay?: number;
}

export function Glass({
  index,
  taskIndex,
  currentAmount,
  currentGlass,
  isRunning,
  theme,
  actualTheme,
  showOverflow = false,
  showLabel = true,
  sizeOverride,
  enterDelay = 0,
}: GlassProps) {
  const t = THEME[theme];
  const liqT = actualTheme ? THEME[actualTheme] : t;
  const filled = Math.max(0, Math.min(currentAmount, 1));
  const isFull = filled >= 1;
  const clipId = `gc-${taskIndex}-${index}`;
  const gradId = `gd-${taskIndex}-${index}`;
  const bodyGradId = `gb-${taskIndex}-${index}`;
  const liquidColor = liqT.fillColor;
  const translateY = filled === 0 ? FILL_H + 15 : (1 - filled) * FILL_H;
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
      @keyframes glassEnter {
        0%   { transform: scale(0) translateY(18px); opacity: 0; }
        60%  { transform: scale(1.2) translateY(-4px); opacity: 1; }
        80%  { transform: scale(0.93); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes glassPop {
        0%   { transform: scale(1); }
        30%  { transform: scale(1.22) translateY(-5px); }
        55%  { transform: scale(0.92) translateY(1px); }
        75%  { transform: scale(1.08) translateY(-2px); }
        100% { transform: scale(1); }
      }
      @keyframes glassShake {
        0%,100%{transform:translateX(0)rotate(0)}
        20%{transform:translateX(-5px)rotate(-3deg)}
        40%{transform:translateX(5px)rotate(3deg)}
        60%{transform:translateX(-4px)rotate(-2deg)}
        80%{transform:translateX(4px)rotate(2deg)}
      }
    `}</style>
      <div
        className="flex flex-col items-center"
        style={{
          gap: 2,
          cursor: "pointer",
          transition: (showOverflow || isFull) ? "none" : "transform 0.15s ease",
          transform: (!isFull && hovered) ? "scale(1.15) translateY(-4px)" : "scale(1)",
          animation: showOverflow
            ? "glassShake 0.45s ease 0s 4"
            : isFull
              ? "glassPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards"
              : `glassEnter 0.45s cubic-bezier(0.175,0.885,0.32,1.275) ${enterDelay}s both`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {showLabel && (
          <div style={{ fontSize: "clamp(10px, 1.2vw, 14px)", lineHeight: 1, userSelect: "none" }}>
            {FRUIT_EMOJI[theme]}
          </div>
        )}
        <div className="relative" style={{ width: sizeOverride ? `${sizeOverride}px` : "clamp(32px, 5vw, 58px)", aspectRatio: "5/6", filter: hovered ? `drop-shadow(0 5px 14px ${liquidColor}CC)` : "none", transition: "filter 0.15s ease" }}>
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Clip liquid to inner glass area */}
              <clipPath id={clipId}>
                <path d="M 21 15 L 28 106 C 35 110 65 110 72 106 L 79 15 Z" />
              </clipPath>

              {/* Liquid gradient */}
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={liquidColor} stopOpacity="0.95" />
                <stop offset="100%" stopColor={liqT.fillActive} stopOpacity="1" />
              </linearGradient>

              {/* Glass surface gradient — tinted with fruit color */}
              <linearGradient id={bodyGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
                <stop offset="15%" stopColor={liquidColor} stopOpacity="0.18" />
                <stop offset="85%" stopColor={liquidColor} stopOpacity="0.18" />
                <stop offset="100%" stopColor="#EEEEEE" stopOpacity="0.75" />
              </linearGradient>
            </defs>

            {/* Shadow under glass */}
            <ellipse cx="50" cy="112" rx="32" ry="7" fill="#000000" opacity="0.15" />

            {/* Liquid fill — clipped to inner area */}
            <g clipPath={`url(#${clipId})`}>
              <g style={{
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}>
                <rect x="0" y={FILL_START_Y} width="100" height={FILL_H + 20}
                  fill={`url(#${gradId})`} />
                {/* Liquid surface */}
                <ellipse cx="50" cy={FILL_START_Y} rx="30" ry="4"
                  fill={liquidColor} opacity="0.8" />
                {/* Optional highlight on liquid surface */}
                <ellipse cx="40" cy={FILL_START_Y} rx="8" ry="2"
                  fill="#ffffff" opacity="0.3" />
              </g>
            </g>

            {/* Straw */}
            <line x1="62" y1="105" x2="78" y2="5" stroke={STRAW_COLOR[theme]} strokeWidth="5" strokeLinecap="round" />
            <line x1="63" y1="100" x2="77" y2="10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65" />

            {/* Glass Outer Body */}
            <path d="M 20 15 L 28 106 C 35 110 65 110 72 106 L 80 15 Z" fill={`url(#${bodyGradId})`} />
            <path d="M 20 15 L 28 106 C 35 110 65 110 72 106 L 80 15" fill="none" stroke={liquidColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />

            {/* Glass Top Rim */}
            <ellipse cx="50" cy="15" rx="30" ry="5" fill="none" stroke={liquidColor} strokeWidth="3" strokeOpacity="0.7" />

            {/* Big Glass Highlight */}
            <path d="M 27 25 L 32 90" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.9" />

          </svg>
        </div>
      </div>
    </>
  );
}

export function MiniGlass({ fill, border, color }: { fill: number; border: string; color: string }) {
  const h = Math.round(16 * fill);
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" style={{ flexShrink: 0 }}>
      <path
        d="M2 2 L5 25 Q6 27 11 27 Q16 27 17 25 L20 2 Z"
        fill="none"
        stroke={border}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {h > 0 && (
        <rect x="5.5" y={26 - h} width="11" height={h} rx="1" fill={color} opacity="0.9" />
      )}
    </svg>
  );
}
