"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TiltButton } from "react-tilt-button";
import { FaPlay } from "react-icons/fa";

export interface GameTooltipProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  sublabel?: string;
  onStart?: () => void;
  onClose?: () => void;
  buttonColor?: string;
  buttonSideColor?: string;
  buttonBorderColor?: string;
  tooltipRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const GameTooltip = React.forwardRef<HTMLDivElement, GameTooltipProps>(
  ({ children, className, label, sublabel, onStart, onClose, buttonColor = "#58CC02", buttonSideColor = "#46a302", buttonBorderColor = "#4db802", tooltipRef }, ref) => {
    const internalRef = React.useRef<HTMLDivElement | null>(null);

    // Click outside to close
    React.useEffect(() => {
      if (!onClose) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(e.target as Node)) {
          onClose();
        }
      };

      // Delay adding the listener to avoid the same click that opened the tooltip from immediately closing it
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (tooltipRef) {
            tooltipRef.current = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50"
        style={{
          animation: "fadeInSlideUp 0.3s ease-out",
        }}
      >
        <div className="relative">
          <div className={cn("bg-white rounded-xl shadow-lg p-4 min-w-[200px] border border-gray-200 flex flex-col items-center gap-3", className)}>
            {/* Custom children or default label layout */}
            {children ? (
              children
            ) : (
              <>
                {label && (
                  <p className="text-sm font-bold text-[#242E39]">{label}</p>
                )}
                {sublabel && (
                  <p className="text-xs text-gray-500">{sublabel}</p>
                )}
              </>
            )}

            {/* Start Button */}
            <div onClick={onStart}>
              <TiltButton
                width={151}
                height={54}
                elevation={5}
                pressInset={5}
                tilt={0}
                radius={12}
                motion={30}
                surfaceColor={buttonColor}
                sideColor={buttonSideColor}
                textColor="#ffffff"
                borderColor={buttonBorderColor}
                borderWidth={2}
                glareColor="#ffffff"
                glareOpacity={0.1}
                glareWidth={70}
              >
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                  <FaPlay className="w-3 h-3" />
                  เริ่มเกม
                </span>
              </TiltButton>
            </div>
          </div>
          {/* Arrow pointer pointing down - outer border */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "9px solid #E5E7EB",
            }}
          />
          {/* Arrow pointer pointing down - inner white */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full -mt-[1px]"
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid white",
            }}
          />
        </div>
      </div>
    );
  }
);

GameTooltip.displayName = "GameTooltip";
