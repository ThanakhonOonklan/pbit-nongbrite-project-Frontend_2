"use client";

import { use, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


import { StepCountingGame } from "@/components/games/step-counting";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import {
  stepCountingLevels,
} from "@/constants/games/step-counting-levels";
import type { ScoreResult } from "@/utils/game-scoring";
import { StarRating } from "@/components/common/StarRating";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

export default function StepCountingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user } = useUserStore();

  const config = stepCountingLevels[levelNum];

  // ── Game state ──────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  // ── Game end handler ────────────────────────────────────
  const handleGameEnd = useCallback(
    (result: ScoreResult, attemptCount: number, elapsed: number) => {
      setScoreResult(result);
      setAttempts(attemptCount);
      setElapsedSeconds(elapsed);
      setCurrentScore(result.totalScore);
      setEarnedStars(result.totalScore >= 90 ? 3 : result.totalScore >= 60 ? 2 : result.totalScore >= 30 ? 1 : 0);
    },
    []
  );

  // ── Retry ───────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setScoreResult(null);
    setAttempts(0);
    setElapsedSeconds(0);
    setCurrentScore(0);
    setEarnedStars(0);
    startTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  }, []);

  // ── Fallback for invalid level ──────────────────────────
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Bobo/bobo-03.svg" alt="Bobo" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#6ED1CF] text-white rounded-xl font-bold hover:bg-[#58b8b5] transition-colors shadow-lg"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // Total levels for progress dots
  const totalLevels = Object.keys(stepCountingLevels).length;

  // ── Render ───────────────────────────────────────────────
  return (
    <div
      className="flex flex-col h-screen overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #A8D8EA 40%, #B8E4F0 70%, #E8F4FD 100%)",
      }}
    >
      {/* ===== Decorative clouds & sun ===== */}
      <div className="absolute top-6 right-8 z-10 pointer-events-none select-none">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg shadow-yellow-300/50" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-300 opacity-60" />
        </div>
      </div>
      <div className="absolute top-20 right-24 z-10 pointer-events-none select-none opacity-90">
        <div className="flex gap-1">
          <div className="w-12 h-8 bg-white rounded-full" />
          <div className="w-16 h-10 bg-white rounded-full -mt-2" />
          <div className="w-10 h-7 bg-white rounded-full" />
        </div>
      </div>
      <div className="absolute top-32 left-12 z-10 pointer-events-none select-none opacity-70">
        <div className="flex gap-1">
          <div className="w-10 h-6 bg-white rounded-full" />
          <div className="w-14 h-9 bg-white rounded-full -mt-2" />
          <div className="w-8 h-5 bg-white rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-16 right-16 z-10 pointer-events-none select-none opacity-50">
        <div className="flex gap-1">
          <div className="w-14 h-8 bg-white rounded-full" />
          <div className="w-18 h-10 bg-white rounded-full -mt-1" />
          <div className="w-10 h-6 bg-white rounded-full" />
        </div>
      </div>

      {/* ===== GameHeader ===== */}
      <GameHeader
        level={level}
        gameTitle="นับจำนวนก้าวเดิน"
        characterSrc="/images/P_Bobo/bobo-01.svg"
        bgColor="#6ED1CF"
      />

      {/* ===== Info Bar (stars, score, progress dots) ===== */}


      {/* ===== Main game area ===== */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4 overflow-auto relative z-20">
        <div className="w-full max-w-2xl">
          <StepCountingGame
            key={gameKey}
            config={config}
            onGameEnd={handleGameEnd}
            startTime={startTimeRef.current}
          />
        </div>
      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "🔢", text: "ดู Number Line ด้านบน" },
          { emoji: "🐻", text: "หมีเริ่มจากช่องที่กำหนด" },
          { emoji: "👣", text: "นับก้าวตามจำนวนที่บอก" },
          { emoji: "✅", text: "เลือกช่องที่หมีจะไปถึง" },
        ]}
      />

      {/* Intro overlay (Level 1 only) */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              มาช่วยหมีนับก้าวเดินกัน!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Bobo/bobo-02.svg"
          imageAlt="Bobo"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}



      {/* Score result modal */}
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={attempts}
          timeSeconds={elapsedSeconds}
          gamePath="step-counting"
          onRetry={handleRetry}
        />
      )}

      {/* Out of Lives Modal */}
      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}


    </div>
  );
}
