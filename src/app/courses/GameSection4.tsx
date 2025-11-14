import * as React from "react";
import { RoundButton } from "@/components/common/RoundButton";
import { Lock } from "lucide-react";

interface GameSection4Props {
  markerRef: React.RefObject<HTMLDivElement | null>;
}

export const GameSection4: React.FC<GameSection4Props> = ({ markerRef }) => {
  return (
    <>
      {/* ========== GAME 4: Sequencing ========== */}
      
      {/* Game 4 Marker for scroll detection */}
      <div ref={markerRef} className="absolute top-[1360px]"></div>
      
      {/* Game 4 - Level 9 (Locked) */}
      <div className="absolute top-[50px] left-[43%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 9 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 9</span>
      </div>
      
      {/* Game 4 - Level 8 (Locked) */}
      <div className="absolute top-[190px] left-[52%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 8 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 8</span>
      </div>
      
      {/* Game 4 - Level 7 (Locked) */}
      <div className="absolute top-[330px] left-[44%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 7 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 7</span>
      </div>
      
      {/* Game 4 - Level 6 (Locked) */}
      <div className="absolute top-[470px] left-[54%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 6 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 6</span>
      </div>
      
      {/* Game 4 - Level 5 (Locked) */}
      <div className="absolute top-[610px] left-[46%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 5 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5</span>
      </div>
      
      {/* Game 4 - Level 4 (Locked) */}
      <div className="absolute top-[750px] left-[42%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 4 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4</span>
      </div>
      
      {/* Game 4 - Level 3 (Locked) */}
      <div className="absolute top-[890px] left-[50%] -translate-x-1/2 flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 3 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 3</span>
      </div>
      
      {/* Game 4 - Level 2 (Locked) */}
      <div className="absolute top-[1030px] left-[44%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 2 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 2</span>
      </div>
      
      {/* Game 4 - Level 1 (Locked) */}
      <div className="absolute top-[1170px] left-[52%] flex items-center gap-4">
        <RoundButton 
          variant="default"
          size="default"
          onClick={() => console.log("Game 4 - Level 1 clicked (locked)")}
          icon={<Lock className="w-7 h-7 text-[#8B7355]" />}
          className="opacity-50"
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">Level 1</span>
      </div>
    </>
  );
};

