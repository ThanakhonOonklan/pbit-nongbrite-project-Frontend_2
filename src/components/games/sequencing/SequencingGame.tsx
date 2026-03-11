"use client";

import { useState, useEffect, useCallback, useMemo, Fragment } from "react";
import Image from "next/image";
import { FaCheck, FaLightbulb, FaTimes, FaArrowRight } from "react-icons/fa";
import { type SequencingLevelConfig, type SequencingItem } from "@/constants/games/sequencing-levels";
import { type ScoreResult, calculateGameScore, getStarRating } from "@/utils/game-scoring";
import { mockSubmitGameScore } from "@/constants/mocks/gameScore";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface SequencingGameProps {
  config: SequencingLevelConfig;
  onGameEnd: (result: ScoreResult, attempts: number, elapsed: number) => void;
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

export function SequencingGame({ config, onGameEnd, startTime }: SequencingGameProps) {
  // We keep a pool of items at the bottom (answers). Null means it's been picked up.
  const [pool, setPool] = useState<(SequencingItem | null)[]>([]);
  // We keep track of the placed items at the top.
  const [slots, setSlots] = useState<(SequencingItem | null)[]>([]);

  const [wrongCount, setWrongCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize game
  useEffect(() => {
    // Fill the empty slots to match the correct sequence length
    setSlots(Array(config.correctSequence.length).fill(null));

    // Shuffle items for the pool
    setPool(shuffleArray([...config.correctSequence]));

    // Reset stats
    setWrongCount(0);
    setHintsUsed(0);
    setIsCompleted(false);
  }, [config]);

  // Handle clicking an item from the bottom pool
  const handleItemSelect = (item: SequencingItem, poolIndex: number) => {
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

  // Handle Check Logic
  const handleCheck = useCallback(() => {
    if (isCompleted) return;

    // Must fill all slots first
    if (slots.some((slot) => slot === null)) {
      // Optional: Add some warning/toast here "Please fill all slots"
      return;
    }

    const isMatch = slots.every((slot, idx) => slot?.id === config.correctSequence[idx].id);

    if (isMatch) {
      setIsCompleted(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount + hintsUsed, // Hints penalize your attempts
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
      }, 500);
    } else {
      setWrongCount((prev) => prev + 1);

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const scoreResult = calculateGameScore({
        difficulty: config.difficulty,
        attempts: wrongCount + hintsUsed + 1,
        timeSeconds: elapsed,
      });

      setIsCompleted(true);
      setTimeout(() => {
        onGameEnd(scoreResult, wrongCount + 1, elapsed);
      }, 300);
    }
  }, [slots, config, isCompleted, startTime, wrongCount, hintsUsed, onGameEnd]);

  // Handle Hint Logic
  const handleHint = () => {
    // Find the first slot that is either empty or incorrect
    const targetSlotIdx = slots.findIndex((slot, idx) => slot === null || slot.id !== config.correctSequence[idx].id);

    // Setup complete?
    if (targetSlotIdx === -1) return;

    const correctItem = config.correctSequence[targetSlotIdx];

    // If there's an incorrect item currently at this slot, send it back to the pool
    const currentItemInSlot = slots[targetSlotIdx];

    // Find where the correct item is currently residing. Is it in the slots or the pool?
    const inPoolIdx = pool.findIndex((p) => p?.id === correctItem.id);
    const inSlotIdx = slots.findIndex((s) => s?.id === correctItem.id);

    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];

      // Plop correct item into the target slot
      newSlots[targetSlotIdx] = correctItem;

      // If the correct item was in another slot previously, clear that old slot
      if (inSlotIdx !== -1 && inSlotIdx !== targetSlotIdx) {
        newSlots[inSlotIdx] = null;
      }

      return newSlots;
    });

    setPool((prevPool) => {
      const newPool = [...prevPool];

      // If correct item was in the pool, empty its spot
      if (inPoolIdx !== -1) {
        newPool[inPoolIdx] = null;
      }

      // If we displaced an incorrect item, throw it into an open pool spot
      if (currentItemInSlot !== null && currentItemInSlot.id !== correctItem.id) {
        const emptyPoolIdx = newPool.findIndex((p) => p === null);
        if (emptyPoolIdx !== -1) {
          newPool[emptyPoolIdx] = currentItemInSlot;
        }
      }

      return newPool;
    });

    setHintsUsed((prev) => prev + 1);
  };

  const isAllFilled = slots.every((slot) => slot !== null);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto h-[600px]">
      {/* Title */}
      <h2 className="text-center font-bold text-2xl text-[#9956DE]">
        {config.sequenceTitle}
      </h2>

      {/* Target Slots Area */}
      <div className="bg-[#F3E8FF] rounded-3xl p-4 sm:p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex flex-wrap items-center justify-center gap-2 md:gap-3 border-4 border-[#E9D5FF] shadow-inner relative overflow-hidden">
        {slots.map((slot, idx) => (
          <Fragment key={`slot-wrapper-${idx}`}>
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-xl md:rounded-2xl flex items-center justify-center relative transition-all duration-300 ease-out flex-shrink-0
                ${slot
                  ? 'bg-white border-[3px] md:border-4 border-b-[6px] md:border-b-8 border-[#C084FC] shadow-sm transform hover:scale-[1.02]'
                  : 'bg-[#FAF5FF] border-[3px] md:border-4 border-dashed border-[#D8B4FE] shadow-inner'
                }`}
            >
              {slot && (
                <div className="animate-in zoom-in duration-300 relative w-full h-full flex items-center justify-center">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleSlotRemove(slot, idx)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF4B4B] rounded-full text-white flex items-center justify-center hover:bg-[#E53935] hover:scale-110 active:scale-95 transition-all shadow-md z-10 border-2 border-white"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>

                  {/* Content */}
                  {slot.isImage ? (
                    <Image src={slot.content} alt={`Item ${idx}`} width={70} height={70} className="w-10 h-10 md:w-[70px] md:h-[70px] object-contain drop-shadow-sm" />
                  ) : (
                    <span className="text-3xl sm:text-4xl md:text-6xl drop-shadow-sm">{slot.content}</span>
                  )}
                </div>
              )}
            </div>

            {/* Sequence Arrow */}
            {idx < slots.length - 1 && (
              <div className="flex items-center justify-center text-[#D8B4FE] flex-shrink-0 px-0.5 md:px-1">
                <FaArrowRight className="w-4 h-4 md:w-8 md:h-8 opacity-80" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Item Pool Area */}
      <div className="bg-[#FAF5FF] rounded-3xl p-6 md:p-8 min-h-[140px] md:min-h-[180px] flex flex-wrap items-center justify-center gap-3 md:gap-6 border-4 border-[#E9D5FF] shadow-inner relative">
        <div className="absolute top-2 left-3 md:top-3 md:left-4 text-xs md:text-sm font-bold text-[#D8B4FE] uppercase tracking-wider">
          ลากหรือแตะเพื่อนำไปวาง
        </div>

        {pool.map((item, idx) => (
          <div
            key={`pool-${idx}`}
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 mt-2 md:mt-0
              ${item
                ? 'bg-white shadow-[0_4px_0_#C084FC] md:shadow-[0_6px_0_#C084FC] cursor-pointer hover:-translate-y-2 hover:shadow-[0_6px_0_#C084FC] md:hover:shadow-[0_8px_0_#C084FC] active:translate-y-1 active:shadow-none border-[3px] md:border-4 border-[#E9D5FF] hover:border-[#C084FC]'
                : 'opacity-0 scale-90'}`}
            onClick={() => item ? handleItemSelect(item, idx) : null}
          >
            {item && (
              <div className="animate-in fade-in duration-300">
                {item.isImage ? (
                  <Image src={item.content} alt="Draggable Item" width={70} height={70} className="w-10 h-10 md:w-[70px] md:h-[70px] object-contain drop-shadow-sm" />
                ) : (
                  <span className="text-3xl sm:text-4xl md:text-6xl drop-shadow-sm">{item.content}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 sm:gap-6 mt-auto pb-4">
        <button
          onClick={handleCheck}
          disabled={!isAllFilled || isCompleted}
          className={`flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-white text-base sm:text-xl transition-all
            ${isAllFilled
              ? 'bg-[#58CC02] hover:bg-[#46A302] shadow-[0_4px_0_#46A302] sm:shadow-[0_6px_0_#46A302] active:translate-y-1.5 active:shadow-[0_0px_0_#46A302]'
              : 'bg-[#E5E5E5] text-[#AFAFAF] shadow-[0_4px_0_#D1D1D1] sm:shadow-[0_6px_0_#D1D1D1] cursor-not-allowed hidden'
            }`}
        >
          <FaCheck className="w-4 h-4 sm:w-5 sm:h-5" /> ตรวจสอบ (Check)
        </button>

        <button
          onClick={handleHint}
          disabled={isCompleted || isAllFilled}
          className={`flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-white text-base sm:text-xl transition-all 
            bg-[#1CB0F6] hover:bg-[#1899D6] shadow-[0_4px_0_#1899D6] sm:shadow-[0_6px_0_#1899D6] active:translate-y-1.5 active:shadow-[0_0px_0_#1899D6] 
            ${isAllFilled ? 'hidden' : ''}`}
        >
          <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5" /> คำใบ้ (Hint)
        </button>
      </div>
    </div>
  );
}