"use client";

import { BackgroundSquares } from "./BackgroundSquaresHome";
import { useHeaderColor } from "@/contexts/HeaderColorContext";

export function BackgroundSquaresWithColor() {
  const { headerColor } = useHeaderColor();
  return <BackgroundSquares backgroundColor={headerColor} />;
}

  