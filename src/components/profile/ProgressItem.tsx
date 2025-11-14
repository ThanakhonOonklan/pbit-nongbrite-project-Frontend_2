import * as React from "react";
import { Star, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressItemProps {
  title: string;
  current: number;
  total: number;
  className?: string;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({ title, current, total, className }) => {
  const percent = Math.max(0, Math.min(100, (current / total) * 100));
  return (
    <div
      className={cn("flex items-center gap-3 bg-white rounded-[12px] border border-neutral-200 shadow-sm px-5 py-3", className)}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] leading-[18px] font-bold text-[#242E39]">{title}</span>
          <span className="text-[12px] leading-[16px] font-medium text-[#7F7F7F]">{current}/{total}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
          <div className="h-full bg-[#FFD300]" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-[#FFD300]" />
        <button className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:bg-neutral-50">
          <ChevronDown className="w-4 h-4 text-[#7F7F7F]" />
        </button>
      </div>
    </div>
  );
};


