"use client";

import { useState, useCallback, useMemo } from "react";

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

interface GridColoringGameProps {
  config: GridColoringLevelConfig;
  onGameEnd: (result: ScoreResult, wrongCount: number, elapsed: number) => void;
  startTime: number;
}

export function GridColoringGame({ config, onGameEnd, startTime }: GridColoringGameProps) {
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
      if (isCompleted) return;
      setFeedback(null);

      setCanvas((prev) => {
        const next = prev.map((r) => [...r]);
        if (selectedColor === null) {
          next[row][col] = null;
        } else if (next[row][col] === selectedColor) {
          next[row][col] = null;
        } else {
          next[row][col] = selectedColor;
        }
        return next;
      });
      setClickCount((prev) => prev + 1);
    },
    [selectedColor, isCompleted]
  );

  // ── Cell drag handler (always paint, no toggle) ────────
  const handleCellDrag = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return;
      setFeedback(null);

      setCanvas((prev) => {
        const next = prev.map((r) => [...r]);
        if (selectedColor === null) {
          next[row][col] = null;
        } else {
          next[row][col] = selectedColor;
        }
        return next;
      });
      setClickCount((prev) => prev + 1);
    },
    [selectedColor, isCompleted]
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

      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount,
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
    }
  }, [canvas, pattern, gridSize, isCompleted, wrongCount, config, onGameEnd, startTime]);

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
                    bg-gradient-to-r from-[#AACE30]/15 to-[#AACE30]/5 border border-[#AACE30]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#AACE30] animate-pulse" />
          <span className="text-xs font-semibold text-[#AACE30]/80">{gridSize}×{gridSize}</span>
        </div>

        {/* Click counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white/5 border border-white/10">
          <span className="text-xs text-white/40">🖌️</span>
          <span className="text-xs font-semibold text-white/60">{clickCount} strokes</span>
        </div>

        {/* Painted counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white/5 border border-white/10">
          <span className="text-xs text-white/40">🎨</span>
          <span className="text-xs font-semibold text-white/60">{paintedCount} painted</span>
        </div>

        {/* Accuracy feedback */}
        {feedback && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-bold text-xs
                        ${feedback.correct === feedback.total
              ? "bg-green-500/15 border-green-500/30 text-green-400"
              : accuracyPct >= 80
                ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                : "bg-red-500/15 border-red-500/30 text-red-400"
            }`}
            style={{ animation: "fadeSlideIn 0.3s ease-out" }}
          >
            {accuracyPct >= 95 ? "✅" : accuracyPct >= 80 ? "🔶" : "❌"}
            {accuracyPct}% accuracy
          </div>
        )}
      </div>

      {/* ── Main: Canvas + Reference ──────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="flex-1 w-full lg:w-auto">
          <ColorCanvas
            gridSize={gridSize}
            canvas={canvas}
            selectedColor={selectedColor}
            disabled={isCompleted}
            onCellClick={handleCellClick}
            onCellDrag={handleCellDrag}
          />
        </div>
        <div className="flex-1 w-full lg:w-auto">
          <ReferenceGrid gridSize={gridSize} pattern={pattern} />
        </div>
      </div>

      {/* ── Palette + Actions ─────────────────────────── */}
      <div className="relative rounded-2xl p-4 sm:p-5 overflow-hidden bg-[#1E293B]">
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
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
                                bg-slate-700/80 text-white/70 hover:bg-slate-600 hover:text-white active:scale-95
                                transition-all border border-white/5 hover:border-white/10
                                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaRedo className="w-3.5 h-3.5" />
              Reset
            </button>

            {/* Check */}
            <button
              onClick={handleCheck}
              disabled={isCompleted || paintedCount === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white
                                bg-gradient-to-r from-[#AACE30] to-[#7BA318]
                                hover:from-[#B8DC3C] hover:to-[#8FB825]
                                active:scale-95 transition-all shadow-lg shadow-[#AACE30]/20
                                hover:shadow-xl hover:shadow-[#AACE30]/30
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <FaCheck className="w-3.5 h-3.5" />
              Check My Work
            </button>
          </div>
        </div>
      </div>

      {/* ── How to play ──────────────────────────────── */}
      <div className="rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed
                bg-white/[0.02] border border-white/5 text-white/30">
        <p className="font-bold text-white/50 mb-1.5 flex items-center gap-1.5">
          <span>💡</span> How to Play
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          <span>• Select a color from the palette</span>
          <span>• Click or drag to paint pixels</span>
          <span>• Match the reference image exactly</span>
          <span>• Click &quot;Check My Work&quot; when done</span>
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
