"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";

// ── Source block (always in panel, draggable) ─────────────────
function SourceBlock({ value, disabled }: { value: number; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: "source",
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex-1 h-16 rounded-2xl font-black text-2xl text-white
        flex items-center justify-center
        bg-sky-400 shadow-[0_5px_0_#2563EB]
        cursor-grab active:cursor-grabbing select-none touch-none
        transition-opacity
        ${isDragging ? "opacity-20" : "hover:-translate-y-0.5"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {value}
    </div>
  );
}

// ── Droppable panel area (drag slot-block here to clear) ──────
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
  return (
    <DroppablePanel>

      {/* ── [-] [block] [+] row ── */}
      <div className="flex items-center gap-3">

        {/* Minus */}
        <button
          onClick={onStepperMinus}
          disabled={isChecked || stepper <= 0}
          className="
            w-14 h-14 shrink-0 rounded-2xl text-2xl font-black text-stone-600
            bg-stone-100 border-2 border-stone-300 border-b-4 shadow-sm
            hover:border-red-400 hover:bg-red-50 hover:text-red-500 hover:border-b-4
            active:translate-y-1 active:border-b-0 active:mb-1 transition-all
            disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
          "
        >
          −
        </button>

        {/* Center block — draggable */}
        <SourceBlock value={stepper} disabled={isChecked} />

        {/* Plus */}
        <button
          onClick={onStepperPlus}
          disabled={isChecked || stepper >= 50}
          className="
            w-14 h-14 shrink-0 rounded-2xl text-2xl font-black text-stone-600
            bg-stone-100 border-2 border-stone-300 border-b-4 shadow-sm
            hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-b-4
            active:translate-y-1 active:border-b-0 active:mb-1 transition-all
            disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
          "
        >
          +
        </button>
      </div>

      {/* ── Confirm ── */}
      <button
        onClick={onConfirm}
        disabled={!allSlotsFilled || isChecked}
        className="
          w-full py-3.5 rounded-2xl text-lg font-extrabold text-white
          bg-gradient-to-r from-amber-500 to-orange-500
          border-b-[4px] border-amber-700 shadow-lg shadow-amber-900/20
          active:translate-y-1 active:border-b-0 active:mb-1 transition-all
          disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
        "
      >
        ✅ ยืนยัน!
      </button>

    </DroppablePanel>
  );
}
