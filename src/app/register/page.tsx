"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const handleRegister = (_email: string, _password: string, _confirmPassword: string) => {
    // TODO: Add your register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}

