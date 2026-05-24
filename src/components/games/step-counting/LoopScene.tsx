"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { ResolvedLoopConfig, LoopTheme } from "@/constants/games/step-counting-levels";
import { BOBO_IMAGES } from "./constants";
import { Glass } from "./Glass";
import { Blender, type BlenderPhase } from "./Blender";

// ── Main LoopScene ─────────────────────────────────────────────
export interface GlassData {
  id: string;
  taskIdx: number;
  glassIdxWithinTask: number;
  theme: LoopTheme;
  actualTheme: LoopTheme | null;
  filled: number;
  status: "ok" | "over" | "wrong" | null;
}

export interface LoopSceneProps {
  config: ResolvedLoopConfig;
  glasses: GlassData[];
  isRunning: boolean;
  boboState: "idle" | "squeeze" | "celebrate" | "bounce";
  boboMessage?: string | null;
  blenderDrop?: { emoji: string; id: number } | null;
  blenderPhase: BlenderPhase;
  blenderTheme: LoopTheme | null;
  blenderFruitCount: number;
  blenderCapacity: number;
  blenderResidueTheme: LoopTheme | null;
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

// ── Flat glass row ──────
function GlassRow({
  glasses,
  isRunning,
  targetGlassId,
  rowZ,
  rowTop,
  sceneWidth,
}: {
  glasses: GlassData[];
  isRunning: boolean;
  targetGlassId: string | undefined;
  rowZ: number;
  rowTop: string;
  sceneWidth: number;
}) {
  const glassW = Math.max(24, Math.min(58, Math.floor((sceneWidth * 0.45) / Math.max(1, glasses.length)) - 3));

  return (
    <div
      className="absolute left-0 w-full flex justify-center items-end"
      style={{ top: rowTop, transform: "translateY(-100%)", zIndex: rowZ, gap: "clamp(2px, 0.5vw, 6px)" }}
    >
      {glasses.map((g, idx) => {
        const isCurrent = g.id === targetGlassId && isRunning;
        return (
          <Glass
            key={g.id}
            index={g.glassIdxWithinTask}
            taskIndex={g.taskIdx}
            currentAmount={g.filled}
            currentGlass={isCurrent ? g.glassIdxWithinTask : -1}
            isRunning={isCurrent}
            theme={g.theme}
            actualTheme={g.actualTheme}
            showOverflow={g.status === "over"}
            sizeOverride={glassW}
            enterDelay={parseFloat((idx * 0.07).toFixed(2))}
          />
        );
      })}
    </div>
  );
}

// ── LoopScene ──────────────────────────────────────────────────
export function LoopScene({
  config,
  glasses,
  isRunning,
  boboState,
  boboMessage,
  blenderDrop,
  blenderPhase,
  blenderTheme,
  blenderFruitCount,
  blenderCapacity,
  blenderResidueTheme,
}: LoopSceneProps) {
  const t = useTranslations("StepCounting");
  const tasks = config.tasks;
  
  // Split glasses into two rows if there are more than 4 glasses, to fit screen
  const splitIndex = glasses.length > 4 ? Math.ceil(glasses.length / 2) : glasses.length;
  const row1Glasses = glasses.slice(0, splitIndex);
  const row2Glasses = glasses.slice(splitIndex);
  const hasRow2 = row2Glasses.length > 0;
  const targetGlassId = glasses.find(g => g.filled < 1)?.id;

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
        {/* ── z-25: Blender — right side of shop counter ── */}
        <div style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          zIndex: 25,
          width: "clamp(70px, 12vw, 140px)",
          pointerEvents: "none",
        }}>
          <Blender
            phase={blenderPhase}
            theme={blenderTheme}
            fruitCount={blenderFruitCount}
            capacity={blenderCapacity}
            residueTheme={blenderResidueTheme}
          />
        </div>

        {/* ── z-20: Bobo — beside the shop, bottom left ── */}
        <div
          className="bobo-mascot"
          style={{
            position: "absolute",
            bottom: "2%",
            left: "1%",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SpeechBubble
            tailSide="left"
            lines={(() => {
              if (boboMessage) return [boboMessage];
              const tkList = tasks;
              const getYieldLabel = (yields: number) => {
                if (yields === 0.5) return t("yieldHalf");
                if (yields === 1) return t("yieldOne");
                return t("yieldTwo");
              };
              if (tkList.length === 1) {
                return [
                  t("boboRecipeSingle", { emoji: tkList[0].inputEmoji, ratio: getYieldLabel(tkList[0].yieldsPerAction) }),
                  t("boboTargetSingle", { target: tkList[0].targetAmount }),
                ];
              }
              const summary = tkList.map(tk => `${tk.inputEmoji}${tk.targetAmount}`).join(" ");
              return [
                t("boboTargetMulti", { summary }),
                t("boboQuestionMulti"),
              ];
            })()}
          />
          <motion.img
            src={BOBO_IMAGES[boboState] ?? BOBO_IMAGES.idle}
            alt="Bobo"
            width={90}
            height={90}
            className="bobo-mascot-image"
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
          }}> {t("shopSign")} </span>
        </div>

        {/* ── z-5: Shop image ── */}
        <Image
          src="/images/step-counting/juice-shop.svg"
          alt="Juice Shop"
          fill
          style={{ objectFit: "contain", objectPosition: "center bottom", zIndex: 5 }}
        />

        {/* ── Row 1 on counter ── */}
        <GlassRow
          glasses={row1Glasses}
          isRunning={isRunning}
          targetGlassId={targetGlassId}
          rowZ={10}
          rowTop="52%"
          sceneWidth={sceneWidth}
        />

        {/* ── Row 2 on display shelf ── */}
        {hasRow2 && (
          <GlassRow
            glasses={row2Glasses}
            isRunning={isRunning}
            targetGlassId={targetGlassId}
            rowZ={15}
            rowTop="77%"
            sceneWidth={sceneWidth}
          />
        )}

        <style>{`
          @media (max-width: 640px) {
            .bobo-mascot {
              bottom: 0 !important;
              left: 3% !important;
              z-index: 8 !important;
              transform: scale(0.88);
              transform-origin: left bottom;
            }

            .bobo-mascot > div:first-child {
              display: none;
            }
          }
        `}</style>

      </div>
    </div>
  );
}
