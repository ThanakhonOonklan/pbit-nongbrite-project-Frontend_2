"use client";

import { useState } from "react";
import {
  Input,
  InputField,
  PasswordField,
  Divider,
  Stepper,
  FormCard,
  SocialButton,
  PrimaryButton,
  GameButton,
  Container,
  OTPInput,
} from "@/components/common";
import { getLabelClassName } from "@/lib/label";
import { StatCard } from "@/components/profile";
import { Lock, Check, Heart, Lightning, Flame } from "phosphor-react";

export default function TestComponentsPage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "not-specified" | null>(null);
  const [otpValue, setOtpValue] = useState<string[]>([]);

  const steps = [
    { label: "สร้างบัญชี", status: "completed" as const },
    { label: "กรอกข้อมูล", status: "active" as const },
    { label: "เสร็จสิ้น", status: "default" as const },
  ];

  return (
    <div className="min-h-screen bg-[#E5F2FA] p-8">
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
                <PrimaryButton>Button </PrimaryButton>
                <PrimaryButton variant="outline">Button Outline</PrimaryButton>
                <PrimaryButton variant="yellow">Button Yellow</PrimaryButton>
                <PrimaryButton variant="red-outline">Button Red Outline</PrimaryButton>
                <PrimaryButton size="full">Full Width</PrimaryButton>
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
                <Input type="email" placeholder="Email input" />
                <Input type="number" placeholder="Number input" />
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
                <InputField
                  label="Display Name"
                  placeholder="Enter display name"
                />
                <InputField
                  label="Age"
                  placeholder="Enter age"
                  type="number"
                  error="กรุณากรอกอายุ"
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
                <PasswordField
                  label="Confirm Password"
                  placeholder="Confirm password"
                  error="รหัสผ่านไม่ตรงกัน"
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
                <Divider text="หรือ" />
                <Divider text="หรือดำเนินการต่อด้วย" />
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

            {/* FormCard */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">FormCard</h3>
              <div className="flex flex-col gap-4">
                <FormCard className="w-[387px]">
                  <InputField label="Email" placeholder="email@example.com" />
                  <PrimaryButton>Submit</PrimaryButton>
                </FormCard>
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
                <SocialButton>Default</SocialButton>
                <SocialButton selected>Selected</SocialButton>
                <SocialButton
                  selected={selectedGender === "male"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "male" : null);
                  }}
                >
                  เพศชาย
                </SocialButton>
                <SocialButton
                  variant="female"
                  selected={selectedGender === "female"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "female" : null);
                  }}
                >
                  เพศหญิง
                </SocialButton>
                <SocialButton
                  variant="not-specified"
                  selected={selectedGender === "not-specified"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "not-specified" : null);
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
                <OTPInput
                  length={6}
                  value={[]}
                  onChange={() => {}}
                  hasError
                />
              </div>
            </div>

          </section>
        </Container>

        {/* Custom Buttons */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Custom Buttons</h2>
            
            {/* PrimaryButton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">PrimaryButton</h3>
              <div className="flex flex-wrap gap-6 items-center justify-center bg-gray-50 p-8 rounded-xl">
                <PrimaryButton size="lg">Start</PrimaryButton>
                <PrimaryButton size="default">เริ่มกันเลย</PrimaryButton>
                <PrimaryButton size="sm">เริ่ม</PrimaryButton>
              </div>
              
              <div className="flex flex-wrap gap-6 items-center justify-center bg-gray-100 p-8 rounded-xl">
                <PrimaryButton variant="outline" size="lg">Outline</PrimaryButton>
                <PrimaryButton size="full">Full Width Button</PrimaryButton>
                <PrimaryButton variant="yellow" size="default">Yellow Variant</PrimaryButton>
                <PrimaryButton variant="red-outline" size="default">Red Outline</PrimaryButton>
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
                  icon={<Heart className="w-7 h-7 text-[#FF4D4D]" weight="fill" />} 
                  title="Premium Member" 
                  description="Unlock all premium features" 
                  iconBgColor="bg-[#E8F4FF]"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Form Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Form Containers</h2>
            
            {/* FormCard */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">FormCard</h3>
              <div className="flex flex-wrap gap-6 items-start">
                <FormCard className="w-[376px] h-auto">
                  <div className="w-full">
                    <h3 className="text-[20px] font-bold text-[#3C3C3C] mb-4">ตัวอย่างฟอร์ม</h3>
                  </div>
                  <InputField
                    label="ชื่อผู้ใช้"
                    placeholder="กรอกชื่อผู้ใช้"
                  />
                  <InputField
                    label="อีเมล"
                    placeholder="example@email.com"
                    type="email"
                  />
                  <PrimaryButton size="full">
                    ส่งข้อมูล
                  </PrimaryButton>
                </FormCard>

                <FormCard className="w-[376px] h-auto py-[20px] px-[24px]">
                  <div className="w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 text-[#FF4D4D]" weight="fill" />
                      <span className="text-[20px] font-bold text-[#FF4D4D]">5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightning className="w-6 h-6 text-[#FFD300]" weight="fill" />
                      <span className="text-[20px] font-bold text-[#FFD300]">100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-6 h-6 text-[#FF7A00]" weight="fill" />
                      <span className="text-[20px] font-bold text-[#FF7A00]">7</span>
                    </div>
                  </div>
                </FormCard>
              </div>
            </div>
          </section>
        </Container>

        {/* GameButton */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">GameButton</h2>
            <div className="flex flex-col gap-6">
              {/* Blue variant */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#1CB0F6]">สีฟ้า (Game 1: Path Navigation)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      variant="blue"
                      size="default" 
                      icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                    />
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      variant="blue-locked"
                      size="default" 
                      icon={<Lock className="w-7 h-7 text-white" />}
                    />
                    <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4 (Locked)</span>
                  </div>
                </div>
              </div>

              {/* Green variant */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#19C371]">สีเขียว (Game 2: Asking Question)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <GameButton 
                      variant="green"
                      size="default" 
                      icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                    />
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <GameButton 
                      variant="green-locked"
                      size="default" 
                      icon={<Lock className="w-7 h-7 text-white" />}
                    />
                    <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5 (Locked)</span>
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
              
      </div>
    </div>
  );
}
