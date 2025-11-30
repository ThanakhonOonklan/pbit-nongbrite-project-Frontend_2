"use client";

import Squares from "@/components/Squares";

interface BackgroundSquaresProps {
  borderColor?: string;
  hoverFillColor?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
}

export function BackgroundSquares({ 
  borderColor = "#C2E9FA", 
  hoverFillColor = "#C8F0FA",
  gradientStartColor,
  gradientEndColor
}: BackgroundSquaresProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Squares
        speed={0.1}
        squareSize={40}
        direction="diagonal"
        borderColor={borderColor}
        hoverFillColor={hoverFillColor}
        gradientStartColor={gradientStartColor}
        gradientEndColor={gradientEndColor}
      />
    </div>
  );
}

