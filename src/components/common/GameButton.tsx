"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type GameButtonStatus = "completed" | "locked" | "available";

export interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mainColor: string;
  darkColor: string;
  borderColor: string;
  status?: GameButtonStatus;
  className?: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ mainColor, darkColor, borderColor, status = "available", className, buttonRef, disabled, children, ...props }, ref) => {
    const isDisabled = disabled && status !== "locked";

    return (
      <>
        <button
          ref={(node) => {
            if (buttonRef) {
              buttonRef.current = node;
            }
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }
          }}
          disabled={isDisabled}
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
            {children}
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
      </>
    );
  }
);

GameButton.displayName = "GameButton";
