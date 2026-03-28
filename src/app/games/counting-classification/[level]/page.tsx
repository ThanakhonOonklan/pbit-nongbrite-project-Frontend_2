"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GameHeader } from "@/components/games/GameHeader";
import { Container } from "@/components/common";
import { ShapeScene, CounterPanel } from "@/components/games/counting-classification";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import {
  countingClassificationLevels,
  type ShapeType,
} from "@/constants/games/counting-classification-levels";

export default function CountingClassificationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const config = countingClassificationLevels[levelNum];

  // ── game state ─────────────────────────────────────────
  const initCounts = () =>
    Object.fromEntries(
      (config?.shapeTypes ?? []).map((t) => [t, 0])
    ) as Record<ShapeType, number>;

  const [counts, setCounts] = useState<Record<ShapeType, number>>(initCounts);
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [elapsed, setElapsed] = useState(0); // วินาที (ไม่แสดงผล)
  const [scoreResult, setScoreResult] = useState<{
    attemptScore: number;
    timeScore: number;
    totalScore: number;
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── timer (silent) ──────────────────────────────────────
  useEffect(() => {
    // รอให้ Intro หายก่อน ถึงจะเริ่มจับเวลา
    if (submitted || showIntro) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [submitted, showIntro]);

  const handleCountChange = (type: ShapeType, newValue: number) => {
    setCounts((prev) => ({ ...prev, [type]: newValue }));
  };

  // ── ตรวจคำตอบ ────────────────────────────────────────────
  const handleSubmit = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // นับจำนวนจริงจาก config
    const correctCounts: Partial<Record<ShapeType, number>> = {};
    for (const shape of config.shapes) {
      correctCounts[shape.type] = (correctCounts[shape.type] ?? 0) + 1;
    }

    // เช็คว่าทุกประเภทถูกต้อง
    const isCorrect = config.shapeTypes.every(
      (t) => (counts[t] ?? 0) === (correctCounts[t] ?? 0)
    );

    if (!isCorrect) {
      setShowWrongOverlay(true);
      return;
    }

    setSubmitted(true);

    import("@/utils/game-scoring").then(({ calculateGameScore }) => {
      const result = calculateGameScore({
        difficulty: config.difficulty,
        attempts: newAttempts,
        timeSeconds: elapsed,
      });
      setScoreResult(result);
    });
  };

  // ── retry ────────────────────────────────────────────────
  const handleRetry = () => {
    setCounts(initCounts());
    setSubmitted(false);
    setElapsed(0);
    setAttempts(0);
    setScoreResult(null);
    setShowWrongOverlay(false);
  };

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Minnie/minnie-06.svg" alt="Minnie" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#FF6B9D] text-white rounded-xl font-bold hover:bg-[#E91E8C] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#131F24] relative zoom-wrapper"
    >
      {/* ===== TOP HEADER ===== */}
      <div className="relative">
        <GameHeader
          level={level}
          gameTitle="Counting & Classification"
          characterSrc="/images/P_Minnie/minnie-06.svg"
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-12 pb-4 lg:pb-8 relative z-10 pt-4 lg:pt-5 lg:overflow-hidden">

        {/* ===== LEFT PANEL: Shape Scene (60%) ===== */}
        <Container
          className="lg:flex-[6] h-[55vh] lg:h-auto flex flex-col p-4 lg:p-6 relative shrink-0"
          style={{
            backgroundColor: "#1A2B32",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Mascot */}
          <div className="absolute left-2 lg:left-4 bottom-2 lg:bottom-4 z-20 flex items-end">
            <img
              src="/images/P_Minnie/minnie-06.svg"
              className="w-16 lg:w-20 h-auto drop-shadow-lg"
              alt="mascot"
            />
          </div>
          <ShapeScene placements={config.shapes} />
        </Container>

        {/* ===== RIGHT PANEL: Counter Panel (30%) ===== */}
        <div className="lg:flex-[3] flex flex-col relative min-h-[45vh] mb-8 lg:mb-0 shrink-0">
          <Container
            className="flex flex-col p-4 lg:p-6 flex-1 lg:overflow-hidden"
            style={{
              backgroundColor: "#1A2B32",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <CounterPanel
              shapeTypes={config.shapeTypes}
              counts={counts}
              maxPerShape={config.shapes.length}
              onCountChange={handleCountChange}
              onSubmit={handleSubmit}
              disabled={submitted}
            />
          </Container>
        </div>

      </div>

      {/* ===== INTRO OVERLAY (Level 1 only) ===== */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              มาเรียนรู้เรื่องรูปทรง<br />และการนับกันเถอะ!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Minnie/minnie-01.svg"
          imageAlt="Minnie"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {showWrongOverlay && (
        <GameOverlay
          type="error"
          message={`ลองนับใหม่อีกครั้งนะ `}
          imageSrc="/images/P_Minnie/minnie-05.svg"
          imageAlt="มินนี่"
          autoDismissMs={2000}
          onDismiss={() => setShowWrongOverlay(false)}
        />
      )}

      {/* ===== RESULT MODAL ===== */}
      {submitted && scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={attempts}
          timeSeconds={elapsed}
          totalLevels={9}
          gamePath="counting-classification"
          onRetry={handleRetry}
        />
      )}

      <style>{`
        @media (min-width: 1024px) {
          .zoom-wrapper {
            zoom: 1.1;
            height: ${100 / 1.1}vh;
            overflow: hidden;
          }
        }
        @media (max-width: 1023px) {
          .zoom-wrapper {
            min-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}
