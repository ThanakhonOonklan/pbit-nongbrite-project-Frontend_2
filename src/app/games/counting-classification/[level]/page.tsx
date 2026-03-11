"use client";

import { use, useState, useEffect, useRef } from "react";
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
  const config = countingClassificationLevels[levelNum];

  // ── game state ─────────────────────────────────────────
  const initCounts = () =>
    Object.fromEntries(
      (config?.shapeTypes ?? []).map((t) => [t, 0])
    ) as Record<ShapeType, number>;

  const [counts, setCounts] = useState<Record<ShapeType, number>>(initCounts);
  const [submitted, setSubmitted] = useState(false);
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
    if (submitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [submitted]);

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
        <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[#131F24] overflow-hidden relative"
      style={{
        zoom: 1.1,
        height: `${100 / 1.1}vh`,
      }}
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
      <div className="flex flex-1 gap-6 px-12 pb-8 overflow-hidden relative z-10 pt-5 pb-5">

        {/* ===== LEFT PANEL: Shape Scene (60%) ===== */}
        <Container
          className="flex-[6] flex flex-col p-6 overflow-hidden relative"
          style={{
            backgroundColor: "#FFFFFF",
            border: "7px solid #FFB6C1",
            borderRadius: "32px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2), inset 0 0 0 4px #FFE4E1",
          }}
        >
          {/* Mascot */}
          <div className="absolute left-4 bottom-4 z-20 flex items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/P_Minnie/minnie-06.svg"
              className="w-20 h-auto drop-shadow-lg"
              alt="mascot"
            />
          </div>
          <ShapeScene placements={config.shapes} />
        </Container>

        {/* ===== RIGHT PANEL: Counter Panel (30%) ===== */}
        <div className="flex-[3] flex flex-col relative">
          <Container
            className="flex flex-col p-6 flex-1 overflow-hidden"
            style={{
              backgroundColor: "#FFF0F5",
              border: "7px solid #FFB6C1",
              borderRadius: "32px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2), inset 0 0 0 4px #FFE4E1",
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
    </div>
  );
}
