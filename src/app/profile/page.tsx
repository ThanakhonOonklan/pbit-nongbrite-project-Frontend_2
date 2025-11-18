"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileHeader, ProgressList, Achievements, StreakCalendar } from "@/components/profile";
import { mockMyRank, mockStreakDays, mockProgressItems } from "@/constants/mocks";

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-[#E5F2FA]">
        <div className="h-full p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] h-full">
          
            <section className="space-y-2">
             
                <ProfileHeader
                  name="Thaanakhon OonkIan"
                  joinedText="วันที่เข้าร่วม February 2023"
                  rankBadge={mockMyRank.badge}
                  score={mockMyRank.score}
                  streakDays={mockStreakDays}
                />

              <ProgressList items={mockProgressItems} />
            </section>

            {/* Right Column */}
            <aside className="space-y-2">
              <StreakCalendar />

              <Achievements />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}


