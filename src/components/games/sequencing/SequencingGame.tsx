"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { type SequencingLevelConfig, type SequencingItem } from "@/constants/games/sequencing-levels";
import { type ScoreResult, calculateGameScore, getStarRating } from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";

import { 
  DndContext, 
  DragEndEvent, 
  DragStartEvent, 
  closestCenter, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  TouchSensor, 
  DragOverlay 
} from "@dnd-kit/core";

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
  const dndId = useId();
  // We keep a pool of items at the bottom (answers). Null means it's been picked up.
  const [pool, setPool] = useState<(SequencingItem | null)[]>(() => shuffleArray([...config.correctSequence]));
  const [slots, setSlots] = useState<(SequencingItem | null)[]>(() => Array(config.correctSequence.length).fill(null));

  const [wrongCount, setWrongCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 10 } })
  );

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

  // Handle clicking a placed item from the top slots (removing it via click on 'X' button)
  const handleSlotRemove = (item: SequencingItem, slotIndex: number) => {
    if (showErrors) setShowErrors(false);
    const emptyPoolIdx = pool.findIndex((p) => p === null);
    if (emptyPoolIdx === -1) return;

    setPool((prev) => {
      const newPool = [...prev];
      newPool[emptyPoolIdx] = item;
      return newPool;
    });

    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[slotIndex] = null;
      return newSlots;
    });
  };

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (showErrors) setShowErrors(false);
    setActiveDragId(event.active.id as string);
  }, [showErrors]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    const activeId = active.id as string;
    const targetId = over?.id as string | undefined;

    if (!targetId) return; // Dropped nowhere

    // Case 1: Dragging from Pool into a Slot
    if (activeId.startsWith("pool-item-") && targetId.startsWith("slot-")) {
      const poolIdx = parseInt(activeId.split("pool-item-")[1], 10);
      const slotIdx = parseInt(targetId.split("slot-")[1], 10);
      
      const item = pool[poolIdx];
      if (!item || slots[slotIdx] !== null) return; // ignore if slot filled or pool empty

      setSlots((prev) => {
        const next = [...prev];
        next[slotIdx] = item;
        return next;
      });
      setPool((prev) => {
        const next = [...prev];
        next[poolIdx] = null;
        return next;
      });
    }

    // Case 2: Dragging from Slot to Pool
    if (activeId.startsWith("slot-item-") && targetId === "pool") {
      const slotIdx = parseInt(activeId.split("slot-item-")[1], 10);
      const item = slots[slotIdx];
      const emptyPoolIdx = pool.findIndex((p) => p === null);

      if (!item || emptyPoolIdx === -1) return;

      setSlots((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
      setPool((prev) => {
        const next = [...prev];
        next[emptyPoolIdx] = item;
        return next;
      });
    }
    
    // Case 3: Dragging from Slot to another Slot
    if (activeId.startsWith("slot-item-") && targetId.startsWith("slot-")) {
      const fromSlotIdx = parseInt(activeId.split("slot-item-")[1], 10);
      const toSlotIdx = parseInt(targetId.split("slot-")[1], 10);

      if (fromSlotIdx !== toSlotIdx && slots[toSlotIdx] === null) {
        setSlots((prev) => {
          const next = [...prev];
          next[toSlotIdx] = next[fromSlotIdx];
          next[fromSlotIdx] = null;
          return next;
        });
      }
    }
  }, [pool, slots]);

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

  // Determine active item for overlay
  let activeItemObj: SequencingItem | null = null;
  if (activeDragId) {
    if (activeDragId.startsWith("pool-item-")) {
      activeItemObj = pool[parseInt(activeDragId.split("pool-item-")[1], 10)];
    } else if (activeDragId.startsWith("slot-item-")) {
      activeItemObj = slots[parseInt(activeDragId.split("slot-item-")[1], 10)];
    }
  }

  return (
    <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveDragId(null)}>
      <div className="flex flex-col gap-3 sm:gap-5 w-full">
        {/* Title */}
        <h2 className="text-center font-bold text-xl sm:text-2xl text-[#C084FC] px-2">
          {config.sequenceTitle}
        </h2>

        <SequencingSlots
          slots={slots}
          onRemove={handleSlotRemove}
          correctSequence={config.correctSequence}
          showErrors={showErrors}
          shakeKey={wrongCount}
        />

        <SequencingPool pool={pool} slotCount={slots.length} />

        <GameControls
          onCheck={handleCheck}
          onReset={handleReset}
          isAllFilled={isAllFilled}
          isCompleted={isCompleted}
        />
        
        <DragOverlay dropAnimation={null}>
          {activeItemObj && (
            <div className="w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center bg-[#1E2C33] shadow-[0_6px_0_#7C3AED] border-[2px] border-[#7C3AED] scale-105 rotate-2 cursor-grabbing pointer-events-none">
              {activeItemObj.isImage ? (
                <img src={activeItemObj.content} alt="Dragging" className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm pointer-events-none" />
              ) : (
                <span className="text-2xl sm:text-3xl lg:text-4xl drop-shadow-sm pointer-events-none text-white font-black">{activeItemObj.content}</span>
              )}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}