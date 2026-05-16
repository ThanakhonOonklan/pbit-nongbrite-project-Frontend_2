"use client";

import React from "react";
import type { ResolvedLoopConfig, LoopTask, LoopTheme } from "@/constants/games/step-counting-levels";
import { TiltButton } from "react-tilt-button";
import { Glass } from "./Glass";
import type { BlenderPhase } from "./Blender";

const ROW_LIGHT: Record<LoopTheme, { bg: string; border: string; text: string; accent: string; icon: string }> = {
  orange: { bg: "#FFF8F0", border: "#FFE0B2", text: "#BF360C", accent: "#F57F17", icon: "#FFB74D" },
  watermelon: { bg: "#FFF0F4", border: "#FFCDD2", text: "#880E4F", accent: "#E91E63", icon: "#EF5350" },
  pineapple: { bg: "#FFFEF5", border: "#FFF9C4", text: "#E65100", accent: "#F9A825", icon: "#FFD54F" },
  apple: { bg: "#F1F8F1", border: "#C8E6C9", text: "#1B5E20", accent: "#388E3C", icon: "#81C784" },
};

const PANEL_BG = "rgba(255,255,255,0.97)";
const PLUS_BG = "#6ED1CF";
const MINUS_BG = "#E0E0E0";

// ── LoopCodePanel ──────────────────────────────────────────────
interface LoopCodePanelProps {
  config: ResolvedLoopConfig;
  blenderContents: { theme: LoopTheme; count: number } | null;
  blenderPhase: BlenderPhase;
  lockedTheme: LoopTheme | null;
  totalFilled: number[];
  penaltyCount: number;
  onAddFruit: (theme: LoopTheme, delta: number) => void;
  onBlend: () => void;
  isBlending: boolean;
}


// ── Task row ───────────────────────────────────────────────────
function TaskRow({
  task,
  blenderContents,
  blenderPhase,
  lockedTheme,
  totalFilled,
  taskIndex,
  onAddFruit,
  isBlending,
}: {
  task: LoopTask;
  blenderContents: { theme: LoopTheme; count: number } | null;
  blenderPhase: BlenderPhase;
  lockedTheme: LoopTheme | null;
  totalFilled: number[];
  taskIndex: number;
  onAddFruit: (theme: LoopTheme, delta: number) => void;
  isBlending: boolean;
}) {
  const rc = ROW_LIGHT[task.theme];
  const isDirty = blenderPhase === "dirty";
  const filledHere = blenderContents?.theme === task.theme ? blenderContents.count : 0;
  const atCapacity = filledHere >= task.blenderCapacity;
  const isTaskDone = (totalFilled[taskIndex] ?? 0) >= task.targetAmount;

  const plusDisabled = isBlending || isDirty || atCapacity || isTaskDone;
  const minusDisabled = isBlending || isDirty || filledHere <= 0;

  const grayOut = isDirty;
  const rowBg = isTaskDone ? "#F1F8E9" : grayOut ? "#F5F5F5" : rc.bg;
  const rowBorder = isTaskDone ? "#AED581" : grayOut ? "#E0E0E0" : rc.border;
  const iconBg = isTaskDone ? "#DCEDC8" : grayOut ? "#E0E0E0" : rc.icon;
  const nameColor = grayOut ? "#BDBDBD" : rc.text;
  const countBorder = grayOut ? "#E0E0E0" : rc.accent;
  const countColor = grayOut ? "#BDBDBD" : rc.accent;

  return (
    <div style={{
      background: rowBg,
      borderRadius: 22,
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: `2px solid ${rowBorder}`,
      boxShadow: isTaskDone ? "0 1px 4px #AED58155" : "0 1px 4px rgba(0,0,0,0.05)",
      opacity: isTaskDone ? 0.75 : 1,
      transition: "all 0.2s",
      flexShrink: 0,
    }}>
      {/* Icon bubble */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: grayOut ? "none" : `0 3px 10px ${rc.icon}88`,
        position: "relative",
        transition: "background 0.2s",
      }}>
        <span style={{ fontSize: 26, filter: grayOut ? "grayscale(1)" : "none", transition: "filter 0.2s" }}>{task.inputEmoji}</span>
        {isTaskDone && (
          <span style={{ position: "absolute", bottom: -4, right: -4, fontSize: 14, lineHeight: 1 }}>✅</span>
        )}
      </div>

      {/* Name */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ color: nameColor, fontWeight: 800, fontSize: 14, lineHeight: 1.2, transition: "color 0.2s" }}>{task.inputUnit}</div>
      </div>

      {/* Minus */}
      <TiltButton
        variant="solid"
        width={38} height={38} elevation={4} pressInset={4}
        tilt={0.85} radius={12} motion={40}
        surfaceColor="#F5F5F5"
        sideColor="#E0E0E0"
        textColor="#BDBDBD"
        glareOpacity={0} glareWidth={0}
        disabled={minusDisabled}
        onClick={() => onAddFruit(task.theme, -1)}
      >
        <span style={{ fontSize: 22, fontWeight: "900", lineHeight: 1 }}>−</span>
      </TiltButton>

      {/* Count display */}
      <div style={{
        background: "#ffffff",
        border: `2px solid ${countBorder}`,
        borderRadius: 10,
        minWidth: 42,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 900,
        color: countColor,
        transition: "border-color 0.2s, color 0.2s",
      }}>
        {filledHere}
      </div>

      {/* Plus */}
      <TiltButton
        variant="solid"
        width={38} height={38} elevation={4} pressInset={4}
        tilt={0.85} radius={12} motion={40}
        surfaceColor={plusDisabled ? "#F5F5F5" : PLUS_BG}
        sideColor={plusDisabled ? "#E0E0E0" : "#45B8B6"}
        textColor={plusDisabled ? "#BDBDBD" : "#FFFFFF"}
        glareOpacity={0} glareWidth={0}
        disabled={plusDisabled}
        onClick={() => onAddFruit(task.theme, 1)}
      >
        <span style={{ fontSize: 22, fontWeight: "900", lineHeight: 1 }}>+</span>
      </TiltButton>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export function LoopCodePanel({
  config,
  blenderContents,
  blenderPhase,
  lockedTheme,
  totalFilled,
  penaltyCount,
  onAddFruit,
  onBlend,
  isBlending,
}: LoopCodePanelProps) {
  const isDirty = blenderPhase === "dirty";
  const isFilling = blenderPhase === "filling";
  const hasFruit = (blenderContents?.count ?? 0) > 0;
  const blendDisabled = isBlending || isDirty || !hasFruit;

  return (
    <div
      className="w-full h-full flex-1 flex flex-col gap-3 relative"
      style={{
        background: PANEL_BG,
        borderRadius: 28,
        padding: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "2px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* ── RULES: ratio per fruit ── */}
      <div style={{
        background: "#E0F7F6",
        borderRadius: 20,
        padding: "clamp(5px,1vw,9px) clamp(7px,1.2vw,12px)",
        border: "2px solid #80CBC4",
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: config.tasks.length > 1 ? "1fr 1fr" : "1fr",
        justifyItems: config.tasks.length === 1 ? "center" : "stretch",
        gap: "clamp(4px,0.8vw,7px)",
      }}>
        {config.tasks.map((task, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 12,
            padding: "clamp(4px,0.8vw,7px) clamp(5px,1vw,9px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px,0.8vw,7px)",
            border: "1.5px solid #B2DFDB",
            minWidth: 0,
            width: config.tasks.length === 1 ? "auto" : "100%",
          }}>
            <span style={{ fontSize: "clamp(18px,2.5vw,32px)", flexShrink: 0 }}>{task.inputEmoji}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(2px,0.4vw,4px)", minWidth: 0, overflow: "visible" }}>
              <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#00695C", whiteSpace: "nowrap" }}>1 ลูก →</div>
              <div style={{ display: "flex", gap: 0, alignItems: "center", height: "clamp(30px,4.5vw,50px)", overflow: "visible" }}>
                {task.yieldsPerAction <= 1
                  ? (
                    <div style={{ transform: "scale(0.55)", transformOrigin: "center center", width: "clamp(20px,2.8vw,30px)", flexShrink: 0 }}>
                      <Glass index={0} taskIndex={i * 100 + 99} currentAmount={task.yieldsPerAction} currentGlass={-1} isRunning={false} theme={task.theme} showLabel={false} />
                    </div>
                  )
                  : Array.from({ length: task.yieldsPerAction }, (_, gi) => (
                    <div key={gi} style={{ transform: "scale(0.55)", transformOrigin: "center center", width: "clamp(18px,2.5vw,28px)", flexShrink: 0 }}>
                      <Glass index={gi} taskIndex={i * 100 + 99} currentAmount={task.yieldsPerAction} currentGlass={-1} isRunning={false} theme={task.theme} showLabel={false} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FRUIT ROWS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
        {config.tasks.map((task, idx) => (
          <TaskRow
            key={idx}
            task={task}
            taskIndex={idx}
            blenderContents={blenderContents}
            blenderPhase={blenderPhase}
            lockedTheme={lockedTheme}
            totalFilled={totalFilled}
            onAddFruit={onAddFruit}
            isBlending={isBlending}
          />
        ))}
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        {/* Blend button */}
        <TiltButton
          variant="solid"
          width="100%"
          height={58}
          elevation={7}
          pressInset={7}
          tilt={0.85}
          radius={18}
          motion={40}
          surfaceColor={blendDisabled ? "#E0E0E0" : "#6ED1CF"}
          sideColor={blendDisabled ? "#BDBDBD" : "#45B8B6"}
          textColor={blendDisabled ? "#9E9E9E" : "#ffffff"}
          glareOpacity={0}
          glareWidth={0}
          disabled={blendDisabled}
          onClick={onBlend}
        >
          <span style={{ fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", gap: 10 }}>
            {isBlending
              ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span> กำลังคั้น...</>
              : <>คั้นน้ำเลย!</>
            }
          </span>
        </TiltButton>
      </div>
    </div>
  );
}
