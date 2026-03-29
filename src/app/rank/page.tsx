"use client";

import * as React from "react";
import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MyRankCard, LeaderboardList } from "@/components/rank";
import { BackgroundSquares } from "@/components/common";
import { useRankStore } from "@/store/rank.store";
import { useUserStore } from "@/store/user.store";
import { MyRankData } from "@/types";
import { FaExclamationTriangle } from "react-icons/fa";
import { Gender } from "@/services/auth.service";

// Helper: Map Gender enum to Thai string
const getGenderThai = (gender: Gender | undefined | string): string => {
  console.log("[getGenderThai] input:", gender, "| type:", typeof gender);
  if (gender === Gender.MALE || gender === "MALE") return "เพศชาย";
  if (gender === Gender.FEMALE || gender === "FEMALE") return "เพศหญิง";
  if (gender === Gender.OTHER || gender === "OTHER") return "ไม่ระบุตัวตน";
  return typeof gender === "string" ? gender : "ไม่ระบุตัวตน";
};

export default function RankPage() {
  const { fetchRanking, topThree, topTen, rankings, isLoading, error } = useRankStore();
  const { user, streakDetails, fetchProfile, fetchAndUpdateStreak } = useUserStore();
  console.log("[RankPage] user from store:", topTen); // เช็คว่า store มีค่าหรือเปล่า


  useEffect(() => {
    const abortController = new AbortController();
    fetchRanking(abortController.signal);
    fetchProfile();
    fetchAndUpdateStreak();
    console.log(myRankData)
    return () => {
      abortController.abort();
    };
  }, [fetchRanking, fetchProfile, fetchAndUpdateStreak]);

  // Construct MyRankData based on the authenticated user and their position in rankings
  const myRankData = React.useMemo<MyRankData | null>(() => {
    if (!user) return null;

    // const rankInList = rankings.find((r) => String(r.userId) === String(user.id));
    const rankInList = rankings.find((r) => r.userId === user.id);

    const totalScore = user.stats?.totalScore ?? 0;
    const daystate = streakDetails?.current ?? user.streaks?.current ?? 0;

    return {
      id: String(user.id), // Ensure id is string to match MyRankData.id interface
      rank: rankInList?.rank || 0, // 0 usually means unranked or fallback
      name: user.name,
      avatar: user.profile?.icon || "/icons/icon-Profile/icon_P_Bit.png",
      score: totalScore,
      gender: getGenderThai(user.gender), // Map Gender enum to Thai string
      daystate: daystate,
    };

  }, [user, rankings]);

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
            {isLoading ? (
              // Loading Skeleton
              <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-16 h-16 border-4 border-[#1cb0f6] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-[#666] font-medium">กำลังโหลดข้อมูลอันดับ...</p>
              </div>
            ) : error ? (
              // Error State
              <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-[16px] shadow-sm p-6 text-center">
                <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">เข้าถึงข้อมูลไม่สำเร็จ</h2>
                <p className="text-gray-500">{error}</p>
                <button
                  onClick={() => fetchRanking()}
                  className="mt-4 px-6 py-2 bg-[#1cb0f6] text-white font-bold rounded-full hover:bg-[#18a0e0] transition-colors"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            ) : (
              // Main Content
              <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px]">
                <aside className="flex flex-col gap-4 md:gap-6 order-1 xl:order-2">
                  <MyRankCard
                    myRank={myRankData}
                    className="xl:h-full"
                  />
                </aside>

                <section className="flex flex-col gap-4 md:gap-6 overflow-visible order-2 xl:order-1">
                  <LeaderboardList
                    items={topTen}
                    topThree={topThree}
                    className="flex-1 min-h-0"
                    displayScrollbar={true}
                  />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
