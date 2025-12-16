"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className 
}) => {
  const sizeConfig = {
    sm: {
      containerSize: "64px",
      squareSize: "18px",
      squareMargin: "1px",
      squareStep: "21px",
    },
    md: {
      containerSize: "96px",
      squareSize: "28px",
      squareMargin: "2px",
      squareStep: "32px",
    },
    lg: {
      containerSize: "128px",
      squareSize: "38px",
      squareMargin: "3px",
      squareStep: "43px",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={cn("loader", className)}
      style={{
        width: config.containerSize,
        height: config.containerSize,
        "--square-step": config.squareStep,
      } as React.CSSProperties & { "--square-step": string }}
    >
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="loader-square"
          style={{
            width: config.squareSize,
            height: config.squareSize,
            margin: config.squareMargin,
          }}
        />
      ))}
    </div>
  );
};

