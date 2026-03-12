"use client";

import * as React from "react";
import { DifficultyIndicator } from "@/components/common/DifficultyIndicator";
import { getDifficultyBadgeColor } from "@/utils/level";
import { cn } from "@/lib/utils";
import Carousel from "@/components/courses/CourseCarousel";
import { getGameData } from "@/constants/mocks/gameData";
import { ResourceBars } from "./ResourceBars";
import { useUserStore } from "@/store/user.store";
import { lightenColor, getCarouselItemsForGame } from "@/utils/courses";
import { Container } from "@/components/common";
import { gamesConfig } from "@/constants/courses/gameConfig";

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
  gameIcon?: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  headerColor?: string; // สี header จาก ScrollStack section ที่กำลังแสดง
  gameId?: string; // ID ของเกมที่กำลัง active
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
  gameId,
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
  const lightenedBgColor = headerColor
    ? lightenColor(headerColor, 85)
    : "#F5F5F5";

  // ดึงข้อมูลผู้ใช้จาก user store (ข้อมูลจริงจาก API)
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  React.useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const displayHeartCount = user?.life?.lifeCurrent ?? 0;
  const displayScoreCount = user?.stats?.totalScore ?? 0;
  const displayFireCount = user?.streaks?.currentStreak ?? 0;

  // สร้าง carousel items ตาม gameId
  const carouselItems = React.useMemo(() => {
    if (gameId) {
      return getCarouselItemsForGame(gameId);
    }
    return [];
  }, [gameId]);

  // ดึง description จาก gamesConfig ตาม gameId
  const gameDescription = React.useMemo(() => {
    if (gameId) {
      const game = gamesConfig.find((g) => g.id === gameId);
      return game?.description || null;
    }
    return null;
  }, [gameId]);

  // สีพื้นหลังของกล่องรายละเอียดเกม (pastel จาก headerColor)
  const detailBgColor = headerColor
    ? lightenColor(headerColor, 90)
    : "#F5FBFF";
  const detailBorderColor = headerColor
    ? lightenColor(headerColor, 70)
    : "#D5E9FF";
  const detailTextColor = headerColor
    ? lightenColor(headerColor, 0)
    : "#325373";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-5 pb-5 pt-4 mt-10 justify-start",
        className
      )}
    >
      {/* Container หลักสำหรับ Resource Bars และเนื้อหาหลัก */}
      <Container
        as="div"
        variant="default"
        className="w-[350px] flex flex-col"
      >
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
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              {GameIcon && (
                <GameIcon
                  className="w-5 h-5"
                  style={{
                    color: headerColor || "#3C3C3C",
                    transition: "color 0.3s ease-in-out",
                  }}
                />
              )}
              <span
                className="text-[17px] font-bold drop-shadow-sm"
                style={{
                  color: headerColor || "#3C3C3C",
                  transition: "color 0.3s ease-in-out",
                }}
              >
                {displayTitle}
              </span>
            </div>
          </div>

          {/* Carousel */}
          <Carousel
            items={carouselItems}
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
          <div
            className="mt-auto rounded-[16px] p-4 min-h-[120px] text-sm leading-6 transition-all duration-300"
            style={{
              backgroundColor: detailBgColor,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: detailBorderColor,
              color: detailTextColor,
            }}
          >
            {gameDescription || gameDetail || null}
          </div>
        </div>
      </Container>
    </div>
  );
};

CourseRightPanel.displayName = "CourseRightPanel";
