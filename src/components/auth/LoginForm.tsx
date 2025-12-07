"use client";

import * as React from "react";
import { FormCard } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { PrimaryButton } from "@/components/common";
import Link from "next/link";

export interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  // Validation errors
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const containsThai = (text: string): boolean => {
    // Thai Unicode range: \u0E00-\u0E7F
    const thaiRegex = /[\u0E00-\u0E7F]/;
    return thaiRegex.test(text);
  };

  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.includes("@gmail.com")) {
      setEmailError("อีเมลต้องมี @gmail.com");
      return false;
    }
    setEmailError("");
    return true;
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
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError("");
    setPasswordError("");
    
    // Validate email
    const isEmailValid = validateEmail(email);
    
    // Validate password
    const isPasswordValid = validatePassword(password);
    
    // Only submit if all validations pass
    if (isEmailValid && isPasswordValid && onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="relative w-full max-w-[420px]">
      {/* Outer card styled like Koala example */}
      <div className="relative bg-white rounded-[40px] px-6 py-8 sm:px-10 sm:py-10 shadow-[0_20px_50px_rgba(0,145,234,0.25)] overflow-hidden">
        {/* Decorative shapes - wavy double-layer style */}
        <div className="pointer-events-none absolute -top-[70px] -right-[80px] w-[320px] h-[220px] bg-[#9FE5FF] rounded-bl-[130px]">
          <div className="absolute top-8 -left-10 w-[320px] h-[200px] bg-[#1CB0F6] rounded-bl-[130px]" />
        </div>
        <div className="pointer-events-none absolute -bottom-[110px] -left-[90px] w-[280px] h-[280px] bg-[#9FD6F5] rounded-full opacity-80">
          <div className="absolute top-6 left-8 w-[260px] h-[260px] bg-[#5ABCE8] rounded-full opacity-80" />
        </div>

        <div className="relative z-10">
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-3 mb-8 text-center">
            <span className="text-[32px]">🐨</span>
            <span className="text-[24px] sm:text-[26px] font-bold text-[#333]">
              P&apos;Bit Nong Brite
            </span>
          </div>

          {/* Welcome text */}
          <div className="mb-10">
            <h1 className="text-[28px] font-bold text-[#333] leading-tight">
              Hello! <span className="inline-block">👋</span>
            </h1>
            <h1 className="text-[28px] font-bold text-[#333] leading-tight">
              Welcome back
            </h1>
          </div>

          {/* Form content */}
          <FormCard
            onSubmit={handleSubmit}
            className="w-full h-auto p-0 gap-6 bg-transparent border-none shadow-none items-stretch"
          >
            {/* Input Fields */}
            <div className="flex flex-col gap-6 w-full">
              <InputField
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                className="h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-5 text-[14px] text-[#333] placeholder:text-[#b0b0b0] focus:border-[#1CB0F6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)]"
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

              <div className="flex flex-col gap-2 w-full">
                <PasswordField
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  maxLength={20}
                  className="h-[50px] bg-[#f8f8f8] border-2 border-[#e0e0e0] rounded-[12px] px-5 text-[14px] text-[#333] placeholder:text-[#b0b0b0] focus:border-[#1CB0F6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)]"
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
                    setPassword(value);
                    setPasswordError("");
                  }}
                  error={passwordError}
                  required
                />
                <div className="flex justify-end">
                  <Link
                    href="/forget-password"
                    className="text-[13px] leading-[18px] text-[#999] hover:text-[#1CB0F6] transition-colors"
                  >
                    Forgot password ?
                  </Link>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <PrimaryButton
              type="submit"
              size="default"
              className="mt-2 w-full h-[52px] sm:h-[56px] rounded-[15px] bg-[#1CB0F6] hover:bg-[#1280B5] text-white text-[16px] font-semibold shadow-[0_4px_15px_rgba(18,128,181,0.3)]"
            >
              Log in
            </PrimaryButton>

            {/* Footer Links */}
            <p className="mt-2 text-center text-[14px] text-[#666]">
              Don&apos;t have an account ?{" "}
              <Link
                href="/register"
                className="text-[#1CB0F6] font-semibold hover:text-[#1280B5] transition-colors"
              >
                Sign up
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

