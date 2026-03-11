"use client";

import { use, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
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
      style={{ background: "linear-gradient(170deg, #0f1923 0%, #131F24 30%, #15232e 70%, #0f1923 100%)" }}
    >
      {/* ── Animated background particles ──────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating color orbs */}
        <div className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full bg-[#AACE30]/6 blur-3xl orb-1" />
        <div className="absolute top-[60%] right-[5%] w-40 h-40 rounded-full bg-blue-500/5 blur-3xl orb-2" />
        <div className="absolute bottom-[20%] left-[30%] w-28 h-28 rounded-full bg-purple-500/4 blur-3xl orb-3" />
        <div className="absolute top-[40%] right-[25%] w-24 h-24 rounded-full bg-amber-500/5 blur-3xl orb-4" />

        {/* Subtle grid lines for "pixel art" feel */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <GameHeader
        level={level}
        bgColor="#AACE30"
        gameTitle="Pixel Pattern"
        characterSrc="/images/Nong_brite/nong-brite-06.svg"
      />

      {/* Level title + difficulty badge */}
      <div className="relative text-center pt-4 pb-2 px-4 shrink-0">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-3">
          <span>Level {levelNum}:</span>
          <span className="bg-gradient-to-r from-[#AACE30] to-[#D4E94A] bg-clip-text text-transparent">
            {config.title}
          </span>
        </h1>
        <div className="flex justify-center mt-2">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border
                        ${diffBadge.bg} ${diffBadge.border} ${diffBadge.text}`}>
            {diffBadge.label}
          </span>
        </div>
      </div>

      {/* Main game area — scrollable */}
      <div className="relative flex-1 overflow-auto px-4 sm:px-6 pb-6">
        <GridColoringGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
          startTime={startTimeRef.current}
        />
      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "🎨", text: "เลือกสีจาก Color Palette" },
          { emoji: "👆", text: "คลิกหรือลากเพื่อระบายสี" },
          { emoji: "🎯", text: "ระบายให้ตรงกับ Reference Image" },
          { emoji: "✅", text: "กด Check My Work เพื่อตรวจสอบ" },
        ]}
      />

      {/* Intro overlay */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              🎨 Pixel Pattern! 🖌️
              <br />
              <span className="text-sm font-medium opacity-80 mt-2 block">
                ดูแพตเทิร์นต้นแบบแล้วระบายสีให้เหมือนกัน!
              </span>
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/Nong_brite/nong-brite-06.svg"
          imageAlt="Nong Brite"
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
          gamePath="grid-based-coloring"
          onRetry={handleRetry}
        />
      )}

      <style>{`
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes orbFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(15px, -20px) scale(1.1); }
                }
                @keyframes orbFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 15px) scale(1.15); }
                }
                @keyframes orbFloat3 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(10px, -15px); }
                }
                @keyframes orbFloat4 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-15px, 10px); }
                }
                .orb-1 { animation: orbFloat1 8s ease-in-out infinite; }
                .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
                .orb-3 { animation: orbFloat3 7s ease-in-out infinite; }
                .orb-3 { animation: orbFloat3 7s ease-in-out infinite; }
                .orb-4 { animation: orbFloat4 9s ease-in-out infinite; }
            `}</style>
    </div>
  );
}
