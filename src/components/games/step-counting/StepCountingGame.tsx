"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { NumberLine } from "./NumberLine";
import { QuestionPanel } from "./QuestionPanel";
import type { StepCountingLevelConfig } from "@/constants/games/step-counting-levels";
import {
  calculateGameScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";

interface StepCountingGameProps {
  config: StepCountingLevelConfig;
  onGameEnd: (result: ScoreResult, attempts: number, elapsed: number) => void;
  startTime: number;
}

export function StepCountingGame({
  config,
  onGameEnd,
  startTime,
}: StepCountingGameProps) {
  const [characterPos, setCharacterPos] = useState(config.startPosition);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleAnswer = useCallback(
    (answer: number) => {
      if (answered) return;

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (answer === config.steps) {
        setAnswered(true);

        // Animate character walking step by step
        setIsAnimating(true);
        const totalSteps = config.steps;
        const STEP_DELAY = 300;

        for (let i = 1; i <= totalSteps; i++) {
          const timer = setTimeout(() => {
            setCharacterPos(config.startPosition + i);

            // On last step
            if (i === totalSteps) {
              setIsAnimating(false);
              setShowCorrect(true);

              // Calculate score after animation
              const finishTimer = setTimeout(() => {
                const elapsed = Math.floor(
                  (Date.now() - startTime) / 1000
                );
                const result = calculateGameScore({
                  difficulty: config.difficulty,
                  attempts: newAttempts,
                  timeSeconds: elapsed,
                });

                // Submit mock score
                const { stars } = getStarRating(result.totalScore);
                mockSubmitGameScore({
                  levelId: config.level,
                  score: result.totalScore,
                  stars,
                  playTime: elapsed,
                });

                onGameEnd(result, newAttempts, elapsed);
              }, 800);
              animRef.current.push(finishTimer);
            }
          }, i * STEP_DELAY);
          animRef.current.push(timer);
        }
      }
      // Wrong answer is handled visually by QuestionPanel
    },
    [config, attempts, answered, startTime, onGameEnd]
  );

  return (
    <div className="flex flex-col items-center gap-5 w-full h-full">
      {/* Level badge */}
      <div
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-extrabold shadow-md"
        style={{
          background: "linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
        }}
      >
        🏷️ ด่าน {config.level} · {config.description}
      </div>

      {/* Character above number line */}
      <div className="flex flex-col items-center">
        <NumberLine
          totalCells={config.totalCells}
          startPosition={config.startPosition}
          flagPosition={config.flagPosition}
          obstacles={config.obstacles}
          characterPosition={characterPos}
          isAnimating={isAnimating}
          showCorrect={showCorrect}
        />
      </div>

      {/* Question + Choices */}
      <QuestionPanel
        choices={config.choices}
        correctSteps={config.steps}
        onAnswer={handleAnswer}
        disabled={isAnimating || answered}
      />
    </div>
  );
}
