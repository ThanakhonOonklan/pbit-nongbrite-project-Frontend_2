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
    box: "w-[52px] h-[52px] xs:w-[56px] xs:h-[56px] sm:w-[72px] sm:h-[72px] md:w-[86px] md:h-[86px] lg:w-[98px] lg:h-[98px]",
    text: "text-lg xs:text-xl sm:text-3xl lg:text-4xl",
    img: "w-[38px] h-[38px] xs:w-[42px] xs:h-[42px] sm:w-[54px] sm:h-[54px] md:w-[66px] md:h-[66px] lg:w-[74px] lg:h-[74px]",
    btn: "w-5 h-5 -top-1.5 -right-1.5 sm:w-6 sm:h-6 sm:-top-2 sm:-right-2 md:w-7 md:h-7 lg:w-8 lg:h-8",
    btnIcon: "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4",
    gap: "gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 lg:gap-4",
    arrowSize: "w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
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
          className={`${sc.img} object-contain drop-shadow-sm pointer-events-none rounded-lg`} />
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
