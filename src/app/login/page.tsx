"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = (email: string, password: string) => {
    // TODO: Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#98E8FF] p-8">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

