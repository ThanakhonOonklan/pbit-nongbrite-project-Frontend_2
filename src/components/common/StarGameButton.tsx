"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaLock } from "react-icons/fa";

export type GameButtonStatus = "completed" | "locked" | "available";

export interface StarGameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  level?: number; // 1-9 เลขด่าน
  status?: GameButtonStatus; // สถานะของด่าน
  baseColor?: string; // สี base ของเกม (ใช้สำหรับ available status)
  buttonColor?: string; // Custom button color (hex format) - สำหรับ backward compatibility
  stars?: number; // 0-3 จำนวนดาวที่ได้จากด่าน (แสดงด้านบน)
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
  ({ className, level, status = "available", baseColor, buttonColor, stars = 0, disabled, ...props }, ref) => {
    // State สำหรับ tooltip
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    // จำกัดค่า level ระหว่าง 1-9
    const levelNumber = level ? Math.max(1, Math.min(9, level)) : undefined;
    // จำกัดค่า stars ระหว่าง 0-3
    const starCount = Math.max(0, Math.min(3, stars));

    // กำหนดสีตาม status
    let mainColor: string;
    let darkColor: string;
    let borderColor: string;
    // Locked status กดได้แต่เล่นไม่ได้ (ไม่ disabled)
    const isDisabled = disabled && status !== "locked";

    // Handler สำหรับ toggle tooltip
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && status !== "locked") {
        setIsTooltipOpen((prev) => !prev);
      }
      // เรียก onClick จาก props ถ้ามี
      props.onClick?.(e);
    };

    // ปิด tooltip เมื่อคลิกนอกพื้นที่
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node) &&
          buttonRef.current &&
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
      // สีทองสำหรับด่านที่เล่นผ่านแล้ว
      mainColor = "#FFD700";
      darkColor = "#D4AF37";
      borderColor = "#FFED4E";
    } else if (status === "locked") {
      // สีเทาสำหรับด่านที่ล็อค
      mainColor = "#9E9E9E";
      darkColor = "#757575";
      borderColor = "#BDBDBD";
    } else {
      // สีตาม baseColor ของแต่ละเกมสำหรับด่านที่ยังไม่ได้เล่น (available)
      const colorToUse = baseColor || buttonColor || "#1CB0F6";
      mainColor = colorToUse;
      darkColor = darkenColor(colorToUse, -20);
      borderColor = darkenColor(colorToUse, -10);
    }

    return (
      <div className="relative inline-block pt-3">
        {/* Stars above button - แสดงจำนวนดาวที่ได้ (0-3 ดาว) สำหรับทุกสถานะ */}
        <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-10">
          {Array.from({ length: 3 }).map((_, index) => {
            const isEarned = index < starCount;
            // สำหรับ completed: ดาวที่ได้ = สีทอง, ดาวที่ไม่ได้ = สีเทาจาง
            // สำหรับ available และ locked: ดาวทั้งหมด = สีเทาจาง
            const starColor = status === "completed" && isEarned ? "#FFD700" : "#CCCCCC";
            const starOpacity = status === "completed" && isEarned ? "1" : "0.5";
            
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
                  fill={starColor}
                  fillOpacity={starOpacity}
                />
              </svg>
            );
          })}
        </div>

        <button
          ref={(node) => {
            buttonRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          disabled={isDisabled}
          onClick={handleButtonClick}
          className={cn(
            "relative w-[80px] h-[80px] border-none rounded-[20px] group z-10",
            isDisabled && "cursor-not-allowed opacity-60",
            !isDisabled && "cursor-pointer",
            status === "locked" && "opacity-80",
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
            className={cn(
              "button_top block box-border border-[5px] rounded-[20px] w-full h-full -translate-y-[3.2px] transition-transform duration-100 ease-in-out flex items-center justify-center pointer-events-none p-4",
              !isDisabled && status !== "locked" && "group-hover:-translate-y-[5px] group-active:translate-y-0"
            )}
            style={{
              borderColor: borderColor,
              backgroundColor: mainColor,
            }}
          >
            {/* แสดง icon ล็อคสำหรับ locked status */}
            {status === "locked" ? (
              <FaLock 
                className="text-[32px] text-white"
                style={{ color: "#FFFFFF" }}
              />
            ) : (
              /* แสดงเลขด่าน 1-9 สำหรับ completed และ available */
              levelNumber && (
                <span 
                  className="text-[32px] font-bold leading-none select-none"
                  style={{
                    color: status === "completed" ? "#8B6914" : "#FFFFFF",
                  }}
                >
                  {levelNumber}
                </span>
              )
            )}
          </span>
        </button>
        
        {/* Elliptical shadow below button */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '80px',
            height: '20px',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '50%',
            transform: 'translateX(-50%) translateY(8px)',
            zIndex: 0,
          }}
        />

        {/* Tooltip Popup */}
        {isTooltipOpen && (
          <div
            ref={tooltipRef}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50"
            style={{
              animation: "fadeInSlideUp 0.3s ease-out",
            }}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px] border border-gray-200">
              {/* Example content */}
          
              
              {/* Start button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle start button click
                  setIsTooltipOpen(false);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Start
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

StarGameButton.displayName = "StarGameButton";

export { StarGameButton };

