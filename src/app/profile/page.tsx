"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileHeader, ProgressList, StreakCalendar, LanguageSelector } from "@/components/profile";
import { mockStreakDays, mockProgressItems } from "@/constants/mocks";

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] h-full">
            <section className="space-y-4">
              <ProfileHeader />
              <ProgressList items={mockProgressItems} />
            </section>

            <aside className="space-y-4">
              <StreakCalendar days={mockStreakDays} />
              <LanguageSelector />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}


