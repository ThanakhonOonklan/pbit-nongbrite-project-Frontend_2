"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { LoopScene, LoopCodePanel } from "@/components/games/step-counting";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { HelpButton } from "@/components/games/HelpButton";
import { stepCountingLevels } from "@/constants/games/step-counting-levels";
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

const THEME_HEADER: Record<string, { title: string; charSrc: string; bg: string }> = {
  juice: { title: "โรงงานน้ำส้มคั้น", charSrc: "/images/P_Bobo/bobo-01.svg", bg: "#D85A30" },
  candle: { title: "ปาร์ตี้จุดเทียน", charSrc: "/images/P_Bobo/bobo-01.svg", bg: "#D97706" },
  garden: { title: "สวนดอกไม้", charSrc: "/images/P_Bobo/bobo-01.svg", bg: "#16A34A" },
};

export default function StepCountingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();
  const config = stepCountingLevels[levelNum];

  // ── Game state ───────────────────────────────────────────
  const [loopCount, setLoopCount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [boboState, setBoboState] = useState<"idle" | "squeeze" | "celebrate" | "bounce">("idle");
  const [attemptCount, setAttemptCount] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);

  // ── Overlay state ────────────────────────────────────────
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");

  // ── Result state ─────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const startTimeRef = useRef<number>(0);
  useEffect(() => { startTimeRef.current = Date.now(); }, []);

  // ── Loop count change ────────────────────────────────────
  const handleLoopChange = useCallback(
    (delta: number) => {
      if (isRunning || !config) return;
      setLoopCount((prev) => Math.max(0, Math.min(config.maxStepper, prev + delta)));
      setCurrentAmount(0);
      setCurrentLoop(0);
      setBoboState("idle");
    },
    [isRunning, config]
  );

  // ── Run loop ─────────────────────────────────────────────
  const handleRun = useCallback(async () => {
    if (isRunning || !config || loopCount === 0) return;

    setIsRunning(true);
    setCurrentAmount(0);
    setCurrentLoop(0);
    setBoboState("idle");

    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);

    let total = 0;

    for (let i = 0; i < loopCount; i++) {
      setBoboState("squeeze");
      setCurrentLoop(i + 1);
      total += config.yieldsPerAction;
      total = Math.round(total * 100) / 100;
      setCurrentAmount(total);

      await sleep(500);
      setBoboState("idle");
      await sleep(200);
    }

    const isCorrect = total === config.targetAmount;
    const isUnder = total < config.targetAmount;

    if (isCorrect) {
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
    } else if (isUnder) {
      setBoboState("bounce");
      reduceLife();
      setWrongMessage(`ได้แค่ ${total} ${config.outputUnit} ยังไม่ครบ ${config.targetAmount} ${config.outputUnit}`);
      setShowWrongOverlay(true);
    } else {
      setBoboState("idle");
      reduceLife();
      setWrongMessage(`มากเกิน! ได้ ${total} ${config.outputUnit} แต่ต้องการแค่ ${config.targetAmount} ${config.outputUnit}`);
      setShowWrongOverlay(true);
    }
    setIsRunning(false);
  }, [isRunning, config, loopCount, attemptCount, reduceLife]);

  // ── Retry ────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setScoreResult(null);
    setAttempts(0);
    setElapsedSeconds(0);
    setLoopCount(0);
    setCurrentAmount(0);
    setCurrentLoop(0);
    setAttemptCount(0);
    setBoboState("idle");
    setShowWrongOverlay(false);
    setIsRunning(false);
    startTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  }, []);

  // ── Fallback ─────────────────────────────────────────────
  if (!config) {
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

  const themeHeader = THEME_HEADER[config.theme] || THEME_HEADER.juice;

  const THEME_BG: Record<string, string> = {
    juice: "bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]",
    candle: "bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]",
    garden: "bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]",
  };
  const themeBg = THEME_BG[config.theme] ?? THEME_BG.juice;

  // ── Render ───────────────────────────────────────────────
  return (
    <div className={`flex flex-col h-screen overflow-hidden relative ${themeBg}`}>

      {/* ===== Header ===== */}
      <div className="relative z-50 w-full">
        <GameHeader
          level={level}
          gameTitle={themeHeader.title}
          characterSrc={themeHeader.charSrc}
          bgColor={themeHeader.bg}
        />
      </div>

      {/* ===== Main content ===== */}
      <div className="flex-1 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 p-4 lg:p-6 pb-24 lg:pb-6 overflow-y-auto w-full max-w-5xl mx-auto">

        {/* ===== LEFT: Scene area ===== */}
        <div className="w-full max-w-[500px]" key={gameKey}>
          <LoopScene
            config={config}
            currentAmount={currentAmount}
            currentLoop={currentLoop}
            totalLoops={loopCount}
            isRunning={isRunning}
            boboState={boboState}
          />
        </div>

        {/* ===== RIGHT: Code panel ===== */}
        <div className="w-full max-w-[380px] shrink-0">
          <LoopCodePanel
            config={config}
            loopCount={loopCount}
            onLoopChange={handleLoopChange}
            onRun={handleRun}
            isRunning={isRunning}
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

      {/* ===== INTRO OVERLAY ===== */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={<>ช่วยคั้นน้ำส้มให้ครบเป้าเลย!<br />ตั้งจำนวนแล้วกดรัน</>}
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Bobo/bobo-01.svg"
          imageAlt="Bobo"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {showWrongOverlay && (
        <GameOverlay
          type="error"
          message={wrongMessage}
          imageSrc="/images/P_Bobo/bobo-05.svg"
          imageAlt="Bobo"
          autoDismissMs={2500}
          onDismiss={() => setShowWrongOverlay(false)}
        />
      )}

      {/* ===== WIN MODAL ===== */}
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

      {/* ===== OUT OF LIVES ===== */}
      {user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0 && <OutOfLivesModal />}
    </div>
  );
}
