"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Image } from "@/components/common/Image";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { SocialButton } from "@/components/common/SocialButton";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import Stepper, { Step } from "@/components/common/Stepper";

export interface RegisterFormProps {
  onSubmit?: (email: string, password: string, confirmPassword: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Step 1 states
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Step 2 states
  const [displayName, setDisplayName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<
    "male" | "female" | "not-specified" | null
  >(null);

  const handleGenderSelect = (
    selectedGender: "male" | "female" | "not-specified"
  ) => {
    setGender(selectedGender === gender ? null : selectedGender);
  };

  const handleFinalStepCompleted = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      if (onSubmit) {
        onSubmit(email, password, confirmPassword);
      }
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="w-full ">
      <LoadingOverlay isLoading={isLoading} message="กำลังดำเนินการ..." />
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log("Step:", step);
        }}
        onFinalStepCompleted={handleFinalStepCompleted}
        backButtonText="ย้อนกลับ"
        nextButtonText="ถัดไป"
        completeButtonText="ไปเรียนกันเลย!"
        stepContainerClassName="px-5"
  
        footerClassName="px-0"
        footerLeftContent={
          <p className="text-[13px] md:text-[14px] text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link
              href="/login"
              className="text-[#1cb0f6] font-semibold hover:text-[#17a3e3] transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        }
        disableStepIndicators={false}
        backButtonProps={{ disabled: isLoading }}
        nextButtonProps={{ disabled: isLoading }}
      >
        {/* Step 1: Create Account */}
        <Step>
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-1 text-center ">
            <div className="relative w-[40px] h-[40px] md:w-[49px] md:h-[49px]">
              <Image
                src="/icons/misc/logo.png"
                alt="Logo"
                fill
                containerClassName="w-full h-full rounded-full"
                className="object-cover"
                priority
                sizes="(max-width: 768px) 40px, 49px"
              />
            </div>
            <div>
              <p className="text-[20px] md:text-[24px] lg:text-[26px] leading-tight font-bold">
                <span className="text-[#1cb0f6]">P&apos;Bit </span>
                <span className="text-[#ffd300]">Nong Brite</span>
              </p>
            </div>
          </div>

          <h2 className="text-[22px] md:text-[24px] font-bold text-gray-800 mb-2 text-center">
            สร้างบัญชี
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
            พร้อมที่จะเรียนรู้หรือยัง?
          </p>

          {/* Input Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full min-h-[280px] items-center mb-4">
            <div className="w-[390px] max-w-[460px] flex flex-col gap-5 md:gap-6">
              <InputField
                label="อีเมล"
                type="email"
                placeholder="กรุณากรอกอีเมลของคุณ"
                value={email}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordField
                label="รหัสผ่าน"
                placeholder="กรุณากรอกรหัสผ่านของคุณ"
                value={password}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <PasswordField
                label="ยืนยันรหัสผ่าน"
                placeholder="กรุณายืนยันรหัสผ่านของคุณ"
                value={confirmPassword}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </Step>

        {/* Step 2: Fill Information */}
        <Step>
          <p className="text-[20px] md:text-[22px] lg:text-[24px] leading-tight font-bold text-center mt-6 md:mt-8 mb-8 md:mb-10">
            <span className="text-gray-800">ยินดีต้อนรับสู่ </span>
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>

          {/* Form Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full min-h-[280px] items-center mb-4">
            <div className="w-[390px] max-w-[460px] flex flex-col gap-5 md:gap-6">
              <InputField
                label="ชื่อที่แสดง"
                type="text"
                placeholder="กรุณากรอกชื่อที่แสดง"
                value={displayName}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 25) {
                    setDisplayName(value);
                  }
                }}
                maxLength={25}
              />

              <InputField
                label="อายุ"
                type="number"
                placeholder="กรุณากรอกอายุ"
                value={age}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = parseInt(value, 10);
                  if (
                    value === "" ||
                    (!isNaN(numValue) && numValue >= 0 && numValue <= 100)
                  ) {
                    setAge(value);
                  }
                }}
                min={0}
                max={100}
              />

              {/* Gender Label */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] leading-[18px] font-semibold text-gray-700">
                  เพศ
                </label>

                {/* Gender Buttons */}
                <div className="flex gap-3 w-full">
                  <SocialButton
                    variant={gender === "male" ? "selected" : "default"}
                    selected={gender === "male"}
                    onSelect={() => handleGenderSelect("male")}
                  >
                    เพศชาย
                  </SocialButton>
                  <SocialButton
                    variant={gender === "female" ? "female" : "default"}
                    selected={gender === "female"}
                    onSelect={() => handleGenderSelect("female")}
                  >
                    เพศหญิง
                  </SocialButton>
                  <SocialButton
                    variant={
                      gender === "not-specified" ? "not-specified" : "default"
                    }
                    selected={gender === "not-specified"}
                    onSelect={() => handleGenderSelect("not-specified")}
                  >
                    ไม่ระบุตัวตน
                  </SocialButton>
                </div>
              </div>
            </div>
          </div>
        </Step>

        {/* Step 3: Complete */}
        <Step>
          {/* Image Section */}
          <div className="flex flex-col items-center gap-4 w-full ">
            <Image
              src="/images/finish.png"
              alt="Finish"
              fill
              containerClassName="w-[120px] h-[120px]"
              className="object-contain"
              priority
              sizes="120px"
            />
          </div>

          {/* Title */}
          <p className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full">
            เสร็จสิ้น!
          </p>

          {/* Description */}
          <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full mt-2">
            ไปเริ่มเรียนรู้กันเลย!
          </p>
        </Step>
      </Stepper>
    </div>
  );  
};

RegisterForm.displayName = "RegisterForm";

export { RegisterForm };
