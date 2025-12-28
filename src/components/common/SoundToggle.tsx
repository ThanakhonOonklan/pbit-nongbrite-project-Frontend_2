"use client";

import * as React from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { cn } from "@/lib/utils";

export interface SoundToggleProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
  isOn,
  onToggle,
  className,
}) => {
  const handleClick = () => {
    onToggle(!isOn);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative w-[64px] h-[32px] rounded-full transition-colors duration-200",
        isOn ? "bg-[#1CB0F6]" : "bg-[#E5E5E5]",
        className
      )}
      aria-pressed={isOn}
    >
      {/* Icon - positioned on left when on, right when off */}
      <div className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-opacity duration-200 z-0",
        isOn ? "opacity-100" : "opacity-0"
      )}>
        <IoVolumeHigh className="w-5 h-5 text-white" />
      </div>
      <div className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-opacity duration-200 z-0",
        !isOn ? "opacity-100" : "opacity-0"
      )}>
        <IoVolumeMute className="w-5 h-5 text-gray-500" />
      </div>
      
      {/* Toggle circle */}
      <span
        className={cn(
          "absolute top-[2px] left-[2px] w-[28px] h-[28px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transform transition-transform duration-200 z-10",
          isOn && "translate-x-[32px]"
        )}
      />
    </button>
  );
};

SoundToggle.displayName = "SoundToggle";

