"use client";

import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";

export default function ForgotPasswordPage() {
  const handleForgotPassword = (
    email: string, 
    otp: string, 
    password: string, 
    confirmPassword: string
  ) => {
    // TODO: Add your forgot password logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <ForgetPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
}

