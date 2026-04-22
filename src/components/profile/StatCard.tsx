import * as React from "react";
import { cn } from "@/lib/utils";
import { Image } from "@/components/common/Image";

export interface StatCardProps {
  className?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  className,
  icon,
  imageSrc,
  imageAlt = "Stat icon",
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-2 md:py-2 lg:px-3 lg:py-3",
        "flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3",
        "transition-colors duration-200 hover:bg-gray-50 cursor-pointer",
        className
      )}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "min-w-[36px] w-[36px] h-[36px]",
          "sm:min-w-[40px] sm:w-[40px] sm:h-[40px]",
          "md:min-w-[38px] md:w-[38px] md:h-[38px]",
          "lg:min-w-[44px] lg:w-[44px] lg:h-[44px]",
          "rounded-[10px]",
          "relative overflow-hidden",
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            containerClassName="w-full h-full"
            className="object-contain"
            sizes="(max-width: 640px) 36px, (max-width: 768px) 40px, (max-width: 1024px) 38px, 44px"
          />
        ) : (
          icon
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[16px] sm:text-[17px] md:text-[17px] lg:text-[19px] leading-[24px] font-bold text-gray-800">
          {title}
        </span>
        <span className="text-[10px] sm:text-[10px] md:text-[11px] leading-[14px] font-medium text-gray-600">
          {description}
        </span>
      </div>
    </div>
  );
};


