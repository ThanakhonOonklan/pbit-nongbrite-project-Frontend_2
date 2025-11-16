"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export interface SkillCard {
  id: string;
  title?: string;
  icon?: React.ReactNode;
  background?: string;
  isUnlocked: boolean;
  points?: string; // e.g., "1k"
}

export interface VocabularySkillsProps {
  title?: string;
  progress?: number; // 0-100
  skills?: SkillCard[];
  className?: string;
}


export const VocabularySkills: React.FC<VocabularySkillsProps> = ({
  title = "Vocabulary Skills",
  progress = 50,
  skills = [
    // Top row - Unlocked
    {
      id: "1",
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400 rounded-lg"></div>
          <div className="relative z-10 text-4xl">🐣</div>
        </div>
      ),
      background: "bg-blue-200",
      isUnlocked: true,
    },
    {
      id: "2",
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg"></div>
          <div className="relative z-10 text-4xl">🎩</div>
        </div>
      ),
      background: "bg-orange-200",
      isUnlocked: true,
    },
    {
      id: "3",
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400 rounded-lg"></div>
          <div className="relative z-10 text-4xl">🏔️</div>
        </div>
      ),
      background: "bg-blue-200",
      isUnlocked: true,
    },
    // Bottom row - Progress/Locked
    {
      id: "4",
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-purple-400"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="text-4xl mb-1">⭐</span>
            <span className="text-white font-bold text-lg">1k</span>
          </div>
        </div>
      ),
      background: "bg-purple-200",
      isUnlocked: true,
    },
    {
      id: "5",
      icon: null,
      background: "bg-gray-100",
      isUnlocked: false,
    },
    {
      id: "6",
      icon: null,
      background: "bg-gray-100",
      isUnlocked: false,
    },
  ],
  className,
}) => {
  return (
    <Container
      variant="white"
      className={cn("p-6 rounded-t-none", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-bold text-[#242E39]">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              "relative aspect-square flex items-center justify-center rounded-full overflow-hidden",
              skill.isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            )}
          >
            {skill.isUnlocked ? (
              <div className={cn("w-full h-full overflow-hidden rounded-full", skill.background)}>
                {skill.icon}
              </div>
            ) : (
              <div className="w-full h-full border-2 border-blue-300 bg-white flex items-center justify-center rounded-full">
                <span className="text-5xl text-gray-400 font-bold">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

VocabularySkills.displayName = "VocabularySkills";

