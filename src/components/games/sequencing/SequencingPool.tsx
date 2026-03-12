import Image from "next/image";
import { useState } from "react";
import { type SequencingItem } from "@/constants/games/sequencing-levels";

interface SequencingPoolProps {
  pool: (SequencingItem | null)[];
  onSelect: (item: SequencingItem, index: number) => void;
  slotCount: number;
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
    gap: "gap-1 sm:gap-2 md:gap-3 lg:gap-4"
  };
}

function PoolItem({
  item,
  idx,
  onSelect,
  sc,
}: {
  item: SequencingItem;
  idx: number;
  onSelect: (item: SequencingItem, index: number) => void;
  sc: ReturnType<typeof getSizeByRow>;
}) {
  const [dragging, setDragging] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Tooltip */}
      {tooltip && item.label && !dragging && (
        <div
          className="pointer-events-none"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
        >
          <div className="bg-gray-800 text-white text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl">
            {item.label}
          </div>
          <div className="flex justify-center">
            <div className="border-4 border-transparent border-t-gray-800 w-0 h-0" />
          </div>
        </div>
      )}

      {/* Native draggable wrapper — same pattern as DirectionControls */}
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("application/sequencing-item", JSON.stringify({ item, poolIndex: idx }));
          e.dataTransfer.effectAllowed = "move";
          setDragging(true);
          setTooltip(null);
        }}
        onDragEnd={() => setDragging(false)}
        onClick={() => onSelect(item, idx)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setTooltip(null)}
        className={`${sc.box} rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing
          bg-white shadow-[0_4px_0_#C084FC] hover:-translate-y-1.5 hover:shadow-[0_6px_0_#C084FC]
          active:translate-y-1 active:shadow-none border-[2px] border-[#E9D5FF] hover:border-[#C084FC]
          transition-all duration-150
          ${dragging ? "opacity-40 scale-95" : ""}`}
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
          <span className={`${sc.text} drop-shadow-sm pointer-events-none`}>
            {item.content}
          </span>
        )}
      </div>
    </div>
  );
}

export function SequencingPool({ pool, onSelect, slotCount }: SequencingPoolProps) {
  const itemsPerRow = getItemsPerRow(slotCount);
  const sc = getSizeByRow();

  const rows: (SequencingItem | null)[][] = [];
  for (let i = 0; i < pool.length; i += itemsPerRow) {
    rows.push(pool.slice(i, i + itemsPerRow));
  }

  return (
    <div className="bg-[#FAF5FF] rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 border-[3px] sm:border-4 border-[#E9D5FF] shadow-inner w-full relative z-10">
      <p className="text-[10px] sm:text-xs font-bold text-[#D8B4FE] uppercase tracking-wider text-center">
        ลากหรือแตะเพื่อนำไปวาง
      </p>

      {/* Items — structured rows matching slots exactly */}
      <div className="flex flex-col items-center justify-center pt-2 px-1 gap-2 sm:gap-3 md:gap-4">
        {rows.map((row, rowIdx) => (
          <div key={`pool-row-${rowIdx}`} className={`flex items-center justify-center ${sc.gap}`}>
            {row.map((item, colIdx) => {
              const originalIdx = rowIdx * itemsPerRow + colIdx;
              return (
                <div key={`pool-wrapper-${originalIdx}`} className={`relative flex-shrink-0 ${sc.box} flex items-center justify-center`}>
                  {item ? (
                    <PoolItem item={item} idx={originalIdx} onSelect={onSelect} sc={sc} />
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
