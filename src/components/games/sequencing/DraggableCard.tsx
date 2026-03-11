import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { OrganismStage } from './types';

interface DraggableCardProps {
  id: string; // The stage id
  stage: OrganismStage;
}

export const DraggableCard = ({ id, stage }: DraggableCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: stage,
  });

  const style = {
    // using translate3d for better performance
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        w-28 h-28 rounded-2xl bg-white flex flex-col items-center justify-center p-2
        shadow-lg cursor-grab active:cursor-grabbing border-4 border-white
        transition-shadow duration-200 group relative
        ${isDragging ? 'opacity-80 scale-105 z-50 shadow-2xl ring-4 ring-blue-500' : 'hover:scale-105'}
      `}
    >
      {/* Visual content for the card */}
      <div className="w-16 h-16 bg-gray-100 rounded-xl mb-2 flex items-center justify-center p-1">
        <img 
          src={stage.image} 
          alt={stage.name} 
          className="w-full h-full object-contain filter drop-shadow-sm pointer-events-none" 
        />
      </div>
      <span className="text-xs font-bold text-gray-800 text-center pointer-events-none w-full truncate px-1">
        {stage.name}
      </span>
      
      {/* Drag handle indicator */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-gray-400 text-[10px]">⋮⋮</span>
      </div>
    </div>
  );
};
