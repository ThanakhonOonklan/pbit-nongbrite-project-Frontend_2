import React from "react";
import { TwemojiIcon } from "./TwemojiIcon";

type MatchingCardProps = {
  emoji: string;
  icon?: string;
  label: string;
  isConnected?: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  className?: string;
  align?: "top" | "bottom";
  nodeRef?: (el: HTMLDivElement | null) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
};

export const MatchingCard = ({
  emoji,
  icon,
  label,
  isConnected = false,
  isCorrect = false,
  compact = false,
  className = "",
  align = "top",
  nodeRef,
  onPointerDown,
}: MatchingCardProps) => {
  const isTop = align === "top";

  // ── State-based styles ──────────────────────────────────
  let cardBg: string;
  let cardBorderColor: string;
  let cardShadow: string;
  let labelColor: string;

  if (isCorrect) {
    cardBg = "#DCFCE7";
    cardBorderColor = "#4ADE80";
    cardShadow = "0 4px 12px rgba(0,0,0,0.08)";
    labelColor = "#15803D";
  } else if (isConnected) {
    cardBg = "#FFF7ED";
    cardBorderColor = "#FDBA74";
    cardShadow = "0 4px 12px rgba(0,0,0,0.08)";
    labelColor = "#C2410C";
  } else {
    cardBg = "#FFFFFF";
    cardBorderColor = "#E5E7EB";
    cardShadow = "0 4px 12px rgba(0,0,0,0.06)";
    labelColor = "#4B5563";
  }

  // ── Sizes ────────────────────────────────────────────────
  let cardWidth = "w-[68px] sm:w-[110px] md:w-[130px]";
  let cardHeight = "h-[76px] sm:h-[115px] md:h-[135px]";
  let emojiSizePx = { base: 38, sm: 58, md: 74 };
  let textSize = "text-[8px] sm:text-[11px] md:text-[12px]";
  let labelHeight = "h-[26px] sm:h-[36px] md:h-[40px]";

  if (compact) {
    cardWidth = "w-[56px] sm:w-[85px] md:w-[100px]";
    cardHeight = "h-[64px] sm:h-[95px] md:h-[115px]";
    emojiSizePx = { base: 30, sm: 46, md: 58 };
    textSize = "text-[7px] sm:text-[9px] md:text-[10px]";
    labelHeight = "h-[22px] sm:h-[30px] md:h-[34px]";
  }
  const scaleClass = isCorrect || isConnected ? "scale-[1.04]" : "hover:scale-[1.02]";
  const shouldPulse = isTop && !isConnected && !isCorrect;

  // ── Anchor Element (The connection dot) ──────────────────
  const anchorEl = (
    <div
      ref={nodeRef}
      onPointerDown={isCorrect ? undefined : onPointerDown}
      style={{
        touchAction: "none",
        background: "#F97316",
        border: "4px solid white",
        boxShadow: shouldPulse ? "0 0 0 3px rgba(253,141,29,0.25)" : "0 1px 3px rgba(0,0,0,0.2)",
      }}
      className={`absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full z-20 flex items-center justify-center transition-transform
        ${isTop
          ? "right-0 translate-x-1/2 top-1/2 -translate-y-1/2 sm:right-auto sm:-translate-x-1/2 sm:top-auto sm:-bottom-3 sm:left-1/2 sm:translate-y-0 cursor-grab active:cursor-grabbing hover:scale-110"
          : "left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-top-3 sm:translate-y-0 cursor-default pointer-events-none"}
        ${shouldPulse ? "animate-pulse" : ""}
      `}
    >
      {isCorrect && (
        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none">
          <path d="M2 6.5l2.5 2.5 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${scaleClass} select-none ${isTop && !isCorrect ? "cursor-grab active:cursor-grabbing" : "cursor-default"} ${className}`}
      draggable={false}
      style={{ WebkitUserDrag: "none", userSelect: "none" } as React.CSSProperties}
      onPointerDown={isCorrect ? undefined : onPointerDown}
    >
      {/* Main Card */}
      <div
        className={`relative z-10 flex flex-col items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl transition-all duration-300 ${cardWidth} ${cardHeight}`}
        style={{ background: cardBg, boxShadow: cardShadow, border: `2px solid ${cardBorderColor}` }}
      >
        {/* Emoji Area */}
        <div className="flex-1 w-full bg-black/5 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner">
          {icon ? (
            <>
              <img src={icon} alt={label} draggable={false} className="drop-shadow-sm block sm:hidden" style={{ width: emojiSizePx.base, height: emojiSizePx.base }} />
              <img src={icon} alt={label} draggable={false} className="drop-shadow-sm hidden sm:block md:hidden" style={{ width: emojiSizePx.sm, height: emojiSizePx.sm }} />
              <img src={icon} alt={label} draggable={false} className="drop-shadow-sm hidden md:block" style={{ width: emojiSizePx.md, height: emojiSizePx.md }} />
            </>
          ) : (
            <>
              <span className="drop-shadow-sm block sm:hidden"><TwemojiIcon emoji={emoji} size={emojiSizePx.base} /></span>
              <span className="drop-shadow-sm hidden sm:block md:hidden"><TwemojiIcon emoji={emoji} size={emojiSizePx.sm} /></span>
              <span className="drop-shadow-sm hidden md:block"><TwemojiIcon emoji={emoji} size={emojiSizePx.md} /></span>
            </>
          )}
        </div>

        {/* Label Area */}
        <div
          className="w-full flex items-center justify-center px-1 mt-1 sm:mt-1.5"
          style={{ minHeight: labelHeight }}
        >
          <span
            className={`font-extrabold tracking-wide ${textSize} text-center leading-tight`}
            style={{ color: labelColor }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Connection Anchor */}
      {anchorEl}
    </div>
  );
};

