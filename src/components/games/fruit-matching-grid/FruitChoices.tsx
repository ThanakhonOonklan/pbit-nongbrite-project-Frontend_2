"use client";

import { useState, useCallback } from "react";

interface FruitChoicesProps {
  choices: string[];
  correctAnswer: string;
  fruitNames: Record<string, string>;
  onCorrect: () => void;
  onWrong: () => void;
  disabled: boolean;
}

export function FruitChoices({
  choices,
  correctAnswer,
  fruitNames,
  onCorrect,
  onWrong,
  disabled,
}: FruitChoicesProps) {
  const [shakingIdx, setShakingIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);

  const handleSelect = useCallback((fruit: string, idx: number) => {
    if (disabled || shakingIdx !== null || correctIdx !== null) return;

    if (fruit === correctAnswer) {
      setCorrectIdx(idx);
      setTimeout(() => {
        setCorrectIdx(null);
        onCorrect();
      }, 600);
    } else {
      setShakingIdx(idx);
      onWrong();
      setTimeout(() => setShakingIdx(null), 500);
    }
  }, [disabled, shakingIdx, correctIdx, correctAnswer, onCorrect, onWrong]);

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      {choices.map((fruit, idx) => {
        const isShaking = shakingIdx === idx;
        const isCorrect = correctIdx === idx;

        return (
          <button
            key={`${fruit}-${idx}`}
            type="button"
            disabled={disabled || shakingIdx !== null || correctIdx !== null}
            onClick={() => handleSelect(fruit, idx)}
            className={`
              flex flex-col items-center justify-center gap-3
              rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 border-[3px] sm:border-4
              min-h-[140px] sm:min-h-[160px]
              transition-all duration-200 ease-out relative overflow-hidden
              ${isCorrect
                ? "bg-white border-green-400 ring-4 ring-green-200 scale-105 shadow-[0_6px_0_0_#4ade80]"
                : isShaking
                ? "bg-white border-red-400 shadow-[0_6px_0_0_#f87171]"
                : disabled
                ? "bg-white border-slate-200 shadow-[0_6px_0_0_#cbd5e1] opacity-60 cursor-default"
                : "bg-white border-slate-200 shadow-[0_6px_0_0_#cbd5e1] hover:-translate-y-1 hover:shadow-[0_8px_0_0_#A4C500] hover:border-[#A4C500] cursor-pointer active:translate-y-[6px] active:shadow-none"}
              ${isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""}
            `}
          >
            {/* Highlight bubble effect in background */}
            {!isCorrect && !isShaking && (
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-50 rounded-full opacity-60 pointer-events-none" />
            )}

            <div className="flex-1 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110">
              <span className="text-5xl sm:text-6xl drop-shadow-md">
                {fruit}
              </span>
            </div>
            
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-100 text-slate-500 shrink-0 relative z-10
                            border-b-2 border-slate-200 rounded-full flex items-center justify-center w-[85%] max-w-[120px]">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider leading-none truncate">
                {fruitNames[fruit] || ""}
              </span>
            </div>
          </button>
        );
      })}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
