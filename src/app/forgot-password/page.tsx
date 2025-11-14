"use client";

import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";

export default function ForgotPasswordPage() {
  const handleForgotPassword = (
    email: string, 
    otp: string, 
    password: string, 
    confirmPassword: string
  ) => {
    console.log("Forgot password complete");
    console.log("Email:", email);
    console.log("OTP:", otp);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // Add your forgot password logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <ForgetPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
}

