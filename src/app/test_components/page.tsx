"use client";

import { useState } from "react";
import {
  ShapeIcon,
  ShapeScene,
  CounterRow,
  CounterPanel,
} from "@/components/games/counting-classification";
import {
  countingClassificationLevels,
  type ShapeType,
  SHAPE_LABELS,
} from "@/constants/games/counting-classification-levels";
import {
  InputField,
  PasswordField,
  PrimaryButton,
  Container,
  DifficultyIndicator,
  Counter,
  CountUp,
  OTPInput,
  LoadingSpinner,
  KawaiiProgressBar,
  StarRating,
} from "@/components/common";
import { StatCard } from "@/components/profile";
import { FaHeart } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";

export default function TestComponentsPage() {
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const [counterValue, setCounterValue] = useState(5);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Buttons ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">Buttons</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <PrimaryButton variant="amethyst">Amethyst</PrimaryButton>
            <PrimaryButton variant="summer-sky">Summer Sky</PrimaryButton>
            <PrimaryButton variant="pastel-green">Pastel Green</PrimaryButton>
            <PrimaryButton variant="illusion">Illusion</PrimaryButton>
          </div>
        </Container>

        {/* ── Input & OTP ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">Input / OTP</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <div className="w-64">
              <InputField label="Email" placeholder="hello@example.com" type="email" />
            </div>
            <div className="w-64">
              <PasswordField label="Password" placeholder="Enter password" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">OTP</p>
              <OTPInput
                length={6}
                value={otpValue}
                onChange={setOtpValue}
                onComplete={(v: string) => console.log("OTP:", v)}
              />
            </div>
          </div>
        </Container>

        {/* ── Counter / CountUp ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">Counter / CountUp</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <Counter value={counterValue} />
              <PrimaryButton size="sm" onClick={() => setCounterValue(v => v + 1)}>+1</PrimaryButton>
              <PrimaryButton size="sm" variant="illusion" onClick={() => setCounterValue(v => Math.max(0, v - 1))}>-1</PrimaryButton>
            </div>
            <CountUp from={0} to={1234} duration={1.5} className="text-2xl font-bold text-[#242E39]" />
          </div>
        </Container>

        {/* ── DifficultyIndicator ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">DifficultyIndicator</h2>
          <div className="flex gap-4">
            <DifficultyIndicator level={1} />
            <DifficultyIndicator level={2} />
            <DifficultyIndicator level={3} />
          </div>
        </Container>

        {/* ── LoadingSpinner ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">LoadingSpinner</h2>
          <div className="flex gap-6 items-center">
            <LoadingSpinner size="sm" className="border-[#1cb0f6] border-t-transparent" />
            <LoadingSpinner size="md" className="border-[#1cb0f6] border-t-transparent" />
            <LoadingSpinner size="lg" className="border-[#1cb0f6] border-t-transparent" />
          </div>
        </Container>

        {/* ── StarRating ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">StarRating</h2>
          <div className="flex gap-6 items-center">
            <StarRating stars={0} />
            <StarRating stars={1} />
            <StarRating stars={2} />
            <StarRating stars={3} />
          </div>
        </Container>

        {/* ── StatCard ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">StatCard</h2>
          <StatCard
            icon={<FaHeart className="w-7 h-7 text-[#FF4D4D]" />}
            title="Premium Member"
            description="Unlock all premium features"
            iconBgColor="bg-[#E8F4FF]"
          />
        </Container>

        {/* ── TiltButton ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">TiltButton</h2>
          <div className="flex gap-4 items-center">
            <TiltButton
              width={84} height={90} elevation={12} pressInset={12}
              tilt={1.33} radius={18} motion={94}
              surfaceColor="#FB96BB" sideColor="#c97896" textColor="#ffffff"
              borderColor="#e888ab" borderWidth={4}
              glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
            >
              1
            </TiltButton>
            <TiltButton
              width={84} height={90} elevation={12} pressInset={12}
              tilt={1.33} radius={18} motion={94}
              surfaceColor="#1FA7E1" sideColor="#1584b4" textColor="#ffffff"
              borderColor="#1a95c9" borderWidth={4}
              glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
            >
              2
            </TiltButton>
          </div>
        </Container>

        {/* ── Confetti ── */}
        <Container className="p-5">
          <h2 className="text-lg font-bold text-[#242E39] mb-3">Confetti (canvas-confetti)</h2>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton
              variant="texas-rose"
              onClick={() => {
                import('canvas-confetti').then(mod => {
                  mod.default({ particleCount: 80, spread: 70, origin: { y: 0.6 }, ticks: 120, gravity: 1.5, decay: 0.92 });
                });
              }}
            >
              🎉 Basic
            </PrimaryButton>
            <PrimaryButton
              variant="illusion"
              onClick={() => {
                import('canvas-confetti').then(mod => {
                  const confetti = mod.default;
                  const end = Date.now() + 2000;
                  const colors = ['#1CB0F6', '#FED301', '#FF6B6B', '#4CAF50'];
                  (function frame() {
                    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
                    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
                    if (Date.now() < end) requestAnimationFrame(frame);
                  })();
                });
              }}
            >
              🎆 Fireworks
            </PrimaryButton>
            <PrimaryButton
              variant="pastel-green"
              onClick={() => {
                import('canvas-confetti').then(mod => {
                  mod.default({
                    particleCount: 80, spread: 100,
                    origin: { y: 0.5 }, shapes: ['star'],
                    colors: ['#FED301', '#FFB356', '#FF8B8B'],
                  });
                });
              }}
            >
              ⭐ Stars
            </PrimaryButton>
          </div>
        </Container>

        {/* ── Counting Classification Components ── */}
        <CCTestSection />

      </div>
    </div>
  );
}

// ─── sub-component เพื่อให้ hooks ทำงานได้ถูก scope ──────────────────────────
function CCTestSection() {
  const level1Config = countingClassificationLevels[1];
  const ALL_TYPES = level1Config.shapeTypes;

  // CounterRow demo
  const [rowValue, setRowValue] = useState(0);

  // CounterPanel demo
  const [panelCounts, setPanelCounts] = useState<Record<ShapeType, number>>(
    Object.fromEntries(ALL_TYPES.map((t) => [t, 0])) as Record<ShapeType, number>
  );

  return (
    <>
      {/* ── ShapeIcon ── */}
      <Container className="p-5">
        <h2 className="text-lg font-bold text-[#242E39] mb-3">
          ShapeIcon — รูปทรงเลขาคณิตทั้ง 5 แบบ
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          {(["circle", "triangle", "square", "pentagon", "hexagon"] as ShapeType[]).map((type) => (
            <div key={type} className="flex flex-col items-center gap-1">
              <ShapeIcon type={type} size={56} />
              <span className="text-xs text-gray-500">{SHAPE_LABELS[type]}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span className="text-sm text-gray-400">ขนาดต่างๆ:</span>
          {([32, 48, 64, 80] as number[]).map((size) => (
            <ShapeIcon key={size} type="hexagon" size={size} />
          ))}
        </div>
      </Container>

      {/* ── ShapeScene ── */}
      <Container className="p-5">
        <h2 className="text-lg font-bold text-[#242E39] mb-3">
          ShapeScene — ด่าน 1 (วงกลม + สามเหลี่ยม, 4 รูป)
        </h2>
        <div className="h-[260px] rounded-2xl overflow-hidden">
          <ShapeScene placements={level1Config.shapes} />
        </div>
      </Container>

      {/* ── CounterRow ── */}
      <Container className="p-5">
        <h2 className="text-lg font-bold text-[#242E39] mb-3">
          CounterRow — แถวนับเดียว (interactive)
        </h2>
        <div className="max-w-sm">
          <CounterRow
            type="triangle"
            value={rowValue}
            maxValue={10}
            onIncrement={() => setRowValue((v) => Math.min(10, v + 1))}
            onDecrement={() => setRowValue((v) => Math.max(0, v - 1))}
          />
          <p className="text-xs text-gray-400 mt-2">ค่าปัจจุบัน: {rowValue}</p>
        </div>
      </Container>

      {/* ── CounterPanel ── */}
      <Container className="p-5">
        <h2 className="text-lg font-bold text-[#242E39] mb-3">
          CounterPanel — แผงนับทั้งหมด (interactive)
        </h2>
        <div className="max-w-xs">
          <CounterPanel
            shapeTypes={ALL_TYPES}
            counts={panelCounts}
            maxPerShape={9}
            onCountChange={(type, val) =>
              setPanelCounts((prev) => ({ ...prev, [type]: val }))
            }
            onSubmit={() => alert("ส่งคำตอบ: " + JSON.stringify(panelCounts))}
          />
        </div>
      </Container>
    </>
  );
}
