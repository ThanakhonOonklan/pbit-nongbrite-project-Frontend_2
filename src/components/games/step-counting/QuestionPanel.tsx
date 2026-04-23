"use client";

import { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { TiltButton } from "react-tilt-button";

// ── Source block with Combo effects ───────────────────────────
function SourceBlock({
  value,
  disabled,
  animKey,
  action,
}: {
  value: number;
  disabled: boolean;
  animKey: number;
  action: "+" | "-" | null;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: "source",
    disabled,
  });

  const badgeColor = "#ffffff";

  return (
    <div className="flex-1 relative" style={{ height: 56 }}>
      {/* ① Floating badge (+1 / -1) */}
      {animKey > 0 && action && (
        <span
          key={`badge-${animKey}`}
          className="absolute left-1/2 z-30 pointer-events-none select-none font-black text-xl"
          style={{
            transform: "translateX(-50%)",
            top: -4,
            color: badgeColor,
            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
            animation: "srcFloatBadge 0.65s ease-out forwards",
          }}
        >
          {action === "+" ? "+1" : "-1"}
        </span>
      )}

      {/* Main draggable block — Pop animation via key remount */}
      <div
        key={`block-${animKey}`}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`
          h-full w-full rounded-2xl font-black text-2xl text-white
          flex items-center justify-center relative overflow-hidden
          bg-sky-400 shadow-[0_5px_0_#2563EB]
          cursor-grab active:cursor-grabbing select-none touch-none
          ${isDragging ? "opacity-20" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        style={{
          animation: animKey > 0 ? "srcPop 0.3s ease-out forwards" : undefined,
        }}
      >
        {value}
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes srcFloatBadge {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0px) scale(1); }
          30%  { opacity: 1; transform: translateX(-50%) translateY(-14px) scale(1.1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-38px) scale(0.85); }
        }
        @keyframes srcPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Droppable panel area ───────────────────────────────────────
function DroppablePanel({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: "panel" });
  return (
    <div ref={setNodeRef} className="flex flex-col gap-3 w-full max-w-sm mx-auto">
      {children}
    </div>
  );
}

// ── QuestionPanel ─────────────────────────────────────────────
interface QuestionPanelProps {
  stepper: number;
  onStepperMinus: () => void;
  onStepperPlus: () => void;
  allSlotsFilled: boolean;
  onConfirm: () => void;
  isChecked: boolean;
}

export function QuestionPanel({
  stepper,
  onStepperMinus,
  onStepperPlus,
  allSlotsFilled,
  onConfirm,
  isChecked,
}: QuestionPanelProps) {
  const [animKey, setAnimKey] = useState(0);
  const [lastAction, setLastAction] = useState<"+" | "-" | null>(null);

  const minusDisabled = isChecked || stepper <= 0;
  const plusDisabled = isChecked || stepper >= 50;
  const confirmDisabled = !allSlotsFilled || isChecked;

  const handleMinus = () => {
    if (minusDisabled) return;
    setLastAction("-");
    setAnimKey((k) => k + 1);
    onStepperMinus();
  };

  const handlePlus = () => {
    if (plusDisabled) return;
    setLastAction("+");
    setAnimKey((k) => k + 1);
    onStepperPlus();
  };

  return (
    <DroppablePanel>

      {/* ── [-] [block] [+] row ── */}
      <div className="flex items-center gap-3">

        {/* Minus */}
        <TiltButton
          variant="solid"
          width={56}
          height={56}
          elevation={6}
          pressInset={6}
          tilt={0.85}
          radius={14}
          motion={50}
          surfaceColor={minusDisabled ? "#9CA3AF" : "#f87171"}
          sideColor={minusDisabled ? "#6B7280" : "#dc2626"}
          textColor="#ffffff"
          glareOpacity={0}
          glareWidth={0}
          disabled={minusDisabled}
          onClick={handleMinus}
        >
          <span className="text-2xl font-black">−</span>
        </TiltButton>

        {/* Center block — draggable + animated */}
        <SourceBlock
          value={stepper}
          disabled={isChecked}
          animKey={animKey}
          action={lastAction}
        />

        {/* Plus */}
        <TiltButton
          variant="solid"
          width={56}
          height={56}
          elevation={6}
          pressInset={6}
          tilt={0.85}
          radius={14}
          motion={50}
          surfaceColor={plusDisabled ? "#9CA3AF" : "#34d399"}
          sideColor={plusDisabled ? "#6B7280" : "#059669"}
          textColor="#ffffff"
          glareOpacity={0}
          glareWidth={0}
          disabled={plusDisabled}
          onClick={handlePlus}
        >
          <span className="text-2xl font-black">+</span>
        </TiltButton>
      </div>

      {/* ── Confirm ── */}
      <TiltButton
        variant="solid"
        width="100%"
        height={56}
        elevation={6}
        pressInset={6}
        tilt={0.85}
        radius={16}
        motion={40}
        surfaceColor={confirmDisabled ? "#9CA3AF" : "#22c55e"}
        sideColor={confirmDisabled ? "#6B7280" : "#15803d"}
        textColor="#ffffff"
        glareOpacity={0}
        glareWidth={0}
        disabled={confirmDisabled}
        onClick={onConfirm}
      >
        <span className="text-lg font-extrabold">ยืนยัน</span>
      </TiltButton>

    </DroppablePanel>
  );
}
