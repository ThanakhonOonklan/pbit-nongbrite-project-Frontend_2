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
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";

export type DrawingMode = "paint" | "fill" | "eyedropper" | "eraser";

import { FaRedo, FaCheck } from "react-icons/fa";

const getMemorizeTime = (difficulty: string) => {
  if (difficulty === "easy") return 5;
  if (difficulty === "normal") return 10;
  if (difficulty === "hard") return 15;
  return 10;
};

interface GridColoringGameProps {
  config: GridColoringLevelConfig;
  onGameEnd: (result: ScoreResult, wrongCount: number, elapsed: number) => void;
  startTime: number;
  isGameActive?: boolean;
}

export function GridColoringGame({ config, onGameEnd, startTime, isGameActive = true }: GridColoringGameProps) {
  const { reduceLife } = useUserStore();
  const { gridSize, palette, pattern } = config;

  // ── State ─────────────────────────────────────────────────
  const [canvas, setCanvas] = useState<(string | null)[][]>(
    () => Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(palette[0]);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("paint");
  const [clickCount, setClickCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: number; total: number } | null>(null);

  // ── New Features State ────────────────────────────────────
  // ── New Features State ────────────────────────────────────
  const [history, setHistory] = useState<(string | null)[][][]>(() => [
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
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

  // ── Memory Mechanics State ──────────────────────────────
  const initialTime = getMemorizeTime(config.difficulty);
  const [isMemorizing, setIsMemorizing] = useState(true);
  const [memorizeTimeLeft, setMemorizeTimeLeft] = useState(initialTime);
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekTimeLeft, setPeekTimeLeft] = useState(0);
  const [peekCount, setPeekCount] = useState(0);
  const maxPeeks = 3;

  // ── Timers ────────────────────────────────────────────────
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && isMemorizing && memorizeTimeLeft > 0) {
      timer = setTimeout(() => setMemorizeTimeLeft((prev) => prev - 1), 1000);
    } else if (isGameActive && isMemorizing && memorizeTimeLeft === 0) {
      setIsMemorizing(false);
    }
    return () => clearTimeout(timer);
  }, [isGameActive, isMemorizing, memorizeTimeLeft]);

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
    setPeekTimeLeft(3); // 3 seconds per peek
  }, [isMemorizing, isPeeking, isCompleted, peekCount]);

  // ── Count painted cells ──────────────────────────────────
  const paintedCount = useMemo(() => {
    let count = 0;
    for (const row of canvas) {
      for (const cell of row) {
        if (cell !== null) count++;
      }
    }
    return count;
  }, [canvas]);

  // ── Helper: Flood Fill ────────────────────────────────────
  const floodFill = useCallback(
    (grid: (string | null)[][], r: number, c: number, target: string | null, replacement: string | null) => {
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

  // ── Cell click handler (toggle) ─────────────────────────
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;

      if (drawingMode === "eyedropper") {
        const color = canvas[row][col];
        if (color) {
          setSelectedColor(color);
          setDrawingMode("paint");
        }
        return;
      }

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
      setClickCount((prev) => prev + 1);
    },
    [canvas, selectedColor, drawingMode, isCompleted, isMemorizing, isPeeking, floodFill]
  );

  // ── Cell drag handler (always paint, no toggle) ────────
  const handleCellDrag = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;
      if (drawingMode === "fill" || drawingMode === "eyedropper") return; // Drag doesn't work for fill/eyedropper

      setFeedback(null);
      setCanvas((prev) => {
        const targetColor = drawingMode === "eraser" ? null : selectedColor;
        if (prev[row][col] === targetColor) return prev;

        const next = prev.map((r) => [...r]);
        next[row][col] = targetColor;
        return next;
      });
      setClickCount((prev) => prev + 1);
    },
    [selectedColor, drawingMode, isCompleted, isMemorizing, isPeeking]
  );

  // ── Check work ───────────────────────────────────────────
  const handleCheck = useCallback(() => {
    if (isCompleted) return;

    let correctCount = 0;
    const totalCells = gridSize * gridSize;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (pattern[r][c] === canvas[r][c]) correctCount++;
      }
    }

    const accuracy = correctCount / totalCells;
    setFeedback({ correct: correctCount, total: totalCells });

    if (accuracy >= 0.95) {
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      // Penalty for 2nd and 3rd peeks
      const peekPenalty = Math.max(0, peekCount - 1); // 1st peek free, 2nd is +1 wrong, 3rd is +2 wrong

      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount + peekPenalty,
        timeSeconds: elapsed,
      });

      const { stars } = getStarRating(scoreResult.totalScore);
      const absoluteLevelId = getAbsoluteLevelId("grid-based-coloring", config.level);
      gameService.submitScore({
        levelId: absoluteLevelId,
        score: scoreResult.totalScore,
        stars,
        playTime: elapsed,
      }).catch(err => console.error("Failed to submit score", err));

      setTimeout(() => {
        onGameEnd(scoreResult, wrongCount, elapsed);
      }, 800);
    } else {
      setWrongCount((prev) => prev + 1);
      reduceLife();

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const peekPenalty = Math.max(0, peekCount - 1);

      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount + peekPenalty + 1, // Add current wrong check
        timeSeconds: elapsed,
      });

      setIsCompleted(true);
      setTimeout(() => {
        onGameEnd(scoreResult, wrongCount + 1, elapsed);
      }, 300);
    }
  }, [canvas, pattern, gridSize, isCompleted, wrongCount, config, onGameEnd, startTime, peekCount]);

  // ── Reset canvas ─────────────────────────────────────────
  const handleReset = useCallback(() => {
    const emptyCanvas = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    setCanvas(emptyCanvas);
    setClickCount(0);
    setFeedback(null);
    setTimeout(() => {
       setHistory((prev) => {
          const newHistory = prev.slice(0, historyIndex + 1);
          newHistory.push(emptyCanvas);
          return newHistory;
       });
       setHistoryIndex((prev) => prev + 1);
    }, 0);
  }, [gridSize, historyIndex]);

  const accuracyPct = feedback ? Math.round((feedback.correct / feedback.total) * 100) : 0;

  return (
    <div>
      {/* ── Main: Reference + Canvas ──────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch flex-1">
        <div className="flex-1 w-full lg:w-1/2 relative flex flex-col justify-center items-center ">
          <ReferenceGrid
            gridSize={gridSize}
            pattern={pattern}
            isHidden={!isMemorizing && !isPeeking}
            onPeek={handlePeek}
            peekCount={peekCount}
            maxPeeks={maxPeeks}
            isMemorizing={isGameActive && isMemorizing}
            timeLeft={isGameActive && isMemorizing ? memorizeTimeLeft : isPeeking ? peekTimeLeft : 0}
            isPeeking={isPeeking}
          />
        </div>
        <div className="flex-1 w-full lg:w-1/2 relative flex flex-col gap-5">
          <div className="flex-1 relative flex flex-col">
            {(isMemorizing || isPeeking) && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-20 rounded-3xl flex items-center justify-center flex-col gap-2">
                <span className="text-4xl">👀</span>
                <p className="font-bold text-gray-600">จดจำรูปต้นแบบ...</p>
              </div>
            )}
            <ColorCanvas
              gridSize={gridSize}
              canvas={canvas}
              selectedColor={drawingMode === "eraser" ? null : selectedColor}
              disabled={isCompleted}
              onCellClick={handleCellClick}
              onCellDrag={handleCellDrag}
              drawingMode={drawingMode}
              onDrawEnd={handleDrawEnd}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
            />
          </div>

          {/* ── Palette + Actions ─────────────────────────── */}
          <div className="relative rounded-3xl p-4 sm:p-5 overflow-visible bg-white/90 shadow-xl border-2 border-white backdrop-blur-sm shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              />
            </div>
          </div>
        </div>
      </div>




      <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </div>
  );
}
