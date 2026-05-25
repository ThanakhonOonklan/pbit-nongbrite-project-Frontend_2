"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay, LoadingSpinner } from "@/components/common";
import { useAuthStore } from "@/store/auth.store";

const FullPageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
    <LoadingSpinner size="sm" />
  </div>
);

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  React.useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <>
        <FullPageLoading />
        <LoadingOverlay isLoading message="กำลังโหลด..." />
      </>
    );
  }

  return <>{children}</>;
}
