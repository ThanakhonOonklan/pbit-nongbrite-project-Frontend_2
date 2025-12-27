"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import ScrollStack from "./ScrollStack";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "card";
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
   ...restProps
}) => {
  // Variant styles
  const variantStyles = {
    default: "rounded-[16px]",
    card: "rounded-[32px] md:rounded-[40px]",
  };

  const baseStyles = `${variantStyles[variant]} bg-white`;
  
  // Shadow style for all variants
  const defaultStyle = { boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" };

 
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


  if (isScrollStackMode) {
    return (
      <Component
        className={cn(baseStyles, className)}
        style={{ ...defaultStyle, ...restProps.style }}
        {...restProps}
      >
        <ScrollStack
          className={cn("w-full h-full rounded-[inherit]", "bg-white")}
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
      className={cn(baseStyles, className)}
      style={{ ...defaultStyle, ...restProps.style }}
      {...restProps}
    >
      {children}
    </Component>
  );
};

Container.displayName = "Container";

export { Container };

