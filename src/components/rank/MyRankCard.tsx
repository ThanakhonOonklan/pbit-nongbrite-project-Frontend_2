"use client";

import * as React from "react";
import AnimatedList from "@/components/common/AnimatedList";
import { Container } from "@/components/common/Container";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";

export interface MyRankCardProps {
  myRank: RankUser | null;
  className?: string;
}

interface AchievementItem {
  icon: string;
  name: string;
  completed: boolean;
}

const defaultAchievements: AchievementItem[] = [
  { icon: "🌱", name: "ผู้เริ่มต้น", completed: true },
  { icon: "🏆", name: "ชนะ 10 ครั้ง", completed: true },
  { icon: "🔥", name: "สตรีค 7 วัน", completed: true },
  { icon: "💯", name: "คะแนนเต็ม", completed: false },
  { icon: "📚", name: "เรียน 100 ครั้ง", completed: false },
  { icon: "🎯", name: "ชนะ 50 ครั้ง", completed: false },
  { icon: "⚡", name: "สตรีค 30 วัน", completed: false },
  { icon: "👑", name: "ระดับสูงสุด", completed: false },
];

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
        <div className="text-[48px] mb-2">📊</div>
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

  const achievements = defaultAchievements;

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
              {myRank.change > 0 ? "↑" : "↓"} {Math.abs(myRank.change)}
            </div>
          </div>
        )}

        {/* Medal Section - Center Large */}
        <div className="flex flex-col items-center justify-center ">
          <div className="text-[120px] leading-none mb-1 drop-shadow-lg ">
            🏅
          </div>
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
              className="bg-gradient-to-br from-[#FFD300]/10 to-[#FFD300]/5 border-[#FFD300]/30 rounded-[12px] p-3 text-center"
            >
              <span className="text-[24px]">👑</span>
              <p className="text-[13px] font-bold text-[#3c3c3c] mt-1">
                คุณอยู่ในแรงค์สูงสุดแล้ว!
              </p>
            </Container>
          )}
        </Container>
      </div>

      {/* Achievements List */}
      <div className="p-6 pt-0 flex-shrink-0">
        <h4 className="text-[16px] font-bold text-[#3c3c3c] mb-3">
          ความสำเร็จ
        </h4>
        <AnimatedList<AchievementItem>
          items={achievements}
          enableArrowNavigation={false}
          displayScrollbar
          className="max-h-[200px]"
          listClassName="max-h-[200px] space-y-2"
          itemClassName={({ item: achievement }) =>
            cn(
              "flex items-center gap-3 rounded-[12px] border-2 p-3 transition-all",
              achievement.completed
                ? "bg-gradient-to-br from-[#E8F5FF] to-[#F0F9FF] border-[#1cb0f6]/30"
                : "bg-white border-[#E0E0E0] opacity-60"
            )
          }
          renderItem={({ item: achievement }) => (
            <>
              <span className="text-[24px]">{achievement.icon}</span>
              <span
                className={cn(
                  "text-[14px] font-bold flex-1",
                  achievement.completed ? "text-[#3c3c3c]" : "text-[#909090]"
                )}
              >
                {achievement.name}
              </span>
              {achievement.completed && (
                <span className="text-[#19C371] text-[18px]">✓</span>
              )}
            </>
          )}
        />
      </div>
    </Container>
  );
};

MyRankCard.displayName = "MyRankCard";

export { MyRankCard };
