import { FaCheck, FaLightbulb, FaRedo } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";

interface GameControlsProps {
  onCheck: () => void;
  onHint: () => void;
  onReset: () => void;
  isAllFilled: boolean;
  isCompleted: boolean;
}

export function GameControls({
  onCheck,
  onHint,
  onReset,
  isAllFilled,
  isCompleted,
}: GameControlsProps) {
  return (
    <>
      {/* Bottom Center: Check + Reset buttons */}
      <div className="flex justify-center gap-3 sm:gap-4 mt-2 pb-2">
        {/* Reset Button */}
        <div className="w-20 sm:w-24">
          <TiltButton
            width="100%"
            height={64}
            elevation={5}
            pressInset={4}
            tilt={0.5}
            radius={14}
            motion={60}
            surfaceColor="#F3F4F6"
            sideColor="#D1D5DB"
            textColor="#6B7280"
            onClick={onReset}
            disabled={isCompleted}
          >
            <FaRedo className="w-5 h-5" />
          </TiltButton>
        </div>

        {/* Check Button */}
        <div className={`w-52 sm:w-64 transition-opacity ${!isAllFilled ? "opacity-40 cursor-not-allowed" : ""}`}>
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
            <span className="font-bold text-lg sm:text-xl flex items-center justify-center gap-2 drop-shadow-sm">
              <FaCheck className="w-4 h-4 sm:w-5 sm:h-5" /> ตรวจสอบ
            </span>
          </TiltButton>
        </div>
      </div>

      {/* Floating Hint Button — bottom-right corner */}
      <button
        onClick={onHint}
        disabled={isCompleted || isAllFilled}
        title="คำใบ้ (Hint)"
        className={`fixed bottom-6 right-6 z-30 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all
          bg-[#1CB0F6] hover:bg-[#1899D6] hover:scale-110 active:scale-95 border-4 border-white
          ${isCompleted || isAllFilled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <FaLightbulb className="w-7 h-7 text-white" />
      </button>
    </>
  );
}
