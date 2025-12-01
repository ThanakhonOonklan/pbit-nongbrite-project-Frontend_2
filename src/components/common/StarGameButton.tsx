"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StarGameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  stars?: number; // 0-3 ดาวที่ได้จากด่าน
  buttonColor?: string; // Custom button color (hex format)
}

// Helper function to darken a color
const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

const StarGameButton = React.forwardRef<HTMLButtonElement, StarGameButtonProps>(
  ({ className, stars = 0, buttonColor, ...props }, ref) => {
    // จำกัดค่า stars ระหว่าง 0-3
    const starCount = Math.max(0, Math.min(3, stars));

    // Default colors (blue)
    const defaultMainColor = "#1CB0F6";
    const defaultDarkColor = "#1280B5";
    const defaultBorderColor = "#1699D6";

    // Use custom color or default
    const mainColor = buttonColor || defaultMainColor;
    const darkColor = buttonColor ? darkenColor(buttonColor, -20) : defaultDarkColor;
    const borderColor = buttonColor ? darkenColor(buttonColor, -10) : defaultBorderColor;

    return (
      <div className="relative inline-block  pt-3">
        {/* Stars above button */}
        <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-10">
          {Array.from({ length: 3 }).map((_, index) => {
            const isEarned = index < starCount;
            return (
              <svg
                key={index}
                viewBox="0 0 576 512"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none"
              >
                <path
                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  fill={isEarned ? "#FFD700" : "#CCCCCC"}
                  fillOpacity={isEarned ? "1" : "0.5"}
                />
              </svg>
            );
          })}
        </div>

        <button
          ref={ref}
          className={cn(
            "w-[80px] h-[80px] border-none cursor-pointer rounded-[20px] group ",
            className
          )}
          style={{
            backgroundColor: darkColor,
            // CSS Variables
            "--button_radius": "20px",
            "--button_color": mainColor,
            "--button_outline_color": darkColor,
          } as React.CSSProperties}
          {...props}
        >
          <span 
            className="button_top block box-border border-[5px] rounded-[20px] w-full h-full -translate-y-[3.2px] transition-transform duration-100 ease-in-out flex items-center justify-center group-hover:-translate-y-[5px] group-active:translate-y-0 pointer-events-none p-4"
            style={{
              borderColor: borderColor,
              backgroundColor: mainColor,
              color: darkColor,
            }}
          >
            {/* Star icon with circle */}
            <svg
              viewBox="0 0 576 512"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none relative"
            >
            
              {/* Star - adjusted to center in new viewBox */}
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                fill={darkColor}
                fillOpacity="0.7"
              />
            </svg>
          </span>
        </button>
      </div>
    );
  }
);

StarGameButton.displayName = "StarGameButton";

export { StarGameButton };

