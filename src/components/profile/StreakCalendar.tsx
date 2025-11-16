"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export interface DayData {
  day: string; // Day abbreviation (S, M, T, W, T, F, S)
  date: number; // Date number (18, 19, 20, etc.)
  status?: "default" | "selected-orange" | "selected-blue";
}

export interface StreakCalendarProps {
  title?: string;
  days?: DayData[];
  className?: string;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({

  days = [
    { day: "S", date: 18, status: "default" },
    { day: "M", date: 19, status: "selected-orange" },
    { day: "T", date: 20, status: "default" },
    { day: "W", date: 21, status: "selected-blue" },
    { day: "T", date: 22, status: "default" },
    { day: "F", date: 23, status: "default" },
    { day: "S", date: 24, status: "default" },
  ],
  className,
}) => {
  return (
    <Container
      variant="white"
      className={cn("p-6 rounded-b-none", className)}
    >
     
      
      {/* Calendar Days */}
      <div className="flex gap-2">
        {days.map((dayData, index) => {
          const isSelectedOrange = dayData.status === "selected-orange";
          const isSelectedBlue = dayData.status === "selected-blue";
          const isSelected = isSelectedOrange || isSelectedBlue;
          
          return (
            <div
              key={index}
              className={cn(
                "flex-1 flex flex-col items-center justify-center rounded-[12px] px-3 py-2 min-w-0",
                isSelectedOrange && "bg-[#FF9500]",
                isSelectedBlue && "bg-[#1CB0F6]",
                !isSelected && "bg-[#F6F9F8]"
              )}
            >
               {/* Day Abbreviation */}
               <span
                 className={cn(
                   "text-[9px] font-medium ",
                   isSelected ? "text-white" : "text-[#8B9DC3]"
                 )}
               >
                 {dayData.day}
               </span>
              
              {/* Date */}
              <span
                className={cn(
                  "text-[14px] font-bold",
                  isSelected ? "text-white" : "text-[#3C3C3C]"
                )}
              >
                {dayData.date}
              </span>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

StreakCalendar.displayName = "StreakCalendar";

