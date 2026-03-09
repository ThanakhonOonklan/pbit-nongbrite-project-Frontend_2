"use client";

import Image from "next/image";
import type { SceneConfig } from "@/constants/games/conditional-matching-levels";
import {
    Ground,
    Trees,
    Rain,
    Thunder,
    Snow,
    Sun,
    Stars,
    Leaves,
    Birds,
    Fireflies,
    Flowers,
    Bees,
    Embers,
    Rocks,
    Mushrooms,
    Butterflies,
} from "@/components/games/scene-pieces";

interface ScenarioCardProps {
    scene: SceneConfig;
    answerState?: "correct" | "wrong" | null;
    currentQ: number;
    totalQ: number;
    /** seed สำหรับสุ่มตำแหน่งต้นไม้ — ส่ง level * 100 + questionIndex */
    treeSeed?: number;
}

export function ScenarioCard({ scene, answerState, currentQ, totalQ, treeSeed = 0 }: ScenarioCardProps) {
    const ringColor =
        answerState === "correct" ? "#58CC02" :
            answerState === "wrong" ? "#FF4B4B" :
                "transparent";

    return (
        <div
            className="relative w-full flex-1 min-h-0 max-h-[300px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
                boxShadow: answerState ? `0 0 0 4px ${ringColor}` : undefined,
                transition: "box-shadow 0.25s ease",
            }}
        >
            {/* ── Sky ── */}
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, ${scene.skyFrom} 0%, ${scene.skyTo} 100%)` }}
            />

            {/* ── Weather effects ── */}
            {scene.weather === "rain" && <Rain />}
            {scene.weather === "thunder" && <Thunder />}
            {scene.weather === "snow" && <Snow />}
            {scene.weather === "sun" && <Sun />}
            {scene.weather === "stars" && <Stars />}
            {scene.weather === "leaves" && <Leaves />}
            {scene.weather === "birds" && <Birds />}
            {scene.weather === "fireflies" && <Fireflies />}

            {/* ── Trees (behind ground, z-10) ── */}
            {scene.trees && (
                <Trees
                    variant={scene.trees.variant}
                    count={scene.trees.count}
                    side={scene.trees.side}
                    seed={treeSeed}
                />
            )}

            {/* ── Ground (renders on top of tree trunks base = plants them) ── */}
            <Ground variant={scene.ground} />

            {/* ── Props — above ground ── */}
            {scene.props?.includes("flowers") && <Flowers />}
            {scene.props?.includes("bees") && <Bees />}
            {scene.props?.includes("embers") && <Embers />}
            {scene.props?.includes("rocks") && <Rocks seed={treeSeed} />}
            {scene.props?.includes("mushrooms") && <Mushrooms seed={treeSeed} />}
            {scene.props?.includes("butterflies") && <Butterflies />}

            {/* ── Coco character — standing on ground ── */}
            <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 z-20">
                <Image
                    src="/images/P_Coco/coco-03.svg"
                    alt="โคโค่"
                    width={72}
                    height={72}
                    className="object-contain drop-shadow-lg"
                    priority
                />
            </div>

            {/* ── Progress dots ── */}
            {totalQ > 1 && (
                <div className="absolute top-3 left-0 right-0 z-30 flex justify-center items-center gap-1.5">
                    {Array.from({ length: totalQ }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === currentQ ? 18 : 7,
                                height: 7,
                                background:
                                    i < currentQ ? "#58CC02" :
                                        i === currentQ ? "#FFB356" :
                                            "rgba(255,255,255,0.3)",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
