"use client";

import { use, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
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
            src="/images/P_Bit/bit-03.svg"
            alt="Bit"
            width={100}
            height={100}
            className="object-contain"
          />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#FFB356] text-white rounded-xl font-bold hover:bg-[#E8962A] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #E8F4FD 0%, #D1E9F6 50%, #C4DEF0 100%)" }}
    >
      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Coordinate Crunch"
        characterSrc="/images/P_PingPing/pingping-01.svg"
      />

      {/* Game title */}
      <div className="text-center pt-4 sm:pt-6 pb-2 sm:pb-4 px-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Coordinate Crunch
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Find the fruit in the grid and enter its coordinate. For example, &apos;A3&apos; or &apos;D5&apos;.
        </p>
      </div>

      {/* Main game area — scrollable */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
        <FruitMatchingGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
        />
      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "👀", text: "ดูตารางผลไม้ 5×5" },
          { emoji: "🔍", text: "หาผลไม้ที่กำหนดไว้ในตาราง" },
          { emoji: "📝", text: "พิมพ์พิกัด เช่น A3 หรือ D5" },
          { emoji: "✅", text: "กด Check Answers เพื่อตรวจคำตอบ" },
        ]}
      />

      {/* Intro overlay — Level 1 only */}
      {showIntro && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer select-none"
          onClick={() => setShowIntro(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <Image
            src="/images/P_PingPing/pingping-01.svg"
            alt="PingPing"
            width={160}
            height={160}
            className="object-contain mb-5 drop-shadow-2xl"
          />
          <p className="text-white text-2xl font-extrabold text-center leading-relaxed px-8">
            🍎 Coordinate Crunch! 🍊
          </p>
          <p className="text-white/50 text-sm mt-3">
            หาพิกัดผลไม้ในตารางให้ถูกต้อง
          </p>
          <p className="text-white/25 text-xs mt-6 animate-pulse">
            แตะเพื่อเริ่มเล่น
          </p>
        </div>
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
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
            `}</style>
    </div>
  );
}
