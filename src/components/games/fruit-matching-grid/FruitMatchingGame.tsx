"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
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
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Helper: generate random grid without duplicates ────────────
function generateRandomGrid(size: number): string[][] {
  const allAvailableFruits = Object.keys(FRUIT_NAMES);
  const selectedFruits = shuffle(allAvailableFruits).slice(0, size * size);
  
  const newGrid: string[][] = [];
  for (let r = 0; r < size; r++) {
    newGrid.push(selectedFruits.slice(r * size, (r + 1) * size));
  }
  return newGrid;
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

  // ── Compute shuffled grid, target coordinates and choices ───────────────
  // Use state and useEffect to shuffle on the client side, avoiding hydration mismatch
  const [randomGrid, setRandomGrid] = useState<string[][]>([]);
  const [targetCoordinates, setTargetCoordinates] = useState<string[]>([]);
  const [allChoices, setAllChoices] = useState<string[][]>([]);

  useEffect(() => {
    // 0. Generate random grid with unique fruits
    const newGrid = generateRandomGrid(config.gridSize);
    setRandomGrid(newGrid);

    // 1. Generate all possible coordinates for the grid
    const allPossibleCoords: string[] = [];
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        allPossibleCoords.push(`${ROW_LABELS[r]}${c + 1}`);
      }
    }

    // 2. Shuffle those coordinates and pick N unique ones
    const shuffledCoords = shuffle(allPossibleCoords);
    const coords = shuffledCoords.slice(0, config.targetCount);

    setTargetCoordinates(coords);

    // 3. Generate 4 choices for each target (based on shuffled grid)
    const choices = coords.map((coord) => {
      const correct = getFruitAt(newGrid, coord)!;
      return generateChoices(newGrid, correct);
    });
    setAllChoices(choices);
  }, [config.targetCount, config.gridSize]);

  // ── State ────────────────────────────────────────────────────
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [foundCoordinates, setFoundCoordinates] = useState<string[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef<number>(0);
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

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
  const correctFruit = currentCoord ? getFruitAt(randomGrid, currentCoord) || "" : "";

  return (
    <div className="flex flex-col md:flex-row flex-1 gap-3 sm:gap-4 w-full max-w-7xl mx-auto md:h-full md:min-h-0 md:items-center">

      {/* ===== LEFT PANEL: Grid ===== */}
      <Container
        className="md:flex-[6] flex flex-col items-center justify-center p-2 sm:p-4 md:p-5 lg:p-6 md:min-h-0 md:h-full bg-transparent"
        style={{ boxShadow: "none" }}
      >
        <div className="flex flex-col items-center justify-center w-full md:h-full md:min-h-0">
          <FruitGrid
            grid={randomGrid}
            gridSize={config.gridSize}
            foundCoordinates={foundCoordinates}
            disabled={true}
            interactiveHighlight={config.level <= 3}
          />
        </div>
      </Container>

      {/* ===== RIGHT PANEL ===== */}
      <Container
        className="md:flex-[4] flex flex-col p-4 sm:p-5 md:p-5 pb-20 md:pb-5 bg-white/95 backdrop-blur-sm border-4 sm:border-[6px] border-white/60 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-y-auto scrollbar-hide md:self-center md:max-h-full"
        style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)" }}
      >
        {/* Ask "what fruit is at this coordinate?" */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-4 w-full">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl font-black text-green-700 tracking-wider">
            <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 drop-shadow-sm flex-shrink-0" />
            <p>พิกัดนี้คือผลไม้อะไร?</p>
          </div>

          {/* Coordinate prompt card */}
          <div
            className="rounded-2xl sm:rounded-[1.5rem] md:rounded-[2rem] p-3 sm:p-4 md:p-5 flex flex-col justify-center items-center gap-1 shadow-md border-[3px] border-white/50 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)" }}
          >
            {/* The Sign & Mascot */}
            <div className="relative mt-14 sm:mt-[70px] md:mt-[70px] lg:mt-[90px] mb-2 sm:mb-3 md:mb-3">
              {/* Mascot Peeking from Behind the sign */}
              <div className="absolute bottom-[40%] sm:bottom-[25%] md:bottom-[25%] left-1/2 -translate-x-1/2 w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[110px] md:h-[110px] lg:w-[140px] lg:h-[140px] pointer-events-none z-0">
                <Image
                  src="/images/P_PingPing/pingping-01.svg"
                  alt="Mascot PingPing"
                  fill
                  className="object-contain drop-shadow-md"
                  unoptimized
                />
              </div>

              {/* The Sign (currentCoord) */}
              <div className="bg-white rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-1 sm:py-1.5 md:py-2 lg:py-2.5 shadow-[0_4px_0_0_#15803D,0_8px_15px_rgba(0,0,0,0.2)] relative z-10 border-2 border-green-700 flex justify-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-green-500 tracking-wider">
                  {currentCoord}
                </span>
              </div>
            </div>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-black bg-black/10 px-3 py-1 rounded-full">
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
        </div>
      </Container>
    </div>
  );
}
