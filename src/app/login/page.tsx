"use client";

import { LoginForm } from "@/components/auth/LoginForm";


export default function LoginPage() {
  
  const handleLogin = (_email: string, _password: string) => {
    // TODO: Implement login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

