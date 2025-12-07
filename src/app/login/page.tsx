"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = (email: string, password: string) => {
    // TODO: Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C9F3FF] to-[#6FD7FF] p-4 sm:p-8 layout-debug">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

