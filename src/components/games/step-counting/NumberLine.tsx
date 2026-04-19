"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { WoodLog } from "./WoodLog";
import { StartPlatform } from "./StartPlatform";
import { WaterStrip } from "./WaterStrip";

// ── Draggable block sitting on an occupied slot ───────────────
function DraggableSlotBlock({ slotIndex, value }: { slotIndex: number; value: number }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `slot-block-${slotIndex}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        absolute inset-[-3px] rounded-2xl font-black text-2xl text-white
        flex items-center justify-center
        bg-sky-500 shadow-[0_4px_0_#1D4ED8]
        cursor-grab active:cursor-grabbing select-none touch-none
        transition-opacity
        ${isDragging ? "opacity-30" : "hover:-translate-y-0.5"}
      `}
    >
      {value}
    </div>
  );
}

// ── Droppable log slot (drop zone + WoodLog) ──────────────────
function DroppableLog({
  slotIndex,
  value,
  isLast,
  result,
  operator,
}: {
  slotIndex: number;
  value: number | null;
  isLast: boolean;
  result?: "correct" | "wrong" | null;
  operator: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${slotIndex}` });

  const dropBorder =
    result === "correct"
      ? "border-emerald-400 bg-emerald-50"
      : result === "wrong"
        ? "border-red-400 bg-red-50"
        : isOver
          ? "border-amber-400 bg-amber-50 scale-105"
          : value !== null
            ? "border-sky-300 bg-sky-50"
            : "border-dashed border-white/60 bg-white/20";

  return (
    <div className="relative flex flex-col items-center shrink-0">
      {/* 🏁 above last log */}
      {isLast && (
        <div className="absolute flex flex-col items-center pointer-events-none" style={{ top: -56 }}>
          <span className="text-4xl drop-shadow-md">🏁</span>
        </div>
      )}

      {/* Drop zone on top of log */}
      <div
        ref={setNodeRef}
        className={`
          relative flex items-center justify-center
          w-[72px] h-[52px] mb-2 rounded-2xl border-[3px]
          transition-all duration-200 ${dropBorder}
        `}
      >
        {value !== null ? (
          <DraggableSlotBlock slotIndex={slotIndex} value={value} />
        ) : (
          <span className="text-white/70 font-black text-2xl select-none">?</span>
        )}
      </div>

      {/* Log with painted operator */}
      <div className="relative flex justify-center">
        <WoodLog width={120} height={60} filled={value !== null} isOver={isOver} />
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none translate-x-[6px] transition-transform duration-200 origin-center ${isOver ? 'scale-105' : 'scale-100'}`}>
          <span className="text-2xl font-black text-white/90 select-none pb-1" style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}>
            {operator}
          </span>
        </div>
      </div>

      {/* Result indicator (Absolute so it doesn't push the WoodLog up) */}
      <div className="absolute -bottom-8 w-full flex justify-center pointer-events-none">
        {result === "correct" && (
          <span className="text-2xl font-black text-emerald-400 select-none drop-shadow-md" style={{ animation: "bounceIn 0.3s ease-out" }}>✓</span>
        )}
        {result === "wrong" && (
          <span className="text-2xl font-black text-red-500 select-none drop-shadow-md" style={{ animation: "shake 0.4s ease-in-out" }}>✗</span>
        )}
      </div>
    </div>
  );
}

// ── FloatingLog wrapper ────────────────────────────────────────
function FloatingLog({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div
      className="float-log"
      style={{ animationDelay: `${(index * 0.37) % 2}s` }}
    >
      {children}
    </div>
  );
}

// ── Main NumberLine ───────────────────────────────────────────
interface NumberLineProps {
  startValue: number;
  operators: string[];
  slotValues: (number | null)[];
  checkedSlots?: ({ correct: boolean } | null)[] | null;
  boboStep?: number;
  boboState?: "idle" | "jumping" | "falling" | "success";
}

export function NumberLine({
  startValue,
  operators,
  slotValues,
  checkedSlots,
  boboStep = 0,
  boboState = "idle",
}: NumberLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const logRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [boboCoords, setBoboCoords] = useState({ x: 0, w: 0 });

  useEffect(() => {
    // Determine target element
    const targetEl = boboStep === 0 ? startRef.current : logRefs.current[boboStep - 1];
    if (targetEl) {
      setBoboCoords({ x: targetEl.offsetLeft, w: targetEl.offsetWidth });
      // Scroll into view gently if jumping to the right
      if (containerRef.current && targetEl.offsetLeft > containerRef.current.scrollLeft + containerRef.current.clientWidth - 200) {
        containerRef.current.scrollTo({ left: targetEl.offsetLeft - 100, behavior: "smooth" });
      } else if (containerRef.current && boboStep === 0) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }, [boboStep, operators]);

  return (
    <div className="w-full overflow-x-auto hide-scrollbar scroll-smooth" ref={containerRef}>
      <div
        className="relative flex items-end w-max min-w-full px-6 sm:px-12"
        style={{ paddingBottom: 40, paddingTop: 180 }}
      >
        {/* Decorative water strip */}
        <WaterStrip />

        {/* Global Bobo Layer */}
        <div
          className="absolute z-50 origin-bottom flex items-end justify-center pointer-events-none float-log"
          style={{
            bottom: 85,
            left: boboCoords.x + boboCoords.w / 2 - 48,
            transition: boboStep === 0 ? "none" : "left 0.9s linear",
            visibility: boboCoords.w === 0 ? "hidden" : "visible",
            animationDelay: `${(boboStep * 0.37) % 2}s`,
            animationPlayState: boboState !== "idle" ? "paused" : "running",
          }}
        >
          <div
            className={`
              flex flex-col items-center justify-end
              ${boboState === "jumping" ? "animate-hop-arc" : ""}
              ${boboState === "falling" ? "animate-fall-water" : ""}
            `}
          >
            <Image
              src="/images/P_Bobo/bobo-01.svg"
              alt="Bobo"
              width={96}
              height={96}
              className="object-contain drop-shadow-md"
            />
          </div>

          {/* Splash Effect */}
          {boboState === "falling" && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/70 blur-[3px] rounded-[100%] animate-ping" />
          )}
        </div>

        {/* Start platform */}
        <div ref={startRef}>
          <FloatingLog index={0}>
            <StartPlatform value={startValue} />
          </FloatingLog>
        </div>

        {/* Rope + Log for each step */}
        {operators.map((op, i) => {
          const result =
            checkedSlots?.[i]?.correct === true
              ? "correct"
              : checkedSlots?.[i]?.correct === false
                ? "wrong"
                : null;

          return (
            <div key={i} className="flex items-end ml-8" ref={(el) => { logRefs.current[i] = el; }}>
              <FloatingLog index={i + 1}>
                <DroppableLog
                  slotIndex={i}
                  value={slotValues[i] ?? null}
                  isLast={i === operators.length - 1}
                  result={result}
                  operator={op}
                />
              </FloatingLog>
            </div>
          );
        })}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes floatLog {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        .float-log {
          animation: floatLog 3s ease-in-out infinite;
        }

        @keyframes hopArc {
          0%   { transform: translateY(0) scale(1); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
          50%  { transform: translateY(-110px) scale(1.05); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes fallWater {
          0%   { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          40%  { transform: translateY(80px) scale(0.6) rotate(90deg); opacity: 0.8; }
          100% { transform: translateY(200px) scale(0) rotate(180deg); opacity: 0; }
        }
        .animate-hop-arc {
          animation: hopArc 0.9s forwards;
        }
        .animate-fall-water {
          animation: fallWater 1s forwards;
        }
      `}</style>
    </div>
  );
}
