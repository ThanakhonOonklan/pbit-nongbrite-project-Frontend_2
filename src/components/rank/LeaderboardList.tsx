import * as React from "react";
import { Image } from "@/components/common/Image";
import { Container } from "@/components/common/Container";
import { TopThreeCards } from "./TopThreeCards";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";
import { FaUsers, FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import { getRankBadgeImage } from "@/constants/ranks";

export interface LeaderboardListProps {
  items?: RankUser[];
  topThree?: RankUser[];
  onItemSelect?: (user: RankUser, index: number) => void;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
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

const getGenderIcon = (gender?: string) => {
  if (gender === "เพศชาย" || gender === "MALE") return <FaMars className="w-4 h-4 text-[#1CB0F6]" />;
  if (gender === "เพศหญิง" || gender === "FEMALE") return <FaVenus className="w-4 h-4 text-[#EC4899]" />;
  if (gender === "ไม่ระบุตัวตน" || gender === "OTHER") return <FaGenderless className="w-4 h-4 text-[#344054]" />;
  return null;
};


const LeaderboardList: React.FC<LeaderboardListProps> = ({
  items = [],
  topThree,
  onItemSelect,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
}) => {
  const safeItems = items ?? [];

  return (
    <Container
      className={cn(
        "flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="w-full border-b border-gray-200 pb-1 px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6">
        <h2 className="text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] leading-[28px] font-bold text-gray-800">
          ตารางอันดับ
        </h2>
      </div>

      {/* TopThreeCards */}
      {topThree && topThree.length > 0 && (
        <div className="px-3 sm:px-4 md:px-6 pt-4 pb-4 sm:pt-5 sm:pb-6 md:pt-6 md:pb-7">
          <TopThreeCards items={topThree} />
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-[60px_1fr_100px_80px] sm:grid-cols-[70px_1fr_110px_90px] lg:grid-cols-[80px_1fr_120px_100px] gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-4 py-2 sm:py-2.5 lg:py-3 border border-gray-200 bg-gray-50">
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700">ลำดับ</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 min-w-0">ชื่อที่แสดง</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center sm:text-left sm:pl-2 lg:pl-0">คะแนนสูงสุด</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center sm:pl-4 lg:pl-1">แรงค์</div>
      </div>

      {/* Table Rows */}
      <div
        className={cn(
          "overflow-y-auto",
          displayScrollbar ? "custom-scrollbar" : "scrollbar-hide"
        )}
        style={{
          maxHeight: "360px",
          minHeight: "360px",
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: displayScrollbar ? "#cbd5e0 transparent" : "transparent",
        }}
      >
        {safeItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[360px] py-12">
            <FaUsers className="w-12 h-12 mb-2 text-[#9CA3AF]" />
            <p className="text-[14px] text-[#909090] text-center">
              ยังไม่มีข้อมูลอันดับ
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {safeItems.map((user, index) => (
              <div
                key={user.id}
                className={cn(
                  "grid grid-cols-[60px_1fr_100px_80px] sm:grid-cols-[70px_1fr_110px_90px] lg:grid-cols-[80px_1fr_120px_100px] gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-4 py-2.5 sm:py-2.5 lg:py-3 items-center transition-colors duration-200 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 bg-white",
                  itemClassName
                )}
                onClick={() => onItemSelect?.(user, index)}
              >
                {/* Rank Circle */}
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[12px] sm:text-[13px] lg:text-[14px] border",
                      getRankCircleColor(user.rank),
                      getRankCircleTextColor(user.rank),
                      user.rank === 1 ? "border-[#F4E4A6]" : user.rank === 2 ? "border-[#DADCE0]" : user.rank === 3 ? "border-[#FED7AA]" : "border-[#E5E7EB]"
                    )}
                  >
                    #{user.rank}
                  </div>
                </div>

                {/* Student: Avatar + Name + Gender */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 min-w-[32px] sm:min-w-[40px] flex-shrink-0 z-10">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        containerClassName="w-full h-full"
                        className="object-cover"
                        sizes="(max-width: 640px) 32px, 40px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1cb0f6] to-[#17a3e3] flex items-center justify-center text-white font-bold text-[14px] sm:text-[16px]">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-[13px] sm:text-[13px] lg:text-[14px] font-normal text-gray-800 truncate">
                      {user.name}
                    </p>
                    {user.gender ? (
                      <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                        <span className="text-[11px] sm:text-[12px] text-gray-500 truncate">
                          {user.gender}
                        </span>
                        <span className="flex-shrink-0">{getGenderIcon(user.gender)}</span>
                      </div>
                    ) : (
                      <div className="h-4 sm:h-5 mt-0.5" /> // Spacer for alignment if no gender
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center justify-center sm:justify-start">
                  <span className="text-[13px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                    {user.score.toLocaleString()}
                  </span>
                </div>

                {/* Rank */}
                <div className="flex items-center justify-center">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex-shrink-0 z-10">
                    <Image
                      src={getRankBadgeImage(user.score)}
                      alt={`Rank ${user.rank}`}
                      fill
                      containerClassName="w-full h-full"
                      className="object-contain"
                      sizes="(max-width: 640px) 32px, (max-width: 1024px) 36px, 40px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Container>
  );
};

LeaderboardList.displayName = "LeaderboardList";

export { LeaderboardList };

