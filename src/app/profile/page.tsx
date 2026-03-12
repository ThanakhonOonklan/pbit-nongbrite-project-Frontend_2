"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileHeader, ProgressList } from "@/components/profile";
import { BackgroundSquares } from "@/components/common";
import { useChapterStore } from "@/store/chapter.store";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function ProfilePage() {
  const fetchChapters = useChapterStore((state) => state.fetchChapters);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Fetch chapters when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchChapters();
    }
  }, [isAuthenticated, fetchChapters]);

  return (
    <div
      className="flex h-screen"
      style={{
        background:
          "linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 50%, #E8F4F8 100%)",
      }}
    >
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="min-h-full p-4 sm:p-5 md:p-6 pb-[90px] lg:pb-6 relative">
          <BackgroundSquares />
          <div className="relative z-10 max-w-[880px]">
            <section className="space-y-4 ">
              <ProfileHeader />
              <ProgressList />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
