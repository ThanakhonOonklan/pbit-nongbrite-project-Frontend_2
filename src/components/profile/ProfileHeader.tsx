import * as React from "react";
import { Image } from "@/components/common/Image";
import { Container } from "@/components/common/Container";
import { IconEditButton } from "@/components/common";
import { cn } from "@/lib/utils";
import { Divider } from "../common";
import { Lightning, Shield, Flame } from "phosphor-react";

export interface ProfileHeaderProps {
  className?: string;
  name: string;
  joinedText?: string;
  rankBadge?: string;
  score?: number;
  streakDays?: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  className, 
  name, 
  joinedText,
  rankBadge,
  score,
  streakDays,
}) => {
  return (
    <Container
      variant="white"
      className={cn("px-6 py-8 min-h-[160px] rounded-b-none", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/logo.png"
            alt="Avatar"
            fill
            containerClassName="w-[70px] h-[70px] rounded-full"
            className="object-cover"
            sizes="70px"
            priority
          />
          <div className="flex flex-col">
            <h2 className="text-[20px] leading-[28px] font-bold text-[#242E39]">{name}</h2>
            {joinedText && (
              <span className="text-[12px] leading-[18px] font-medium text-[#7F7F7F]">{joinedText}</span>
            )}
          </div>
        </div>
        <IconEditButton />
      </div>
      <div className="mt-8">
        <Divider />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Rank Card */}
        <Container variant="white" className="p-6 flex items-center gap-4">
          <div className="flex items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-[14px] bg-gradient-to-br from-[#E8F4FF] to-[#D0E8FF]">
            <Shield className="w-7 h-7 text-[#1CB0F6]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[16px] leading-[20px] font-bold text-[#3C3C3C]">
              {rankBadge || "ผู้เริ่มต้นที่ดี"}
            </span>
            <span className="text-[13px] leading-[18px] font-medium text-[#AFAFAF]">
              แรงค์ทั้งหมด
            </span>
          </div>
        </Container>

        {/* Points Card */}
        <Container variant="white" className="p-6 flex items-center gap-4">
          <div className="flex items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-[14px] bg-gradient-to-br from-[#FFF7CC] to-[#FFE699]">
            <Lightning className="w-7 h-7 text-[#FFD300]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[16px] leading-[20px] font-bold text-[#3C3C3C]">
              {score?.toLocaleString() || "0"}
            </span>
            <span className="text-[13px] leading-[18px] font-medium text-[#AFAFAF]">
              คะแนนทั้งหมด
            </span>
          </div>
        </Container>

        {/* Streak Card */}
        <Container variant="white" className="p-6 flex items-center gap-4">
          <div className="flex items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-[14px] bg-gradient-to-br from-[#FFEDE5] to-[#FFD9C4]">
            <Flame className="w-7 h-7 text-[#FF7A00]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[16px] leading-[20px] font-bold text-[#3C3C3C]">
              {streakDays || 0}
            </span>
            <span className="text-[13px] leading-[18px] font-medium text-[#AFAFAF]">
              วันที่เล่นต่อเนื่อง
            </span>
          </div>
        </Container>
      </div>
    </Container>
  );
};


