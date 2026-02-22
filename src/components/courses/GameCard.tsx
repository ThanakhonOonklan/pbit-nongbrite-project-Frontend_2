"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScrollStackItem } from "@/components/common/ScrollStack";
import type { GameConfig } from "@/constants/courses/gameConfig";
import type { OuterContainerProps } from "@/components/common/OuterContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TiltButton } from "react-tilt-button";
import { GameTooltip, StarRating } from "@/components/common";
import { FaLock } from "react-icons/fa";

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
  selectedLevel?: number;
  onLevelSelect?: (level: number) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, selectedLevel, onLevelSelect }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  const GameIcon = game.icon;

  const outerContainerProps: Partial<OuterContainerProps> = {
    headerText: (
      <span className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
        <GameIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        {game.title}
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

  const surfaceColor = game.baseColor;
  const sideColor = darkenColor(game.baseColor, 30);
  const borderColor = darkenColor(game.baseColor, 20);

  return (
    <ScrollStackItem
      useOuterContainer={true}
      itemClassName="scroll-stack-card"
      outerContainerProps={outerContainerProps}
    >
      <div className="w-full min-h-[200px] flex items-center justify-center py-4">
        {/* Level Buttons Grid — 3x3 */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-10 sm:gap-y-6 sm:gap-x-32 lg:gap-y-6 lg:gap-x-32">
          {game.levels.map((lvl) => {
            const isActive = activeLevel === lvl.level;

            if (lvl.isLocked) {
              return (
                <div key={lvl.level} className="relative flex flex-col items-center">
                  <StarRating
                    stars={lvl.stars}
                    size={isMobile ? 16 : 18}
                    animated={true}
                    className="mb-1"
                  />
                  <TiltButton
                    disabled={true}
                    width={isMobile ? 60 : isTablet ? 70 : 80}
                    height={isMobile ? 64 : isTablet ? 74 : 86}
                    elevation={10}
                    pressInset={10}
                    tilt={1.33}
                    radius={16}
                    motion={94}
                    surfaceColor={surfaceColor}
                    sideColor={sideColor}
                    textColor="#ffffff"
                    borderColor={borderColor}
                    borderWidth={3}
                    glareColor="#ffffff"
                    glareOpacity={0.2}
                    glareWidth={70}
                  >
                    <FaLock className="w-4 h-4 text-white/80" />
                  </TiltButton>
                </div>
              );
            }

            return (
              <div
                key={lvl.level}
                className="relative flex flex-col items-center"
                onMouseEnter={() => {
                  setActiveLevel(lvl.level);
                  onLevelSelect?.(lvl.level);
                }}
              >

                <StarRating
                  stars={lvl.stars}
                  size={isMobile ? 16 : 18}
                  animated={true}
                  className="mb-1"
                />
                <TiltButton
                  width={isMobile ? 60 : isTablet ? 70 : 80}
                  height={isMobile ? 64 : isTablet ? 74 : 86}
                  elevation={10}
                  pressInset={10}
                  tilt={1.33}
                  radius={16}
                  motion={94}
                  surfaceColor={surfaceColor}
                  sideColor={sideColor}
                  textColor="#ffffff"
                  borderColor={borderColor}
                  borderWidth={3}
                  glareColor="#ffffff"
                  glareOpacity={0.2}
                  glareWidth={70}
                >
                  <span className="text-xl font-bold">{lvl.level}</span>
                </TiltButton>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollStackItem>
  );
};
