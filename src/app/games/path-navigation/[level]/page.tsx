"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { FaArrowLeft, FaPlay, FaUndo } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";
import { Container, BackgroundSquares } from "@/components/common";
import {
  DirectionControls,
  CommandSequence,
  PathMap,
  HelpButton,
} from "@/components/games/path-navigation";
import {
  pathNavLevels,
  type Direction,
} from "@/constants/games/path-navigation-levels";

export default function PathNavigationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();

  const config = pathNavLevels[levelNum];

  // Commands state
  const [commands, setCommands] = useState<Direction[]>([]);

  const handleAddCommand = useCallback(
    (direction: Direction) => {
      if (!config) return;
      setCommands((prev) => {
        return [...prev, direction];
      });
    },
    [config]
  );

  const handleRemoveCommand = useCallback((index: number) => {
    setCommands((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearAll = useCallback(() => {
    setCommands([]);
  }, []);

  const handleRun = useCallback(() => {
    // TODO: Phase 2 — game logic
    console.log("Run commands:", commands);
  }, [commands]);

  const handleReset = useCallback(() => {
    setCommands([]);
  }, []);

  // Fallback ถ้าไม่มี config
  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F3F3FD]">
        <div className="text-center">
          <p className="text-xl font-bold mb-4 text-gray-800">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-2 bg-[#1CB0F6] text-white rounded-xl font-bold"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (

    <div
      className="flex flex-col bg-[#131F24] overflow-hidden"
      style={{ zoom: 1.1, height: `${100 / 1.1}vh` }}
    >

      {/* ===== TOP HEADER ===== */}
      <header className="flex items-center px-6 py-4 shrink-0">
        <button
          onClick={() => router.push("/courses")}
          className="flex items-center gap-2 text-sm font-semibold text-[#F1F7FB] hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Courses</span>
        </button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 gap-4 px-4 pb-4 overflow-hidden relative">

        {/* ===== LEFT PANEL: Path Map (60%) ===== */}
        <Container className="flex-[6] flex flex-col items-center justify-center p-6 overflow-auto !bg-[#131F24]">
          <p className="text-lg font-bold text-[#F1F7FB] mb-6">
            LEVEL {config.level} - {levelNum <= 3 ? "9" : levelNum <= 6 ? "9" : "9"}
          </p>
          <PathMap
            path={config.path}
            gridCols={config.gridCols}
            gridRows={config.gridRows}
            playerIndex={0}
          />
        </Container>

        {/* ===== RIGHT PANEL: Controls (40%) ===== */}
        <Container className="flex-[4] flex flex-col p-5 !bg-[#131F24]">
          {/* Command Sequence */}
          <div className="flex-1 mb-5">
            <CommandSequence
              commands={commands}
              onRemoveCommand={handleRemoveCommand}
              onClearAll={handleClearAll}
              onRun={handleRun}
              onAddCommand={handleAddCommand}
            />
          </div>

          {/* Direction Controls */}
          <div className="mb-6">
            <DirectionControls
              onAddCommand={handleAddCommand}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Run — full width 2/3 */}
            <div className="flex-[2]">
              <TiltButton
                width="100%"
                height={56}
                elevation={6}
                pressInset={6}
                tilt={0.5}
                radius={14}
                motion={60}
                surfaceColor="#4CAF50"
                sideColor="#388E3C"
                textColor="#ffffff"
                borderColor="transparent"
                borderWidth={0}
                glareOpacity={0}
                glareWidth={0}
                disabled={commands.length === 0}
                onClick={handleRun}
              >
                <span className="flex items-center gap-2 font-bold text-base">
                  <FaPlay className="w-4 h-4" /> Run
                </span>
              </TiltButton>
            </div>
            {/* Reset — 1/3 */}
            <div className="flex-1">
              <TiltButton
                width="100%"
                height={56}
                elevation={6}
                pressInset={6}
                tilt={0.5}
                radius={14}
                motion={60}
                surfaceColor="#ffffff"
                sideColor="#D1D5DB"
                textColor="#131F24"
                borderColor="transparent"
                borderWidth={0}
                glareOpacity={0}
                glareWidth={0}
                onClick={handleReset}
              >
                <span className="flex items-center gap-2 font-bold text-base">
                  <FaUndo className="w-4 h-4" /> Reset
                </span>
              </TiltButton>
            </div>
          </div>
        </Container>
      </div>

      <HelpButton />

    </div>

  );
}
