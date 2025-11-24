import * as React from "react";
import { Image } from "@/components/common/Image";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { Flag, ArrowUp, CheckCircle } from "phosphor-react";

export interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  className,
}) => {
  // Mock data
  const userName = "John Willis";
  const level = 24;
  const boosterType = "Bonus Booster";
  const currentXP = 3000;
  const totalXP = 8000;
  const gameWins = 27;
  const highestScore = 910;
  const correctAnswers = 218;

  const xpPercentage = Math.min(100, (currentXP / totalXP) * 100);

  return (
    <Container
      variant="white"
      className={cn("p-6 w-full", className)}
    >
      {/* Top Section: Avatar and User Info - แยกเป็น 2 div */}
      <div className="flex items-stretch gap-0">
        {/* Avatar Div - div แรกสำหรับรูปภาพอย่างเดียว */}
        <div className="relative w-[180px] min-h-[180px] rounded-[12px]  border-black bg-[#EAF8FF] flex items-center justify-center overflow-hidden">
          
        
        </div>

        {/* User Info Div - div ที่สองสำหรับ User Info */}
        <div className="flex-1 flex flex-col gap-2 rounded-r-[12px]  px-4 py-3">
          <h2 className="text-[20px] leading-[28px] font-bold text-[#242E39]">
            {userName}
          </h2>
          <span className="text-[14px] leading-[20px] font-medium text-[#7F7F7F]">
            {boosterType}, {level} lv
          </span>
          
          {/* Progress Bar Section */}
          <div className="relative mt-1">
            <div className="w-full h-[10px] rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#EC4899] via-[#F48FB1] to-[#FF7A00] transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <span className="absolute top-[-18px] right-0 text-[14px] leading-[18px] font-medium text-[#7F7F7F] whitespace-nowrap">
              {currentXP.toLocaleString()} / {totalXP.toLocaleString()} XP
            </span>
          </div>

          {/* Statistics Cards Section - ย้ายมาอยู่ใน User Info */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {/* Game Wins Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[40px] w-[40px] h-[40px] rounded-[8px] bg-white shadow-sm">
                <Flag className="w-5 h-5 text-[#344054]" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] leading-[28px] font-bold text-[#242E39]">
                  {gameWins}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">
                  Game Wins
                </span>
              </div>
            </div>

            {/* Highest Score Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[40px] w-[40px] h-[40px] rounded-[8px] bg-white shadow-sm">
                <ArrowUp className="w-5 h-5 text-[#344054]" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] leading-[28px] font-bold text-[#242E39]">
                  {highestScore}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">
                  Highest Score
                </span>
              </div>
            </div>

            {/* Correct Answers Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[40px] w-[40px] h-[40px] rounded-[8px] bg-white shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#344054]" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] leading-[28px] font-bold text-[#242E39]">
                  {correctAnswers}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">
                  Correct Answers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
