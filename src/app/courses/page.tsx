"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/common/Container";
import { GlossyGreenButton } from "@/components/common/GlossyGreenButton";
import { Divider } from "@/components/common/Divider";
import { StickyGameHeader } from "@/components/courses";
import { useEffect, useRef, useState } from "react";
import { GameSection1 } from "./GameSection1";
import { GameSection2 } from "./GameSection2";
import { GameSection3 } from "./GameSection3";
import { GameSection4 } from "./GameSection4";

type StatsType = "hearts" | "gems" | "streak";

interface GameInfo {
  part: number;
  title: string;
  color: string;
  shadowColor: string;
}

const games: GameInfo[] = [
  {
    part: 4,
    title: "Sequencing",
    color: "#9B59B6",
    shadowColor: "#7D3C98",
  },
  {
    part: 3,
    title: "Conditional Matching",
    color: "#FF9500",
    shadowColor: "#E68600",
  },
  {
    part: 2,
    title: "Counting & Classification",
    color: "#19C371",
    shadowColor: "#14A35E",
  },
  {
    part: 1,
    title: "Path Navigation",
    color: "#1CB0F6",
    shadowColor: "#1899D6",
  },
];

export default function CoursesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const game1Ref = useRef<HTMLDivElement>(null);
  const game2Ref = useRef<HTMLDivElement>(null);
  const game3Ref = useRef<HTMLDivElement>(null);
  const game4Ref = useRef<HTMLDivElement>(null);
  const divider1Ref = useRef<HTMLDivElement>(null);
  const divider2Ref = useRef<HTMLDivElement>(null);
  const divider3Ref = useRef<HTMLDivElement>(null);
  const [currentGame, setCurrentGame] = useState<GameInfo>(games[0]);

  // Stats state
  const [hearts] = useState(5);
  const [gems] = useState(100);
  const [streak] = useState(7);

  const [openStats, setOpenStats] = useState<StatsType | null>(null);

  const handleStatsClick = (type: StatsType) => {
    setOpenStats(openStats === type ? null : type);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const divider1Rect = divider1Ref.current?.getBoundingClientRect();
      const divider2Rect = divider2Ref.current?.getBoundingClientRect();
      const divider3Rect = divider3Ref.current?.getBoundingClientRect();

      const headerPosition = containerRect.top + 80;

      if (divider1Rect && divider1Rect.top > headerPosition) {
        setCurrentGame(games[0]);
      } else if (divider2Rect && divider2Rect.top > headerPosition) {
        setCurrentGame(games[1]);
      } else if (divider3Rect && divider3Rect.top > headerPosition) {
        setCurrentGame(games[2]);
      } else {
        setCurrentGame(games[3]);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F6F7FB] overflow-auto flex">
        {/* Left/Center Area - Game Path with Round Buttons */}
        <div
          ref={scrollContainerRef}
          className="flex-1 relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Sticky Game Header */}
          <StickyGameHeader
            part={currentGame.part}
            title={currentGame.title}
            color={currentGame.color}
            shadowColor={currentGame.shadowColor}
          />

          {/* Container to center and limit width */}
          <div className="flex justify-center w-full">
            <div
              className="relative pt-12 pb-24 w-full max-w-[800px]"
              style={{ height: "5360px" }}
            >
              {/* Game Level Path - 4 Games with 9 Levels each */}

              {/* Game 4: Sequencing */}
              <GameSection4 markerRef={game4Ref} />

              {/* Divider between Game 4 and Game 3 */}
              <div
                ref={divider3Ref}
                className="absolute top-[1300px] left-0 right-0 px-12"
              >
                <Divider />
              </div>

              {/* Game 3: Conditional Matching */}
              <GameSection3 markerRef={game3Ref} />

              {/* Divider between Game 3 and Game 2 */}
              <div
                ref={divider2Ref}
                className="absolute top-[2600px] left-0 right-0 px-12"
              >
                <Divider />
              </div>

              {/* Game 2: Counting & Classification */}
              <GameSection2 markerRef={game2Ref} />

              {/* Divider between Game 2 and Game 1 */}
              <div
                ref={divider1Ref}
                className="absolute top-[3900px] left-0 right-0 px-12"
              >
                <Divider />
              </div>

              {/* Game 1: Path Navigation */}
              <GameSection1 markerRef={game1Ref} />
            </div>
          </div>
        </div>

        {/* Right Area - Stats and Content Forms */}
        <div className="flex flex-col gap-6 p-12">
          {/* Stats Form */}
          <Container
            variant="white"
            className="w-[376px] h-auto py-[20px] px-[24px] flex flex-col gap-3 "
          >
            <div className="w-full flex flex-col gap-3">
              {/* Stats Row */}
              <div className="w-full flex items-center justify-between px-4">
                {/* Heart Button */}
                <button
                  type="button"
                  onClick={() => handleStatsClick("hearts")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <span className="text-[24px]">❤️</span>
                  <span className="text-[20px] font-bold text-[#FF4D4D]">
                    {hearts}
                  </span>
                </button>

                {/* Gems Button */}
                <button
                  type="button"
                  onClick={() => handleStatsClick("gems")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <span className="text-[24px]">⚡</span>
                  <span className="text-[20px] font-bold text-[#FFD300]">
                    {gems}
                  </span>
                </button>

                {/* Streak Button */}
                <button
                  type="button"
                  onClick={() => handleStatsClick("streak")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <span className="text-[24px]">🔥</span>
                  <span className="text-[20px] font-bold text-[#FF7A00]">
                    {streak}
                  </span>
                </button>
              </div>

              {/* Stats Info Dropdown */}
              {openStats && (
                <div className="w-full px-4 pb-2 animate-in slide-in-from-top-2 duration-200">
                  {openStats === "hearts" && (
                    <div className="bg-[#FFF5F5] rounded-lg p-4 border border-[#FF4D4D]/20">
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className="text-[32px]"
                            style={{ opacity: index < hearts ? 1 : 0.3 }}
                          >
                            ❤️
                          </span>
                        ))}
                      </div>
                      <p className="text-[16px] font-bold text-[#FF4D4D] text-center mb-1">
                        {hearts >= 5
                          ? "หัวใจคุณเต็มทุกดวงแล้ว"
                          : `หัวใจเหลือ ${hearts} ดวง`}
                      </p>
                      <p className="text-[12px] text-[#7F7F7F] text-center">
                        {hearts >= 5
                          ? "เรียนรู้ต่อไป อย่าได้ถอย"
                          : "รอให้หัวใจเติมเต็มอีกครั้ง"}
                      </p>
                    </div>
                  )}

                  {openStats === "gems" && (
                    <div className="bg-[#FFFBF0] rounded-lg p-4 border border-[#FFD300]/20">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-[48px]">⚡</span>
                        <span className="text-[32px] font-black text-[#FFD300]">
                          {gems}
                        </span>
                      </div>
                      <p className="text-[16px] font-bold text-[#3C3C3C] text-center mb-1">
                        คุณมี {gems} เพชร
                      </p>
                      <p className="text-[12px] text-[#7F7F7F] text-center">
                        ใช้เพชรซื้อไอเทมพิเศษและหัวใจเพิ่ม
                      </p>
                    </div>
                  )}

                  {openStats === "streak" && (
                    <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#FF7A00]/20">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-[48px]">🔥</span>
                        <span className="text-[32px] font-black text-[#FF7A00]">
                          {streak}
                        </span>
                      </div>
                      <p className="text-[16px] font-bold text-[#3C3C3C] text-center mb-1">
                        คุณมีสตรีค {streak} วัน
                      </p>
                      <p className="text-[12px] text-[#7F7F7F] text-center">
                        เรียนทุกวันเพื่อรักษาสตรีคของคุณ
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>

          {/* Main Content Form */}
          <Container
            variant="white"
            className="w-[376px] h-auto py-[32px] px-[24px] flex flex-col gap-[20px] "
          >
            {/* Level Info Box */}
            <div className="w-full bg-[#F6F9F8] rounded-[12px] border border-[#E5E5E5] p-6">
              {/* Level Title */}
              <h3 className="text-[20px] font-bold text-[#3C3C3C] mb-4">
                Level 1: Splitting Parts
              </h3>

              {/* Difficulty */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[14px] font-medium text-[#7F7F7F]">
                  ความยาก:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[18px]">⭐</span>
                  <span className="text-[18px] opacity-30">⭐</span>
                  <span className="text-[18px] opacity-30">⭐</span>
                </div>
                <span className="text-[13px] font-bold text-[#19C371]">
                  ง่าย
                </span>
              </div>

              {/* Time Limit */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[14px] font-medium text-[#7F7F7F]">
                  เวลา:
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[16px]">⏱️</span>
                  <span className="text-[15px] font-bold text-[#3C3C3C]">
                    120 วินาที
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
                <p className="text-[13px] text-[#7F7F7F] leading-relaxed">
                  ฝึกหัดการแบ่งส่วน เรียนรู้เกี่ยวกับการแบ่งครึ่ง
                </p>
              </div>
            </div>

            {/* Start Button */}
            <div className="w-full flex justify-center">
              <GlossyGreenButton
                size="default"
                onClick={() => console.log("Start game")}
                className="!bg-[#1CB0F6] !shadow-[0px_4px_0px_0px_#1899D6,0px_6px_12px_rgba(28,176,246,0.3)] hover:!bg-[#1FB5F8] active:!shadow-[0px_2px_0px_0px_#1899D6,0px_4px_8px_rgba(28,176,246,0.3)]"
              >
                เริ่มเล่น
              </GlossyGreenButton>
            </div>

            {/* Achievements Section */}
            <div className="w-full">
              <h3 className="text-[16px] font-bold text-[#3C3C3C] mb-3">
                ความสำเร็จ
              </h3>
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-lg bg-[#E5E5E5] flex items-center justify-center">
                  <span className="text-[24px] opacity-40">🏆</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#E5E5E5] flex items-center justify-center">
                  <span className="text-[24px] opacity-40">⭐</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#E5E5E5] flex items-center justify-center">
                  <span className="text-[24px] opacity-40">🎯</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
