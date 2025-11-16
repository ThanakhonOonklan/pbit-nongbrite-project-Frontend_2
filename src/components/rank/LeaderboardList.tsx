import * as React from "react";
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
      as="aside"
      variant="white"
      className={cn("flex flex-col overflow-hidden rounded-t-none", className)}
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
        itemClassName={cn("", itemClassName)}
        renderItem={({ item: user }) => (
          <Container
            variant="white"
            className="flex items-center gap-2 p-3"
          >
            <Container
              variant="white"
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
              <span className="text-[28px]">{getMedalIcon(user.rank)}</span>
            </div>
          </Container>
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

