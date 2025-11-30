import * as React from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  className,
}) => {
  // Mock data
  const userName = "Thanakhon Oonklan";
  const boosterType = "วันที่เข้าร่วม กุมภาพันธ์ 2023";
  const currentXP = 3000;
  const totalXP = 8000;
  const highestScore = 3000;
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
            {boosterType}
          </span>
          
          {/* Progress Bar Section */}
          <div className="relative mt-1">
            <div className="w-full h-[10px] rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1CB0F6] transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <span className="absolute top-[-30px] right-0 text-[14px] leading-[18px] font-medium text-[#7F7F7F] whitespace-nowrap">
              {currentXP.toLocaleString()} / {totalXP.toLocaleString()} 
            </span>
          </div>

          {/* Statistics Cards Section - ย้ายมาอยู่ใน User Info */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {/* Game Wins Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 border-[3px] border-[#101113] ">
              
            </div>

            {/* Highest Score Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[48px] w-[48px] h-[48px] rounded-[10px] bg-[#F5FAFF]">
                <span role="img" aria-label="trophy" className="text-2xl leading-none">
                  🏆
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] leading-[28px] font-bold text-[#242E39]">
                  {highestScore}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">
                  คะแนนสูงสุด
                </span>
              </div>
            </div>

            {/* Correct Answers Card */}
            <div className="bg-white rounded-[12px] px-3 py-3 flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[48px] w-[48px] h-[48px] rounded-[10px] bg-[#F5FAFF]">
                <span role="img" aria-label="calendar" className="text-2xl leading-none">
                  📅
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[20px] leading-[28px] font-bold text-[#242E39]">
                  {correctAnswers}
                </span>
                <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">
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
