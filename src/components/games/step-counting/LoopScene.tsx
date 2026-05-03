"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { ResolvedLoopConfig } from "@/constants/games/step-counting-levels";
import { BOBO_IMAGES } from "./constants";
import { Glass } from "./Glass";

// ── Main LoopScene ─────────────────────────────────────────────
export interface LoopSceneProps {
  config: ResolvedLoopConfig;
  filledAmounts: number[];
  currentTaskIndex: number;
  isRunning: boolean;
  boboState: "idle" | "squeeze" | "celebrate" | "bounce";
  taskStatuses?: ("ok" | "over" | null)[];
  blenderDrop?: { emoji: string; id: number } | null;
}

// ── Helper ─────────────────────────────────────────────────────
function getCurrentGlass(isActive: boolean, filledAmount: number, targetAmount: number): number {
  return isActive && filledAmount > 0 && filledAmount <= targetAmount
    ? Math.min(Math.floor(filledAmount - 0.001), targetAmount - 1)
    : -1;
}

// ── Speech bubble ──────────────────────────────────────────────
function SpeechBubble({ lines, tailSide }: { lines: string[]; tailSide: "left" | "right" }) {
  return (
    <div style={{ position: "relative", marginBottom: 6 }}>
      <div style={{
        background: "#FFFFFF",
        border: "2px solid #E0E0E0",
        borderRadius: 14,
        padding: "6px 10px",
        fontSize: 11,
        fontWeight: 700,
        color: "#333",
        textAlign: "center",
        lineHeight: 1.5,
        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        whiteSpace: "nowrap",
      }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      {/* bubble tail */}
      <div style={{
        position: "absolute",
        bottom: -7,
        [tailSide]: 14,
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: "8px solid #E0E0E0",
      }} />
      <div style={{
        position: "absolute",
        bottom: -5,
        [tailSide]: 15,
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "7px solid #FFFFFF",
        zIndex: 1,
      }} />
    </div>
  );
}

// ── Multi-task glass row (renders 1-2 tasks side-by-side) ──────
function MultiTaskRow({
  tasks,
  startIdx,
  filledAmounts,
  currentTaskIndex,
  isRunning,
  taskStatuses,
  rowZ,
  rowTop,
  sceneWidth,
}: {
  tasks: ResolvedLoopConfig["tasks"];
  startIdx: number;
  filledAmounts: number[];
  currentTaskIndex: number;
  isRunning: boolean;
  taskStatuses?: ("ok" | "over" | null)[];
  rowZ: number;
  rowTop: string;
  sceneWidth: number;
}) {
  const totalGlasses = tasks.reduce((s, t) => s + t.targetAmount, 0);
  const glassW = Math.max(24, Math.min(58, Math.floor((sceneWidth * 0.45) / totalGlasses) - 3));

  let glassOffset = 0;
  return (
    <div
      className="absolute left-0 w-full flex justify-center items-end"
      style={{ top: rowTop, transform: "translateY(-100%)", zIndex: rowZ, gap: "clamp(2px, 0.5vw, 6px)" }}
    >
      {tasks.map((task, ti) => {
        const taskIdx = startIdx + ti;
        const filled = filledAmounts[taskIdx] ?? 0;
        const isActiveTask = isRunning && currentTaskIndex === taskIdx;
        const currentGlass = getCurrentGlass(isActiveTask, filled, task.targetAmount);
        const taskOffset = glassOffset;
        glassOffset += task.targetAmount;
        return (
          <React.Fragment key={taskIdx}>
            {Array.from({ length: task.targetAmount }, (_, i) => (
              <Glass
                key={`${taskIdx}-${i}`}
                index={i}
                taskIndex={taskIdx}
                currentAmount={filled}
                currentGlass={currentGlass}
                isRunning={isActiveTask}
                theme={task.theme}
                showOverflow={taskStatuses?.[taskIdx] === "over" && i === task.targetAmount - 1}
                sizeOverride={glassW}
                enterDelay={parseFloat(((taskOffset + i) * 0.07).toFixed(2))}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── LoopScene ──────────────────────────────────────────────────
export function LoopScene({
  config,
  filledAmounts,
  currentTaskIndex,
  isRunning,
  boboState,
  taskStatuses,
  blenderDrop,
}: LoopSceneProps) {
  const tasks = config.tasks;
  const row1Tasks = tasks.slice(0, 2);
  const row2Tasks = tasks.slice(2);
  const hasRow2 = row2Tasks.length > 0;

  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneWidth, setSceneWidth] = useState(800);
  const [drops, setDrops] = useState<Array<{ emoji: string; id: number }>>([]);
  useEffect(() => {
    const update = () => { if (sceneRef.current) setSceneWidth(sceneRef.current.offsetWidth); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!blenderDrop) return;
    setDrops(prev => [...prev, blenderDrop!]);
    const t = setTimeout(() => setDrops(prev => prev.filter(d => d.id !== blenderDrop!.id)), 900);
    return () => clearTimeout(t);
  }, [blenderDrop]);

  return (
    <div className="w-full h-full flex-1 relative overflow-hidden flex items-center justify-center">
      <div
        ref={sceneRef}
        className="relative flex-shrink-0"
        style={{
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "800 / 600",
          maxHeight: "100%",
        }}
      >
        {/* ── z-20: Bobo — beside the shop, bottom left ── */}
        <div style={{
          position: "absolute",
          bottom: "2%",
          left: "1%",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <SpeechBubble
            tailSide="left"
            lines={(() => {
              const t = tasks;
              if (t.length === 1) {
                return [
                  `${t[0].inputEmoji} 1 ลูก → ${t[0].yieldLabel}`,
                  `ต้องการ ${t[0].targetAmount} แก้ว ใช้กี่ลูก?`,
                ];
              }
              const summary = t.map(tk => `${tk.inputEmoji}${tk.targetAmount}`).join(" ");
              return [`${summary} แก้ว`, "ต้องใช้กี่ลูก?"];
            })()}
          />
          <motion.img
            src={BOBO_IMAGES[boboState] ?? BOBO_IMAGES.idle}
            alt="Bobo"
            width={90}
            height={90}
            style={{ width: "clamp(60px, 11vw, 130px)", height: "auto", display: "block" }}
            initial="idle"
            animate={boboState}
            variants={{
              idle: { scaleX: 1, scaleY: 1, rotate: 0, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
              squeeze: { scaleX: [1, 1.2, 0.95, 1], scaleY: [1, 0.75, 1.08, 1], transition: { duration: 0.38, ease: "easeInOut" } },
              celebrate: { rotate: [0, -14, 14, 0], y: [0, -6, -6, 0], transition: { duration: 0.55, ease: "easeInOut", repeat: Infinity } },
              bounce: { rotate: [0, -8, 8, 0], transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity } },
            }}
          />
        </div>

        {/* ── Blender drop animations ── */}
        <style>{`
          @keyframes blenderFall {
            0%   { transform: translateY(0) scale(1.2); opacity: 1; }
            70%  { transform: translateY(180px) scale(0.7); opacity: 1; }
            100% { transform: translateY(240px) scale(0.2); opacity: 0; }
          }
        `}</style>
        {drops.map(drop => (
          <div key={drop.id} style={{
            position: "absolute",
            left: "31%",
            top: "12%",
            zIndex: 1,
            fontSize: "clamp(14px, 2.5vw, 26px)",
            animation: "blenderFall 0.9s cubic-bezier(0.4,0,1,1) forwards",
            pointerEvents: "none",
            userSelect: "none",
          }}>
            {drop.emoji}
          </div>
        ))}

        {/* ── z-6: Shop name text ── */}
        <div style={{
          position: "absolute",
          top: "4%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          background: "rgba(255,255,255,0.88)",
          borderRadius: 20,
          padding: "clamp(3px,0.6vw,6px) clamp(10px,2vw,20px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
          border: "2px solid #80CBC4",
          whiteSpace: "nowrap",
        }}>
          <span style={{
            fontSize: "clamp(11px,1.8vw,20px)",
            fontWeight: 900,
            color: "#00897B",
            letterSpacing: 1,
          }}>ร้านคั้นน้ำผลไม้</span>
        </div>

        {/* ── z-5: Shop image ── */}
        <Image
          src="/images/step-counting/juice-shop.svg"
          alt="Juice Shop"
          fill
          style={{ objectFit: "contain", objectPosition: "center bottom", zIndex: 5 }}
        />

        {/* ── Row 1: tasks[0-1] on counter ── */}
        <MultiTaskRow
          tasks={row1Tasks}
          startIdx={0}
          filledAmounts={filledAmounts}
          currentTaskIndex={currentTaskIndex}
          isRunning={isRunning}
          taskStatuses={taskStatuses}
          rowZ={10}
          rowTop="52%"
          sceneWidth={sceneWidth}
        />

        {/* ── Row 2: tasks[2-3] on display shelf ── */}
        {hasRow2 && (
          <MultiTaskRow
            tasks={row2Tasks}
            startIdx={2}
            filledAmounts={filledAmounts}
            currentTaskIndex={currentTaskIndex}
            isRunning={isRunning}
            taskStatuses={taskStatuses}
            rowZ={15}
            rowTop="77%"
            sceneWidth={sceneWidth}
          />
        )}

      </div>
    </div>
  );
}
