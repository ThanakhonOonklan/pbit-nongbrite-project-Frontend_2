"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CourseRightPanel } from "@/components/courses/CourseRightPanel";
import { useRef, useState } from "react";
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import {
  StarGameButton,
  ScrollStack,
  ScrollStackItem,
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
  
  // Use context to track current header color for CourseRightPanel and BackgroundSquares
  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  
  // Callback when section changes
  const handleSectionChange = (index: number, headerColor?: string) => {
    // Reset to default when at top (before first section)
    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      return;
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
      <Sidebar />

      {/* Center Area - ScrollStack */}
      <main className="flex-1 relative overflow-hidden" ref={scrollStackRef}>
        {/* ScrollStack with padding-top */}
        <div className="pt-[4px] h-full">
          <ScrollStack
            className="w-full h-full"
            itemDistance={800}
            itemStackDistance={0}
            stackPosition="15%"
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRoute className="w-5 h-5" />
                    Path Navigation
                  </span>
                ),
                headerColor: "sky-blue",
                imageSrc: "/images/P_Bit/bit-01.svg",
                imageAlt: "P'Bit mascot",
                imageWidth: 140,
                imageHeight: 140,
                imagePosition:
                  "absolute left-[20px] -top-[-308px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-02.svg",
                image1Alt: "Nong Brite",
                image1Width: 60,
                image1Height: 66,
                image1Position:
                  "absolute left-[110px] -top-[-382px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaSquare className="w-5 h-5" />
                    Counting & Classification
                  </span>
                ),
                headerColor: "#FB96BB",
                imageSrc: "/images/P_Minnie/minnie-01.svg",
                imageAlt: "Minnie",
                imageWidth: 100,
                imageHeight: 160,
                imagePosition:
                  "absolute left-[720px] -top-[-288px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "/images/P_Minnie/minnie-05.svg",
                image1Alt: "Minnie",
                image1Width: 80,
                image1Height: 71,
                image1Position:
                  "absolute left-[50px] -top-[73px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaLink className="w-5 h-5" />
                    Conditional Matching
                  </span>
                ),
                headerColor: "#FFB356",
                imageSrc: "/images/P_Coco/coco-03.svg",
                imageAlt: "Coco",
                imageWidth: 110,
                imageHeight: 98,
                imagePosition:
                  "absolute left-[20px] -top-[-350px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-05.svg",
                image1Alt: "Coco",
                image1Width: 60,
                image1Height: 66,
                image1Position:
                  "absolute left-[750px] -top-[-12px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 180,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRecycle className="w-5 h-5" />
                    Sequencing
                  </span>
                ),
                headerColor: "#9956DE",
                imageSrc: "/images/P_Momo/momo-03.svg",
                imageAlt: "Momo",
                imageWidth: 100,
                imageHeight: 160,
                imagePosition:
                  "absolute left-[30px] -top-[-288px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "",
                image1Alt: "Nong Brite",
                image1Width: 60,
                image1Height: 66,
                image1Position:
                  "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaRuler className="w-5 h-5" />
                    Step Counting
                  </span>
                ),
                headerColor: "#6ED1CF",
                imageSrc: "/images/P_Bobo/bobo-05.svg",
                imageAlt: "Bobo",
                imageWidth: 110,
                imageHeight: 123,
                imagePosition:
                  "absolute left-[30px] -top-[-324px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "",
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaTh className="w-5 h-5" />
                    Fruit Matching Grid Game
                  </span>
                ),
                headerColor: "#FF8B8B",
                imageSrc: "/images/P_PingPing/pingping-05.svg",
                imageAlt: "PingPing",
                imageWidth: 100,
                imageHeight: 120,
                imagePosition:
                  "absolute left-[530px] -top-[80px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "/images/P_PingPing/pingping-05.svg",
                image1Alt: "PingPing",
                image1Width: 100,
                image1Height: 120,
                image1Position:
                  "absolute left-[710px] -top-[-350px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                widthClassName:
                  "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                heightClassName: "min-h-[350px]",
                headerText: (
                  <span className="flex items-center gap-2">
                    <FaPalette className="w-5 h-5" />
                    Grid-based Coloring
                  </span>
                ),
                headerColor: "#FFD700",
                imageSrc: "/images/P_Bit/bit-05.svg",
                imageAlt: "P'Bit mascot",
                imageWidth: 110,
                imageHeight: 130,
                imagePosition:
                  "absolute left-[10px] -top-[-320px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                imageRotation: 0,
                image1Src: "/images/Nong_brite/nong-brite-01.svg",
                image1Alt: "Nong Brite",
                image1Width: 60,
                image1Height: 66,
                image1Position:
                  "absolute left-[150px] -top-[-12px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image1Rotation: 180,
                image2Src: "/images/P_Momo/momo-03.svg",
                image2Alt: "Momo",
                image2Width: 100,
                image2Height: 160,
                image2Position:
                  "absolute left-[720px] -top-[-288px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image2Rotation: 0,
                image3Src: "/images/P_Minnie/minnie-04.svg", // minnie-04.svg  E:\pbit-nongbrite-project-Frontend_2\public\images\P_Minnie\minnie-04.svg
                image3Alt: "Coco",
                image3Width: 100,
                image3Height: 100,
                image3Position:
                  "absolute left-[700px] -top-[100px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image3Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
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
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </main>

      {/*CourseRightPanel */}
      <CourseRightPanel
        levelTitle={levelData?.title || "Level 1: Splitting Parts"}
        difficulty={levelData?.difficulty || 1}
        difficultyText={levelData?.difficultyText || "ง่าย"}
        gameTitle="Path Navigation"
        headerColor={currentHeaderColor}
      />
    </div>
  );
}
