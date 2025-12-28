"use client";

import * as React from "react";
import { DifficultyIndicator } from "@/components/common/DifficultyIndicator";
import { getDifficultyBadgeColor } from "@/utils/level";
import { cn } from "@/lib/utils";
import Carousel from "@/components/courses/CourseCarousel";
import { Container, Divider, PrimaryButton, Image } from "@/components/common";
import { getGameData } from "@/constants/mocks/gameData";
import { getUserData } from "@/constants/mocks/userData";

// Helper function to lighten a color (make it lighter/pastel)
const lightenColor = (color: string, percent: number = 50): string => {
  // Remove # if present
  const hex = color.replace("#", "");
  
  // Parse RGB
  const num = parseInt(hex, 16);
  const R = (num >> 16) & 255;
  const G = (num >> 8) & 255;
  const B = num & 255;
  
  // Lighten by blending with white
  // percent = 0 means no change, percent = 100 means pure white
  const factor = percent / 100;
  const newR = Math.round(R + (255 - R) * factor);
  const newG = Math.round(G + (255 - G) * factor);
  const newB = Math.round(B + (255 - B) * factor);
  
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export interface CourseRightPanelProps {
  levelTitle?: string;
  difficulty?: number;
  difficultyText?: string;
  className?: string;
  gameDetail?: React.ReactNode;
  heartCount?: number;
  scoreCount?: number;
  fireCount?: number;
  gameTitle?: string;
  gameIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  headerColor?: string; // สี header จาก ScrollStack section ที่กำลังแสดง
}

export const CourseRightPanel: React.FC<CourseRightPanelProps> = ({
  levelTitle,
  difficulty = 1,
  difficultyText,
  className,
  gameDetail,
  heartCount,
  scoreCount,
  fireCount,
  gameTitle,
  gameIcon: GameIcon,
  headerColor,
}) => {
  // Use headerColor if provided, otherwise use default difficulty badge color
  const badgeColor = headerColor || getDifficultyBadgeColor(difficulty);
  const displayLevel = difficulty ?? 1;

  // Get game title from gameData if gameTitle is provided
  const gameData = gameTitle ? getGameData(gameTitle) : null;
  const displayTitle = gameData?.title || gameTitle || "Path Navigation";

  // Calculate lightened background color from headerColor (85% lighter for pastel effect)
  const lightenedBgColor = headerColor ? lightenColor(headerColor, 85) : "#F5F5F5";

  // Get user data (heartCount, scoreCount, fireCount) from userData
  const userData = getUserData();
  
  // Use data from userData, or fallback to props (backward compatible)
  const displayHeartCount = userData?.heartCount ?? heartCount ?? 0;
  const displayScoreCount = userData?.scoreCount ?? scoreCount ?? 0;
  const displayFireCount = userData?.fireCount ?? fireCount ?? 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-5 pb-5 pt-4 mt-10 justify-start",
        className
      )}
    >
      {/* Combined Container with Resource Bars and Main Content */}
      <div className="w-[350px] rounded-[24px] bg-white shadow-sm border border-[#E4E9F2] flex flex-col">
        {/* Resource Bars Section */}
        {(displayHeartCount > 0 ||
          displayScoreCount > 0 ||
          displayFireCount > 0) && (
          <>
            <div className="py-4 px-3 flex flex-col gap-4">
              <div className="flex items-center gap-1.5 w-full">
                <PrimaryButton
                  variant="default"
                  size="sm"
                  disabled
                  className="bg-gray-300 text-gray-600 border-gray-400 shadow-none cursor-not-allowed flex-1 min-w-0 max-w-full"
                >
                  <Image
                    src="/icons/game/key.svg" 
                    alt="key" 
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                  {displayHeartCount}
                </PrimaryButton>
                <PrimaryButton
                  variant="default"
                  size="sm"
                  disabled
                  className="bg-gray-300 text-gray-600 border-gray-400 shadow-none cursor-not-allowed flex-1 min-w-0 max-w-full"
                >
                  <Image
                    src="/icons/game/gem.svg"
                    alt="Score" 
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                  {displayScoreCount}
                </PrimaryButton>
                <PrimaryButton
                  variant="default"
                  size="sm"
                  disabled
                  className="bg-gray-300 text-gray-600 border-gray-400 shadow-none cursor-not-allowed flex-1 min-w-0 max-w-full"
                >
                  <Image
                    src="/icons/game/daystreak.svg"
                    alt="daystreak"  
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                  {displayFireCount}
                </PrimaryButton>
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* Main Content Section */}
        <div className="pt-[24px] pb-[32px] px-[24px] flex flex-col gap-[12px]">
          {/* Game Title */}
          <div className="flex items-center justify-between -mt-1">
            <div 
              className="flex items-center gap-2 px-3 py-1 rounded-lg"
              style={{ 
                backgroundColor: lightenedBgColor,
                transition: "background-color 0.3s ease-in-out"
              }}
            >
              {GameIcon && (
                <GameIcon
                  className="w-5 h-5"
                  style={{ 
                    color: headerColor || "#3C3C3C",
                    transition: "color 0.3s ease-in-out"
                  }}
                />
              )}
              <span 
                className="text-[17px] font-bold drop-shadow-sm"
                style={{ 
                  color: headerColor || "#3C3C3C",
                  transition: "color 0.3s ease-in-out"
                }}
              >
                {displayTitle}
              </span>
            </div>
          </div>

          {/* Carousel */}
          <Container className="flex flex-col items-center -mt-2 rounded-[24px]">
            <Carousel
              baseWidth={302}
              autoplay
              autoplayDelay={3000}
              pauseOnHover
              loop={false}
            />
          </Container>

          {/* Level Info and Difficulty */}
          <div className="flex items-center justify-between -mt-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-[#3C3C3C]">
                {`Level ${displayLevel} :`}
              </span>
              <DifficultyIndicator
                level={difficulty}
                inactiveColor="#E3F2FD"
                barWidth="14px"
                barHeight="28px"
                gap="5px"
              />
            </div>
            <div
              className="flex items-center gap-1 px-3 py-1 rounded-full shadow-sm"
              style={{
                backgroundColor: badgeColor,
                transition: "background-color 0.3s ease",
              }}
            >
              <span className="text-[14px] font-bold text-white">
                {difficultyText}
              </span>
            </div>
          </div>

          {/* Game Detail Area */}
          <div className="mt-auto rounded-[16px] bg-[#F5FBFF] border border-[#D5E9FF] p-4 min-h-[120px] text-[#325373] text-sm leading-6">
            {gameDetail || null}
          </div>
        </div>
      </div>
    </div>
  );
};

CourseRightPanel.displayName = "CourseRightPanel";

