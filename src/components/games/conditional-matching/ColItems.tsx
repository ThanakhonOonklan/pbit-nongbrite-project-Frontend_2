import React from "react";
import { MatchingCard } from "./MatchingCard";
import type { MatchItem } from "@/constants/games/conditional-matching-levels";

export const TopRowItem = ({
  item,
  isConnected,
  isCorrect,
  compact,
  index,
  onNodeRef,
  onPointerDown,
}: {
  item: MatchItem;
  isConnected: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  index?: number;
  onNodeRef: (el: HTMLDivElement | null) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div 
      className="flex flex-col items-center z-20 opacity-0 animate-card-pop"
      style={{ animationDelay: `${(index || 0) * 0.05}s` }}
    >
      <MatchingCard
        emoji={item.emoji}
        icon={item.icon}
        label={item.label}
        isConnected={isConnected}
        isCorrect={isCorrect}
        compact={compact}
        align="top"
        nodeRef={onNodeRef}
        onPointerDown={onPointerDown}
      />
    </div>
  );
};

export const BottomRowItem = ({
  item,
  isConnected,
  isError,
  isCorrect,
  compact,
  index,
  onNodeRef,
  onPointerDown,
}: {
  item: MatchItem;
  isConnected: boolean;
  isError?: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  index?: number;
  onNodeRef: (el: HTMLDivElement | null) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div 
      className={`flex flex-col items-center z-20 opacity-0 animate-card-pop transition-transform ${isError ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
      style={{ animationDelay: `${((index || 0) + 0.5) * 0.05}s` }}
    >
      <MatchingCard
        emoji={item.emoji}
        icon={item.icon}
        label={item.label}
        isConnected={isConnected}
        isCorrect={isCorrect}
        compact={compact}
        align="bottom"
        nodeRef={onNodeRef}
        onPointerDown={onPointerDown}
      />
    </div>
  );
};
