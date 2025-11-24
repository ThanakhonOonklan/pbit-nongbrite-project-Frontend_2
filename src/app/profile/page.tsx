"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/common/Container";
import { ProfileHeader, ProgressList } from "@/components/profile";
import { mockProgressItems } from "@/constants/mocks";

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <div className="flex flex-col gap-6 h-full">
            <ProfileHeader className="w-full" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProgressList items={mockProgressItems} />
              <Container variant="white" className="p-6 min-h-[200px]">
                <div className="min-h-[160px]" aria-hidden="true" />
              </Container>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


