"use client";

import { CountUp } from "@/components/common";
import { useTranslations } from "next-intl";
import { Users, Gamepad2, Layers, Heart } from "lucide-react";

interface Stat {
  value: number;
  labelKey: string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const stats: Stat[] = [
  {
    value: 142,
    labelKey: "learners",
    suffix: "",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#1cb0f6", // Sky Blue (P'Bit)
    bgColor: "bg-blue-50",
  },
  {
    value: 252,
    labelKey: "levels",
    suffix: "",
    icon: <Layers className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#a855f7", // Purple (P'Momo)
    bgColor: "bg-purple-50",
  },
  {
    value: 7,
    labelKey: "games",
    suffix: "+",
    icon: <Gamepad2 className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#22c55e", // Green
    bgColor: "bg-green-50",
  },
  {
    value: 95,
    labelKey: "satisfaction",
    suffix: "%",
    icon: <Heart className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#ec4899", // Pink (Nong Brite)
    bgColor: "bg-pink-50",
  },
];

export function StatsSection() {
  const t = useTranslations("Landing.Stats");
  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            {t("title")}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#1cb0f6] to-[#ec4899] mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-8 rounded-[32px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden"
            >
              {/* Animated Background Shape */}
              <div 
                className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
                style={{ backgroundColor: stat.color }}
              />

              {/* Icon Container */}
              <div 
                className={`mb-6 p-4 rounded-2xl ${stat.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <span 
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                  style={{ color: stat.color }}
                >
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={2}
                    delay={index * 0.1}
                    separator=","
                  />
                </span>
                {stat.suffix && (
                  <span 
                    className="text-3xl md:text-4xl font-bold ml-1"
                    style={{ color: stat.color }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <h3 className="text-gray-500 font-medium uppercase tracking-wider text-sm md:text-base">
                {t(`items.${stat.labelKey}` as Parameters<typeof t>[0])}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

