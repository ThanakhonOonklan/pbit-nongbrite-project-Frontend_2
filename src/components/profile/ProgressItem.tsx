import * as React from "react";
import { FaStar, FaCaretDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { KawaiiProgressBar } from "@/components/common/KawaiiProgressBar";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Profile.progress");
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
    <div className={cn("rounded-[12px] sm:rounded-[14px] overflow-hidden", className)}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      {/* Main section */}
      <div
        className="flex items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-4 cursor-pointer relative z-10 transition-all duration-200"
        style={{
          background: `linear-gradient(to right, ${hexToRgba(color, 0.08)}, transparent)`,
          borderLeft: `4px solid ${color}`,
        }}
        onClick={handleClick}
      >
        {/* Icon Box */}
        {icon && (
          <div
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-[10px]"
            style={{ backgroundColor: hexToRgba(color, 0.15), color }}
          >
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[15px] md:text-[14px] lg:text-[15px] leading-[18px] font-semibold text-gray-800 truncate">
              {title}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]" />
              <span className="text-[12px] md:text-[11px] lg:text-[12px] leading-[16px] font-bold" style={{ color }}>
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

        <button
          className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-current transition-all duration-200"
          style={isExpanded ? { borderColor: color, backgroundColor: hexToRgba(color, 0.08) } : undefined}
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
          aria-expanded={isExpanded}
        >
          <FaCaretDown
            className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200", isExpanded && "rotate-180")}
            style={{ color }}
          />
        </button>
      </div>

      {/* Dropdown section */}
      <div
        className={cn(
          "overflow-hidden transition-all relative z-0",
          isExpanded
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        )}
        style={{
          transitionDuration: "400ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          background: hexToRgba(color, 0.03),
          borderTop: isExpanded ? `1px solid ${hexToRgba(color, 0.2)}` : undefined,
        }}
      >
        {levels.length > 0 && (
          <div className="px-3 sm:px-4 py-3">
            <div className="grid grid-cols-3 gap-2">
              {levels.map((level) => (
                <div
                  key={level.level}
                  className={cn(
                    "flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-[10px]",
                    "transition-all duration-200 cursor-pointer border",
                    level.completed
                      ? "border-transparent"
                      : "bg-gray-50 border-gray-100"
                  )}
                  style={level.completed ? {
                    backgroundColor: hexToRgba(color, 0.1),
                    borderColor: hexToRgba(color, 0.25),
                  } : undefined}
                  onMouseEnter={(e) => {
                    if (level.completed) {
                      e.currentTarget.style.backgroundColor = hexToRgba(color, 0.2);
                    } else {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (level.completed) {
                      e.currentTarget.style.backgroundColor = hexToRgba(color, 0.1);
                    } else {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }
                  }}
                >
                  <span
                    className="text-[12px] sm:text-[13px] font-bold leading-none"
                    style={{ color: level.completed ? color : "#9CA3AF" }}
                  >
                    {t("levelPrefix", { level: level.level })}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <FaStar
                        key={star}
                        className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5")}
                        style={{ color: star <= level.stars ? "#FFD700" : "#E5E7EB" }}
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
