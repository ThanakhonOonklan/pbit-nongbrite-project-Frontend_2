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

// ─────────────────────────────────────────────────────────────

export default function FruitMatchingGridGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

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
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FFF5E4 0%, #FFE0F0 30%, #E8D5FF 60%, #D5F0FF 100%)",
      }}
    >
      {/* Floating decorative emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <span className="absolute text-4xl opacity-20 animate-bounce" style={{ top: "10%", left: "5%" }}>🍎</span>
        <span className="absolute text-3xl opacity-15 animate-pulse" style={{ top: "20%", right: "8%" }}>🍊</span>
        <span className="absolute text-5xl opacity-10 animate-bounce" style={{ bottom: "15%", left: "10%", animationDelay: "0.5s" }}>🍇</span>
        <span className="absolute text-3xl opacity-15 animate-pulse" style={{ bottom: "25%", right: "12%", animationDelay: "1s" }}>🍓</span>
        <span className="absolute text-4xl opacity-10 animate-bounce" style={{ top: "50%", left: "50%", animationDelay: "0.8s" }}>🍌</span>
      </div>

      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Coordinate Crunch"
        characterSrc="/images/P_PingPing/pingping-01.svg"
      />

      {/* Game title */}
      <div className="text-center pt-4 sm:pt-6 pb-2 sm:pb-4 px-4 relative z-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          🍎 Coordinate Crunch! 🍊
        </h1>
        <p className="text-sm text-purple-600/70 mt-1 font-medium">
          หาพิกัดผลไม้ในตาราง {gridLabel} แล้วพิมพ์คำตอบ เช่น &apos;A3&apos; หรือ &apos;D5&apos;
        </p>
      </div>

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
          { emoji: "👀", text: `ดูตารางผลไม้ ${gridLabel}` },
          { emoji: "🔍", text: "หาผลไม้ที่กำหนดไว้ในตาราง" },
          { emoji: "📝", text: "พิมพ์พิกัด เช่น A3 หรือ D5" },
          { emoji: "✅", text: "กด ตรวจคำตอบ เพื่อเช็ค!" },
        ]}
      />

      {/* Intro overlay — Level 1 only */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              🍎 Coordinate Crunch! 🍊
              <br />
              <span className="text-sm font-medium opacity-80 mt-2 block">
                หาพิกัดผลไม้ในตารางให้ถูกต้องนะ!
              </span>
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น ✨"
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

      <style>{`
      `}</style>
    </div>
  );
}
