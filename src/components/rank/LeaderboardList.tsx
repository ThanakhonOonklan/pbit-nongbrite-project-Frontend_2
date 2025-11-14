import * as React from "react";
import { Image } from "@/components/common/Image";
import AnimatedList from "@/components/common/AnimatedList";
import { Container } from "@/components/common/Container";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";

export interface LeaderboardListProps {
  items?: RankUser[];
  onItemSelect?: (user: RankUser, index: number) => void;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

const getMedalIcon = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "🏅";
};

const LeaderboardList: React.FC<LeaderboardListProps> = ({
  items = [],
  onItemSelect,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
}) => {
  const safeItems = items ?? [];

  return (
    <Container
      variant="white"
      as="aside"
      className={cn("flex flex-col overflow-hidden", className)}
    >
      <AnimatedList<RankUser>
        items={safeItems}
        onItemSelect={onItemSelect}
        enableArrowNavigation={enableArrowNavigation}
        displayScrollbar={displayScrollbar}
        initialSelectedIndex={initialSelectedIndex}
        className="flex-1 min-h-0"
        listClassName="px-3 py-4 pb-6 space-y-1.5"
        getKey={(user) => user.id}
        itemClassName={({ isActive }) =>
          cn(
            "relative flex items-center gap-2 rounded-[10px] p-2 transition-all duration-200 border-2 bg-white",
            isActive
              ? "border-[#1cb0f6] shadow-md"
              : "border-[#E0E0E0] hover:border-[#1cb0f6]/30 hover:shadow-sm",
            itemClassName
          )
        }
        renderItem={({ item: user }) => (
          <>
            <div className="w-[24px] flex-shrink-0 text-center">
              <span className="text-[14px] font-bold text-[#3c3c3c]">
                {user.rank}
              </span>
            </div>

            <div className="relative w-[36px] h-[36px] rounded-full bg-[#1e1e1e] shadow-md flex-shrink-0">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  containerClassName="w-full h-full rounded-full"
                  className="object-cover"
                  sizes="36px"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1cb0f6] to-[#17a3e3] flex items-center justify-center text-white font-bold text-[14px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#3c3c3c] truncate mb-0.5">
                {user.name}
              </p>
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-[11px] font-bold",
                    user.rank === 1
                      ? "text-[#FFD700]"
                      : user.rank === 2
                      ? "text-[#A8DADC]"
                      : user.rank === 3
                      ? "text-[#F4A261]"
                      : "text-[#3c3c3c]"
                  )}
                >
                  {user.score.toLocaleString()} คะแนน
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="text-[28px]">{getMedalIcon(user.rank)}</span>
            </div>
          </>
        )}
        emptyState={
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="text-[48px] mb-2">🏆</div>
            <p className="text-[14px] text-[#909090] text-center">
              ยังไม่มีข้อมูลอันดับ
            </p>
          </div>
        }
      />
    </Container>
  );
};

LeaderboardList.displayName = "LeaderboardList";

export { LeaderboardList };

