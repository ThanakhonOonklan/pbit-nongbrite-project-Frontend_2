"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

import { ColorCanvas } from "./ColorCanvas";
import { ReferenceGrid } from "./ReferenceGrid";
import { ColorPalette } from "./ColorPalette";
import { type GridColoringLevelConfig } from "@/constants/games/grid-based-coloring-levels";
import {
  calculateGameScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";

// DrawingMode ไม่มี eyedropper แล้ว
export type DrawingMode = "paint" | "fill" | "eraser";

// ── Memory time (seconds) per difficulty ─────────────────────
// easy: 0 = no memorize phase (reference always visible)
const getMemorizeTime = (difficulty: string) => {
  if (difficulty === "easy") return 0;
  if (difficulty === "normal") return 8;
  if (difficulty === "hard") return 15;
  return 10;
};

// ── Max peek count per difficulty ────────────────────────────
// easy: always visible (peek button hidden)
// normal: unlimited peeks (no penalty)
// hard: 3 peeks, 2nd+ penalised
const getMaxPeeks = (difficulty: string) => {
  if (difficulty === "hard") return 3;
  return 999; // unlimited for easy / normal
};

interface GridColoringGameProps {
  config: GridColoringLevelConfig;
  onGameEnd: (result: ScoreResult, wrongCount: number, elapsed: number) => void;
  startTime: number;
  isGameActive?: boolean;
}

export function GridColoringGame({
  config,
  onGameEnd,
  startTime,
  isGameActive = true,
}: GridColoringGameProps) {
  const { gridSize, palette, pattern } = config;

  // ── Canvas state ──────────────────────────────────────────
  const [canvas, setCanvas] = useState<(string | null)[][]>(
    () => Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(palette[0]);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("paint");
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: number; total: number } | null>(null);

  // ── Wrong-cell highlight state ────────────────────────────
  const [wrongCells, setWrongCells] = useState<{ row: number; col: number }[]>([]);
  const [showWrongFeedback, setShowWrongFeedback] = useState(false);

  // ── Undo / Redo history ───────────────────────────────────
  const [history, setHistory] = useState<(string | null)[][][]>(() => [
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null)),
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canvasRef = useRef(canvas);
  canvasRef.current = canvas;

  const handleDrawEnd = useCallback(() => {
    const currentSaved = history[historyIndex];
    if (JSON.stringify(canvasRef.current) !== JSON.stringify(currentSaved)) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(canvasRef.current);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);
    }
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCanvas(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCanvas(history[newIndex]);
    }
  }, [history, historyIndex]);

  // ── Memory / Peek mechanics ───────────────────────────────
  const initialTime = getMemorizeTime(config.difficulty);
  const maxPeeks = getMaxPeeks(config.difficulty);

  // easy → isMemorizing = false (never starts memorize phase)
  const [isMemorizing, setIsMemorizing] = useState(config.difficulty !== "easy");
  const [memorizeTimeLeft, setMemorizeTimeLeft] = useState(initialTime);
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekTimeLeft, setPeekTimeLeft] = useState(0);
  const [peekCount, setPeekCount] = useState(0);

  // ── Memorize countdown timer ──────────────────────────────
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && isMemorizing && memorizeTimeLeft > 0) {
      timer = setTimeout(() => setMemorizeTimeLeft((prev) => prev - 1), 1000);
    } else if (isGameActive && isMemorizing && memorizeTimeLeft === 0) {
      setIsMemorizing(false);
    }
    return () => clearTimeout(timer);
  }, [isGameActive, isMemorizing, memorizeTimeLeft]);

  // ── Peek countdown timer ──────────────────────────────────
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPeeking && peekTimeLeft > 0) {
      timer = setTimeout(() => setPeekTimeLeft((prev) => prev - 1), 1000);
    } else if (isPeeking && peekTimeLeft === 0) {
      setIsPeeking(false);
    }
    return () => clearTimeout(timer);
  }, [isPeeking, peekTimeLeft]);

  const handlePeek = useCallback(() => {
    if (isMemorizing || isPeeking || isCompleted || peekCount >= maxPeeks) return;
    setPeekCount((prev) => prev + 1);
    setIsPeeking(true);
    setPeekTimeLeft(3);
  }, [isMemorizing, isPeeking, isCompleted, peekCount, maxPeeks]);

  // ── Flood fill helper ─────────────────────────────────────
  const floodFill = useCallback(
    (
      grid: (string | null)[][],
      r: number,
      c: number,
      target: string | null,
      replacement: string | null
    ) => {
      if (target === replacement) return;
      if (grid[r][c] !== target) return;

      const queue: [number, number][] = [[r, c]];
      const newGrid = grid.map((row) => [...row]);

      while (queue.length > 0) {
        const [currR, currC] = queue.shift()!;
        if (newGrid[currR][currC] === target) {
          newGrid[currR][currC] = replacement;
          if (currR > 0) queue.push([currR - 1, currC]);
          if (currR < gridSize - 1) queue.push([currR + 1, currC]);
          if (currC > 0) queue.push([currR, currC - 1]);
          if (currC < gridSize - 1) queue.push([currR, currC + 1]);
        }
      }
      return newGrid;
    },
    [gridSize]
  );

  // ── Cell click (paint, fill, eraser) ─────────────────────
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;

      setFeedback(null);
      setCanvas((prev) => {
        if (drawingMode === "fill") {
          const newGrid = floodFill(prev, row, col, prev[row][col], selectedColor);
          return newGrid || prev;
        }
        const targetColor = drawingMode === "eraser" ? null : selectedColor;
        if (prev[row][col] === targetColor) return prev;
        const next = prev.map((r) => [...r]);
        next[row][col] = targetColor;
        return next;
      });
    },
    [selectedColor, drawingMode, isCompleted, isMemorizing, isPeeking, floodFill]
  );

  // ── Cell drag (paint / eraser only) ───────────────────────
  const handleCellDrag = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;
      if (drawingMode === "fill") return;

      setFeedback(null);
      setCanvas((prev) => {
        const targetColor = drawingMode === "eraser" ? null : selectedColor;
        if (prev[row][col] === targetColor) return prev;
        const next = prev.map((r) => [...r]);
        next[row][col] = targetColor;
        return next;
      });
    },
    [selectedColor, drawingMode, isCompleted, isMemorizing, isPeeking]
  );

  // ── Check work — wrong → highlight, don't end game ───────
  const handleCheck = useCallback(() => {
    if (isCompleted) return;

    let correctCount = 0;
    const totalCells = gridSize * gridSize;
    const newWrongCells: { row: number; col: number }[] = [];

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (pattern[r][c] === canvas[r][c]) {
          correctCount++;
        } else {
          newWrongCells.push({ row: r, col: c });
        }
      }
    }

    const accuracy = correctCount / totalCells;
    setFeedback({ correct: correctCount, total: totalCells });

    if (accuracy >= 0.95) {
      // ── WIN ──────────────────────────────────────────────
      setWrongCells([]);
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const peekPenalty =
        config.difficulty === "hard" ? Math.max(0, peekCount - 1) : 0;
      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount + peekPenalty,
        timeSeconds: elapsed,
      });
      const { stars } = getStarRating(scoreResult.totalScore);
      mockSubmitGameScore({
        levelId: config.level,
        score: scoreResult.totalScore,
        stars,
        playTime: elapsed,
      });
      setTimeout(() => {
        onGameEnd(scoreResult, wrongCount, elapsed);
      }, 800);
    } else {
      // ── WRONG — show highlights, DON'T end the game yet ──
      setWrongCells(newWrongCells);
      setWrongCount((prev) => prev + 1);
      setShowWrongFeedback(true);
    }
  }, [canvas, pattern, gridSize, isCompleted, wrongCount, config, onGameEnd, startTime, peekCount]);

  // ── Dismiss wrong-feedback overlay (keep highlights) ─────
  const handleDismissFeedback = useCallback(() => {
    setShowWrongFeedback(false);
  }, []);

  // ── Give up (manual end from wrong-feedback overlay) ─────
  const handleGiveUp = useCallback(() => {
    setShowWrongFeedback(false);
    setWrongCells([]);
    setIsCompleted(true);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const peekPenalty =
      config.difficulty === "hard" ? Math.max(0, peekCount - 1) : 0;
    const scoreResult = calculateGameScore({
      difficulty: config.difficulty,
      attempts: wrongCount + peekPenalty + 1,
      timeSeconds: elapsed,
    });
    setTimeout(() => {
      onGameEnd(scoreResult, wrongCount + 1, elapsed);
    }, 300);
  }, [startTime, peekCount, wrongCount, config, onGameEnd]);

  // ── Reset canvas ──────────────────────────────────────────
  const handleReset = useCallback(() => {
    const emptyCanvas = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(null)
    );
    setCanvas(emptyCanvas);
    setFeedback(null);
    setWrongCells([]);
    setShowWrongFeedback(false);
    setTimeout(() => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(emptyCanvas);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);
    }, 0);
  }, [gridSize, historyIndex]);

  // easy: always show reference | memorizing/peeking: show | else: hide
  const isReferenceHidden =
    config.difficulty !== "easy" && !isMemorizing && !isPeeking;

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      {/* ── Main: Reference + Canvas side-by-side ──────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch flex-1">

        {/* Reference grid */}
        <div className="flex-1 w-full lg:w-1/2 relative flex flex-col justify-center items-center">
          <ReferenceGrid
            gridSize={gridSize}
            pattern={pattern}
            isHidden={isReferenceHidden}
            onPeek={handlePeek}
            peekCount={peekCount}
            maxPeeks={maxPeeks}
            isMemorizing={isGameActive && isMemorizing}
            timeLeft={
              isGameActive && isMemorizing
                ? memorizeTimeLeft
                : isPeeking
                ? peekTimeLeft
                : 0
            }
            isPeeking={isPeeking}
            showPeekButton={config.difficulty !== "easy" && !isMemorizing}
          />
        </div>

        {/* Drawing side */}
        <div className="flex-1 w-full lg:w-1/2 relative flex flex-col gap-4">

          {/* Canvas */}
          <div className="flex-1 relative flex flex-col">
            <ColorCanvas
              gridSize={gridSize}
              canvas={canvas}
              selectedColor={drawingMode === "eraser" ? null : selectedColor}
              disabled={isCompleted || isMemorizing || isPeeking}
              onCellClick={handleCellClick}
              onCellDrag={handleCellDrag}
              drawingMode={drawingMode}
              onDrawEnd={handleDrawEnd}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              wrongCells={wrongCells}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom: Palette + Tools ───────────────────────── */}
      <div className="rounded-2xl p-3 sm:p-4 bg-[#1C2B32] border border-white/10 shadow-xl shrink-0 mx-auto w-full max-w-4xl flex items-center justify-center">
        <ColorPalette
          palette={palette}
          selectedColor={selectedColor}
          onSelectColor={(color) => {
            setSelectedColor(color);
            setDrawingMode("paint");
          }}
          drawingMode={drawingMode}
          onSelectMode={setDrawingMode}
          onCheckAnswer={handleCheck}
          onReset={handleReset}
        />
      </div>

      {/* Wrong-feedback overlay */}
      {showWrongFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div
            className="bg-[#1C2B32] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-w-sm w-full"
            style={{ animation: "wrongModalIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
          >
            <div className="text-5xl mb-3">😅</div>
            <p className="font-extrabold text-white text-xl mb-2">ยังมีบางช่องผิดอยู่!</p>
            <p className="text-sm text-white/60 mb-4">
              แก้ช่องที่มีขอบ{" "}
              <span className="text-red-400 font-bold">สีแดง</span>{" "}
              ให้ถูกต้อง แล้วกดส่งใหม่อีกครั้งนะ 😊
            </p>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2 mb-6">
              <span className="text-xl">❌</span>
              <span className="text-base font-extrabold text-red-400">
                ผิด {wrongCells.length} ช่อง
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleDismissFeedback}
                className="w-full px-6 py-3 bg-[#AACE30] hover:bg-[#8BB422] active:scale-95 text-white font-extrabold rounded-2xl transition-all shadow-md text-base"
              >
                🖌️ กลับไปแก้ไข
              </button>
              <button
                onClick={handleGiveUp}
                className="w-full px-6 py-2.5 bg-white/5 hover:bg-white/10 active:scale-95 text-white/40 font-bold rounded-2xl transition-all text-sm"
              >
                ยอมแพ้ครั้งนี้
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes wrongModalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
