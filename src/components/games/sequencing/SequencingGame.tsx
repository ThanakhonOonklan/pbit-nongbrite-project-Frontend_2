"use client";

import { useState, useEffect, useCallback } from "react";
import { type SequencingLevelConfig, type SequencingItem } from "@/constants/games/sequencing-levels";
import { type ScoreResult, calculateGameScore, getStarRating } from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";

import { SequencingSlots } from "./SequencingSlots";
import { SequencingPool } from "./SequencingPool";
import { GameControls } from "./GameControls";

interface SequencingGameProps {
  config: SequencingLevelConfig;
  onGameEnd: (result: ScoreResult, attempts: number, elapsed: number) => void;
  onWrongAttempt?: () => void;
  startTime: number;
}

// Function to shuffle array securely
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function SequencingGame({ config, onGameEnd, onWrongAttempt, startTime }: SequencingGameProps) {
  // We keep a pool of items at the bottom (answers). Null means it's been picked up.
  const [pool, setPool] = useState<(SequencingItem | null)[]>(() => shuffleArray([...config.correctSequence]));
  const [slots, setSlots] = useState<(SequencingItem | null)[]>(() => Array(config.correctSequence.length).fill(null));

  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Initialize game
  useEffect(() => {
    // Fill the empty slots to match the correct sequence length
    setSlots(Array(config.correctSequence.length).fill(null));

    // Shuffle items for the pool
    setPool(shuffleArray([...config.correctSequence]));

    // Reset stats
    setWrongCount(0);
    setIsCompleted(false);
    setShowErrors(false);
  }, [config]);

  // Handle clicking an item from the bottom pool
  const handleItemSelect = (item: SequencingItem, poolIndex: number) => {
    if (showErrors) setShowErrors(false); // Clear errors when user edits
    // Find the first empty slot
    const firstEmptySlotIdx = slots.findIndex((slot) => slot === null);
    if (firstEmptySlotIdx === -1) return; // No empty slots available

    // Move to slot
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[firstEmptySlotIdx] = item;
      return newSlots;
    });

    // Remove from pool
    setPool((prev) => {
      const newPool = [...prev];
      newPool[poolIndex] = null;
      return newPool;
    });
  };

  // Handle clicking a placed item from the top slots (removing it)
  const handleSlotRemove = (item: SequencingItem, slotIndex: number) => {
    if (showErrors) setShowErrors(false); // Clear errors when user edits
    // Find where it belongs back in the original pool layout (or just an empty spot)
    const emptyPoolIdx = pool.findIndex((p) => p === null);
    if (emptyPoolIdx === -1) return; // Should never happen unless logic is broken

    // Move back to pool
    setPool((prev) => {
      const newPool = [...prev];
      newPool[emptyPoolIdx] = item;
      return newPool;
    });

    // Remove from slot
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[slotIndex] = null;
      return newSlots;
    });
  };

  // Handle native HTML5 drag drop from pool to slot
  const handleNativeDrop = (item: SequencingItem, poolIndex: number, slotIndex: number) => {
    if (slots[slotIndex] !== null) return; // slot already filled
    if (showErrors) setShowErrors(false);
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[slotIndex] = item;
      return newSlots;
    });
    setPool((prev) => {
      const newPool = [...prev];
      newPool[poolIndex] = null;
      return newPool;
    });
  };

  // Handle Check Logic
  const handleCheck = useCallback(() => {
    if (isCompleted) return;

    // Must fill all slots first
    if (slots.some((slot) => slot === null)) {
      return;
    }

    const isMatch = slots.every((slot, idx) => slot?.id === config.correctSequence[idx].id);

    if (isMatch) {
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const totalAttempts = wrongCount;

      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: totalAttempts,
        timeSeconds: elapsed,
      });

      const { stars } = getStarRating(scoreResult.totalScore);
      const absoluteLevelId = getAbsoluteLevelId("sequencing", config.level);
      gameService.submitScore({
        levelId: absoluteLevelId,
        score: scoreResult.totalScore,
        stars,
        playTime: elapsed,
      }).catch(err => console.error("Failed to submit score", err));

      setTimeout(() => {
        onGameEnd(scoreResult, totalAttempts, elapsed);
      }, 500);
    } else {
      // Wrong answer: increment count, show red highlights, let player try again
      setWrongCount((prev) => prev + 1);
      setShowErrors(true);
      if (onWrongAttempt) onWrongAttempt();
      // Do NOT end the game — player can keep editing and retrying
    }
  }, [slots, config, isCompleted, startTime, wrongCount, onGameEnd, onWrongAttempt]);

  const isAllFilled = slots.every((slot) => slot !== null);

  // Handle Reset: return all placed items back to pool
  const handleReset = () => {
    setShowErrors(false);
    const filledSlots = slots.filter((s): s is SequencingItem => s !== null);
    setSlots(Array(config.correctSequence.length).fill(null));
    setPool((prev) => {
      const newPool = [...prev];
      filledSlots.forEach((item) => {
        const emptyIdx = newPool.findIndex((p) => p === null);
        if (emptyIdx !== -1) newPool[emptyIdx] = item;
      });
      return newPool;
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-5 w-full">
      {/* Title */}
      <h2 className="text-center font-bold text-xl sm:text-2xl text-[#9956DE] px-2">
        {config.sequenceTitle}
      </h2>

      <SequencingSlots
        slots={slots}
        onRemove={handleSlotRemove}
        onDrop={handleNativeDrop}
        correctSequence={config.correctSequence}
        showErrors={showErrors}
      />

      <SequencingPool pool={pool} onSelect={handleItemSelect} slotCount={slots.length} />

      <GameControls
        onCheck={handleCheck}
        onReset={handleReset}
        isAllFilled={isAllFilled}
        isCompleted={isCompleted}
      />
    </div>
  );
}