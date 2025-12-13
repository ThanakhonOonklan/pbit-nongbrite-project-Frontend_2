"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { FormCard } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Divider } from "@/components/common/Divider";
import { PrimaryButton } from "@/components/common";
import { SocialButton } from "@/components/common/SocialButton";
import { Stepper, type Step } from "@/components/common/Stepper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface RegisterFormProps {
  onSubmit?: (email: string, password: string, confirmPassword: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  
  // Step 1 states
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  
  // Validation errors
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  
  // Step 2 states
  const [displayName, setDisplayName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female" | "not-specified" | null>(null);

  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.includes("@gmail.com")) {
      setEmailError("");
      return false;
    }
    setEmailError("");
    return true;
  };

  const containsThai = (text: string): boolean => {
    // Thai Unicode range: \u0E00-\u0E7F
    const thaiRegex = /[\u0E00-\u0E7F]/;
    return thaiRegex.test(text);
  };

  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      return false;
    }
    if (containsThai(passwordValue)) {
      setPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
      return false;
    }
    if (passwordValue.length > 20) {
      setPasswordError("รหัสผ่านห้ามเกิน 20 ตัวอักษร");
      return false;
    }
    if (passwordValue === email) {
      setPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePasswordMatch = (): boolean => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleStep1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    
    // Validate email
    const isEmailValid = validateEmail(email);
    
    // Validate password
    const isPasswordValid = validatePassword(password);
    
    // Validate password match
    const isPasswordMatch = validatePasswordMatch();
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("กรุณายืนยันรหัสผ่าน");
    } else if (containsThai(confirmPassword)) {
      setConfirmPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
    } else if (confirmPassword.length > 20) {
      setConfirmPasswordError("รหัสผ่านห้ามเกิน 20 ตัวอักษร");
    } else if (confirmPassword === email) {
      setConfirmPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
    }
    
    // Additional check: password must not match email
    if (password === email) {
      setPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
    }
    
    // Only proceed if all validations pass
    if (isEmailValid && isPasswordValid && isPasswordMatch && password && confirmPassword && !containsThai(confirmPassword) && confirmPassword.length <= 20 && password !== email && confirmPassword !== email) {
      if (onSubmit) {
        onSubmit(email, password, confirmPassword);
      }
      setCurrentStep(2);
    }
  };

  const handleStep2Next = () => {
    // Validate step 2 data if needed
    // TODO: Process step 2 data when implementing backend
    // Convert gender to uppercase format
    // const genderMap: Record<string, string> = {
    //   "male": "MALE",
    //   "female": "FEMALE",
    //   "not-specified": "NOT_SPECIFIED",
    // };
    // const formattedGender = gender ? genderMap[gender] || "" : "";
    // const step2Data = {
    //   token: "",
    //   name: displayName,
    //   age: age ? parseInt(age, 10) : 0,
    //   gender: formattedGender,
    // };
    
    // Move to step 3 or complete registration
    setCurrentStep(3);
  };

  const getSteps = (): Step[] => {
    if (currentStep === 1) {
      return [
        { label: "สร้างบัญชี", status: "active" },
        { label: "กรอกข้อมูล", status: "default" },
        { label: "เสร็จสิ้น", status: "default" },
      ];
    } else if (currentStep === 2) {
      return [
        { label: "สร้างบัญชี", status: "completed" },
        { label: "กรอกข้อมูล", status: "active", stepNumber: 2 },
        { label: "เสร็จสิ้น", status: "default", stepNumber: 3 },
      ];
    } else {
      return [
        { label: "สร้างบัญชี", status: "completed" },
        { label: "กรอกข้อมูล", status: "completed" },
        { label: "เสร็จสิ้น", status: "completed" },
      ];
    }
  };

  const handleGenderSelect = (selectedGender: "male" | "female" | "not-specified") => {
    setGender(selectedGender === gender ? null : selectedGender);
  };

  // Step 1: Create Account
  const renderStep1 = () => (
    <>
      {/* Logo and Title Section */}
      <div className="flex flex-col gap-2 md:gap-3 items-center w-full mb-4 md:mb-6">
        <div className="flex flex-col items-center gap-2 w-full">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-[70px] h-[70px] md:w-[80px] md:h-[80px] lg:w-[93px] lg:h-[93px] rounded-full"
            className="object-cover"
            priority
            sizes="(max-width: 768px) 70px, (max-width: 1024px) 80px, 93px"
          />
        </div>
        
        {/* Title */}
        <h1 className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full">
          สร้างบัญชี
        </h1>
        
        {/* Subtitle */}
        <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full">
          พร้อมที่จะเรียนรู้หรือยัง?
        </p>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">
        <InputField
          label="อีเมล"
          type="email"
          placeholder="กรุณากรอกอีเมลของคุณ"
          value={email}
          className="h-[48px] md:h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (value && !value.includes("@gmail.com")) {
              setEmailError("อีเมลต้องมี @gmail.com");
            } else {
              setEmailError("");
            }
            // Check if password matches new email
            if (password === value) {
              setPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
            } else if (passwordError === "รหัสผ่านห้ามตรงกับอีเมล") {
              setPasswordError("");
            }
            // Check if confirm password matches new email
            if (confirmPassword === value) {
              setConfirmPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
            } else if (confirmPasswordError === "รหัสผ่านห้ามตรงกับอีเมล") {
              setConfirmPasswordError("");
            }
          }}
          onBlur={() => validateEmail(email)}
          error={emailError}
          required
        />

        <PasswordField
          label="รหัสผ่าน"
          placeholder="กรุณากรอกรหัสผ่านของคุณ"
          value={password}
          maxLength={20}
          className="h-[48px] md:h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
          onChange={(e) => {
            const value = e.target.value;
            // Prevent Thai characters
            if (containsThai(value)) {
              setPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
              return;
            }
            // Prevent exceeding 20 characters
            if (value.length > 20) {
              return;
            }
            // Prevent password matching email
            if (value === email) {
              setPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
              setPassword(value);
              return;
            }
            setPassword(value);
            setPasswordError("");
            // Check password match when password changes
            if (confirmPassword && value !== confirmPassword) {
              setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
            } else {
              setConfirmPasswordError("");
            }
          }}
          error={passwordError}
          required
        />

        <PasswordField
          label="ยืนยันรหัสผ่าน"
          placeholder="กรุณายืนยันรหัสผ่านของคุณ"
          value={confirmPassword}
          maxLength={20}
          className="h-[48px] md:h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
          onChange={(e) => {
            const value = e.target.value;
            // Prevent Thai characters
            if (containsThai(value)) {
              setConfirmPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
              return;
            }
            // Prevent exceeding 20 characters
            if (value.length > 20) {
              return;
            }
            // Prevent password matching email
            if (value === email) {
              setConfirmPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
              setConfirmPassword(value);
              return;
            }
            setConfirmPassword(value);
            // Check password match
            if (password && value !== password) {
              setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
            } else {
              setConfirmPasswordError("");
            }
          }}
          error={confirmPasswordError}
          required
        />
      </div>

      {/* Divider */}
      <Divider />

      {/* Register Button */}
      <PrimaryButton
        type="submit"
        variant="sky-blue"
        size="lg"
        className="mt-2 w-full h-[50px] md:h-[52px] rounded-[12px] md:rounded-[15px] text-[15px] md:text-[16px] font-semibold shadow-[0_4px_15px_rgba(28,176,246,0.3)] hover:shadow-[0_6px_20px_rgba(28,176,246,0.4)] transition-all"
      >
        สร้างบัญชี
      </PrimaryButton>

      {/* Footer Links */}
      <div className="flex gap-2 items-center justify-center w-full mt-4">
        <span className="text-gray-600 text-[12px] md:text-[13px] leading-tight font-medium">
          มีบัญชีอยู่แล้ว?
        </span>
        <Link
          href="/login"
          className="text-[#1cb0f6] text-[12px] md:text-[13px] leading-tight font-semibold hover:text-[#17a3e3] transition-colors"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </>
  );

  // Step 2: Fill Information
  const renderStep2 = () => (
    <>
      {/* Logo and Welcome Section */}
      <div className="flex flex-col gap-3 md:gap-4 items-center w-full mb-4 md:mb-6">
        <div className="flex flex-col items-center gap-2 w-full">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-[70px] h-[70px] md:w-[80px] md:h-[80px] lg:w-[93px] lg:h-[93px] rounded-full"
            className="object-cover"
            priority
            sizes="(max-width: 768px) 70px, (max-width: 1024px) 80px, 93px"
          />
        </div>
        
        {/* Welcome Message */}
        <p className="text-[20px] md:text-[22px] lg:text-[24px] leading-tight font-bold text-center w-full">
          <span className="text-gray-800">ยินดีต้อนรับสู่ </span>
          <span className="text-[#1cb0f6]">P&apos;Bit </span>
          <span className="text-[#ffd300]">Nong Brite</span>
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">
        <InputField
          label="ชื่อที่แสดง"
          type="text"
          placeholder="กรุณากรอกชื่อที่แสดง"
          value={displayName}
          className="h-[48px] md:h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
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
          className="h-[48px] md:h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
          onChange={(e) => {
            const value = e.target.value;
            const numValue = parseInt(value, 10);
            if (value === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= 100)) {
              setAge(value);
            }
          }}
          min={0}
          max={100}
        />

        {/* Gender Label */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[10px] leading-[18px] font-semibold text-[#334E68]">
            เพศ
          </label>
          
          {/* Gender Buttons */}
          <div className="flex gap-[25px] w-full">
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
              variant={gender === "not-specified" ? "not-specified" : "default"}
              selected={gender === "not-specified"}
              onSelect={() => handleGenderSelect("not-specified")}
            >
              ไม่ระบุตัวตน
            </SocialButton>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <PrimaryButton
        type="button"
        onClick={handleStep2Next}
        variant="sky-blue"
        size="lg"
        className="mt-2 w-full h-[50px] md:h-[52px] rounded-[12px] md:rounded-[15px] text-[15px] md:text-[16px] font-semibold shadow-[0_4px_15px_rgba(28,176,246,0.3)] hover:shadow-[0_6px_20px_rgba(28,176,246,0.4)] transition-all"
      >
        ถัดไป
      </PrimaryButton>
    </>
  );

  // Step 3: Complete
  const renderStep3 = () => (
    <>
      {/* Image Section */}
      <div className="flex flex-col items-center gap-[8px] w-full">
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

      {/* Action Button - Centered */}
      <div className="flex items-center justify-center w-full mt-6">
        <PrimaryButton 
          type="button" 
          onClick={() => {
            router.push("/login");
          }}
          variant="sky-blue"
          size="lg"
          className="w-[150px] md:w-[180px] h-[50px] md:h-[52px] rounded-[12px] md:rounded-[15px] text-[15px] md:text-[16px] font-semibold shadow-[0_4px_15px_rgba(28,176,246,0.3)] hover:shadow-[0_6px_20px_rgba(28,176,246,0.4)] transition-all"
        >
          เริ่มกันเลย
        </PrimaryButton>
      </div>
    </>
  );

  return (
    <div className="relative w-full max-w-[480px]">
      {/* Outer card with landing page theme */}
      <div className="relative bg-white rounded-[32px] md:rounded-[40px] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 shadow-[0_20px_50px_rgba(28,176,246,0.2)] overflow-hidden">
        {/* Decorative shapes - matching landing page colors */}
        <div className="pointer-events-none absolute -top-[70px] -right-[80px] w-[280px] h-[200px] md:w-[320px] md:h-[220px] bg-[#38bdf8] rounded-bl-[130px] opacity-20">
          <div className="absolute top-8 -left-10 w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-[#1cb0f6] rounded-bl-[130px] opacity-30" />
        </div>
        <div className="pointer-events-none absolute -bottom-[110px] -left-[90px] w-[240px] h-[240px] md:w-[280px] md:h-[280px] bg-[#fbbf24] rounded-full opacity-15">
          <div className="absolute top-6 left-8 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-[#ffd300] rounded-full opacity-20" />
        </div>

        <div className="relative z-10">
          <FormCard 
            onSubmit={currentStep === 1 ? handleStep1Submit : (e) => e.preventDefault()} 
            className={cn(
              "w-full h-auto p-0 gap-6 bg-transparent border-none shadow-none items-stretch",
              currentStep === 3 ? "gap-8" : "gap-5 md:gap-6"
            )}
          >
            {/* Stepper */}
            <div className="w-full">
              <Stepper steps={getSteps()} />
            </div>

            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </FormCard>
        </div>
      </div>
    </div>
  );
};

RegisterForm.displayName = "RegisterForm";

export { RegisterForm };

