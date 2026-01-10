"use client";

import * as React from "react";
import { ScrollStackItem } from "@/components/common/ScrollStack";
import { StarGameButton } from "@/components/common/StarGameButton";
import type { GameConfig } from "@/constants/courses/gameConfig";
import type { OuterContainerProps } from "@/components/common/OuterContainer";
import {
  getButtonStatus,
  getStarsForLevel,
  getWidthClassName,
  getHeightClassName,
  processGameImages,
} from "@/utils/courses";

export interface GameCardProps {
  game: GameConfig;
  isMobile: boolean;
  isTablet: boolean;
  CompletedTooltipContent: React.FC<{ levelNumber: number; gameId: string }>;
  onLevelClick?: (levelNumber: number) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isMobile,
  isTablet,
  CompletedTooltipContent,
  onLevelClick,
}) => {
  const GameIcon = game.icon;

  // Process game images
  const imageProps = processGameImages(game, isMobile, isTablet);

  // Build outerContainerProps
  const outerContainerProps: Partial<OuterContainerProps> = {
    ...imageProps, // Spread image props
    widthClassName: getWidthClassName(isMobile, isTablet),
    heightClassName: getHeightClassName(isMobile, isTablet),
    headerText: (
      <span className="flex items-center gap-2">
        <GameIcon className="w-5 h-5" />
        {game.title}
      </span>
    ),
    headerColor: game.headerColor,
  };

  return (
    <ScrollStackItem
      useOuterContainer={true}
      itemClassName="scroll-stack-card"
      outerContainerProps={outerContainerProps}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
        {Array.from({ length: 9 }).map((_, buttonIndex) => {
          const levelNumber = buttonIndex + 1;
          const status = getButtonStatus(levelNumber);
          const stars =
            status === "completed" ? getStarsForLevel(levelNumber) : 0;
          return (
            <div key={buttonIndex} className="flex items-center justify-center">
              <StarGameButton
                level={levelNumber}
                status={status}
                baseColor={game.baseColor}
                stars={stars}
                tooltipContent={
                  status === "completed" ? (
                    <CompletedTooltipContent
                      levelNumber={levelNumber}
                      gameId={game.id}
                    />
                  ) : undefined
                }
                onClick={() => {
                  // เรียก onLevelClick เฉพาะเมื่อ status ไม่ใช่ "locked"
                  if (status !== "locked" && onLevelClick) {
                    onLevelClick(levelNumber);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </ScrollStackItem>
  );
};
