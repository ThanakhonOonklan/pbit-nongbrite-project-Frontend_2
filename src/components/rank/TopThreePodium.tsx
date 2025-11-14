"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { Container } from "@/components/common/Container";
import { RankUser } from "@/types";
import { cn } from "@/lib/utils";

export interface TopThreePodiumProps {
  topThree: RankUser[];
  className?: string;
}

const TopThreePodium: React.FC<TopThreePodiumProps> = ({ topThree, className }) => {
  // Arrange as [2nd, 1st, 3rd] for display
  const arranged = [
    topThree.find((u) => u.rank === 2),
    topThree.find((u) => u.rank === 1),
    topThree.find((u) => u.rank === 3),
  ].filter(Boolean) as RankUser[];

  const getPodiumHeight = (rank: number) => {
    if (rank === 1) return "h-[200px]";
    if (rank === 2) return "h-[160px]";
    return "h-[130px]";
  };

  const getPodiumColors = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          color: "#1CB0F6",
          shadow: "#1899D6",
          side: "#1485C2",
          top: "#4FD0FF",
        };
      case 2:
        return {
          color: "#58C3FF",
          shadow: "#3FA9E6",
          side: "#2F8DC2",
          top: "#7AD5FF",
        };
      case 3:
        return {
          color: "#8ED4FF",
          shadow: "#6AB8E6",
          side: "#4D9ED1",
          top: "#B6E5FF",
        };
      default:
        return {
          color: "#1CB0F6",
          shadow: "#1899D6",
          side: "#1485C2",
          top: "#4FD0FF",
        };
    }
  };

  return (
    <Container
      className={cn("pt-6 px-6 pb-4 mt-4 overflow-hidden", className)}
    >
      {/* Podium Container */}
      <div className="flex items-end justify-center gap-6 overflow-visible ">
        {arranged.map((user) => {
          const podiumColors = getPodiumColors(user.rank);
          const podiumStyle = {
            backgroundColor: podiumColors.color,
            boxShadow: `0px -20px 0px 0px ${podiumColors.shadow}` + `, 0px -20px 0px 0px ${podiumColors.shadow}` + `, 0px 0px 0px 0px ${podiumColors.shadow}`,
            "--podium-shadow": podiumColors.shadow,
            "--podium-side": podiumColors.side,
            "--podium-top": podiumColors.top,
          } as React.CSSProperties;

          return (
            <div
              key={user.id}
              className={cn(
                "relative flex flex-col items-center transition-all duration-300",
                user.rank === 1 ? "w-[140px]" : "w-[120px]"
              )}
            >
            {/* Avatar */}
            <div
              className={cn(
                "relative rounded-full shadow-lg mb-2 bg-white overflow-hidden",
                user.rank === 1
                  ? "w-[70px] h-[70px]"
                  : "w-[60px] h-[60px]"
              )}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  containerClassName="w-full h-full rounded-full"
                  className="object-cover"
                  sizes={user.rank === 1 ? "70px" : "60px"}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1cb0f6] to-[#17a3e3] flex items-center justify-center text-white font-bold text-[24px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name */}
            <p
              className={cn(
                "font-bold text-center mb-4 truncate w-full px-2 text-[#3c3c3c]",
                user.rank === 1 ? "text-[14px]" : "text-[13px]"
              )}
              title={user.name}
            >
              {user.name}
            </p>

            {/* Podium */}
            <div
              className={cn(
                "relative w-full rounded-t-[12px] rounded-b-none flex flex-col items-center justify-center transition-all duration-300 text-white mt-6",
                "after:content-[''] after:absolute after:top-[-30px] after:bottom-0 after:right-[-10px] after:w-[10px] after:rounded-t-[12px] after:bg-[var(--podium-shadow)] after:-z-10",
                getPodiumHeight(user.rank)
              )}
              style={podiumStyle}
            >
              <span
                className={cn(
                  "font-bold mb-3 text-white",
                  user.rank === 1 ? "text-[48px]" : "text-[40px]"
                )}
              >
                {user.rank}
              </span>
              
              {/* Score in Podium */}
              <div className="flex flex-col items-center gap-1">
                <span className={cn(
                  "font-bold text-white",
                  user.rank === 1 ? "text-[20px]" : "text-[18px]"
                )}>
                  {user.score.toLocaleString()}
                </span>
                <span className="text-[13px] font-bold text-white/90">
                  คะแนน
                </span>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

TopThreePodium.displayName = "TopThreePodium";

export { TopThreePodium };

