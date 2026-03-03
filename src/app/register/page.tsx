"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, registerStep, resetRegister } = useAuthStore();


  useEffect(() => {
    if (isAuthenticated && registerStep === 3) {
      const timer = setTimeout(() => {
        router.push("/courses");
        resetRegister();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, registerStep, router, resetRegister]);


  useEffect(() => {
    if (isAuthenticated && registerStep === 1) {
      router.push("/courses");
    }
  }, [isAuthenticated, registerStep, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[420px]">
        <RegisterForm />
      </div>
    </div>
  );
}
