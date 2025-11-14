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
    "rounded-[20px] border-2 border-[#000000] shadow-sm";
  
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

