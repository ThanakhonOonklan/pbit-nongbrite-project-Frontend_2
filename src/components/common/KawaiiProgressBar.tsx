"use client";

import * as React from "react";
import styles from "./KawaiiProgressBar.module.css";

export interface KawaiiProgressBarProps {
  value: number;      // ค่าปัจจุบัน เช่น 15
  min?: number;       // ค่าต่ำสุด (default: 0)
  max: number;        // ค่าสูงสุด เช่น 27
  color?: string;     // สี base color เช่น #8cc8e4, #6cc484, #fe8ce4, #1cb0f6
  className?: string;
}

export const KawaiiProgressBar: React.FC<KawaiiProgressBarProps> = ({
  value,
  min = 0,
  max,
  color,
  className,
}) => {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      readOnly
      disabled
      className={`${styles.kawaii} ${className || ''}`}
      style={
        color
          ? ({ "--base": color } as React.CSSProperties & {
              [key: string]: string;
            })
          : undefined
      }
      aria-label="Progress bar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    />
  );
};

KawaiiProgressBar.displayName = "KawaiiProgressBar";

