"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { MyRankData } from "@/types";
import { cn } from "@/lib/utils";
import { FaChartLine } from "react-icons/fa";

export interface MyRankCardProps {
  myRank: MyRankData | null;
  className?: string;
}

// Rank badge image function (same as LeaderboardList)
const getRankBadgeImage = (score: number): string => {
  if (score >= 5900) {
    return "/icons/rank/champion-dark.png";
  } else if (score >= 5200) {
    return "/icons/rank/diamond-dark.png";
  } else if (score >= 4200) {
    return "/icons/rank/platinum-dark.png";
  } else if (score >= 2800) {
    return "/icons/rank/gold-dark.png";
  } else if (score >= 1500) {
    return "/icons/rank/silver-dark.png";
  } else {
    return "/icons/rank/bronze-dark.png";
  }
};

// Rank badge info function (for progress calculation)
const getRankBadgeInfo = (score: number) => {
  if (score >= 5900) {
    return { name: "Champion", minScore: 5900, maxScore: 6300 };
  } else if (score >= 5200) {
    return { name: "Diamond", minScore: 5200, maxScore: 5899 };
  } else if (score >= 4200) {
    return { name: "Platinum", minScore: 4200, maxScore: 5199 };
  } else if (score >= 2800) {
    return { name: "Gold", minScore: 2800, maxScore: 4199 };
  } else if (score >= 1500) {
    return { name: "Silver", minScore: 1500, maxScore: 2799 };
  } else {
    return { name: "Bronze", minScore: 0, maxScore: 1499 };
  }
};

const MyRankCard: React.FC<MyRankCardProps> = ({ myRank, className }) => {
  if (!myRank) {
    return (
      <div
        className={cn(
          "bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          "p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center",
          className
        )}
      >
        <FaChartLine className="w-16 h-16 mb-2 text-[#9CA3AF]" />
        <h3 className="text-[18px] font-bold text-[#3c3c3c] mb-2">
          ยังไม่มีอันดับ
        </h3>
        <p className="text-[14px] text-[#909090] text-center">
          เริ่มเรียนรู้เพื่อเข้าสู่อันดับกันเลย!
        </p>
      </div>
    );
  }

  // Get current rank badge info
  const currentRank = getRankBadgeInfo(myRank.score);
  const nextRank =
    myRank.score >= 6300 ? null : getRankBadgeInfo(currentRank.maxScore + 1);
  const scoreNeeded = nextRank ? nextRank.minScore - myRank.score : 0;
  const scoreInRank = myRank.score - currentRank.minScore;
  const totalScoreInRank = currentRank.maxScore - currentRank.minScore;
  const progressPercent =
    totalScoreInRank > 0 ? (scoreInRank / totalScoreInRank) * 100 : 100;

  return (
    <div
      className={cn(
        "bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        "flex flex-col",
        className
      )}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Rank Badge Image Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
            <Image
              src={getRankBadgeImage(myRank.score)}
              alt={`Rank ${myRank.rank}`}
              fill
              containerClassName="w-full h-full"
              className="object-contain"
              sizes="(max-width: 640px) 96px, 112px"
            />
          </div>
          <h3 className="text-[24px] sm:text-[28px] font-bold text-[#1cb0f6] mb-1">
            อันดับ #{myRank.rank}
          </h3>
        </div>

        {/* Rank Tier Card */}
        <div
          className="rounded-[12px] p-4"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <div className="mb-3">
            <h4 className="text-[16px] font-bold text-[#3c3c3c] mb-1">
              {currentRank.name}
            </h4>
            <p className="text-[12px] text-[#666]">
              {scoreNeeded > 0
                ? `ขาดอีก ${scoreNeeded.toLocaleString()} คะแนน เพื่อไปแรงค์ถัดไป`
                : null}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative w-full h-[10px] bg-[#E0F2FF] rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute left-0 top-0 h-full bg-[#1cb0f6] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-center">
              <span className="text-[12px] font-bold text-[#1cb0f6]">
                {scoreInRank.toLocaleString()}/
                {totalScoreInRank.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyRankCard.displayName = "MyRankCard";

export { MyRankCard };
