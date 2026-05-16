"use client";

import { use, useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { LoopScene, LoopCodePanel } from "@/components/games/step-counting";
import type { BlenderPhase } from "@/components/games/step-counting/Blender";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { stepCountingTutorialSteps } from "@/components/games/tutorials";
import { HelpButton } from "@/components/games/HelpButton";
import { stepCountingLevels, type ResolvedLoopConfig, type LoopTheme } from "@/constants/games/step-counting-levels";
import {
  calculateStepCountingScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function StepCountingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();
  const levelConfig = stepCountingLevels[levelNum];

  // ── Randomly select one variant (client-only to avoid hydration mismatch) ──
  const [variantIndex, setVariantIndex] = useState(0);
  useEffect(() => {
    if (levelConfig) {
      setVariantIndex(Math.floor(Math.random() * levelConfig.variants.length));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Resolve variant into a flat config for components
  const config: ResolvedLoopConfig | undefined = useMemo(() => {
    return levelConfig
      ? {
        level: levelConfig.level,
        difficulty: levelConfig.difficulty,
        ...levelConfig.variants[variantIndex],
      }
      : undefined;
  }, [levelConfig, variantIndex]);
  const taskCount = config?.tasks.length ?? 1;

  // ── Game state ───────────────────────────────────────────
  const [gameKey, setGameKey] = useState(0);
  const [glasses, setGlasses] = useState<{ id: string; taskIdx: number; glassIdxWithinTask: number; theme: LoopTheme; actualTheme: LoopTheme | null; filled: number; status: "ok" | "over" | "wrong" | null }[]>([]);

  useEffect(() => {
    if (config) {
      const arr: any[] = [];
      config.tasks.forEach((task, ti) => {
        for (let i = 0; i < task.targetAmount; i++) {
          arr.push({ id: `${ti}-${i}`, taskIdx: ti, glassIdxWithinTask: i, theme: task.theme, actualTheme: null, filled: 0, status: null });
        }
      });
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setGlasses(arr);
    }
  }, [config, gameKey]);

  const totalFilled = useMemo(() => config?.tasks.map((_, idx) => glasses.filter(g => g.taskIdx === idx && g.filled >= 1 && g.status === "ok").length) || [], [config, glasses]);
  const [boboState, setBoboState] = useState<"idle" | "squeeze" | "celebrate" | "bounce">("idle");
  const [isBlending, setIsBlending] = useState(false);
  const [showIntro, setShowIntro] = useState(levelNum === 1);

  // ── Blender state ─────────────────────────────────────────
  const [blenderContents, setBlenderContents] = useState<{ theme: LoopTheme; count: number } | null>(null);
  const [blenderPhase, setBlenderPhase] = useState<BlenderPhase>("empty");
  const [lockedTheme, setLockedTheme] = useState<LoopTheme | null>(null);
  const [residueTheme, setResidueTheme] = useState<LoopTheme | null>(null);
  const residueTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const penaltyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Penalty / score state ─────────────────────────────────
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // ── Overlay state ─────────────────────────────────────────
  const [showWarningOverlay, setShowWarningOverlay] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Bobo speech bubble override
  const [boboMessage, setBoboMessage] = useState<string | null>(null);

  const startTimeRef = useRef<number>(0);
  useEffect(() => { startTimeRef.current = Date.now(); }, []);

  // ── Helper: show warning overlay ─────────────────────────
  const showWarning = useCallback((msg: string) => {
    setWarningMessage(msg);
    setShowWarningOverlay(true);
  }, []);

  // ── Add / remove fruit from blender ──────────────────────
  const handleAddFruit = useCallback(
    (theme: LoopTheme, delta: number) => {
      if (isBlending || !config) return;
      if (blenderPhase === "dirty") return;

      const task = config.tasks.find((t) => t.theme === theme);
      if (!task) return;

      const currentCount = blenderContents?.theme === theme ? blenderContents.count : 0;
      const newCount = Math.max(0, Math.min(task.blenderCapacity, currentCount + delta));

      if (newCount === 0) {
        setBlenderContents(null);
        setLockedTheme(null);
        setBlenderPhase("empty");
      } else {
        setBlenderContents({ theme, count: newCount });
        setLockedTheme(theme);
        setBlenderPhase("filling");
      }
    },
    [isBlending, config, blenderPhase, lockedTheme, blenderContents]
  );

  // ── Blend (คั้นน้ำ) ──────────────────────────────────────
  const handleBlend = useCallback(async () => {
    if (isBlending || !config) return;

    if (penaltyTimerRef.current) {
      clearTimeout(penaltyTimerRef.current);
      penaltyTimerRef.current = null;
      setGlasses(prev => prev.map(g => (g.status === "wrong" || g.status === "over") ? { ...g, filled: 0, actualTheme: null, status: null } : g));
    }

    // Penalty: blend when dirty (without cleaning)
    if (blenderPhase === "dirty") {
      setPenaltyCount((p) => p + 1);
      reduceLife();
      showWarning("ต้องรอล้างเครื่องปั่นก่อนนะ! ⚠️");
      return;
    }

    if (!blenderContents || blenderContents.count === 0) return;

    setIsBlending(true);
    setBoboState("squeeze");
    setBlenderPhase("blending");
    await sleep(1100);

    const blendedTheme = blenderContents.theme;
    const blendedCount = blenderContents.count;
    const task = config.tasks.find((t) => t.theme === blendedTheme);
    if (!task) { setIsBlending(false); return; }

    const yieldAmount = Math.round(blendedCount * task.yieldsPerAction * 100) / 100;

    let remainingYield = yieldAmount;
    let newGlasses = [...glasses];
    let penaltyTriggered = false;
    let overfillTriggered = false;
    let wrongColorTriggered = false;
    let errorIdx = -1;

    for (let i = 0; i < newGlasses.length; i++) {
      if (remainingYield <= 0) break;
      if (newGlasses[i].filled >= 1) continue;

      const g = newGlasses[i];
      const spaceLeft = 1 - g.filled;
      const amountToAdd = Math.min(spaceLeft, remainingYield);

      if (g.theme !== blendedTheme) {
        newGlasses[i] = { ...g, filled: Math.round((g.filled + remainingYield) * 100) / 100, actualTheme: blendedTheme, status: "wrong" };
        wrongColorTriggered = true;
        errorIdx = i;
        remainingYield = 0;
        break;
      }

      newGlasses[i] = { ...g, filled: Math.round((g.filled + amountToAdd) * 100) / 100, actualTheme: blendedTheme };
      remainingYield -= amountToAdd;
      remainingYield = Math.round(remainingYield * 100) / 100;

      if (i === newGlasses.length - 1 && remainingYield > 0) {
        newGlasses[i].filled = Math.round((newGlasses[i].filled + remainingYield) * 100) / 100;
        newGlasses[i].status = "over";
        overfillTriggered = true;
        errorIdx = i;
        remainingYield = 0;
        break;
      }
    }

    newGlasses = newGlasses.map(g => g.filled === 1 && !g.status ? { ...g, status: "ok" } : g);
    setGlasses(newGlasses);

    if (wrongColorTriggered || overfillTriggered) {
      setPenaltyCount((p) => p + 1);
      reduceLife();

      if (wrongColorTriggered) {
        const FRUIT_NAME: Record<string, string> = { orange: "ส้ม", watermelon: "แตงโม", pineapple: "สับปะรด", apple: "แอปเปิล" };
        showWarning(`ผิดสี! แก้วนี้ต้องการน้ำ${FRUIT_NAME[newGlasses[errorIdx].theme]} ⚠️`);
      } else {
        showWarning(`น้ำล้นแก้ว! ⚠️`);
      }

      setBlenderContents(null);
      setLockedTheme(null);
      setBlenderPhase("dirty");
      if (residueTimerRef.current) clearTimeout(residueTimerRef.current);
      residueTimerRef.current = setTimeout(() => setBlenderPhase("empty"), 800);
      setBoboState("bounce");

      penaltyTimerRef.current = setTimeout(() => {
        setGlasses(prev => {
          const reset = [...prev];
          if (reset[errorIdx] && (reset[errorIdx].status === "wrong" || reset[errorIdx].status === "over")) {
            reset[errorIdx] = { ...reset[errorIdx], filled: 0, actualTheme: null, status: null };
          }
          return reset;
        });
        penaltyTimerRef.current = null;
      }, 2000);

      setIsBlending(false);
      return;
    }

    // Check win condition
    const allDone = newGlasses.every(g => g.filled === 1 && g.status === "ok");

    setBlenderContents(null);
    setLockedTheme(null);
    setResidueTheme(blendedTheme);
    setBlenderPhase("dirty");
    if (residueTimerRef.current) clearTimeout(residueTimerRef.current);
    residueTimerRef.current = setTimeout(() => setBlenderPhase("empty"), 800);

    if (allDone) {
      setBoboState("celebrate");
      await sleep(600);
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const result = calculateStepCountingScore({
        difficulty: config.difficulty,
        penaltyCount,
        timeSeconds: elapsed,
      });
      const { stars } = getStarRating(result.totalScore);
      const absoluteLevelId = getAbsoluteLevelId("step-counting", config.level);
      gameService
        .submitScore({ levelId: absoluteLevelId, score: result.totalScore, stars, playTime: elapsed })
        .catch((err) => console.error("Failed to submit score", err));
      setScoreResult(result);
      setElapsedSeconds(elapsed);
    }

    setIsBlending(false);
  }, [isBlending, config, blenderPhase, blenderContents, glasses, penaltyCount, reduceLife, showWarning]);

  // ── Retry (re-randomize variant) ────────────────────────
  const handleRetry = useCallback(() => {
    if (levelConfig) {
      setVariantIndex(Math.floor(Math.random() * levelConfig.variants.length));
    }
    setScoreResult(null);
    setElapsedSeconds(0);
    setBoboState("idle");
    setIsBlending(false);
    setBlenderContents(null);
    setBlenderPhase("empty");
    setLockedTheme(null);
    setResidueTheme(null);
    setPenaltyCount(0);
    if (residueTimerRef.current) clearTimeout(residueTimerRef.current);
    setShowWarningOverlay(false);
    startTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  }, [levelConfig, taskCount]);

  // ── Derived blender capacity for scene ───────────────────
  const activeTask = config?.tasks.find((t) => t.theme === (blenderContents?.theme ?? lockedTheme));
  const blenderCapacity = activeTask?.blenderCapacity ?? (config?.tasks[0]?.blenderCapacity ?? 1);

  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;
  const hasGameResult = Boolean(scoreResult);
  const canShowGameOverlay = !isOutOfLives && !hasGameResult;
  const canShowTutorial = showIntro && !isOutOfLives && !hasGameResult;

  // ── Fallback ─────────────────────────────────────────────
  if (!config || !levelConfig) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-[#87CEEB] to-[#C9E8F7]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Bobo/bobo-03.svg" alt="Bobo" width={110} height={110} className="w-auto h-auto object-contain drop-shadow-lg" />
          <p className="text-amber-900 text-xl font-bold">ไม่พบด่านนี้</p>
          <button onClick={() => router.push("/courses")} className="mt-2 px-6 py-2 bg-[#D85A30] text-white rounded-xl font-bold hover:bg-[#C04828] transition-colors shadow-lg">
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative zoom-wrapper bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/Background/Step-countingBackground.png')" }}>

      {/* ===== Header ===== */}
      <div className="relative z-50 w-full">
        <GameHeader
          level={level}
          gameTitle="ร้านขายน้ำผลไม้"
          characterSrc="/images/P_Bobo/bobo-01.svg"
          bgColor="#6ED1CF"
        />
      </div>

      {/* ===== Main content ===== */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-6 px-4 lg:px-12 pb-4 lg:pb-8 relative z-10 pt-4 lg:pt-5 lg:overflow-hidden">

        {/* ===== LEFT PANEL: Scene ===== */}
        <div className="lg:flex-[7] h-[55vh] lg:h-auto flex flex-col relative shrink-0" key={gameKey}>
          <LoopScene
            config={config}
            glasses={glasses}
            isRunning={isBlending}
            boboState={boboState}
            boboMessage={boboMessage}
            blenderDrop={null}
            blenderPhase={blenderPhase}
            blenderTheme={blenderContents?.theme ?? null}
            blenderFruitCount={blenderContents?.count ?? 0}
            blenderCapacity={blenderCapacity}
            blenderResidueTheme={residueTheme}
          />
        </div>

        {/* ===== RIGHT PANEL: Code panel ===== */}
        <div className="lg:flex-[4] flex flex-col relative min-h-[45vh] mb-8 lg:mb-0 shrink-0">
          <LoopCodePanel
            config={config}
            blenderContents={blenderContents}
            blenderPhase={blenderPhase}
            lockedTheme={lockedTheme}
            totalFilled={totalFilled}
            penaltyCount={penaltyCount}
            onAddFruit={handleAddFruit}
            onBlend={handleBlend}
            isBlending={isBlending}
          />
        </div>
      </div>

      {/* ===== Help button ===== */}
      <HelpButton onClick={() => setShowIntro(true)} color="#6ED1CF" />

      {/* ===== INTRO TUTORIAL ===== */}
      {canShowTutorial && (
        <TutorialModal
          steps={stepCountingTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Bobo/bobo-01.svg"
          accentColor="#6ED1CF"
        />
      )}

      {/* ===== WARNING OVERLAY ===== */}
      {canShowGameOverlay && showWarningOverlay && (
        <GameOverlay
          type="error"
          message={warningMessage}
          imageSrc="/images/P_Bobo/bobo-05.svg"
          imageAlt="Bobo"
          autoDismissMs={2200}
          onDismiss={() => { setShowWarningOverlay(false); setBoboState("idle"); }}
        />
      )}

      {/* ===== WIN MODAL ===== */}
      {scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={penaltyCount + 1}
          timeSeconds={elapsedSeconds}
          gamePath="step-counting"
          onRetry={handleRetry}
        />
      )}

      {/* ===== OUT OF LIVES ===== */}
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
