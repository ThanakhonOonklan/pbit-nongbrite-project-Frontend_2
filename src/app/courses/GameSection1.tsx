import * as React from "react";
import { RoundButton } from "@/components/common/RoundButton";
import { Lock, Check } from "lucide-react";

interface GameSection1Props {
  markerRef: React.RefObject<HTMLDivElement | null>;
}

export const GameSection1: React.FC<GameSection1Props> = ({ markerRef }) => {
  return (
    <>
      {/* ========== GAME 1: Path Navigation ========== */}
      
      {/* Game 1 Marker for scroll detection */}
      <div ref={markerRef} className="absolute top-[3960px]"></div>
      
      {/* Game 1 - Level 9 (Locked) */}
      <div className="absolute top-[4000px] left-[43%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 9 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 9</span>
      </div>
      
      {/* Game 1 - Level 8 (Locked) */}
      <div className="absolute top-[4140px] left-[52%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 8 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 8</span>
      </div>
      
      {/* Game 1 - Level 7 (Locked) */}
      <div className="absolute top-[4280px] left-[44%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 7 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 7</span>
      </div>
      
      {/* Game 1 - Level 6 (Locked) */}
      <div className="absolute top-[4420px] left-[54%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 6 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 6</span>
      </div>
      
      {/* Game 1 - Level 5 (Locked) */}
      <div className="absolute top-[4560px] left-[46%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 5 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5</span>
      </div>
      
      {/* Game 1 - Level 4 (Locked) */}
      <div className="absolute top-[4700px] left-[42%] flex items-center gap-4">
        <RoundButton 
          variant="blue-locked"
          size="default"
          onClick={() => console.log("Game 1 - Level 4 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4</span>
      </div>
      
      {/* Game 1 - Level 3 (Unlocked) */}
      <div className="absolute top-[4840px] left-[50%] -translate-x-1/2 flex items-center gap-4">
        <RoundButton 
          variant="blue"
          size="default" 
          onClick={() => console.log("Game 1 - Level 3 clicked")}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">Finding Half</span>
      </div>
      
      {/* Game 1 - Level 2 (Unlocked) */}
      <div className="absolute top-[4980px] left-[44%] flex items-center gap-4">
        <RoundButton 
          variant="blue"
          size="default" 
          onClick={() => console.log("Game 1 - Level 2 clicked")}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">Combining Parts</span>
      </div>
      
      {/* Game 1 - Level 1 (Unlocked - START HERE) */}
      <div className="absolute top-[5120px] left-[52%] flex items-center gap-4">
        <RoundButton 
          variant="blue"
          size="default" 
          onClick={() => console.log("Game 1 - Level 1 clicked")}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">Splitting Parts</span>
      </div>
    </>
  );
};

