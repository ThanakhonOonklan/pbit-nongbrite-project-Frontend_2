import * as React from "react";
import { FaStar, FaCaretDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { KawaiiProgressBar } from "@/components/common/KawaiiProgressBar";

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

  // Helper function to convert hex color to rgba
  const hexToRgba = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const handleClick = () => {
    onToggle?.();
  };

  return (
    <div className={cn("bg-white rounded-[10px]", className)}>
      {/* Main section */}
      <div
        className="flex items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-4 rounded-[12px] sm:rounded-[14px] transition-colors duration-200 hover:bg-gray-50 cursor-pointer relative z-10"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        onClick={handleClick}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {icon && (
                <span className="flex-shrink-0" style={{ color }}>
                  {icon}
                </span>
              )}
              <span className="text-[15px] md:text-[14px] lg:text-[15px] leading-[18px] font-semibold text-gray-800">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]" />
              <span className="text-[12px] md:text-[11px] lg:text-[12px] leading-[16px] font-medium text-gray-600">
                {totalStarsEarned}/{maxStars}
              </span>
            </div>
          </div>
          <KawaiiProgressBar
            value={totalStarsEarned}
            min={0}
            max={maxStars}
            color={color}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "w-6 h-6 sm:w-7 sm:h-7 inline-flex items-center justify-center rounded-full bg-white border border-neutral-200",
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
                "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7F7F7F] transition-transform duration-200",
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
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              {levels.map((level) => (
                <div
                  key={level.level}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-2 rounded-lg",
                    "transition-all duration-200 cursor-pointer",
                    !level.completed && "bg-gray-50"
                  )}
                  style={level.completed ? {
                    backgroundColor: hexToRgba(color, 0.1),
                  } : undefined}
                  onMouseEnter={(e) => {
                    if (level.completed) {
                      e.currentTarget.style.backgroundColor = hexToRgba(color, 0.2);
                    } else {
                      e.currentTarget.style.backgroundColor = "#f3f4f6"; // gray-100
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (level.completed) {
                      e.currentTarget.style.backgroundColor = hexToRgba(color, 0.1);
                    } else {
                      e.currentTarget.style.backgroundColor = "#f9fafb"; // gray-50
                    }
                  }}
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
                          star <= level.stars
                            ? "text-[#FFD700]"
                            : "text-gray-300"
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
