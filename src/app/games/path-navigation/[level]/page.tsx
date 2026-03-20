"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaArrowLeft, FaPlay, FaUndo, FaRoute } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";
import { Container } from "@/components/common";
import {
  DirectionControls,
  CommandSequence,
  PathMap,
} from "@/components/games/path-navigation";
import { HelpButton } from "@/components/games/HelpButton";
import {
  pathNavLevels,
  type Direction,
  type PathTile,
} from "@/constants/games/path-navigation-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { GameResultModal } from "@/components/games/GameResultModal";
import { GameOverlay } from "@/components/games/GameOverlay";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { GameHeader } from "@/components/games/GameHeader";

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
    const inBounds =
      tile.row >= 0 && tile.row < config.gridRows &&
      tile.col >= 0 && tile.col < config.gridCols;
    const notBlocked = !config.blockedTiles.some(
      t => t.row === tile.row && t.col === tile.col
    );
    return inBounds && notBlocked;
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
            const absoluteLevelId = getAbsoluteLevelId("path-navigation", levelNum);
            gameService.submitScore({
              levelId: absoluteLevelId,
              score: result.totalScore,
              stars,
              playTime: elapsed,
            }).catch(err => console.error("Failed to submit score", err));
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

  // ── RENDER ─────────────────────────────────────────────

  return (
    <div
      className="flex flex-col bg-[#131F24] min-h-screen lg:h-screen lg:overflow-hidden overflow-y-auto"
    >
      {/* ===== TOP HEADER ===== */}
      <GameHeader
        level={level}
        gameTitle="Path Navigation"
        characterSrc="/images/P_Bit/bit-01.svg"
      />

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col lg:flex-row flex-1 gap-4 px-4 pb-4 relative lg:overflow-hidden lg:min-h-0">
        {/* ===== TOP/LEFT PANEL: Path Map ===== */}
        <Container className="lg:flex-[6] flex flex-col items-center justify-center p-6 min-h-[260px] lg:min-h-0 lg:overflow-hidden !bg-[#131F24]" style={{ boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-lg font-bold text-[#F1F7FB] mb-6">
            LEVEL {config.level} - {config.difficulty === "easy" ? "ง่าย" : config.difficulty === "normal" ? "ปานกลาง" : "ยาก"}
          </p>

          <div className="flex-1 w-full h-full">
            <PathMap
              gridCols={config.gridCols}
              gridRows={config.gridRows}
              playerPos={playerPos}
              nongBritePos={config.nongBritePos}
              homePos={config.homePos}
              blockedTiles={config.blockedTiles}
              hasNongBrite={hasNongBrite}
            />
          </div>
        </Container>

        {/* ===== BOTTOM/RIGHT PANEL: Controls ===== */}
        <Container className="lg:flex-[4] flex flex-col p-5 pb-20 lg:pb-5 !bg-[#131F24]" style={{ boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
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

      <HelpButton
        steps={[
          { emoji: "👆", text: "กดปุ่มลูกศร เพื่อสั่งให้เดิน" },
          { emoji: "💙", text: "ไปรับน้องไบร์ท" },
          { emoji: "🏠", text: "พาน้องกลับบ้าน" },
          { emoji: "▶️", text: "กด Run เพื่อเริ่ม!" },
        ]}
      />

      {/* ===== INTRO OVERLAY (Level 1 only) ===== */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              น้องไบร์ทกำลังหลงทาง<br />ช่วยน้องกลับบ้านกันเถอะ!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Bit/bit-01.svg"
          imageAlt="Nong Brite"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
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


    </div>
  );
}
