"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GameTooltipProps {
  children: React.ReactNode;
  className?: string;
  tooltipRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const GameTooltip = React.forwardRef<HTMLDivElement, GameTooltipProps>(
  ({ children, className, tooltipRef }, ref) => {
    return (
      <div
        ref={(node) => {
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
          <div className={cn("bg-white rounded-lg shadow-lg p-4 min-w-[240px] border border-gray-200", className)}>
            {children}
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

