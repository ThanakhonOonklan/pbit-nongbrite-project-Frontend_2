"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/common";
import { FaArrowLeft, FaRuler } from "react-icons/fa";

export default function StepCountingGamePage({
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
              <FaRuler className="w-6 h-6 text-[#6ED1CF]" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Step Counting
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6ED1CF]/10 mb-4">
                <FaRuler className="w-10 h-10 text-[#6ED1CF]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              กำลังพัฒนา
            </h2>
            <p className="text-gray-600">
              เกม Step Counting - ด่าน {level} กำลังอยู่ในขั้นตอนการพัฒนา
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

