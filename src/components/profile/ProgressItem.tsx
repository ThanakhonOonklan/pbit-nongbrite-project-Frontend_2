import * as React from "react";
import { FaStar, FaCaretDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface LevelData {
  level: number;
  stars: number; // 0-3
  completed: boolean;
}

export interface ProgressItemProps {
  title: string;
  current: number;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  levels?: LevelData[];
  className?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

// Helper function to lighten a color
const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const R = (num >> 16) & 255;
  const G = (num >> 8) & 255;
  const B = num & 255;
  
  const factor = percent / 100;
  const newR = Math.round(R + (255 - R) * factor);
  const newG = Math.round(G + (255 - G) * factor);
  const newB = Math.round(B + (255 - B) * factor);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export const ProgressItem: React.FC<ProgressItemProps> = ({ 
  title, 
  total, 
  icon,
  color = "#1CB0F6",
  levels = [],
  className,
  isExpanded = false,
  onToggle,
}) => {
  const totalStarsEarned = levels.reduce((sum, level) => sum + level.stars, 0);
  const maxStars = total * 3; // 9 ด่าน × 3 ดาวต่อด่าน = 27
  
  const percent = Math.max(0, Math.min(100, (totalStarsEarned / maxStars) * 100));
  
  const handleClick = () => {
    onToggle?.();
  };
  
  return (
    <div className={cn("bg-white rounded-[14px]", className)}>
      {/* Main section */}
      <div
        className="flex items-center gap-3 px-4 py-4 rounded-[14px] transition-colors duration-200 hover:bg-gray-50 cursor-pointer relative z-10"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        onClick={handleClick}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon && <span className="flex-shrink-0" style={{ color }}>{icon}</span>}
              <span className="text-[15px] md:text-[14px] lg:text-[15px] leading-[18px] font-semibold text-gray-800">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="w-4 h-4 text-[#FFD700]" />
            <span className="text-[12px] md:text-[11px] lg:text-[12px] leading-[16px] font-medium text-gray-600">
              {totalStarsEarned}/{maxStars}
            </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#E5F8FF] overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${percent}%`,
                backgroundImage: `linear-gradient(to right, ${color}, ${lightenColor(color, 20)})`
              }} 
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={cn(
              "w-7 h-7 inline-flex items-center justify-center rounded-full bg-white border border-neutral-200",
              "hover:bg-[#F5FAFF] hover:border-[#1CB0F6] transition-all duration-200",
              isExpanded && "bg-[#F5FAFF] border-[#1CB0F6]"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-expanded={isExpanded}
          >
            <FaCaretDown 
              className={cn(
                "w-4 h-4 text-[#7F7F7F] transition-transform duration-200",
                isExpanded && "rotate-180"
              )} 
            />
          </button>
        </div>
      </div>
      
      {/* Dropdown section */}
      <div 
        className={cn(
          "overflow-hidden transition-all relative z-0",
          isExpanded 
            ? "max-h-[500px] opacity-100 scale-y-100 translate-y-0" 
            : "max-h-0 opacity-0 scale-y-95 -translate-y-2"
        )}
        style={{
          transitionDuration: "400ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {levels.length > 0 && (
          <div 
            className="px-4 py-3"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
          <div className="grid grid-cols-3 gap-2">
            {levels.map((level) => (
              <div
                key={level.level}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-2 rounded-lg",
                  level.completed ? "bg-[#F5FAFF]" : "bg-gray-50"
                )}
              >
                <span className="text-[13px] font-semibold text-gray-700">
                  ด่าน {level.level}
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((star) => (
                    <FaStar
                      key={star}
                      className={cn(
                        "w-3 h-3",
                        star <= level.stars ? "text-[#FFD700]" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};


