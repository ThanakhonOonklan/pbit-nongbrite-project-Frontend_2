"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopThreePodium, MyRankCard, LeaderboardList } from "@/components/rank";
import { mockLeaderboardData } from "@/constants/mocks";
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
          <div className="relative z-10 grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px]">
            <section className="flex flex-col gap-4 md:gap-6 overflow-visible xl:overflow-hidden">
              <TopThreePodium
                topThree={mockLeaderboardData.topThree}
                className="flex-shrink-0"
              />
              <LeaderboardList
                items={mockLeaderboardData.topTen}
                className="flex-1 min-h-0 -mt-3 md:-mt-4"
                displayScrollbar={true}
                enableArrowNavigation={true}
              />
            </section>

            <aside className="flex flex-col gap-4 md:gap-6">
              <MyRankCard
                myRank={mockLeaderboardData.myRank}
                className="xl:h-full"
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
