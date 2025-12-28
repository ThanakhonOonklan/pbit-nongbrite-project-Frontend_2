"use client";

import * as React from "react";
import { FormCard, Image, LoadingSpinner } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import Link from "next/link";

export interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error, onClearError }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<string | undefined>();

  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.trim()) {
      setEmailError("กรุณากรอกอีเมล");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("รูปแบบอีเมลไม่ถูกต้อง");
      return false;
    }
    setEmailError(undefined);
    return true;
  };

  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue.trim()) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors
    setEmailError(undefined);
    setPasswordError(undefined);
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    if (onSubmit && !isLoading) {
      onSubmit(email, password);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear field error when user starts typing
    if (emailError) {
      setEmailError(undefined);
    }
    // Clear API error when user starts typing
    if (error && onClearError) {
      onClearError();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear field error when user starts typing
    if (passwordError) {
      setPasswordError(undefined);
    }
    // Clear API error when user starts typing
    if (error && onClearError) {
      onClearError();
    }
  };

  return (
    <div className="relative w-full ">
      {/* Outer card with landing page theme */}
      <div className="relative bg-white rounded-[32px] md:rounded-[40px] px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 shadow-[0_20px_50px_rgba(28,176,246,0.2)] overflow-hidden ">
        {/* Decorative shapes - matching landing page colors */}
        <div className="pointer-events-none absolute -top-[70px] -right-[80px] w-[280px] h-[200px] md:w-[320px] md:h-[220px] bg-[#38bdf8] rounded-bl-[130px] opacity-20">
          <div className="absolute top-8 -left-10 w-[280px] h-[180px] md:w-[320px] md:h-[200px] bg-[#1cb0f6] rounded-bl-[130px] opacity-30" />
        </div>
        <div className="pointer-events-none absolute -bottom-[110px] -left-[90px] w-[240px] h-[240px] md:w-[280px] md:h-[280px] bg-[#fbbf24] rounded-full opacity-15">
          <div className="absolute top-6 left-8 w-[220px] h-[220px] md:w-[260px] md:h-[260px] bg-[#ffd300] rounded-full opacity-20" />
        </div>

        <div className="relative z-10">
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 text-center">
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
                <span className="text-[#1cb0f6]">P&apos;Bit</span>
                <span className="text-[#ffd300]">Nong Brite</span>
              </p>
            </div>
          </div>

          {/* Welcome text */}
          <div className="mb-8 md:mb-7">
            <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight">
              สวัสดี!
            </h1>
            <h1 className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-gray-800 leading-tight">
              ยินดีต้อนรับกลับมา!
            </h1>
          </div>

          {/* Form content */}
          <FormCard
            onSubmit={handleSubmit}
            className="w-full h-auto p-0 gap-6 bg-transparent border-none shadow-none items-center"
          >
            {/* Input Fields */}
            <div className="flex flex-col gap-5 md:gap-6 w-full max-w-[460px]">
              <InputField
                type="email"
                label="อีเมล"
                placeholder="กรุณากรอกอีเมลของคุณ"
                value={email}
                error={emailError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handleEmailChange}
                required
                disabled={isLoading}
                aria-label="อีเมล"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />

              <div className="flex flex-col gap-2 w-full">
                <PasswordField
                  label="รหัสผ่าน"
                  placeholder="กรุณากรอกรหัสผ่านของคุณ"
                  value={password}
                  error={passwordError}
                  className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                  aria-label="รหัสผ่าน"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                <div className="flex justify-end">
                  <Link
                    href="/forget-password"
                    className="text-[12px] md:text-[13px] leading-[18px] text-gray-500 hover:text-[#1cb0f6] transition-colors"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
              </div>

              {/* API Error Message */}
              {error && (
                <div 
                  className="w-full max-w-[460px] p-3 rounded-[12px] bg-red-50 border-2 border-red-200"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-[13px] md:text-[14px] text-red-600 text-center">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              aria-label="เข้าสู่ระบบ"
              aria-busy={isLoading}
              className="mt-2 w-full max-w-[460px] h-[50px] md:h-[52px] rounded-[12px] md:rounded-[15px] text-[15px] md:text-[16px] font-semibold bg-[#1cb0f6] text-white border-2 border-[#1699D6] shadow-[0_4px_15px_rgba(28,176,246,0.3)] hover:bg-[#17a3e3] hover:border-[#1280B5] hover:shadow-[0_6px_20px_rgba(28,176,246,0.4)] active:translate-y-[2px] active:shadow-[0_2px_8px_rgba(28,176,246,0.3)] focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>

            {/* Footer Links */}
            <p className="mt-4 md:mt-6 text-center text-[13px] md:text-[14px] text-gray-600 w-full max-w-[460px]">
              ยังไม่มีบัญชี?{" "}
              <Link
                href="/register"
                className="text-[#1cb0f6] font-semibold hover:text-[#17a3e3] transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </FormCard>
        </div>
      </div>
    </div>
  );
};

LoginForm.displayName = "LoginForm";

export { LoginForm };
