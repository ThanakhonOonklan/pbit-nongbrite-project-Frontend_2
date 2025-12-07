"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopThreePodium, MyRankCard, LeaderboardList } from "@/components/rank";
import { mockLeaderboardData } from "@/constants/mocks";

export default function RankPage() {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <div className="grid grid-cols-[1fr_360px] gap-6 h-full">
            <div className="flex flex-col gap-6 overflow-hidden">
              
              <TopThreePodium
                topThree={mockLeaderboardData.topThree}
                className="flex-shrink-0"
              />

              <LeaderboardList
                items={mockLeaderboardData.topTen}
                className="flex-1 min-h-0 -mt-4"
                displayScrollbar={true}
                enableArrowNavigation={true}
              />
            </div>

            <MyRankCard
              myRank={mockLeaderboardData.myRank}
              className="h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
