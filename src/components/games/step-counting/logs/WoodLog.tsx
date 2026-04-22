import React from "react";

export interface WoodLogProps {
  width?: number | string;
  height?: number | string;
  filled?: boolean;
  isOver?: boolean;
  variant?: "normal" | "start" | "finish";
  className?: string;
}

export function WoodLog({
  width = "100%",
  height = "100%",
  filled = false,
  isOver = false,
  variant = "normal",
  className = "",
}: WoodLogProps) {
  // ── Color Palette ──────────────────────────────────────────
  let mainBark = "#8b5a2b";
  let lightBark = "#a06b38";
  let darkBark = "#69421f";

  let mainCore = "#f7d299";
  let lightCore = "#ffeac2";
  let darkCore = "#e0af6b";

  let outline = "#4a2e15";

  // Contextual variations
  if (variant === "start") {
    mainBark = "#5f823f";
    lightBark = "#759f51";
    darkBark = "#435d2c";
    mainCore = "#d6f2b4";
    lightCore = "#f3ffd6";
    darkCore = "#b6d78c";
    outline = "#314420";
  } else if (variant === "finish") {
    mainBark = "#a88124";
    lightBark = "#cda034";
    darkBark = "#82631a";
    mainCore = "#ffeb99";
    lightCore = "#fff6cc";
    darkCore = "#e5c865";
    outline = "#57420f";
  } else if (filled) {
    mainBark = "#7a4e23";
    lightBark = "#8a5b28";
  }

  // Hover interact state
  if (isOver) {
    mainBark = variant === "start" ? "#719c4d" : variant === "finish" ? "#c49830" : "#a8713a";
    lightBark = variant === "start" ? "#8ac05f" : variant === "finish" ? "#eab63d" : "#c48849";
    mainCore = variant === "start" ? "#e6ffd1" : variant === "finish" ? "#fff2b3" : "#ffe3b3";
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 60"
      className={className}
      style={{
        overflow: "visible",
        filter: isOver
          ? "drop-shadow(0px 6px 12px rgba(0,0,0,0.35)) brightness(1.1)"
          : "drop-shadow(0px 3px 6px rgba(0,0,0,0.2))",
        transition: "all 0.2s ease-in-out",
        display: "block",
      }}
      aria-hidden="true"
    >
      {/* ── Drop Shadow ── */}
      <ellipse cx="60" cy="54" rx="50" ry="7" fill="rgba(0,0,0,0.25)" />

      {/* ── Log Base Body (Bark Backing) ── */}
      {/* Draws top edge, right cap right-half arc, bottom edge, left cap right-half arc */}
      <path
        d="M 20 10 L 100 10 A 15 20 0 0 1 100 50 L 20 50 A 15 20 0 0 1 20 10 Z"
        fill={mainBark}
        stroke={outline}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ── Log Body Top Highlight ── */}
      <path
        d="M 20 10 L 100 10 A 15 20 0 0 1 113 20 L 33 20 A 15 20 0 0 0 20 10 Z"
        fill={lightBark}
      />

      {/* ── Log Body Bottom Shadow ── */}
      <path
        d="M 33 40 L 113 40 A 15 20 0 0 1 100 50 L 20 50 A 15 20 0 0 0 33 40 Z"
        fill={darkBark}
      />

      {/* ── Bark Grain Lines ── */}
      <g stroke={outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
        <path d="M 40 15 Q 55 14 70 15" />
        <path d="M 35 25 Q 60 23 85 25" />
        <path d="M 45 35 Q 65 37 90 35" />
        <path d="M 30 46 Q 50 44 70 46" />
        <path d="M 50 20 Q 55 21 60 20" />
        <path d="M 75 30 Q 80 29 88 30" />
        <path d="M 38 41 Q 42 40 46 41" />
      </g>
      <g stroke={darkBark} strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M 45 15 Q 55 14 65 15" />
        <path d="M 45 46 Q 55 45 65 46" />
      </g>

      {/* ── Branch Knots ── */}
      {/* Knot 1 (Top) */}
      <g transform="translate(60, 22) rotate(-5)">
        <ellipse cx="0" cy="0" rx="6" ry="3.5" fill={darkBark} stroke={outline} strokeWidth="1.5" />
        <ellipse cx="0" cy="-0.5" rx="3" ry="1.5" fill={mainBark} />
      </g>
      {/* Knot 2 (Bottom right) */}
      <g transform="translate(80, 38) rotate(10)">
        <ellipse cx="0" cy="0" rx="4" ry="2.5" fill={darkBark} stroke={outline} strokeWidth="1.5" />
      </g>

      {/* ── Left End Face (Cross-section) ── */}
      {/* Base Face */}
      <ellipse cx="20" cy="30" rx="15" ry="20" fill={mainCore} stroke={outline} strokeWidth="2.5" />
      {/* Core Highlight */}
      <ellipse cx="20" cy="30" rx="12" ry="17" fill={lightCore} />
      {/* Pith (Center dot) */}
      <ellipse cx="19" cy="30" rx="2" ry="3" fill={darkCore} />

      {/* Growth Rings */}
      <g fill="none" stroke={darkCore} strokeWidth="1.5" opacity="0.8">
        <ellipse cx="20" cy="30" rx="5" ry="7" />
        <ellipse cx="20" cy="30" rx="8" ry="12" />
        <ellipse cx="20" cy="30" rx="11" ry="16" />
      </g>

      {/* Core Cracks */}
      <path d="M 19 30 L 13 41" stroke={darkCore} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 19 30 L 25 18" stroke={darkCore} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* ── Decorative Extras ── */}
      <g stroke={outline} strokeWidth="1.5" strokeLinejoin="round">
        {/* Leaf 1 (Top right) */}
        <g transform="translate(70, 7) rotate(15)">
          <path d="M 0 0 C 8 -10 15 0 15 0 C 15 0 8 10 0 0 Z" fill="#8CC63F" />
          <path d="M 0 0 L 10 0" strokeLinecap="round" />
        </g>
        {/* Leaf 2 (Bottom left, hanging) */}
        <g transform="translate(40, 48) rotate(-140)">
          <path d="M 0 0 C 6 -8 11 0 11 0 C 11 0 6 8 0 0 Z" fill="#8CC63F" />
          <path d="M 0 0 L 7 0" strokeLinecap="round" />
        </g>
        {/* Small Leaf 3 */}
        <g transform="translate(42, 51) rotate(-100)">
          <path d="M 0 0 C 4 -6 8 0 8 0 C 8 0 4 6 0 0 Z" fill="#78B036" />
        </g>
      </g>
    </svg>
  );
}
