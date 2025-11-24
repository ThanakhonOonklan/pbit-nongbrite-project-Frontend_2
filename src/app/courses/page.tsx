"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MainContentForm, OuterContainer } from "@/components/courses";
import { Container } from "@/components/common/Container";
import { useState } from "react";
import { Heart, Lightning, Flame } from "phosphor-react";
import { getLevelData } from "@/constants/levelData";

export default function CoursesPage() {
  const [selectedLevel] = useState<number | null>(1);
  const levelData = selectedLevel ? getLevelData(selectedLevel) : null;

  return (
    <div className=" flex h-screen">
      <Sidebar />
      
      {/* Center Area - Empty Space */}
      <main className="flex-1 overflow-auto flex items-center justify-center p-6">
        <OuterContainer
          widthClassName="max-w-[900px] rounded-[30px] p-2 border-[3px] border-[#DB9148]"
          heightClassName="min-h-[350px]"
        >
          {/* content */}
        </OuterContainer>
      </main>

      {/* RightArea */}
      <div className="flex flex-col gap-2 p-12">
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
              <Heart className="w-6 h-6 text-[#FF4D4D]" weight="fill" />
              <span className="text-[20px] font-bold text-[#FF4D4D]">5</span>
            </Container>

            {/* Gems Container */}
            <Container
              variant="white"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2"
            >
              <Lightning className="w-6 h-6 text-[#FFD300]" weight="fill" />
              <span className="text-[20px] font-bold text-[#FFD300]">100</span>
            </Container>

            {/* Streak Container */}
            <Container
              variant="white"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2"
            >
              <Flame className="w-6 h-6 text-[#FF7A00]" weight="fill" />
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
    </div>
  );
}
