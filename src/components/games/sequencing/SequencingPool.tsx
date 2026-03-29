import Image from "next/image";
import { useState } from "react";
import { type SequencingItem } from "@/constants/games/sequencing-levels";

interface SequencingPoolProps {
  pool: (SequencingItem | null)[];
  onSelect: (item: SequencingItem, index: number) => void;
  slotCount: number;
  onSlotDrop?: (item: SequencingItem, slotIndex: number, poolIndex: number) => void;
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
          <div className="bg-[#2D1B4E] text-purple-200 text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl border border-purple-800">
            {item.label}
          </div>
          <div className="flex justify-center">
            <div className="border-4 border-transparent border-t-[#2D1B4E] w-0 h-0" />
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
          bg-[#1E2C33] shadow-[0_4px_0_#6D28D9] hover:-translate-y-1.5 hover:shadow-[0_6px_0_#7C3AED]
          active:translate-y-1 active:shadow-none border-[2px] border-[#2D3F55] hover:border-[#7C3AED]
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

export function SequencingPool({ pool, onSelect, slotCount, onSlotDrop }: SequencingPoolProps) {
  const itemsPerRow = getItemsPerRow(slotCount);
  const sc = getSizeByRow();
  const [isPoolOver, setIsPoolOver] = useState(false);

  const rows: (SequencingItem | null)[][] = [];
  for (let i = 0; i < pool.length; i += itemsPerRow) {
    rows.push(pool.slice(i, i + itemsPerRow));
  }

  return (
    <div
      className={`bg-[#182029] rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 border-[3px] sm:border-4 ${
        isPoolOver ? "border-[#7C3AED] ring-2 ring-[#7C3AED]/30" : "border-[#2D3F55]"
      } shadow-inner w-full relative z-10 transition-all duration-150`}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("application/sequencing-slot-item")) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          setIsPoolOver(true);
        }
      }}
      onDragLeave={(e) => {
        // only clear when leaving the pool container itself
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsPoolOver(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsPoolOver(false);
        try {
          const raw = e.dataTransfer.getData("application/sequencing-slot-item");
          if (!raw) return;
          const data = JSON.parse(raw) as { item: SequencingItem; slotIndex: number };
          const emptyIdx = pool.findIndex((p) => p === null);
          if (emptyIdx !== -1 && onSlotDrop) {
            onSlotDrop(data.item, data.slotIndex, emptyIdx);
          }
        } catch {
          // ignore
        }
      }}
    >
      <p className="text-[10px] sm:text-xs font-bold text-[#7C3AED] uppercase tracking-wider text-center">
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
