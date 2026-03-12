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
  if (count === 6) return 6;
  if (count === 7) return 4;
  if (count === 8) return 4;
  if (count === 9) return 5;
  return 5;
}

function getSizeByRow(itemsPerRow: number) {
  if (itemsPerRow <= 2) return { box: "w-32 h-32 sm:w-36 sm:h-36", text: "text-5xl sm:text-7xl", img: "w-20 h-20 sm:w-24 sm:h-24", gap: "gap-2.5 sm:gap-3" };
  if (itemsPerRow <= 3) return { box: "w-24 h-24 sm:w-28 sm:h-28", text: "text-4xl sm:text-5xl", img: "w-14 h-14 sm:w-16 sm:h-16", gap: "gap-2 sm:gap-3" };
  if (itemsPerRow <= 4) return { box: "w-16 h-16 sm:w-20 sm:h-20", text: "text-3xl sm:text-4xl", img: "w-10 h-10 sm:w-12 sm:h-12", gap: "gap-2" };
  if (itemsPerRow <= 5) return { box: "w-[52px] h-[52px] sm:w-16 sm:h-16", text: "text-2xl sm:text-3xl", img: "w-8 h-8 sm:w-10 sm:h-10", gap: "gap-1 sm:gap-2" };
  return { box: "w-11 h-11 sm:w-14 sm:h-14", text: "text-xl sm:text-2xl", img: "w-7 h-7 sm:w-9 sm:h-9", gap: "gap-1" };
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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Tooltip — rendered in a portal-like absolute position ABOVE the item */}
      {showTooltip && item.label && !dragging && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
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
          // Pack item id + pool index as JSON in dataTransfer
          e.dataTransfer.setData("application/sequencing-item", JSON.stringify({ item, poolIndex: idx }));
          e.dataTransfer.effectAllowed = "move";
          setDragging(true);
          setShowTooltip(false);
        }}
        onDragEnd={() => setDragging(false)}
        onClick={() => onSelect(item, idx)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
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
  const sc = getSizeByRow(itemsPerRow);

  return (
    <div className="bg-[#FAF5FF] rounded-3xl p-4 sm:p-5 flex flex-col gap-3 border-4 border-[#E9D5FF] shadow-inner w-full">
      <p className="text-xs font-bold text-[#D8B4FE] uppercase tracking-wider">
        ลากหรือแตะเพื่อนำไปวาง
      </p>

      {/* Items — nowrap scrollable single row */}
      <div className={`flex items-center justify-center flex-nowrap overflow-x-auto pb-1 ${sc.gap} scrollbar-none`}>
        {pool.map((item, idx) => (
          <div key={`pool-wrapper-${idx}`} className={`relative flex-shrink-0 ${sc.box} flex items-center justify-center`}>
            {item ? (
              <PoolItem item={item} idx={idx} onSelect={onSelect} sc={sc} />
            ) : (
              <div className={`${sc.box} rounded-xl opacity-0 pointer-events-none`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
