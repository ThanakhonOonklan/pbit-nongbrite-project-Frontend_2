"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common";
import { useAuthStore } from "@/store/auth.store";

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  React.useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace("/courses");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return <>{children}</>;
}

