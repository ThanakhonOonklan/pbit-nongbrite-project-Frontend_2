"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "white";
  as?: "section" | "aside" | "div";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  variant = "default",
  as: Component = "section",
}) => {
  const baseStyles =
    "rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04),0px_1px_4px_rgba(0,0,0,0.02)]";
  
  const variantStyles = {
    default:
      "bg-gradient-to-br from-[#F9FBFF] via-white to-[#F4F8FF]",
    white: "bg-white",
  };

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

