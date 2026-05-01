"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { HelpButton } from "@/components/games/HelpButton";
import { GridColoringGame } from "@/components/games/grid-based-coloring";
import { gridColoringLevels } from "@/constants/games/grid-based-coloring-levels";
import { type ScoreResult } from "@/utils/game-scoring";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

// ─────────────────────────────────────────────────────────────

export default function GridBasedColoringGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user } = useUserStore();

  const config = gridColoringLevels[levelNum];

  // ── State ─────────────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  // intro overlay — เฉพาะ level 1 เท่านั้น (เหมือน path-navigation / sequencing)
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);
  const startTimeRef = useRef<number>(0);
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleGameEnd = useCallback(
    (result: ScoreResult, wrongs: number, elapsed: number) => {
      setScoreResult(result);
      setWrongCount(wrongs);
      setElapsedSeconds(elapsed);
    },
    []
  );

  const handleRetry = useCallback(() => {
    setScoreResult(null);
    setWrongCount(0);
    setElapsedSeconds(0);
    setGameKey((prev) => prev + 1);
    startTimeRef.current = Date.now();
  }, []);

  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;
  const hasGameResult = Boolean(scoreResult);
  const canShowGameOverlay = !isOutOfLives && !hasGameResult;

  // ── Fallback ─────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-[#7DE2FC] to-[#E5F9FF] overflow-hidden relative z-0">
        {/* Grass area for fallback */}
        <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[30%] bg-[#8FBF3B] rounded-t-[100%] -z-10" />

        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <Image src="/images/Nong_brite/nong-brite-06.svg" alt="Nong Brite" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-amber-900 text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#AACE30] text-white rounded-xl font-bold hover:bg-[#8BB422] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }


  return (
    // ── Sky and Grass background ─
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#7DE2FC] via-[#B9EFFF] to-[#E5F9FF] overflow-hidden relative z-0">

      {/* Decorative Grass Hills */}
      <div className="absolute bottom-[-5%] left-[-20%] right-[10%] h-[35%] bg-[#A8D354] rounded-t-[100%] -z-10" />
      <div className="absolute bottom-[-10%] left-[10%] right-[-20%] h-[40%] bg-[#8FBF3B] rounded-t-[100%] -z-10" />

      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Pixel Pattern"
        characterSrc="/images/Nong_brite/nong-brite-06.svg"
        bgColor="#AACE30"
      />

      {/* Main game area */}
      <div className="relative flex-1 overflow-auto px-4 sm:px-6 pb-6 z-10 mt-2">


        <GridColoringGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
          startTime={startTimeRef.current}
          isGameActive={!showIntro}
        />
      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "🎨", text: "เลือกสีจาก Color Palette" },
          { emoji: "👆", text: "คลิกหรือลากเพื่อระบายสี" },
          { emoji: "🎯", text: "ระบายให้ตรงกับรูปต้นแบบ" },
          { emoji: "✅", text: "กด ส่ง เพื่อตรวจคำตอบ" },
        ]}
      />

      {/* Intro overlay — level 1 เท่านั้น */}
      {canShowGameOverlay && showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              ระบายสีให้เหมือนรูปต้นแบบเป๊ะๆ เลยนะ!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/Nong_brite/nong-brite-06.svg"
          imageAlt="Nong Brite"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {/* WIN/LOSE modal */}
      {scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="grid-based-coloring"
          onRetry={handleRetry}
          type="win"
        />
      )}

      {/* Out of Lives Modal */}
      {isOutOfLives && <OutOfLivesModal />}

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
