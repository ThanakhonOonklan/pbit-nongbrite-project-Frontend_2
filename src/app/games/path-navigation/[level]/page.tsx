"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import { PrimaryButton } from "@/components/common";
import { FaArrowLeft, FaRoute } from "react-icons/fa";

export default function PathNavigationGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const router = useRouter();

  return (
    <div className="flex h-screen">
     
      
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Game Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <PrimaryButton
              variant="outline"
              size="sm"
              onClick={() => router.push("/courses")}
              className="flex items-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              กลับ
            </PrimaryButton>
            <div className="flex items-center gap-3">
              <FaRoute className="w-6 h-6 text-[#1CB0F6]" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Path Navigation
                </h1>
                <p className="text-sm text-gray-600">ด่าน {level}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Game Content Area */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          <div className="text-center max-w-2xl">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1CB0F6]/10 mb-4">
                <FaRoute className="w-10 h-10 text-[#1CB0F6]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              อุอิอ๊าาาาาาาาาาาาาาา
            </h2>
            <p className="text-gray-600">
              เกม Path Navigation - ด่าน {level}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

