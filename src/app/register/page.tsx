"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, registerStep, resetRegister } = useAuthStore();

  // Redirect when register success (step 3 completed and authenticated)
  useEffect(() => {
    if (isAuthenticated && registerStep === 3) {
      const timer = setTimeout(() => {
        router.push("/courses");
        resetRegister();
      }, 2000); // Show success message for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, registerStep, router, resetRegister]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && registerStep === 1) {
      router.push("/courses");
    }
  }, [isAuthenticated, registerStep, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
