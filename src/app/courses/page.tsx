"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MainContentForm } from "@/components/courses/MainContentForm";
import { OuterContainer } from "@/components/common/OuterContainer";
import { Container } from "@/components/common/Container";
import { GameResourceBar } from "@/components/courses/GameResourceBar";
import { useState } from "react";
import { getLevelData } from "@/constants/levelData";
import { GameButton } from "@/components/common/GameButton";

export default function CoursesPage() {
  const [selectedLevel] = useState<number | null>(1);
  const levelData = selectedLevel ? getLevelData(selectedLevel) : null;

  return (
    <div className="flex h-screen ">
      <Sidebar />

      {/* Center Area - Empty Space */}
      <main className="flex-1 overflow-auto flex items-center justify-center relative">
        <OuterContainer
          widthClassName="max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]"
          heightClassName="min-h-[350px]"
          headerText="Path Navigation"
          headerColor="sky-blue"
          imageSrc="/images/P_Bit/bit-01.svg"
          imageAlt="P'Bit mascot"
          imageWidth={140}
          imageHeight={140}
          imagePosition="absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          imageRotation={0}
          image1Src="/images/Nong_brite/nong-brite-02.svg"
          image1Alt="Nong Brite"
          image1Width={60}
          image1Height={66}
          image1Position="absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          image1Rotation={0}
         
        >
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
          <GameButton size="sm" variant="default" className="w-[100px] px-4 py-2" >Start</GameButton>
        </OuterContainer>
      </main>

      {/* RightArea */}
      <div className="flex flex-col gap-4 px-5 pb-5 pt-4 justify-start">
        {/* Resource Bars */}
        <Container
          variant="white"
          className="w-[350px] h-auto py-4 px-4 flex flex-col gap-4 rounded-b-none "
        >
          <div className="flex items-center justify-between gap-3">
            <GameResourceBar size="sm" heartSymbol="💛" />
          </div>
        </Container>

        {/* Main Content Form */}
        <MainContentForm
          levelTitle={levelData?.title || "Level 1: Splitting Parts"}
          difficulty={levelData?.difficulty || 1}
          difficultyText={levelData?.difficultyText || "ง่าย"}
        />
      </div>
    </div>
  );
}
