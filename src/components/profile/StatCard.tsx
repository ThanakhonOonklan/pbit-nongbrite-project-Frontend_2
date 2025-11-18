import * as React from "react";
import { cn } from "@/lib/utils";
import { Trophy, Lightning, Flame, Star } from "phosphor-react";

export type StatType = "rank" | "points" | "streak" | "exp" | "custom";

export interface StatCardProps {
  className?: string;
  type?: StatType;
  icon?: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
}

const typeConfig: Record<StatType, { icon: React.ReactNode; bgColor: string }> = {
  rank: { icon: <Trophy className="w-7 h-7 text-[#1CB0F6]" weight="fill" />, bgColor: "bg-[#F6F9F8]" },
  points: { icon: <Lightning className="w-7 h-7 text-[#FFD300]" weight="fill" />, bgColor: "bg-[#F6F9F8]" },
  streak: { icon: <Flame className="w-7 h-7 text-[#FF7A00]" weight="fill" />, bgColor: "bg-[#F6F9F8]" },
  exp: { icon: <Star className="w-7 h-7 text-[#FFB703]" weight="fill" />, bgColor: "bg-[#F6F9F8]" },
  custom: { icon: null, bgColor: "bg-[#F6F9F8]" },
};

export const StatCard: React.FC<StatCardProps> = ({
  className,
  type = "custom",
  icon,
  title,
  description,
  iconBgColor,
}) => {
  const config = typeConfig[type];
  const displayIcon = icon ?? config.icon;
  const bgColor = iconBgColor || config.bgColor;

  return (
    <div className={cn(
      "flex items-center gap-4 bg-white rounded-[16px] border border-[#E5E5E5] px-6 py-5",
      className
    )}>
      <div
        className={cn(
          "flex items-center justify-center min-w-[56px] w-[56px] h-[56px] rounded-[14px]",
          bgColor
        )}
      >
        {displayIcon}
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


