import * as React from "react";
import AnimatedList from "@/components/common/AnimatedList";
import { Container } from "@/components/common/Container";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";
import { FaMedal, FaTrophy } from "react-icons/fa";

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
  if (rank === 1) return <FaMedal className="w-8 h-8 text-[#FBBF24]" />;
  if (rank === 2) return <FaMedal className="w-8 h-8 text-[#A1A1AA]" />;
  if (rank === 3) return <FaMedal className="w-8 h-8 text-[#D97706]" />;
  return <FaMedal className="w-7 h-7 text-[#60A5FA]" />;
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
      as="aside"
      className={cn("flex flex-col overflow-hidden rounded-t-none shadow-[0_2px_8px_rgba(0,0,0,0.08)]", className)}
    >
      <AnimatedList<RankUser>
        items={safeItems}
        onItemSelect={onItemSelect}
        enableArrowNavigation={enableArrowNavigation}
        displayScrollbar={displayScrollbar}
        initialSelectedIndex={initialSelectedIndex}
        className="flex-1 min-h-0"
        listClassName="px-2 py-3 pb-4 sm:px-3 sm:py-4 sm:pb-5 md:px-3 md:py-4 md:pb-6 space-y-1.5"
        getKey={(user) => user.id}
        itemClassName={cn("", itemClassName)}
        renderItem={({ item: user }) => (
          <Container
            className="flex items-center gap-2 p-3"
          >
            <Container
              className="w-[36px] h-[36px] min-w-[36px] flex items-center justify-center p-0 rounded-full"
            >
              <span className="text-[14px] font-bold text-[#1CB0F6]">
                {user.rank}
              </span>
            </Container>

            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-[#1CB0F6] truncate mb-0.5">
                {user.name}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-medium text-[#616161]">
                  {user.score.toLocaleString()} คะแนน
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              {getMedalIcon(user.rank)}
            </div>
          </Container>
        )}
        emptyState={
          <div className="flex flex-col items-center justify-center h-full py-12">
            <FaTrophy className="w-12 h-12 mb-2 text-[#FBBF24]" />
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

