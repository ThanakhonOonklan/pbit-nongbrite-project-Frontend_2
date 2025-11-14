"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const handleRegister = (email: string, password: string, confirmPassword: string) => {
    console.log({ email, password, confirmPassword });
    // Add your register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

