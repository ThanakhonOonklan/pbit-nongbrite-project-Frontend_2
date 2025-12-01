"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { FormCard } from "@/components/common";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Divider } from "@/components/common/Divider";
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
    <FormCard onSubmit={handleSubmit} className="gap-[15px] w-[400px] h-[580px]">
      {/* Logo */}
      <div className="flex flex-col items-center gap-[8px] w-full">
        <Image
          src="/icons/logo.png"
          alt="Logo"
          fill
          containerClassName="w-[93px] h-[93px] rounded-full"
          className="object-cover"
          priority
        />
        
        {/* Title */}
        <h1 className="text-[24px] leading-[36px] font-bold text-[#3c3c3c] text-center w-full">
          เข้าสู่ระบบ
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
            setPassword(value);
            setPasswordError("");
          }}
          error={passwordError}
          required
        />
      </div>

      {/* Divider */}
      <Divider />

      {/* Login Button */}
      <PrimaryButton
        type="submit"
        size="default"
        className="w-full h-[60px]"
      >
        เข้าสู่ระบบ
      </PrimaryButton>

      {/* Footer Links */}
      <div className="flex flex-col gap-[8px] items-center w-full">
        <div className="flex gap-[8px] items-center text-[10px] leading-[18px] font-bold">
          <span className="text-[#486581]">ยังไม่มีบัญชี?</span>
          <Link
            href="/register"
            className="text-[#127fbf] underline decoration-solid underline-offset-2 hover:text-[#0d6ba3] transition-colors"
          >
            สร้างบัญชี
          </Link>
        </div>
        <div className="flex gap-[8px] items-center text-[10px] leading-[18px] font-bold">
          <span className="text-[#486581]">หรือ</span>
          <Link
            href="/forget-password"
            className="text-[#127fbf] underline decoration-solid underline-offset-2 hover:text-[#0d6ba3] transition-colors"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>
      </div>
    </FormCard>
  );
};

LoginForm.displayName = "LoginForm";

export { LoginForm };

