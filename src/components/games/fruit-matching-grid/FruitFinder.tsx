"use client";

import { FaSearch, FaCheckCircle } from "react-icons/fa";

interface FruitFinderProps {
  targets: string[];
  targetCoordinates: string[];
  currentIndex: number;
  disabled: boolean;
}

export function FruitFinder({
  targets,
  targetCoordinates,
  currentIndex,
  disabled,
}: FruitFinderProps) {
  const currentCoord = targetCoordinates[currentIndex];

  return (
    <div className="flex flex-col gap-4 w-full h-full">

      {/* ── Current Objective Card ── */}
      {!disabled && currentCoord ? (
        <div
          className="rounded-[2rem] p-4 sm:p-5 flex flex-col items-center gap-3 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)", border: "4px solid #fef3c7" }}
        >
          <div className="flex items-center gap-2">
            <FaSearch className="w-5 h-5 text-white animate-pulse drop-shadow-sm" />
            <p className="text-white font-black text-sm sm:text-base uppercase tracking-wide drop-shadow-sm">จิ้มหาช่องนี้!</p>
          </div>

          {/* Big coordinate badge */}
          <div className="bg-white rounded-2xl px-8 py-3 shadow-inner">
            <span className="text-4xl sm:text-5xl font-black" style={{ color: "#d97706" }}>
              {currentCoord}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-5 flex flex-col items-center gap-2 shadow-md"
          style={{ background: "linear-gradient(135deg, #4ade80 0%, #86efac 100%)" }}
        >
          <span className="text-4xl">🎉</span>
          <p className="text-white font-black text-lg">เก่งมากเลย!</p>
          <p className="text-white/80 text-sm font-bold">หาครบทุกผลไม้แล้ว!</p>
        </div>
      )}

      {/* ── Target list ── */}
      <div className="flex flex-col gap-2.5 flex-1">
        <p className="text-xs font-black uppercase text-slate-400 tracking-wider px-1">
          รายการผลไม้ที่ต้องหา
        </p>

        <div className="flex flex-col gap-2">
          {targets.map((fruit, idx) => {
            const isFound = idx < currentIndex;
            const isCurrent = idx === currentIndex && !disabled;
            const coord = targetCoordinates[idx];

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 border-2
                  ${isFound
                    ? "bg-green-50 border-green-200 opacity-80 scale-[0.97]"
                    : isCurrent
                    ? "bg-white border-[#f59e0b] shadow-[0_0_0_4px_rgba(245,158,11,0.2)] scale-[1.02]"
                    : "bg-slate-50 border-slate-100 opacity-50"}
                `}
              >
                {/* Step number */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0
                    ${isFound
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "text-white"
                      : "bg-slate-200 text-slate-400"}
                  `}
                  style={isCurrent ? { background: "#f59e0b" } : {}}
                >
                  {isFound ? <FaCheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                {/* Coordinate */}
                <span
                  className={`text-xl font-black w-10 shrink-0
                    ${isFound ? "text-green-600" : isCurrent ? "text-[#f59e0b]" : "text-slate-300"}
                  `}
                >
                  {coord}
                </span>

                {/* Fruit emoji */}
                <div className="ml-auto flex items-center justify-center w-9 h-9">
                  {isFound ? (
                    <span className="text-2xl scale-110 drop-shadow-sm">{fruit}</span>
                  ) : isCurrent ? (
                    <span className="text-2xl animate-pulse">{fruit}</span>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-300 font-black text-sm">?</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
