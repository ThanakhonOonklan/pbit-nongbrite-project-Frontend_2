"use client";

import { useState } from "react";
import {
  Input,
  InputField,
  PasswordField,
  Divider,
  Stepper,
  SocialButton,
  PrimaryButton,
  GameButton,
  GameButton_2,
  Container,
  OTPInput,
  ScrollStackItem,
  ResourceBar,
  ScrollStack,
} from "@/components/common";
import { getLabelClassName } from "@/lib/label";
import { StatCard } from "@/components/profile";
import { FaCheck, FaHeart } from "react-icons/fa";

export default function TestComponentsPage() {
  const [selectedGenders, setSelectedGenders] = useState<Set<"male" | "female" | "not-specified">>(new Set());
  const [otpValue, setOtpValue] = useState<string[]>([]);

  const steps = [
    { label: "สร้างบัญชี", status: "completed" as const },
    { label: "กรอกข้อมูล", status: "active" as const },
    { label: "เสร็จสิ้น", status: "default" as const },
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

            {/* Stepper */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Stepper</h3>
              <div className="flex flex-col gap-4">
                <Stepper steps={steps} />
                <Stepper
                  steps={[
                    { label: "Step 1", status: "completed" },
                    { label: "Step 2", status: "completed" },
                    { label: "Step 3", status: "active" },
                  ]}
                />
              </div>
            </div>

          </section>
        </Container>

        {/* Interactive Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Interactive Components</h2>
            
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
                  <GameButton variant="amethyst" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="slate-blue" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="summer-sky" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="downy" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="pastel-green" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="texas-rose" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="mona-lisa" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="illusion" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                  <GameButton variant="sky-blue" size="default" icon={<FaCheck className="w-8 h-8 text-white" />} />
                </div>
              </div>

              {/* Sky Blue variant */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#1CB0F6]">สีฟ้า (Game 1: Path Navigation)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      variant="sky-blue"
                      size="default" 
                      icon={<FaCheck className="w-8 h-8 text-white" />}
                    />
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
                      variant="pastel-green"
                      size="default" 
                      icon={<FaCheck className="w-8 h-8 text-white" />}
                    />
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
                      size="sm" 
                      icon={<span className="text-[16px] font-bold text-[#8B7355]">S</span>}
                    />
                    <span className="text-[14px]">Small</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      size="default" 
                      icon={<span className="text-[20px] font-bold text-[#8B7355]">M</span>}
                    />
                    <span className="text-[16px]">Default</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      size="lg" 
                      icon={<span className="text-[24px] font-bold text-[#8B7355]">L</span>}
                    />
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

        {/* Container Component */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Container</h2>
            <p className="text-gray-600">Container component with ScrollStack support - can use ScrollStack props for animated scrolling</p>
            
            {/* Normal Container Usage */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Normal Container</h3>
              <Container variant="white" className="p-6">
                <p className="text-gray-600">This is a normal Container without ScrollStack props.</p>
              </Container>
            </div>

            {/* Container with ScrollStack */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Container with ScrollStack</h3>
              <div className="w-full h-[800px] border border-gray-200 rounded-lg overflow-hidden">
                <Container 
                  variant="white"
                  className="h-full"
                  itemDistance={800}
                  itemStackDistance={3}
                  stackPosition="20%"
                  baseScale={1}
                  rotationAmount={0}
                  blurAmount={0}
                >
                  <ScrollStackItem>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold text-[#242E39]">Card 1</h3>
                      <p className="text-gray-600">
                        This is the first card using Container with ScrollStack props. Scroll down to see the stacking animation effect.
                      </p>
                    </div>
                  </ScrollStackItem>
                  
                  <ScrollStackItem>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold text-[#242E39]">Card 2</h3>
                      <p className="text-gray-600">
                        The second card will stack on top of the first one as you scroll. Notice the smooth scaling and positioning.
                      </p>
                    </div>
                  </ScrollStackItem>
                  
                  <ScrollStackItem>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold text-[#242E39]">Card 3</h3>
                      <p className="text-gray-600">
                        Each card scales down and stacks beautifully. The animation is powered by Lenis smooth scrolling.
                      </p>
                    </div>
                  </ScrollStackItem>
                  
                  <ScrollStackItem>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold text-[#242E39]">Card 4</h3>
                      <p className="text-gray-600">
                        Continue scrolling to see more cards stack on top of each other with smooth transitions.
                      </p>
                    </div>
                  </ScrollStackItem>
                  
                  <ScrollStackItem>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl font-bold text-[#242E39]">Card 5</h3>
                      <p className="text-gray-600">
                        This is the last card in the demo. Container now supports ScrollStack functionality!
                      </p>
                    </div>
                  </ScrollStackItem>
                </Container>
              </div>
            </div>
          </section>
        </Container>

        {/* ScrollStack with OuterContainer */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">ScrollStack with OuterContainer</h2>
            <p className="text-gray-600">
              ScrollStack component with OuterContainer items - scroll to see OuterContainer items stack and animate smoothly
            </p>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">OuterContainer Scroll Stack</h3>
              <div className="w-full h-[800px] border border-gray-200 rounded-lg overflow-hidden">
                <ScrollStack
                  className="w-full h-full"
                  itemDistance={800}
                  itemStackDistance={0}
                  stackPosition="20%"
                  baseScale={1}
                  useWindowScroll={false}
                >
                  <ScrollStackItem useOuterContainer={true} outerContainerProps={{
                    widthClassName: "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                    heightClassName: "min-h-[350px]",
                    headerText: "Path Navigation",
                    headerColor: "sky-blue",
                    imageSrc: "/images/P_Bit/bit-01.svg",
                    imageAlt: "P'Bit mascot",
                    imageWidth: 140,
                    imageHeight: 140,
                    imagePosition: "absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    imageRotation: 0,
                    image1Src: "/images/Nong_brite/nong-brite-02.svg",
                    image1Alt: "Nong Brite",
                    image1Width: 60,
                    image1Height: 66,
                    image1Position: "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    image1Rotation: 0,
                  }}>
                    <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <GameButton_2 />
                        </div>
                      ))}
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem useOuterContainer={true} outerContainerProps={{
                    widthClassName: "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                    heightClassName: "min-h-[350px]",
                    headerText: "Path Navigation",
                    headerColor: "sky-blue",
                    imageSrc: "/images/P_Bit/bit-01.svg",
                    imageAlt: "P'Bit mascot",
                    imageWidth: 140,
                    imageHeight: 140,
                    imagePosition: "absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    imageRotation: 0,
                    image1Src: "/images/Nong_brite/nong-brite-02.svg",
                    image1Alt: "Nong Brite",
                    image1Width: 60,
                    image1Height: 66,
                    image1Position: "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    image1Rotation: 0,
                  }}>
                    <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <GameButton_2 />
                        </div>
                      ))}
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem useOuterContainer={true} outerContainerProps={{
                    widthClassName: "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                    heightClassName: "min-h-[350px]",
                    headerText: "Path Navigation",
                    headerColor: "sky-blue",
                    imageSrc: "/images/P_Bit/bit-01.svg",
                    imageAlt: "P'Bit mascot",
                    imageWidth: 140,
                    imageHeight: 140,
                    imagePosition: "absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    imageRotation: 0,
                    image1Src: "/images/Nong_brite/nong-brite-02.svg",
                    image1Alt: "Nong Brite",
                    image1Width: 60,
                    image1Height: 66,
                    image1Position: "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    image1Rotation: 0,
                  }}>
                    <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <GameButton_2 />
                        </div>
                      ))}
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem useOuterContainer={true} outerContainerProps={{
                    widthClassName: "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                    heightClassName: "min-h-[350px]",
                    headerText: "Path Navigation",
                    headerColor: "sky-blue",
                    imageSrc: "/images/P_Bit/bit-01.svg",
                    imageAlt: "P'Bit mascot",
                    imageWidth: 140,
                    imageHeight: 140,
                    imagePosition: "absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    imageRotation: 0,
                    image1Src: "/images/Nong_brite/nong-brite-02.svg",
                    image1Alt: "Nong Brite",
                    image1Width: 60,
                    image1Height: 66,
                    image1Position: "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    image1Rotation: 0,
                  }}>
                    <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <GameButton_2 />
                        </div>
                      ))}
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem useOuterContainer={true} outerContainerProps={{
                    widthClassName: "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]",
                    heightClassName: "min-h-[350px]",
                    headerText: "Path Navigation",
                    headerColor: "sky-blue",
                    imageSrc: "/images/P_Bit/bit-01.svg",
                    imageAlt: "P'Bit mascot",
                    imageWidth: 140,
                    imageHeight: 140,
                    imagePosition: "absolute left-[20px] -top-[-286px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    imageRotation: 0,
                    image1Src: "/images/Nong_brite/nong-brite-02.svg",
                    image1Alt: "Nong Brite",
                    image1Width: 60,
                    image1Height: 66,
                    image1Position: "absolute left-[110px] -top-[-360px] z-20  drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]",
                    image1Rotation: 0,
                  }}>
                    <div className="grid grid-cols-3 gap-6 p-6 w-full h-full items-center justify-center">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <GameButton_2 />
                        </div>
                      ))}
                    </div>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
          </section>
        </Container>
              
      </div>
    </div>
  );
}
