"use client";

import { FaSearch } from "react-icons/fa";

interface FruitFinderProps {
  targets: string[];
  userAnswers: string[];
  answerResults: (boolean | null)[] | null;
  disabled: boolean;
  onAnswerChange: (index: number, value: string) => void;
  onCheckAnswers: () => void;
}

// Fun pastel backgrounds for each target row
const TARGET_BG_COLORS = [
  "bg-pink-50",
  "bg-yellow-50",
  "bg-green-50",
  "bg-blue-50",
  "bg-purple-50",
];

export function FruitFinder({
  targets,
  userAnswers,
  answerResults,
  disabled,
  onAnswerChange,
  onCheckAnswers,
}: FruitFinderProps) {
  const allFilled = userAnswers.every((a) => a.trim().length > 0);

  return (
    <div
      className="rounded-3xl shadow-lg p-4 sm:p-6 w-full border-2 border-white/60"
      style={{
        background: "linear-gradient(135deg, #FFF3E0 0%, #FDE8FF 50%, #E0F7FA 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">✨</span>
        <FaSearch className="w-4 h-4 text-purple-500" />
        <h3 className="text-base sm:text-lg font-extrabold text-purple-700">
          หาผลไม้เหล่านี้!
        </h3>
        <span className="text-2xl">🔍</span>
      </div>

      {/* Target list */}
      <div className="flex flex-col gap-1.5">
        {targets.map((fruit, idx) => {
          const result = answerResults ? answerResults[idx] : null;
          const borderClass =
            result === true
              ? "border-green-400 bg-green-50 ring-2 ring-green-300 shadow-green-200"
              : result === false
                ? "border-red-400 bg-red-50 ring-2 ring-red-300 shadow-red-200"
                : "border-purple-200 bg-white/80";

          const rowBg = TARGET_BG_COLORS[idx % TARGET_BG_COLORS.length];

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 ${rowBg} rounded-xl px-2 py-1.5 transition-all duration-200`}
            >
              {/* Index number */}
              <span className="text-sm font-bold text-purple-400 w-5 text-center shrink-0">
                {idx + 1}.
              </span>

              {/* Fruit emoji */}
              <span className="text-xl sm:text-2xl select-none w-8 text-center shrink-0 drop-shadow-sm">
                {fruit}
              </span>

              {/* Input */}
              <input
                type="text"
                placeholder="เช่น C3"
                maxLength={3}
                value={userAnswers[idx]}
                onChange={(e) =>
                  onAnswerChange(idx, e.target.value.toUpperCase())
                }
                disabled={disabled}
                className={`
                  w-24 px-3 py-2 rounded-xl border-2 text-sm font-bold
                  text-center text-slate-700 placeholder-purple-300
                  outline-none transition-all duration-200
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-sm
                  ${borderClass}
                `}
              />

              {/* Feedback icon */}
              {result === true && (
                <span className="text-green-500 text-xl animate-bounce">✅</span>
              )}
              {result === false && (
                <span className="text-red-500 text-xl animate-shake">❌</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Check button */}
      <button
        onClick={onCheckAnswers}
        disabled={!allFilled || disabled}
        className={`
          mt-5 w-full py-3.5 rounded-2xl text-white font-extrabold text-base
          transition-all duration-200 shadow-lg
          ${allFilled && !disabled
            ? "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer active:scale-[0.98]"
            : "bg-slate-300 cursor-not-allowed"
          }
        `}
      >
        🎯 ตรวจคำตอบ!
      </button>

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
