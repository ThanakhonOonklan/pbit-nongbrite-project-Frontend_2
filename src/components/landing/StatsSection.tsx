"use client";

import { CountUp } from "@/components/common";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    value: 1547,  // จาก leaderboard.totalUsers
    label: "ผู้เรียน",
    suffix: "+",
  },
  {
    value: 63,     // ตามจำนวนเกม
    label: "จำนวนด่าน",
    suffix: "+",
  },
  {
    value: 7,     // จาก gameData.length
    label: "เกมการเรียนรู้",
    suffix: "+",
  },
  {
    value: 95,    // คงค่าเดิม
    label: "ความพึงพอใจ",
    suffix: "%",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ตัวเลขที่บอกเล่าเรื่องราว
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            พบกับสถิติที่น่าประทับใจของแพลตฟอร์มการเรียนรู้ของเรา
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
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

