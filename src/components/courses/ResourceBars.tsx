"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Divider } from "@/components/common";
import { ResourceCard } from "./ResourceCard";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface ResourceBarsProps {
  heartCount?: number;
  maxHeartCount?: number;
  lastResetAt?: string;
  scoreCount?: number;
  daystate?: number;
  className?: string;
  showDivider?: boolean;
}

export const ResourceBars: React.FC<ResourceBarsProps> = ({
  heartCount = 0,
  maxHeartCount = 5,
  lastResetAt,
  scoreCount = 0,
  daystate = 0,
  className,
  showDivider = true,
}) => {
  const t = useTranslations("Courses.ResourceBars");
  // console.log("[ResourceBars] props:", { heartCount, scoreCount, daystate });

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (heartCount >= maxHeartCount || !lastResetAt) {
      setTimeLeft(null);
      return;
    }

    // Calculate the next midnight based on local time
    const getNextMidnight = () => {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      return tomorrow.getTime();
    };

    const nextHeartTime = getNextMidnight();

    // Execute immediately before interval
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = nextHeartTime - now;

      if (distance <= 0) {
        setTimeLeft(t("heartResetting"));
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (hours > 0) {
           setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${t("hours")}`);
        } else {
           setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${t("minutes")}`);
        }
      }
    };
    
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [heartCount, maxHeartCount, lastResetAt]);

  if (heartCount <= 0 && scoreCount <= 0 && daystate <= 0) {
    // console.log("[ResourceBars] All values are 0, returning null");
    return null;
  }

  const isFull = heartCount >= maxHeartCount;

  return (
    <>
      <div className={cn("py-4 px-3", className)}>
        <div className="grid grid-cols-3 gap-3">
          <ResourceCard
            icon={<Image src="/icons/Heart.svg" alt="Heart" width={28} height={28} className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm" />}
            iconAlt={t("hearts")}
            value={heartCount >= maxHeartCount ? heartCount : `${heartCount}/${maxHeartCount}`}
            iconBgColor="bg-transparent"
            hoverColor="hover:bg-[#FFE4E1]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">{t("hearts")}</span>
                <div className="flex gap-2 my-1">
                  {Array.from({ length: maxHeartCount }, (_, i) => (
                    <Image
                      key={i}
                      src="/icons/Heart.svg"
                      alt="Heart"
                      width={28}
                      height={28}
                      className={cn("w-7 h-7", i >= heartCount && "opacity-30 grayscale")}
                    />
                  ))}
                </div>
                {!isFull && timeLeft && (
                  <p className="text-[13px] text-[#FF6B6B] font-bold mt-1">
                    {t("nextHeartIn", { time: timeLeft })}
                  </p>
                )}

              </div>
            }
          />
          <ResourceCard
            icon={<Image src="/icons/BookOpen.svg" alt="Score" width={28} height={28} className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm" />}
            iconAlt={t("totalScoreNow")}
            value={scoreCount}
            iconBgColor="bg-transparent"
            hoverColor="hover:bg-[#FFF9E6]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">{t("totalScoreNow")}</span>
                <div className="flex items-center gap-2">
                  <Image src="/icons/BookOpen.svg" alt="Score" width={24} height={24} className="w-6 h-6" />
                  <span className="text-2xl font-bold text-[#FFB800]">{scoreCount}</span>
                </div>
                <p className="text-[13px] text-gray-600 font-medium">
                  {t("totalScoreDesc")}
                </p>

              </div>
            }
          />
          <ResourceCard
            icon={<Image src="/icons/Flame.svg" alt="Streak" width={28} height={28} className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm" />}
            iconAlt={t("streakDays")}
            value={daystate}
            iconBgColor="bg-transparent"
            hoverColor="hover:bg-[#FFF0E0]"
            tooltipContent={
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-base font-bold">{t("streakDays")}</span>
                <div className="flex items-center gap-2">
                  <Image src="/icons/Flame.svg" alt="Streak" width={24} height={24} className="w-6 h-6" />
                  <span className="text-2xl font-bold text-[#FF8C00]">{daystate} {t("daysUnit")}</span>
                </div>
                <p className="text-[13px] text-gray-600 font-medium">
                  {daystate > 0
                    ? t("streakExcellent", { days: daystate })
                    : t("streakStart")}
                </p>

              </div>
            }
          />
        </div>
      </div>
      {showDivider && <Divider />}
    </>
  );
};

