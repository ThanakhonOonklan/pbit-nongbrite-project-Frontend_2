"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { MainContentForm } from "./MainContentForm";
import { getLevelData } from "@/constants/levelData";

export interface RightAreaProps {
  className?: string;
  selectedLevel?: number | null;
}

export const RightArea: React.FC<RightAreaProps> = ({
  className,
  selectedLevel = 1,
}) => {
  const levelData = selectedLevel ? getLevelData(selectedLevel) : null;
  return (
    <div className={`flex flex-col gap-2 p-12 ${className || ""}`}>
      {/* Stats Form */}
      <Container
        variant="white"
        className="w-[376px] h-auto py-[20px] px-[24px] flex flex-col gap-3 rounded-b-none"
      >
        <div className="w-full flex items-center justify-between gap-3">
          {/* Heart Container */}
          <Container
            variant="white"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2"
          >
            <span className="text-[24px]">❤️</span>
            <span className="text-[20px] font-bold text-[#FF4D4D]">5</span>
          </Container>

          {/* Gems Container */}
          <Container
            variant="white"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2"
          >
            <span className="text-[24px]">⚡</span>
            <span className="text-[20px] font-bold text-[#FFD300]">100</span>
          </Container>

          {/* Streak Container */}
          <Container
            variant="white"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2"
          >
            <span className="text-[24px]">🔥</span>
            <span className="text-[20px] font-bold text-[#FF7A00]">7</span>
          </Container>
        </div>
      </Container>

      {/* Main Content Form */}
      <MainContentForm
        levelTitle={levelData?.title || "Level 1: Splitting Parts"}
        difficulty={levelData?.difficulty || 1}
        difficultyText={levelData?.difficultyText || "ง่าย"}
        timeLimit={levelData?.timeLimit || "120 วินาที"}
      />
    </div>
  );
};

RightArea.displayName = "RightArea";

