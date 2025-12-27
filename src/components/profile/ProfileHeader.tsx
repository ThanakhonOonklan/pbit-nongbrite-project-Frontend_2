import * as React from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IoTrophy, IoFlame, IoCreateOutline } from "react-icons/io5";
import { FaMedal } from "react-icons/fa";
import type { RankUser } from "@/types";

export interface ProfileHeaderProps {
  myRank?: RankUser;
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

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  myRank,
  className,
}) => {
  // Mock data
  const userName = "Thanakhon Oonklan";
  const boosterType = "วันที่เข้าร่วม กุมภาพันธ์ 2023";
  const highestScore = 3000;
  const correctAnswers = 218;
  const initial = userName.charAt(0).toUpperCase();

  // Calculate rank progress
  let progressPercent = 0;
  let currentScore = 0;
  let nextTierScore = 0;

  if (myRank) {
    const currentTier = rankTiers.find(
      (tier) => myRank.score >= tier.minScore && myRank.score <= tier.maxScore
    ) || rankTiers[0];
    
    const nextTier = rankTiers.find((tier) => tier.minScore > myRank.score);
    
    if (nextTier) {
      const currentScoreInTier = myRank.score - currentTier.minScore;
      const totalNeededInTier = nextTier.minScore - currentTier.minScore;
      progressPercent = (currentScoreInTier / totalNeededInTier) * 100;
      currentScore = currentScoreInTier;
      nextTierScore = totalNeededInTier;
    } else {
      // Max rank
      progressPercent = 100;
      currentScore = myRank.score;
      nextTierScore = myRank.score;
    }
  }

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // TODO: Implement edit profile functionality
  };

  return (
    <Container
     
      className={cn(
        "p-4 sm:p-5 md:p-4 lg:p-6 w-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative",
        className
      )}
    >
      {/* Edit Button */}
      <button
        type="button"
        onClick={handleEditProfile}
        className={cn(
          "absolute top-4 right-4 w-10 h-10 rounded-lg",
          "border-2 border-gray-300 bg-white",
          "flex items-center justify-center",
          "transition-all duration-200",
          "hover:border-[#1cb0f6] hover:bg-[#F5FAFF]",
          "text-gray-600 hover:text-[#1cb0f6]",
          "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2"
        )}
        aria-label="แก้ไขโปรไฟล์"
      >
        <IoCreateOutline className="w-5 h-5" />
      </button>

      {/* Top Section: Avatar and User Info - แยกเป็น 2 div */}
      <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
        {/* Avatar Div */}
        <div className="relative w-full md:w-[150px] lg:w-[180px] min-h-[140px] md:min-h-[150px] lg:min-h-[180px] rounded-[12px] md:rounded-l-[12px] md:rounded-r-none bg-gradient-to-br from-[#1cb0f6] to-[#17a3e3] flex items-center justify-center overflow-hidden">
          <span className="text-[48px] md:text-[52px] lg:text-[64px] font-bold text-white">
            {initial}
          </span>
        </div>

        {/* User Info Div */}
        <div className="flex-1 flex flex-col gap-2 md:rounded-r-[12px] md:px-4 md:py-3">
          <h2 className="text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] leading-[28px] font-bold text-gray-800">
            {userName}
          </h2>
          <span className="text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] leading-[20px] font-medium text-gray-600">
            {boosterType}
          </span>
          
          {/* Progress Bar Section */}
          <div className="relative mt-2 sm:mt-2">
            <div className="w-full h-[10px] rounded-full bg-[#E5F8FF] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1CB0F6] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="absolute top-[-26px] right-0 text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] font-medium text-gray-600 whitespace-nowrap">
              {currentScore.toLocaleString()} / {nextTierScore.toLocaleString()} 
            </span>
          </div>

          {/* Statistics Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
            {/* Rank Card - แทนที่ XP Card */}
            <div
              className="bg-white rounded-[12px] px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-2 md:py-2 lg:px-3 lg:py-3 flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <div className="flex items-center justify-center min-w-[36px] w-[36px] h-[36px] sm:min-w-[40px] sm:w-[40px] sm:h-[40px] md:min-w-[38px] md:w-[38px] md:h-[38px] lg:min-w-[44px] lg:w-[44px] lg:h-[44px] rounded-[10px] bg-[#FFFBEA]">
                <FaMedal className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#FACC15]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] sm:text-[17px] md:text-[17px] lg:text-[19px] leading-[24px] font-bold text-gray-800">
                  {myRank ? `#${myRank.rank}` : "-"}
                </span>
                <span className="text-[10px] sm:text-[10px] md:text-[11px] leading-[14px] font-medium text-gray-600">
                  {myRank ? `${myRank.score.toLocaleString()} คะแนน` : "ไม่มีอันดับ"}
                </span>
              </div>
            </div>

            {/* Highest Score Card */}
            <div
              className="bg-white rounded-[12px] px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-2 md:py-2 lg:px-3 lg:py-3 flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <div className="flex items-center justify-center min-w-[36px] w-[36px] h-[36px] sm:min-w-[40px] sm:w-[40px] sm:h-[40px] md:min-w-[38px] md:w-[38px] md:h-[38px] lg:min-w-[44px] lg:w-[44px] lg:h-[44px] rounded-[10px] bg-[#F5FAFF]">
                <IoTrophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#FFD300]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] sm:text-[17px] md:text-[17px] lg:text-[19px] leading-[24px] font-bold text-gray-800">
                  {highestScore}
                </span>
                <span className="text-[10px] sm:text-[10px] md:text-[11px] leading-[14px] font-medium text-gray-600">
                  คะแนนสูงสุด
                </span>
              </div>
            </div>

            {/* Correct Answers / Streak Card */}
            <div
              className="bg-white rounded-[12px] px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-2 md:py-2 lg:px-3 lg:py-3 flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <div className="flex items-center justify-center min-w-[36px] w-[36px] h-[36px] sm:min-w-[40px] sm:w-[40px] sm:h-[40px] md:min-w-[38px] md:w-[38px] md:h-[38px] lg:min-w-[44px] lg:w-[44px] lg:h-[44px] rounded-[10px] bg-[#F5FAFF]">
                <IoFlame className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#FF8B8B]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] sm:text-[17px] md:text-[17px] lg:text-[19px] leading-[24px] font-bold text-gray-800">
                  {correctAnswers}
                </span>
                <span className="text-[10px] sm:text-[10px] md:text-[11px] leading-[14px] font-medium text-gray-600">
                  วันที่เล่นต่อเนื่อง
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
