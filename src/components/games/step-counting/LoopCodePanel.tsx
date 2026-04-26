"use client";

import React from "react";
import Image from "next/image";
import type { LoopLevelConfig } from "@/constants/games/step-counting-levels";
import { TiltButton } from "react-tilt-button";

// ── LoopCodePanel ──────────────────────────────────────────────
interface LoopCodePanelProps {
  config: LoopLevelConfig;
  loopCount: number;
  onLoopChange: (delta: number) => void;
  onRun: () => void;
  isRunning: boolean;
}

export function LoopCodePanel({
  config,
  loopCount,
  onLoopChange,
  onRun,
  isRunning,
}: LoopCodePanelProps) {
  const minusDisabled = isRunning || loopCount <= 0;
  const plusDisabled = isRunning || loopCount >= config.maxStepper;
  const runDisabled = isRunning || loopCount === 0;

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "2px solid rgba(0,0,0,0.08)",
        borderRadius: 28,
        padding: 24,
        boxShadow: "0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* 1. Question (Goal) */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, color: "#D85A30", fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
          ต้อง{config.theme === "candle" ? "จุด" : config.theme === "garden" ? "หว่าน" : "คั้น"}{config.inputUnit}กี่ครั้ง <br />เพื่อให้ได้ {config.targetAmount} {config.outputUnit}?
        </h2>
      </div>

      {/* 2. Rule */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFF7E6 0%, #FFF0D4 100%)",
          border: "2px solid #EF9F27",
          borderRadius: 16,
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 16,
          color: "#4A2B04",
          fontWeight: 800,
          boxShadow: "0 4px 12px rgba(239,159,39,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {config.inputImage ? (
            <Image src={config.inputImage} alt={config.inputUnit} width={36} height={36} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} />
          ) : (
            <span style={{ fontSize: 28 }}>{config.inputEmoji}</span>
          )}
          <span>{config.actionLabel}</span>
        </div>

        <span style={{ color: "#D97706", fontWeight: 900, fontSize: 20 }}>→</span>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {config.outputImage ? (
            <Image src={config.outputImage} alt={config.outputUnit} width={30} height={30} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} />
          ) : (
            <span style={{ fontSize: 28 }}>{config.outputEmoji}</span>
          )}
          <span style={{ color: "#D97706" }}>ได้ {config.yieldLabel}</span>
        </div>
      </div>

      {/* 3. Input & Real-time Calculation */}
      <div
        style={{
          background: "linear-gradient(135deg, #F0EFFF 0%, #E6E5FA 100%)",
          border: "2px solid #AFA9EC",
          borderRadius: 20,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "inset 0 2px 6px rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#2E286C" }}>
            {config.loopLabel}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <TiltButton
              variant="solid"
              width={48}
              height={48}
              elevation={5}
              pressInset={5}
              tilt={0.85}
              radius={24}
              motion={50}
              surfaceColor={minusDisabled ? "#E5E7EB" : "#ffffff"}
              sideColor={minusDisabled ? "#D1D5DB" : "#AFA9EC"}
              textColor={minusDisabled ? "#9CA3AF" : "#3C3489"}
              glareOpacity={0}
              glareWidth={0}
              disabled={minusDisabled}
              onClick={() => onLoopChange(-1)}
            >
              <span style={{ fontSize: 32, fontWeight: "900", lineHeight: 1, marginTop: "-4px" }}>−</span>
            </TiltButton>
            <div
              key={loopCount}
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "3px solid #C4C0F0",
                borderRadius: 16,
                minWidth: 64,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 900,
                color: "#2E286C",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                animation: "pop-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              {loopCount}
            </div>
            <TiltButton
              variant="solid"
              width={48}
              height={48}
              elevation={5}
              pressInset={5}
              tilt={0.85}
              radius={24}
              motion={50}
              surfaceColor={plusDisabled ? "#E5E7EB" : "#ffffff"}
              sideColor={plusDisabled ? "#D1D5DB" : "#AFA9EC"}
              textColor={plusDisabled ? "#9CA3AF" : "#3C3489"}
              glareOpacity={0}
              glareWidth={0}
              disabled={plusDisabled}
              onClick={() => onLoopChange(1)}
            >
              <span style={{ fontSize: 32, fontWeight: "900", lineHeight: 1, marginTop: "-2px" }}>+</span>
            </TiltButton>
          </div>
        </div>

        {/* 4. Real-time Calculation */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            border: "3px dashed #C4C0F0",
            fontSize: 22,
            fontWeight: 900,
            color: "#3C3489",
          }}
        >
          {loopCount === 0 ? (
            <span style={{ fontSize: 18, color: "#8E88D6", fontWeight: 700 }}>
              ลองกดปุ่ม + ดูสิ!
            </span>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "pop-bounce 0.3s ease" }}>
                {config.inputImage ? (
                  <Image src={config.inputImage} alt={config.inputUnit} width={32} height={32} />
                ) : (
                  <span style={{ fontSize: 28 }}>{config.inputEmoji}</span>
                )}
                <span>{loopCount} {config.inputUnit}</span>
              </div>
              <span style={{ color: "#D97706", fontSize: 24 }}>=</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "pop-bounce 0.3s ease" }}>
                {config.outputImage ? (
                  <Image src={config.outputImage} alt={config.outputUnit} width={32} height={32} />
                ) : (
                  <span style={{ fontSize: 28 }}>{config.outputEmoji}</span>
                )}
                <span style={{ color: "#D85A30" }}>
                  {Math.round(loopCount * config.yieldsPerAction * 10) / 10} {config.outputUnit}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <TiltButton
          variant="solid"
          width="100%"
          height={72}
          elevation={8}
          pressInset={8}
          tilt={0.85}
          radius={20}
          motion={40}
          surfaceColor={runDisabled ? "#D1D5DB" : isRunning ? "#9CA3AF" : "#EF5A24"}
          sideColor={runDisabled ? "#B4B2A9" : isRunning ? "#6B7280" : "#C44517"}
          textColor="#ffffff"
          glareOpacity={0}
          glareWidth={0}
          disabled={runDisabled}
          onClick={onRun}
        >
          <span style={{ fontSize: 26, fontWeight: 900, display: "flex", alignItems: "center", gap: 12 }}>
            {isRunning ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: "1.5rem" }}>⏳</span>
                กำลังทำงาน...
              </>
            ) : (
              <>▶ เริ่มเลย!</>
            )}
          </span>
        </TiltButton>
      </div>
    </div>
  );
}
