"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/store/auth.store";
import { LoadingSpinner } from "@/components/common";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated, registerStep, resetRegister } = useAuthStore();


  useEffect(() => {
    if (hasHydrated && isAuthenticated && registerStep === 3) {
      const timer = setTimeout(() => {
        router.push("/courses");
        resetRegister();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasHydrated, isAuthenticated, registerStep, router, resetRegister]);


  useEffect(() => {
    if (hasHydrated && isAuthenticated && registerStep === 1) {
      router.push("/courses");
    }
  }, [hasHydrated, isAuthenticated, registerStep, router]);

  if (!hasHydrated || (isAuthenticated && registerStep === 1)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/Background/LoginRegBackground.png')",
      }}
    >
      <div className="w-full max-w-[420px] relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
