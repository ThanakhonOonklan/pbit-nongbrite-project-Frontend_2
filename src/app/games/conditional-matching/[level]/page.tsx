"use client";

import { use, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { ScenarioCard, AnswerGrid } from "@/components/games/conditional-matching";
import {
  condMatchLevels,
  type CondMatchAnswer,
} from "@/constants/games/conditional-matching-levels";
import {
  calculateGameScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";

// ────────────────────────────────────────────────────────────

export default function ConditionalMatchingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

  const config = condMatchLevels[levelNum];

  // ── State ────────────────────────────────────────────────
  const [wrongCount, setWrongCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  /** "correct" | "wrong" | null */
  const [answerState, setAnswerState] = useState<"correct" | "wrong" | null>(null);
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const lockRef = useRef(false); // ป้องกัน double-click ขณะ animation

  // ── Answer handler ───────────────────────────────────────
  const handleAnswer = useCallback((ans: CondMatchAnswer) => {
    if (lockRef.current || scoreResult) return;
    lockRef.current = true;
    setLastPickedId(ans.id);

    if (ans.isCorrect) {
      setAnswerState("correct");
      // หน่วงให้เด็กเห็น feedback สีเขียวก่อน แล้วค่อยแสดง WIN modal
      setTimeout(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedSeconds(elapsed);

        const result = calculateGameScore({
          difficulty: config.difficulty,
          attempts: wrongCount,     // ส่งจำนวนครั้งที่ผิด
          timeSeconds: elapsed,
        });
        setScoreResult(result);

        const { stars } = getStarRating(result.totalScore);
        mockSubmitGameScore({
          levelId: levelNum,
          score: result.totalScore,
          stars,
          playTime: elapsed,
        });

        lockRef.current = false;
      }, 900);
    } else {
      setAnswerState("wrong");
      setWrongCount((prev) => prev + 1);

      // รีเซ็ตหลัง animation ผิด
      setTimeout(() => {
        setAnswerState(null);
        setLastPickedId(null);
        lockRef.current = false;
      }, 900);
    }
  }, [scoreResult, config, wrongCount, levelNum]);

  // ── Retry ────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setWrongCount(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    setAnswerState(null);
    setLastPickedId(null);
    lockRef.current = false;
    startTimeRef.current = Date.now();
  }, []);

  // ── Fallback — invalid level ─────────────────────────────
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

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">

      {/* ── Header ── */}
      <GameHeader
        level={level}
        gameTitle="Conditional Matching"
        characterSrc="/images/P_Coco/coco-03.svg"
      />

      {/* ── Main scroll area ── */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-center py-4 gap-5">

        {/* Scenario card */}
        <ScenarioCard
          situationText={config.situationText}
          questionText={config.questionText}
          sceneEmoji={config.sceneEmoji}
          sceneBgFrom={config.sceneBgFrom}
          sceneBgTo={config.sceneBgTo}
          answerState={answerState}
        />

        {/* Answer grid */}
        <AnswerGrid
          answers={config.answers}
          answerState={answerState}
          lastPickedId={lastPickedId}
          onAnswer={handleAnswer}
          disabled={!!scoreResult || answerState === "correct"}
        />

        {/* Wrong count indicator */}
        {wrongCount > 0 && !scoreResult && (
          <p className="text-center text-white/40 text-xs">
            ลองผิดไปแล้ว {wrongCount} ครั้ง
          </p>
        )}
      </div>

      {/* ── Help button ── */}
      <HelpButton
        steps={[
          { emoji: "📖", text: "อ่านสถานการณ์ที่โคโค่เจอ" },
          { emoji: "🤔", text: "คิดว่าควรทำอะไรดี?" },
          { emoji: "👆", text: "กดคำตอบที่คิดว่าถูก" },
          { emoji: "✅", text: "ถูกต้องก็ผ่านด่านได้เลย!" },
        ]}
      />

      {/* ── Intro overlay (Level 1 only) ── */}
      {showIntro && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer select-none"
          onClick={() => setShowIntro(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <Image
            src="/images/P_Coco/coco-03.svg"
            alt="โคโค่"
            width={160}
            height={160}
            className="object-contain mb-5 drop-shadow-2xl"
            style={{ animation: "float 2.5s ease-in-out infinite" }}
          />
          <p className="text-white text-2xl font-extrabold text-center leading-relaxed px-8">
            โคโค่กำลังเดินทาง<br />ในป่า...
          </p>
          <p className="text-white/50 text-sm mt-4">ช่วยโคโค่ตัดสินใจให้ถูกต้อง!</p>
          <p className="text-white/30 text-xs mt-6">แตะเพื่อเริ่มเล่น</p>
        </div>
      )}

      {/* ── WIN Modal ── */}
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

      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(-10px); }
                }
            `}</style>
    </div>
  );
}
