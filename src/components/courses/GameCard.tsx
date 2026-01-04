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
  getImageSize,
  getImagePosition,
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

  // Calculate image dimensions
  const getImageDimensions = (
    imageConfig: GameConfig["image"]
  ): { width: number; height: number } => {
    const width =
      typeof imageConfig.width === "function"
        ? imageConfig.width(isMobile, isTablet)
        : imageConfig.width || getImageSize(isMobile, isTablet);
    const height =
      typeof imageConfig.height === "function"
        ? imageConfig.height(isMobile, isTablet)
        : imageConfig.height || width;
    return { width, height };
  };

  // Parse position string into left and top
  const parsePosition = (position: string): { left: string; top: string } => {
    const parts = position.split(" ");
    const left = parts.find((p) => p.startsWith("left-")) || "left-[0px]";
    const top = parts.find((p) => p.startsWith("-top-")) || "-top-[0px]";
    return { left, top };
  };

  // Main image config
  const mainImage = getImageDimensions(game.image);
  const mainPosition = parsePosition(game.image.position);

  // Build outerContainerProps
  const outerContainerProps: Partial<OuterContainerProps> = {
    widthClassName: getWidthClassName(isMobile, isTablet),
    heightClassName: getHeightClassName(isMobile, isTablet),
    headerText: (
      <span className="flex items-center gap-2">
        <GameIcon className="w-5 h-5" />
        {game.title}
      </span>
    ),
    headerColor: game.headerColor,
    imageSrc: game.image.src,
    imageAlt: game.image.alt,
    imageWidth: mainImage.width,
    imageHeight: mainImage.height,
    imagePosition: getImagePosition(mainPosition.left, mainPosition.top, isMobile, isTablet),
    imageRotation: game.image.rotation || 0,
  };

  // Add image1 if exists
  if (game.image1) {
    const image1Dims = getImageDimensions(game.image1);
    const image1Position = parsePosition(game.image1.position);
    outerContainerProps.image1Src = game.image1.src;
    outerContainerProps.image1Alt = game.image1.alt;
    outerContainerProps.image1Width = image1Dims.width;
    outerContainerProps.image1Height = image1Dims.height;
    outerContainerProps.image1Position = getImagePosition(
      image1Position.left,
      image1Position.top,
      isMobile,
      isTablet
    );
    outerContainerProps.image1Rotation = game.image1.rotation || 0;
  }

  // Add image2 if exists
  if (game.image2) {
    const image2Dims = getImageDimensions(game.image2);
    const image2Position = parsePosition(game.image2.position);
    outerContainerProps.image2Src = game.image2.src;
    outerContainerProps.image2Alt = game.image2.alt;
    outerContainerProps.image2Width = image2Dims.width;
    outerContainerProps.image2Height = image2Dims.height;
    outerContainerProps.image2Position = getImagePosition(
      image2Position.left,
      image2Position.top,
      isMobile,
      isTablet
    );
    outerContainerProps.image2Rotation = game.image2.rotation || 0;
  }

  // Add image3 if exists
  if (game.image3) {
    const image3Dims = getImageDimensions(game.image3);
    const image3Position = parsePosition(game.image3.position);
    outerContainerProps.image3Src = game.image3.src;
    outerContainerProps.image3Alt = game.image3.alt;
    outerContainerProps.image3Width = image3Dims.width;
    outerContainerProps.image3Height = image3Dims.height;
    outerContainerProps.image3Position = getImagePosition(
      image3Position.left,
      image3Position.top,
      isMobile,
      isTablet
    );
    outerContainerProps.image3Rotation = game.image3.rotation || 0;
  }

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
          const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
          return (
            <div key={buttonIndex} className="flex items-center justify-center">
              <StarGameButton
                level={levelNumber}
                status={status}
                baseColor={game.baseColor}
                stars={stars}
                tooltipContent={
                  status === "completed"
                    ? <CompletedTooltipContent levelNumber={levelNumber} gameId={game.id} />
                    : undefined
                }
                onClick={(e) => {
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

