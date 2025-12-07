"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import ScrollStack from "./ScrollStack";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "white";
  as?: "section" | "aside" | "div";
  // ScrollStack props (optional)
  useScrollStack?: boolean;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  variant = "default",
  as: Component = "section",
  useScrollStack,
  itemDistance,
  itemScale,
  itemStackDistance,
  stackPosition,
  scaleEndPosition,
  baseScale,
  rotationAmount,
  blurAmount,
  useWindowScroll,
  onStackComplete,
}) => {
  const baseStyles =
    "rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04),0px_1px_4px_rgba(0,0,0,0.02)]";
  
  const variantStyles = {
    default:
      "bg-gradient-to-br from-[#F9FBFF] via-white to-[#F4F8FF]",
    white: "bg-white",
  };

  // Check if ScrollStack mode should be enabled
  const isScrollStackMode = useScrollStack || 
    itemDistance !== undefined ||
    itemScale !== undefined ||
    itemStackDistance !== undefined ||
    stackPosition !== undefined ||
    scaleEndPosition !== undefined ||
    baseScale !== undefined ||
    rotationAmount !== undefined ||
    blurAmount !== undefined ||
    useWindowScroll !== undefined ||
    onStackComplete !== undefined;

  // If ScrollStack mode, wrap with ScrollStack
  if (isScrollStackMode) {
    return (
      <Component
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        <ScrollStack
          className={cn("w-full h-full rounded-[inherit]", variantStyles[variant])}
          itemDistance={itemDistance}
          itemScale={itemScale}
          itemStackDistance={itemStackDistance}
          stackPosition={stackPosition}
          scaleEndPosition={scaleEndPosition}
          baseScale={baseScale}
          rotationAmount={rotationAmount}
          blurAmount={blurAmount}
          useWindowScroll={useWindowScroll}
          onStackComplete={onStackComplete}
        >
          {children}
        </ScrollStack>
      </Component>
    );
  }

  // Normal Container mode
  return (
    <Component
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};

Container.displayName = "Container";

export { Container };

