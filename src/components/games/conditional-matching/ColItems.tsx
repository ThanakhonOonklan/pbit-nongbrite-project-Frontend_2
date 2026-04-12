import React from "react";
import { MatchingCard } from "./MatchingCard";
import type { MatchItem } from "@/constants/games/conditional-matching-levels";
import { KeyRound, Lock, LockOpen, Check } from "lucide-react";

export const LeftColItem = ({
  item,
  isConnected,
  isCorrect,
  compact,
  onNodeRef,
  onPointerDown,
}: {
  item: MatchItem;
  isConnected: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  onNodeRef: (el: HTMLDivElement | null) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}) => {
  const nodeSize = compact
    ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
    : "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10";

  const iconSize = compact ? 13 : 16;
  const gap = compact ? "gap-1 sm:gap-1.5 md:gap-2" : "gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-4";

  return (
    <div className={`flex flex-row items-center z-20 opacity-100 ${gap}`}>
      <MatchingCard
        emoji={item.emoji}
        label={item.label}
        isConnected={isConnected}
        isCorrect={isCorrect}
        compact={compact}
        align="left"
      />
      {/* Source Node (Right of card) - Key */}
      <div
        ref={onNodeRef}
        onPointerDown={isCorrect ? undefined : onPointerDown}
        style={{ touchAction: "none" }}
        className={`flex items-center justify-center rounded-full shadow-md transition-all duration-300 touch-none z-30 shrink-0 ${nodeSize}
                   ${
                     isCorrect
                       ? "bg-[#4ade80] border-[3px] border-[#d1fae5] text-white cursor-default scale-110"
                       : isConnected
                       ? "bg-[#ffb356] border-[3px] border-[#fff6e5] text-white cursor-grab active:cursor-grabbing hover:scale-110"
                       : "bg-white border-[3px] border-[#ffb356] text-[#ffb356] cursor-grab active:cursor-grabbing hover:scale-110"
                   }`}
      >
        {isCorrect
          ? <Check size={iconSize} strokeWidth={3} />
          : <KeyRound size={iconSize} strokeWidth={2.5} />}
      </div>
    </div>
  );
};

export const RightColItem = ({
  item,
  isConnected,
  isError,
  isCorrect,
  compact,
  onNodeRef,
}: {
  item: MatchItem;
  isConnected: boolean;
  isError?: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  onNodeRef: (el: HTMLDivElement | null) => void;
}) => {
  const nodeSize = compact
    ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
    : "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10";

  const iconSize = compact ? 13 : 16;
  const gap = compact ? "gap-1 sm:gap-1.5 md:gap-2" : "gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-4";

  return (
    <div className={`flex flex-row items-center z-20 opacity-100 transition-transform ${gap} ${isError ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
      {/* Target Node (Left of card) - Lock */}
      <div
        ref={onNodeRef}
        className={`flex items-center justify-center rounded-full shadow-md transition-all duration-300 z-30 shrink-0 ${nodeSize}
                   ${isError ? "bg-red-500 border-red-200 text-white"
                     : isCorrect ? "bg-[#4ade80] border-[3px] border-[#fff6e5] text-white scale-110"
                     : isConnected ? "bg-[#ffb356] border-[3px] border-[#fff6e5] text-white"
                     : "bg-gray-100 border-[3px] border-gray-300 text-gray-400"}`}
      >
        {isCorrect
          ? <LockOpen size={iconSize} strokeWidth={2.5} />
          : <Lock size={iconSize} strokeWidth={2.5} />}
      </div>
      <MatchingCard
        emoji={item.emoji}
        label={item.label}
        isConnected={isConnected}
        isCorrect={isCorrect}
        compact={compact}
        align="right"
      />
    </div>
  );
};
