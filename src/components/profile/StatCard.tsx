import * as React from "react";
import { cn } from "@/lib/utils";

export type StatType = "rank" | "points" | "streak" | "exp" | "custom";

export interface StatCardProps {
  className?: string;
  type?: StatType;
  icon?: string;
  emoji?: string;
  title: string;
  description: string;
  iconBgColor?: string;
}

const typeConfig: Record<StatType, { emoji: string; bgColor: string }> = {
  rank: { emoji: "🏆", bgColor: "bg-[#F6F9F8]" },
  points: { emoji: "⚡", bgColor: "bg-[#F6F9F8]" },
  streak: { emoji: "🔥", bgColor: "bg-[#F6F9F8]" },
  exp: { emoji: "⭐", bgColor: "bg-[#F6F9F8]" },
  custom: { emoji: "", bgColor: "bg-[#F6F9F8]" },
};

export const StatCard: React.FC<StatCardProps> = ({ 
  className, 
  type = "custom",
  emoji,
  title, 
  description,
  iconBgColor
}) => {
  const config = typeConfig[type];
  const displayEmoji = emoji || config.emoji;
  const bgColor = iconBgColor || config.bgColor;

  return (
    <div className={cn(
      "flex items-center gap-4 bg-white rounded-[16px] border border-[#E5E5E5] px-6 py-5",
      className
    )}>
      <div className={cn(
        "flex items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-[14px] text-[32px]",
        bgColor
      )}>
        {displayEmoji}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[16px] leading-[20px] font-bold text-[#3C3C3C]">
          {title}
        </span>
        <span className="text-[13px] leading-[18px] font-medium text-[#AFAFAF]">
          {description}
        </span>
      </div>
    </div>
  );
};


