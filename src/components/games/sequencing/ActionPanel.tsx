import { motion } from 'framer-motion';
import { GameAction, ActionType } from './types';

interface ActionPanelProps {
  availableActions: GameAction[];
  onActionSelect: (actionId: ActionType) => void;
  disabled: boolean;
}

export const ActionPanel = ({ availableActions, onActionSelect, disabled }: ActionPanelProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative z-20">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
        <h3 className="text-white text-center text-lg font-bold mb-4 opacity-80">
          เลือกการกระทำต่อไป
        </h3>
        
        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
          {availableActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              onClick={() => onActionSelect(action.id)}
              disabled={disabled}
              className={`
                group relative flex flex-col items-center justify-center p-4 
                rounded-2xl min-w-[100px] transition-all duration-300
                ${disabled 
                  ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10' 
                  : 'bg-white/15 hover:bg-white/25 border-white/30 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                border-2
              `}
            >
              {/* Highlight effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
              
              <div className="text-4xl mb-3 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                {action.icon}
              </div>
              
              <span className="text-white font-semibold tracking-wide drop-shadow-sm">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
