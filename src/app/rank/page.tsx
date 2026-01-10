"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MyRankCard, LeaderboardList } from "@/components/rank";
import { mockLeaderboardData } from "@/constants/mocks";
import { mockMyRankData } from "@/constants/mocks/userData";
import { BackgroundSquares } from "@/components/common";

export default function RankPage() {
  return (
    <div
      className="flex h-screen"
      style={{
        background: "linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 50%, #E8F4F8 100%)",
      }}
    >
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="min-h-full p-4 sm:p-5 md:p-6 pb-[90px] lg:pb-6 relative">
          <BackgroundSquares />
          <div className="relative z-10 max-w-[1300px]">
            <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px]">
              <aside className="flex flex-col gap-4 md:gap-6 order-1 xl:order-2">
                <MyRankCard
                  myRank={mockMyRankData}
                  className="xl:h-full"
                />
              </aside>

              <section className="flex flex-col gap-4 md:gap-6 overflow-visible order-2 xl:order-1">
                <LeaderboardList
                  items={mockLeaderboardData.topTen}
                  topThree={mockLeaderboardData.topThree}
                  className="flex-1 min-h-0"
                  displayScrollbar={true}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
