"use client";

import { useState, useCallback, useMemo, useEffect } from "react";

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
  const { gridSize, palette, pattern } = config;

  // ── State ─────────────────────────────────────────────────
  const [canvas, setCanvas] = useState<(string | null)[][]>(
    () => Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(palette[0]);
  const [clickCount, setClickCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: number; total: number } | null>(null);

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

  // ── Cell click handler (toggle) ─────────────────────────
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;

      const isClearing = canvas[row][col] === selectedColor;
      const targetColor = isClearing ? null : selectedColor;
      if (canvas[row][col] === targetColor) return;

      setFeedback(null);
      setCanvas((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = targetColor;
        return next;
      });
      setClickCount((prev) => prev + 1);
    },
    [canvas, selectedColor, isCompleted, isMemorizing, isPeeking]
  );

  // ── Cell drag handler (always paint, no toggle) ────────
  const handleCellDrag = useCallback(
    (row: number, col: number) => {
      if (isCompleted || isMemorizing || isPeeking) return;
      if (canvas[row][col] === selectedColor) return;

      setFeedback(null);
      setCanvas((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = selectedColor;
        return next;
      });
      setClickCount((prev) => prev + 1);
    },
    [canvas, selectedColor, isCompleted, isMemorizing, isPeeking]
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
      setWrongCount((prev) => prev + 1);

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
    setCanvas(Array.from({ length: gridSize }, () => Array(gridSize).fill(null)));
    setClickCount(0);
    setFeedback(null);
  }, [gridSize]);

  const accuracyPct = feedback ? Math.round((feedback.correct / feedback.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-5 w-full max-w-5xl mx-auto">

      {/* ── Stats bar ─────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Grid size badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-[#AACE30]/10 border border-[#AACE30]/20 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#AACE30] animate-pulse" />
          <span className="text-xs font-bold text-[#8BB422]">{gridSize}×{gridSize}</span>
        </div>

        {/* Click counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400">🖌️</span>
          <span className="text-xs font-bold text-gray-500">{clickCount} strokes</span>
        </div>

        {/* Painted counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400">🎨</span>
          <span className="text-xs font-bold text-gray-500">{paintedCount} painted</span>
        </div>

        {/* Accuracy feedback */}
        {feedback && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-xs shadow-sm
                        ${feedback.correct === feedback.total
              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
              : accuracyPct >= 80
                ? "bg-amber-50 border-amber-200 text-amber-600"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
            style={{ animation: "fadeSlideIn 0.3s ease-out" }}
          >
            {accuracyPct >= 95 ? "✅" : accuracyPct >= 80 ? "🔶" : "❌"}
            {accuracyPct}% accuracy
          </div>
        )}
      </div>

      {/* ── Main: Reference + Canvas ──────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="flex-1 w-full lg:w-auto relative">
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
        <div className="flex-1 w-full lg:w-auto relative">
          {(isMemorizing || isPeeking) && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-20 rounded-3xl flex items-center justify-center flex-col gap-2">
              <span className="text-4xl">👀</span>
              <p className="font-bold text-gray-600">จดจำรูปต้นแบบ...</p>
            </div>
          )}
          <ColorCanvas
            gridSize={gridSize}
            canvas={canvas}
            selectedColor={selectedColor}
            disabled={isCompleted}
            onCellClick={handleCellClick}
            onCellDrag={handleCellDrag}
          />
        </div>
      </div>

      {/* ── Palette + Actions ─────────────────────────── */}
      <div className="relative rounded-3xl p-4 sm:p-5 overflow-hidden bg-white/90 shadow-xl border-2 border-white backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <ColorPalette
            palette={palette}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          <div className="flex gap-3 shrink-0">
            {/* Reset */}
            <button
              onClick={handleReset}
              disabled={isCompleted}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm
                                bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95
                                transition-all border-2 border-transparent hover:border-gray-300
                                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaRedo className="w-3.5 h-3.5" />
              Reset
            </button>

            {/* Check */}
            <button
              onClick={handleCheck}
              disabled={isCompleted || paintedCount === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white
                                bg-gradient-to-r from-[#AACE30] to-[#8BB422]
                                hover:from-[#B8DC3C] hover:to-[#9ABB2C]
                                active:scale-95 transition-all shadow-lg shadow-[#AACE30]/30
                                hover:shadow-xl hover:shadow-[#AACE30]/40
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none border-2 border-white/20"
            >
              <FaCheck className="w-3.5 h-3.5" />
              Check My Work
            </button>
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
