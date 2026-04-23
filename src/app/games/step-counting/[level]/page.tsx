"use client";

import { use, useState, useCallback, useRef, useId, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";

import { NumberLine, QuestionPanel, SkyBackground } from "@/components/games/step-counting";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { HelpButton } from "@/components/games/HelpButton";
import {
  stepCountingLevels,
  getCorrectAnswers,
} from "@/constants/games/step-counting-levels";
import {
  calculateGameScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
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
  const { user, reduceLife } = useUserStore();

  const config = stepCountingLevels[levelNum];
  const dndId = useId();

  // ── Result state ─────────────────────────────────────────
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [gameKey, setGameKey] = useState(0);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ── Game state ───────────────────────────────────────────
  const [stepper, setStepper] = useState(0);
  const [slotValues, setSlotValues] = useState<(number | null)[]>(
    () => Array(config?.operators.length ?? 0).fill(null)
  );
  const [attemptCount, setAttemptCount] = useState(0);
  const [boboStep, setBoboStep] = useState(0);
  const [boboState, setBoboState] = useState<"idle" | "jumping" | "falling" | "success">("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const isChecked = isAnimating;

  const startTimeRef = useRef<number>(0);
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 10 } })
  );

  const allSlotsFilled = slotValues.every((v) => v !== null);

  // ── Drag Start & End ─────────────────────────────────────
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);
      const { active, over } = event;
      const activeId = active.id as string;
      const targetId = over?.id as string | undefined;

      setSlotValues((prev) => {
        const next = [...prev];

        if (activeId === "source") {
          // Dragging from stepper block → place value into slot
          if (targetId?.startsWith("slot-")) {
            const i = parseInt(targetId.split("-")[1], 10);
            next[i] = stepper;
          }
        } else if (activeId.startsWith("slot-block-")) {
          // Dragging an existing slot block
          const fromIdx = parseInt(activeId.split("-")[2], 10);

          if (targetId?.startsWith("slot-")) {
            const toIdx = parseInt(targetId.split("-")[1], 10);
            if (fromIdx !== toIdx) {
              next[toIdx] = next[fromIdx]; // move
              next[fromIdx] = null;        // clear source
            }
          } else {
            // Dropped on panel or outside → clear the slot
            next[fromIdx] = null;
          }
        }

        return next;
      });

      if (activeId === "source" && targetId?.startsWith("slot-")) {
        setStepper(0);
      }
    },
    [stepper]
  );

  // ── Confirm ──────────────────────────────────────────────
  const handleConfirm = useCallback(() => {
    if (!config || !allSlotsFilled || isAnimating) return;

    const correctAnswers = getCorrectAnswers(config);
    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);
    setIsAnimating(true);

    let currentStep = 0;

    const nextJump = () => {
      if (currentStep < config.operators.length) {
        const isCorrect = slotValues[currentStep] === correctAnswers[currentStep];
        currentStep += 1;
        setBoboStep(currentStep);
        setBoboState("jumping");

        if (isCorrect) {
          setTimeout(() => {
            setBoboState("idle");
            setTimeout(nextJump, 250);
          }, 900); // 900ms aligns with CSS hopArc
        } else {
          setTimeout(() => {
            setBoboState("falling");
            reduceLife();
            setTimeout(() => {
              setBoboState("idle");
              setBoboStep(0);
              setIsAnimating(false); // ← re-enable confirm after full fall + reset
              setErrorMsg("ลองอีกครั้ง");
            }, 2000);
          }, 850);
        }
      } else {
        // Reached end successfully
        setBoboState("success");
        setTimeout(() => {
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
          setIsAnimating(false); // ← re-enable after score shown
        }, 800);
      }
    };

    nextJump();
  }, [config, allSlotsFilled, isAnimating, slotValues, attemptCount]);

  // ── Retry ────────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    setScoreResult(null);
    setAttempts(0);
    setElapsedSeconds(0);
    setStepper(0);
    setSlotValues(Array(config?.operators.length ?? 0).fill(null));
    setAttemptCount(0);
    setBoboStep(0);
    setBoboState("idle");
    setIsAnimating(false);
    startTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  }, [config]);

  // ── Fallback ─────────────────────────────────────────────
  if (!config) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{ background: "linear-gradient(180deg, #BAE6FD 0%, #FDE68A 50%, #FEF3C7 100%)" }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Bobo/bobo-03.svg" alt="Bobo" width={110} height={110} className="object-contain" />
          <p className="text-gray-700 text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-orange-400 text-white rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDragId(null)}
    >
      <div
        className="flex flex-col h-screen overflow-hidden relative bg-[#DCEFFE]"
      >
        <SkyBackground />
        <div className="relative z-50 w-full">
          <GameHeader
            level={level}
            gameTitle="นับจำนวนก้าวเดิน"
            characterSrc="/images/P_Bobo/bobo-01.svg"
            bgColor="#6ED1CF"
          />
        </div>

        {/* NumberLine */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative z-20 mt-12 md:mt-16">
          <NumberLine
            key={gameKey}
            startValue={config.startValue}
            operators={config.operators}
            slotValues={slotValues}
            boboStep={boboStep}
            boboState={boboState}
          />
        </div>

        {/* QuestionPanel */}
        <div className="px-4 pb-6 pt-2 relative z-20">
          <QuestionPanel
            stepper={stepper}
            onStepperMinus={() => setStepper((s) => Math.max(0, s - 1))}
            onStepperPlus={() => setStepper((s) => Math.min(50, s + 1))}
            allSlotsFilled={allSlotsFilled}
            onConfirm={handleConfirm}
            isChecked={isChecked}
          />
        </div>

        <HelpButton
          steps={[
            { emoji: "🔢", text: "ดูตัวเลขเริ่มต้นทางซ้าย" },
            { emoji: "➕", text: "กด + / − เพื่อปรับตัวเลข" },
            { emoji: "🖐️", text: "ลากบล็อคกลางไปวางในช่อง ?" },
            { emoji: "🔄", text: "ลากบล็อคในช่องออกเพื่อล้าง" },
            { emoji: "✅", text: "กดยืนยันเมื่อวางครบ" },
          ]}
        />

        {/* ===== INTRO OVERLAY (Level 1 only) ===== */}
        {showIntro && (
          <GameOverlay
            type="hint"
            message={
              <>
                ช่วยกันเติมตัวเลขในช่องว่างเลย!<br />ปรับตัวเลขแล้วลากไปวาง
              </>
            }
            subtitle="แตะเพื่อเริ่มเล่น"
            imageSrc="/images/P_Bobo/bobo-01.svg"
            imageAlt="Bobo"
            autoDismissMs={0}
            onDismiss={() => setShowIntro(false)}
          />
        )}

        {errorMsg && (
          <GameOverlay
            type="error"
            message={errorMsg}
            imageSrc="/images/P_Bobo/bobo-05.svg"
            imageAlt="Bobo"
            autoDismissMs={1500}
            onDismiss={() => setErrorMsg(null)}
          />
        )}

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

        {user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0 && <OutOfLivesModal />}

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes bounceIn {
            0%   { opacity: 0; transform: scale(0.5) translateY(20px); }
            60%  { transform: scale(1.05) translateY(-5px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* ── Virtual Drag Overlay ── */}
        <DragOverlay dropAnimation={null}>
          {activeDragId === "source" && (
            <div className="flex-1 w-[200px] h-16 rounded-2xl font-black text-2xl text-white flex items-center justify-center bg-sky-400 shadow-[0_5px_0_#2563EB] scale-[1.02] rotate-2 cursor-grabbing">
              {stepper}
            </div>
          )}
          {activeDragId?.startsWith("slot-block-") && (
            <div className="w-[72px] h-[52px] rounded-2xl font-black text-2xl text-white flex items-center justify-center bg-sky-500 shadow-[0_4px_0_#1D4ED8] scale-110 -rotate-3 cursor-grabbing">
              {slotValues[parseInt(activeDragId.split("-")[2], 10)]}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
