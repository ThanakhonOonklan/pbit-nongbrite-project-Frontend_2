"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/common/Container";
import { ProfileHeader, ProgressList } from "@/components/profile";
import { Award, Flame, Trophy, Star } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-gradient-to-br from-[#F9FBFF] via-[#F6FAFF] to-[#F4F8FF]">
        <div className="h-full p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] h-full">
          
            <section className="space-y-6">
             
                <ProfileHeader
                  name="Thaanakhon OonkIan"
                  joinedText="วันที่เข้าร่วม February 2023"
                  
                />

              <ProgressList
                items={[
                  { title: "เกมการนำทาง", current: 8, total: 27 },
                  { title: "เกมการจับและจำแนกรุปกรง", current: 6, total: 27 },
                  { title: "เกมจับคู่เชื่อมโยง", current: 18, total: 27 },
                  { title: "เรียงลำดับวงจรชีวิต", current: 26, total: 27 },
                ]}
              />
            </section>

            {/* Right Column */}
            <aside className="space-y-6">
              <Container variant="white" className="p-6">
                <h3 className="text-[18px] font-bold text-[#242E39] mb-4">ความสำเร็จ</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF7CC] border-2 border-[#FFD300]/40 shadow-sm transition-transform duration-150 hover:scale-110">
                    <Trophy className="w-6 h-6 text-[#F6C000]" />
                  </div>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FFEDE5] border-2 border-[#FF7A00]/40 shadow-sm transition-transform duration-150 hover:scale-110">
                    <Flame className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#EAF8FF] border-2 border-[#1CB0F6]/40 shadow-sm transition-transform duration-150 hover:scale-110">
                    <Award className="w-6 h-6 text-[#1CB0F6]" />
                  </div>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF7CC] border-2 border-[#FFD300]/40 shadow-sm transition-transform duration-150 hover:scale-110">
                    <Star className="w-6 h-6 text-[#FFD300]" />
                  </div>
                </div>
              </Container>

              <Container variant="white" className="p-6">
                <h3 className="text-[18px] font-bold text-[#242E39] mb-4">กิจกรรมล่าสุด</h3>
                <ul className="space-y-3 text-[14px] text-[#666]">
                  <li className="flex items-start gap-2">
                    <span className="text-[16px]">✔️</span>
                    <span>ผ่านด่าน &quot;เกมการนำทาง&quot; ระดับ 8/27</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[16px]">⭐</span>
                    <span>ได้รับดาวเพิ่มจาก &quot;เกมจับคู่เชื่อมโยง&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[16px]">🔥</span>
                    <span>เริ่มเล่นใหม่อีกครั้งวันนี้</span>
                  </li>
                </ul>
              </Container>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}


