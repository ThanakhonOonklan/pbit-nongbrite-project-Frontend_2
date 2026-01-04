"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/common";

export interface ResourceCardProps {
  iconSrc?: string; // optional - ถ้าไม่มีจะไม่แสดงรูป
  iconAlt: string;
  value: number;
  iconBgColor: string;
  hoverColor?: string; // สีพื้นหลังเมื่อ hover
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  iconSrc,
  iconAlt,
  value,
  iconBgColor,
  hoverColor,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] px-2 py-1.5 sm:px-2 sm:py-1.5",
        "flex items-center gap-1.5 sm:gap-2",
        "transition-colors duration-200 cursor-pointer",
        hoverColor || "hover:bg-gray-50",
        className
      )}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
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
        ) : null}
      </div>
      <span className="text-[14px] sm:text-[15px] font-bold text-gray-800">
        {value}
      </span>
    </div>
  );
};

