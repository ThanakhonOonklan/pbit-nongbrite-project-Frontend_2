import React from "react";
import type { LoopTheme } from "@/constants/games/step-counting-levels";
import { THEME } from "./constants";


const GLASS_H_PX = 62; // usable fill height inside the SVG

interface GlassProps {
  index: number;
  currentAmount: number;
  currentGlass: number;
  isRunning: boolean;
  theme: LoopTheme;
}

export function Glass({
  index,
  currentAmount,
  currentGlass,
  isRunning,
  theme,
}: GlassProps) {
  const t = THEME[theme];
  // Sequential fill: glass index fills from currentAmount [index → index+1]
  const filled = Math.max(0, Math.min(currentAmount - index, 1));
  const fillPx = Math.round(filled * GLASS_H_PX);
  const isCurrent = isRunning && index === currentGlass && currentAmount <= index + 1;
  const isFull = filled >= 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <div style={{ position: "relative", width: 52, height: 90 }}>
        {/* Glass shape SVG */}
        <svg
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
          viewBox="0 0 52 90"
          width={52}
          height={90}
        >
          {/* Theme-specific decorations (Back layer) */}
          {theme === "juice" && (
            <g>
              {/* Straw */}
              <line x1="36" y1="22" x2="44" y2="4" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="38" y1="18" x2="41" y2="10" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          )}
          {theme === "candle" && (
            <g>
              {/* Wick */}
              <line x1="26" y1="22" x2="26" y2="12" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              {/* Flame when full */}
              {isFull && (
                <g style={{ transformOrigin: "26px 14px", animation: "wobble 1.5s ease-in-out infinite" }}>
                  <path d="M26 0 Q31 6 26 12 Q21 6 26 0 Z" fill="#EF4444" />
                  <path d="M26 4 Q28 8 26 10 Q24 8 26 4 Z" fill="#FBBF24" />
                </g>
              )}
            </g>
          )}
          {theme === "garden" && (
            <g>
              {isFull ? (
                <g style={{ transformOrigin: "26px 20px", animation: "bounce 0.6s ease" }}>
                  {/* Flower */}
                  <path d="M26 22 L26 10" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
                  {/* Petals */}
                  <circle cx="20" cy="10" r="4.5" fill="#F472B6" />
                  <circle cx="32" cy="10" r="4.5" fill="#F472B6" />
                  <circle cx="26" cy="4" r="4.5" fill="#F472B6" />
                  <circle cx="26" cy="16" r="4.5" fill="#F472B6" />
                  {/* Center */}
                  <circle cx="26" cy="10" r="4" fill="#FCD34D" />
                </g>
              ) : (
                <g>
                  {/* Sprout */}
                  <path d="M26 22 L26 14" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
                  <path d="M26 15 Q31 15 31 9 Q26 11 26 15 Z" fill="#4ADE80" />
                  <path d="M26 15 Q21 15 21 9 Q26 11 26 15 Z" fill="#4ADE80" />
                </g>
              )}
            </g>
          )}

          {/* Glass body */}
          <path
            d="M7 20 L7 80 Q7 82 9 82 L43 82 Q45 82 45 80 L45 20 Z"
            fill={t.glassInner}
            stroke={t.glassBorder}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {/* Glass Rim */}
          <path
            d="M5 20 L47 20"
            stroke={t.glassBorder}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* Shine */}
          <line x1="12" y1="25" x2="12" y2="75" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />

          {/* Theme-specific decorations (Front layer) */}
          {theme === "juice" && (
            <g style={{ transform: "translate(-2px, -3px)" }}>
              {/* Orange Slice */}
              <circle cx="10" cy="20" r="10" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
              {/* Inner orange lines */}
              <circle cx="10" cy="20" r="7" fill="transparent" stroke="#FFEDD5" strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="10" y1="13" x2="10" y2="27" stroke="#FFEDD5" strokeWidth="1" />
              <line x1="3" y1="20" x2="17" y2="20" stroke="#FFEDD5" strokeWidth="1" />
            </g>
          )}
        </svg>

        {/* Liquid fill */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 7,
            right: 7,
            height: fillPx,
            maxHeight: GLASS_H_PX,
            borderRadius: "2px 2px 8px 8px",
            background: isCurrent ? t.fillActive : t.fillColor,
            transition: "height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s",
            opacity: fillPx > 0 ? 0.9 : 0,
            boxShadow: fillPx > 0 ? "inset 0 4px 6px rgba(255,255,255,0.4)" : "none",
          }}
        />

        {/* Current glass purple ring */}
        {isCurrent && (
          <div
            style={{
              position: "absolute",
              inset: -3,
              bottom: -1,
              borderRadius: 14,
              border: "2.5px solid #7F77DD",
              animation: "pop 0.2s ease",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Full checkmark */}
        {isFull && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              top: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pop 0.3s ease",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>✓</span>
          </div>
        )}
      </div>
      <div
        style={{
          background: "#fff",
          border: `2px solid ${t.glassBorder}`,
          borderRadius: "50%",
          width: 26,
          height: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 900,
          color: t.ratioText,
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          marginTop: 4,
        }}
      >
        {index + 1}
      </div>
    </div>
  );
}

export function MiniGlass({ fill, border, color }: { fill: number; border: string; color: string }) {
  const h = Math.round(11 * fill);
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" style={{ flexShrink: 0 }}>
      <path
        d="M3 2 L3 26 Q3 27 4 27 L18 27 Q19 27 19 26 L19 2 Z"
        fill="none"
        stroke={border}
        strokeWidth="1.8"
      />
      {h > 0 && (
        <rect x="4" y={27 - 2 - h} width="14" height={h} rx="2" fill={color} opacity="0.85" />
      )}
    </svg>
  );
}
