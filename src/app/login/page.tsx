"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/courses");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (email: string, password: string) => {
    // Clear previous errors before attempting login
    clearError();
    try {
      await login({ email, password });
      // Only redirect if login is successful (no error thrown)
      router.push("/courses");
    } catch (error) {
      // Error is handled in the store, it will be displayed in the form
      console.error("Login failed:", error);
      // Don't redirect on error - let the error display in the form
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
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

