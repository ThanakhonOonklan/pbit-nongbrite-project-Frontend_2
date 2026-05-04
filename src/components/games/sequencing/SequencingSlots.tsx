import { Fragment } from "react";
import Image from "next/image";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { type SequencingItem } from "@/constants/games/sequencing-levels";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface SequencingSlotsProps {
  slots: (SequencingItem | null)[];
  onRemove: (item: SequencingItem, index: number) => void;
  correctSequence?: SequencingItem[];
  showErrors?: boolean;
  shakeKey?: number;  // increments each wrong attempt to re-trigger shake
}

function getItemsPerRow(count: number): number {
  return count;
}

function getSizeByRow() {
  return {
    box: "w-11 h-11 xs:w-[50px] xs:h-[50px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] lg:w-[90px] lg:h-[90px]",
    text: "text-lg xs:text-xl sm:text-3xl lg:text-4xl",
    img: "w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-15 lg:h-15",
    btn: "w-4 h-4 -top-1 -right-1 sm:w-6 sm:h-6 sm:-top-2 sm:-right-2 md:w-7 md:h-7 lg:w-8 lg:h-8",
    btnIcon: "w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5",
    gap: "gap-0.5 xs:gap-1 sm:gap-2 md:gap-3 lg:gap-4",
    arrowSize: "w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
  };
}

function DraggableSlotItem({
  slot,
  idx,
  onRemove,
  sc
}: {
  slot: SequencingItem;
  idx: number;
  onRemove: (item: SequencingItem, index: number) => void;
  sc: ReturnType<typeof getSizeByRow>;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `slot-item-${idx}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`animate-in zoom-in duration-300 relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none ${isDragging ? "opacity-30" : ""}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(slot, idx);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`absolute ${sc.btn} bg-[#FF4B4B] rounded-full text-white flex items-center justify-center hover:bg-[#E53935] hover:scale-110 active:scale-95 transition-all shadow-md z-10 border-2 border-white`}
      >
        <FaTimes className={sc.btnIcon} />
      </button>

      {slot.isImage ? (
        <Image src={slot.content} alt={`Item ${idx}`} width={64} height={64}
          className={`${sc.img} object-contain drop-shadow-sm pointer-events-none`} />
      ) : (
        <span className={`${sc.text} drop-shadow-sm pointer-events-none text-white font-black`}>
          {slot.content}
        </span>
      )}

      {/* Persistent Tooltip */}
      {slot.label && !isDragging && (
        <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center animate-in fade-in zoom-in duration-300">
          <div className="border-4 border-transparent border-b-[#C084FC] w-0 h-0" />
          <div className="bg-[#2D1B4E] text-purple-200 text-[10px] sm:text-[11px] md:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md whitespace-nowrap shadow-md border border-purple-800">
            {slot.label}
          </div>
        </div>
      )}
    </div>
  );
}

function DroppableSlot({
  slot,
  idx,
  onRemove,
  isWrong,
  shakeKey,
  sc,
}: {
  slot: SequencingItem | null;
  idx: number;
  onRemove: (item: SequencingItem, index: number) => void;
  isWrong: boolean;
  shakeKey?: number;
  sc: ReturnType<typeof getSizeByRow>;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${idx}`,
  });

  const filledBorder = isWrong
    ? "bg-red-900/40 border-[3px] border-b-[5px] border-red-400 shadow-sm"
    : isOver
      ? "bg-[#2D1B6A]/80 backdrop-blur-sm border-[3px] border-b-[5px] border-[#C084FC] scale-105 shadow-[0_0_18px_rgba(192,132,252,0.55)] ring-2 ring-[#C084FC]/40"
      : "bg-[#1A0938]/80 backdrop-blur-sm border-[3px] border-b-[5px] border-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.3)] hover:scale-105 hover:shadow-[0_0_18px_rgba(124,58,237,0.45)]";

  const emptyBorder = isOver
    ? "bg-[#1A0938]/60 backdrop-blur-sm border-[2px] border-dashed border-[#A855F7] scale-105 shadow-[0_0_14px_rgba(168,85,247,0.35)]"
    : "bg-[#0F0825]/60 backdrop-blur-sm border-[2px] border-dashed border-[#4B3066] shadow-[0_0_6px_rgba(75,48,102,0.2)]";

  return (
    <div
      ref={setNodeRef}
      key={isWrong ? shakeKey : undefined}
      className={`${sc.box} rounded-xl flex items-center justify-center relative transition-all duration-300 ease-out flex-shrink-0 shadow-inner
        ${isWrong ? "animate-shake" : ""}
        ${slot ? filledBorder : emptyBorder}`}
    >
      {slot && (
        <DraggableSlotItem slot={slot} idx={idx} onRemove={onRemove} sc={sc} />
      )}
    </div>
  );
}



export function SequencingSlots({ slots, onRemove, correctSequence, showErrors, shakeKey }: SequencingSlotsProps) {
  const itemsPerRow = getItemsPerRow(slots.length);
  const sc = getSizeByRow();

  // Build structured rows
  const rows: number[][] = [];
  for (let i = 0; i < slots.length; i += itemsPerRow) {
    rows.push(slots.slice(i, i + itemsPerRow).map((_, j) => i + j));
  }

  return (
    <div className="bg-[#130D2E]/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 sm:p-4 border-[3px] sm:border-4 border-[#2D1B69]/60 shadow-[inset_0_2px_12px_rgba(124,58,237,0.1),0_0_20px_rgba(124,58,237,0.08)] w-full sm:min-h-0">

      {/* Unified View for all sizes: Strict Rows */}
      <div className="flex flex-col items-center gap-8 sm:gap-10 pt-1 pb-6 sm:pb-8 px-1 sm:px-2 w-full">
        {rows.map((rowIndices, rowIdx) => (
          <div key={`row-${rowIdx}`} className={`flex flex-wrap items-center justify-center ${sc.gap}`}>
            {rowIndices.map((idx) => {
              const slot = slots[idx];
              const isWrong = !!(showErrors && slot && correctSequence && slot.id !== correctSequence[idx]?.id);
              const isLastInRow = idx === rowIndices[rowIndices.length - 1];

              return (
                <Fragment key={`slot-${idx}`}>
                  <DroppableSlot slot={slot} idx={idx} onRemove={onRemove} isWrong={isWrong} shakeKey={shakeKey} sc={sc} />
                  {!isLastInRow && (
                    <div className="flex items-center justify-center text-[#A855F7] flex-shrink-0" style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.5))' }}>
                      <FaArrowRight className={`${sc.arrowSize} opacity-80`} />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
