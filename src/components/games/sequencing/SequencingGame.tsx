import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { OrganismStage, SequencingLevelData, ActionType } from './types';
import { OrganismScene } from './OrganismScene';
import { ActionPanel } from './ActionPanel';
import { CollectionBar } from './CollectionBar';
import { SequenceBoard } from './SequenceBoard';
import { DraggableCard } from './DraggableCard';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data integration
import { frogLifeCycleData } from './mockData';

type GamePhase = 'intro' | 'discovery' | 'review' | 'completed';

export const SequencingGame = () => {
  // --- Game Data ---
  const gameData: SequencingLevelData = frogLifeCycleData;
  const totalStages = gameData.stages.length;

  // --- State: Global ---
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [showFeedback, setShowFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // --- State: Phase 1 (Discovery) ---
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState<OrganismStage[]>([]);
  const [isAnimatingAction, setIsAnimatingAction] = useState(false);
  const [isWrongAction, setIsWrongAction] = useState(false);
  const currentStage = gameData.stages[currentStageIndex];

  // --- State: Phase 2 (Review / Dnd) ---
  // The slots on the board that hold references to the stages
  const [boardSlots, setBoardSlots] = useState<(OrganismStage | null)[]>([]);
  // The unplaced pool
  const [unplacedCards, setUnplacedCards] = useState<OrganismStage[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<OrganismStage | null>(null);

  // Initialize
  useEffect(() => {
    // Start with the first stage unlocked automatically
    if (unlockedStages.length === 0 && gameData.stages.length > 0) {
      setUnlockedStages([gameData.stages[0]]);
    }
  }, []);

  const triggerFeedback = (isCorrect: boolean, message: string) => {
    setShowFeedback({ isCorrect, message });
    setTimeout(() => {
      setShowFeedback(null);
    }, 2000);
  };

  const handleStartGame = () => {
    setPhase('discovery');
  };

  // --- Handlers: Phase 1 ---
  const handleActionSelect = (actionId: ActionType) => {
    if (isAnimatingAction || isWrongAction) return;

    if (currentStage.requireAction === actionId) {
      // Correct action
      setIsAnimatingAction(true);
      
      setTimeout(() => {
        setIsAnimatingAction(false);
        const nextIndex = currentStageIndex + 1;
        
        if (nextIndex < totalStages) {
          const nextStage = gameData.stages[nextIndex];
          setCurrentStageIndex(nextIndex);
          setUnlockedStages(prev => [...prev, nextStage]);
          
          triggerFeedback(true, `คุณค้นพบรูป ${nextStage.name}!`);

          // Start Review Phase if all stages completed
          if (nextStage.requireAction === 'none' || nextIndex === totalStages - 1) {
            setTimeout(() => {
              prepareReviewPhase();
            }, 3000); // Give time for player to celebrate getting the last stage
          }
        }
      }, 1000);
    } else {
      // Wrong action
      setIsWrongAction(true);
      triggerFeedback(false, 'ยังไม่ใช่การกระทำที่ถูกต้องตอนนี้นะ');
      setTimeout(() => setIsWrongAction(false), 800);
    }
  };

  // --- Setup for Phase 2 ---
  const prepareReviewPhase = () => {
    // Prepare slots array filled with nulls
    setBoardSlots(Array(totalStages).fill(null));
    
    // Shuffle the unplaced cards so they have to figure out the order
    const shuffled = [...unlockedStages].sort(() => Math.random() - 0.5);
    setUnplacedCards(shuffled);
    
    setPhase('review');
  };

  // --- Handlers: Phase 2  DnD ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Need to move cursor 8px for drag to start
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const itemData = active.data.current as OrganismStage;
    if (itemData) {
      setActiveDragItem(itemData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return; // Dropped outside valid areas

    const item = active.data.current as OrganismStage;
    const activeIdStr = String(active.id); // e.g., "unplaced-egg" or "placed-egg"
    const overIdStr = String(over.id); // e.g., "slot-0"

    let newSlots = [...boardSlots];
    let newUnplaced = [...unplacedCards];

    // Find where it's coming from
    const isFromOrigin = activeIdStr.startsWith('unplaced-');
    const isFromSlot = activeIdStr.startsWith('placed-');

    // Find destination
    const overIndexData = over.data.current?.index; // Passed in SequenceSlot

    if (overIndexData !== undefined) {
      // Dropping ONTO a slot
      const targetIndex = overIndexData;
      
      // If the slot is already occupied, swap the items
      const existingItemInSlot = newSlots[targetIndex];

      if (isFromOrigin) {
        // Move from unplaced to slot
        newUnplaced = newUnplaced.filter(c => c.id !== item.id);
        if (existingItemInSlot) {
           newUnplaced.push(existingItemInSlot); // Kick old item back to origin
        }
        newSlots[targetIndex] = item;
      } else if (isFromSlot) {
        // Move from slot to slot (swap)
        const sourceIndex = newSlots.findIndex(s => s?.id === item.id);
        if (sourceIndex !== -1) {
          newSlots[sourceIndex] = existingItemInSlot; // Put target item into source slot
          newSlots[targetIndex] = item;
        }
      }
    } else {
      // Trying to drop it elsewhere (like back to unplaced pool)
      // Usually, dragging to origin is handled by simply dropping outside valid slots or on an unplaced droppable
      // We don't have an explicit origin droppable id right now, but we can implement it if needed.
    }

    setBoardSlots(newSlots);
    setUnplacedCards(newUnplaced);
  };

  const checkSequence = () => {
    // Make sure all slots are filled
    if (boardSlots.some(s => s === null)) return;

    // Check if the order matches the original stages array
    let isCorrect = true;
    for (let i = 0; i < totalStages; i++) {
      if (boardSlots[i]?.id !== gameData.stages[i].id) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      triggerFeedback(true, 'ยอดเยี่ยมมาก! ลำดับถูกต้องสมบูรณ์ 🌟');
      setTimeout(() => setPhase('completed'), 2000);
    } else {
      triggerFeedback(false, 'ยังจัดเรียงไม่ถูกต้อง ลองพิจารณาดูอีกครั้งนะ');
    }
  };


  // --- Render ---
  return (
    <div className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3c72] to-[#2a5298] -z-10" />
      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Header Topic */}
      <div className="pt-6 relative z-10 text-center w-full">
         <h1 className="text-4xl text-white font-extrabold uppercase tracking-wide drop-shadow-xl">{gameData.theme}</h1>
         
         {/* Simple Path Indicator for Phase 1 */}
         {phase === 'discovery' && (
           <div className="mt-4 flex justify-center items-center gap-2">
             {gameData.stages.map((stage, idx) => (
               <div key={`dot-${idx}`} className="flex items-center gap-2">
                 <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${idx <= currentStageIndex ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-white/20'}`} />
                 {idx < totalStages - 1 && <div className={`w-8 h-1 transition-colors duration-300 ${idx < currentStageIndex ? 'bg-emerald-400' : 'bg-white/10'}`} />}
               </div>
             ))}
           </div>
         )}
      </div>

      {/* Main Content Area based on Phase */}
      <div className="flex-1 w-full flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center justify-center p-8 bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 max-w-xl mx-auto shadow-2xl"
            >
               <h2 className="text-2xl text-white mb-4">พร้อมที่จะเป็นนักสำรวจหรือยัง?</h2>
               <p className="text-white/70 text-center mb-8">เรียนรู้การเติบโตและทดลองเลือกการกระทำที่เหมาะสม เพื่อปลดล็อคขั้นตอนต่อไป!</p>
               <button 
                 onClick={handleStartGame}
                 className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 active:scale-95 text-xl"
               >
                 เริ่มภารกิจ
               </button>
            </motion.div>
          )}

          {phase === 'discovery' && (
            <motion.div key="discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }} className="w-full flex-1 flex flex-col relative w-full h-full max-w-6xl mx-auto pb-8">
              <CollectionBar unlockedStages={unlockedStages} totalStages={totalStages} />
              
              <OrganismScene 
                currentStage={currentStage} 
                isAnimatingAction={isAnimatingAction} 
                isWrongAction={isWrongAction} 
              />
              
              <AnimatePresence>
                {currentStage.requireAction !== 'none' && (
                  <motion.div key="action-panel" exit={{ opacity: 0, y: 50 }}>
                     <ActionPanel 
                       availableActions={gameData.availableActions}
                       onActionSelect={handleActionSelect}
                       disabled={isAnimatingAction || isWrongAction}
                     />
                  </motion.div>
                )}
                {currentStage.requireAction === 'none' && (
                  <motion.div key="completion" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center absolute bottom-20 w-full left-0 z-30">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                      เติบโตเต็มที่แล้ว!
                    </h2>
                    <p className="text-white mt-2 font-bold text-lg drop-shadow-md pb-4">เตรียมตัวเข้าสู่การทบทวนความรู้...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === 'review' && (
             <motion.div key="review" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="w-full flex-1 flex flex-col">
               <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                 <SequenceBoard 
                   slots={boardSlots} 
                   unplacedCards={unplacedCards} 
                   isComplete={false}
                   onCheck={checkSequence}
                 />
                 
                 <DragOverlay>
                   {activeDragItem ? <DraggableCard id="drag-overlay" stage={activeDragItem} /> : null}
                 </DragOverlay>
               </DndContext>
             </motion.div>
          )}

          {phase === 'completed' && (
             <motion.div key="completed" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center m-auto bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400 drop-shadow-sm mb-4">เก่งมาก!</h2>
                <p className="text-white text-xl">คุณเข้าใจลำดับการเติบโตได้ถูกต้องทั้งหมด</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-colors min-w-[150px]"
                >
                  เล่นอีกครั้ง
                </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Feedback Toast Overlay */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
            className={`
              absolute top-28 left-1/2 transform -translate-x-1/2 z-50 
              px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border-2 border-white
              ${showFeedback.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}
            `}
          >
            <span className="text-2xl">{showFeedback.isCorrect ? '✨' : '❌'}</span>
            {showFeedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
