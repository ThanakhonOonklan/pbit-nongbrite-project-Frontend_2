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
}

export const MainContentForm: React.FC<MainContentFormProps> = ({
  difficulty = 1,
  difficultyText,
  className,
}) => {
  const badgeColor = getDifficultyBadgeColor(difficulty);
  const displayLevel = difficulty ?? 1;

  return (
    <div
      className={cn(
        "w-[350px] h-auto py-[32px] px-[24px] flex flex-col gap-[24px] rounded-[24px] bg-white shadow-sm border border-[#E4E9F2]",
        className
      )}
    >
      {/* Level Info Box */}
      <div className="w-full">
        {/* Level Title */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[15px] font-bold text-[#3C3C3C] drop-shadow-sm">
            Path Navigation
          </span>
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between mb-1 -mt-1">
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
      </div>

      <div className="relative h-[320px] flex flex-col items-start justify-center ">
        <Carousel
          baseWidth={300}
          autoplay
          autoplayDelay={3000}
          pauseOnHover
          loop
        />

        <div className="rounded-[16px] bg-[#F5FBFF] border border-[#D5E9FF] p-4 text-[#325373] text-sm leading-6 ">
          ----------------------------------------
        </div>
      </div>
    </div>
  );
};

MainContentForm.displayName = "MainContentForm";
