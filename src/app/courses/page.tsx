"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MainContentForm } from "@/components/courses/MainContentForm";
import { useRef, useState, useEffect } from "react";
import { getLevelData } from "@/constants/levelData";
import { Container } from "@/components/common/Container";
import {
  ResourceBar,
  GameButton_2,
  ScrollStack,
  ScrollStackItem,
} from "@/components/common";
import { BackgroundSquares } from "@/components/common/BackgroundSquares";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";

export default function CoursesPage() {
  const selectedLevel = 1;
  const levelData = getLevelData(selectedLevel);
  const scrollStackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(1);

  // Color mapping for each item
  const itemColors = [
    "#1CB0F6", // Item 1: Path Navigation - sky-blue
    "#FB96BB", // Item 2: Counting & Classification - pink
    "#FFB356", // Item 3: Conditional Matching - orange
    "#9956DE", // Item 4: Sequencing - purple
    "#6ED1CF", // Item 5: Step Counting - teal
    "#FF8B8B", // Item 6: Fruit Matching Grid Game - pink-red
    "#FFD700", // Item 7: Grid-based Coloring - yellow
  ];

  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  // Get current colors based on active card
  const currentColor = itemColors[activeCardIndex - 1] || itemColors[0];
  const borderColor = lightenColor(currentColor, 35);
  const hoverFillColor = lightenColor(currentColor, 40);
  const gradientStartColor = lightenColor(currentColor, 25);
  const gradientEndColor = lightenColor(currentColor, 30);

  // Track active card using IntersectionObserver
  useEffect(() => {
    const scrollContainer = scrollStackRef.current?.querySelector(
      ".scroll-stack-inner"
    )?.parentElement;

    if (!scrollContainer) return;

    // Add data-card-index to each card
    const cards = scrollContainer.querySelectorAll(".scroll-stack-card");
    cards.forEach((card, index) => {
      card.setAttribute("data-card-index", (index + 1).toString());
    });

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible card
        let maxRatio = 0;
        let activeIndex = 1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const target = entry.target as HTMLElement;
            if (target) {
              const cardIndex = parseInt(
                target.getAttribute("data-card-index") || "1"
              );
              activeIndex = cardIndex;
            }
          }
        });

        if (maxRatio > 0) {
          setActiveCardIndex(activeIndex);
        }
      },
      {
        root: scrollContainer,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px", // Use stackPosition
      }
    );

    // Observe all scroll-stack-card elements
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen ">
      <BackgroundSquares 
        borderColor={borderColor} 
        hoverFillColor={hoverFillColor}
        gradientStartColor={gradientStartColor}
        gradientEndColor={gradientEndColor}
      />
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#1CB0F6" />
                  </div>
                ))}
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#FB96BB" />
                  </div>
                ))}
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#FFB356" />
                  </div>
                ))}
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#9956DE" />
                  </div>
                ))}
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#6ED1CF" />
                  </div>
                ))}
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
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#FF8B8B" />
                  </div>
                ))}
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
                image3Src: "/images/P_Minnie/minnie-04.svg",    // minnie-04.svg  E:\pbit-nongbrite-project-Frontend_2\public\images\P_Minnie\minnie-04.svg
                image3Alt: "Coco", 
                image3Width: 100,
                image3Height: 100,
                image3Position:
                  "absolute left-[700px] -top-[100px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                image3Rotation: 0,
              }}
            >
              <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                {Array.from({ length: 9 }).map((_, buttonIndex) => (
                  <div
                    key={buttonIndex}
                    className="flex items-center justify-center"
                  >
                    <GameButton_2 buttonColor="#FFD700" />
                  </div>
                ))}
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </main>

      {/* RightArea */}
      <div className="flex flex-col gap-4 px-5 pb-5 pt-4 justify-start">
        {/* Resource Bars */}
        <Container
          variant="white"
          className="w-[350px] h-auto py-4 px-4 flex flex-col gap-4  border border-[#E4E9F2]"
        >
          <div className="flex items-center justify-between gap-4 w-full">
            <ResourceBar number={5} variant="heart" />
            <ResourceBar number={6000} variant="score" />
            <ResourceBar number={3} variant="fire" />
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
