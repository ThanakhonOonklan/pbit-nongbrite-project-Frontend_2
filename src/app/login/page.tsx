"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();


  useEffect(() => {
    if (isAuthenticated) {
      router.push("/courses");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (username: string, password: string) => {
    clearError();
    try {
      await login({ username, password });

      router.push("/courses");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-start pt-10 sm:pt-0 sm:items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[420px]">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          onClearError={clearError}
        />
      </div>
    </div>
  );
}
