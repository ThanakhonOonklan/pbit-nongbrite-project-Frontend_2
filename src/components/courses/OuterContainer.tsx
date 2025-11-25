"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/common/Image";

export interface OuterContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  widthClassName?: string;
  heightClassName?: string;
}

export const OuterContainer: React.FC<OuterContainerProps> = ({
  className,
  widthClassName = "max-w-3xl",
  heightClassName = "min-h-[360px]",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full justify-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative w-full rounded-[32px] bg-[#FDC369] p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.2)]",
          widthClassName
        )}
      >
        <div className="absolute inset-[-3px] -z-10 rounded-[34px] bg-gradient-to-br from-[#f5b75a] to-[#fdd086]" />
        <div className="absolute left-[20px] -top-[-286px] z-20 w-[100px] drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]">
          <Image
            src="/images/P_Bit/bit-01.svg"
            alt="P'Bit mascot"
            width={140}
            height={140}
            className="w-full h-auto"
            priority={false}
          />
        </div>

        <div className="relative rounded-[26px] border-[4px] border-[#DB9148] bg-[#016A66] p-8 shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)]">
          <div
            className={cn(
              "relative rounded-[18px] bg-[#016A66]/0",
              heightClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

OuterContainer.displayName = "OuterContainer";