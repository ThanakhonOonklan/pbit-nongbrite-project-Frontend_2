"use client";

import { use } from "react";
import { FaRecycle } from "react-icons/fa";
import { GameHeader } from "@/components/games/GameHeader";

export default function SequencingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#131F24" }}>
      <GameHeader
        level={level}
        gameTitle="Sequencing"
        characterSrc="/images/P_Momo/momo-02.svg"
      />
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <div className="text-center max-w-2xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#9956DE]/10 mb-4">
              <FaRecycle className="w-10 h-10 text-[#9956DE]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">กำลังพัฒนา</h2>
          <p className="text-white/60">เกม Sequencing - ด่าน {level} กำลังอยู่ในขั้นตอนการพัฒนา</p>
        </div>
      </div>
    </div>
  );
}
