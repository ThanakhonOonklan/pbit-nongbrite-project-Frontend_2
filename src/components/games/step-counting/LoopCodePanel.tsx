"use client";

import React from "react";
import type { ResolvedLoopConfig, LoopTask, LoopTheme } from "@/constants/games/step-counting-levels";
import { TiltButton } from "react-tilt-button";
import { FaPlay } from "react-icons/fa";
import { Glass } from "./Glass";

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
  loopCounts: number[];
  onLoopChange: (taskIndex: number, delta: number) => void;
  onRun: () => void;
  isRunning: boolean;
  activeTaskIndex?: number;
}

// ── Task row (counting-classification style) ───────────────────
function TaskRow({
  task,
  taskIndex,
  loopCount,
  onLoopChange,
  isRunning,
  isActive,
}: {
  task: LoopTask;
  taskIndex: number;
  loopCount: number;
  onLoopChange: (taskIndex: number, delta: number) => void;
  isRunning: boolean;
  isActive: boolean;
}) {
  const minusDisabled = isRunning || loopCount <= 0;
  const plusDisabled = isRunning || loopCount >= task.maxStepper;

  const rc = ROW_LIGHT[task.theme];

  return (
    <div style={{
      background: rc.bg,
      borderRadius: 22,
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: `2px solid ${isActive ? rc.accent : rc.border}`,
      boxShadow: isActive ? `0 0 0 3px ${rc.accent}44` : "0 1px 4px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.2s, border-color 0.2s",
      flexShrink: 0,
    }}>
      {/* Colored icon bubble */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: rc.icon,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 3px 10px ${rc.icon}88`,
      }}>
        <span style={{ fontSize: 28 }}>{task.inputEmoji}</span>
      </div>

      {/* Name */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ color: rc.text, fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>{task.inputUnit}</div>
      </div>

      {/* Minus */}
      <TiltButton
        variant="solid"
        width={42} height={42} elevation={4} pressInset={4}
        tilt={0.85} radius={12} motion={40}
        surfaceColor={minusDisabled ? "#F5F5F5" : MINUS_BG}
        sideColor={minusDisabled ? "#E0E0E0" : "#BDBDBD"}
        textColor={minusDisabled ? "#BDBDBD" : "#757575"}
        glareOpacity={0} glareWidth={0}
        disabled={minusDisabled}
        onClick={() => onLoopChange(taskIndex, -1)}
      >
        <span style={{ fontSize: 24, fontWeight: "900", lineHeight: 1 }}>−</span>
      </TiltButton>

      {/* Count display */}
      <div key={loopCount} style={{
        background: "#ffffff",
        border: `2px solid ${rc.accent}`,
        borderRadius: 12,
        minWidth: 50,
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        fontWeight: 900,
        color: rc.accent,
        boxShadow: `0 2px 6px ${rc.accent}33`,
        animation: "pop-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}>
        {loopCount}
      </div>

      {/* Plus */}
      <TiltButton
        variant="solid"
        width={42} height={42} elevation={4} pressInset={4}
        tilt={0.85} radius={12} motion={40}
        surfaceColor={plusDisabled ? "#F5F5F5" : PLUS_BG}
        sideColor={plusDisabled ? "#E0E0E0" : "#45B8B6"}
        textColor={plusDisabled ? "#BDBDBD" : "#FFFFFF"}
        glareOpacity={0} glareWidth={0}
        disabled={plusDisabled}
        onClick={() => onLoopChange(taskIndex, 1)}
      >
        <span style={{ fontSize: 24, fontWeight: "900", lineHeight: 1 }}>+</span>
      </TiltButton>

    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export function LoopCodePanel({
  config,
  loopCounts,
  onLoopChange,
  onRun,
  isRunning,
  activeTaskIndex = 0,
}: LoopCodePanelProps) {
  const runDisabled = isRunning || loopCounts.some((c) => c === 0);

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
      {/* ── Zone 2: RULES — teal game-theme, shows ratio per fruit ── */}
      <div style={{
        background: "#E0F7F6",
        borderRadius: 20,
        padding: "clamp(6px,1.2vw,10px) clamp(8px,1.5vw,14px)",
        border: "2px solid #80CBC4",
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: config.tasks.length > 1 ? "1fr 1fr" : "1fr",
        justifyItems: config.tasks.length === 1 ? "center" : "stretch",
        gap: "clamp(4px,1vw,8px)",
      }}>
        {config.tasks.map((task, i) => {
          return (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 12,
              padding: "clamp(5px,1vw,8px) clamp(6px,1.2vw,10px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(4px,1vw,8px)",
              border: "1.5px solid #B2DFDB",
              minWidth: 0,
              width: config.tasks.length === 1 ? "auto" : "100%",
            }}>
              {/* Icon */}
              <div style={{
                width: "clamp(28px,4vw,48px)", height: "clamp(28px,4vw,48px)",
                borderRadius: 8, background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: "clamp(20px,3vw,38px)" }}>{task.inputEmoji}</span>
              </div>
              {/* Rule: 1 ลูก → [Glass(es) scaled] */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(2px,0.5vw,4px)", minWidth: 0, overflow: "visible" }}>
                <div style={{ fontSize: "clamp(9px,1.2vw,14px)", fontWeight: 700, color: "#00695C", whiteSpace: "nowrap" }}>1 ลูก →</div>
                <div style={{ display: "flex", gap: 0, alignItems: "center", height: "clamp(36px,5vw,56px)", overflow: "visible" }}>
                  {task.yieldsPerAction <= 1
                    ? (
                      <div style={{ transform: "scale(0.60)", transformOrigin: "center center", width: "clamp(22px,3vw,32px)", flexShrink: 0 }}>
                        <Glass index={0} taskIndex={i * 100 + 99} currentAmount={task.yieldsPerAction} currentGlass={-1} isRunning={false} theme={task.theme} showLabel={false} />
                      </div>
                    )
                    : Array.from({ length: task.yieldsPerAction }, (_, gi) => (
                      <div key={gi} style={{ transform: "scale(0.60)", transformOrigin: "center center", width: "clamp(20px,2.8vw,30px)", flexShrink: 0 }}>
                        <Glass index={gi} taskIndex={i * 100 + 99} currentAmount={task.yieldsPerAction} currentGlass={-1} isRunning={false} theme={task.theme} showLabel={false} />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Zone 3: STEPPERS — white/gray, one row per fruit ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
        {config.tasks.map((task, idx) => (
          <TaskRow
            key={idx}
            task={task}
            taskIndex={idx}
            loopCount={loopCounts[idx] ?? 0}
            onLoopChange={onLoopChange}
            isRunning={isRunning}
            isActive={isRunning && activeTaskIndex === idx}
          />
        ))}
      </div>

      {/* ── Run button ── */}
      <div style={{ flexShrink: 0 }}>
        <TiltButton
          variant="solid"
          width="100%"
          height={60}
          elevation={7}
          pressInset={7}
          tilt={0.85}
          radius={18}
          motion={40}
          surfaceColor={runDisabled ? "#E0E0E0" : "#22C55E"}
          sideColor={runDisabled ? "#BDBDBD" : "#15803D"}
          textColor={runDisabled ? "#9E9E9E" : "#ffffff"}
          glareOpacity={0}
          glareWidth={0}
          disabled={runDisabled}
          onClick={onRun}
        >
          <span style={{ fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", gap: 10 }}>
            {isRunning ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
                กำลังทำงาน...
              </>
            ) : (
              <><FaPlay className="w-4 h-4" /> เริ่มเลย!</>
            )}
          </span>
        </TiltButton>
      </div>
    </div>
  );
}
