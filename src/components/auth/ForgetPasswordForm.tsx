"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { FormCard } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { PrimaryButton } from "@/components/common";
import { OTPInput } from "@/components/common/OTPInput";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface ForgetPasswordFormProps {
  onSubmit?: (email: string, otp: string, password: string, confirmPassword: string) => void;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  
  // Step 1: Email
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  
  // Step 2: OTP
  const [otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(0);
  const [hasOTPError, setHasOTPError] = React.useState(false);
  
  // Step 3: Reset Password
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.includes("@gmail.com")) {
      setEmailError("อีเมลต้องมี @gmail.com");
      return false;
    }
    setEmailError("");
    return true;
  };

  const containsThai = (text: string): boolean => {
    const thaiRegex = /[\u0E00-\u0E7F]/;
    return thaiRegex.test(text);
  };

  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue) {
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
    
    setEmailError("");
    
    const isEmailValid = validateEmail(email);
    
    if (isEmailValid) {
      setCurrentStep(2);
      // Start countdown when moving to step 2
      setCountdown(15);
    }
  };

  const handleStep2Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setHasOTPError(true);
      setTimeout(() => {
        setHasOTPError(false);
      }, 500);
      return;
    }

    setHasOTPError(false);
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setPasswordError("");
    setConfirmPasswordError("");
    
    const isPasswordValid = validatePassword(password);
    const isPasswordMatch = validatePasswordMatch();
    
    if (!confirmPassword) {
      setConfirmPasswordError("กรุณายืนยันรหัสผ่าน");
    } else if (containsThai(confirmPassword)) {
      setConfirmPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
    } else if (confirmPassword.length > 20) {
      setConfirmPasswordError("รหัสผ่านห้ามเกิน 20 ตัวอักษร");
    } else if (confirmPassword === email) {
      setConfirmPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
    }
    
    if (
      isPasswordValid &&
      isPasswordMatch &&
      password &&
      confirmPassword &&
      !containsThai(confirmPassword) &&
      confirmPassword.length <= 20 &&
      password !== email &&
      confirmPassword !== email
    ) {
      const otpString = otp.join("");
      if (onSubmit) {
        onSubmit(email, otpString, password, confirmPassword);
      }
      setCurrentStep(4);
    }
  };

  const handleOTPChange = (value: string[]) => {
    setOtp(value);
    setHasOTPError(false);
  };

  const handleOTPComplete = (value: string) => {
    if (value.length === 6) {
      setHasOTPError(false);
      setCurrentStep(3);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    
    setOtp([]);
    setHasOTPError(false);
    setCountdown(15);
  };

  // Step 1: Enter Email
  const renderStep1 = () => (
    <>
      {/* Header with Back Button and Logo */}
      <div className="flex flex-col gap-[11px] w-full">
        {/* Back Button and Logo */}
        <div className="relative w-full h-[93px]">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute left-0 top-0 w-[25px] h-[25px] flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <FaArrowLeft className="w-[18px] h-[16px] text-[#3c3c3c]" />
          </button>
          
          {/* Logo */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              fill
              containerClassName="w-[93px] h-[93px] rounded-full"
              className="object-cover"
              priority
              sizes="93px"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center w-full whitespace-pre-wrap">
          ลืมรหัสผ่าน ?
        </h1>
        
        {/* Subtitle */}
        <p className="text-[14px] leading-[36px] font-bold text-[#909090] text-center w-full whitespace-pre-wrap">
          กรุณากรอกอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน
        </p>
      </div>

      {/* Input Field */}
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
          }}
          onBlur={() => validateEmail(email)}
          error={emailError}
          required
        />
      </div>

      {/* Submit Button */}
      <PrimaryButton type="submit" size="full">
        ส่งลิ้งรีเซ็ต
      </PrimaryButton>
    </>
  );

  // Step 2: OTP Verification
  const renderStep2 = () => (
    <>
      {/* Header with Back Button */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="relative w-full">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1);
              setOtp([]);
              setHasOTPError(false);
              setCountdown(0);
            }}
            className="absolute left-0 top-0 w-[25px] h-[25px] flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <FaArrowLeft className="w-[18px] h-[16px] text-[#3c3c3c]" />
          </button>

          {/* Title */}
          <h1 className="absolute left-1/2 top-[24px] -translate-x-1/2 text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center whitespace-nowrap">
            ตรวจสอบอีเมลของคุณ
          </h1>

          {/* Description */}
          <div className="absolute left-1/2 top-[64px] -translate-x-1/2 w-[341px] text-[14px] leading-[36px] font-bold text-[#909090] text-center whitespace-pre-wrap">
            <p className="mb-0">เราได้ส่งลิงก์รีเซ็ตไปที่ Email ของคุณเรียบร้อย</p>
            <p>โปรดป้อนรหัส 6 หลักที่ระบุไว้ในอีเมล</p>
          </div>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center w-full mt-[120px]">
          <OTPInput
            length={6}
            value={otp}
            onChange={handleOTPChange}
            onComplete={handleOTPComplete}
            hasError={hasOTPError}
          />
        </div>
      </div>

      {/* Resend Email Link */}
      <div className="flex justify-center w-full">
        <p className="text-[14px] leading-[36px] font-bold text-[#909090] text-center">
          <span>ยังไม่ได้รับอีเมลใช่ไหม? </span>
          {countdown > 0 ? (
            <span className="text-[#1cb0f6]">
              ส่งอีเมลอีกครั้ง ({countdown} วินาที)
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#1cb0f6] underline decoration-solid underline-offset-0 hover:opacity-70 transition-opacity"
            >
              ส่งอีเมลอีกครั้ง
            </button>
          )}
        </p>
      </div>

      {/* Submit Button */}
      <PrimaryButton type="submit" size="full">
        ยืนยันรหัส
      </PrimaryButton>
    </>
  );

  // Step 3: Reset Password
  const renderStep3 = () => (
    <>
      {/* Header with Back Button */}
      <div className="flex flex-col gap-[10px] w-full">
        <div className="relative w-full">
          {/* Back Button */}   
          <button
            type="button"
            onClick={() => {
              setCurrentStep(2);
              setPassword("");
              setConfirmPassword("");
              setPasswordError("");
              setConfirmPasswordError("");
            }}
            className="absolute left-0 top-0 w-[25px] h-[25px] flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <FaArrowLeft className="w-[18px] h-[16px] text-[#3c3c3c]" />
          </button>

          {/* Title */}
          <h1 className="absolute left-1/2 top-[44px] -translate-x-1/2 text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center whitespace-nowrap">
            ตั้งรหัสผ่านใหม่
          </h1>

          {/* Description */}
          <div className="absolute left-1/2 top-[91px] -translate-x-1/2 w-[341px] text-[14px] leading-[36px] font-bold text-[#909090] text-center whitespace-pre-wrap">
            ตรวจสอบให้แน่ใจ ว่ารหัสผ่านเหมือนกัน
          </div>
        </div>
      </div>

      {/* Password Fields */}
      <div className="flex flex-col gap-[16px] w-full mt-[130px]">
        <PasswordField
          label="รหัสผ่าน"
          placeholder="**************"
          value={password}
          maxLength={20}
          onChange={(e) => {
            const value = e.target.value;
            if (containsThai(value)) {
              setPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
              return;
            }
            if (value.length > 20) {
              return;
            }
            if (value === email) {
              setPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
              setPassword(value);
              return;
            }
            setPassword(value);
            setPasswordError("");
            if (confirmPassword && value !== confirmPassword) {
              setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
            } else {
              setConfirmPasswordError("");
            }
          }}
          onBlur={() => validatePassword(password)}
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
            if (containsThai(value)) {
              setConfirmPasswordError("รหัสผ่านห้ามเป็นภาษาไทย");
              return;
            }
            if (value.length > 20) {
              return;
            }
            if (value === email) {
              setConfirmPasswordError("รหัสผ่านห้ามตรงกับอีเมล");
              setConfirmPassword(value);
              return;
            }
            setConfirmPassword(value);
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

      {/* Submit Button */}
      <PrimaryButton type="submit" size="full" className="mt-[10px]">
        อัปเดตรหัสผ่าน
      </PrimaryButton>
    </>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <>
      {/* Image Section */}
      <div className="flex flex-col items-center gap-[8px] w-full h-[162px] justify-center">
        <Image
          src="/images/finish.png"
          alt="Success"
          fill
          containerClassName="w-[84px] h-[136px]"
          className="object-contain"
          priority
          sizes="84px"
        />
      </div>

      {/* Title */}
      <h1 className="text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center w-full whitespace-pre-wrap">
        อัพเดตเสร็จสิ้น!
      </h1>

      {/* Description */}
      <div className="flex flex-col gap-[13px] w-full">
        <p className="text-[14px] leading-[36px] font-bold text-[#909090] text-center w-full whitespace-pre-wrap">
          รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว{"\n"}คลิก &quot;ดำเนินการต่อ&quot; เพื่อเข้าสู่ระบบ
        </p>
      </div>

      {/* Action Button */}
      <PrimaryButton 
        type="button" 
        onClick={() => router.push("/login")} 
        size="full"
      >
        ดำเนินการต่อ
      </PrimaryButton>
    </>
  );

  return (
    <FormCard 
      onSubmit={
        currentStep === 1 
          ? handleStep1Submit 
          : currentStep === 2 
          ? handleStep2Submit 
          : currentStep === 3 
          ? handleStep3Submit 
          : (e) => e.preventDefault()
      } 
      className={cn(
        currentStep === 1 && "gap-[11px] w-[467px] h-[360px]",
        currentStep === 2 && "gap-[11px] w-[467px] h-[360px]",
        currentStep === 3 && "gap-[15px] w-[467px] h-[410px]",
        currentStep === 4 && "gap-[15px] w-[400px] h-[400px]"
      )}
    >
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </FormCard>
  );
};

ForgetPasswordForm.displayName = "ForgetPasswordForm";

export { ForgetPasswordForm };
