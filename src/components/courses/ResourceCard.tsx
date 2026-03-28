"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ResourceCardProps {
  iconSrc?: string; // optional - ถ้าไม่มีจะไม่แสดงรูป
  icon?: React.ReactNode; // optional - React icon component
  iconAlt: string;
  value: number | string;
  iconBgColor: string;
  hoverColor?: string; // สีพื้นหลังเมื่อ hover
  tooltipContent?: React.ReactNode; // เนื้อหา tooltip เมื่อ hover
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  iconSrc,
  icon,
  iconAlt,
  value,
  iconBgColor,
  hoverColor,
  tooltipContent,
  className,
}) => {
  const card = (
    <div
      className={cn(
        "bg-white rounded-[12px] px-2 py-1.5 sm:px-2 sm:py-1.5 border border-gray-200 hover:border-white",
        "flex items-center gap-1.5 sm:gap-2",
        "transition-all duration-200 cursor-pointer",
        hoverColor || "hover:bg-gray-50",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "min-w-[28px] w-[28px] h-[28px]",
          "sm:min-w-[32px] sm:w-[32px] sm:h-[32px]",
          "rounded-[10px]",
          "relative overflow-hidden",
          iconBgColor
        )}
      >
        {iconSrc && iconSrc.trim() !== "" ? (
          <Image
            src={iconSrc}
            alt={iconAlt}
            fill
            containerClassName="w-full h-full"
            className="object-contain"
            sizes="(max-width: 640px) 28px, 32px"
          />
        ) : icon ? (
          icon
        ) : null}
      </div>
      <span className="text-[14px] sm:text-[15px] font-bold text-gray-800">
        {value}
      </span>
    </div>
  );

  if (!tooltipContent) return card;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="p-0 border-0 bg-transparent shadow-none max-w-[260px]"
        >
          <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200">
            {tooltipContent}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
