"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import { FruitMatchingGame } from "@/components/games/fruit-matching-grid";
import { fruitMatchingGridLevels } from "@/constants/games/fruit-matching-grid-levels";
import { type ScoreResult } from "@/utils/game-scoring";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

// ─────────────────────────────────────────────────────────────

export default function FruitMatchingGridGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user } = useUserStore();

  const config = fruitMatchingGridLevels[levelNum];

  // ── State ─────────────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);

  // ── Game end handler ─────────────────────────────────────
  const handleGameEnd = useCallback(
    (result: ScoreResult, wrongs: number, elapsed: number) => {
      setScoreResult(result);
      setWrongCount(wrongs);
      setElapsedSeconds(elapsed);
    },
    []
  );

  // ── Retry ────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setScoreResult(null);
    setWrongCount(0);
    setElapsedSeconds(0);
    setGameKey((prev) => prev + 1);
  }, []);

  // ── Fallback ─────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/images/P_PingPing/pingping-01.svg"
            alt="PingPing"
            width={110}
            height={110}
            className="object-contain drop-shadow-lg"
          />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#A855F7] text-white rounded-xl font-bold hover:bg-[#9333EA] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // Dynamic grid size label
  const gridLabel = `${config.gridSize}×${config.gridSize}`;

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#131F24]">

      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Coordinate Crunch"
        characterSrc="/images/P_PingPing/pingping-01.svg"
      />

      {/* Main game area — scrollable */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6 relative z-10">
        <FruitMatchingGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
        />

      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "👀", text: `ดูพิกัดตัวอักษรและตัวเลขบนตาราง` },
          { emoji: "📌", text: "ดูเป้าหมายพิกัดที่ต้องหาทางขวามือ" },
          { emoji: "👆", text: "จิ้มที่ช่องนั้นเลย!" },
          { emoji: "✅", text: "หาให้ครบทุกพิกัดเพื่อผ่านด่าน!" },
        ]}
      />

      {/* Intro overlay — Level 1 only */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              หาพิกัดผลไม้ในตารางให้ถูกต้องนะ!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_PingPing/pingping-01.svg"
          imageAlt="PingPing"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {/* WIN modal */}
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="fruit-matching-grid"
          onRetry={handleRetry}
        />
      )}

      {/* Out of Lives Modal */}
      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}

    </div>
  );
}
