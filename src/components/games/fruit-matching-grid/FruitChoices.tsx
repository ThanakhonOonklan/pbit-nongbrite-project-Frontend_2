"use client";

import { useState, useCallback, useRef } from "react";

const BASE = "/audio/games/fruit-matching-grid";

const FRUIT_AUDIO: Record<string, string> = {
  "\uD83C\uDF4E": `${BASE}/Apple.wav`,
  "\uD83C\uDF4A": `${BASE}/Orange.wav`,
  "\uD83C\uDF47": `${BASE}/Grape.wav`,
  "\uD83C\uDF4C": `${BASE}/Banana.wav`,
  "\uD83C\uDF53": `${BASE}/Strawberry.wav`,
  "\uD83E\uDD5D": `${BASE}/Kiwi.wav`,
  "\uD83C\uDF49": `${BASE}/Watermelon.wav`,
  "\uD83C\uDF51": `${BASE}/Peach.wav`,
  "\uD83C\uDF52": `${BASE}/Cherry.wav`,
  "\uD83C\uDF4D": `${BASE}/Pineapple.wav`,
  "\uD83E\uDED0": `${BASE}/Blueberry.wav`,
  "\uD83E\uDD6D": `${BASE}/Mango.wav`,
  "\uD83C\uDF4B": `${BASE}/Lemon.wav`,
  "\uD83C\uDF48": `${BASE}/Melon.wav`,
  "\uD83E\uDD65": `${BASE}/Coconut.wav`,
  "\uD83C\uDF50": `${BASE}/Pear.wav`,
  "\uD83E\uDD51": `${BASE}/Avocado.wav`,
  "\uD83C\uDF45": `${BASE}/Tomato.wav`,
  "\uD83E\uDD55": `${BASE}/Carrot.wav`,
  "\uD83E\uDDC5": `${BASE}/Onion.wav`,
  "\uD83E\uDD54": `${BASE}/Potato.wav`,
  "\uD83C\uDF3D": `${BASE}/Corn.wav`,
  "\uD83E\uDD66": `${BASE}/Broccoli.wav`,
  "\uD83C\uDF44": `${BASE}/Mushroom.wav`,
  "\uD83C\uDF36\uFE0F": `${BASE}/Chili.wav`,
  "\uD83E\uDD52": `${BASE}/Cucumber.wav`,
  "\uD83C\uDF46": `${BASE}/Eggplant.wav`,
  "\uD83E\uDD6C": `${BASE}/Lettuce.wav`,
};

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFruitAudio = useCallback((fruit: string) => {
    const src = FRUIT_AUDIO[fruit];
    if (!src) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const a = new Audio(src);
    audioRef.current = a;
    a.play().catch(() => {});
  }, []);

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
      className="grid gap-2 sm:gap-3"
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
            onMouseEnter={() => playFruitAudio(fruit)}
            className={`
              flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2
              rounded-xl sm:rounded-[1.5rem] md:rounded-[1.5rem] p-2.5 sm:p-3 md:p-3 lg:p-5 border-[3px] sm:border-4
              min-h-[100px] sm:min-h-[120px] md:min-h-0 lg:min-h-[140px]
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
              <span className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl drop-shadow-md">
                {fruit}
              </span>
            </div>
            
            <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-slate-100 text-slate-500 shrink-0 relative z-10
                            border-b-2 border-slate-200 rounded-full flex items-center justify-center w-[85%] max-w-[120px]">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider leading-none truncate">
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
