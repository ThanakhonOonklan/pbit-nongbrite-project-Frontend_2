import { motion } from 'framer-motion';
import { OrganismStage } from './types';

interface CollectionBarProps {
  unlockedStages: OrganismStage[];
  totalStages: number;
}

export const CollectionBar = ({ unlockedStages, totalStages }: CollectionBarProps) => {
  // Create an array of length totalStages for the placeholders
  const placeholders = Array.from({ length: totalStages }, (_, i) => i);

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
      <div className="bg-black/30 backdrop-blur-md rounded-3xl p-4 border border-white/10 shadow-2xl flex flex-col gap-4">
        <h3 className="text-white/70 text-center text-sm font-bold uppercase tracking-wider mb-2">
          แฟ้มสะสมร่าง
        </h3>
        
        {placeholders.map((index) => {
          const stage = unlockedStages[index];
          const isUnlocked = !!stage;

          return (
            <div 
              key={index}
              className={`
                w-24 h-24 rounded-2xl flex items-center justify-center relative
                border-2 transition-all duration-500
                ${isUnlocked ? 'bg-white/20 border-white/40 shadow-lg' : 'bg-black/20 border-white/5 border-dashed'}
              `}
            >
              {isUnlocked ? (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full p-2 flex flex-col items-center justify-center relative group"
                >
                  <img 
                    src={stage.image} 
                    alt={stage.name} 
                    className="w-12 h-12 object-contain filter drop-shadow-md group-hover:scale-110 transition-transform" 
                  />
                  <span className="text-white text-[10px] sm:text-xs font-bold mt-2 text-center leading-tight drop-shadow-md">
                    {stage.name}
                  </span>
                  
                  {/* Tooltip or particle effect could go here */}
                  <div className="absolute -inset-1 bg-white/20 rounded-2xl opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10 blur-md"></div>
                </motion.div>
              ) : (
                <div className="text-white/20 font-bold text-2xl">?</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
