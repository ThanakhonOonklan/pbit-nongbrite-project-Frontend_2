"use client";

import { CountUp } from "@/components/common";
import { useTranslations } from "next-intl";

interface Stat {
  value: number;
  labelKey: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    value: 1547,  
    labelKey: "learners",
    suffix: "+",
  },
  {
    value: 63,     
    labelKey: "levels",
    suffix: "+",
  },
  {
    value: 7,  
    labelKey: "games",
    suffix: "+",
  },
  {
    value: 95,
    labelKey: "satisfaction",
    suffix: "%",
  },
];

export function StatsSection() {
  const t = useTranslations("Landing.Stats");
  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto min-h-[408px]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-[20px] bg-gradient-to-br from-[#F9FBFF] via-white to-[#F4F8FF] shadow-[0px_2px_8px_rgba(0,0,0,0.04),0px_1px_4px_rgba(0,0,0,0.02)]"
            >
              {/* Value */}
              <div className="mb-3">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1cb0f6]">
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={2}
                    delay={index * 0.2}
                    separator=","
                  />
                </span>
                {stat.suffix && (
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1cb0f6]">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {t(`items.${stat.labelKey}` as any)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

