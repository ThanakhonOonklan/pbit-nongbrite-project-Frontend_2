import { Fragment, useState } from "react";
import Image from "next/image";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { type SequencingItem } from "@/constants/games/sequencing-levels";

interface SequencingSlotsProps {
  slots: (SequencingItem | null)[];
  onRemove: (item: SequencingItem, index: number) => void;
  onDrop: (item: SequencingItem, poolIndex: number, slotIndex: number) => void;
  correctSequence?: SequencingItem[];
  showErrors?: boolean;
}

function getItemsPerRow(count: number): number {
  if (count <= 5) return count;
  if (count === 6) return 3;
  if (count === 7) return 4;
  if (count === 8) return 4;
  if (count === 9) return 5;
  if (count >= 10) return 5;
  return 5;
}

function getSizeByRow() {
  return { 
    box: "w-[54px] h-[54px] sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24", 
    text: "text-2xl sm:text-3xl lg:text-4xl", 
    img: "w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16", 
    btn: "w-5 h-5 -top-1.5 -right-1.5 sm:w-6 sm:h-6 sm:-top-2 sm:-right-2 md:w-7 md:h-7 lg:w-8 lg:h-8", 
    btnIcon: "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5", 
    gap: "gap-1 sm:gap-2 md:gap-3 lg:gap-4", 
    arrowSize: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" 
  };
}

function DroppableSlot({
  slot,
  idx,
  onRemove,
  onDrop,
  isWrong,
  sc,
}: {
  slot: SequencingItem | null;
  idx: number;
  onRemove: (item: SequencingItem, index: number) => void;
  onDrop: (item: SequencingItem, poolIndex: number, slotIndex: number) => void;
  isWrong: boolean;
  sc: ReturnType<typeof getSizeByRow>;
}) {
  const [isOver, setIsOver] = useState(false);

  const filledBorder = isWrong
    ? "bg-red-900/40 border-[3px] border-b-[5px] border-red-400 shadow-sm"
    : "bg-[#1E2C33] border-[3px] border-b-[5px] border-[#7C3AED] shadow-sm hover:scale-105";

  const emptyBorder = isOver
    ? "bg-[#1E2C33] border-[2px] border-dashed border-[#A855F7] scale-105"
    : "bg-[#182029] border-[2px] border-dashed border-[#4B3066]";

  return (
    <div
      className={`${sc.box} rounded-xl flex items-center justify-center relative transition-all duration-300 ease-out flex-shrink-0 shadow-inner
        ${slot ? filledBorder : emptyBorder}`}
      onDragOver={(e) => {
        // Only accept drop if slot is empty
        if (!slot) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          setIsOver(true);
        }
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        if (slot) return; // already filled
        try {
          const data = JSON.parse(e.dataTransfer.getData("application/sequencing-item"));
          onDrop(data.item, data.poolIndex, idx);
        } catch {
          // ignore malformed data
        }
      }}
    >
      {slot && (
        <div className="animate-in zoom-in duration-300 relative w-full h-full flex items-center justify-center">
          <button
            onClick={() => onRemove(slot, idx)}
            className={`absolute ${sc.btn} bg-[#FF4B4B] rounded-full text-white flex items-center justify-center hover:bg-[#E53935] hover:scale-110 active:scale-95 transition-all shadow-md z-10 border-2 border-white`}
          >
            <FaTimes className={sc.btnIcon} />
          </button>

          {slot.isImage ? (
            <Image src={slot.content} alt={`Item ${idx}`} width={64} height={64}
              className={`${sc.img} object-contain drop-shadow-sm pointer-events-none`} />
          ) : (
            <span className={`${sc.text} drop-shadow-sm pointer-events-none`}>
              {slot.content}
            </span>
          )}

          {/* Persistent Tooltip */}
          {slot.label && (
            <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="border-4 border-transparent border-b-[#C084FC] w-0 h-0" />
              <div className="bg-[#2D1B4E] text-purple-200 text-[10px] sm:text-[11px] md:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md whitespace-nowrap shadow-md border border-purple-800">
                {slot.label}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



export function SequencingSlots({ slots, onRemove, onDrop, correctSequence, showErrors }: SequencingSlotsProps) {
  const itemsPerRow = getItemsPerRow(slots.length);
  const sc = getSizeByRow();

  // Build structured rows
  const rows: number[][] = [];
  for (let i = 0; i < slots.length; i += itemsPerRow) {
    rows.push(slots.slice(i, i + itemsPerRow).map((_, j) => i + j));
  }

  return (
    <div className="bg-[#1a2535] rounded-2xl sm:rounded-3xl p-2 sm:p-4 border-[3px] sm:border-4 border-[#2D3F55] shadow-inner w-full sm:min-h-0">
      
      {/* Unified View for all sizes: Strict Rows */}
      <div className="flex flex-col items-center gap-8 sm:gap-10 pt-1 pb-6 sm:pb-8 px-1 sm:px-2 w-full">
        {rows.map((rowIndices, rowIdx) => (
          <div key={`row-${rowIdx}`} className={`flex items-center justify-center ${sc.gap}`}>
            {rowIndices.map((idx) => {
              const slot = slots[idx];
              const isWrong = !!(showErrors && slot && correctSequence && slot.id !== correctSequence[idx]?.id);
              const isLastInRow = idx === rowIndices[rowIndices.length - 1];

              return (
                <Fragment key={`slot-${idx}`}>
                  <DroppableSlot slot={slot} idx={idx} onRemove={onRemove} onDrop={onDrop} isWrong={isWrong} sc={sc} />
                  {!isLastInRow && (
                    <div className="flex items-center justify-center text-[#7C3AED] flex-shrink-0">
                      <FaArrowRight className={`${sc.arrowSize} opacity-60`} />
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
