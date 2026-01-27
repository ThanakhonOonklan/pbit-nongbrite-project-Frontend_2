"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ScrollStackItem } from "@/components/common/ScrollStack";
import { PrimaryButton, type PrimaryButtonProps } from "@/components/common";
import { FaStar } from "react-icons/fa";
import type { GameConfig } from "@/constants/courses/gameConfig";
import type { OuterContainerProps } from "@/components/common/OuterContainer";

export interface GameCardProps {
  game: GameConfig;
}

// Function to map headerColor to PrimaryButton variant
const getButtonVariant = (headerColor?: string): string => {
  if (!headerColor) return "default";
  
  const colorMap: Record<string, string> = {
    "sky-blue": "sky-blue",
    "#1CB0F6": "sky-blue",
    "#FB96BB": "illusion",
    "#FFB356": "texas-rose",
    "#9956DE": "amethyst",
    "#6ED1CF": "downy",
    "#FF8B8B": "mona-lisa",
    "#FFD700": "yellow",
  };
  
  return colorMap[headerColor] || "default";
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();
  const GameIcon = game.icon;

  const outerContainerProps: Partial<OuterContainerProps> = {
    headerText: (
      <span className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
        <GameIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        {game.title}
      </span>
    ),
    headerColor: game.headerColor,
  };

  const buttonVariant = getButtonVariant(game.headerColor) as PrimaryButtonProps["variant"];

  const handleLevelClick = (levelNumber: number) => {
    router.push(`/games/${game.id}/${levelNumber}`);
  };

  return (
    <ScrollStackItem
      useOuterContainer={true}
      itemClassName="scroll-stack-card"
      outerContainerProps={outerContainerProps}
    >
      <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 pt-4 sm:pt-6 md:pt-8 p-2 sm:p-3 md:p-4 lg:p-6 w-full min-h-[400px] items-center justify-center">
        {Array.from({ length: 9 }).map((_, buttonIndex) => {
          const levelNumber = buttonIndex + 1;
          
          return (
            <PrimaryButton
              key={buttonIndex}
              variant={buttonVariant}
              size="sm"
              onClick={() => handleLevelClick(levelNumber)}
              aria-label={`Level ${levelNumber} - ${game.title}`}
              className="grid grid-rows-2 items-center justify-center gap-1 w-auto min-w-[60px] aspect-square mx-auto"
            >
              <div className="grid grid-cols-3 items-center justify-center gap-0.5">
                {[1, 2, 3].map((star) => (
                  <FaStar
                    key={star}
                    className="w-3 h-3 text-white"
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{levelNumber}</span>
            </PrimaryButton>
          );
        })}
      </div>
    </ScrollStackItem>
  );
};
