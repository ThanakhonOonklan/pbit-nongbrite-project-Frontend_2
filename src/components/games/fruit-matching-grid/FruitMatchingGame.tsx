"use client";

import { useState, useRef, useCallback } from "react";

import { FruitGrid } from "./FruitGrid";
import { FruitFinder } from "./FruitFinder";
import {
  findCoordinate,
  type FruitMatchingGridLevelConfig,
} from "@/constants/games/fruit-matching-grid-levels";
import {
  calculateGameScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";

interface FruitMatchingGameProps {
  config: FruitMatchingGridLevelConfig;
  onGameEnd: (result: ScoreResult, wrongCount: number, elapsed: number) => void;
}

export function FruitMatchingGame({ config, onGameEnd }: FruitMatchingGameProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(config.targets.length).fill("")
  );
  const [answerResults, setAnswerResults] = useState<(boolean | null)[] | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // ── Compute correct answers from grid ────────────────────
  const correctAnswers = config.targets.map((target) =>
    findCoordinate(config.grid, target)
  );

  // ── Handle input change ──────────────────────────────────
  const handleAnswerChange = useCallback(
    (index: number, value: string) => {
      if (isCompleted) return;
      // Clear results when user edits
      setAnswerResults(null);
      setUserAnswers((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
    },
    [isCompleted]
  );

  // ── Check answers ────────────────────────────────────────
  const handleCheckAnswers = useCallback(() => {
    if (isCompleted) return;

    const results = userAnswers.map((answer, idx) => {
      const correct = correctAnswers[idx];
      if (!correct) return false;
      return answer.trim().toUpperCase() === correct.toUpperCase();
    });

    setAnswerResults(results);

    const allCorrect = results.every(Boolean);

    if (allCorrect) {
      // ─── WIN ───
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

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

      // Delay to show green feedback before modal
      setTimeout(() => {
        onGameEnd(scoreResult, wrongCount, elapsed);
      }, 1000);
    } else {
      // ─── Some wrong ───
      setWrongCount((prev) => prev + 1);

      // Briefly show results, then allow retry
      setTimeout(() => {
        // Keep results visible so the user can see which were wrong
      }, 600);
    }
  }, [userAnswers, correctAnswers, isCompleted, wrongCount, config, onGameEnd]);

  // ── Reset ────────────────────────────────────────────────
  // exposed via parent if needed

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full max-w-5xl mx-auto items-start">
      {/* Left — Grid */}
      <div className="flex-1 w-full lg:w-auto">
        <FruitGrid grid={config.grid} />
      </div>

      {/* Right — Finder */}
      <div className="w-full lg:w-80 shrink-0">
        <FruitFinder
          targets={config.targets}
          userAnswers={userAnswers}
          answerResults={answerResults}
          disabled={isCompleted}
          onAnswerChange={handleAnswerChange}
          onCheckAnswers={handleCheckAnswers}
        />
      </div>
    </div>
  );
}
