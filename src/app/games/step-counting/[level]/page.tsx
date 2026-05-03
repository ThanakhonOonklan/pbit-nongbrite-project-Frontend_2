"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { LoopScene, LoopCodePanel } from "@/components/games/step-counting";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { stepCountingTutorialSteps } from "@/components/games/tutorials";
import { HelpButton } from "@/components/games/HelpButton";
import { stepCountingLevels, type ResolvedLoopConfig } from "@/constants/games/step-counting-levels";
import {
  calculateGameScore,
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
  const config: ResolvedLoopConfig | undefined = levelConfig
    ? {
      level: levelConfig.level,
      difficulty: levelConfig.difficulty,
      ...levelConfig.variants[variantIndex],
    }
    : undefined;
  const taskCount = config?.tasks.length ?? 1;

  // ── Game state ───────────────────────────────────────────
  const [loopCounts, setLoopCounts] = useState<number[]>(() => Array(taskCount).fill(0));
  const [filledAmounts, setFilledAmounts] = useState<number[]>(() => Array(taskCount).fill(0));
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [boboState, setBoboState] = useState<"idle" | "squeeze" | "celebrate" | "bounce">("idle");
  const [attemptCount, setAttemptCount] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);

  // ── Overlay state ────────────────────────────────────────
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const [taskStatuses, setTaskStatuses] = useState<("ok" | "over" | null)[]>(() => Array(taskCount).fill(null));
  const [blenderDrop, setBlenderDrop] = useState<{ emoji: string; id: number } | null>(null);

  // ── Result state ─────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const startTimeRef = useRef<number>(0);
  useEffect(() => { startTimeRef.current = Date.now(); }, []);

  // ── Loop count change ────────────────────────────────────
  const handleLoopChange = useCallback(
    (taskIndex: number, delta: number) => {
      if (isRunning || !config) return;
      const task = config.tasks[taskIndex];
      setLoopCounts((prev) => {
        const next = [...prev];
        next[taskIndex] = Math.max(0, Math.min(task.maxStepper, next[taskIndex] + delta));
        return next;
      });
      if (delta > 0) setBlenderDrop({ emoji: task.inputEmoji, id: Date.now() });
      setFilledAmounts((prev) => {
        const next = [...prev];
        next[taskIndex] = 0;
        return next;
      });
      setCurrentLoop(0);
      setBoboState("idle");
    },
    [isRunning, config]
  );

  // ── Run loop ─────────────────────────────────────────────
  const handleRun = useCallback(async () => {
    if (isRunning || !config) return;
    if (loopCounts.some((c) => c === 0)) return;

    setIsRunning(true);
    setFilledAmounts(config.tasks.map(() => 0));
    setCurrentTaskIndex(0);
    setCurrentLoop(0);
    setBoboState("idle");

    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);

    const results: { total: number; isCorrect: boolean; taskIdx: number }[] = [];

    for (let taskIdx = 0; taskIdx < config.tasks.length; taskIdx++) {
      const task = config.tasks[taskIdx];
      setCurrentTaskIndex(taskIdx);
      setCurrentLoop(0);
      let total = 0;

      for (let i = 0; i < loopCounts[taskIdx]; i++) {
        setBoboState("squeeze");
        setCurrentLoop(i + 1);
        total += task.yieldsPerAction;
        total = Math.round(total * 100) / 100;
        setFilledAmounts((prev) => {
          const next = [...prev];
          next[taskIdx] = total;
          return next;
        });
        await sleep(500);
        setBoboState("idle");
        await sleep(200);

        if (total > task.targetAmount) break;
      }

      results.push({ taskIdx, total, isCorrect: total === task.targetAmount });
    }

    const allCorrect = results.every((r) => r.isCorrect);

    setTaskStatuses(results.map((r) => {
      if (r.isCorrect) return "ok";
      return r.total > config.tasks[r.taskIdx].targetAmount ? "over" : null;
    }));

    if (allCorrect) {
      setBoboState("celebrate");
      await sleep(600);
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const result = calculateGameScore({
        difficulty: config.difficulty,
        attempts: newAttempts,
        timeSeconds: elapsed,
      });
      const { stars } = getStarRating(result.totalScore);
      const absoluteLevelId = getAbsoluteLevelId("step-counting", config.level);
      gameService
        .submitScore({ levelId: absoluteLevelId, score: result.totalScore, stars, playTime: elapsed })
        .catch((err) => console.error("Failed to submit score", err));
      setScoreResult(result);
      setAttempts(newAttempts);
      setElapsedSeconds(elapsed);
    } else {
      setBoboState("bounce");
      reduceLife();
      const errorMsg = results
        .filter((r) => !r.isCorrect)
        .map((r) => {
          const task = config.tasks[r.taskIdx];
          return r.total < task.targetAmount
            ? `น้ำ${task.inputUnit}: ได้ ${r.total} แก้ว ยังไม่ครบ ${task.targetAmount} แก้ว`
            : `น้ำ${task.inputUnit}: มากเกิน! ได้ ${r.total} แก้ว แต่ต้องการแค่ ${task.targetAmount} แก้ว`;
        })
        .join("\n");
      setWrongMessage(errorMsg);
      setShowWrongOverlay(true);
    }
    setIsRunning(false);
  }, [isRunning, config, loopCounts, attemptCount, reduceLife]);

  // ── Wrong overlay dismiss ────────────────────────────────
  const handleWrongDismiss = useCallback(() => {
    setShowWrongOverlay(false);
    setBoboState("idle");
    setFilledAmounts(config?.tasks.map(() => 0) ?? []);
    setTaskStatuses(config?.tasks.map(() => null) ?? []);
  }, [config]);

  // ── Retry (re-randomize variant) ────────────────────────
  const handleRetry = useCallback(() => {
    if (levelConfig) {
      setVariantIndex(Math.floor(Math.random() * levelConfig.variants.length));
    }
    setScoreResult(null);
    setAttempts(0);
    setElapsedSeconds(0);
    setLoopCounts(config?.tasks.map(() => 0) ?? [0]);
    setFilledAmounts(config?.tasks.map(() => 0) ?? [0]);
    setCurrentTaskIndex(0);
    setCurrentLoop(0);
    setAttemptCount(0);
    setBoboState("idle");
    setTaskStatuses(config?.tasks.map(() => null) ?? []);
    setShowWrongOverlay(false);
    setIsRunning(false);
    startTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  }, [config, levelConfig]);

  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;
  const hasGameResult = Boolean(scoreResult);
  const canShowGameOverlay = !isOutOfLives && !hasGameResult;

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

        {/* ===== LEFT PANEL: Scene area (60%) ===== */}
        <div className="lg:flex-[7] h-[55vh] lg:h-auto flex flex-col relative shrink-0" key={gameKey}>
          <LoopScene
            config={config}
            filledAmounts={filledAmounts}
            currentTaskIndex={currentTaskIndex}
            isRunning={isRunning}
            boboState={boboState}
            taskStatuses={taskStatuses}
            blenderDrop={blenderDrop}
          />
        </div>

        {/* ===== RIGHT PANEL: Code panel (40%) ===== */}
        <div className="lg:flex-[4] flex flex-col relative min-h-[45vh] mb-8 lg:mb-0 shrink-0">
          <LoopCodePanel
            config={config}
            loopCounts={loopCounts}
            onLoopChange={handleLoopChange}
            onRun={handleRun}
            isRunning={isRunning}
            activeTaskIndex={currentTaskIndex}
          />
        </div>
      </div>

      {/* ===== Help button ===== */}
      <HelpButton
        steps={[
          { emoji: "📖", text: "อ่านโจทย์ด้านบน เช่น 'ส้ม 1 ลูก คั้นได้ครึ่งแก้ว'" },
          { emoji: "🔢", text: "กด + / − ตั้งจำนวนที่ต้องการ" },
          { emoji: "▶️", text: "กดรันเพื่อดูผลลัพธ์" },
          { emoji: "🎯", text: "ตั้งจำนวนให้พอดีกับเป้าหมาย!" },
        ]}
      />

      {/* ===== INTRO TUTORIAL ===== */}
      {showIntro && (
        <TutorialModal
          steps={stepCountingTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Bobo/bobo-01.svg"
          accentColor="#F97316"
        />
      )}

      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {canShowGameOverlay && showWrongOverlay && (
        <GameOverlay
          type="error"
          message={wrongMessage}
          imageSrc="/images/P_Bobo/bobo-05.svg"
          imageAlt="Bobo"
          autoDismissMs={2500}
          onDismiss={handleWrongDismiss}
        />
      )}

      {/* ===== WIN MODAL ===== */}
      {scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={attempts}
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
