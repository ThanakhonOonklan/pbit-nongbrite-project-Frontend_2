"use client";

import { use, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
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

// ─────────────────────────────────────────────────────────────

export default function ConditionalMatchingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

  const config = condMatchLevels[levelNum];
  const totalQ = config?.questions.length ?? 0;

  // ── State ─────────────────────────────────────────────────
  const [currentQIndex, setCurrentQIndex] = useState(0);
  /** รวมจำนวนครั้งที่ตอบผิดทุกข้อในด่านนี้ */
  const [wrongCount, setWrongCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [answerState, setAnswerState] = useState<"correct" | "wrong" | null>(null);
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);
  /** ป้องกัน double-click ระหว่าง animation */
  const lockRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());

  // ── Answer handler ────────────────────────────────────────
  const handleAnswer = useCallback((ans: CondMatchAnswer) => {
    if (lockRef.current || scoreResult) return;
    lockRef.current = true;
    setLastPickedId(ans.id);

    if (ans.isCorrect) {
      setAnswerState("correct");

      setTimeout(() => {
        const isLastQ = currentQIndex >= totalQ - 1;

        if (isLastQ) {
          // ─── WIN ───
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setElapsedSeconds(elapsed);

          // wrongCount ณ จุดนี้ยังไม่ถูก set ของข้อนี้ (ตอบถูกเลย wrongCount ไม่เพิ่ม)
          const result = calculateGameScore({
            difficulty: config.difficulty,
            attempts: wrongCount,
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
        } else {
          // ─── ไปข้อถัดไป ───
          setCurrentQIndex((prev) => prev + 1);
          setAnswerState(null);
          setLastPickedId(null);
        }
        lockRef.current = false;
      }, 800);
    } else {
      // ─── ผิด ───
      setAnswerState("wrong");
      setWrongCount((prev) => prev + 1);

      setTimeout(() => {
        setAnswerState(null);
        setLastPickedId(null);
        lockRef.current = false;
      }, 800);
    }
  }, [scoreResult, currentQIndex, totalQ, config, wrongCount, levelNum]);

  // ── Retry ─────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setCurrentQIndex(0);
    setWrongCount(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    setAnswerState(null);
    setLastPickedId(null);
    lockRef.current = false;
    startTimeRef.current = Date.now();
  }, []);

  // ── Fallback ──────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Coco/coco-03.svg" alt="Coco" width={110} height={110} className="object-contain drop-shadow-lg" />
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

  const currentQ = config.questions[currentQIndex];

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">

      {/* Header */}
      <GameHeader
        level={level}
        gameTitle="Conditional Matching"
        characterSrc="/images/P_Coco/coco-03.svg"
      />

      {/* ── Main layout: fixed height sections, no scroll ── */}
      <div className="flex-1 flex flex-col min-h-0 px-4 pt-3 pb-4 gap-3 max-w-3xl w-full mx-auto">

        {/* Scene card — grows to fill available height */}
        <ScenarioCard
          scene={currentQ.scene}
          answerState={answerState}
          currentQ={currentQIndex}
          totalQ={totalQ}
          treeSeed={levelNum * 100 + currentQIndex}
        />

        {/* Question text — shrink-0, below card */}
        <div className="shrink-0 text-left px-2 py-2">
          <p className="text-white font-extrabold text-2xl leading-snug">
            {currentQ.questionText}
          </p>
        </div>

        {/* Answer grid — shrink-0, at bottom */}
        <div className="shrink-0">
          <AnswerGrid
            answers={currentQ.answers}
            answerState={answerState}
            lastPickedId={lastPickedId}
            onAnswer={handleAnswer}
            disabled={!!scoreResult || answerState === "correct"}
          />
        </div>
      </div>

      {/* Help button */}
      <HelpButton
        steps={[
          { emoji: "📖", text: "อ่านสถานการณ์ที่โคโค่เจอ" },
          { emoji: "🤔", text: "คิดว่าโคโค่ควรทำอะไร?" },
          { emoji: "👆", text: "กดคำตอบที่คิดว่าถูกต้อง" },
          { emoji: "✅", text: "ตอบถูกทุกข้อก็ผ่านด่าน!" },
        ]}
      />

      {/* Intro overlay — Level 1 only */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              โคโค่กำลังผจญภัยในป่า!
              <br />
              <span className="text-sm font-medium opacity-80 mt-2 block">
                ช่วยโคโค่ตัดสินใจให้ถูกต้อง
              </span>
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Coco/coco-03.svg"
          imageAlt="โคโค่"
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
          gamePath="conditional-matching"
          onRetry={handleRetry}
        />
      )}

      <style>{`
      `}</style>
    </div>
  );
}
