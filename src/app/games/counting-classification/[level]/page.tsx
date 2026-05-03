"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GameHeader } from "@/components/games/GameHeader";
import { Container } from "@/components/common";
import { ShapeScene, CounterPanel, SkyBackground } from "@/components/games/counting-classification";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { countingClassificationTutorialSteps } from "@/components/games/tutorials";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";
import {
  LEVEL_SPECS,
  type ShapeType,
  type ShapePlacement,
  type CountingClassificationLevelConfig,
} from "@/constants/games/counting-classification-levels";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";

export default function CountingClassificationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();
  // ── สุ่ม config หลัง hydration ───────────────────────────
  const [randomLevelConfig, setRandomLevelConfig] = useState<CountingClassificationLevelConfig | null>(null);
  const config = randomLevelConfig;

  // ── game state ─────────────────────────────────────────
  const [counts, setCounts] = useState<Record<ShapeType, number>>({} as Record<ShapeType, number>);
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const elapsedRef = useRef(0); // ใช้ ref แทน state เพื่อไม่ให้ component re-render ทุกวินาที จนเกิดอาการกระตุก
  const [scoreResult, setScoreResult] = useState<{
    attemptScore: number;
    timeScore: number;
    totalScore: number;
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── helper: สร้าง config สุ่มตาม LEVEL_SPECS ────────────────
  const buildLevelConfig = (lv: number): CountingClassificationLevelConfig => {
    const spec = LEVEL_SPECS[lv];
    const { shapeTypes, total, difficulty } = spec;
    const numTypes = shapeTypes.length;
    const cnts = Array(numTypes).fill(1);
    for (let r = total - numTypes; r > 0; r--) {
      cnts[Math.floor(Math.random() * numTypes)]++;
    }
    const baseSize = Math.max(52, 90 - (total - 10) * 2);
    const seed = Date.now().toString(36);
    const shapes: ShapePlacement[] = shapeTypes.flatMap((type, ti) =>
      Array.from({ length: cnts[ti] }, (_, i) => ({
        id: `l${lv}_${seed}_${type}_${i}`,
        type,
        x: 0,
        y: 0,
        size: baseSize + Math.floor(Math.random() * 8),
      }))
    );
    return { level: lv, difficulty, shapeTypes, shapes };
  };

  // ── สุ่ม config หลัง mount (ทุก level) ──────────────────────
  useEffect(() => {
    if (!LEVEL_SPECS[levelNum]) return;
    const newConfig = buildLevelConfig(levelNum);
    setRandomLevelConfig(newConfig);
    setCounts(Object.fromEntries(newConfig.shapeTypes.map((t) => [t, 0])) as Record<ShapeType, number>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelNum]);

  // ── timer (silent) ──────────────────────────────────────
  useEffect(() => {
    // รอให้ Intro หายก่อน ถึงจะเริ่มจับเวลา
    if (submitted || showIntro) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [submitted, showIntro]);

  const handleCountChange = (type: ShapeType, newValue: number) => {
    setCounts((prev) => ({ ...prev, [type]: newValue }));
  };

  // ── ตรวจคำตอบ ────────────────────────────────────────────
  const handleSubmit = () => {
    if (!config) return;
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
      reduceLife();
      setShowWrongOverlay(true);
      return;
    }

    setSubmitted(true);

    import("@/utils/game-scoring").then(({ calculateCountingClassificationScore, getStarRating }) => {
      const result = calculateCountingClassificationScore({
        difficulty: config.difficulty,
        attempts: newAttempts,
        timeSeconds: elapsedRef.current,
      });
      setScoreResult(result);

      // ส่งคะแนนไป Backend เพื่อปลดล็อคด่านถัดไป
      const { stars } = getStarRating(result.totalScore);
      const absoluteLevelId = getAbsoluteLevelId('counting-classification', levelNum);
      gameService.submitScore({
        levelId: absoluteLevelId,
        score: result.totalScore,
        stars,
        playTime: elapsedRef.current,
      }).catch((error) => {
        console.error("Failed to submit game score", error);
      });
    });
  };

  // ── retry ────────────────────────────────────────────────
  const handleRetry = () => {
    const newCfg = buildLevelConfig(levelNum);
    setRandomLevelConfig(newCfg);
    setCounts(Object.fromEntries(newCfg.shapeTypes.map((t) => [t, 0])) as Record<ShapeType, number>);
    setSubmitted(false);
    elapsedRef.current = 0;
    setAttempts(0);
    setScoreResult(null);
    setShowWrongOverlay(false);
  };

  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;
  const hasGameResult = submitted && Boolean(scoreResult);
  const canShowGameOverlay = !isOutOfLives && !hasGameResult;

  if (!LEVEL_SPECS[levelNum]) {
    return (
      <div className="flex h-screen items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #87CEEB 0%, #C9E8F5 100%)" }}>
        <SkyBackground />
        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <Image src="/images/P_Minnie/minnie-06.svg" alt="Minnie" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-[#1E5A80] text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#4DB6E3] text-white rounded-xl font-bold hover:bg-[#2990BC] transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ background: "linear-gradient(180deg, #87CEEB 0%, #C9E8F5 100%)" }}>
        <div className="w-12 h-12 border-4 border-[#4DB6E3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col relative zoom-wrapper bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Background/counting-classificationBackground.png')" }}
    >


      {/* ===== TOP HEADER ===== */}
      <div className="relative">
        <GameHeader
          level={level}
          gameTitle="Counting & Classification"
          characterSrc="/images/P_Minnie/minnie-06.svg"
          bgColor="#FB96BB"
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-12 pb-4 lg:pb-8 relative z-10 pt-4 lg:pt-5 lg:overflow-hidden">

        {/* ===== LEFT PANEL: Shape Scene (60%) ===== */}
        <div
          className="lg:flex-[6] h-[55vh] lg:h-auto relative shrink-0"
          style={{
            /* 1. Outer Frame: White border + Light Pastel Green */
            borderRadius: "36px",
            border: "8px solid #FFFFFF",
            background: "#DCEDC8",
            boxShadow: "0 12px 32px rgba(139,195,74,0.3)",
            padding: "8px", // Reduced distance, close to the outer border but not touching
            position: "relative",
            zIndex: 10
          }}
        >
          {/* 2. White Inner Line */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "26px", // Adjusted to match the outer curve beautifully
              padding: "6px", // Thickness of the white inner line
              height: "100%",
              // Soft shadow for depth
              boxShadow: "0 4px 8px rgba(0,0,0,0.06), inset 0 3px 6px rgba(0,0,0,0.1)"
            }}
          >
            {/* 3. Scene Container */}
            <Container
              className="flex flex-col p-0 relative h-full"
              style={{ border: "none", boxShadow: "none", backgroundColor: "transparent", borderRadius: "20px", overflow: "hidden" }}
            >
              {/* Mascot */}
              <div className="absolute left-2 lg:left-4 bottom-2 lg:bottom-4 z-40 flex items-end">
                <img
                  src="/images/P_Minnie/minnie-06.svg"
                  className="w-16 lg:w-20 h-auto drop-shadow-lg"
                  alt="mascot"
                />
              </div>
              <ShapeScene placements={config.shapes} />
            </Container>
          </div>
        </div>

        {/* ===== RIGHT PANEL: Counter Panel (30%) ===== */}
        <div className="lg:flex-[3] flex flex-col relative min-h-[45vh] mb-8 lg:mb-0 shrink-0">
          <Container
            className="flex flex-col p-4 lg:p-6 flex-1 lg:overflow-hidden"
            style={{
              backgroundColor: "#BCE8D5", // Pastel teal green
              border: "6px solid #FFFFFF",
              borderRadius: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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

      {/* ===== INTRO TUTORIAL (Level 1 only) ===== */}
      {showIntro && (
        <TutorialModal
          steps={countingClassificationTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Minnie/minnie-01.svg"
          accentColor="#D946A8"
        />
      )}

      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {canShowGameOverlay && showWrongOverlay && (
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
      {submitted && scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={attempts}
          timeSeconds={elapsedRef.current}
          totalLevels={9}
          gamePath="counting-classification"
          onRetry={handleRetry}
        />
      )}

      {/* ===== OUT OF LIVES MODAL ===== */}
      {isOutOfLives && <OutOfLivesModal />}

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
