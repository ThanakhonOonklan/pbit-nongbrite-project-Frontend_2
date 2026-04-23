// StartPlatform.tsx — Starting platform with Bobo character on top

import Image from "next/image";
import { WoodLog } from "./WoodLog";

export interface StartPlatformProps {
  value: number;
}

export function StartPlatform({ value }: StartPlatformProps) {
  return (
    <div className="relative flex flex-col items-center shrink-0">
      {/* Empty slot area — same height as DroppableLog's slot so layout matches */}
      <div className="w-[72px] h-[52px] mb-2" />

      {/* Log with value printed — same style as operator logs */}
      <div className="relative flex justify-center">
        <WoodLog width={120} height={60} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-x-[6px]">
          <span
            className="text-2xl font-black text-white/90 select-none pb-1"
            style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
