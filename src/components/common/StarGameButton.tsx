"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { GameTooltip } from "./GameTooltip";
import { GameButton } from "./GameButton";
import { Image } from "./Image";

export type GameButtonStatus = "completed" | "locked" | "available";

export interface StarGameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  level?: number;
  status?: GameButtonStatus;
  baseColor?: string;
  buttonColor?: string;
  stars?: number;
  tooltipContent?: React.ReactNode;
}

/* Color utility */
const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

/* Star icon */
const StarIcon: React.FC<{
  isEarned: boolean;
  size?: number;
  showEarnedColor?: boolean;
}> = ({ isEarned, size = 24, showEarnedColor = false }) => {
  const starColor = showEarnedColor && isEarned ? "#FFD700" : "#AAAAAA";
  const starOpacity = isEarned ? "1" : "0.8";
  const strokeColor = showEarnedColor && isEarned ? "#B8860B" : "#888888";

  return (
    <svg
      viewBox="0 0 576 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none"
    >
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        fill={starColor}
        fillOpacity={starOpacity}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

const StarGameButton = React.forwardRef<HTMLButtonElement, StarGameButtonProps>(
  (
    {
      className,
      level,
      status = "available",
      baseColor,
      buttonColor,
      stars = 0,
      disabled,
      onClick,
      tooltipContent,
      ...props
    },
    ref
  ) => {
    /* Tooltip state */
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const levelNumber = level ? Math.max(1, Math.min(9, level)) : undefined;
    const starCount = Math.max(0, Math.min(3, stars));

    let mainColor: string;
    let darkColor: string;
    let borderColor: string;
    const isDisabled = disabled && status !== "locked";

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!isDisabled) {
        setIsTooltipOpen((prev) => !prev);
      }
      onClick?.(e);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isTooltipOpen &&
          tooltipRef.current &&
          buttonRef.current &&
          !tooltipRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsTooltipOpen(false);
        }
      };

      if (isTooltipOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isTooltipOpen]);

    if (status === "completed") {
      const colorToUse = baseColor || buttonColor || "#1CB0F6";
      mainColor = colorToUse;
      darkColor = darkenColor(colorToUse, -20);
      borderColor = darkenColor(colorToUse, -10);
    } else if (status === "locked") {
      mainColor = "#9E9E9E";
      darkColor = "#757575";
      borderColor = "#BDBDBD";
    } else {
      const colorToUse = baseColor || buttonColor || "#1CB0F6";
      mainColor = colorToUse;
      darkColor = darkenColor(colorToUse, -20);
      borderColor = darkenColor(colorToUse, -10);
    }

    return (
      <div className="relative inline-block pt-3">
        {/* Stars display */}
        <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-20 ">
          {Array.from({ length: 3 }).map((_, index) => {
            const isEarned = index < starCount;
            return (
              <StarIcon
                key={index}
                isEarned={isEarned}
                size={23}
                showEarnedColor={status === "completed"}
              />
            );
          })}
        </div>

        <GameButton
          ref={ref}
          buttonRef={buttonRef}
          mainColor={mainColor}
          darkColor={darkColor}
          borderColor={borderColor}
          status={status}
          disabled={disabled}
          onClick={handleButtonClick}
          className={className}
          {...props}
        >
          {status === "locked" ? (
            <Image
              src="/icons/game/lock.svg"
              alt="Locked"
              width={60}
              height={60}
              className="object-contain w-full h-full filter grayscale"
            />
          ) : (
            levelNumber && (
              <span className="text-[32px] font-bold leading-none select-none text-white">
                {/* Level number */}
                {levelNumber}
              </span>
            )
          )}
        </GameButton>

        {/* Tooltip popup */}
        {isTooltipOpen && (
          <GameTooltip tooltipRef={tooltipRef}>
            {tooltipContent !== undefined ? (
              tooltipContent
            ) : status === "locked" ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  แบบฝึกหัดสำหรับคุณ
                </h3>
                <p className="text-sm text-gray-600">
                  ทำทุกระดับด้านบนให้เสร็จเพื่อ
                  <br />
                  ปลดล็อกทักษะนี้!
                </p>
                <PrimaryButton
                  className="w-full py-1.5 px-3 text-sm"
                  variant="default"
                  size="sm"
                  disabled
                >
                  ล็อกอยู่
                </PrimaryButton>
              </div>
            ) : status === "completed" ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  ด่าน {levelNumber}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">ได้ดาว:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, index) => {
                      const isEarned = index < starCount;
                      return (
                        <StarIcon
                          key={index}
                          isEarned={isEarned}
                          size={16}
                          showEarnedColor={true}
                        />
                      );
                    })}
                  </div>
                </div>
                <PrimaryButton
                  className="w-full py-1.5 px-3 text-sm pointer-events-auto"
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  เล่นอีกครั้ง
                </PrimaryButton>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  ด่าน {levelNumber}
                </h3>
                <p className="text-sm text-gray-600">เริ่มผจภัยกันเลย!</p>
                <PrimaryButton
                  className="w-full py-1.5 px-3 text-sm pointer-events-auto"
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  เริ่มเล่น
                </PrimaryButton>
              </div>
            )}
          </GameTooltip>
        )}
      </div>
    );
  }
);

StarGameButton.displayName = "StarGameButton";

export { StarGameButton };
