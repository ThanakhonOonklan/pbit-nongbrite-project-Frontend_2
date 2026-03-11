"use client";

import { use } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import { SequencingGame } from "@/components/games/sequencing/SequencingGame";

export default function SequencingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: "#131F24" }}>
      <GameHeader
        level={level}
        gameTitle="วงจรชีวิตและการเติบโต (Sequencing)"
        characterSrc="/images/P_Momo/momo-02.svg"
      />
      <div className="flex-1 w-full overflow-hidden relative">
         <SequencingGame />
      </div>
    </div>
  );
}
