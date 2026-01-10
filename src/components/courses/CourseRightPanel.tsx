"use client";

import * as React from "react";
import { DifficultyIndicator } from "@/components/common/DifficultyIndicator";
import { getDifficultyBadgeColor } from "@/utils/level";
import { cn } from "@/lib/utils";
import Carousel from "@/components/courses/CourseCarousel";
import { getGameData } from "@/constants/mocks/gameData";
import { mockMyRankData } from "@/constants/mocks/userData";
import { ResourceBars } from "./ResourceBars";
import { lightenColor } from "@/utils/courses";

export interface CourseRightPanelProps {
  level?: number; // ระดับที่เลือก (1-9)
  difficulty?: number;
  difficultyText?: string;
  className?: string;
  gameDetail?: React.ReactNode;
  heartCount?: number; // ใช้เป็น fallback เท่านั้น (ข้อมูลจริงมาจาก mockMyRankData)
  scoreCount?: number; // ใช้เป็น fallback เท่านั้น (ข้อมูลจริงมาจาก mockMyRankData)
  fireCount?: number; // ใช้เป็น fallback เท่านั้น (ข้อมูลจริงมาจาก mockMyRankData)
  gameTitle?: string;
  gameIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  headerColor?: string; // สี header จาก ScrollStack section ที่กำลังแสดง
}

export const CourseRightPanel: React.FC<CourseRightPanelProps> = ({
  level,
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
  // สี badge ต้องเปลี่ยนตาม difficulty ของ level ที่เลือก ไม่ใช่ตาม headerColor
  const badgeColor = getDifficultyBadgeColor(difficulty);
  const displayLevel = level ?? difficulty ?? 1;
  
  // สีสำหรับ "Level X :" ตาม difficulty
  const levelTextColor = getDifficultyBadgeColor(difficulty);

  // ดึงชื่อเกมจาก gameData ถ้ามี gameTitle
  const gameData = gameTitle ? getGameData(gameTitle) : null;
  const displayTitle = gameData?.title || gameTitle || "Path Navigation";

  // คำนวณสีพื้นหลังที่สว่างขึ้นจาก headerColor (สว่างขึ้น 85% สำหรับ pastel effect)
  const lightenedBgColor = headerColor ? lightenColor(headerColor, 85) : "#F5F5F5";

  // ดึงข้อมูลผู้ใช้ (heartCount, scoreCount, daystate) จาก mockMyRankData
  // ใช้ข้อมูลจาก mockMyRankData หรือ fallback ไปที่ props (เพื่อ backward compatibility)
  const displayHeartCount = mockMyRankData.heartCount ?? heartCount ?? 0;
  const displayScoreCount = mockMyRankData.score ?? scoreCount ?? 0;
  const displayFireCount = mockMyRankData.daystate ?? fireCount ?? 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-5 pb-5 pt-4 mt-10 justify-start",
        className
      )}
    >
      {/* Container หลักสำหรับ Resource Bars และเนื้อหาหลัก */}
      <div className="w-[350px] rounded-[24px] bg-white shadow-sm border border-[#E4E9F2] flex flex-col">
        {/* ส่วน Resource Bars */}
        <ResourceBars
          heartCount={displayHeartCount}
          scoreCount={displayScoreCount}
          daystate={displayFireCount}
        />

        {/* ส่วนเนื้อหาหลัก */}
        <div className="pt-[24px] pb-[32px] px-[24px] flex flex-col gap-[12px]">
          {/* ชื่อเกม */}
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
          <Carousel
            baseWidth={302}
            autoplay
            autoplayDelay={3000}
            pauseOnHover
            loop={false}
          />

          {/* ข้อมูล Level และ Difficulty */}
          <div className="flex items-center justify-between -mt-1">
            <div className="flex items-center gap-2">
              <span 
                className="text-[15px] font-bold"
                style={{
                  color: levelTextColor,
                  transition: "color 0.3s ease",
                }}
              >
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

          {/* พื้นที่แสดงรายละเอียดเกม */}
          <div className="mt-auto rounded-[16px] bg-[#F5FBFF] border border-[#D5E9FF] p-4 min-h-[120px] text-[#325373] text-sm leading-6">
            {gameDetail || null}
          </div>
        </div>
      </div>
    </div>
  );
};

CourseRightPanel.displayName = "CourseRightPanel";