"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Divider } from "@/components/common";
import { ResourceCard } from "./ResourceCard";
import { HeartPlus, BookOpen, Flame, Heart } from "lucide-react";

export interface ResourceBarsProps {
  heartCount?: number;
  scoreCount?: number;
  daystate?: number;
  className?: string;
  showDivider?: boolean;
}

export const ResourceBars: React.FC<ResourceBarsProps> = ({
  heartCount = 0,
  scoreCount = 0,
  daystate = 0,
  className,
  showDivider = true,
}) => {
  // console.log("[ResourceBars] props:", { heartCount, scoreCount, daystate });

  if (heartCount <= 0 && scoreCount <= 0 && daystate <= 0) {
    // console.log("[ResourceBars] All values are 0, returning null");
    return null;
  }

  const isFull = heartCount >= 5;

  return (
    <>
      <div className={cn("py-4 px-3", className)}>
        <div className="grid grid-cols-3 gap-3">
          <ResourceCard
            icon={<HeartPlus className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF6B6B]" />}
            iconAlt="หัวใจ"
            value={heartCount}
            iconBgColor="bg-[#FFD7D0]"
            hoverColor="hover:bg-[#FFE4E1]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">หัวใจ</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Heart
                      key={i}
                      className="w-5 h-5"
                      fill={i < heartCount ? "#FF6B6B" : "transparent"}
                      color={i < heartCount ? "#FF6B6B" : "#555"}
                    />
                  ))}
                </div>
                <p className="text-[13px] text-gray-600 font-medium">
                  {isFull
                    ? "หัวใจคุณเต็มทุกดวงแล้ว เรียนรู้ต่อไป อย่าได้ถอย"
                    : `เหลือหัวใจ ${heartCount} จาก 5 ดวง`}
                </p>

              </div>
            }
          />
          <ResourceCard
            icon={<BookOpen className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FFB800]" />}
            iconAlt="คะแนน"
            value={scoreCount}
            iconBgColor="bg-[#FFEECC]"
            hoverColor="hover:bg-[#FFF9E6]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">คะแนนรวมตอนนี้!</span>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#FFB800]" />
                  <span className="text-2xl font-bold text-[#FFB800]">{scoreCount}</span>
                </div>
                <p className="text-[13px] text-gray-600 font-medium">
                  คะแนนสะสมจากการเล่นเกมทั้งหมด
                </p>

              </div>
            }
          />
          <ResourceCard
            icon={<Flame className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FF8C00]" />}
            iconAlt="วันที่ติดต่อกัน"
            value={daystate}
            iconBgColor="bg-[#FFE4CC]"
            hoverColor="hover:bg-[#FFF0E0]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">วันที่ติดต่อกัน</span>
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-[#FF8C00]" />
                  <span className="text-2xl font-bold text-[#FF8C00]">{daystate} วัน</span>
                </div>
                <p className="text-[13px] text-gray-600 font-medium">
                  {daystate > 0
                    ? `เก่งมาก! คุณเรียนติดต่อกันมาแล้ว ${daystate} วัน`
                    : "เริ่มเรียนวันนี้เพื่อเริ่ม Streak!"}
                </p>

              </div>
            }
          />
        </div>
      </div>
      {showDivider && <Divider />}
    </>
  );
};

