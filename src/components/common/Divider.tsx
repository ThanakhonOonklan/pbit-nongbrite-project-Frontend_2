import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps {
  text?: string;
  className?: string;
  containerClassName?: string;
}

const Divider: React.FC<DividerProps> = ({
  text = "",
  className,
  containerClassName,
}) => {
  // If no text, show single line
  if (!text) {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="w-full h-0 border-t border-[#BCCCDC]"></div>
      </div>
    );
  }

  // If has text, show line with text in middle
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-[8px] w-full h-[34px]",
        containerClassName
      )}
    >
      {/* Left Divider Line */}
      <div className="flex flex-col items-start py-[4px] flex-1 flex-grow">
        <div className="w-full h-0 border-t border-[#BCCCDC]"></div>
      </div>

      {/* Text */}
      <div className="flex items-start p-[8px] shrink-0">
        <span
          className={cn(
            "text-[10px] leading-[18px] font-bold text-[#486581] whitespace-nowrap",
            className
          )}
        >
          {text}
        </span>
      </div>

      {/* Right Divider Line */}
      <div className="flex flex-col items-start py-[4px] flex-1 flex-grow">
        <div className="w-full h-0 border-t border-[#BCCCDC]"></div>
      </div>
    </div>
  );
};

Divider.displayName = "Divider";

export { Divider };

