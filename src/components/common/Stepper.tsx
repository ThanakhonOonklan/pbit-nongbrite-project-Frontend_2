import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "active" | "default";

export interface Step {
  label: string;
  status: StepStatus;
  stepNumber?: number;
}

export interface StepperProps {
  steps: Step[];
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, className }) => {
  return (
    <div
      className={cn(
        "flex flex-row items-start justify-center gap-[8px] w-[439px] h-[47px]",
        className
      )}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const stepNumber = step.stepNumber ?? index + 1;

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div className="relative w-[32px] h-[47px] shrink-0 flex flex-col items-center">
              {/* Step Symbol */}
              <div className="relative w-[32px] h-[32px]">
                {step.status === "completed" ? (
                  // Completed: Blue circle with checkmark
                  <div className="relative w-[32px] h-[32px]">
                    <div className="absolute left-0 top-0 w-[29px] h-[29px] bg-[#1CB0F6] border-2 border-[#1CB0F6] rounded-full"></div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Check className="w-[23px] h-[23px] text-white stroke-[2]" />
                    </div>
                  </div>
                ) : (
                  // Active/Default: circle with state-specific border/background
                  <div className="relative w-[32px] h-[32px]">
                    <div
                      className={cn(
                        "absolute left-0 top-0 w-[32px] h-[32px] border-2 rounded-full flex items-center justify-center",
                        step.status === "active"
                          ? "bg-[#EAF8FF] border-[#1CB0F6]"
                          : "bg-white border-[#A1AEBE]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-[13px] leading-[16px] font-medium",
                          step.status === "active" ? "text-[#1CB0F6]" : "text-[#242E39]"
                        )}
                      >
                        {stepNumber.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Label */}
              <p
                className={cn(
                  "absolute top-[34px] left-1/2 -translate-x-1/2 text-[11px] leading-[13px] text-center whitespace-nowrap",
                  step.status === "completed"
                    ? "font-bold text-[#1CB0F6]"
                    : step.status === "active"
                    ? "font-bold text-[#1CB0F6]"
                    : "font-medium text-[#465668]"
                )}
              >
                {step.label}
              </p>
            </div>

            {/* Trail Line */}
            {!isLast && (
              <div className="relative w-[80px] h-[32px] shrink-0 flex items-center">
                <div
                  className={cn(
                    "absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px]",
                    step.status === "completed"
                      ? "bg-[#1CB0F6]"
                      : "bg-[#A1AEBE]"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Stepper.displayName = "Stepper";

export { Stepper };

