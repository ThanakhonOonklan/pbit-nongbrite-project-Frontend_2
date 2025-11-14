"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { Form } from "@/components/common/Form";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Divider } from "@/components/common/Divider";
import { GlossyGreenButton } from "@/components/common/GlossyGreenButton";
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
    // Convert gender to uppercase format
    const genderMap: Record<string, string> = {
      "male": "MALE",
      "female": "FEMALE",
      "not-specified": "NOT_SPECIFIED",
    };
    const formattedGender = gender ? genderMap[gender] || "" : "";
    
    // Log step 2 data
    const step2Data = {
      token: "",
      name: displayName,
      age: age ? parseInt(age, 10) : 0,
      gender: formattedGender,
    };
    console.log(step2Data);
    
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
      <div className="flex flex-col gap-[3px] items-center w-full">
        <div className="flex flex-col items-center gap-[8px] w-full">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-[93px] h-[93px] rounded-full"
            className="object-cover"
            priority
          />
        </div>
        
        {/* Title */}
        <h1 className="text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center w-full">
          สร้างบัญชี
        </h1>
        
        {/* Subtitle */}
        <p className="text-[14px] leading-[36px] font-bold text-[#909090] text-center w-full">
          พร้อมที่จะเรียนรู้หรือยัง?
        </p>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-[16px] w-full">
        <InputField
          label="อีเมล"
          type="email"
          placeholder="zazajayzaza123@gmail.c.com"
          value={email}
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
          placeholder="**************"
          value={password}
          maxLength={20}
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
          placeholder="**************"
          value={confirmPassword}
          maxLength={20}
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
      <GlossyGreenButton
        type="submit"
        className="h-[40px] w-full px-4 py-[10px] rounded-[8px] bg-[#1cb0f6] shadow-[0px_4px_0px_0px_#1093cc,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#17a3e3] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#1093cc,0px_4px_8px_rgba(28,176,246,0.3)]"
      >
        สร้างบัญชี
      </GlossyGreenButton>

      {/* Footer Links */}
      <div className="flex gap-[8px] items-center justify-center w-full">
        <span className="text-[#486581] text-[10px] leading-[18px] font-bold">
          มีบัญชีอยู่แล้ว?
        </span>
        <Link
          href="/login"
          className="text-[#127fbf] text-[10px] leading-[18px] font-bold underline decoration-solid underline-offset-2 hover:text-[#0d6ba3] transition-colors"
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
      <div className="flex flex-col gap-[13px] items-center w-full">
        <div className="flex flex-col items-center gap-[8px] w-full">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-[93px] h-[93px] rounded-full"
            className="object-cover"
            priority
          />
        </div>
        
        {/* Welcome Message */}
        <p className="text-[24px] leading-[36px] font-bold text-center w-full whitespace-pre-wrap">
          <span className="text-[#3c3c3c]">ยินดีต้อนรับส</span>
          <span>ู่ </span>
          <span className="text-[#1cb0f6]">P&apos;Bit </span>
          <span className="text-[#ffd300]">Nong Brite</span>
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[16px] w-full">
        <InputField
          label="ชื่อที่แสดง"
          type="text"
          placeholder="น้องไบร์"
          value={displayName}
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
          placeholder="4"
          value={age}
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
      <GlossyGreenButton
        type="button"
        onClick={handleStep2Next}
        className="h-[40px] w-full px-4 py-[10px] rounded-[8px] bg-[#1cb0f6] shadow-[0px_4px_0px_0px_#1093cc,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#17a3e3] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#1093cc,0px_4px_8px_rgba(28,176,246,0.3)]"
      >
        ถัดไป
      </GlossyGreenButton>
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
      <p className="text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center w-full whitespace-pre-wrap">
        เสร็จสิ้น!
      </p>

      {/* Description */}
      <p className="text-[14px] leading-[36px] font-bold text-[#909090] text-center w-full whitespace-pre-wrap -mt-[35px]">
        ไปเริ่มเรียนรู้กันเลย!
      </p>

      {/* Action Button - Centered */}
      <div className="flex items-center justify-center w-full -mt-[5px]">
        <GlossyGreenButton 
          type="button" 
          onClick={() => {
            router.push("/login");
          }}
          className="h-[40px] w-[150px] px-4 py-[10px] rounded-[8px] bg-[#1cb0f6] shadow-[0px_4px_0px_0px_#1093cc,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#17a3e3] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#1093cc,0px_4px_8px_rgba(28,176,246,0.3)]"
        >
          เริ่มกันเลย
        </GlossyGreenButton>
      </div>
    </>
  );

  return (
    <Form 
      onSubmit={currentStep === 1 ? handleStep1Submit : (e) => e.preventDefault()} 
      className={cn(
        currentStep === 3 ? "gap-[32px] w-[480px] h-[440px]" : "gap-[18px] w-[480px] h-[640px]"
      )}
    >
      {/* Stepper */}
      <Stepper steps={getSteps()} />

      {/* Step Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </Form>
  );
};

RegisterForm.displayName = "RegisterForm";

export { RegisterForm };

