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
        <h2 className="text-center font-extrabold text-xl sm:text-2xl text-[#E9D5FF] px-2 tracking-wide" style={{ textShadow: '0 0 10px rgba(192,132,252,0.6), 0 0 20px rgba(168,85,247,0.4)' }}>
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
        
        {/* Interactive Momo Mascot */}
        <div className="absolute -bottom-20 sm:-bottom-24 -left-2 sm:-left-8 md:-left-16 lg:-left-24 xl:-left-36 z-20 pointer-events-none transition-all duration-300 hidden sm:block">
          <style>{`
            @keyframes mascot-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
            }
          `}</style>
          
          <div className="relative">
            {/* Speech Bubbles */}
            {showErrors && (
              <div className="absolute -top-12 -right-16 bg-white text-red-500 font-bold px-4 py-2 rounded-2xl rounded-bl-none shadow-xl border-2 border-red-100 text-sm md:text-base animate-in zoom-in duration-300 whitespace-nowrap z-30">
                ลองสลับดูใหม่นะ!
              </div>
            )}
            {isCompleted && (
              <div className="absolute -top-12 -right-12 bg-white text-green-500 font-bold px-4 py-2 rounded-2xl rounded-bl-none shadow-xl border-2 border-green-100 text-sm md:text-base animate-in zoom-in duration-300 whitespace-nowrap z-30">
                ยอดเยี่ยมไปเลย!
              </div>
            )}
            
            {/* Mascot Image */}
            <img 
              src={isCompleted ? "/images/P_Momo/momo-04.svg" : showErrors ? "/images/P_Momo/momo-05.svg" : "/images/P_Momo/momo-03.svg"} 
              alt="Momo Mascot" 
              style={{
                animation: isCompleted ? 'bounce 1s infinite' : showErrors ? 'shake 0.5s ease-in-out' : 'mascot-float 4s ease-in-out infinite',
                filter: isCompleted ? 'drop-shadow(0 0 20px rgba(192,132,252,0.8))' : showErrors ? 'drop-shadow(0 0 15px rgba(248,113,113,0.5))' : 'drop-shadow(0 0 15px rgba(192,132,252,0.4))'
              }}
              className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain transition-all duration-300"
            />
          </div>
        </div>
        
        <DragOverlay dropAnimation={null}>
          {activeItemObj && (
            <div className="w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center bg-[#241350]/90 backdrop-blur-md shadow-[0_8px_0_#6D28D9,0_0_25px_rgba(168,85,247,0.6)] border-[2px] border-[#A855F7] scale-110 rotate-3 cursor-grabbing pointer-events-none ring-2 ring-[#C084FC]/40">
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