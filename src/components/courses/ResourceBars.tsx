"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Divider } from "@/components/common";
import { ResourceCard } from "./ResourceCard";

export interface ResourceBarsProps {
  heartCount?: number;
  scoreCount?: number;
  daystate?: number;
  className?: string;
}

export const ResourceBars: React.FC<ResourceBarsProps> = ({
  heartCount = 0,
  scoreCount = 0,
  daystate = 0,
  className,
}) => {
  if (heartCount <= 0 && scoreCount <= 0 && daystate <= 0) {
    return null;
  }

  return (
    <>
      <div className={cn("py-4 px-3", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResourceCard
            iconSrc=""
            iconAlt="หัวใจ"
            value={heartCount}
            iconBgColor="bg-[#FFD7D0]"
            hoverColor="hover:bg-[#FFE4E1]"
          />
          <ResourceCard
            iconSrc=""
            iconAlt="คะแนน"
            value={scoreCount}
            iconBgColor="bg-[#FFEECC]"
            hoverColor="hover:bg-[#FFF9E6]"
          />
          <ResourceCard
            iconSrc=""
            iconAlt="วันที่ติดต่อกัน"
            value={daystate}
            iconBgColor="bg-[#D0E7FF]"
            hoverColor="hover:bg-[#E6F3FF]"
          />
        </div>
      </div>
      <Divider />
    </>
  );
};

