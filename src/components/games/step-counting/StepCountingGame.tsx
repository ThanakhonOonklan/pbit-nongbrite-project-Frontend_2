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
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";
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
  const { reduceLife } = useUserStore();
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

  const [currentHopObstacle, setCurrentHopObstacle] = useState<number | null>(null);

  const handleAnswer = useCallback(
    (answer: number) => {
      if (answered) return;

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (answer === config.steps) {
        setAnswered(true);

        // Calculate actual path including obstacle hops
        const obstaclePositions = new Set(config.obstacles.map((o) => o.position));
        const path: { pos: number; isHop: boolean }[] = [];
        let cur = config.startPosition;

        // Simulate walking to flag
        while (cur < config.flagPosition) {
          if (obstaclePositions.has(cur + 1)) {
            // Hop over obstacle (move 2 spaces if possible, assuming flag is not on obstacle)
            cur += 2;
            path.push({ pos: cur, isHop: true });
          } else {
            // Walk normally
            cur += 1;
            path.push({ pos: cur, isHop: false });
          }
        }

        // Animate the path
        setIsAnimating(true);
        let stepIdx = 0;

        const animateNextStep = () => {
          if (stepIdx < path.length) {
            const step = path[stepIdx];
            setCharacterPos(step.pos);

            if (step.isHop) {
              // Trigger golden flash on the obstacle it just hopped over
              setCurrentHopObstacle(step.pos - 1);
              setTimeout(() => setCurrentHopObstacle(null), 400);
            }

            stepIdx++;
            const delay = step.isHop ? 500 : 300; // Hop takes a bit longer
            const timer = setTimeout(animateNextStep, delay);
            animRef.current.push(timer);
          } else {
            // Reached end
            setIsAnimating(false);
            setShowCorrect(true);

            // Calculate score after animation
            const finishTimer = setTimeout(() => {
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              const result = calculateGameScore({
                difficulty: config.difficulty,
                attempts: newAttempts,
                timeSeconds: elapsed,
              });

              // Submit score
              const { stars } = getStarRating(result.totalScore);
              const absoluteLevelId = getAbsoluteLevelId("step-counting", config.level);
              gameService.submitScore({
                levelId: absoluteLevelId,
                score: result.totalScore,
                stars,
                playTime: elapsed,
              }).catch(err => console.error("Failed to submit score", err));

              onGameEnd(result, newAttempts, elapsed);
            }, 800);
            animRef.current.push(finishTimer);
          }
        };

        // Start animation
        animateNextStep();
      } else {
        reduceLife();
        // Wrong answer is handled visually by QuestionPanel
      }
    },
    [config, attempts, answered, startTime, onGameEnd]
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      {/* Number line — outdoor scene */}
      <div className="flex flex-col items-center w-full">
        <NumberLine
          totalCells={config.totalCells}
          startPosition={config.startPosition}
          flagPosition={config.flagPosition}
          obstacles={config.obstacles}
          characterPosition={characterPos}
          isAnimating={isAnimating}
          showCorrect={showCorrect}
          currentHopObstacle={currentHopObstacle}
        />
      </div>

      {/* Question + Choices — in a card */}
      <div
        className="w-full max-w-md mx-auto rounded-2xl p-4 shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        <QuestionPanel
          correctSteps={config.steps}
          onAnswer={handleAnswer}
          disabled={isAnimating || answered}
        />
      </div>
    </div>
  );
}
