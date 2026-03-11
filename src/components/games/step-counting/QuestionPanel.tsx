"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface QuestionPanelProps {
  correctSteps: number;
  onAnswer: (answer: number) => void;
  disabled: boolean;
}

export function QuestionPanel({
  correctSteps,
  onAnswer,
  disabled,
}: QuestionPanelProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [feedback, setFeedback] = useState<"too_little" | "too_much" | null>(null);
  const [shake, setShake] = useState(false);

  const handleDecrease = () => {
    if (disabled || currentCount <= 0) return;
    setCurrentCount((prev) => prev - 1);
    setFeedback(null);
  };

  const handleIncrease = () => {
    if (disabled || currentCount >= 20) return; // arbitrary max
    setCurrentCount((prev) => prev + 1);
    setFeedback(null);
  };

  const handleConfirm = () => {
    if (disabled) return;

    if (currentCount === correctSteps) {
      setFeedback(null);
      onAnswer(currentCount);
    } else {
      setFeedback(currentCount < correctSteps ? "too_little" : "too_much");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      onAnswer(currentCount); // to record attempt
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Title */}
      <div className="text-center font-bold text-gray-500 text-sm">
        🐾 หมีจะเดิน
      </div>

      {/* Counter Display */}
      <div
        className="w-32 py-3 rounded-full border-2 border-orange-400 bg-orange-100 flex items-center justify-center shadow-sm mx-auto"
      >
        <span className="text-4xl font-black text-gray-800 mr-2 drop-shadow-sm">
          {currentCount}
        </span>
        <span className="text-lg font-bold text-gray-600 mt-1">ก้าว</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 w-full mt-2">
        {/* Minus Button */}
        <button
          onClick={handleDecrease}
          disabled={disabled || currentCount <= 0}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black
            bg-red-500 shadow-[0_6px_0_#C53030] active:shadow-none active:translate-y-[6px] transition-all
            ${disabled || currentCount <= 0 ? "opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_6px_0_#C53030]" : "hover:bg-red-400"}
          `}
        >
          <FaMinus />
        </button>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={disabled}
          className={`
            flex-1 h-16 rounded-3xl flex items-center justify-center text-white text-xl font-extrabold gap-2
            bg-orange-300 shadow-[0_6px_0_#F6AD55] active:shadow-none active:translate-y-[6px] transition-all
            ${disabled ? "opacity-80 cursor-not-allowed active:translate-y-0 active:shadow-[0_6px_0_#F6AD55]" : "hover:bg-orange-200"}
          `}
        >
          ยืนยัน!
        </button>

        {/* Plus Button */}
        <button
          onClick={handleIncrease}
          disabled={disabled || currentCount >= 20}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black
            bg-emerald-400 shadow-[0_6px_0_#38A169] active:shadow-none active:translate-y-[6px] transition-all
            ${disabled || currentCount >= 20 ? "opacity-50 cursor-not-allowed active:translate-y-0 active:shadow-[0_6px_0_#38A169]" : "hover:bg-emerald-300"}
          `}
        >
          <FaPlus />
        </button>
      </div>

      {/* Feedback Text */}
      <div className={`h-6 text-sm font-bold text-gray-500 flex items-center gap-2 ${shake ? "animate-shake text-red-500" : ""}`}>
        🪵 🪵 {feedback === "too_little" ? "เดินยังไม่ถึงธง!" : feedback === "too_much" ? "เดินเลยธงไปแล้ว!" : "ขอนสองท่อนกลางทาง — กระโดดข้ามให้ครบ!"}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
