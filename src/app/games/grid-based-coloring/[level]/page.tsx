"use client";

import { use, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GridColoringGame } from "@/components/games/grid-based-coloring";
import { gridColoringLevels } from "@/constants/games/grid-based-coloring-levels";
import { type ScoreResult } from "@/utils/game-scoring";

// ─────────────────────────────────────────────────────────────

export default function GridBasedColoringGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

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
          <Image src="/images/P_Bit/bit-03.svg" alt="Bit" width={100} height={100} className="object-contain" />
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
      {/* ── Animated background particles ──────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <span className="absolute text-5xl opacity-40 animate-pulse orb-1" style={{ top: "15%", left: "8%" }}>✨</span>
        <span className="absolute text-6xl opacity-30 animate-bounce orb-2" style={{ top: "60%", right: "5%" }}>🫧</span>
        <span className="absolute text-4xl opacity-50 animate-pulse orb-3" style={{ bottom: "20%", left: "20%" }}>⭐</span>
        <span className="absolute text-5xl opacity-40 animate-bounce orb-4" style={{ top: "30%", right: "25%" }}>☁️</span>
      </div>

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
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={() => setShowIntro(false)}
          style={{
            background: "linear-gradient(135deg, rgba(244,249,228,0.95), rgba(233,244,208,0.95), rgba(212,233,164,0.95))",
            backdropFilter: "blur(10px)",
            animation: "fadeIn 0.4s ease-out"
          }}
        >
          {/* Floating paint drops */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[15%] text-5xl intro-float-1 drop-shadow-md">🎨</div>
            <div className="absolute top-[30%] right-[20%] text-4xl intro-float-2 drop-shadow-md">🖌️</div>
            <div className="absolute bottom-[30%] left-[25%] text-4xl intro-float-3 drop-shadow-md">✨</div>
            <div className="absolute bottom-[25%] right-[15%] text-5xl intro-float-4 drop-shadow-md">🌈</div>
          </div>

          <Image
            src="/images/Nong_brite/nong-brite-06.svg"
            alt="Nong Brite"
            width={180}
            height={180}
            className="object-contain mb-6 drop-shadow-2xl intro-character relative z-10"
          />
          <div className="relative z-10 bg-white/60 p-6 rounded-3xl border-2 border-white shadow-xl flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-center leading-relaxed px-4 text-[#8BB422]">
              🎨 Pixel Pattern! 🖌️
            </h2>
            <p className="text-gray-600 text-base font-bold mt-3 text-center max-w-xs">
              ระบายสีให้เหมือนรูปต้นแบบเป๊ะๆ เลยนะ!
            </p>
            <div className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#AACE30] to-[#8BB422] shadow-md shadow-[#AACE30]/30 hover:scale-105 transition-transform">
              <p className="text-white text-sm font-bold animate-pulse">
                แตะเพื่อเริ่มเล่น ✨
              </p>
            </div>
          </div>
        </div>
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

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes orbFloat1 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            50% { transform: translate(15px, -20px) scale(1.1) rotate(10deg); }
        }
        @keyframes orbFloat2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, 15px) scale(1.15); }
        }
        @keyframes orbFloat3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(10px, -15px) rotate(-15deg); }
        }
        @keyframes orbFloat4 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-15px, 10px); }
        }
        .orb-1 { animation: orbFloat1 6s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 8s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 5s ease-in-out infinite; }
        .orb-4 { animation: orbFloat4 7s ease-in-out infinite; }

        @keyframes introFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
        }
        .intro-float-1 { animation: introFloat 3s ease-in-out infinite; }
        .intro-float-2 { animation: introFloat 3.5s ease-in-out infinite 0.3s; }
        .intro-float-3 { animation: introFloat 4s ease-in-out infinite 0.6s; }
        .intro-float-4 { animation: introFloat 3.2s ease-in-out infinite 0.9s; }
        @keyframes charFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        .intro-character { animation: charFloat 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
