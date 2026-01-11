"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CourseRightPanel } from "@/components/courses/CourseRightPanel";
import { BackgroundSquaresWithColor } from "@/components/common/BackgroundSquaresWithColor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import { ScrollStack, PrimaryButton } from "@/components/common";
import { GameCard } from "@/components/courses/GameCard";
import { gamesConfig } from "@/constants/courses/gameConfig";
import { useResponsive, lightenColor } from "@/utils/courses";

// Component for custom tooltip content for completed levels
const CompletedTooltipContent: React.FC<{ levelNumber: number; gameId: string }> = ({
  levelNumber,
  gameId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayAgain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    // Simulate loading for 1-2 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to game page based on gameId
    router.push(`/games/${gameId}/${levelNumber}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">ด่าน {levelNumber}</h3>
      <p className="text-sm text-gray-600">
        คุณได้ผ่านด่านนี้แล้ว สามารถเล่นอีกครั้งเพื่อปรับปรุงคะแนน
      </p>
      <PrimaryButton
        className="w-full py-1.5 px-3 text-sm pointer-events-auto"
        variant="default"
        size="sm"
        onClick={handlePlayAgain}
        disabled={isLoading}
      >
        {isLoading ? "กำลังโหลด..." : "เล่นอีกครั้ง"}
      </PrimaryButton>
    </div>
  );
};

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelData = getLevelData(selectedLevel);

  // Use context to track current header color for CourseRightPanel and BackgroundSquares
  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  const [currentGameTitle, setCurrentGameTitle] = useState<string>("Path Navigation");
  const [currentGameIconIndex, setCurrentGameIconIndex] = useState<number>(0);

  // Responsive state
  const { isMobile, isTablet } = useResponsive();

  // Handler สำหรับเมื่อกดปุ่ม level
  const handleLevelClick = (levelNumber: number) => {
    setSelectedLevel(levelNumber);
  };

  // Callback when section changes
  const handleSectionChange = (index: number, headerColor?: string) => {
    // Reset to default when at top (before first section)
    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      setCurrentGameTitle("Path Navigation");
      setCurrentGameIconIndex(0);
      setSelectedLevel(1); // Reset selectedLevel เมื่อกลับไปที่ top
      return;
    }

    // Update game title and icon based on section index
    if (index >= 0 && index < gamesConfig.length) {
      setCurrentGameTitle(gamesConfig[index].title);
      setCurrentGameIconIndex(index);
      setSelectedLevel(1); // Reset selectedLevel เป็น 1 เมื่อ scroll ไป section (เกม) อื่น
    }

    // Convert "sky-blue" to actual color if needed
    let colorToUse = headerColor;
    if (headerColor === "sky-blue") {
      colorToUse = "#1CB0F6";
    }
    setCurrentHeaderColor(colorToUse);
    // Lighten color for background (make it 60% lighter for pastel effect)
    const lightenedColor = colorToUse ? lightenColor(colorToUse, 60) : undefined;
    // Update context for BackgroundSquares with lightened color
    setHeaderColor(lightenedColor);
  };

  // Calculate responsive values for ScrollStack
  const itemDistance = isMobile ? 400 : isTablet ? 400 : 230;
  const stackPosition = isMobile ? "10%" : isTablet ? "12%" : "15%";

  return (
    <div className="flex h-screen ">
      <BackgroundSquaresWithColor />
      <Sidebar />

      {/* Center Area - ScrollStack */}
      <main className="flex-1 relative overflow-hidden">
        {/* ScrollStack with padding-top */}
        <div className="pt-[4px] h-full pb-[70px] lg:pb-0">
          <ScrollStack  
            className="w-full h-full"
            itemDistance={itemDistance}
            itemStackDistance={0}
            stackPosition={stackPosition}
            baseScale={1}
            itemScale={0}
            useWindowScroll={false}
            onSectionChange={handleSectionChange}
          >
            {gamesConfig.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isMobile={isMobile}
                isTablet={isTablet}
                CompletedTooltipContent={CompletedTooltipContent}
                onLevelClick={handleLevelClick}
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
        />
      </div>
    </div>
  );
}
