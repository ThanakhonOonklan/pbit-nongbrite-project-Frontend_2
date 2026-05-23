"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ScrollStackItem } from "@/components/common/ScrollStack";
import type { GameConfig } from "@/constants/courses/gameConfig";
import { gamesConfig } from "@/constants/courses/gameConfig";
import type { OuterContainerProps } from "@/components/common/OuterContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TiltButton } from "react-tilt-button";
import { StarRating, LoadingOverlay } from "@/components/common";
import { FaLock, FaTrophy } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { createGamePath, markGameNavigation } from "@/utils/game-navigation";

// Helper to resolve responsive width/height values
const resolveSize = (
  value: number | ((isMobile: boolean, isTablet: boolean) => number) | undefined,
  isMobile: boolean,
  isTablet: boolean
): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "function") return value(isMobile, isTablet);
  return value;
};

// Helper to resolve responsive position values
const resolvePosition = (
  value: string | ((isMobile: boolean, isTablet: boolean) => string),
  isMobile: boolean,
  isTablet: boolean
): string => {
  if (typeof value === "function") return value(isMobile, isTablet);
  return value;
};

export interface GameCardProps {
  game: GameConfig;
  onLevelSelect?: (level: number) => void;
  // Fix #4: Accept isTablet from parent to avoid per-card resize listeners
  isTablet?: boolean;
  latestLevel?: number;
}

export const GameCard: React.FC<GameCardProps> = React.memo(({ game, onLevelSelect, isTablet = false, latestLevel }) => {
  const router = useRouter();
  const t = useTranslations("Courses");
  const isMobile = useIsMobile();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = React.useCallback((level: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      onLevelSelect?.(level);
    }, 150);
  }, [onLevelSelect]);

  const handleMouseLeave = React.useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  // Fix #4: isTablet is now a prop — no redundant useEffect/listener per card

  const GameIcon = game.icon;

  const outerContainerProps: Partial<OuterContainerProps> = {
    headerText: (
      <span className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
        <GameIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        {t(`Games.${game.id}.title`)}
      </span>
    ),
    headerColor: game.headerColor,
    // Main image
    ...(game.image?.src && {
      imageSrc: game.image.src,
      imageAlt: game.image.alt,
      imageWidth: resolveSize(game.image.width, isMobile, isTablet),
      imageHeight: resolveSize(game.image.height, isMobile, isTablet),
      imageClassName: `absolute ${resolvePosition(game.image.position, isMobile, isTablet)} z-20`,
      imageRotation: game.image.rotation,
    }),
    // Image 1
    ...(game.image1?.src && {
      image1Src: game.image1.src,
      image1Alt: game.image1.alt,
      image1Width: resolveSize(game.image1.width, isMobile, isTablet),
      image1Height: resolveSize(game.image1.height, isMobile, isTablet),
      image1ClassName: `absolute ${resolvePosition(game.image1.position, isMobile, isTablet)} z-20`,
      image1Rotation: game.image1.rotation,
    }),
    // Image 2
    ...(game.image2?.src && {
      image2Src: game.image2.src,
      image2Alt: game.image2.alt,
      image2Width: resolveSize(game.image2.width, isMobile, isTablet),
      image2Height: resolveSize(game.image2.height, isMobile, isTablet),
      image2ClassName: `absolute ${resolvePosition(game.image2.position, isMobile, isTablet)} z-20`,
      image2Rotation: game.image2.rotation,
    }),
    // Image 3
    ...(game.image3?.src && {
      image3Src: game.image3.src,
      image3Alt: game.image3.alt,
      image3Width: resolveSize(game.image3.width, isMobile, isTablet),
      image3Height: resolveSize(game.image3.height, isMobile, isTablet),
      image3ClassName: `absolute ${resolvePosition(game.image3.position, isMobile, isTablet)} z-20`,
      image3Rotation: game.image3.rotation,
    }),
  };

  // Helper to darken a hex color for side/border
  const darkenColor = (hex: string, amount: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
    const b = Math.max(0, (num & 0x0000ff) - amount);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const gameNumber = gamesConfig.findIndex((g) => g.id === game.id) + 1;

  // Helper to get difficulty-based colors
  const getDifficultyColors = (levelNum: number, isLast: boolean) => {
    if (isLast) {
      return {
        surface: "#FFF8E1",
        side: "#B8860B",
        text: "#B8860B",
        border: "#DAA520"
      };
    }
    
    if (levelNum <= 3) {
      // Easy: Original colors
      return {
        surface: "#ffffff",
        side: darkenColor(game.baseColor, 60),
        text: darkenColor(game.baseColor, 80),
        border: darkenColor(game.baseColor, 20)
      };
    } else if (levelNum <= 6) {
      // Medium: Darker colors
      return {
        surface: "#ffffff",
        side: darkenColor(game.baseColor, 90),
        text: darkenColor(game.baseColor, 110),
        border: darkenColor(game.baseColor, 50)
      };
    } else {
      // Hard: Darkest colors
      return {
        surface: "#ffffff",
        side: darkenColor(game.baseColor, 120),
        text: darkenColor(game.baseColor, 140),
        border: darkenColor(game.baseColor, 80)
      };
    }
  };

  return (
    <>
      <ScrollStackItem
        useOuterContainer={true}
        itemClassName="scroll-stack-card"
        outerContainerProps={outerContainerProps}
      >
        <div className="w-full min-h-[200px] flex items-center justify-center py-2 sm:py-4">
          {/* Level Buttons Grid — 3x3 */}
          <div className="grid grid-cols-3 gap-y-5 gap-x-8 sm:gap-y-5 sm:gap-x-20 md:gap-y-6 md:gap-x-28 lg:gap-y-6 lg:gap-x-32">
            {game.levels.map((lvl) => {
              const isLastLevel = lvl.level === game.levels.length;
              const diffColors = getDifficultyColors(lvl.level, isLastLevel);

              if (lvl.isLocked) {
                return (
                  <div key={lvl.level} className="relative flex flex-col items-center">
                    <TiltButton
                      disabled={true}
                      width={isMobile ? 68 : isTablet ? 74 : 80}
                      height={isMobile ? 72 : isTablet ? 78 : 86}
                      elevation={isMobile ? 8 : 10}
                      pressInset={isMobile ? 8 : 10}
                      tilt={1.33}
                      radius={isMobile ? 14 : 16}
                      motion={94}
                      surfaceColor="#f0f0f0"
                      sideColor="#a0a0a0"
                      textColor="#b0b0b0"
                      borderColor="#c0c0c0"
                      borderWidth={isMobile ? 4 : 6}
                      glareColor="#ffffff"
                      glareOpacity={0.2}
                      glareWidth={70}
                    >
                      {isLastLevel ? (
                        <FaTrophy className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      ) : (
                        <FaLock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </TiltButton>
                    <StarRating
                      stars={lvl.stars}
                      size={isMobile ? 16 : 22}
                      animated={true}
                      className="-mt-2"
                    />
                  </div>
                );
              }

              return (
                <div
                  key={lvl.level}
                  className="relative flex flex-col items-center cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(lvl.level)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    const gamePath = createGamePath(game.id, lvl.level);
                    markGameNavigation(gamePath);
                    setIsNavigating(true);
                    router.push(gamePath);
                  }}
                >
                  {lvl.level === latestLevel && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{ 
                        backgroundColor: diffColors.border,
                        zIndex: -1 
                      }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  <TiltButton
                    width={isMobile ? 68 : isTablet ? 74 : 80}
                    height={isMobile ? 72 : isTablet ? 78 : 86}
                    elevation={isMobile ? 8 : 10}
                    pressInset={isMobile ? 8 : 10}
                    tilt={1.33}
                    radius={isMobile ? 14 : 16}
                    motion={94}
                    surfaceColor={diffColors.surface}
                    sideColor={diffColors.side}
                    textColor={diffColors.text}
                    borderColor={diffColors.border}
                    borderWidth={isMobile ? 4 : 6}
                  >
                    {isLastLevel ? (
                      <FaTrophy className="w-5 h-5 sm:w-7 sm:h-7 text-[#DAA520]" />
                    ) : (
                      <span className="text-base sm:text-xl font-bold">{`${gameNumber}-${lvl.level}`}</span>
                    )}
                  </TiltButton>
                  <StarRating
                    stars={lvl.stars}
                    size={isMobile ? 16 : 22}
                    animated={true}
                    className="-mt-2"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollStackItem>
      <LoadingOverlay isLoading={isNavigating} message={t("GameCard.loading")} />
    </>
  );
});

GameCard.displayName = "GameCard";
