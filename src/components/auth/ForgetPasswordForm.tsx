"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { OTPInput } from "@/components/common/OTPInput";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import Stepper, { Step } from "@/components/common/Stepper";
import { useRouter } from "next/navigation";

export interface ForgetPasswordFormProps {
  onSubmit?: (email: string, otp: string, password: string, confirmPassword: string) => void;
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Step 1: Email
  const [email, setEmail] = React.useState("");
  
  // Step 2: OTP
  const [otp, setOtp] = React.useState<string[]>([]);
  const [countdown, setCountdown] = React.useState(0);
  const [hasOTPError, setHasOTPError] = React.useState(false);
  
  // Step 3: Reset Password
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleFinalStepCompleted = () => {
    if (isLoading) return;
    setIsLoading(true);
    const otpString = otp.join("");
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(email, otpString, password, confirmPassword);
      }
      // Navigate to login page after completion
      router.push("/login");
    }, 1000);
  };

  const handleOTPChange = (value: string[]) => {
    setOtp(value);
    setHasOTPError(false);
  };

  const handleOTPComplete = (value: string) => {
    if (value.length === 6) {
      setHasOTPError(false);
      // Countdown will be started when step changes via Stepper
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
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight mb-1 text-center mt-3">
        ลืมรหัสผ่าน?
      </h1>
      
      {/* Subtitle */}
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
        กรุณากรอกอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน
      </p>

      {/* Input Field */}
      <div className="flex flex-col gap-4 md:gap-5 w-full items-center mb-1 ">
        <div className="w-[390px] max-w-[460px]">
          <InputField
            label="อีเมล"
            type="email"
            placeholder="กรุณากรอกอีเมลของคุณ"
            value={email}
            className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );

  // Step 2: OTP Verification
  const renderStep2 = () => (
    <div className="flex flex-col w-full gap-4 md:gap-5 ">
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight text-center mt-3">  
        ตรวจสอบอีเมลของคุณ
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] text-gray-500 text-center">
        เราได้ส่งลิงก์รีเซ็ตไปที่ Email ของคุณเรียบร้อย<br />
        โปรดป้อนรหัส 6 หลักที่ระบุไว้ในอีเมล
      </p>

      {/* OTP Input Fields */}
      <div className="flex justify-center w-full mb-4">
        <OTPInput
          length={6}
          value={otp}
          onChange={handleOTPChange}
          onComplete={handleOTPComplete}
          hasError={hasOTPError}
        />
      </div>

      {/* Resend Email Link */}
      <div className="flex justify-center w-full mb-4">
        <p className="text-[13px] md:text-[14px] text-gray-500 text-center">
          <span>ยังไม่ได้รับอีเมลใช่ไหม? </span>
          {countdown > 0 ? (
            <span className="text-[#1cb0f6]">
              ส่งอีเมลอีกครั้ง ({countdown} วินาที)
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#1cb0f6] underline decoration-solid underline-offset-0 hover:text-[#17a3e3] transition-colors"
            >
              ส่งอีเมลอีกครั้ง
            </button>
          )}
        </p>
      </div>
    </div>
  );

  // Step 3: Reset Password
  const renderStep3 = () => (
    <>
      {/* Title */}
      <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight mb-1 text-center mt-3">
        ตั้งรหัสผ่านใหม่
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
        ตรวจสอบให้แน่ใจ ว่ารหัสผ่านเหมือนกัน
      </p>

      {/* Password Fields */}
      <div className="flex flex-col gap-4 md:gap-5 w-full items-center">
        <div className="w-[390px] max-w-[460px] flex flex-col gap-4 md:gap-5 ">
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
            className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all mb-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <>
      {/* Image Section */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Image
          src="/images/finish.png"
          alt="Success"
          fill
          containerClassName="w-[120px] h-[120px]"
          className="object-contain"
          priority
          sizes="120px"
        />
      </div>

      {/* Title */}
      <h1 className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full">
        อัพเดตเสร็จสิ้น!
      </h1>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full mt-2">
        รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว<br />
        คลิก &quot;ดำเนินการต่อ&quot; เพื่อเข้าสู่ระบบ
      </p>

    </>
  );

  return (
    <div className="w-full ">
      <LoadingOverlay isLoading={isLoading} message="กำลังดำเนินการ..." />
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          // Start countdown when moving to step 2
          if (step === 2) {
            setCountdown(15);
          }
        }}
        onFinalStepCompleted={handleFinalStepCompleted}
        backButtonText="ย้อนกลับ"
        nextButtonText="ถัดไป"
        stepContainerClassName="px-0"
        footerClassName="px-0"
        disableStepIndicators={true}
        backButtonProps={{ disabled: isLoading }}
        nextButtonProps={{ disabled: isLoading }}
      >
        {/* Step 1: Enter Email */}
        <Step>
          {renderStep1()}
        </Step>

        {/* Step 2: OTP Verification */}
        <Step>
          {renderStep2()}
        </Step>

        {/* Step 3: Reset Password */}
        <Step>
          {renderStep3()}
        </Step>

        {/* Step 4: Success */}
        <Step>
          {renderStep4()}
        </Step>
      </Stepper>
    </div>
  );
};

ForgetPasswordForm.displayName = "ForgetPasswordForm";

export { ForgetPasswordForm };
