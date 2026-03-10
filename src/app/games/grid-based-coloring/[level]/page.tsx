"use client";

import { use } from "react";
import { FaPalette } from "react-icons/fa";
import { GameHeader } from "@/components/games/GameHeader";

export default function GridBasedColoringGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#131F24" }}>
      <GameHeader
        level={level}
        gameTitle="Grid-based Coloring"
        characterSrc="/images/Nong_brite/nong-brite-06.svg"
      />
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <div className="text-center max-w-2xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#AACE30]/10 mb-4">
              <FaPalette className="w-10 h-10 text-[#AACE30]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">กำลังพัฒนา</h2>
          <p className="text-white/60">เกม Grid-based Coloring - ด่าน {level} กำลังอยู่ในขั้นตอนการพัฒนา</p>
        </div>
      </div>
    </div>
  );
}
