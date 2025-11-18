import * as React from "react";
import { GameButton } from "@/components/common";
import { Lock } from "phosphor-react";

interface GameSection2Props {
  markerRef: React.RefObject<HTMLDivElement | null>;
}

export const GameSection2: React.FC<GameSection2Props> = ({ markerRef }) => {
  return (
    <>
      {/* ========== GAME 2: Counting & Classification ========== */}
      
      {/* Game 2 Marker for scroll detection */}
      <div ref={markerRef} className="absolute top-[2660px]"></div>
      
      {/* Game 2 - Level 9 (Locked) */}
      <div className="absolute top-[2710px] left-[50%] -translate-x-1/2 flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 9 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 9</span>
      </div>
      
      {/* Game 2 - Level 8 (Locked) */}
      <div className="absolute top-[2850px] left-[45%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 8 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 8</span>
      </div>
      
      {/* Game 2 - Level 7 (Locked) */}
      <div className="absolute top-[2990px] left-[55%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 7 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 7</span>
      </div>
      
      {/* Game 2 - Level 6 (Locked) */}
      <div className="absolute top-[3130px] left-[43%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 6 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 6</span>
      </div>
      
      {/* Game 2 - Level 5 (Locked) */}
      <div className="absolute top-[3270px] left-[52%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 5 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5</span>
      </div>
      
      {/* Game 2 - Level 4 (Locked) */}
      <div className="absolute top-[3410px] left-[48%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 4 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4</span>
      </div>
      
      {/* Game 2 - Level 3 (Locked) */}
      <div className="absolute top-[3550px] left-[42%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 3 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 3</span>
      </div>
      
      {/* Game 2 - Level 2 (Locked) */}
      <div className="absolute top-[3690px] left-[54%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 2 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 2</span>
      </div>
      
      {/* Game 2 - Level 1 (Locked) */}
      <div className="absolute top-[3830px] left-[47%] flex items-center gap-4">
        <GameButton 
          variant="green-locked"
          size="default"
          onClick={() => console.log("Game 2 - Level 1 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 1</span>
      </div>
    </>
  );
};

