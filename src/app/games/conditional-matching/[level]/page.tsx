"use client";

import { use, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { condMatchLevels } from "@/constants/games/conditional-matching-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

export default function ConditionalMatchingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();

  const config = condMatchLevels[levelNum];

  // ── State ─────────────────────────────────────────────────
  const [wrongCount, setWrongCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const [, setTick] = useState(0);

  // force re-render for the timer display
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Logic ────────────────────────────────────────
  const handleSimulateWin = useCallback(() => {
    if (scoreResult) return;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setElapsedSeconds(elapsed);

    const result = calculateGameScore({
      difficulty: config?.difficulty || "easy",
      attempts: wrongCount,
      timeSeconds: elapsed,
    });
    setScoreResult(result);

    const { stars } = getStarRating(result.totalScore);
    const absoluteLevelId = getAbsoluteLevelId("conditional-matching", levelNum);

    gameService.submitScore({
      levelId: absoluteLevelId,
      score: result.totalScore,
      stars,
      playTime: elapsed,
    }).catch(err => console.error("Failed to submit score", err));
  }, [scoreResult, config, wrongCount, levelNum]);

  const handleSimulateFail = useCallback(() => {
    setWrongCount((prev) => prev + 1);
    reduceLife();
  }, [reduceLife]);

  // ── Retry ─────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setWrongCount(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
  }, []);

  // ── Fallback ──────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">
        <GameHeader
          level={level}
          gameTitle="Conditional Matching"
          characterSrc="/images/P_Coco/coco-03.svg"
        />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-white text-xl">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-4 px-6 py-2 bg-[#1CB0F6] text-white rounded-xl font-bold hover:bg-[#0e9fd8] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">
      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Conditional Matching"
        characterSrc="/images/P_Coco/coco-03.svg"
      />

      {/* ── Main layout ── */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 px-4 pt-3 pb-4 max-w-3xl w-full mx-auto">
        <div className="text-white text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Blank Page - API Testing</h2>
          <p className="opacity-80 mt-2">หน้านี้ถูกสร้างเป็นหน้าเปล่าเพื่อทดสอบ API ตามที่ร้องขอ</p>
          <p className="mt-4 text-xl">จำนวนครั้งที่ตอบผิด (Wrong Count): <span className="font-bold text-red-400">{wrongCount}</span></p>
          <p className="mt-2 text-xl">เวลาที่ใช้ (Seconds): <span className="font-bold text-blue-400">{Math.floor((Date.now() - startTimeRef.current) / 1000)}s</span></p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSimulateFail}
            className="px-6 py-3 bg-[#E53935] text-white rounded-xl font-bold hover:bg-[#D32F2F] transition-colors text-lg"
          >
            ตอบผิด (-1 Life)
          </button>
          <button
            onClick={handleSimulateWin}
            className="px-6 py-3 bg-[#4CAF50] text-white rounded-xl font-bold hover:bg-[#388E3C] transition-colors text-lg"
          >
            จบเกม (ส่งคะแนน API)
          </button>
        </div>
      </div>

      {/* WIN modal */}
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="conditional-matching"
          onRetry={handleRetry}
        />
      )}

      {/* Out of Lives Modal */}
      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}
    </div>
  );
}
