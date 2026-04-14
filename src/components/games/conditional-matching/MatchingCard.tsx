import React from "react";

type MatchingCardProps = {
  emoji: string;
  label: string;
  isConnected?: boolean;
  isCorrect?: boolean;
  compact?: boolean;
  className?: string;
  align?: "left" | "right";
};

export const MatchingCard = ({
  emoji,
  label,
  isConnected = false,
  isCorrect = false,
  compact = false,
  className = "",
  align = "left",
}: MatchingCardProps) => {

  const boxClasses = [
    "flex flex-col items-center justify-center border-2 rounded-2xl shadow-sm transition-all duration-300",
    compact
      ? "px-1.5 pt-1.5 pb-1 gap-0.5 min-w-[58px] sm:min-w-[76px] md:min-w-[96px] lg:min-w-[110px]"
      : "px-2.5 pt-2 pb-1.5 gap-0.5 sm:px-4 sm:pt-3 sm:pb-2 sm:gap-1 md:px-5 md:pt-3.5 md:pb-2.5 min-w-[76px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[135px]",
    isCorrect
      ? "bg-[#f0fdf4] border-[#4ade80] shadow-md shadow-green-100 scale-105"
      : isConnected
      ? "bg-[#fffcf5] border-[#ffb356] shadow-md shadow-orange-100 scale-105"
      : "bg-white border-gray-300 hover:border-gray-400",
  ].join(" ");

  const emojiClasses = compact
    ? "text-2xl sm:text-3xl md:text-4xl drop-shadow-sm shrink-0 leading-none"
    : "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] drop-shadow-sm shrink-0 leading-none";

  const textClasses = compact
    ? "font-semibold text-[9px] sm:text-[10px] md:text-xs text-gray-500 whitespace-nowrap text-center"
    : "font-medium text-[10px] sm:text-xs md:text-sm text-gray-500 whitespace-nowrap text-center";

  return (
    <div 
      className={`${isCorrect ? "cursor-default" : "cursor-pointer"} select-none ${className}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserDrag: 'none', userSelect: 'none' } as React.CSSProperties}
    >
      <div className={boxClasses}>
        <span className={emojiClasses} style={{ WebkitUserDrag: 'none' } as React.CSSProperties}>{emoji}</span>
        <span className={textClasses}>{label}</span>
      </div>
    </div>
  );
};
