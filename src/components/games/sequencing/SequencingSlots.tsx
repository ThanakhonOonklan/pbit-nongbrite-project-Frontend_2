import { Fragment } from "react";
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
  if (count === 6) return 6;
  if (count === 7) return 4;
  if (count === 8) return 4;
  if (count === 9) return 5;
  return 5;
}

function getSizeByRow(itemsPerRow: number) {
  if (itemsPerRow <= 2) return { box: "w-32 h-32 sm:w-36 sm:h-36", text: "text-5xl sm:text-7xl", img: "w-20 h-20 sm:w-24 sm:h-24", btn: "w-8 h-8 -top-3 -right-3", btnIcon: "w-4 h-4", gap: "gap-2.5 sm:gap-3", arrowSize: "w-3.5 h-3.5" };
  if (itemsPerRow <= 3) return { box: "w-24 h-24 sm:w-28 sm:h-28", text: "text-4xl sm:text-5xl", img: "w-14 h-14 sm:w-16 sm:h-16", btn: "w-7 h-7 -top-2.5 -right-2.5", btnIcon: "w-3.5 h-3.5", gap: "gap-2 sm:gap-3", arrowSize: "w-3 h-3 sm:w-3.5 sm:h-3.5" };
  if (itemsPerRow <= 4) return { box: "w-16 h-16 sm:w-20 sm:h-20", text: "text-3xl sm:text-4xl", img: "w-10 h-10 sm:w-12 sm:h-12", btn: "w-6 h-6 -top-2 -right-2", btnIcon: "w-3 h-3", gap: "gap-2", arrowSize: "w-3 h-3" };
  if (itemsPerRow <= 5) return { box: "w-[52px] h-[52px] sm:w-16 sm:h-16", text: "text-2xl sm:text-3xl", img: "w-8 h-8 sm:w-10 sm:h-10", btn: "w-5 h-5 -top-1.5 -right-1.5", btnIcon: "w-2.5 h-2.5", gap: "gap-1 sm:gap-2", arrowSize: "w-2.5 h-2.5 sm:w-3 sm:h-3" };
  return { box: "w-11 h-11 sm:w-14 sm:h-14", text: "text-xl sm:text-2xl", img: "w-7 h-7 sm:w-9 sm:h-9", btn: "w-4 h-4 -top-1 -right-1", btnIcon: "w-2 h-2", gap: "gap-1", arrowSize: "w-2 h-2 sm:w-2.5 sm:h-2.5" };
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
    ? "bg-red-50 border-[3px] border-b-[5px] border-red-400 shadow-sm"
    : "bg-white border-[3px] border-b-[5px] border-[#C084FC] shadow-sm hover:scale-105";

  const emptyBorder = isOver
    ? "bg-[#FDF4FF] border-[2px] border-dashed border-[#A855F7] scale-105"
    : "bg-[#FAF5FF] border-[2px] border-dashed border-[#D8B4FE]";

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
        </div>
      )}
    </div>
  );
}

// Need useState for isOver in DroppableSlot
import { useState } from "react";

export function SequencingSlots({ slots, onRemove, onDrop, correctSequence, showErrors }: SequencingSlotsProps) {
  const itemsPerRow = getItemsPerRow(slots.length);
  const sc = getSizeByRow(itemsPerRow);

  const rows: number[][] = [];
  for (let i = 0; i < slots.length; i += itemsPerRow) {
    rows.push(slots.slice(i, i + itemsPerRow).map((_, j) => i + j));
  }

  return (
    <div className="bg-[#F3E8FF] rounded-3xl p-4 sm:p-6 border-4 border-[#E9D5FF] shadow-inner w-full">
      <div className="flex flex-col items-center gap-4 sm:gap-5">
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
                    <div className="flex items-center justify-center text-[#D8B4FE] flex-shrink-0">
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
