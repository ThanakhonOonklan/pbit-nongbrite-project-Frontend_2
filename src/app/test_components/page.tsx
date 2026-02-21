"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  InputField,
  PasswordField,
  Divider,
  SocialButton,
  PrimaryButton,
  Container,

  GameTooltip,
  AnimatedList,
  DifficultyIndicator,
  Counter,
  CountUp,
  OuterContainer,
  Image,
  OTPInput,
  ResourceBar,
  LoadingSpinner,
  LoadingOverlay,
  KawaiiProgressBar,
  StarRating,
} from "@/components/common";
import { getLabelClassName } from "@/lib/label";
import { StatCard } from "@/components/profile";
import { FaCheck, FaHeart, FaLock } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";

// shadcn UI components
import { Button as UiButton } from "@/components/ui/button";
import { Input as UiInput } from "@/components/ui/input";
import {
  Tooltip as UiTooltip,
  TooltipTrigger as UiTooltipTrigger,
  TooltipContent as UiTooltipContent,
  TooltipProvider as UiTooltipProvider,
} from "@/components/ui/tooltip";
import { Separator as UiSeparator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Home, PanelLeft } from "lucide-react";

export default function TestComponentsPage() {
  const [selectedGenders, setSelectedGenders] = useState<Set<"male" | "female" | "not-specified">>(new Set());
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const [counterValue, setCounterValue] = useState(5);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeGameButton, setActiveGameButton] = useState<number | null>(null);
  const router = useRouter();
  const animatedItems = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];

  // จำลองการโหลด
  const simulateLoading = async (setState: (value: boolean) => void, duration: number) => {
    setState(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setState(false);
  };
  const gamePalettes = [
    { name: "Amethyst", main: "#9956DE", dark: "#7f45b8", border: "#8a4dc9" },
    { name: "Slate Blue", main: "#7274ED", dark: "#585aca", border: "#6668db" },
    { name: "Summer Sky", main: "#1FA7E1", dark: "#1584b4", border: "#1a95c9" },
    { name: "Downy", main: "#6ED1CF", dark: "#54aba9", border: "#60c1bf" },
    { name: "Pastel Green", main: "#75D06A", dark: "#5ea856", border: "#68c261" },
    { name: "Texas Rose", main: "#FFB356", dark: "#d18f3f", border: "#e8a449" },
    { name: "Mona Lisa", main: "#FF8B8B", dark: "#d17070", border: "#e77d7d" },
    { name: "Illusion", main: "#FB96BB", dark: "#d27a99", border: "#e68aac" },
    { name: "Sky Blue", main: "#61B6F6", dark: "#4a90c7", border: "#56a5e0" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#242E39] mb-2">Component Showcase</h1>
          <p className="text-gray-600">แสดงตัวอย่าง components ทั้งหมดในโปรเจ็ค</p>
        </div>

        {/* Button */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Button</h2>

            {/* PrimaryButton Styles */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <PrimaryButton variant="amethyst">Amethyst</PrimaryButton>
                <PrimaryButton variant="slate-blue">Slate Blue</PrimaryButton>
                <PrimaryButton variant="summer-sky">Summer Sky</PrimaryButton>
                <PrimaryButton variant="downy">Downy</PrimaryButton>
                <PrimaryButton variant="pastel-green">Pastel Green</PrimaryButton>
                <PrimaryButton variant="texas-rose">Texas Rose</PrimaryButton>
                <PrimaryButton variant="mona-lisa">Mona Lisa</PrimaryButton>
                <PrimaryButton variant="illusion">Illusion</PrimaryButton>
                <PrimaryButton variant="sky-blue">Sky Blue</PrimaryButton>
              </div>
            </div>

            {/* PrimaryButton Sizes */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <PrimaryButton size="sm">Small</PrimaryButton>
                <PrimaryButton size="default">Default</PrimaryButton>
                <PrimaryButton size="lg">Large</PrimaryButton>
                <PrimaryButton size="full">Full Width</PrimaryButton>
              </div>
            </div>
          </section>
        </Container>

        {/* Form Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Form Components</h2>

            {/* Input */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Input</h3>
              <div className="flex flex-wrap gap-4">
                <Input placeholder="Input default" />
              </div>
            </div>

            {/* Label (using utility function) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Label (Utility Function)</h3>
              <div className="flex flex-wrap gap-4">
                <label className={getLabelClassName()}>Label Default</label>
                <label htmlFor="input1" className={getLabelClassName()}>Label for Input</label>
                <label className={getLabelClassName("text-red-500")}>Label with Custom Style</label>
              </div>
            </div>

            {/* InputField */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">InputField</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <InputField
                  label="Email"
                  placeholder="zazajayzaza123@gmail.c.com"
                  type="email"
                />
              </div>
            </div>

            {/* PasswordField */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">PasswordField</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <PasswordField
                  label="Password"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Layout Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Layout Components</h2>

            {/* Divider */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Divider</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <Divider />
              </div>
            </div>

          </section>
        </Container>

        {/* Interactive Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Interactive Components</h2>

            {/* GameTooltip */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">GameTooltip</h3>
              <div className="flex flex-wrap gap-4">
                <GameTooltip>
                  <PrimaryButton>Hover me</PrimaryButton>
                </GameTooltip>
              </div>
            </div>

            {/* SocialButton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">SocialButton</h3>
              <div className="flex flex-wrap gap-4">
                <SocialButton
                  selected={selectedGenders.has("male")}
                  onSelect={(selected) => {
                    const newSet = new Set(selectedGenders);
                    if (selected) {
                      newSet.add("male");
                    } else {
                      newSet.delete("male");
                    }
                    setSelectedGenders(newSet);
                  }}
                >
                  เพศชาย
                </SocialButton>
                <SocialButton
                  selected={selectedGenders.has("female")}
                  onSelect={(selected) => {
                    const newSet = new Set(selectedGenders);
                    if (selected) {
                      newSet.add("female");
                    } else {
                      newSet.delete("female");
                    }
                    setSelectedGenders(newSet);
                  }}
                >
                  เพศหญิง
                </SocialButton>
                <SocialButton
                  selected={selectedGenders.has("not-specified")}
                  onSelect={(selected) => {
                    const newSet = new Set(selectedGenders);
                    if (selected) {
                      newSet.add("not-specified");
                    } else {
                      newSet.delete("not-specified");
                    }
                    setSelectedGenders(newSet);
                  }}
                >
                  ไม่ระบุตัวตน
                </SocialButton>


              </div>
            </div>

            {/* OTPInput */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">OTPInput</h3>
              <div className="flex flex-col gap-4">
                <OTPInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  onComplete={(value: string) => console.log("OTP Complete:", value)}
                />

              </div>
            </div>

            {/* ResourceBar */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">ResourceBar</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <ResourceBar number={5} variant="heart" />
                <ResourceBar number={200} variant="score" />
                <ResourceBar number={30} variant="fire" />
              </div>
            </div>

          </section>
        </Container>


        {/* Cards & Display Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Cards & Display Components</h2>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form className="flex flex-col items-start py-[32px] px-[24px] gap-[14px] w-[387px] bg-[#EAF9FF] rounded-[12px] border-2 border-white shadow-lg">
                  <h4 className="text-xl font-bold text-[#242E39]">เข้าสู่ระบบ</h4>
                  <p className="text-gray-600">ทดสอบฟอร์ม</p>
                  <Input placeholder="Email" />
                  <PasswordField placeholder="Password" />
                  <PrimaryButton className="mt-2">Login</PrimaryButton>
                </form>
                <form className="flex flex-col items-start py-[32px] px-[24px] gap-[14px] w-[387px] bg-[#EAF9FF] rounded-[12px] border-2 border-white shadow-lg">
                  <h4 className="text-xl font-bold text-[#242E39]">อัปเดตโปรไฟล์</h4>
                  <p className="text-gray-600">กรอกข้อมูลให้ครบถ้วน</p>
                  <InputField label="Display name" placeholder="Nong Brite" />
                  <InputField label="Email" placeholder="hello@example.com" />
                </form>
              </div>
            </div>

            {/* StatCard */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">StatCard</h3>
              <div className="flex flex-col gap-4 max-w-2xl">
                <StatCard
                  type="streak"
                  title="x2 Point Streak"
                  description="Receive double streak rewards every day"
                />
                <StatCard
                  type="exp"
                  title="x2 Exp"
                  description="Double EXP when completing the exercise"
                />
                <StatCard
                  type="points"
                  title="คะแนนทั้งหมด: 5,672"
                  description="จำนวนคะแนนที่สะสมได้"
                />
                <StatCard
                  type="rank"
                  title="ผู้เริ่มต้นที่ดี"
                  description="แรงค์ของคุณในระบบ"
                />
                <StatCard
                  icon={<FaHeart className="w-7 h-7 text-[#FF4D4D]" />}
                  title="Premium Member"
                  description="Unlock all premium features"
                  iconBgColor="bg-[#E8F4FF]"
                />
              </div>
            </div>
          </section>
        </Container>


        {/* Color Palette */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Color Palette</h2>

            {/* Color Swatches */}
            <div className="flex flex-col gap-6">
              {/* Row 1 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#9956DE" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Amethyst</p>
                    <p className="text-xs text-gray-500">#9956DE</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#7274ED" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Slate Blue</p>
                    <p className="text-xs text-gray-500">#7274ED</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#1FA7E1" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Summer Sky</p>
                    <p className="text-xs text-gray-500">#1FA7E1</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#6ED1CF" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Downy</p>
                    <p className="text-xs text-gray-500">#6ED1CF</p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#75D06A" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Pastel Green</p>
                    <p className="text-xs text-gray-500">#75D06A</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#FFB356" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Texas Rose</p>
                    <p className="text-xs text-gray-500">#FFB356</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#FF8B8B" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Mona Lisa</p>
                    <p className="text-xs text-gray-500">#FF8B8B</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: "#FB96BB" }}></div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">Illusion</p>
                    <p className="text-xs text-gray-500">#FB96BB</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* Utility Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Utility Components</h2>

            {/* Image */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Image</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Image src="/images/P_Bit/bit-01.svg" alt="P'Bit" width={80} height={80} />
                <Image src="/images/Nong_brite/nong-brite-02.svg" alt="Nong Brite" width={80} height={80} />
              </div>
            </div>

            {/* Container */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Container</h3>
              <div className="flex flex-col gap-4">
                <Container className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container</h4>
                  <p className="text-gray-600">Container with card style</p>
                </Container>
                <Container className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container</h4>
                  <p className="text-gray-600">Container with card style</p>
                </Container>
                <Container as="div" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as div</h4>
                  <p className="text-gray-600">Container rendered as div element</p>
                </Container>
                <Container as="aside" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as aside</h4>
                  <p className="text-gray-600">Container rendered as aside element</p>
                </Container>
              </div>
            </div>

          </section>
        </Container>

        {/* Animated & Indicators */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Animated & Indicators</h2>

            {/* AnimatedList */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">AnimatedList</h3>
              <AnimatedList
                items={animatedItems}
                renderItem={({ item }) => (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {item}
                  </div>
                )}
              />
            </div>

            {/* DifficultyIndicator */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">DifficultyIndicator</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <DifficultyIndicator level={1} />
                <DifficultyIndicator level={2} />
                <DifficultyIndicator level={3} />
              </div>
            </div>

            {/* Counter & CountUp */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Counter & CountUp</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  <Counter value={counterValue} />
                  <PrimaryButton size="sm" onClick={() => setCounterValue((v) => v + 1)}>
                    +1
                  </PrimaryButton>
                  <PrimaryButton size="sm" variant="illusion" onClick={() => setCounterValue((v) => Math.max(0, v - 1))}>
                    -1
                  </PrimaryButton>
                </div>
                <CountUp from={0} to={1234} duration={1.5} className="text-2xl font-bold text-[#242E39]" />
              </div>
            </div>


          </section>
        </Container>

        {/* Loading Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Loading Components</h2>

            {/* LoadingSpinner Examples */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">LoadingSpinner - Sizes</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="sm" className="border-[#1cb0f6] border-t-transparent" />
                  <span className="text-sm text-gray-600">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="md" className="border-[#1cb0f6] border-t-transparent" />
                  <span className="text-sm text-gray-600">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="lg" className="border-[#1cb0f6] border-t-transparent" />
                  <span className="text-sm text-gray-600">Large</span>
                </div>
              </div>
            </div>

            {/* Button with Loading */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Button with Loading State</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <PrimaryButton
                  onClick={() => simulateLoading(setIsLoggingIn, 2000)}
                  disabled={isLoggingIn}
                  className="flex items-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                      <span>กำลังโหลด...</span>
                    </>
                  ) : (
                    <span>เข้าสู่ระบบ</span>
                  )}
                </PrimaryButton>

                <PrimaryButton
                  variant="summer-sky"
                  onClick={() => simulateLoading(setIsStarting, 2000)}
                  disabled={isStarting}
                  className="flex items-center gap-2"
                >
                  {isStarting ? (
                    <>
                      <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                      <span>กำลังโหลด...</span>
                    </>
                  ) : (
                    <span>เริ่มเรียนรู้</span>
                  )}
                </PrimaryButton>
              </div>
            </div>

            {/* LoadingOverlay Example */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">LoadingOverlay</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <PrimaryButton
                  variant="illusion"
                  onClick={() => simulateLoading(setShowOverlay, 3000)}
                  disabled={showOverlay}
                >
                  {showOverlay ? "กำลังโหลด..." : "แสดง Loading Overlay"}
                </PrimaryButton>
              </div>
            </div>
          </section>
        </Container>

        {/* OuterContainer */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">OuterContainer</h2>

            <div className="flex flex-col gap-4">
              <OuterContainer
                widthClassName="max-w-[720px]"
                heightClassName="min-h-[260px]"
                headerText="Demo Card"
                headerColor="summer-sky"

              >
                <div className="p-4">
                  <p className="text-gray-700"></p>
                </div>
              </OuterContainer>
            </div>
          </section>
        </Container>

        {/* TiltButton */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">TiltButton</h2>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Dark Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <TiltButton
                  variant="dark"
                  width={84}
                  height={90}
                  elevation={12}
                  pressInset={12}
                  tilt={1.33}
                  radius={18}
                  motion={94}
                  surfaceColor="#181818"
                  sideColor="#494949"
                  textColor="#e5e7eb"
                  borderColor="#5e5e5e"
                  borderWidth={4}
                  glareColor="#ffffff"
                  glareOpacity={0.2}
                  glareWidth={70}
                >
                  1
                </TiltButton>
              </div>
            </div>

            {/* Game Color Variants */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Game Buttons</h3>
              <div className="flex flex-wrap gap-6 items-end pt-16">
                {/* Illusion #FB96BB */}
                <div className="relative" onClick={() => setActiveGameButton(activeGameButton === 1 ? null : 1)}>
                  {activeGameButton === 1 && (
                    <GameTooltip label="Level 1" sublabel="กดเพื่อเริ่มเกม" onStart={() => router.push("/games/path-navigation/1")} onClose={() => setActiveGameButton(null)} />
                  )}
                  <TiltButton
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#FB96BB" sideColor="#c97896" textColor="#ffffff"
                    borderColor="#e888ab" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    1
                  </TiltButton>
                </div>

                {/* Texas Rose #FFB356 */}
                <div className="relative" onClick={() => setActiveGameButton(activeGameButton === 2 ? null : 2)}>
                  {activeGameButton === 2 && (
                    <GameTooltip label="Level 2" sublabel="กดเพื่อเริ่มเกม" onStart={() => router.push("/games/path-navigation/2")} onClose={() => setActiveGameButton(null)} />
                  )}
                  <TiltButton
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#FFB356" sideColor="#d18f3f" textColor="#ffffff"
                    borderColor="#e8a449" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    2
                  </TiltButton>
                </div>

                {/* Amethyst #9956DE */}
                <div className="relative" onClick={() => setActiveGameButton(activeGameButton === 3 ? null : 3)}>
                  {activeGameButton === 3 && (
                    <GameTooltip label="Level 3" sublabel="กดเพื่อเริ่มเกม" onStart={() => router.push("/games/path-navigation/3")} onClose={() => setActiveGameButton(null)} />
                  )}
                  <TiltButton
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#9956DE" sideColor="#7a45b2" textColor="#ffffff"
                    borderColor="#8a4dc9" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    3
                  </TiltButton>
                </div>

                {/* Downy #6ED1CF — Disabled */}
                <div className="relative">
                  <TiltButton
                    disabled={true}
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#6ED1CF" sideColor="#54a8a6" textColor="#ffffff"
                    borderColor="#60c1bf" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    <FaLock className="w-5 h-5 text-white/80" />
                  </TiltButton>
                </div>

                {/* Mona Lisa #FF8B8B — Disabled */}
                <div className="relative">
                  <TiltButton
                    disabled={true}
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#FF8B8B" sideColor="#d17070" textColor="#ffffff"
                    borderColor="#e77d7d" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    <FaLock className="w-5 h-5 text-white/80" />
                  </TiltButton>
                </div>

                {/* Pastel Green #75D06A — Disabled */}
                <div className="relative">
                  <TiltButton
                    disabled={true}
                    width={84} height={90} elevation={12} pressInset={12}
                    tilt={1.33} radius={18} motion={94}
                    surfaceColor="#75D06A" sideColor="#5ea856" textColor="#ffffff"
                    borderColor="#68c261" borderWidth={4}
                    glareColor="#ffffff" glareOpacity={0.2} glareWidth={70}
                  >
                    <FaLock className="w-5 h-5 text-white/80" />
                  </TiltButton>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* Shadcn UI Components */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Shadcn UI Components</h2>

            {/* Shadcn Button */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Button (shadcn)</h3>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3 items-center">
                  <UiButton>Default</UiButton>
                  <UiButton variant="destructive">Destructive</UiButton>
                  <UiButton variant="outline">Outline</UiButton>
                  <UiButton variant="secondary">Secondary</UiButton>
                  <UiButton variant="ghost">Ghost</UiButton>
                  <UiButton variant="link">Link</UiButton>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <UiButton size="sm">Small</UiButton>
                  <UiButton size="default">Default</UiButton>
                  <UiButton size="lg">Large</UiButton>
                  <UiButton size="icon" aria-label="Icon button">
                    <FaCheck className="w-4 h-4" />
                  </UiButton>
                </div>
              </div>
            </div>

            {/* Shadcn Input */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Input (shadcn)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UiInput placeholder="Text input" />
                <UiInput type="email" placeholder="Email input" />
                <UiInput type="password" placeholder="Password input" />
                <UiInput type="number" placeholder="Number input" />
                <UiInput disabled placeholder="Disabled input" />
              </div>
            </div>

            {/* Shadcn Tooltip */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Tooltip (shadcn)</h3>
              <UiTooltipProvider>
                <div className="flex flex-wrap gap-4">
                  <UiTooltip>
                    <UiTooltipTrigger asChild>
                      <UiButton>Top</UiButton>
                    </UiTooltipTrigger>
                    <UiTooltipContent side="top">Tooltip on top</UiTooltipContent>
                  </UiTooltip>
                  <UiTooltip>
                    <UiTooltipTrigger asChild>
                      <UiButton>Right</UiButton>
                    </UiTooltipTrigger>
                    <UiTooltipContent side="right">Tooltip on right</UiTooltipContent>
                  </UiTooltip>
                  <UiTooltip>
                    <UiTooltipTrigger asChild>
                      <UiButton>Bottom</UiButton>
                    </UiTooltipTrigger>
                    <UiTooltipContent side="bottom">Tooltip on bottom</UiTooltipContent>
                  </UiTooltip>
                  <UiTooltip>
                    <UiTooltipTrigger asChild>
                      <UiButton>Left</UiButton>
                    </UiTooltipTrigger>
                    <UiTooltipContent side="left">Tooltip on left</UiTooltipContent>
                  </UiTooltip>
                </div>
              </UiTooltipProvider>
            </div>

            {/* Shadcn Separator */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Separator (shadcn)</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Horizontal</p>
                  <UiSeparator />
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">Vertical</p>
                  <div className="h-8 flex items-center gap-4">
                    <span className="text-sm text-gray-700">Item A</span>
                    <UiSeparator orientation="vertical" />
                    <span className="text-sm text-gray-700">Item B</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadcn Skeleton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Skeleton (shadcn)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Text skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                {/* Avatar skeleton */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                {/* Card skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            </div>

            {/* Shadcn Sheet */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Sheet (shadcn)</h3>
              <div className="flex flex-wrap gap-4">
                {/* Right sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <UiButton variant="outline">Open Right Sheet</UiButton>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Right Sheet</SheetTitle>
                      <SheetDescription>
                        แผงแสดงผลเลื่อนจากด้านขวา เหมาะสำหรับเมนูหรือรายละเอียดเพิ่มเติม
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                      <p>คุณสามารถใช้ ฝSheet สำหรับ:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>เมนูในมือถือ</li>
                        <li>แบบฟอร์มแก้ไขข้อมูล</li>
                        <li>รายละเอียดเพิ่มเติมของรายการ</li>
                      </ul>
                    </div>
                    <SheetFooter className="mt-6">
                      <UiButton>ยืนยัน</UiButton>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                {/* Left sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <UiButton variant="outline">Open Left Sheet</UiButton>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Left Sheet</SheetTitle>
                      <SheetDescription>
                        ใช้แทน sidebar ชั่วคราวหรือ navigation panel
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                {/* Top sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <UiButton variant="outline">Open Top Sheet</UiButton>
                  </SheetTrigger>
                  <SheetContent side="top" className="max-h-[50vh]">
                    <SheetHeader>
                      <SheetTitle>Top Sheet</SheetTitle>
                      <SheetDescription>
                        เลื่อนจากด้านบน เหมาะกับ notification bar หรือ filter bar
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                {/* Bottom sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <UiButton variant="outline">Open Bottom Sheet</UiButton>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="max-h-[60vh]">
                    <SheetHeader>
                      <SheetTitle>Bottom Sheet</SheetTitle>
                      <SheetDescription>
                        ลักษณะเหมือน mobile bottom sheet เหมาะสำหรับ action ต่างๆ
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </section>
        </Container>

        {/* Sidebar (shadcn UI) */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Sidebar (shadcn UI)</h2>
            <p className="text-gray-600">
              Sidebar ถูกใช้แล้วใน layout ของแอปนี้ (ดู <code className="px-2 py-1 bg-gray-100 rounded text-sm">components/layout/Sidebar.tsx</code>)
            </p>

            <div className="flex flex-col gap-6">
              {/* Example structure */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-700">โครงสร้างพื้นฐาน</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-4">
                    Sidebar ประกอบด้วยส่วนหลัก:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarProvider</code> - Context provider สำหรับจัดการ state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">Sidebar</code> - คอมโพเนนต์หลัก</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarHeader</code> - ส่วนหัวของ sidebar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarContent</code> - เนื้อหาหลัก (เมนู)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarFooter</code> - ส่วนท้ายของ sidebar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarMenu</code> - รายการเมนู</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarMenuItem</code> - รายการเมนูแต่ละตัว</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1cb0f6]">•</span>
                      <span><code className="bg-white px-1.5 py-0.5 rounded">SidebarMenuButton</code> - ปุ่มเมนู (รองรับ active state)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual demo */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-700">ตัวอย่างโครงสร้าง Sidebar</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Mock Sidebar Header */}
                    <div className="bg-gradient-to-r from-[#1cb0f6] to-[#17a3e3] p-4 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold">Sidebar Demo</div>
                          <div className="text-xs opacity-80">shadcn/ui</div>
                        </div>
                      </div>
                    </div>

                    {/* Mock Sidebar Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className="h-4 w-32 flex-1" />
                      </div>
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className="h-4 w-28 flex-1" />
                      </div>
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className="h-4 w-36 flex-1" />
                      </div>
                      <UiSeparator className="my-2" />
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className="h-4 w-24 flex-1" />
                      </div>
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <Skeleton className="size-4 rounded-md" />
                        <Skeleton className="h-4 w-40 flex-1" />
                      </div>
                    </div>

                    {/* Mock Sidebar Footer */}
                    <div className="border-t p-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-2 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SidebarTrigger demo */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-700">SidebarTrigger</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <UiButton variant="ghost" size="icon" className="h-7 w-7">
                    <PanelLeft className="w-4 h-4" />
                  </UiButton>
                  <p className="text-sm text-gray-600">
                    ปุ่มสำหรับเปิด/ปิด sidebar (ดูตัวอย่างจริงที่ sidebar ด้านซ้ายของแอป)
                  </p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-gray-700">
                  <strong>หมายเหตุ:</strong> SidebarTrigger ต้องใช้ภายใน SidebarProvider เท่านั้น ตัวอย่างข้างบนเป็นแค่ mock UI
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-700">ฟีเจอร์</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 Responsive</h4>
                    <p className="text-sm text-gray-600">
                      ปรับตัวอัตโนมัติระหว่าง desktop และ mobile
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">⌨️ Keyboard Shortcut</h4>
                    <p className="text-sm text-gray-600">
                      กด <kbd className="px-2 py-1 bg-white rounded border shadow-sm">Ctrl/Cmd + B</kbd> เพื่อเปิด/ปิด
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔄 Collapsible</h4>
                    <p className="text-sm text-gray-600">
                      รองรับการยุบ/ขยาย sidebar ได้ 3 แบบ: offcanvas, icon, none
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">💾 State Persistence</h4>
                    <p className="text-sm text-gray-600">
                      จดจำสถานะ open/closed ด้วย Cookie
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage note */}
              <div className="bg-blue-50 border-l-4 border-[#1cb0f6] p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>หมายเหตุ:</strong> Sidebar ในโปรเจกต์นี้ถูกใช้งานแล้วที่ <code className="px-2 py-1 bg-white rounded">app/layout.tsx</code>
                  ผ่าน <code className="px-2 py-1 bg-white rounded">SidebarProvider</code> และ implementation จริงอยู่ที่ <code className="px-2 py-1 bg-white rounded">components/layout/Sidebar.tsx</code>
                </p>
              </div>
            </div>
          </section>
        </Container>

        {/* KawaiiProgressBar */}
        <Container className="p-6">
          <section className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#242E39] mb-2">Kawaii Progress Bar</h2>
              <p className="text-gray-600">Progress bar สไตล์ kawaii พร้อมอนิเมชั่นและสีสันที่น่ารัก สำหรับแสดงความคืบหน้าจากข้อมูล API</p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Progress bars with different colors */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🎨 ตัวอย่างสีต่างๆ</h3>
                <p className="text-sm text-gray-600 mb-4">แสดงความคืบหน้าด้วยสีที่แตกต่างกัน (จำลองข้อมูลจาก API)</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Path 1: 15/27 ดาว</p>
                    <KawaiiProgressBar
                      value={20}
                      max={27}
                      color="#9956DE"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Path 2: 8/27 ดาว</p>
                    <KawaiiProgressBar
                      value={8}
                      max={27}
                      color="#1cb0f6"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Path 3: 22/27 ดาว</p>
                    <KawaiiProgressBar
                      value={22}
                      max={27}
                      color="#6cc484"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Different progress values */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#1cb0f6] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 ตัวอย่างความคืบหน้าต่างๆ</h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">เริ่มต้น: 3/27 ดาว</p>
                    <KawaiiProgressBar
                      value={3}
                      max={27}
                      color="#fe8ce4"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">กำลังทำ: 12/27 ดาว</p>
                    <KawaiiProgressBar
                      value={12}
                      max={27}
                      color="#FFB356"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">เกือบเสร็จ: 24/27 ดาว</p>
                    <KawaiiProgressBar
                      value={24}
                      max={27}
                      color="#75D06A"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">✨ Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🎨 Customizable Colors</h4>
                    <p className="text-sm text-gray-600">
                      ปรับสีได้ตามต้องการด้วย CSS Variables
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">👀 Kawaii Design</h4>
                    <p className="text-sm text-gray-600">
                      มีหน้าตาน่ารักพร้อมดวงตาและรอยยิ้ม
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">📊 Read-only</h4>
                    <p className="text-sm text-gray-600">
                      แสดงความคืบหน้าจากข้อมูล API แบบ read-only
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">♿ Accessible</h4>
                    <p className="text-sm text-gray-600">
                      รองรับการใช้งานด้วย screen reader
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Example */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 วิธีใช้งาน</h3>
                <div className="bg-white p-4 rounded-lg font-mono text-xs">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`import { KawaiiProgressBar } from "@/components/common/KawaiiProgressBar";

// ตัวอย่างข้อมูลจาก API
const apiData = {
  currentStars: 15,
  totalStars: 27
};

<KawaiiProgressBar
  value={apiData.currentStars}
  max={apiData.totalStars}
  color="#1cb0f6"
  className="w-full"
/>

// หรือกำหนดค่าตรงๆ
<KawaiiProgressBar
  value={15}
  max={27}
  color="#9956DE"
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* ===== StarRating Section ===== */}
        <Container variant="default">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">SarRating</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 0 ดาว */}
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-500">0 ดาว</p>
                <StarRating stars={3} />
              </div>


            </div>


          </section>
        </Container>

      </div>

      {/* LoadingOverlay */}
      <LoadingOverlay isLoading={showOverlay} message="กำลังโหลดข้อมูล..." />
    </div>
  );
}
