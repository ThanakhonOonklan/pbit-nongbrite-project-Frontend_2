"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Divider } from "@/components/common/Divider";
import { Stepper } from "@/components/common/Stepper";
import { Form } from "@/components/common/Form";
import { SocialButton } from "@/components/common/SocialButton";
import { Image } from "@/components/common/Image";
import { OTPInput } from "@/components/common/OTPInput";
import { GlossyGreenButton } from "@/components/common/GlossyGreenButton";
import { StatCard } from "@/components/profile/StatCard";
import { BorderedForm } from "@/components/common/BorderedForm";
import { RoundButton } from "@/components/common/RoundButton";
import { Lock, Check } from "lucide-react";
import { LeaderboardList } from "@/components/rank";
import { RankUser } from "@/types";

export default function HomePage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "not-specified" | null>(null);
  const [otpValue, setOtpValue] = useState<string[]>([]);

  const mockItems: RankUser[] = [
    { id: "1", rank: 1, name: "Item 1", score: 20000 },
    { id: "2", rank: 2, name: "Item 2", score: 19000 },
    { id: "3", rank: 3, name: "Item 3", score: 18000 },
    { id: "4", rank: 4, name: "Item 4", score: 17000 },
    { id: "5", rank: 5, name: "Item 5", score: 16000 },
    { id: "6", rank: 6, name: "Item 6", score: 15000 },
    { id: "7", rank: 7, name: "Item 7", score: 14000 },
    { id: "8", rank: 8, name: "Item 8", score: 13000 },
    { id: "9", rank: 9, name: "Item 9", score: 12000 },
    { id: "10", rank: 10, name: "Item 10", score: 11000 },
  ];

  const steps = [
    { label: "สร้างบัญชี", status: "completed" as const },
    { label: "กรอกข้อมูล", status: "active" as const },
    { label: "เสร็จสิ้น", status: "default" as const },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Button */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Button</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Button Default</Button>
            <Button variant="outline">Button Outline</Button>
            <Button variant="secondary">Button Secondary</Button>
            <Button variant="destructive">Button Destructive</Button>
            <Button variant="ghost">Button Ghost</Button>
            <Button variant="link">Button Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="auto">Auto Width</Button>
          </div>
        </section>

        {/* Input */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Input</h2>
          <div className="flex flex-wrap gap-4">
            <Input placeholder="Input default" />
            <Input type="email" placeholder="Email input" />
            <Input type="number" placeholder="Number input" />
          </div>
        </section>

        {/* Label */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Label</h2>
          <div className="flex flex-wrap gap-4">
            <Label>Label Default</Label>
            <Label htmlFor="input1">Label for Input</Label>
          </div>
        </section>

        {/* InputField */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">InputField</h2>
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
        </section>

        {/* PasswordField */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">PasswordField</h2>
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
        </section>

        {/* Divider */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Divider</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <Divider />
            <Divider text="หรือ" />
            <Divider text="หรือดำเนินการต่อด้วย" />
          </div>
        </section>

        {/* Stepper */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Stepper</h2>
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
        </section>

        {/* Form */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Form</h2>
          <div className="flex flex-col gap-4">
            <Form className="w-[387px]">
              <InputField label="Email" placeholder="email@example.com" />
              <Button>Submit</Button>
            </Form>
          </div>
        </section>

        {/* SocialButton */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">SocialButton</h2>
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
        </section>

        {/* Image */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Image</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              fill
              containerClassName="w-[93px] h-[93px] rounded-full"
              priority
              sizes="93px"
            />
            <Image
              src="/images/finish.png"
              alt="Finish"
              fill
              containerClassName="w-[120px] h-[120px] rounded-lg"
              sizes="120px"
            />
          </div>
        </section>

        {/* OTPInput */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">OTPInput</h2>
          <div className="flex flex-col gap-4">
            <OTPInput
              length={6}
              value={otpValue}
              onChange={setOtpValue}
              onComplete={(value) => console.log("OTP Complete:", value)}
            />
            <OTPInput
              length={6}
              value={[]}
              onChange={() => {}}
              hasError
            />
          </div>
        </section>

        {/* GlossyGreenButton */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">GlossyGreenButton (ปุ่มสีเขียว)</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center bg-white p-12 rounded-xl">
            <GlossyGreenButton size="lg">
              Start
            </GlossyGreenButton>
            <GlossyGreenButton size="default">
              เริ่มกันเลย
            </GlossyGreenButton>
            <GlossyGreenButton size="sm">
              เริ่ม
            </GlossyGreenButton>
          </div>
          
          <div className="flex flex-wrap gap-6 items-center justify-center bg-gray-100 p-12 rounded-xl">
            <GlossyGreenButton variant="outline" size="lg">
              Outline
            </GlossyGreenButton>
            <GlossyGreenButton size="full">
              Full Width Button
            </GlossyGreenButton>
          </div>
        </section>

        {/* StatCard */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">StatCard (การ์ดสถิติ)</h2>
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
              emoji="💎" 
              title="Premium Member" 
              description="Unlock all premium features" 
              iconBgColor="bg-[#E8F4FF]"
            />
          </div>
        </section>

        {/* BorderedForm */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">BorderedForm (ฟอร์มมี Border)</h2>
          <div className="flex flex-wrap gap-6 items-start">
            <BorderedForm className="w-[376px] h-auto">
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
              <Button size="auto" className="w-full">
                ส่งข้อมูล
              </Button>
            </BorderedForm>

            <BorderedForm className="w-[376px] h-auto py-[20px] px-[24px]">
              <div className="w-full flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <span className="text-[24px]">❤️</span>
                  <span className="text-[20px] font-bold text-[#FF4D4D]">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px]">⚡</span>
                  <span className="text-[20px] font-bold text-[#FFD300]">100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px]">🔥</span>
                  <span className="text-[20px] font-bold text-[#FF7A00]">7</span>
                </div>
              </div>
            </BorderedForm>
          </div>
        </section>

        {/* RoundButton */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">RoundButton (ปุ่มกลม - Level Buttons)</h2>
          <div className="flex flex-col gap-6">
            {/* Blue variant */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-12 rounded-xl">
              <h3 className="text-lg font-bold mb-6 text-[#1CB0F6]">สีฟ้า (Game 1: Path Navigation)</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-4">
                  <RoundButton 
                    variant="blue"
                    size="default" 
                    icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                  />
                  <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                </div>
                <div className="flex items-center gap-4">
                  <RoundButton 
                    variant="blue-locked"
                    size="default" 
                    icon={<Lock className="w-7 h-7 text-white" />}
                  />
                  <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4 (Locked)</span>
                </div>
              </div>
            </div>

            {/* Green variant */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-12 rounded-xl">
              <h3 className="text-lg font-bold mb-6 text-[#19C371]">สีเขียว (Game 2: Asking Question)</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-4">
                  <RoundButton 
                    variant="green"
                    size="default" 
                    icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                  />
                  <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                </div>
                <div className="flex items-center gap-4">
                  <RoundButton 
                    variant="green-locked"
                    size="default" 
                    icon={<Lock className="w-7 h-7 text-white" />}
                  />
                  <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5 (Locked)</span>
                </div>
              </div>
            </div>

            {/* Default variant (Beige) */}
            <div className="bg-white p-12 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold mb-6 text-[#8B7355]">สีเบจ (Default)</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-4">
                  <RoundButton 
                    size="sm" 
                    icon={<span className="text-[16px] font-bold text-[#8B7355]">S</span>}
                  />
                  <span className="text-[14px]">Small</span>
                </div>
                <div className="flex items-center gap-4">
                  <RoundButton 
                    size="default" 
                    icon={<span className="text-[20px] font-bold text-[#8B7355]">M</span>}
                  />
                  <span className="text-[16px]">Default</span>
                </div>
                <div className="flex items-center gap-4">
                  <RoundButton 
                    size="lg" 
                    icon={<span className="text-[24px] font-bold text-[#8B7355]">L</span>}
                  />
                  <span className="text-[18px]">Large</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LeaderboardList */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">LeaderboardList</h2>
          <div className="flex flex-col gap-4">
            <LeaderboardList
              items={mockItems}
              onItemSelect={(user, index) => console.log(user, index)}
              enableArrowNavigation={true}
              displayScrollbar={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
