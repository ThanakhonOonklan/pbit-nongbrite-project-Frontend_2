import * as React from "react";
import { Image } from "@/components/common/Image";
import { Container } from "@/components/common/Container";
import { TopThreeCards } from "./TopThreeCards";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";
import { FaUsers, FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import { getRankBadgeImage, getRankByScore } from "@/constants/ranks";
import { useTranslations } from "next-intl";

const RANK_BADGE_GLOW: Record<string, string> = {
  Beginner: "rgba(180, 110, 40, 0.75)",
  Explorer: "rgba(155, 160, 170, 0.75)",
  Thinker: "rgba(230, 175, 0, 0.8)",
  Solver: "rgba(28, 176, 246, 0.8)",
  Strategist: "rgba(220, 50, 200, 0.8)",
  Master: "rgba(235, 80, 50, 0.8)",
  Legend: "rgba(210, 30, 30, 0.85)",
};

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

const getTopThreeRowStyle = (rank: number): React.CSSProperties => {
  if (rank === 1) return { background: "linear-gradient(to right, #FFFBEB, #FFFDE7)", borderLeft: "4px solid #F4D03F" };
  if (rank === 2) return { background: "linear-gradient(to right, #F8F9FA, #ECEFF1)", borderLeft: "4px solid #B0BEC5" };
  if (rank === 3) return { background: "linear-gradient(to right, #FFF7ED, #FEF0E0)", borderLeft: "4px solid #FFAB76" };
  return {};
};

const getGenderIcon = (gender?: string) => {
  if (gender === "เพศชาย" || gender === "MALE") return <FaMars className="w-4 h-4 text-[#1CB0F6]" />;
  if (gender === "เพศหญิง" || gender === "FEMALE") return <FaVenus className="w-4 h-4 text-[#EC4899]" />;
  if (gender === "ไม่ระบุตัวตน" || gender === "OTHER") return <FaGenderless className="w-4 h-4 text-[#344054]" />;
  return null;
};


const getTranslatedGender = (gender: string | undefined, tProfile: (key: string) => string) => {
  if (!gender) return null;
  const upper = gender.toUpperCase();
  if (upper === 'MALE' || upper === 'เพศชาย' || upper === 'male') return tProfile('genderMale');
  if (upper === 'FEMALE' || upper === 'เพศหญิง' || upper === 'female') return tProfile('genderFemale');
  if (upper === 'OTHER' || upper === 'ไม่ระบุตัวตน' || upper === 'other') return tProfile('genderOther');
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
  const t = useTranslations("Rank.LeaderboardList");
  const tProfile = useTranslations("Profile");

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
          {t("title")}
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
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700">{t("colRank")}</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 min-w-0">{t("colName")}</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center sm:text-left sm:pl-2 lg:pl-0">{t("colScore")}</div>
        <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-gray-700 text-center sm:pl-4 lg:pl-1">{t("colTier")}</div>
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
              {t("emptyData")}
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {safeItems.map((user, index) => (
              <div
                key={user.id}
                className={cn(
                  "grid grid-cols-[60px_1fr_100px_80px] sm:grid-cols-[70px_1fr_110px_90px] lg:grid-cols-[80px_1fr_120px_100px] gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-4 py-2.5 sm:py-2.5 lg:py-3 items-center transition-all duration-200 border-b border-gray-200 last:border-b-0",
                  user.rank <= 3 ? "hover:brightness-95" : "bg-white hover:bg-gray-50",
                  itemClassName
                )}
                style={getTopThreeRowStyle(user.rank)}
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
                    <Image
                      src={user.avatar || "/icons/icon-Profile/icon_P_Bit.png"}
                      alt={user.name}
                      fill
                      containerClassName="w-full h-full"
                      className="object-cover"
                      sizes="(max-width: 640px) 32px, 40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-[13px] sm:text-[13px] lg:text-[14px] font-normal text-gray-800 truncate">
                      {user.name}
                    </p>
                    {user.gender ? (
                      <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                        <span className="text-[11px] sm:text-[12px] text-gray-500 truncate">
                          {getTranslatedGender(user.gender, tProfile)}
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
                  <div
                    className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex-shrink-0 z-10"
                    style={{ filter: `drop-shadow(0 0 5px ${RANK_BADGE_GLOW[getRankByScore(user.score).name] ?? "transparent"})` }}
                  >
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

