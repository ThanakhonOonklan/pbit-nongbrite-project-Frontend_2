import * as React from "react";
import { GameButton } from "@/components/common";
import { Lock, Check } from "phosphor-react";
import { levelData } from "@/constants/levelData";

interface GameSection1Props {
  markerRef: React.RefObject<HTMLDivElement | null>;
  onLevelClick?: (level: number) => void;
}

export const GameSection1: React.FC<GameSection1Props> = ({ markerRef, onLevelClick }) => {
  const handleLevelClick = (level: number) => {
    const levelInfo = levelData.find((data) => data.level === level);
    if (levelInfo && onLevelClick) {
      onLevelClick(level);
    }
  };
  return (
    <>
      {/* ========== GAME 1: Path Navigation ========== */}

      {/* Game 1 Marker for scroll detection */}
      <div ref={markerRef} className="absolute top-[3960px]"></div>

      {/* Game 1 - Level 9 (Locked) */}
      <div className="absolute top-[4000px] left-[43%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(9)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 9)?.title || "Level 9"}
        </span>
      </div>

      {/* Game 1 - Level 8 (Locked) */}
      <div className="absolute top-[4140px] left-[52%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(8)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 8)?.title || "Level 8"}
        </span>
      </div>

      {/* Game 1 - Level 7 (Locked) */}
      <div className="absolute top-[4280px] left-[44%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(7)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 7)?.title || "Level 7"}
        </span>
      </div>

      {/* Game 1 - Level 6 (Locked) */}
      <div className="absolute top-[4420px] left-[54%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(6)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 6)?.title || "Level 6"}
        </span>
      </div>

      {/* Game 1 - Level 5 (Locked) */}
      <div className="absolute top-[4560px] left-[46%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(5)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 5)?.title || "Level 5"}
        </span>
      </div>

      {/* Game 1 - Level 4 (Locked) */}
      <div className="absolute top-[4700px] left-[42%] flex items-center gap-4">
        <GameButton
          variant="blue-locked"
          size="default"
          onClick={() => handleLevelClick(4)}
          icon={<Lock className="w-7 h-7 text-white" />}
        />
        <span className="text-[16px] font-medium text-[#AFAFAF]">
          {levelData.find((d) => d.level === 4)?.title || "Level 4"}
        </span>
      </div>

      {/* Game 1 - Level 3 (Unlocked) */}
      <div className="absolute top-[4840px] left-[50%] -translate-x-1/2 flex items-center gap-4">
        <GameButton
          variant="blue"
          size="default"
          onClick={() => handleLevelClick(3)}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">
          {levelData.find((d) => d.level === 3)?.title || "Level 3"}
        </span>
      </div>

      {/* Game 1 - Level 2 (Unlocked) */}
      <div className="absolute top-[4980px] left-[44%] flex items-center gap-4">
        <GameButton
          variant="blue"
          size="default"
          onClick={() => handleLevelClick(2)}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">
          {levelData.find((d) => d.level === 2)?.title || "Level 2"}
        </span>
      </div>

      {/* Game 1 - Level 1 (Unlocked - START HERE) */}
      <div className="absolute top-[5120px] left-[52%] flex items-center gap-4">
        <GameButton
          variant="blue"
          size="default"
          onClick={() => handleLevelClick(1)}
          icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
        />
        <span className="text-[16px] font-bold text-[#3C3C3C]">
          {levelData.find((d) => d.level === 1)?.title || "Level 1"}
        </span>
      </div>
    </>
  );
};

