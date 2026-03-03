"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaArrowLeft, FaPlay, FaUndo } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";
import { Container } from "@/components/common";
import {
  DirectionControls,
  CommandSequence,
  PathMap,
  HelpButton,
} from "@/components/games/path-navigation";
import {
  pathNavLevels,
  type Direction,
  type PathTile,
} from "@/constants/games/path-navigation-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";

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

export default function PathNavigationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

  const config = pathNavLevels[levelNum];

  // ── game state ─────────────────────────────────────────
  const [commands, setCommands] = useState<Direction[]>([]);
  const [playerPos, setPlayerPos] = useState<PathTile>(config?.startPos ?? { row: 0, col: 0 });
  const [hasNongBrite, setHasNongBrite] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(levelNum === 1);

  const startTimeRef = useRef<number>(Date.now());
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── cleanup on unmount ─────────────────────────────────
  useEffect(() => {
    return () => { animTimers.current.forEach(clearTimeout); };
  }, []);

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

  // ── walkable tile lookup ───────────────────────────────
  const isWalkable = useCallback((tile: PathTile) => {
    if (!config) return false;
    return config.walkableTiles.some(t => t.row === tile.row && t.col === tile.col);
  }, [config]);

  // ── command handlers ───────────────────────────────────

  const handleAddCommand = useCallback(
    (direction: Direction) => {
      if (!config || isRunning) return;
      setCommands((prev) => [...prev, direction]);
      setErrorMsg(null);
    },
    [config, isRunning]
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

  // ── RUN: animate step by step ──────────────────────────

  const handleRun = useCallback(() => {
    if (!config || isRunning || commands.length === 0) return;

    setIsRunning(true);
    setErrorMsg(null);
    setAttempts((prev) => prev + 1);

    let currentPos = { ...config.startPos };
    let pickedUp = false;

    // Reset player to start
    setPlayerPos(config.startPos);
    setHasNongBrite(false);

    const STEP_MS = 350;
    const OVERLAY_DELAY = 500;
    let failed = false;

    const showFailOverlay = () => {
      const overlayTimer = setTimeout(() => {
        setErrorMsg("ลองอีกครั้ง");
        const resetTimer = setTimeout(() => {
          if (!samePos(currentPos, config.homePos)) {
            setPlayerPos(config.startPos);
            setHasNongBrite(false);
          }
        }, 1200);
        animTimers.current.push(resetTimer);
      }, OVERLAY_DELAY);
      animTimers.current.push(overlayTimer);
    };

    commands.forEach((cmd, stepIdx) => {
      const timer = setTimeout(() => {
        setActiveStep(stepIdx);

        if (failed) {
          if (stepIdx === commands.length - 1) {
            setIsRunning(false);
            setActiveStep(null);
            showFailOverlay();
          }
          return;
        }

        const next = move(currentPos.row, currentPos.col, cmd);

        if (!isWalkable(next)) {
          failed = true;
          if (stepIdx === commands.length - 1) {
            setIsRunning(false);
            setActiveStep(null);
            showFailOverlay();
          }
          return;
        }

        // Valid move
        currentPos = next;
        setPlayerPos(next);

        // Pick up Nong-Brite
        if (samePos(next, config.nongBritePos) && !pickedUp) {
          pickedUp = true;
          setHasNongBrite(true);
        }

        // Last command
        if (stepIdx === commands.length - 1) {
          setIsRunning(false);
          setActiveStep(null);

          if (samePos(next, config.homePos) && pickedUp) {
            // WIN!
            const elapsed = Math.floor(
              (Date.now() - startTimeRef.current) / 1000
            );
            setElapsedSeconds(elapsed);
            const result = calculateGameScore({
              difficulty: config.difficulty,
              attempts: attempts + 1,
              timeSeconds: elapsed,
            });
            setScoreResult(result);
            // Submit score to API (mock)
            const { stars } = getStarRating(result.totalScore);
            mockSubmitGameScore({
              levelId: levelNum,
              score: result.totalScore,
              stars,
              playTime: elapsed,
            });
          } else if (samePos(next, config.homePos) && !pickedUp) {
            // Reached home but forgot Nong-Brite
            const hintTimer = setTimeout(() => {
              setHintMsg("อย่าทิ้งน้องง");
              const resetTimer = setTimeout(() => {
                setPlayerPos(config.startPos);
                setHasNongBrite(false);
              }, 1600);
              animTimers.current.push(resetTimer);
            }, 300);
            animTimers.current.push(hintTimer);
          } else {
            showFailOverlay();
          }
        }
      }, (stepIdx + 1) * STEP_MS);

      animTimers.current.push(timer);
    });
  }, [config, isRunning, commands, isWalkable, attempts]);

  // ── RESET ──────────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (!config) return;
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];
    setCommands([]);
    setPlayerPos(config.startPos);
    setHasNongBrite(false);
    setIsRunning(false);
    setErrorMsg(null);
  }, [config]);

  // ── RETRY ──────────────────────────────────────────────

  const handleRetry = useCallback(() => {
    handleReset();
    setAttempts(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
  }, [handleReset]);

  // ── Fallback ───────────────────────────────────────────

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-end justify-center gap-2">

            <Image
              src="/images/P_Bit/bit-03.svg"
              alt="Bit"
              width={110}
              height={110}
              className="object-contain"
            />
          </div>
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

  // ── RENDER ─────────────────────────────────────────────

  return (
    <div
      className="flex flex-col bg-[#131F24] overflow-hidden"
      style={{ zoom: 1.1, height: `${100 / 1.1}vh` }}
    >
      {/* ===== TOP HEADER ===== */}
      <header className="flex items-center px-6 py-4 shrink-0">
        <button
          onClick={() => router.push("/courses")}
          className="flex items-center gap-2 text-sm font-semibold text-[#F1F7FB] hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Courses</span>
        </button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 gap-4 px-4 pb-4 overflow-hidden relative">
        {/* ===== LEFT PANEL: Path Map (60%) ===== */}
        <Container className="flex-[6] flex flex-col items-center justify-center p-6 overflow-auto !bg-[#131F24]">
          <p className="text-lg font-bold text-[#F1F7FB] mb-6">
            LEVEL {config.level} - {config.difficulty === "easy" ? "ง่าย" : config.difficulty === "normal" ? "ปานกลาง" : "ยาก"}
          </p>

          <PathMap
            walkableTiles={config.walkableTiles}
            gridCols={config.gridCols}
            gridRows={config.gridRows}
            playerPos={playerPos}
            nongBritePos={config.nongBritePos}
            homePos={config.homePos}
            hasNongBrite={hasNongBrite}
          />
        </Container>

        {/* ===== RIGHT PANEL: Controls (40%) ===== */}
        <Container className="flex-[4] flex flex-col p-5 !bg-[#131F24]">
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
                surfaceColor="#4CAF50"
                sideColor="#388E3C"
                textColor="#ffffff"
                borderColor="transparent"
                borderWidth={0}
                glareOpacity={0}
                glareWidth={0}
                disabled={commands.length === 0 || isRunning}
                onClick={handleRun}
              >
                <span className="flex items-center gap-2 font-bold text-base">
                  <FaPlay className="w-4 h-4" /> Run
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
                  <FaUndo className="w-4 h-4" /> Reset
                </span>
              </TiltButton>
            </div>
          </div>
        </Container>
      </div>

      <HelpButton />

      {/* ===== INTRO OVERLAY (Level 1 only) ===== */}
      {showIntro && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setShowIntro(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <Image
            src="/images/Nong_brite/nong-brite-02.svg"
            alt="Nong Brite"
            width={150}
            height={150}
            className="object-contain mb-5"
          />
          <p className="text-white text-2xl font-extrabold text-center leading-relaxed">
            น้องไบร์ทกำลังหลงทาง<br />ช่วยน้องกลับบ้านกันเถอะ!
          </p>
          <p className="text-white/60 text-sm mt-4">แตะเพื่อเริ่มเล่น</p>
        </div>
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
