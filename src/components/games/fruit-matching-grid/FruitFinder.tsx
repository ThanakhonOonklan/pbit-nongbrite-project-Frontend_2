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
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaSearch className="w-4 h-4 text-blue-500" />
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          Find These Fruits:
        </h3>
      </div>

      {/* Target list */}
      <div className="flex flex-col gap-3">
        {targets.map((fruit, idx) => {
          const result = answerResults ? answerResults[idx] : null;
          const borderClass =
            result === true
              ? "border-green-400 bg-green-50 ring-2 ring-green-200"
              : result === false
                ? "border-red-400 bg-red-50 ring-2 ring-red-200"
                : "border-slate-200 bg-white";

          return (
            <div key={idx} className="flex items-center gap-3">
              {/* Fruit emoji */}
              <span className="text-2xl sm:text-3xl select-none w-10 text-center shrink-0">
                {fruit}
              </span>

              {/* Input */}
              <input
                type="text"
                placeholder="e.g. C3"
                maxLength={3}
                value={userAnswers[idx]}
                onChange={(e) =>
                  onAnswerChange(idx, e.target.value.toUpperCase())
                }
                disabled={disabled}
                className={`
                                    w-24 px-3 py-2 rounded-lg border-2 text-sm font-semibold
                                    text-center text-slate-700 placeholder-slate-300
                                    outline-none transition-all duration-200
                                    focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    ${borderClass}
                                `}
              />

              {/* Feedback icon */}
              {result === true && (
                <span className="text-green-500 text-lg animate-bounce">✓</span>
              )}
              {result === false && (
                <span className="text-red-500 text-lg animate-shake">✗</span>
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
                    mt-5 w-full py-3 rounded-xl text-white font-bold text-base
                    transition-all duration-200 shadow-md
                    ${allFilled && !disabled
            ? "bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 hover:shadow-lg cursor-pointer active:scale-[0.98]"
            : "bg-slate-300 cursor-not-allowed"
          }
                `}
      >
        Check Answers
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
