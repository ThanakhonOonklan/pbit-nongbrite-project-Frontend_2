"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import { useAuthStore } from "@/store/auth.store";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/courses");
    }
  }, [isAuthenticated, router]);

  const handleForgotPassword = () => {
    // Handled in ForgetPasswordForm.tsx via resetPassword
  };

  return (
    <div
      className="min-h-screen flex items-start pt-10 sm:pt-0 sm:items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/Background/LoginRegBackground.png')",
      }}
    >
      <div className="relative z-10 w-full max-w-[420px]">
        <ForgetPasswordForm onSubmit={handleForgotPassword} />
      </div>
    </div>
  );
}



