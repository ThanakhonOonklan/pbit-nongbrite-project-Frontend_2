"use client";

import * as React from "react";
import { Container } from "@/components/common/Container";
import { PrimaryButton } from "@/components/common";
import { DifficultyIndicator } from "@/components/common/DifficultyIndicator";
import { CountUp, Counter } from "@/components/common";
import { extractLevelNumber, extractTimeNumber, getDifficultyBadgeColor, getCounterPlaces } from "@/utils/level";
import { Timer } from "phosphor-react";

export interface MainContentFormProps {
  levelTitle?: string;
  difficulty?: number;
  difficultyText?: string;
  timeLimit?: string;
  buttonText?: string;
  className?: string;
}

export const MainContentForm: React.FC<MainContentFormProps> = ({
  levelTitle,
  difficulty = 1,
  difficultyText,
  timeLimit,
  buttonText = "Start",
  className,
}) => {
  const badgeColor = getDifficultyBadgeColor(difficulty);
  const levelNumber = extractLevelNumber(levelTitle);
  const counterPlaces = getCounterPlaces(levelNumber);
  const timeNumber = extractTimeNumber(timeLimit);
  const previousTimeRef = React.useRef(timeNumber);
  const [fromTime, setFromTime] = React.useState(timeNumber);
  const [animationKey, setAnimationKey] = React.useState(0);
  
  // Update fromTime when timeLimit changes to trigger animation
  React.useEffect(() => {
    if (timeNumber !== previousTimeRef.current) {
      // Set fromTime to previous value before updating
      setFromTime(previousTimeRef.current);
      // Force re-mount by changing key
      setAnimationKey((prev) => prev + 1);
      // Update ref after a small delay to ensure animation starts from previous value
      const timer = setTimeout(() => {
        previousTimeRef.current = timeNumber;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [timeLimit, timeNumber]);

  return (
    <Container
      variant="white"
      className={`w-[376px] h-auto py-[32px] px-[24px] flex flex-col gap-[24px] rounded-t-none ${className || ""}`}
    >
      {/* Level Info Box */}
      <div className="w-full p-6 rounded-[20px] bg-gradient-to-br from-[#E3F2FD] via-[#E8F5FF] to-[#E0F2FE] border-2 border-[#B8E6FF] ">
        {/* Level Title */}
        <div className="flex items-center mb-5">
          <span className="text-[22px] font-bold text-[#3C3C3C] drop-shadow-sm">
            Level
          </span>
          <Counter
            value={levelNumber}
            places={counterPlaces}
            fontSize={22}
            padding={0}
            gap={1}
            textColor="#3C3C3C"
            fontWeight={900}
            containerStyle={{ display: "inline-block" }}
            topGradientStyle={{ display: "none" }}
            bottomGradientStyle={{ display: "none" }}
          />
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-[12px] bg-white/60 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-[#3C3C3C]">
              Level:
            </span>
            <DifficultyIndicator
              level={difficulty}
              inactiveColor="#E3F2FD"
              barWidth="14px"
              barHeight="28px"
              gap="5px"
            />
          </div>
          <div
            className="flex items-center gap-1 px-3 py-1 rounded-full shadow-sm"
            style={{
              backgroundColor: badgeColor,
            }}
          >
            <span className="text-[14px] font-bold text-white">
              {difficultyText}
            </span>
          </div>
        </div>

        {/* Time Limit */}
        <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/60 backdrop-blur-sm">
          <Timer className="text-[#1CB0F6]" size={28} weight="fill" />
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[#3C3C3C] opacity-80">
              เวลา
            </span>
            <div className="flex items-baseline gap-1">
              <CountUp
                key={`time-${animationKey}-${timeNumber}`}
                from={fromTime}
                to={timeNumber}
                direction="up"
                duration={0.5}
                startWhen={true}
                className="text-[16px] font-bold text-[#3C3C3C]"
              />
              <span className="text-[16px] font-bold text-[#3C3C3C]"> วินาที</span>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full flex justify-center">
        <PrimaryButton 
          size="full" 
        >

          {buttonText}
        </PrimaryButton>
      </div>

      {/* Achievements Section */}
    
    </Container>
  );
};

MainContentForm.displayName = "MainContentForm";

