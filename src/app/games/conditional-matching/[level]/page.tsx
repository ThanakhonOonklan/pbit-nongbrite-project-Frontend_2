"use client";

import { use } from "react";
import { GameHeader } from "@/components/games/GameHeader";

export default function ConditionalMatchingGamePage({
    params,
}: {
    params: Promise<{ level: string }>;
}) {
    const { level } = use(params);

    return (
        <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">
            <GameHeader
                level={level}
                gameTitle="Conditional Matching"
                characterSrc="/images/P_Coco/coco-03.svg"
            />
            
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <p className="text-white text-xl">Blank Page - Ready for new implementation</p>
            </div>
        </div>
    );
}
