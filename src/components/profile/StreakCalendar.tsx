"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { Image } from "@/components/common/Image";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";

export interface DayData {
  day: string;
  date: number;
  status?: "completed" | "missed";
}

export interface StreakCalendarProps {
  title?: string;
  subtitle?: string;
  days?: DayData[];
  className?: string;
  mascotSrc?: string;
  mascotAlt?: string;
  mascotWidth?: number;
  mascotHeight?: number;
  mascotWrapperClassName?: string;
  mascotClassName?: string;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  title = "วันที่เล่นต่อเนื่อง",
  subtitle = "--------",
  days = [
    { day: "S", date: 18, status: "completed" },
    { day: "M", date: 19, status: "completed" },
    { day: "T", date: 20, status: "completed" },
    { day: "W", date: 21, status: "missed" },
    { day: "T", date: 22, status: "missed" },
    { day: "F", date: 23, status: "missed" },
    { day: "S", date: 24, status: "missed" },
  ],
  className,
  mascotSrc = "/images/Nong_brite/nong-brite-06.svg",
  mascotAlt = "Nong Brite",
  mascotWidth = 70,
  mascotHeight = 120,
  mascotWrapperClassName = "w-[102px] h-[100px]",
  mascotClassName,
}) => {
  const statusStyles = {
    completed: {
      bg: "bg-[#1CB0F6]",
      icon: <FaCheck className="w-[14px] h-[14px] text-white" />,
    },
    missed: {
      bg: "bg-[#E5E7EB]",
      icon: null,
    },
  };

  return (
    <Container variant="white" className={cn("p-5", className)}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[18px] font-bold uppercase tracking-wide text-[#1C2A3A]">
            {title}
          </div>
          <p className="text-sm text-[#8B9DC3]">{subtitle}</p>
        </div>
        <div
          className={cn(
            "flex-shrink-0",
            mascotWrapperClassName
          )} 
        >
          <Image
            src={mascotSrc}
            alt={mascotAlt}
            width={mascotWidth}
            height={mascotHeight}
            className={cn("object-contain", mascotClassName)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {days.map((day, index) => {
          const statusKey: keyof typeof statusStyles =
            day.status && statusStyles[day.status]
              ? day.status
              : "missed";
          const styles = statusStyles[statusKey];
          return (
            <div key={`${day.day}-${index}`} className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-[#8B9DC3]">
                {day.day}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  styles.bg
                )}
              >
                {styles.icon}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

StreakCalendar.displayName = "StreakCalendar";

