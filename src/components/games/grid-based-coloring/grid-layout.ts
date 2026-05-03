export function getGridCellSizeClass(gridSize: number) {
  if (gridSize <= 5) {
    return "w-[52px] h-[52px] min-[380px]:w-[56px] min-[380px]:h-[56px] sm:w-[72px] sm:h-[72px] lg:w-[84px] lg:h-[84px]";
  }

  if (gridSize <= 6) {
    return "w-[44px] h-[44px] min-[380px]:w-[48px] min-[380px]:h-[48px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px]";
  }

  return "w-[38px] h-[38px] min-[380px]:w-[42px] min-[380px]:h-[42px] sm:w-[52px] sm:h-[52px] lg:w-[60px] lg:h-[60px]";
}

export const gridPanelClass =
  "relative rounded-lg p-3 sm:p-4 w-full flex-1 flex flex-col overflow-hidden bg-[#E2CDAE] border-4 border-[#8B5A2B] shadow-xl shadow-amber-900/30";

export const gridStageClass =
  "relative flex-1 flex items-center justify-center px-1 pt-16 pb-3 sm:px-4 sm:pt-14 sm:pb-4 lg:pt-12";

export const gridContainerClass =
  "inline-grid w-fit aspect-square border border-gray-300 shadow-sm overflow-hidden bg-white";
