"use client";

import * as React from "react";
import { DifficultyIndicator } from "@/components/common/DifficultyIndicator";
import { getDifficultyBadgeColor } from "@/utils/level";
import { cn } from "@/lib/utils";
import Carousel from "@/components/courses/CourseCarousel";

export interface MainContentFormProps {
  levelTitle?: string;
  difficulty?: number;
  difficultyText?: string;
  className?: string;
  gameDetail?: React.ReactNode;
}

export const MainContentForm: React.FC<MainContentFormProps> = ({
  levelTitle,
  difficulty = 1,
  difficultyText,
  className,
  gameDetail,
}) => {
  const badgeColor = getDifficultyBadgeColor(difficulty);
  const displayLevel = difficulty ?? 1;

  return (
    <div
      className={cn(
        "w-[350px] h-[500px] pt-[24px] pb-[32px] px-[24px] flex flex-col gap-[12px] rounded-[24px] bg-white shadow-sm border border-[#E4E9F2]",
        className
      )}
    >
      {/* Carousel at the top */}
      <div className="flex flex-col items-center -mt-2">
        <Carousel
          baseWidth={302}
          autoplay
          autoplayDelay={3000}
          pauseOnHover
          loop={false}
        />
      </div>

      {/* Path Navigation Title */}
      <div className="flex items-center justify-between -mt-1">
        <span className="text-[15px] font-bold text-[#3C3C3C] drop-shadow-sm">
          Path Navigation
        </span>
      </div>

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
  );
};

MainContentForm.displayName = "MainContentForm";
