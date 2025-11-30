"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";
import {
  FaCrown,
  FaChartLine,
  FaMedal,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export interface MyRankCardProps {
  myRank: RankUser | null;
  className?: string;
}

// Rank tiers data
const rankTiers = [
  { name: "ผู้เริ่มต้น", minScore: 0, maxScore: 3999 },
  { name: "ผู้เริ่มต้นที่ดี", minScore: 4000, maxScore: 10000 },
  { name: "นักเรียนขยัน", minScore: 10001, maxScore: 15000 },
  { name: "นักเรียนยอดเยี่ยม", minScore: 15001, maxScore: 25000 },
  { name: "นักเรียนระดับเซียน", minScore: 25001, maxScore: Infinity },
];

const MyRankCard: React.FC<MyRankCardProps> = ({ myRank, className }) => {
  if (!myRank) {
    return (
      <Container
        variant="white"
        className={cn("p-6 flex flex-col items-center justify-center",className
        )}
      >
        <FaChartLine className="w-16 h-16 mb-2 text-[#9CA3AF]" />
        <h3 className="text-[18px] font-bold text-[#3c3c3c] mb-2">
          ยังไม่มีอันดับ
        </h3>
        <p className="text-[14px] text-[#909090] text-center">
          เริ่มเรียนรู้เพื่อเข้าสู่อันดับกันเลย!
        </p>
      </Container>
    );
  }

  // Calculate current rank tier
  const currentTier =
    rankTiers.find(
      (tier) => myRank.score >= tier.minScore && myRank.score <= tier.maxScore
    ) || rankTiers[0];

  const nextTier = rankTiers.find((tier) => tier.minScore > myRank.score);
  const currentScoreInTier = myRank.score - currentTier.minScore;
  const totalNeededInTier = nextTier
    ? nextTier.minScore - currentTier.minScore
    : 0;
  const progressPercent = nextTier
    ? ((myRank.score - currentTier.minScore) /
        (nextTier.minScore - currentTier.minScore)) *
      100
    : 100;

  return (
    <Container
      variant="white"
      className={cn("flex flex-col", className)}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Change Badge */}
        {myRank.change !== undefined && myRank.change !== 0 && (
          <div className="flex justify-end">
            <div
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold",
                myRank.change > 0
                  ? "bg-[#19C371]/10 text-[#19C371]"
                  : "bg-[#FF4B4B]/10 text-[#FF4B4B]"
              )}
            >
              {myRank.change > 0 ? (
                <FaArrowUp className="w-3.5 h-3.5" />
              ) : (
                <FaArrowDown className="w-3.5 h-3.5" />
              )}
              {Math.abs(myRank.change)}
            </div>
          </div>
        )}

        {/* Medal Section - Center Large */}
        <div className="flex flex-col items-center justify-center ">
          <FaMedal className="w-32 h-32 leading-none mb-1 drop-shadow-lg text-[#FACC15]" />
          <h3 className="text-[28px] font-bold text-[#1cb0f6] ">
            อันดับ #{myRank.rank} 
          </h3>
        </div>

        {/* Rank Tier Card */}
        <Container
          variant="white"
          className="rounded-[16px] p-4"
        >
          <div className="mb-3">
            <h4 className="text-[16px] font-bold text-[#3c3c3c] mb-1">
              {currentTier.name}
            </h4>
            <p className="text-[12px] text-[#666]">
              {totalNeededInTier > 0
                ? `${totalNeededInTier.toLocaleString()} คะแนนเพื่อไปแรงค์ถัดไป`
                : "คุณอยู่ในแรงค์สูงสุดแล้ว"}
            </p>
          </div>

          {nextTier ? (
            <>
              {/* Progress to Next Rank */}
              <div className="space-y-2">
                <div className="relative w-full h-[10px] bg-[#E0F2FF] rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#1cb0f6] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
                <div className="flex justify-center">
                  <span className="text-[12px] font-bold text-[#1cb0f6]">
                    {currentScoreInTier.toLocaleString()}/
                    {totalNeededInTier.toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <Container
              variant="default"
              className="bg-gradient-to-br from-[#FFD300]/10 to-[#FFD300]/5 border-[#FFD300]/30 rounded-[12px] p-3 text-center flex flex-col items-center gap-1"
            >
              <FaCrown className="w-8 h-8 text-[#FACC15]" />
              <p className="text-[13px] font-bold text-[#3c3c3c] mt-1">
                คุณอยู่ในแรงค์สูงสุดแล้ว!
              </p>
            </Container>
          )}
        </Container>
      </div>
    </Container>
  );
};

MyRankCard.displayName = "MyRankCard";

export { MyRankCard };
