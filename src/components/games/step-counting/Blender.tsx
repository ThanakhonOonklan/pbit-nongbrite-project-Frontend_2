"use client";

import React, { useEffect, useState } from "react";
import type { LoopTheme } from "@/constants/games/step-counting-levels";

export type BlenderPhase = "empty" | "filling" | "blending" | "dirty";

export interface BlenderProps {
  phase: BlenderPhase;
  theme: LoopTheme | null;
  fruitCount: number;
  capacity: number;
  residueTheme: LoopTheme | null;
}

const LIQUID_COLORS: Record<LoopTheme, { main: string; dark: string; light: string }> = {
  orange: { main: "#FFB300", dark: "#E65100", light: "#FFE082" },
  watermelon: { main: "#EF5350", dark: "#B71C1C", light: "#FFCDD2" },
  pineapple: { main: "#FDD835", dark: "#F57F17", light: "#FFF9C4" },
  apple: { main: "#66BB6A", dark: "#1B5E20", light: "#C8E6C9" },
};

const FRUIT_EMOJI: Record<LoopTheme, string> = {
  orange: "🍊",
  watermelon: "🍉",
  pineapple: "🍍",
  apple: "🍏",
};

function getLiquidColor(theme: LoopTheme | null, fallback: LoopTheme | null) {
  const t = theme ?? fallback;
  if (!t) return { main: "#B2EBF2", dark: "#80DEEA", light: "#E0F7FA" };
  return LIQUID_COLORS[t];
}

// Fruit positions by capacity count
const FRUIT_POSITIONS: Record<number, { x: number; y: number; size: number }[]> = {
  1: [{ x: 250, y: 200, size: 38 }],
  2: [{ x: 250, y: 182, size: 30 }, { x: 250, y: 216, size: 30 }],
  3: [{ x: 250, y: 170, size: 26 }, { x: 250, y: 200, size: 26 }, { x: 250, y: 228, size: 26 }],
  4: [{ x: 235, y: 184, size: 24 }, { x: 263, y: 184, size: 24 }, { x: 235, y: 215, size: 24 }, { x: 263, y: 215, size: 24 }],
};

export function Blender({ phase, theme, fruitCount, capacity, residueTheme }: BlenderProps) {
  const [blendStep, setBlendStep] = useState<"idle" | "fading" | "rising">("idle");

  const activeTheme = theme ?? residueTheme;
  const lc = getLiquidColor(theme, residueTheme);
  const residueLc = residueTheme ? LIQUID_COLORS[residueTheme] : null;

  useEffect(() => {
    if (phase === "blending") {
      setBlendStep("fading");
      const t = setTimeout(() => setBlendStep("rising"), 380);
      return () => clearTimeout(t);
    } else {
      setBlendStep("idle");
    }
  }, [phase]);

  // residue display removed
  const showFruits = (phase === "filling" || (phase === "blending" && blendStep === "fading")) && activeTheme && fruitCount > 0;
  const showLiquid = phase === "blending" && blendStep === "rising";

  const PITCHER_CLIP = "M 225 240 L 275 240 L 285 140 L 215 140 L 202 135 L 216 152 Z";
  const fruitPositions = FRUIT_POSITIONS[Math.min(fruitCount, 4)] ?? FRUIT_POSITIONS[1];

  return (
    <>
      <style>{`
        @keyframes blenderLidShake {
          0%,100% { transform: rotate(0deg) translateX(0); }
          20% { transform: rotate(-4deg) translateX(-2px); }
          40% { transform: rotate(4deg) translateX(2px); }
          60% { transform: rotate(-3deg) translateX(-1.5px); }
          80% { transform: rotate(3deg) translateX(1.5px); }
        }
        @keyframes blenderBodyVibrate {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes fruitFadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes liquidRiseUp {
          0%   { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes liquidSurface {
          0%,100% { transform: scaleX(1); }
          50%     { transform: scaleX(1.04); }
        }
      `}</style>

      <svg viewBox="130 60 170 260" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="pitcherClip">
            <path d={PITCHER_CLIP} />
          </clipPath>
          {activeTheme && (
            <linearGradient id="blenderLiquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lc.light} stopOpacity="0.9" />
              <stop offset="100%" stopColor={lc.main} stopOpacity="1" />
            </linearGradient>
          )}
        </defs>

        {/* ── Body (vibrate when blending) ── */}
        <g style={{
          animation: phase === "blending" ? "blenderBodyVibrate 0.1s linear infinite" : "none",
          transformOrigin: "250px 220px",
        }}>
          {/* Handle */}
          <path d="M 280 155 C 320 155 315 215 270 225" fill="none" stroke="#7ACCC8" strokeWidth="12" strokeLinecap="round" />

          {/* Pitcher body glass */}
          <path d={PITCHER_CLIP} fill="#E0F7F6" opacity="0.45" />

          {/* ── Fruits inside (filling phase + fading step) ── */}
          {showFruits && fruitPositions.slice(0, fruitCount).map((pos, i) => (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              fontSize={pos.size}
              textAnchor="middle"
              dominantBaseline="middle"
              clipPath="url(#pitcherClip)"
              style={{
                userSelect: "none",
                animation: phase === "blending" && blendStep === "fading"
                  ? `fruitFadeOut 0.38s ease forwards`
                  : "none",
              }}
            >
              {activeTheme ? FRUIT_EMOJI[activeTheme] : ""}
            </text>
          ))}

          {/* ── Rising liquid (blending rising step) ── */}
          {showLiquid && (
            <g clipPath="url(#pitcherClip)">
              {/* Liquid body — rises from bottom */}
              <g style={{
                transformOrigin: "250px 240px",
                animation: "liquidRiseUp 0.65s cubic-bezier(0.2,0.8,0.4,1) forwards",
              }}>
                <rect
                  x="200"
                  y="150"
                  width="90"
                  height="92"
                  fill={activeTheme ? "url(#blenderLiquidGrad)" : "#B2EBF2"}
                />
              </g>
              {/* Surface ripple */}
              <ellipse
                cx="250" cy="152" rx="34" ry="4"
                fill={lc.main} opacity="0.8"
                style={{ animation: "liquidSurface 0.8s ease-in-out infinite" }}
              />
            </g>
          )}

          {/* Pitcher outline */}
          <path d={PITCHER_CLIP} fill="none" stroke="#7ACCC8" strokeWidth="5" strokeLinejoin="round" />

          {/* Glass highlight */}
          <path d="M 228 230 L 222 155" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* Connector rim */}
          <rect x="218" y="236" width="64" height="6" fill="#DBC8B6" rx="2" />

          {/* Base */}
          <path d="M 210 290 L 290 290 L 280 240 L 220 240 Z" fill="#F3E5D8" />
          <rect x="208" y="282" width="84" height="8" fill="#A8A8A8" rx="2" />

          {/* Control panel */}
          <path d="M 235 290 L 265 290 L 265 255 A 15 15 0 0 0 235 255 Z" fill="#6B6B6B" />
          <circle cx="250" cy="268" r="10" fill="#FFFFFF" />
          <circle
            cx="250" cy="268" r="5"
            fill={phase === "blending" ? "#FF9800" : "#A4D8B6"}
            style={{ filter: phase === "blending" ? "drop-shadow(0 0 4px #FF9800)" : "none", transition: "fill 0.3s" }}
          />
          <circle cx="250" cy="284" r="2.5" fill="#FF5C5C" />
        </g>

        {/* ── Lid (shakes when blending) ── */}
        <g style={{
          animation: phase === "blending" ? "blenderLidShake 0.1s linear infinite" : "none",
          transformOrigin: "250px 135px",
        }}>
          <g transform="rotate(-12 250 135)">
            <ellipse cx="250" cy="135" rx="38" ry="6" fill="#CCCCCC" />
            <ellipse cx="250" cy="132" rx="38" ry="6" fill="#E6E6E6" />
            <path d="M 243 132 L 257 132 L 254 120 L 246 120 Z" fill="#B3B3B3" />
          </g>
        </g>

      </svg>
    </>
  );
}
