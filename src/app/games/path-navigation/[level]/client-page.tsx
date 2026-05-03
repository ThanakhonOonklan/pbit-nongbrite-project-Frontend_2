"use client";

import { use, useState, useCallback, useRef, useEffect, useLayoutEffect, useId } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";

import { FaPlay, FaUndo } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";
import { Container } from "@/components/common";
import {
  DirectionControls,
  CommandSequence,
  PathMap,
  IceBackground,
} from "@/components/games/path-navigation";
import { HelpButton } from "@/components/games/HelpButton";
import {
  PATH_PATTERN_SETS,
  type PathNavLevelConfig,
  type Direction,
  type PathTile,
} from "@/constants/games/path-navigation-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { pathNavigationTutorialSteps } from "@/components/games/tutorials";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { GameHeader } from "@/components/games/GameHeader";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── helpers ────────────────────────────────────────────────

function move(row: number, col: number, dir: Direction): PathTile {
  switch (dir) {
    case "up": return { row: row - 1, col };
    case "down": return { row: row + 1, col };
    case "left": return { row, col: col - 1 };
    case "right": return { row, col: col + 1 };
  }
}

function samePos(a: PathTile, b: PathTile) {
  return a.row === b.row && a.col === b.col;
}

export default function PathNavigationClientPage({
  level,
  initialPatternIndex,
}: {
  level: string;
  initialPatternIndex: number;
}) {
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();

  const dndId = useId();

  // ── random pattern config ──────────────────────────────
  const [initialState] = useState(() => {
    const patternSet = PATH_PATTERN_SETS[levelNum as keyof typeof PATH_PATTERN_SETS];
    if (!patternSet || patternSet.length === 0) return null;

    // Passed from Server Component, so it's consistent between server and client!
    const pickedIdx = Math.min(initialPatternIndex, patternSet.length - 1);

    return {
      config: patternSet[pickedIdx],
      patternIndex: pickedIdx,
      playerPos: patternSet[pickedIdx].startPos ?? { row: 0, col: 0 }
    };
  });

  const [config, setConfig] = useState<PathNavLevelConfig | null>(initialState?.config ?? null);
  const [patternIndex, setPatternIndex] = useState(initialState?.patternIndex ?? 0);

  const pickPattern = useCallback(() => {
    const patternSet = PATH_PATTERN_SETS[levelNum as keyof typeof PATH_PATTERN_SETS];
    if (!patternSet || patternSet.length === 0) { setConfig(null); return; }
    const pickedIdx = Math.floor(Math.random() * patternSet.length);
    const picked = patternSet[pickedIdx];
    setConfig(picked);
    setPatternIndex(pickedIdx);
    setPlayerPos(picked.startPos ?? { row: 0, col: 0 });
    setHasNongBrite(false);
    setCommands([]);
  }, [levelNum]);

  // ── game state ─────────────────────────────────────────
  const [commands, setCommands] = useState<Direction[]>([]);
  const [playerPos, setPlayerPos] = useState<PathTile>(initialState?.playerPos ?? { row: 0, col: 0 });
  const [hasNongBrite, setHasNongBrite] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [maxCommands, setMaxCommands] = useState(9); // updated dynamically by CommandSequence
  const [playerFailType, setPlayerFailType] = useState<"none" | "fall" | "stumble">("none");
  const [playerFallDir, setPlayerFallDir] = useState<Direction | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const activeStartPos = config?.startPos ?? { row: 0, col: 0 };
  const activeNongBritePos = config?.nongBritePos ?? { row: 0, col: 0 };
  const activeBlockedTiles = config?.blockedTiles ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 10 } })
  );

  const startTimeRef = useRef<number>(0);
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── init: startTime + cleanup on unmount ───────────
  useEffect(() => {
    startTimeRef.current = Date.now();
    return () => { animTimers.current.forEach(clearTimeout); };
  }, []);  // intentionally run once on mount



  // ── auto-dismiss overlays ─────────────────────────────
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 1500);
    return () => clearTimeout(t);
  }, [errorMsg]);

  useEffect(() => {
    if (!hintMsg) return;
    const t = setTimeout(() => setHintMsg(null), 1800);
    return () => clearTimeout(t);
  }, [hintMsg]);


  // ── command handlers ───────────────────────────────────

  const handleAddCommand = useCallback(
    (direction: Direction) => {
      if (!config || isRunning) return;
      setCommands((prev) => {
        if (prev.length >= maxCommands) return prev; // block when box is full
        return [...prev, direction];
      });
      setErrorMsg(null);
    },
    [config, isRunning, maxCommands]
  );

  const handleRemoveCommand = useCallback(
    (index: number) => {
      if (isRunning) return;
      setCommands((prev) => prev.filter((_, i) => i !== index));
    },
    [isRunning]
  );

  const handleClearAll = useCallback(() => {
    if (isRunning) return;
    setCommands([]);
    setErrorMsg(null);
  }, [isRunning]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragId(null);
      const { active, over } = event;
      if (!over || over.id !== "command-sequence") return;

      const activeIdStr = active.id as string;
      if (activeIdStr.startsWith("dir-")) {
        const dir = activeIdStr.replace("dir-", "") as Direction;
        handleAddCommand(dir);
      }
    },
    [handleAddCommand]
  );

  // ── RUN: sequential chain — stops immediately on collision ──────────────

  const handleRun = useCallback(() => {
    if (!config || isRunning || commands.length === 0) return;
    const cfg = config;

    setIsRunning(true);
    setErrorMsg(null);
    setPlayerFailType("none");
    setPlayerFallDir(null);
    setAttempts((prev) => prev + 1);
    setPlayerPos(activeStartPos);
    setHasNongBrite(false);

    const STEP_MS = 350;
    const attemptsNow = attempts + 1;
    let pos = { ...activeStartPos };
    let pickedUp = false;

    // Trigger fail animation then cleanup after 700 ms
    const triggerFail = (type: "fall" | "stumble", oobPos?: PathTile) => {
      reduceLife();
      if (type === "fall" && oobPos) setPlayerPos(oobPos);
      setPlayerFailType(type);
      const t = setTimeout(() => {
        setIsRunning(false);
        setActiveStep(null);
        setPlayerFailType("none");
        setPlayerFallDir(null);
        setPlayerPos(activeStartPos);
        setHasNongBrite(false);
        setErrorMsg("ลองอีกครั้ง");
      }, 700);
      animTimers.current.push(t);
    };

    const runStep = (idx: number) => {
      setActiveStep(idx);
      const cmd = commands[idx];
      const next = move(pos.row, pos.col, cmd);

      // Out-of-bounds → fall off edge
      const inBounds =
        next.row >= 0 && next.row < cfg.gridRows &&
        next.col >= 0 && next.col < cfg.gridCols;
      if (!inBounds) {
        setPlayerFallDir(cmd);
        triggerFail("fall", next);
        return;
      }

      // Blocked tile → stumble
      const hitRock = activeBlockedTiles.some(
        t => t.row === next.row && t.col === next.col
      );
      if (hitRock) {
        triggerFail("stumble");
        return;
      }

      // Valid move
      pos = next;
      setPlayerPos(next);

      if (samePos(next, activeNongBritePos) && !pickedUp) {
        pickedUp = true;
        setHasNongBrite(true);
      }

      // Last step
      if (idx === commands.length - 1) {
        const finishTimer = setTimeout(() => {
          setIsRunning(false);
          setActiveStep(null);

          if (samePos(next, cfg.homePos) && pickedUp) {
            // WIN!
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setElapsedSeconds(elapsed);
            const result = calculateGameScore({
              difficulty: cfg.difficulty,
              attempts: attemptsNow,
              timeSeconds: elapsed,
            });
            setScoreResult(result);
            const { stars } = getStarRating(result.totalScore);

            const submitScore = async () => {
              try {
                const absoluteLevelId = getAbsoluteLevelId('path-navigation', levelNum);
                await gameService.submitScore({
                  levelId: absoluteLevelId,
                  score: result.totalScore,
                  stars,
                  playTime: elapsed
                });
              } catch (error) {
                console.error("Failed to submit game score", error);
              }
            };
            submitScore();

          } else if (samePos(next, cfg.homePos) && !pickedUp) {
            const ht = setTimeout(() => {
              setHintMsg("อย่าทิ้งน้องง");
              const rt = setTimeout(() => { setPlayerPos(activeStartPos); setHasNongBrite(false); }, 1600);
              animTimers.current.push(rt);
            }, 300);
            animTimers.current.push(ht);
          } else {
            // Ran out of commands without reaching home
            reduceLife();
            const t = setTimeout(() => {
              setErrorMsg("ลองอีกครั้ง");
              const rt = setTimeout(() => { setPlayerPos(activeStartPos); setHasNongBrite(false); }, 1200);
              animTimers.current.push(rt);
            }, 500);
            animTimers.current.push(t);
          }
        }, STEP_MS);
        animTimers.current.push(finishTimer);
        return;
      }

      // Schedule next step
      const t = setTimeout(() => runStep(idx + 1), STEP_MS);
      animTimers.current.push(t);
    };

    const first = setTimeout(() => runStep(0), STEP_MS);
    animTimers.current.push(first);
  }, [config, isRunning, commands, attempts, levelNum, reduceLife, activeStartPos, activeNongBritePos, activeBlockedTiles]);

  // ── RESET ──────────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (!config) return;
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
    setCommands([]);
    setPlayerPos(activeStartPos);
    setHasNongBrite(false);
    setIsRunning(false);
    setErrorMsg(null);
    setPlayerFailType("none");
    setPlayerFallDir(null);
  }, [config, activeStartPos]);

  // ── RETRY ──────────────────────────────────────────────

  const handleRetry = useCallback(() => {
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
    setIsRunning(false);
    setActiveStep(null);
    setPlayerFailType("none");
    setPlayerFallDir(null);
    setErrorMsg(null);
    setAttempts(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
    pickPattern();
  }, [pickPattern]);

  // ── Fallback ───────────────────────────────────────────

  if (!config) {
    const isInvalid = !PATH_PATTERN_SETS[levelNum];
    if (isInvalid) {
      return (
        <div className="flex h-screen items-center justify-center bg-[#131F24]">
          <div className="flex flex-col items-center text-center gap-4">
            <Image src="/images/P_Bit/bit-03.svg" alt="Bit" width={110} height={110} className="object-contain drop-shadow-lg" />
            <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
            <button
              onClick={() => router.push("/courses")}
              className="mt-2 px-6 py-2 bg-[#1CB0F6] text-white rounded-xl font-bold hover:bg-[#0e9fd8] transition-colors"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      );
    }
    // Prevent flash of loading UI before useEffect runs
    return <div className="min-h-screen bg-[#131F24]" />;
  }

  // ── RENDER ─────────────────────────────────────────────

  // Virtual overlay render logic
  let overlayIconSrc = "";
  if (activeDragId?.startsWith("dir-")) {
    const d = activeDragId.replace("dir-", "");
    if (d === "up") overlayIconSrc = "/icons/Arrow/ArrowUp.svg";
    if (d === "down") overlayIconSrc = "/icons/Arrow/ArrowDown.svg";
    if (d === "left") overlayIconSrc = "/icons/Arrow/ArrowLeft.svg";
    if (d === "right") overlayIconSrc = "/icons/Arrow/ArrowRight.svg";
  }

  return (
    <>
      <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveDragId(null)}>
        <div
          className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto relative  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/Background/PathnavigationBackground.png')" }}
        >
          {/* ===== TOP HEADER ===== */}
          <div className="relative z-50 w-full">
            <GameHeader
              level={level}
              gameTitle="Path Navigation"
              characterSrc="/images/P_Bit/bit-01.svg"
              bgColor="#1CB0F6"
            />
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="flex flex-col lg:flex-row flex-1 gap-4 px-4 pb-4 relative z-10 lg:overflow-hidden lg:min-h-0">
            {/* ===== TOP/LEFT PANEL: Path Map ===== */}
            <Container className="lg:flex-[6] flex flex-col items-center justify-center p-2 lg:p-6 min-h-[260px] lg:min-h-0 lg:overflow-hidden" style={{ background: "rgba(13,27,42,0.7)", boxShadow: "none", border: "1px solid rgba(91,200,245,0.2)", backdropFilter: "blur(4px)" }}>
              <p className="hidden lg:block text-lg font-bold text-[#F1F7FB] mb-6">
                LEVEL {config.level} - {config.difficulty === "easy" ? "ง่าย" : config.difficulty === "normal" ? "ปานกลาง" : "ยาก"}
              </p>

              <div className="flex-1 w-full h-full">
                <PathMap
                  gridCols={config.gridCols}
                  gridRows={config.gridRows}
                  playerPos={playerPos}
                  nongBritePos={activeNongBritePos}
                  homePos={config.homePos}
                  blockedTiles={activeBlockedTiles}
                  hasNongBrite={hasNongBrite}
                  failType={playerFailType}
                  fallDir={playerFallDir}
                  isRunning={isRunning}
                />
              </div>
            </Container>

            {/* ===== BOTTOM/RIGHT PANEL: Controls ===== */}
            <Container className="lg:flex-[4] flex flex-col p-5 pb-20 lg:pb-5" style={{ background: "rgba(13,27,42,0.7)", boxShadow: "none", border: "1px solid rgba(91,200,245,0.2)", backdropFilter: "blur(4px)" }}>
              {/* Command Sequence */}
              <div className="flex-1 mb-5">
                <CommandSequence
                  commands={commands}
                  onRemoveCommand={handleRemoveCommand}
                  onClearAll={handleClearAll}
                  onRun={handleRun}
                  onAddCommand={handleAddCommand}
                  activeCommandIndex={activeStep}
                  disabled={isRunning}
                  onMaxCommandsChange={setMaxCommands}
                />
              </div>

              {/* Direction Controls */}
              <div className="mb-6">
                <DirectionControls
                  onAddCommand={handleAddCommand}
                  disabled={isRunning}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <div className="flex-[2]">
                  <TiltButton
                    width="100%"
                    height={56}
                    elevation={6}
                    pressInset={6}
                    tilt={0.5}
                    radius={14}
                    motion={60}
                    surfaceColor="#2196F3"
                    sideColor="#1565C0"
                    textColor="#ffffff"
                    borderColor="transparent"
                    borderWidth={0}
                    glareOpacity={0}
                    glareWidth={0}
                    disabled={commands.length === 0 || isRunning}
                    onClick={handleRun}
                  >
                    <span className="flex items-center gap-2 font-bold text-base">
                      <FaPlay className="w-4 h-4" /> ยืนยัน!
                    </span>
                  </TiltButton>
                </div>
                <div className="flex-1">
                  <TiltButton
                    width="100%"
                    height={56}
                    elevation={6}
                    pressInset={6}
                    tilt={0.5}
                    radius={14}
                    motion={60}
                    surfaceColor="#ffffff"
                    sideColor="#D1D5DB"
                    textColor="#131F24"
                    borderColor="transparent"
                    borderWidth={0}
                    glareOpacity={0}
                    glareWidth={0}
                    onClick={handleReset}
                    disabled={isRunning}
                  >
                    <span className="flex items-center gap-2 font-bold text-base">
                      <FaUndo className="w-4 h-4" /> เริ่มใหม่
                    </span>
                  </TiltButton>
                </div>
              </div>
            </Container>
          </div>

          <HelpButton
            steps={[
              { emoji: "👆", text: "กดปุ่มลูกศร เพื่อสั่งให้เดิน" },
              { emoji: "💙", text: "ไปรับน้องไบร์ท" },
              { emoji: "🏠", text: "พาน้องกลับบ้าน" },
              { emoji: "▶️", text: "กด Run เพื่อเริ่ม!" },
            ]}
          />

          {/* ===== DRAG OVERLAY ===== */}
          <DragOverlay dropAnimation={null}>
            {activeDragId?.startsWith("dir-") && overlayIconSrc && (
              <div className="w-[60px] h-[60px] lg:w-[77px] lg:h-[77px] rounded-2xl bg-[#1491ff] border-[3px] border-[#43a7ff] flex items-center justify-center shadow-[0_8px_0_#1587bd] scale-105 rotate-2 cursor-grabbing pointer-events-none">
                <img src={overlayIconSrc} alt="Dragging" className="w-6 h-6 lg:w-7 lg:h-7 pointer-events-none" />
              </div>
            )}
          </DragOverlay>

        </div>
      </DndContext>

      {/* ===== INTRO TUTORIAL (Level 1 only) ===== */}
      {showIntro && (
        <TutorialModal
          steps={pathNavigationTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Bit/bit-01.svg"
          accentColor="#1E3A5F"
        />
      )}

      {/* ===== WRONG MOVE OVERLAY ===== */}
      {errorMsg && (
        <GameOverlay
          type="error"
          message="ลองอีกครั้ง"
          imageSrc="/images/P_Bit/bit-02.svg"
          imageAlt="Bit"
          autoDismissMs={1500}
          onDismiss={() => setErrorMsg(null)}
        />
      )}

      {/* ===== HOME WITHOUT NONG-BRITE HINT OVERLAY ===== */}
      {hintMsg && (
        <GameOverlay
          type="hint"
          message={hintMsg}
          imageSrc="/images/Nong_brite/nong-brite-02.svg"
          imageAlt="Nong Brite"
          autoDismissMs={1800}
          onDismiss={() => setHintMsg(null)}
        />
      )}

      {/* ===== OUT OF LIVES MODAL ===== */}
      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}

      {/* ===== WIN MODAL ===== */}
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={attempts}
          timeSeconds={elapsedSeconds}
          onRetry={handleRetry}
        />
      )}

    </>
  );
}
