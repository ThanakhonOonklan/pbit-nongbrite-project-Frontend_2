import { motion, AnimatePresence } from 'framer-motion';
import { OrganismStage } from './types';

interface OrganismSceneProps {
  currentStage: OrganismStage | null;
  isAnimatingAction: boolean;
  isWrongAction: boolean;
}

export const OrganismScene = ({ currentStage, isAnimatingAction, isWrongAction }: OrganismSceneProps) => {
  if (!currentStage) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Bobbing / Shaking / Interacting animation wrapper */}
          <motion.div
            animate={
              isWrongAction
                ? { x: [-15, 15, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }
                : isAnimatingAction
                ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'], transition: { duration: 0.8, ease: "easeInOut" } }
                : { y: [-15, 5, -15], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
            }
          >
            <div className="w-64 h-64 drop-shadow-2xl flex items-center justify-center relative group">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <img 
                src={currentStage.image} 
                alt={currentStage.name}
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback box if image is not actually present */}
              <div className="hidden bg-gradient-to-br from-white/20 to-white/5 rounded-full w-full h-full flex flex-col items-center justify-center border-4 border-white/30 backdrop-blur-md shadow-2xl relative z-10">
                <span className="text-6xl mb-2">✨</span>
                <span className="text-xl text-white font-bold drop-shadow-md text-center px-4">{currentStage.name}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 text-white/50 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium border border-white/5">
        ร่างปัจจุบัน: <span className="text-white font-bold">{currentStage.name}</span>
      </div>
    </div>
  );
};
