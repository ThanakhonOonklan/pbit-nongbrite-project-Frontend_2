import Image from "next/image";
import { type SequencingItem } from "@/constants/games/sequencing-levels";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface SequencingPoolProps {
  pool: (SequencingItem | null)[];
  slotCount: number;
}

function getItemsPerRow(count: number): number {
  return count;
}

function getSizeByRow() {
  return {
    box: "w-12 h-12 xs:w-[50px] xs:h-[50px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] lg:w-[90px] lg:h-[90px]",
    text: "text-xl xs:text-2xl sm:text-3xl lg:text-4xl",
    img: "w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-15 lg:h-15",
    gap: "gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 lg:gap-4"
  };
}

function PoolItem({
  item,
  idx,
  sc,
}: {
  item: SequencingItem;
  idx: number;
  sc: ReturnType<typeof getSizeByRow>;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `pool-item-${idx}`,
  });

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Tooltip (CSS Hover Based) */}
      {item.label && !isDragging && (
        <div className="absolute -top-10 sm:-top-11 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[#2D1B4E] text-purple-200 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl border border-purple-800">
            {item.label}
          </div>
          <div className="border-4 border-transparent border-t-[#2D1B4E] w-0 h-0" />
        </div>
      )}

      {/* Dnd-kit draggable wrapper */}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{ animation: `poolItemPop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${idx * 60}ms both` }}
        className={`${sc.box} rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none
          bg-[#1A0938]/80 backdrop-blur-sm shadow-[0_4px_0_#6D28D9] hover:-translate-y-1.5 hover:shadow-[0_6px_0_#7C3AED,0_0_16px_rgba(124,58,237,0.3)]
          active:translate-y-1 active:shadow-none border-[2px] border-[#3B1D7A] 
          transition-all duration-150
          ${isDragging ? "opacity-30 scale-95" : ""}`}
      >
        {item.isImage ? (
          <Image
            src={item.content}
            alt={item.label ?? "Item"}
            width={64}
            height={64}
            className={`${sc.img} object-contain drop-shadow-sm pointer-events-none`}
          />
        ) : (
          <span className={`${sc.text} drop-shadow-sm pointer-events-none text-white font-bold`}>
            {item.content}
          </span>
        )}
      </div>
    </div>
  );
}

export function SequencingPool({ pool, slotCount }: SequencingPoolProps) {
  const itemsPerRow = getItemsPerRow(slotCount);
  const sc = getSizeByRow();

  const { setNodeRef, isOver } = useDroppable({ id: "pool" });

  const rows: (SequencingItem | null)[][] = [];
  for (let i = 0; i < pool.length; i += itemsPerRow) {
    rows.push(pool.slice(i, i + itemsPerRow));
  }

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#0F0825]/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 border-[3px] sm:border-4 ${isOver ? "border-[#7C3AED] ring-2 ring-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.25)]" : "border-[#2D1B69]/60"
        } shadow-[inset_0_2px_10px_rgba(124,58,237,0.08)] w-full relative z-10 transition-all duration-150`}
    >
      <style>{`
        @keyframes poolItemPop {
          0%   { transform: scale(0.3) rotate(-6deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
      `}</style>
      <p className="text-[10px] sm:text-xs font-bold text-[#A855F7] uppercase tracking-wider text-center" style={{ textShadow: '0 0 8px rgba(168,85,247,0.4)' }}>
        ลากหรือแตะเพื่อนำไปวาง
      </p>

      {/* Items — structured rows matching slots exactly */}
      <div className="flex flex-col items-center justify-center pt-2 px-1 gap-2 sm:gap-3 md:gap-4">
        {rows.map((row, rowIdx) => (
          <div key={`pool-row-${rowIdx}`} className={`flex flex-wrap items-center justify-center ${sc.gap}`}>
            {row.map((item, colIdx) => {
              const originalIdx = rowIdx * itemsPerRow + colIdx;
              return (
                <div key={`pool-wrapper-${originalIdx}`} className={`relative flex-shrink-0 ${sc.box} flex items-center justify-center`}>
                  {item ? (
                    <PoolItem item={item} idx={originalIdx} sc={sc} />
                  ) : (
                    <div className={`${sc.box} rounded-xl opacity-0 pointer-events-none`} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
