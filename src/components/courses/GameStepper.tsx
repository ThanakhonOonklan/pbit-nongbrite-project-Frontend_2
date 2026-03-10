"use client";

import * as React from "react";
import { motion } from "motion/react";
import type { GameConfig } from "@/constants/courses/gameConfig";
import { cn } from "@/lib/utils";
import { convertHeaderColorToHex } from "@/utils/courses";

export interface GameStepperProps {
  games: GameConfig[];
  currentIndex: number;
  onStepClick: (index: number) => void;
  className?: string;
}

export const GameStepper: React.FC<GameStepperProps> = ({
  games,
  currentIndex,
  onStepClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-40 flex flex-row items-center justify-center",
        "gap-1 sm:gap-1.5 md:gap-2",
        "max-w-3xl mx-auto py-2 px-2 sm:py-2.5 sm:px-3 md:py-3 md:px-4",
        "bg-white/80 backdrop-blur-sm",
        "border-b border-gray-200 shadow-sm rounded-lg",
        "-mt-[1vh]",
        className
      )}
    >
      {games.map((game, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const GameIcon = game.icon;
        
        // Convert header color to hex for active state
        const headerColorHex = convertHeaderColorToHex(game.headerColor);
        const activeColor = headerColorHex || "#1cb0f6";
        
        const handleClick = () => {
          if (index !== currentIndex) {
            onStepClick(index);
          }
        };

        return (
          <React.Fragment key={game.id}>
            <motion.button
              onClick={handleClick}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-all duration-300",
                "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer outline-none focus:outline-none",
                "hover:scale-110 active:scale-95",
                isActive
                  ? "shadow-lg "
                  : "shadow-md hover:shadow-lg"
              )}
              animate={{
                backgroundColor: isActive
                  ? activeColor
                  : isCompleted
                  ? "#94a3b8"
                  : "#cbd5e1",
                scale: isActive ? 1.1 : 1,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <GameIcon
                className={cn(
                  "w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 transition-colors duration-300",
                  isActive || isCompleted ? "text-white" : "text-gray-600"
                )}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0.5 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
            {index < games.length - 1 && (
              <motion.div
                className="w-4 sm:w-6 md:w-8 h-0.5 bg-gray-300 rounded-full"
                animate={{
                  backgroundColor:
                    index < currentIndex ? activeColor : "#cbd5e1",
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

GameStepper.displayName = "GameStepper";
