"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileHeader, ProgressList } from "@/components/profile";
import { mockProgressItems, mockMyRank } from "@/constants/mocks";
import { BackgroundSquares } from "@/components/common";

export default function ProfilePage() {
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
              <ProfileHeader myRank={mockMyRank} />
              <ProgressList items={mockProgressItems} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
