"use client";

import { useState, useCallback, useEffect, useRef } from "react";

import { ColorCanvas } from "./ColorCanvas";
import { ReferenceGrid } from "./ReferenceGrid";
import { ColorPalette } from "./ColorPalette";
import { type GridColoringLevelConfig } from "@/constants/games/grid-based-coloring-levels";
import {
  calculateGridColoringScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";

// DrawingMode ไม่มี eyedropper แล้ว
export type DrawingMode = "paint" | "fill" | "eraser";

// ── Memory time (seconds) per difficulty ─────────────────────
// easy: 10s | normal: 8s | hard: 15s
const getMemorizeTime = (difficulty: string) => {
  if (difficulty === "easy") return 10;
  if (difficulty === "normal") return 8;
  if (difficulty === "hard") return 15;
  return 10;
};

// ── Max peek count per difficulty ────────────────────────────
// easy: 5 peeks | normal: 3 peeks | hard: 2 peeks (2nd+ penalised)
const getMaxPeeks = (difficulty: string) => {
  if (difficulty === "easy") return 5;
  if (difficulty === "normal") return 3;
  if (difficulty === "hard") return 2;
  return 5;
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
  const { gridSize, patterns } = config;
  // ── Randomly select one pattern variant (client-only to avoid hydration mismatch) ──
  const [variantIndex, setVariantIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const idx = Math.floor(Math.random() * patterns.length);
    setVariantIndex(idx);
    setSelectedColor(patterns[idx].palette[0]);
    setIsReady(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const variant = patterns[variantIndex];
  const pattern = variant.grid;
  const palette = variant.palette;
  const { reduceLife } = useUserStore();
  // ── Canvas state ──────────────────────────────────────────
  const [canvas, setCanvas] = useState<(string | null)[][]>(
    () => Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(patterns[0].palette[0]);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("paint");
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [wrongCells, setWrongCells] = useState<{ row: number; col: number }[]>([]);

  // ── Undo / Redo history ───────────────────────────────────
  const [history, setHistory] = useState<(string | null)[][][]>(() => [
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null)),
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canvasRef = useRef(canvas);
  useEffect(() => {
    canvasRef.current = canvas;
  }, [canvas]);

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

  // All difficulties start with memorize phase
  const [isMemorizing, setIsMemorizing] = useState(true);
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

  const handleSkipMemorize = useCallback(() => {
    if (isMemorizing) {
      setMemorizeTimeLeft(0);
      setIsMemorizing(false);
    }
  }, [isMemorizing]);
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

      setWrongCells([]); // Clear wrong cell highlights when start editing
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

      setWrongCells([]); // Clear wrong cell highlights when start editing
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

  // ── Check work ───────────────────────────────────────────
  const handleCheck = useCallback(() => {
    if (isCompleted) return;

    const newWrongCells: { row: number; col: number }[] = [];
    // Normalize: treat null as #FFFFFF (visually empty) and compare case-insensitively
    const normalizeColor = (color: string | null) => (color || "#FFFFFF").toUpperCase();

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (normalizeColor(pattern[r][c]) !== normalizeColor(canvas[r][c])) {
          newWrongCells.push({ row: r, col: c });
        }
      }
    }

    if (newWrongCells.length === 0) {
      // ── WIN ──────────────────────────────────────────────
      setWrongCells([]);
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      // peekPenalty: hard เท่านั้น — ครั้งที่ 2+ จะโดนหัก 1 attempt ต่อครั้ง
      const peekPenalty =
        config.difficulty === "hard" ? Math.max(0, peekCount - 1) : 0;
      // totalAttempts ใช้ทั้งใน scoring และ GameResultModal ให้ตรงกัน
      const totalAttempts = wrongCount + peekPenalty;
      const scoreResult = calculateGridColoringScore({
        difficulty: config.difficulty,
        attempts: totalAttempts,
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
        // Bug #1 fix: ส่ง totalAttempts แทน wrongCount เพื่อให้ตรงกับคะแนนที่คำนวณ
        onGameEnd(scoreResult, totalAttempts, elapsed);
      }, 800);
    } else {
      // ── WRONG — highlight errors, don't clear canvas ──
      setWrongCells(newWrongCells);
      setWrongCount((prev) => prev + 1);
      reduceLife();
    }
  }, [canvas, pattern, gridSize, isCompleted, wrongCount, config, onGameEnd, startTime, peekCount, reduceLife]);

  // ── Reset canvas ──────────────────────────────────────────
  const handleReset = useCallback(() => {
    const emptyCanvas = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(null)
    );
    setCanvas(emptyCanvas);
    setWrongCells([]);
    setTimeout(() => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(emptyCanvas);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);
    }, 0);
  }, [gridSize, historyIndex]);

  // Show reference only during memorize phase or peek
  const isReferenceHidden = !isMemorizing && !isPeeking;

  return (
    <div className="flex flex-col gap-4 w-full h-full flex-1">
      {/* ── Main: Reference + Canvas side-by-side ──────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch flex-1">

        {/* Reference grid side */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col">
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
            showPeekButton={!isMemorizing}
            onSkip={handleSkipMemorize}
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
              wrongCells={wrongCells}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom: Palette + Tools ───────────────────────── */}
      <div className="rounded-[2.5rem] px-4 py-3 sm:px-6 sm:py-4 bg-[#E8DCC4] border-4 border-[#D2B48C] shadow-inner shadow-amber-900/10 shrink-0 mx-auto w-fit max-w-full flex items-center justify-center overflow-x-auto hide-scrollbar">
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
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
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isCheckDisabled={isMemorizing || isPeeking}
        />
      </div>

    </div>
  );
}
