"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CourseRightPanel } from "@/components/courses/CourseRightPanel";
import { BackgroundSquaresWithColor } from "@/components/common/BackgroundSquaresWithColor";
import { useState, useRef } from "react";
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import { ScrollStack } from "@/components/common";
import type { ScrollStackRef } from "@/components/common";
import { GameCard } from "@/components/courses/GameCard";
import { GameStepper } from "@/components/courses/GameStepper";
import { ResourceBars } from "@/components/courses/ResourceBars";
import { gamesConfig } from "@/constants/courses/gameConfig";
import { convertHeaderColorToHex, lightenColor } from "@/utils/courses";
import { mockMyRankData } from "@/constants/mocks/userData";

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelData = getLevelData(selectedLevel);

  // Use context to track current header color for CourseRightPanel and BackgroundSquares
  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  const [currentGameTitle, setCurrentGameTitle] = useState<string>(
    gamesConfig[0]?.title 
  );
  const [currentGameIconIndex, setCurrentGameIconIndex] = useState<number>(0);
  const [currentGameId, setCurrentGameId] = useState<string | undefined>(gamesConfig[0]?.id);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);

  // ScrollStack ref
  const scrollStackRef = useRef<ScrollStackRef>(null);

  // ScrollStack values
  const itemDistance = 230;
  const stackPosition = "15%";

  const handleSectionChange = (index: number, headerColor?: string) => {
    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      setCurrentGameTitle(gamesConfig[0]?.title);
      setCurrentGameIconIndex(0);
      setCurrentGameId(gamesConfig[0]?.id);
      setCurrentGameIndex(0);
      setSelectedLevel(1);
      return;
    }

    if (index >= 0 && index < gamesConfig.length) {
      const game = gamesConfig[index];
      setCurrentGameTitle(game.title);
      setCurrentGameIconIndex(index);
      setCurrentGameId(game.id);
      setCurrentGameIndex(index);
      setSelectedLevel(1);
      
      const colorToUse = convertHeaderColorToHex(headerColor);
      setCurrentHeaderColor(colorToUse);
      
      const lightenedColor = colorToUse ? lightenColor(colorToUse, 60) : undefined;
      setHeaderColor(lightenedColor);
    }
  };

  const handleStepClick = (index: number) => {
    if (scrollStackRef.current) {
      scrollStackRef.current.scrollToIndex(index);
    }
  };

  // Calculate responsive values for ScrollStack
  const itemDistance = isMobile ? 400 : isTablet ? 400 : 230;
  const stackPosition = isMobile ? "10%" : isTablet ? "12%" : "15%";

  return (
    <div className="flex h-screen ">
      <BackgroundSquaresWithColor />
      <Sidebar />

      {/* ResourceBars - Mobile only (navbar style) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <ResourceBars
          heartCount={mockMyRankData.heartCount ?? 0}
          scoreCount={mockMyRankData.score ?? 0}
          daystate={mockMyRankData.daystate ?? 0}
          className="py-2 px-4"
          showDivider={false}
        />
      </div>

      {/* Center Area - ScrollStack */}
      <main className="flex-1 relative overflow-hidden max-w-[900px] mx-auto">
        {/* ScrollStack with padding-top */}
        <div className="pt-[80px] lg:pt-[4px] h-full pb-[70px] lg:pb-0">
          <ScrollStack  
            ref={scrollStackRef}
            className="w-full h-full"
            itemDistance={itemDistance}
            itemStackDistance={0}
            stackPosition={stackPosition}
            baseScale={1}
            itemScale={0}
            useWindowScroll={false}
            onSectionChange={handleSectionChange}
          >
            {/* GameStepper as first child */}
            <GameStepper
              games={gamesConfig}
              currentIndex={currentGameIndex}
              onStepClick={handleStepClick}
            />
            {gamesConfig.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </ScrollStack>
        </div>
      </main>

      <div className="hidden lg:block">
        <CourseRightPanel
          level={selectedLevel}
          difficulty={levelData?.difficulty}
          difficultyText={levelData?.difficultyText}
          gameTitle={currentGameTitle}
          gameIcon={gamesConfig[currentGameIconIndex]?.icon}
          headerColor={currentHeaderColor}
          gameId={currentGameId}
        />
      </div>
    </div>
  );
}
