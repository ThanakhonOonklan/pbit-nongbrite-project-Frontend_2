"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { MyRankData } from "@/types";
import { cn } from "@/lib/utils";
import { FaChartLine, FaEllipsisH, FaTimes, FaLock } from "react-icons/fa";
import { getRankBadgeImage, getRankBadgeInfo, RANKS } from "@/constants/ranks";
import { useTranslations } from "next-intl";

const RANK_GLOW: Record<string, { glow: string; card: string; text: string }> = {
  Newbie: { glow: "rgba(181, 105, 33, 1)", card: "rgba(139, 90, 43, 0.12)", text: "rgba(181, 105, 33, 1)" },
  Junior: { glow: "rgba(160, 174, 192, 1)", card: "rgba(160, 174, 192, 0.12)", text: "rgba(160, 174, 192, 1)" },
  Smart: { glow: "rgba(221, 108, 32, 1)", card: "rgba(221, 107, 32, 0.12)", text: "rgba(221, 108, 32, 1)" },
  Hero: { glow: "rgba(49, 130, 206, 1)", card: "rgba(49, 130, 206, 0.14)", text: "rgba(49, 130, 206, 1)" },
  Super: { glow: "rgba(238, 0, 255, 1)", card: "rgba(236, 72, 153, 0.12)", text: "rgba(238, 0, 255, 1)" },
  Master: { glow: "rgba(237, 73, 18, 1)", card: "rgba(239, 68, 68, 0.12)", text: "rgba(237, 73, 18, 1)" },
  Legend: { glow: "rgba(255, 217, 0, 1)", card: "rgba(234, 179, 8, 0.12)", text: "rgba(255, 217, 0, 1)" },
};

export interface MyRankCardProps {
  myRank: MyRankData | null;
  className?: string;
}

const MyRankCard: React.FC<MyRankCardProps> = ({ myRank, className }) => {
  const t = useTranslations("Rank.MyRankCard");
  const tRanks = useTranslations("Ranks");
  const [showAllRanks, setShowAllRanks] = React.useState(false);

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
          {t("unranked")}
        </h3>
        <p className="text-[14px] text-[#909090] text-center">
          {t("unrankedDesc")}
        </p>
      </div>
    );
  }

  // Get current rank badge info
  const rankInfo = getRankBadgeInfo(myRank.score);
  const currentRank = rankInfo;
  const nextRank = rankInfo.nextRank;
  const scoreNeeded = rankInfo.scoreNeeded;
  const scoreInRank = myRank.score - currentRank.minScore;
  const totalScoreInRank = currentRank.maxScore - currentRank.minScore;
  const progressPercent =
    totalScoreInRank > 0 ? (scoreInRank / totalScoreInRank) * 100 : 100;

  return (
    <>
      <div
        className={cn(
          "bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          "flex flex-col relative",
          className
        )}
      >
        {/* ... button */}
        <button
          onClick={() => setShowAllRanks(true)}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-200 text-gray-400 hover:text-[#1cb0f6]"
          title="ดูแรงค์ทั้งหมด"
        >
          <FaEllipsisH className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {/* Rank Badge Image Section */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3"
              style={{ filter: `drop-shadow(0 0 14px ${RANK_GLOW[currentRank.name]?.glow ?? "transparent"})` }}
            >
              <Image
                src={getRankBadgeImage(myRank.score)}
                alt={`Rank ${myRank.rank}`}
                fill
                containerClassName="w-full h-full"
                className="object-contain"
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>
            <h3
              className="text-[24px] sm:text-[28px] font-bold mb-1"
              style={{ color: RANK_GLOW[currentRank.name]?.text ?? "#1cb0f6" }}
            >
              {t("currentRank", { rank: myRank.rank })}
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
                {tRanks(currentRank.name)}
              </h4>
              <p className="text-[12px] text-[#666]">
                {scoreNeeded > 0
                  ? t("scoreToNextRank", { score: scoreNeeded.toLocaleString() })
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

      {/* All Ranks Modal */}
      {showAllRanks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowAllRanks(false)}
        >
          <div
            className="bg-white rounded-[20px] shadow-2xl w-full max-w-[720px] p-5 sm:p-7 rank-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[17px] font-bold text-[#3c3c3c]">ระดับแรงค์ทั้งหมด</h2>
              <button
                onClick={() => setShowAllRanks(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Rank Grid */}
            <div className="grid grid-cols-7 gap-3">
              {RANKS.map((rank, index) => {
                const isCurrentRank = rank.name === currentRank.name;
                const isUnlocked = myRank.score >= rank.minScore;
                return (
                  <div
                    key={rank.id}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-[14px] rank-row-pop cursor-pointer transition-all duration-200",
                      isCurrentRank
                        ? "bg-[#E0F7FF] border-2 border-[#1cb0f6] hover:bg-[#cceeff] hover:-translate-y-1"
                        : isUnlocked
                          ? "bg-gray-50 border border-gray-200 hover:bg-white hover:border-[#1cb0f6] hover:-translate-y-1"
                          : "bg-gray-50 border border-gray-100 opacity-40 hover:opacity-60"
                    )}
                    style={{
                      animationDelay: `${index * 55}ms`,
                      boxShadow: isUnlocked
                        ? `0 0 12px 2px ${RANK_GLOW[rank.name]?.card ?? "transparent"}`
                        : undefined,
                    }}
                  >
                    {/* Badge Image */}
                    <div
                      className={cn(
                        "relative w-16 h-16 rank-badge-pop",
                        isCurrentRank && "rank-badge-active"
                      )}
                      style={{
                        animationDelay: `${index * 55 + 80}ms`,
                        filter: isUnlocked
                          ? `drop-shadow(0 0 7px ${RANK_GLOW[rank.name]?.glow ?? "transparent"})`
                          : undefined,
                      }}
                    >
                      <Image
                        src={rank.iconPath}
                        alt={rank.name}
                        fill
                        containerClassName="w-full h-full"
                        className={cn("object-contain", !isUnlocked && "grayscale")}
                        sizes="64px"
                      />
                    </div>

                    {/* Name */}
                    <p
                      className={cn(
                        "text-[12px] font-bold text-center leading-tight",
                        isCurrentRank ? "text-[#1cb0f6]" : "text-[#3c3c3c]"
                      )}
                    >
                      {tRanks(rank.name)}
                    </p>


                    {/* Current badge */}
                    {isCurrentRank && (
                      <span className="text-[10px] font-bold bg-[#1cb0f6] text-white px-2 py-0.5 rounded-full leading-none">
                        ปัจจุบัน
                      </span>
                    )}

                    {/* Lock icon */}
                    {!isUnlocked && (
                      <FaLock className="w-3 h-3 text-gray-300" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalPop {
          0%   { opacity: 0; transform: scale(0.82) translateY(24px); }
          65%  { transform: scale(1.04) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes rowPop {
          0%   { opacity: 0; transform: translateX(-12px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-15deg); }
          55%  { transform: scale(1.25) rotate(6deg); }
          80%  { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.12); }
        }
        .rank-modal-pop {
          animation: modalPop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .rank-row-pop {
          opacity: 0;
          animation: rowPop 0.32s ease-out forwards;
        }
        .rank-badge-pop {
          opacity: 0;
          animation: badgePop 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .rank-badge-active {
          animation: badgePop 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     badgePulse 1.8s ease-in-out 0.5s infinite;
        }
      `}</style>
    </>
  );
};

MyRankCard.displayName = "MyRankCard";

export { MyRankCard };
