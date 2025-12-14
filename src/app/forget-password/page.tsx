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
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <ForgetPasswordForm onSubmit={handleForgotPassword} />
      </div>
    </div>
  );
}

