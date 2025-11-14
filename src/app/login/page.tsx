"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

