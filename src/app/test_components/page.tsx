"use client";

import { useState } from "react";
import {
  Input,
  InputField,
  PasswordField,
  Divider,
  SocialButton,
  PrimaryButton,
  GameButton,
  Container,
  FormCard,
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
} from "@/components/common";
import { getLabelClassName } from "@/lib/label";
import { StatCard } from "@/components/profile";
import { FaCheck, FaHeart } from "react-icons/fa";

export default function TestComponentsPage() {
  const [selectedGenders, setSelectedGenders] = useState<Set<"male" | "female" | "not-specified">>(new Set());
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const [counterValue, setCounterValue] = useState(5);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
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
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Cards & Display Components</h2>
            
            {/* FormCard */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">FormCard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormCard
                >
                  <h4 className="text-xl font-bold text-[#242E39]">เข้าสู่ระบบ</h4>
                  <p className="text-gray-600">ทดสอบฟอร์มการ์ด</p>
                  <Input placeholder="Email" />
                  <PasswordField placeholder="Password" />
                  <PrimaryButton className="mt-2">Login</PrimaryButton>
                </FormCard>
                <FormCard
                >
                  <h4 className="text-xl font-bold text-[#242E39]">อัปเดตโปรไฟล์</h4>
                  <p className="text-gray-600">กรอกข้อมูลให้ครบถ้วน</p>
                  <InputField label="Display name" placeholder="Nong Brite" />
                  <InputField label="Email" placeholder="hello@example.com" />
                </FormCard>
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

        {/* GameButton */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">GameButton</h2>
            <div className="flex flex-col gap-6">
              {/* Color Palette Variants */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-700">Color Palette Variants</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  {gamePalettes.map((palette) => (
                    <div key={palette.name} className="flex flex-col items-center gap-2">
                      <GameButton
                        mainColor={palette.main}
                        darkColor={palette.dark}
                        borderColor={palette.border}
                      >
                        <FaCheck className="w-8 h-8 text-white" />
                      </GameButton>
                      <span className="text-sm text-gray-700">{palette.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sky Blue variant */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#1CB0F6]">สีฟ้า (Game 1: Path Navigation)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      mainColor="#61B6F6"
                      darkColor="#4a90c7"
                      borderColor="#56a5e0"
                    >
                      <FaCheck className="w-8 h-8 text-white" />
                    </GameButton>
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1</span>
                  </div>
                </div>
              </div>

              {/* Pastel Green variant */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#75D06A]">สีเขียว (Game 2: Asking Question)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      mainColor="#75D06A"
                      darkColor="#5ea856"
                      borderColor="#68c261"
                    >
                      <FaCheck className="w-8 h-8 text-white" />
                    </GameButton>
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1</span>
                  </div>
                </div>
              </div>

              {/* Default variant (Beige) */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-[#8B7355]">สีเบจ (Default)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      mainColor="#D9C2A3"
                      darkColor="#b39b7d"
                      borderColor="#c7ad90"
                      className="w-[64px] h-[64px]"
                    >
                      <span className="text-[16px] font-bold text-[#8B7355]">S</span>
                    </GameButton>
                    <span className="text-[14px]">Small</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      mainColor="#D9C2A3"
                      darkColor="#b39b7d"
                      borderColor="#c7ad90"
                    >
                      <span className="text-[20px] font-bold text-[#8B7355]">M</span>
                    </GameButton>
                    <span className="text-[16px]">Default</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      mainColor="#D9C2A3"
                      darkColor="#b39b7d"
                      borderColor="#c7ad90"
                      className="w-[96px] h-[96px]"
                    >
                      <span className="text-[24px] font-bold text-[#8B7355]">L</span>
                    </GameButton>
                    <span className="text-[18px]">Large</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* Color Palette */}
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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
                <Container variant="default" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container Default (Gradient)</h4>
                  <p className="text-gray-600">Container with default gradient background</p>
                </Container>
                <Container variant="white" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container White</h4>
                  <p className="text-gray-600">Container with white background</p>
                </Container>
                <Container variant="white" as="div" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as div</h4>
                  <p className="text-gray-600">Container rendered as div element</p>
                </Container>
                <Container variant="white" as="aside" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as aside</h4>
                  <p className="text-gray-600">Container rendered as aside element</p>
                </Container>
              </div>
            </div>

          </section>
        </Container>

        {/* Animated & Indicators */}
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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
        <Container variant="white" className="p-6">
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



       
       
              
      </div>
      
      {/* LoadingOverlay */}
      <LoadingOverlay isLoading={showOverlay} message="กำลังโหลดข้อมูล..." />
    </div>
  );
}
