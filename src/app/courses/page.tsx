"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CourseRightPanel } from "@/components/courses/CourseRightPanel";
import { BackgroundSquaresWithColor } from "@/components/common/BackgroundSquaresWithColor";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import {
  StarGameButton,
  ScrollStack,
  ScrollStackItem,
  PrimaryButton,
} from "@/components/common";
import type { GameButtonStatus } from "@/components/common/StarGameButton";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";

// Helper function to determine button status and stars
// ด่าน 1-3: completed (มีดาว), ด่าน 4: available (สีตามเกม), ด่าน 5-9: locked
const getButtonStatus = (levelNumber: number): GameButtonStatus => {
  if (levelNumber <= 3) {
    return "completed"; // ด่าน 1-3: เล่นผ่านแล้ว (สีทอง)
  } else if (levelNumber === 4) {
    return "available"; // ด่าน 4: ยังไม่ได้เล่น (สีตามเกม) - มีเพียงอันเดียว
  } else {
    return "locked"; // ด่าน 5-9: ล็อค (สีเทา)
  }
};

// Helper function to get stars for completed levels (mock data)
const getStarsForLevel = (levelNumber: number): number => {
  // Mock: ด่าน 1 ได้ 3 ดาว, ด่าน 2 ได้ 2 ดาว, ด่าน 3 ได้ 1 ดาว
  if (levelNumber === 1) return 3;
  if (levelNumber === 2) return 2;
  if (levelNumber === 3) return 1;
  return 0;
};

// Component for custom tooltip content for completed levels
const CompletedTooltipContent: React.FC<{ levelNumber: number; gameId: string }> = ({ levelNumber, gameId }) => {
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
      <h3 className="text-lg font-semibold text-gray-800">
        ด่าน {levelNumber}
      </h3>
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

// Helper function to lighten a color (make it lighter/pastel)
const lightenColor = (color: string, percent: number = 50): string => {
  // Remove # if present
  const hex = color.replace("#", "");
  
  // Parse RGB
  const num = parseInt(hex, 16);
  const R = (num >> 16) & 255;
  const G = (num >> 8) & 255;
  const B = num & 255;
  
  // Lighten by blending with white
  // percent = 0 means no change, percent = 100 means pure white
  const factor = percent / 100;
  const newR = Math.round(R + (255 - R) * factor);
  const newG = Math.round(G + (255 - G) * factor);
  const newB = Math.round(B + (255 - B) * factor);
  
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export default function CoursesPage() {
  const selectedLevel = 1;
  const levelData = getLevelData(selectedLevel);
  const scrollStackRef = useRef<HTMLDivElement>(null);
  
  // Game titles array matching the order of ScrollStackItems
  const gameTitles = [
    "Path Navigation",
    "Counting & Classification",
    "Conditional Matching",
    "Sequencing",
    "Step Counting",
    "Fruit Matching Grid Game",
    "Grid-based Coloring",
  ];

  // Game IDs array matching the order of ScrollStackItems
  const gameIds = [
    "path-navigation",
    "counting-classification",
    "conditional-matching",
    "sequencing",
    "step-counting",
    "fruit-matching-grid",
    "grid-based-coloring",
  ];
  
  // Game icons array matching the order of ScrollStackItems
  const gameIcons = [
    FaRoute,
    FaSquare,
    FaLink,
    FaRecycle,
    FaRuler,
    FaTh,
    FaPalette,
  ];
  
  // Use context to track current header color for CourseRightPanel and BackgroundSquares
  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  const [currentGameTitle, setCurrentGameTitle] = useState<string>("Path Navigation");
  const [currentGameIconIndex, setCurrentGameIconIndex] = useState<number>(0);
  
  // Responsive state for mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate responsive values for ScrollStack
  const itemDistance = isMobile ? 600 : isTablet ? 700 : 800;
  const stackPosition = isMobile ? "10%" : isTablet ? "12%" : "15%";
  
  // Helper functions for responsive values
  const getWidthClassName = () => {
    if (isMobile) {
      return "max-w-[850px] w-full mx-2 rounded-[20px] p-1.5 border-[2px] border-[#DB9148]";
    } else if (isTablet) {
      return "max-w-[850px] w-full mx-4 rounded-[25px] p-2 border-[2.5px] border-[#DB9148]";
    }
    return "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]";
  };
  
  const getHeightClassName = () => {
    if (isMobile) {
      return "min-h-[280px]";
    } else if (isTablet) {
      return "min-h-[320px]";
    }
    return "min-h-[350px]";
  };
  
  const getImageSize = () => {
    if (isMobile) return 80;
    if (isTablet) return 100;
    return 140;
  };
  
  const getImage1Size = () => {
    if (isMobile) return 40;
    if (isTablet) return 50;
    return 60;
  };
  
  const getImagePosition = (baseLeft: string, baseTop: string) => {
    // Extract numeric values from strings like "left-[20px]" and "-top-[-308px]"
    const leftMatch = baseLeft.match(/\[(\d+)px\]/);
    const topMatch = baseTop.match(/\[-?(\d+)px\]/);
    
    if (!leftMatch || !topMatch) {
      // Fallback to original if parsing fails
      return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]`;
    }
    
    const baseLeftValue = parseInt(leftMatch[1]);
    const baseTopValue = parseInt(topMatch[1]);
    
    if (isMobile) {
      const left = Math.round(baseLeftValue * 0.5);
      const top = Math.round(baseTopValue * 0.65);
      return `absolute left-[${left}px] -top-[-${top}px] z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]`;
    } else if (isTablet) {
      const left = Math.round(baseLeftValue * 0.7);
      const top = Math.round(baseTopValue * 0.8);
      return `absolute left-[${left}px] -top-[-${top}px] z-20 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]`;
    }
    return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]`;
  };
  
  // Callback when section changes
  const handleSectionChange = (index: number, headerColor?: string) => {
    // Reset to default when at top (before first section)
    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      setCurrentGameTitle("Path Navigation");
      setCurrentGameIconIndex(0);
      return;
    }
    
    // Update game title and icon based on section index
    if (index >= 0 && index < gameTitles.length) {
      setCurrentGameTitle(gameTitles[index]);
      setCurrentGameIconIndex(index);
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

  return (
    <div className="flex h-screen ">
      <BackgroundSquaresWithColor />
      <Sidebar />

      {/* Center Area - ScrollStack */}
      <main className="flex-1 relative overflow-hidden" ref={scrollStackRef}>
        {/* ScrollStack with padding-top */}
        <div className="pt-[4px] h-full pb-[70px] lg:pb-0">
          <ScrollStack
            className="w-full h-full"
            itemDistance={itemDistance}
            itemStackDistance={0}
            stackPosition={stackPosition}
            baseScale={1}
            itemScale={0.001}
            useWindowScroll={false}
            onSectionChange={handleSectionChange}
          >
            {/* Item 1: Path Navigation */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRoute className="w-5 h-5" />
                    Path Navigation
                  </span>
                ),
                headerColor: "sky-blue",
                imageSrc: "/images/P_Bit/bit-01.svg",
                imageAlt: "P'Bit mascot",
                imageWidth: getImageSize(),
                imageHeight: getImageSize(),
                imagePosition: getImagePosition("left-[20px]", "-top-[-308px]"),
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-02.svg",
                image1Alt: "Nong Brite",
                image1Width: getImage1Size(),
                image1Height: isMobile ? 44 : isTablet ? 55 : 66,
                image1Position: getImagePosition("left-[110px]", "-top-[-382px]"),
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#1CB0F6"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[0]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 2: Counting & Classification */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaSquare className="w-5 h-5" />
                    Counting & Classification
                  </span>
                ),
                headerColor: "#FB96BB",
                imageSrc: "/images/P_Minnie/minnie-01.svg",
                imageAlt: "Minnie",
                imageWidth: isMobile ? 60 : isTablet ? 75 : 100,
                imageHeight: isMobile ? 96 : isTablet ? 120 : 160,
                imagePosition: getImagePosition("left-[720px]", "-top-[-288px]"),
                imageRotation: 0,
                image1Src: "/images/P_Minnie/minnie-05.svg",
                image1Alt: "Minnie",
                image1Width: isMobile ? 50 : isTablet ? 65 : 80,
                image1Height: isMobile ? 44 : isTablet ? 57 : 71,
                image1Position: getImagePosition("left-[50px]", "-top-[73px]"),
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#FB96BB"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[1]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 3: Conditional Matching */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaLink className="w-5 h-5" />
                    Conditional Matching
                  </span>
                ),
                headerColor: "#FFB356",
                imageSrc: "/images/P_Coco/coco-03.svg",
                imageAlt: "Coco",
                imageWidth: isMobile ? 70 : isTablet ? 85 : 110,
                imageHeight: isMobile ? 62 : isTablet ? 75 : 98,
                imagePosition: getImagePosition("left-[20px]", "-top-[-350px]"),
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-05.svg",
                image1Alt: "Coco",
                image1Width: getImage1Size(),
                image1Height: isMobile ? 44 : isTablet ? 55 : 66,
                image1Position: getImagePosition("left-[750px]", "-top-[-12px]"),
                image1Rotation: 180,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#FFB356"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[2]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 4: Sequencing */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRecycle className="w-5 h-5" />
                    Sequencing
                  </span>
                ),
                headerColor: "#9956DE",
                imageSrc: "/images/P_Momo/momo-03.svg",
                imageAlt: "Momo",
                imageWidth: isMobile ? 60 : isTablet ? 75 : 100,
                imageHeight: isMobile ? 96 : isTablet ? 120 : 160,
                imagePosition: getImagePosition("left-[30px]", "-top-[-288px]"),
                imageRotation: 0,
                image1Src: "",
                image1Alt: "Nong Brite",
                image1Width: getImage1Size(),
                image1Height: isMobile ? 44 : isTablet ? 55 : 66,
                image1Position: getImagePosition("left-[110px]", "-top-[-360px]"),
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#9956DE"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[3]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 5: Step Counting */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRuler className="w-5 h-5" />
                    Step Counting
                  </span>
                ),
                headerColor: "#6ED1CF",
                imageSrc: "/images/P_Bobo/bobo-05.svg",
                imageAlt: "Bobo",
                imageWidth: isMobile ? 70 : isTablet ? 85 : 110,
                imageHeight: isMobile ? 78 : isTablet ? 95 : 123,
                imagePosition: getImagePosition("left-[30px]", "-top-[-324px]"),
                imageRotation: 0,
                image1Src: "",
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#6ED1CF"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[4]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 6: Fruit Matching Grid Game */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaTh className="w-5 h-5" />
                    Fruit Matching Grid Game
                  </span>
                ),
                headerColor: "#FF8B8B",
                imageSrc: "/images/P_PingPing/pingping-05.svg",
                imageAlt: "PingPing",
                imageWidth: isMobile ? 60 : isTablet ? 75 : 100,
                imageHeight: isMobile ? 72 : isTablet ? 90 : 120,
                imagePosition: getImagePosition("left-[530px]", "-top-[80px]"),
                imageRotation: 0,
                image1Src: "/images/P_PingPing/pingping-05.svg",
                image1Alt: "PingPing",
                image1Width: isMobile ? 60 : isTablet ? 75 : 100,
                image1Height: isMobile ? 72 : isTablet ? 90 : 120,
                image1Position: getImagePosition("left-[710px]", "-top-[-350px]"),
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#FF8B8B"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[5]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>

            {/* Item 7: Grid-based Coloring */}
            <ScrollStackItem
              useOuterContainer={true}
              itemClassName="scroll-stack-card"
              outerContainerProps={{
                widthClassName: getWidthClassName(),
                heightClassName: getHeightClassName(),
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaPalette className="w-5 h-5" />
                    Grid-based Coloring
                  </span>
                ),
                headerColor: "#FFD700",
                imageSrc: "/images/P_Bit/bit-05.svg",
                imageAlt: "P'Bit mascot",
                imageWidth: isMobile ? 70 : isTablet ? 85 : 110,
                imageHeight: isMobile ? 83 : isTablet ? 100 : 130,
                imagePosition: getImagePosition("left-[10px]", "-top-[-320px]"),
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-01.svg",
                image1Alt: "Nong Brite",
                image1Width: getImage1Size(),
                image1Height: isMobile ? 44 : isTablet ? 55 : 66,
                image1Position: getImagePosition("left-[150px]", "-top-[-12px]"),
                image1Rotation: 180,
                image2Src: "/images/P_Momo/momo-03.svg",
                image2Alt: "Momo",
                image2Width: isMobile ? 60 : isTablet ? 75 : 100,
                image2Height: isMobile ? 96 : isTablet ? 120 : 160,
                image2Position: getImagePosition("left-[720px]", "-top-[-288px]"),
                image2Rotation: 0,
                image3Src: "/images/P_Minnie/minnie-04.svg", // minnie-04.svg  E:\pbit-nongbrite-project-Frontend_2\public\images\P_Minnie\minnie-04.svg
                image3Alt: "Coco",
                image3Width: isMobile ? 60 : isTablet ? 75 : 100,
                image3Height: isMobile ? 60 : isTablet ? 75 : 100,
                image3Position: getImagePosition("left-[700px]", "-top-[100px]"),
                image3Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => {
                  const levelNumber = buttonIndex + 1;
                  const status = getButtonStatus(levelNumber);
                  const stars = status === "completed" ? getStarsForLevel(levelNumber) : 0;
                  return (
                    <div
                      key={buttonIndex}
                      className="flex items-center justify-center"
                    >
                      <StarGameButton 
                        level={levelNumber} 
                        status={status}
                        baseColor="#FFD700"
                        stars={stars}
                        tooltipContent={
                          status === "completed"
                            ? <CompletedTooltipContent levelNumber={levelNumber} gameId={gameIds[6]} />
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </main>

      {/*CourseRightPanel - Desktop only */}
      <div className="hidden lg:block">
        <CourseRightPanel
          levelTitle={levelData?.title || "Level 1: Splitting Parts"}
          difficulty={levelData?.difficulty || 1}
          difficultyText={levelData?.difficultyText || "ง่าย"}
          gameTitle={currentGameTitle}
          gameIcon={gameIcons[currentGameIconIndex]}
          headerColor={currentHeaderColor}
        />
      </div>
    </div>
  );
}
