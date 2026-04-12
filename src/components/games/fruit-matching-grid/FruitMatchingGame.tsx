"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Container } from "@/components/common";
import { FaMapMarkerAlt } from "react-icons/fa";

import { FruitGrid } from "./FruitGrid";
import { FruitChoices } from "./FruitChoices";
import {
  findCoordinate,
  ROW_LABELS,
  FRUIT_NAMES,
  type FruitMatchingGridLevelConfig,
} from "@/constants/games/fruit-matching-grid-levels";
import {
  calculateFruitMatchingScore,
  getStarRating,
  type ScoreResult,
} from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";



// ── Helper: shuffle array ─────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Helper: generate 4 choices (1 correct + 3 decoys) ─────────
function generateChoices(grid: string[][], correct: string): string[] {
  const allFruits = [...new Set(grid.flat())].filter(f => f !== correct);
  const decoys = shuffle(allFruits).slice(0, 3);
  return shuffle([correct, ...decoys]);
}

// ── Helper: get fruit at coordinate ──────────────────────────
function getFruitAt(grid: string[][], coord: string): string | null {
  const row = ROW_LABELS.indexOf(coord[0] as typeof ROW_LABELS[number]);
  const col = parseInt(coord[1]) - 1;
  return grid[row]?.[col] ?? null;
}

interface FruitMatchingGameProps {
  config: FruitMatchingGridLevelConfig;
  onGameEnd: (result: ScoreResult, wrongCount: number, elapsed: number) => void;
}

export function FruitMatchingGame({ config, onGameEnd }: FruitMatchingGameProps) {
  const { reduceLife } = useUserStore();

  // ── Compute target coordinates and choices ─────────────────────────────
  // Use state and useEffect to shuffle on the client side, avoiding hydration mismatch
  const [targetCoordinates, setTargetCoordinates] = useState<string[]>([]);
  const [allChoices, setAllChoices] = useState<string[][]>([]);

  useEffect(() => {
    // 1. Generate all possible coordinates for the grid
    const allPossibleCoords: string[] = [];
    for (let r = 0; r < config.grid.length; r++) {
      for (let c = 0; c < config.grid[r].length; c++) {
        allPossibleCoords.push(`${ROW_LABELS[r]}${c + 1}`);
      }
    }

    // 2. Shuffle those coordinates and pick N unique ones
    const shuffledCoords = shuffle(allPossibleCoords);
    const coords = shuffledCoords.slice(0, config.targetCount);
    
    setTargetCoordinates(coords);

    // 3. Generate 4 choices for each target
    const choices = coords.map((coord) => {
      const correct = getFruitAt(config.grid, coord)!;
      return generateChoices(config.grid, correct);
    });
    setAllChoices(choices);
  }, [config.targetCount, config.grid]);

  // ── State ────────────────────────────────────────────────────
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [foundCoordinates, setFoundCoordinates] = useState<string[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // ── Win Logic (shared) ────────────────────────────────────────
  const handleWin = useCallback((finalWrongCount: number) => {
    setIsCompleted(true);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const scoreResult = calculateFruitMatchingScore({
      difficulty: config.difficulty,
      attempts: finalWrongCount,
      timeSeconds: elapsed,
    });
    const { stars } = getStarRating(scoreResult.totalScore);
    const absoluteLevelId = getAbsoluteLevelId("fruit-matching-grid", config.level);
    gameService.submitScore({ levelId: absoluteLevelId, score: scoreResult.totalScore, stars, playTime: elapsed })
      .catch(err => console.error("Failed to submit score", err));

    setTimeout(() => onGameEnd(scoreResult, finalWrongCount, elapsed), 1200);
  }, [config, onGameEnd]);


  // ── Handler: Mode 2 — correct choice ──────────────────────────
  const handleCorrectChoice = useCallback(() => {
    const nextFound = [...foundCoordinates, targetCoordinates[currentTargetIndex]];
    setFoundCoordinates(nextFound);
    const nextIndex = currentTargetIndex + 1;
    if (nextIndex >= config.targetCount) {
      handleWin(wrongCount);
    } else {
      setCurrentTargetIndex(nextIndex);
    }
  }, [foundCoordinates, targetCoordinates, currentTargetIndex, wrongCount, handleWin]);

  // ── Handler: Mode 2 — wrong choice ────────────────────────────
  const handleWrongChoice = useCallback(() => {
    setWrongCount(w => { reduceLife(); return w + 1; });
  }, [reduceLife]);

  // ── Current target info ──────────────────────────────────────
  const currentCoord = targetCoordinates[currentTargetIndex] || "";
  const currentChoices = allChoices[currentTargetIndex] || [];
  const correctFruit = currentCoord ? getFruitAt(config.grid, currentCoord) || "" : "";

  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-4 w-full lg:h-full lg:overflow-hidden lg:min-h-0">

      {/* ===== LEFT PANEL: Grid ===== */}
      <Container
        className="lg:flex-[6] flex flex-col items-center justify-center p-4 lg:p-6 min-h-[260px] lg:min-h-0 lg:overflow-hidden !bg-[#131F24]"
        style={{ boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="hidden lg:block text-lg font-bold text-[#F1F7FB] mb-4 lg:mb-6 uppercase">
          LEVEL {config.level} - {config.difficulty === "easy" ? "ง่าย" : config.difficulty === "normal" ? "ปานกลาง" : "ยาก"}
        </p>

        <div className="flex flex-col items-center justify-center w-full">
          <FruitGrid
            grid={config.grid}
            gridSize={config.gridSize}
            foundCoordinates={foundCoordinates}
            disabled={true}
            interactiveHighlight={config.level <= 3}
          />
        </div>
      </Container>

      {/* ===== RIGHT PANEL ===== */}
      <Container
        className="lg:flex-[4] flex flex-col p-5 pb-20 lg:pb-5 !bg-[#131F24] overflow-auto"
        style={{ boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Ask "what fruit is at this coordinate?" */}
        <div className="flex flex-col gap-5 w-full h-full">
          {/* Coordinate prompt card */}
          <div
              className="rounded-[2rem] p-4 sm:p-5 flex flex-col items-center gap-2 shadow-lg"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
            >
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-5 h-5 text-white drop-shadow-sm" />
                <p className="text-white font-black text-sm sm:text-base uppercase tracking-wide drop-shadow-sm">
                  พิกัดนี้คือผลไม้อะไร?
                </p>
              </div>
              <div className="bg-white rounded-2xl px-8 py-3 shadow-inner my-1 sm:my-2">
                <span className="text-4xl sm:text-5xl font-black" style={{ color: "#d97706" }}>
                  {currentCoord}
                </span>
              </div>
              <p className="text-amber-900/60 text-xs sm:text-sm font-black bg-white/20 px-3 py-1 rounded-full">
                  ({currentTargetIndex + 1} / {config.targetCount})
              </p>
            </div>

          {/* 4 Choices */}
          <FruitChoices
              choices={currentChoices}
              correctAnswer={correctFruit}
              fruitNames={FRUIT_NAMES}
              onCorrect={handleCorrectChoice}
              onWrong={handleWrongChoice}
              disabled={isCompleted}
            />

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-auto">
              {Array.from({ length: config.targetCount }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300
                    ${idx < currentTargetIndex
                    ? "bg-green-400 w-6"
                    : idx === currentTargetIndex && !isCompleted
                      ? "w-6 ring-2 ring-offset-1"
                      : "w-2.5 bg-white/20"}
                  `}
                style={idx === currentTargetIndex && !isCompleted ? { background: "#FF8B8B", boxShadow: "0 0 0 2px #FF8B8B" } : {}}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
