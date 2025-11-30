"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import AnimatedList from "@/components/common/AnimatedList";
import { cn } from "@/lib/utils";
import {
  FaSeedling,
  FaTrophy,
  FaFire,
  FaShieldAlt,
  FaBook,
  FaBullseye,
  FaBolt,
  FaCrown,
  FaCheckCircle,
} from "react-icons/fa";

export interface AchievementItem {
  icon: React.ReactNode;
  name: string;
  completed: boolean;
}

export interface AchievementsProps {
  title?: string;
  achievements?: AchievementItem[];
  className?: string;
}

const defaultAchievements: AchievementItem[] = [
  { icon: <FaSeedling className="w-6 h-6 text-[#19C371]" />, name: "ผู้เริ่มต้น", completed: true },
  { icon: <FaTrophy className="w-6 h-6 text-[#FBBF24]" />, name: "ชนะ 10 ครั้ง", completed: true },
  { icon: <FaFire className="w-6 h-6 text-[#FF7A00]" />, name: "สตรีค 7 วัน", completed: true },
  { icon: <FaShieldAlt className="w-6 h-6 text-[#2563EB]" />, name: "คะแนนเต็ม", completed: false },
  { icon: <FaBook className="w-6 h-6 text-[#7C3AED]" />, name: "เรียน 100 ครั้ง", completed: false },
  { icon: <FaBullseye className="w-6 h-6 text-[#DC2626]" />, name: "ชนะ 50 ครั้ง", completed: false },
  { icon: <FaBolt className="w-6 h-6 text-[#FACC15]" />, name: "สตรีค 30 วัน", completed: false },
  { icon: <FaCrown className="w-6 h-6 text-[#F59E0B]" />, name: "ระดับสูงสุด", completed: false },
];

export const Achievements: React.FC<AchievementsProps> = ({
  title = "ความสำเร็จ",
  achievements = defaultAchievements,
  className,
}) => {
  return (
    <Container
      variant="white"
      className={cn("p-6 rounded-t-none", className)}
    >
      <h4 className="text-[16px] font-bold text-[#3c3c3c] mb-3">
        {title}
      </h4>
      <AnimatedList<AchievementItem>
        items={achievements}
        enableArrowNavigation={false}
        displayScrollbar
        className="max-h-[200px]"
        listClassName="max-h-[200px] space-y-2"
        itemClassName={({ item: achievement }) =>
          cn(
            "flex items-center gap-3 rounded-[12px] border-2 p-3 transition-all",
            achievement.completed
              ? "bg-gradient-to-br from-[#E8F5FF] to-[#F0F9FF] border-[#1cb0f6]/30"
              : "bg-white border-[#E0E0E0] opacity-60"
          )
        }
        renderItem={({ item: achievement }) => (
          <>
            <span className="text-[24px]">{achievement.icon}</span>
            <span
              className={cn(
                "text-[14px] font-bold flex-1",
                achievement.completed ? "text-[#3c3c3c]" : "text-[#909090]"
              )}
            >
              {achievement.name}
            </span>
            {achievement.completed && (
              <FaCheckCircle className="w-5 h-5 text-[#19C371]" />
            )}
          </>
        )}
      />
    </Container>
  );
};

Achievements.displayName = "Achievements";

