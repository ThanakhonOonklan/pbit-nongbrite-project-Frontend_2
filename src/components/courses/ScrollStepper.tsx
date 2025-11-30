"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ScrollStepperProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

interface StepIndicatorProps {
  step: number;
  status: "active" | "inactive" | "complete";
  icon: React.ReactNode;
  onClick?: () => void;
}

// Icon mapping for each step
const stepIcons = [
  FaRoute, // Path Navigation
  FaSquare, // Counting & Classification (รูปทรงเลขาคณิต)
  FaLink, // Conditional Matching (จับคู่เงื่อนไข)
  FaRecycle, // Sequencing (เรียงลำดับวงจรชีวิต)
  FaRuler, // Step Counting (นับระยะทาง/ขั้นตอน)
  FaTh, // Fruit Matching Grid Game
  FaPalette, // Grid-based Coloring
];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  status,
  icon,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer outline-none focus:outline-none flex items-center justify-center",
        onClick && "hover:opacity-80 transition-opacity"
      )}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#CCCCCC", color: "#666666" },
          active: { scale: 1, backgroundColor: "#1cb0f6", color: "#1cb0f6" },
          complete: { scale: 1, backgroundColor: "#1cb0f6", color: "#1cb0f6" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-4 w-4 items-center justify-center rounded font-semibold"
      >
        <div className="text-white [&>svg]:h-2.5 [&>svg]:w-2.5">{icon}</div>
      </motion.div>
    </motion.div>
  );
};

interface StepConnectorProps {
  isComplete: boolean;
}

const StepConnector: React.FC<StepConnectorProps> = ({ isComplete }) => {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "rgba(0,0,0,0)" },
    complete: { width: "100%", backgroundColor: "#1cb0f6" },
  };

  return (
    <div className="relative mx-0 h-[2px] flex-1 overflow-hidden rounded bg-[#CCCCCC] min-w-[8px]">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
};

export const ScrollStepper: React.FC<ScrollStepperProps> = ({
  totalSteps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-0.5 px-1 py-1 w-full max-w-full overflow-hidden",
        className
      )}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isNotLastStep = index < totalSteps - 1;
        const status =
          currentStep === stepNumber
            ? "active"
            : currentStep < stepNumber
            ? "inactive"
            : "complete";

        const IconComponent = stepIcons[index] || FaRoute;

        return (
          <React.Fragment key={stepNumber}>
            <StepIndicator
              step={stepNumber}
              status={status}
              icon={<IconComponent className="h-2.5 w-2.5" />}
              onClick={() => onStepClick?.(stepNumber)}
            />
            {isNotLastStep && (
              <StepConnector isComplete={currentStep > stepNumber} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

ScrollStepper.displayName = "ScrollStepper";

