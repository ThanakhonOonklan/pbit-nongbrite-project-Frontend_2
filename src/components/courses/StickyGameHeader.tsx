import * as React from "react";

export interface StickyGameHeaderProps {
  part: number;
  title: string;
  color: string;
  shadowColor: string;
}

export const StickyGameHeader: React.FC<StickyGameHeaderProps> = ({
  part,
  title,
  color,
  shadowColor,
}) => {
  return (
    <div className="sticky top-0 z-[5] flex justify-center py-3 transition-all duration-300">
      <div 
        className="rounded-[12px] px-16 py-2 min-w-[360px] transition-all duration-300"
        style={{
          backgroundColor: color,
          boxShadow: `0px 4px 0px 0px ${shadowColor}`,
        }}
      >
        <div className="text-white text-[12px] font-bold">Part {part}</div>
        <div className="text-white text-[16px] font-black">{title}</div>
      </div>
    </div>
  );
};

