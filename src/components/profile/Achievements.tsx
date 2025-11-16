"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import AnimatedList from "@/components/common/AnimatedList";
import { cn } from "@/lib/utils";

export interface AchievementItem {
  icon: string;
  name: string;
  completed: boolean;
}

export interface AchievementsProps {
  title?: string;
  achievements?: AchievementItem[];
  className?: string;
}

const defaultAchievements: AchievementItem[] = [
  { icon: "🌱", name: "ผู้เริ่มต้น", completed: true },
  { icon: "🏆", name: "ชนะ 10 ครั้ง", completed: true },
  { icon: "🔥", name: "สตรีค 7 วัน", completed: true },
  { icon: "💯", name: "คะแนนเต็ม", completed: false },
  { icon: "📚", name: "เรียน 100 ครั้ง", completed: false },
  { icon: "🎯", name: "ชนะ 50 ครั้ง", completed: false },
  { icon: "⚡", name: "สตรีค 30 วัน", completed: false },
  { icon: "👑", name: "ระดับสูงสุด", completed: false },
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
              <span className="text-[#19C371] text-[18px]">✓</span>
            )}
          </>
        )}
      />
    </Container>
  );
};

Achievements.displayName = "Achievements";

