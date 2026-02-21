"use client";

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  HTMLAttributes,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "motion/react";

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  footerLeftContent?: ReactNode;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => { },
  onFinalStepCompleted = () => { },
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  footerLeftContent,
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="relative w-full " {...rest}>
      <div
        className={`relative bg-white rounded-[32px] md:rounded-[40px] px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 overflow-hidden ${stepCircleContainerClassName}`}
      >
        {/* Decorative shapes - matching landing page colors */}
        <div className="pointer-events-none absolute -top-[70px] -right-[80px] w-[280px] h-[200px] md:w-[320px] md:h-[220px] bg-[#38bdf8] rounded-bl-[130px] opacity-20 ">
          <div className="absolute top-8 -left-10 w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-[#1cb0f6] rounded-bl-[130px] opacity-30" />
        </div>
        <div className="pointer-events-none absolute -bottom-[110px] -left-[90px] w-[240px] h-[240px] md:w-[280px] md:h-[280px] bg-[#fbbf24] rounded-full opacity-15">
          <div className="absolute top-6 left-8 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-[#ffd300] rounded-full opacity-20" />
        </div>

        <div className="relative z-10 ">
          <div
            className={`${stepContainerClassName} flex w-full items-center p-1 mt-0 `}
          >
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;
              return (
                <React.Fragment key={stepNumber}>
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: (clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      },
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      onClickStep={(clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      }}
                    />
                  )}
                  {isNotLastStep && (
                    <StepConnector isComplete={currentStep > stepNumber} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            className={`px-4 sm:px-6 md:px-8 py-4 md:py-6 ${contentClassName}`}
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>

          {!isCompleted && (
            <div className={`px-4 sm:px-6 md:px-8  ${footerClassName}`}>
              <div
                className={`mt-4 flex ${currentStep !== 1 ? "justify-between" : "justify-between"
                  } items-center`}
              >
                {currentStep !== 1 ? (
                  <button
                    onClick={handleBack}
                    className={`duration-350 rounded px-2 py-1 transition ${currentStep === 1
                        ? "pointer-events-none opacity-50 text-neutral-400"
                        : "text-neutral-400 hover:text-neutral-700"
                      }`}
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                ) : (
                  <div>{footerLeftContent || <div />}</div>
                )}
                <button
                  onClick={isLastStep ? handleComplete : handleNext}
                  className="duration-350 flex items-center justify-center rounded-full bg-[#1cb0f6] py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-[#17a3e3] active:bg-[#1280B5]"
                  {...nextButtonProps}
                >
                  {isLastStep ? completeButtonText : nextButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

export interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="w-full">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`relative outline-none focus:outline-none ${disableStepIndicators ? "cursor-default" : "cursor-pointer"
        }`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#A1AEBE", color: "#ffffff" },
          active: { scale: 1, backgroundColor: "#1cb0f6", color: "#ffffff" },
          complete: { scale: 1, backgroundColor: "#1cb0f6", color: "#ffffff" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-5 w-5 text-white" />
        ) : status === "active" ? (
          <span className="text-[11px] text-white font-semibold">{step}</span>
        ) : (
          <span className="text-[11px] text-white">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#1cb0f6" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600 ">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

Stepper.displayName = "Stepper";

export default Stepper;
