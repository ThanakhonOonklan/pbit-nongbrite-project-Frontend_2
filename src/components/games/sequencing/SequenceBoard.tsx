import { useDroppable } from '@dnd-kit/core';
import { OrganismStage } from './types';
import { DraggableCard } from './DraggableCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface DroppableSlotProps {
  id: string; // "slot-0", "slot-1", etc.
  index: number;
  item: OrganismStage | null;
}

// A single slot on the board
export const SequenceSlot = ({ id, index, item }: DroppableSlotProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { index },
  });

  return (
    <div className="flex items-center gap-4">
      {/* Arrow separator except for first item */}
      {index > 0 && (
        <div className="text-white/40 text-2xl animate-pulse">
          <FaArrowRight />
        </div>
      )}
      
      <div className="flex flex-col items-center gap-2">
        {/* Step Number Badge */}
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center font-bold text-sm shadow-md border border-white/30">
          {index + 1}
        </div>

        {/* The dropzone area */}
        <div
          ref={setNodeRef}
          className={`
            w-32 h-32 rounded-3xl flex items-center justify-center relative
            transition-all duration-300 border-4 border-dashed
            ${isOver && !item ? 'bg-white/20 border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : ''}
            ${item ? 'border-transparent bg-transparent' : 'bg-black/20 border-white/20 shadow-inner'}
          `}
        >
          {/* If there's no item, show a placeholder hint */}
          {!item && !isOver && (
            <span className="text-white/20 text-4xl font-light pointer-events-none">
              +
            </span>
          )}

          {/* If there is an item placed here, render the draggable card */}
          {item && <DraggableCard id={`placed-${item.id}`} stage={item} />}
        </div>
      </div>
    </div>
  );
};

interface SequenceBoardProps {
  slots: (OrganismStage | null)[]; // Array of slots based on total stages length
  unplacedCards: OrganismStage[]; // Cards waiting to be placed
  isComplete: boolean;
  onCheck: () => void;
}

export const SequenceBoard = ({ slots, unplacedCards, isComplete, onCheck }: SequenceBoardProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
          จัดเรียงลำดับ!
        </h2>
        <p className="text-white/80 font-medium">
          ลากรูปภาพมาเรียงลำดับในช่องว่างให้ถูกต้อง
        </p>
      </div>

      {/* The Board Slots */}
      <div className="flex justify-center items-center gap-4 w-full overflow-x-auto pb-8 pt-4 px-4 snap-x">
        {slots.map((item, index) => (
          <div key={`slot-${index}`} className="snap-center">
            <SequenceSlot id={`slot-${index}`} index={index} item={item} />
          </div>
        ))}
      </div>

      {/* The Origin Area (Where cards spawn) */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl min-h-[160px] relative">
        {/* Origin is also a droppable area to return cards back */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
           <span className="text-4xl text-white font-bold tracking-widest uppercase">ช่องเก็บการ์ด</span>
        </div>
        
        <div className="relative z-10 flex flex-wrap justify-center gap-6 pb-2">
          {unplacedCards.map((card) => (
            <DraggableCard key={`unplaced-${card.id}`} id={`unplaced-${card.id}`} stage={card} />
          ))}
          {unplacedCards.length === 0 && (
            <div className="w-full h-28 flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
              <span className="text-white/50 text-sm">การ์ดทั้งหมดถูกนำไปวางแล้ว</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <AnimatePresence>
        {unplacedCards.length === 0 && !isComplete && (
           <motion.button
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8 }}
             onClick={onCheck}
             className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
           >
             ตรวจสอบคำตอบ ✔️
           </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
