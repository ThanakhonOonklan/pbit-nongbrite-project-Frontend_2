"use client";

import { useState } from "react";

interface QuestionPanelProps {
  choices: number[];
  correctSteps: number;
  onAnswer: (answer: number) => void;
  disabled: boolean;
}

export function QuestionPanel({
  choices,
  correctSteps,
  onAnswer,
  disabled,
}: QuestionPanelProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  const handleClick = (choice: number, idx: number) => {
    if (disabled || selected === correctSteps) return;

    setSelected(choice);

    if (choice === correctSteps) {
      onAnswer(choice);
    } else {
      // Wrong answer — shake then reset
      setShakeIdx(idx);
      setTimeout(() => {
        setShakeIdx(null);
        setSelected(null);
      }, 600);
      onAnswer(choice);
    }
  };

  const getButtonStyle = (choice: number, idx: number) => {
    if (selected === null) {
      return "bg-white hover:bg-orange-50 border-gray-200 hover:border-orange-300 text-gray-700 hover:shadow-md";
    }
    if (choice === correctSteps && selected === correctSteps) {
      return "bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-400 text-emerald-700 shadow-lg shadow-emerald-100";
    }
    if (choice === selected && choice !== correctSteps) {
      return "bg-gradient-to-br from-red-50 to-rose-50 border-red-400 text-red-600 shadow-lg shadow-red-100";
    }
    return "bg-gray-50 border-gray-200 text-gray-300";
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      {/* Question text */}
      <div
        className="w-full text-center px-5 py-3.5 rounded-2xl border-2 border-dashed"
        style={{
          borderColor: "#F5C542",
          backgroundColor: "rgba(245, 197, 66, 0.08)",
        }}
      >
        <p className="text-sm font-bold text-orange-500">
          🐻 หมีต้องเดินไปถึงธง 🚩
        </p>
        <p className="text-base font-extrabold mt-1.5 text-gray-700">
          ต้องเดิน{" "}
          <span
            className="text-xl font-black text-orange-500 px-1"
            style={{ textShadow: "0 1px 2px rgba(255,107,53,0.2)" }}
          >
            กี่ก้าว
          </span>{" "}
          ถึงจะถึงเป้าหมาย?
        </p>
      </div>

      {/* Choice buttons */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(choice, idx)}
            disabled={disabled || selected === correctSteps}
            className={`
                            relative py-3.5 rounded-2xl border-2 text-2xl font-extrabold
                            transition-all duration-200 cursor-pointer
                            disabled:cursor-not-allowed
                            active:scale-95
                            ${getButtonStyle(choice, idx)}
                            ${shakeIdx === idx ? "animate-shake" : ""}
                        `}
            style={{
              boxShadow: selected === null ? "0 2px 8px rgba(0,0,0,0.06)" : undefined,
            }}
          >
            {choice}

            {/* Correct indicator */}
            {choice === correctSteps && selected === correctSteps && (
              <span className="absolute top-1.5 right-2.5 text-emerald-500 text-base">✓</span>
            )}
            {/* Wrong indicator */}
            {choice === selected && choice !== correctSteps && (
              <span className="absolute top-1.5 right-2.5 text-red-400 text-base">✗</span>
            )}
          </button>
        ))}
      </div>

      {/* Shake animation */}
      <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-6px); }
                    40% { transform: translateX(6px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
    </div>
  );
}
