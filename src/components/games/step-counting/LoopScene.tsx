"use client";

import React from "react";
import type { LoopLevelConfig } from "@/constants/games/step-counting-levels";

import { THEME } from "./constants";
import { Glass } from "./Glass";
import { BoboMascot } from "./BoboMascot";

// ── Main LoopScene ─────────────────────────────────────────────
export interface LoopSceneProps {
  config: LoopLevelConfig;
  currentAmount: number;
  currentLoop: number;
  totalLoops: number;
  isRunning: boolean;
  boboState: "idle" | "squeeze" | "celebrate" | "bounce";
}

// ── Helper Functions ───────────────────────────────────────────
function getCurrentGlass(isRunning: boolean, currentAmount: number, targetAmount: number): number {
  return isRunning && currentAmount > 0 && currentAmount <= targetAmount
    ? Math.min(Math.floor(currentAmount - 0.001), targetAmount - 1)
    : -1;
}

function getChipText(
  config: LoopLevelConfig,
  isRunning: boolean,
  currentAmount: number,
  currentLoop: number,
  totalLoops: number
): string {
  const getActionVerb = (theme: string) => {
    switch(theme) {
      case "candle": return "จุด";
      case "garden": return "หว่าน";
      case "juice":
      default: return "คั้น";
    }
  };
  const verb = getActionVerb(config.theme);

  if (isRunning) {
    return `${verb}${config.inputUnit}ที่ ${currentLoop} จาก ${totalLoops} ${config.inputUnit} ${config.inputEmoji}`;
  }

  if (currentAmount > 0 && currentAmount < config.targetAmount) {
    const remaining = Math.round((config.targetAmount - currentAmount) * 100) / 100;
    return `ได้ ${currentAmount} ${config.outputUnit} ขาดอีก ${remaining} ${config.outputUnit} ✌️`;
  }

  if (currentAmount >= config.targetAmount) {
    if (currentAmount === config.targetAmount) {
      return `สุดยอด! ได้ครบ ${config.targetAmount} ${config.outputUnit} พอดีเลย 🎉`;
    }
    return `ได้ ${currentAmount} ${config.outputUnit} เยอะเกินไปนิดนึงนะ 😅`;
  }

  return `ต้อง${verb}${config.inputUnit}กี่ครั้งนะ! ${config.inputEmoji}`;
}

export function LoopScene({
  config,
  currentAmount,
  currentLoop,
  totalLoops,
  isRunning,
  boboState,
}: LoopSceneProps) {
  const t = THEME[config.theme];

  const currentGlass = getCurrentGlass(isRunning, currentAmount, config.targetAmount);
  const chipText = getChipText(config, isRunning, currentAmount, currentLoop, totalLoops);

  return (
    <div
      style={{
        background: config.theme === "juice"
          ? "url('/images/step-counting/juice-shop.svg') center center/cover no-repeat"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(4px)",
        border: `2px solid ${t.sceneBorder}`,
        borderRadius: 28,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 500,
        height: 500,
        gap: 16,
        boxShadow: "0 12px 40px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.8)",
      }}
    >

      {/* Spacer to align glasses with the counter */}
      <div style={{ height: 125, flexShrink: 0 }} />

      {/* Glasses */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap", margin: "0", flexShrink: 0 }}>
        {Array.from({ length: config.targetAmount }, (_, i) => (
          <Glass
            key={i}
            index={i}
            currentAmount={currentAmount}
            currentGlass={currentGlass}
            isRunning={isRunning}
            theme={config.theme}
          />
        ))}
      </div>

      {/* Mascot + chip */}
      <BoboMascot
        boboState={boboState}
        chipText={chipText}
        hintBorderColor={t.hintBorder}
        ratioTextColor={t.ratioText}
      />
    </div>
  );
}
