import * as React from "react";
import { GameButton } from "@/components/common";
import { Lock } from "phosphor-react";

interface GameSection3Props {
  markerRef: React.RefObject<HTMLDivElement | null>;
}

export const GameSection3: React.FC<GameSection3Props> = ({ markerRef }) => {
  return (
    <>
      {/* ========== GAME 3: Conditional Matching ========== */}
      
      {/* Game 3 Marker for scroll detection */}
      <div ref={markerRef} className="absolute top-[1360px]"></div>
      
      {/* Game 3 - Level 9 (Locked) */}
      <div className="absolute top-[1400px] left-[50%] -translate-x-1/2 flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 9 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 9</span>
      </div>
      
      {/* Game 3 - Level 8 (Locked) */}
      <div className="absolute top-[1540px] left-[45%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 8 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 8</span>
      </div>
      
      {/* Game 3 - Level 7 (Locked) */}
      <div className="absolute top-[1680px] left-[55%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 7 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 7</span>
      </div>
      
      {/* Game 3 - Level 6 (Locked) */}
      <div className="absolute top-[1820px] left-[43%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 6 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 6</span>
      </div>
      
      {/* Game 3 - Level 5 (Locked) */}
      <div className="absolute top-[1960px] left-[52%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 5 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5</span>
      </div>
      
      {/* Game 3 - Level 4 (Locked) */}
      <div className="absolute top-[2100px] left-[48%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 4 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4</span>
      </div>
      
      {/* Game 3 - Level 3 (Locked) */}
      <div className="absolute top-[2240px] left-[42%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 3 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 3</span>
      </div>
      
      {/* Game 3 - Level 2 (Locked) */}
      <div className="absolute top-[2380px] left-[54%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 2 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 2</span>
      </div>
      
      {/* Game 3 - Level 1 (Locked) */}
      <div className="absolute top-[2520px] left-[47%] flex items-center gap-4">
        <GameButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 3 - Level 1 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 1</span>
      </div>
    </>
  );
};

