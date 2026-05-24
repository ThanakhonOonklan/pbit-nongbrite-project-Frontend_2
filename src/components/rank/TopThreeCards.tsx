"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";
import { FaMedal, FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import { useTranslations } from "next-intl";

export interface TopThreeCardsProps {
  items?: RankUser[];
  className?: string;
}

const getRankCircleColor = (rank: number) => {
  if (rank === 1) return "bg-[#FDF9C8]";
  if (rank === 2) return "bg-[#F1F3F4]";
  if (rank === 3) return "bg-[#FEF0E0]";
  return "bg-[#FCFCFC]";
};

const getRankCircleTextColor = (rank: number) => {
  if (rank === 1) return "text-[#8B6914]";
  if (rank === 2) return "text-[#5F6368]";
  if (rank === 3) return "text-[#B45309]";
  return "text-[#5F6368]";
};

const getRankCircleBorderColor = (rank: number) => {
  if (rank === 1) return "border-[#F4E4A6]";
  if (rank === 2) return "border-[#DADCE0]";
  if (rank === 3) return "border-[#FED7AA]";
  return "border-[#E5E7EB]";
};

const getCardBackgroundColor = (rank: number) => {
  if (rank === 1) return "bg-[#FDF9C8]";
  if (rank === 2) return "bg-[#F1F3F4]";
  if (rank === 3) return "bg-[#FEF0E0]";
  return "bg-white";
};

const getCardBorderColor = (rank: number) => {
  if (rank === 1) return "border-[#FEE193]";
  if (rank === 2) return "border-[#C8CFD2]";
  if (rank === 3) return "border-[#F9AF55]";
  return "border-gray-800";
};

const getCardHoverBackgroundColor = (rank: number) => {
  if (rank === 1) return "hover:bg-[#F9F5D0]";
  if (rank === 2) return "hover:bg-[#E8ECEF]";
  if (rank === 3) return "hover:bg-[#FEE8D0]";
  return "hover:bg-gray-50";
};

const getMedalColor = (rank: number) => {
  if (rank === 1) return "text-[#FBBF24]"; // Gold
  if (rank === 2) return "text-gray-500"; // Silver
  if (rank === 3) return "text-[#CD7F32]"; // Bronze
  return "text-gray-400";
};

const getGenderIcon = (gender?: string) => {
  if (gender === "เพศชาย" || gender === "MALE") return <FaMars className="w-4 h-4 text-[#1CB0F6]" />;
  if (gender === "เพศหญิง" || gender === "FEMALE") return <FaVenus className="w-4 h-4 text-[#EC4899]" />;
  if (gender === "ไม่ระบุตัวตน" || gender === "OTHER") return <FaGenderless className="w-4 h-4 text-[#344054]" />;
  return null;
};

const TopThreeCards: React.FC<TopThreeCardsProps> = ({
  items = [],
  className = "",
}) => {
  const safeItems = items.slice(0, 3);
  const tProfile = useTranslations("Profile");

  const getTranslatedGender = (gender: string | undefined) => {
    if (!gender) return null;
    const upper = gender.toUpperCase();
    if (upper === 'MALE' || upper === 'เพศชาย' || upper === 'male') return tProfile('genderMale');
    if (upper === 'FEMALE' || upper === 'เพศหญิง' || upper === 'female') return tProfile('genderFemale');
    if (upper === 'OTHER' || upper === 'ไม่ระบุตัวตน' || upper === 'other') return tProfile('genderOther');
    return null;
  };

  if (safeItems.length === 0) {
    // แสดง card 3 ใบว่างเปล่า
    return (
      <div className={cn("flex flex-col gap-2 md:gap-3", className)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {[1, 2, 3].map((rank) => (
            <div
              key={rank}
              className={cn(
                "border rounded-lg p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2",
                "transition-colors duration-200 cursor-pointer",
                getCardBackgroundColor(rank),
                getCardBorderColor(rank),
                getCardHoverBackgroundColor(rank)
              )}
            >
              {/* Rank and Medal */}
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-[10px] flex items-center justify-center font-bold text-[11px] sm:text-[12px] border",
                    getRankCircleColor(rank),
                    getRankCircleTextColor(rank),
                    getRankCircleBorderColor(rank)
                  )}
                >
                  #{rank}
                </div>
                <FaMedal
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4",
                    getMedalColor(rank)
                  )}
                />
              </div>
              {/* ไม่แสดง avatar, name, gender, score */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 md:gap-3", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {safeItems.map((user) => (
          <div
            key={user.id}
            className={cn(
              "border rounded-lg p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2",
              "transition-colors duration-200 cursor-pointer",
              getCardBackgroundColor(user.rank),
              getCardBorderColor(user.rank),
              getCardHoverBackgroundColor(user.rank)
            )}
          >
            {/* Rank and Medal */}
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-[10px] flex items-center justify-center font-bold text-[11px] sm:text-[12px] border",
                  getRankCircleColor(user.rank),
                  getRankCircleTextColor(user.rank),
                  getRankCircleBorderColor(user.rank)
                )}
              >
                #{user.rank}
              </div>
              <FaMedal
                className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4",
                  getMedalColor(user.rank)
                )}
              />
            </div>

            {/* Avatar, Name, Gender, Score Section */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Avatar */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 z-10">
                <Image
                  src={user.avatar || "/icons/icon-Profile/icon_P_Bit.png"}
                  alt={user.name}
                  fill
                  containerClassName="w-full h-full"
                  className="object-cover"
                  sizes="(max-width: 640px) 32px, 40px"
                />
              </div>

              {/* Name, Gender, Score */}
              <div className="flex-1 min-w-0">
                {/* Name */}
                <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-800 mb-0">
                  {user.name}
                </h3>

                {/* Gender and Score (same line) */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  {user.gender && (
                    <>
                      <span className="text-[11px] sm:text-[12px] text-gray-600">
                        {getTranslatedGender(user.gender)}
                      </span>
                      {getGenderIcon(user.gender)}
                    </>
                  )}
                  <span className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-gray-800 ml-auto flex-1 text-right">
                    {user.score?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TopThreeCards.displayName = "TopThreeCards";

export { TopThreeCards };

