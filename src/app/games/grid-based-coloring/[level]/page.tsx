"use client";

import { use, useState, useCallback, useRef } from "react";
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
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

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

  // ── Fallback ─────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/Nong_brite/nong-brite-06.svg" alt="Nong Brite" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
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

  // Difficulty badge styling
  const diffBadge = config.difficulty === "easy"
    ? { bg: "bg-emerald-500/15", border: "border-emerald-500/30", text: "text-emerald-400", label: "Easy" }
    : config.difficulty === "normal"
      ? { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-400", label: "Normal" }
      : { bg: "bg-red-500/15", border: "border-red-500/30", text: "text-red-400", label: "Hard" };

  return (
    <div className="flex flex-col h-screen overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #F4F9E4 0%, #E9F4D0 30%, #D4E9A4 60%, #E9F4D0 100%)" }}
    >


      {/* Header */}
      <GameHeader
        level={level}
        bgColor="#AACE30"
        gameTitle="Pixel Pattern"
        characterSrc="/images/Nong_brite/nong-brite-06.svg"
      />

      {/* Level title + difficulty badge */}

      {/* Main game area — scrollable */}
      <div className="relative flex-1 overflow-auto px-4 sm:px-6 pb-6 z-10 mt-10">
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
          { emoji: "✅", text: "กด Check My Work เพื่อตรวจคำตอบ" },
        ]}
      />

      {/* Intro overlay */}
      {showIntro && (
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
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="grid-based-coloring"
          onRetry={handleRetry}
          type={wrongCount > 0 ? "lose" : "win"}
        />
      )}

      {/* Out of Lives Modal */}
      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
