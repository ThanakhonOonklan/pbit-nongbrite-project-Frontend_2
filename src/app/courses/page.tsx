"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { StickyGameHeader, RightArea } from "@/components/courses";
import { useEffect, useRef, useState } from "react";
import { GameSection1 } from "./GameSection1";
import { GameSection2 } from "./GameSection2";
import { GameSection3 } from "./GameSection3";
import { GameSection4 } from "./GameSection4";

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
  const [selectedLevel, setSelectedLevel] = useState<number | null>(1);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1  bg-[#E5F2FA] overflow-auto flex">
        <div
          ref={scrollContainerRef}
          className="flex-1 relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex justify-center w-full">
            <div
              className="relative pt-12 pb-24 w-full max-w-[800px]"
              style={{ height: "5360px" }}
            >
              <GameSection4 markerRef={game4Ref} />

              <div
                ref={divider3Ref} 
                className="absolute top-[1300px] left-0 right-0 px-12"
              >
                <StickyGameHeader
                  part={games[1].part}
                  title={games[1].title}
                  color={games[1].color}
                  shadowColor={games[1].shadowColor}
                />
              </div>

              <GameSection3 markerRef={game3Ref} />

              <div
                ref={divider2Ref}
                className="absolute top-[2600px] left-0 right-0 px-12"
              >
                <StickyGameHeader
                  part={games[2].part}
                  title={games[2].title}
                  color={games[2].color}
                  shadowColor={games[2].shadowColor}
                />
              </div>

              <GameSection2 markerRef={game2Ref} />

              <div
                ref={divider1Ref}
                className="absolute top-[3900px] left-0 right-0 px-12"
              >
                <StickyGameHeader
                  part={games[3].part}
                  title={games[3].title}
                  color={games[3].color}
                  shadowColor={games[3].shadowColor}
                />
              </div>

              <GameSection1 markerRef={game1Ref} onLevelClick={setSelectedLevel} />
            </div>
          </div>
        </div>

        <RightArea selectedLevel={selectedLevel} />
      </main>
    </div>
  );
}
