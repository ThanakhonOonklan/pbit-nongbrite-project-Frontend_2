import { FaCheck, FaPlay, FaRedo } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";

interface GameControlsProps {
  onCheck: () => void;
  onReset: () => void;
  isAllFilled: boolean;
  isCompleted: boolean;
}

export function GameControls({
  onCheck,
  onReset,
  isAllFilled,
  isCompleted,
}: GameControlsProps) {
  return (
    <div className="flex justify-center gap-3 mt-2 pb-2">
      {/* Reset Button */}
      <div className="w-20">
        <TiltButton
          width="100%"
          height={64}
          elevation={5}
          pressInset={4}
          tilt={0.5}
          radius={14}
          motion={60}
          surfaceColor="#1E2C33"
          sideColor="#0F1A20"
          textColor="#9CA3AF"
          onClick={onReset}
          disabled={isCompleted}
        >
          <FaRedo className="w-5 h-5" />
        </TiltButton>
      </div>

      {/* Check Button */}
      <div className={`w-56 transition-opacity ${!isAllFilled ? "opacity-40 cursor-not-allowed" : ""}`}>
        <TiltButton
          width="100%"
          height={64}
          elevation={6}
          pressInset={5}
          tilt={0.5}
          radius={14}
          motion={60}
          surfaceColor={isCompleted ? "#E5E5E5" : "#58CC02"}
          sideColor={isCompleted ? "#D1D1D1" : "#46A302"}
          textColor={isCompleted ? "#AFAFAF" : "#ffffff"}
          onClick={onCheck}
          disabled={!isAllFilled || isCompleted}
        >
          <span className="font-bold text-xl flex items-center justify-center gap-2 drop-shadow-sm">
            <FaPlay className="w-4 h-4" /> ยืนยัน!
          </span>
        </TiltButton>
      </div>
    </div>
  );
}
