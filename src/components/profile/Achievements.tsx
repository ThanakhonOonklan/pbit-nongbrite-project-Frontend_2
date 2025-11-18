"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import AnimatedList from "@/components/common/AnimatedList";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Trophy,
  Flame,
  ShieldCheck,
  Book,
  Target,
  Lightning,
  Crown,
  CheckCircle,
} from "phosphor-react";

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
  { icon: <Leaf className="w-6 h-6 text-[#19C371]" weight="fill" />, name: "ผู้เริ่มต้น", completed: true },
  { icon: <Trophy className="w-6 h-6 text-[#FBBF24]" weight="fill" />, name: "ชนะ 10 ครั้ง", completed: true },
  { icon: <Flame className="w-6 h-6 text-[#FF7A00]" weight="fill" />, name: "สตรีค 7 วัน", completed: true },
  { icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" weight="fill" />, name: "คะแนนเต็ม", completed: false },
  { icon: <Book className="w-6 h-6 text-[#7C3AED]" weight="fill" />, name: "เรียน 100 ครั้ง", completed: false },
  { icon: <Target className="w-6 h-6 text-[#DC2626]" weight="fill" />, name: "ชนะ 50 ครั้ง", completed: false },
  { icon: <Lightning className="w-6 h-6 text-[#FACC15]" weight="fill" />, name: "สตรีค 30 วัน", completed: false },
  { icon: <Crown className="w-6 h-6 text-[#F59E0B]" weight="fill" />, name: "ระดับสูงสุด", completed: false },
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
              <CheckCircle className="w-5 h-5 text-[#19C371]" weight="fill" />
            )}
          </>
        )}
      />
    </Container>
  );
};

Achievements.displayName = "Achievements";

