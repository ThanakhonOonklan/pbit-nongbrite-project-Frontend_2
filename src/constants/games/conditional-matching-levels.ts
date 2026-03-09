// Conditional Matching — โคโค่ผจญภัยในป่า
// รูปแบบ: หลายคำถามต่อด่าน — wrongCount สะสมข้ามทุกข้อ

import { type Difficulty } from "@/lib/games/types";
import type { GroundVariant } from "@/components/games/scene-pieces/Ground";
import type { TreeVariant, TreeSide } from "@/components/games/scene-pieces/Trees";

// ── Types ────────────────────────────────────────────────────

export interface CondMatchAnswer {
    id: string;
    emoji: string;
    text: string;
    isCorrect: boolean;
}

/** กำหนดองค์ประกอบฉากของแต่ละคำถาม */
export interface SceneConfig {
    skyFrom: string;
    skyTo: string;
    ground?: GroundVariant;
    trees?: {
        variant?: TreeVariant;
        count?: number;
        side?: TreeSide;
    };
    weather?: "rain" | "thunder" | "snow" | "sun" | "stars" | "leaves" | "birds" | "fireflies";
    props?: Array<"flowers" | "bees" | "embers" | "rocks" | "mushrooms" | "butterflies">;
}

export interface CondMatchQuestion {
    situationText: string;
    questionText: string;
    sceneEmoji: string;
    scene: SceneConfig;
    answers: CondMatchAnswer[];
}

export interface CondMatchLevelConfig {
    level: number;
    difficulty: Difficulty;
    questions: CondMatchQuestion[];
}

// ── Helpers ──────────────────────────────────────────────────

function q(
    situationText: string,
    questionText: string,
    sceneEmoji: string,
    scene: SceneConfig,
    answers: CondMatchAnswer[]
): CondMatchQuestion {
    return { situationText, questionText, sceneEmoji, scene, answers };
}

function ans(id: string, emoji: string, text: string, isCorrect: boolean): CondMatchAnswer {
    return { id, emoji, text, isCorrect };
}

// ── Level Data (9 ด่าน) ──────────────────────────────────────

export const condMatchLevels: Record<number, CondMatchLevelConfig> = {

    // ─── Level 1 — easy, 2 คำถาม ────────────────────────────
    1: {
        level: 1, difficulty: "easy",
        questions: [
            q(
                "โคโค่เดินทางในป่า เจอฝนตกกลางทาง...",
                "ถ้าฝนตก โคโค่ควรทำอะไร?",
                "🌧️",
                { skyFrom: "#1E3A5F", skyTo: "#2C5282", ground: "grass", trees: { variant: "pine", count: 4 }, weather: "rain", props: ["rocks"] },
                [
                    ans("play", "☀️", "ออกไปเล่นต่อ", false),
                    ans("umbrella", "☂️", "หยิบร่มกัน", true),
                    ans("swim", "🏊", "ว่ายน้ำเลย", false),
                ]
            ),
            q(
                "โคโค่เดินมานาน ท้องร้องโกร๊ก...",
                "ถ้าหิวข้าว โคโค่ควรทำอะไร?",
                "😋",
                { skyFrom: "#2B4A1E", skyTo: "#3D6A2A", ground: "dark-grass", trees: { variant: "tropical", count: 4 }, weather: "birds", props: ["mushrooms", "flowers"] },
                [
                    ans("wait", "⏳", "อด รอให้ถึงบ้าน", false),
                    ans("eat", "🍱", "กินอาหารที่เตรียมมา", true),
                    ans("berry", "🍒", "เก็บผลไม้ป่ากิน", false),
                ]
            ),
        ],
    },

    // ─── Level 2 — easy, 2 คำถาม ────────────────────────────
    2: {
        level: 2, difficulty: "easy",
        questions: [
            q(
                "อากาศร้อนมาก โคโค่เหงื่อออกมาก...",
                "ถ้าร้อนมาก โคโค่ควรทำอะไร?",
                "☀️",
                { skyFrom: "#6B3F00", skyTo: "#A5560A", ground: "grass", trees: { variant: "tropical", count: 4 }, weather: "sun", props: ["butterflies", "flowers"] },
                [
                    ans("run", "🏃", "วิ่งให้เร็วขึ้น", false),
                    ans("water", "💧", "ดื่มน้ำและพักร่มเงา", true),
                    ans("fire", "🔥", "ก่อไฟให้อบอุ่น", false),
                ]
            ),
            q(
                "โคโค่หาของบางอย่างไม่เจอ...",
                "ถ้าของหาย โคโค่ควรทำอะไร?",
                "🗺️",
                { skyFrom: "#2D3A1E", skyTo: "#3D5227", ground: "dark-grass", trees: { variant: "pine", count: 2, side: "right" }, weather: "leaves", props: ["rocks", "mushrooms"] },
                [
                    ans("panic", "😱", "วิ่งตามหาไปเรื่อยๆ", false),
                    ans("stop", "🔍", "หยุดหาอย่างใจเย็น", true),
                    ans("ignore", "🙈", "ปล่อยวางไม่สน", false),
                ]
            ),
        ],
    },

    // ─── Level 3 — easy, 2 คำถาม ────────────────────────────
    3: {
        level: 3, difficulty: "easy",
        questions: [
            q(
                "โคโค่เห็นแมลงตัวใหญ่บินมาใกล้...",
                "ถ้าเจอแมลง โคโค่ควรทำอะไร?",
                "🐝",
                { skyFrom: "#3A2E00", skyTo: "#6A5200", ground: "grass", trees: { variant: "tropical", count: 2, side: "left" }, weather: "sun", props: ["bees", "flowers", "butterflies"] },
                [
                    ans("slap", "👋", "ตบไล่มันออกไป", false),
                    ans("still", "🧍", "ยืนนิ่งๆ รอให้บินไป", true),
                    ans("run", "🏃", "วิ่งหนีทันที", false),
                ]
            ),
            q(
                "ฟ้าเริ่มมืด ใกล้ค่ำแล้ว...",
                "ถ้าฟ้ามืดในป่า โคโค่ควรทำอะไร?",
                "🌙",
                { skyFrom: "#0D1B2A", skyTo: "#1B2A4A", ground: "dark-grass", trees: { variant: "dark-pine", count: 4 }, weather: "fireflies", props: ["rocks"] },
                [
                    ans("walk", "🚶", "เดินต่อในที่มืด", false),
                    ans("tent", "⛺", "ตั้งเต็นท์พักแรม", true),
                    ans("sleep", "😴", "นอนกลางดิน", false),
                ]
            ),
        ],
    },

    // ─── Level 4 — normal, 3 คำถาม ──────────────────────────
    4: {
        level: 4, difficulty: "normal",
        questions: [
            q(
                "โคโค่เห็นรังผึ้งใหญ่ข้างทาง...",
                "ถ้าเจอรังผึ้ง โคโค่ควรทำอะไร?",
                "🐝",
                { skyFrom: "#3A2E00", skyTo: "#6A5200", ground: "grass", trees: { variant: "tropical", count: 2, side: "right" }, weather: "sun", props: ["bees", "flowers"] },
                [
                    ans("poke", "👆", "เอาไม้จิ้มดู", false),
                    ans("quiet", "🤫", "เดินเบาๆ ผ่านไป", true),
                    ans("shout", "📢", "ตะโกนไล่ผึ้งออกไป", false),
                ]
            ),
            q(
                "ฟ้าร้องดังมาก มีฝนจะตก...",
                "ถ้าฟ้าร้อง โคโค่ควรทำอะไร?",
                "⛈️",
                { skyFrom: "#1A1A2E", skyTo: "#16213E", ground: "dark-grass", trees: { variant: "pine", count: 4 }, weather: "thunder" },
                [
                    ans("tree", "🌳", "ยืนใต้ต้นไม้ใหญ่", false),
                    ans("low", "🏃", "หาที่กำบังต่ำๆ", true),
                    ans("metal", "🔑", "ถือของโลหะไว้", false),
                ]
            ),
            q(
                "โคโค่เจอทางแยก ไม่รู้จะไปทางไหน...",
                "ถ้าเจอทางแยก โคโค่ควรทำอะไร?",
                "🗺️",
                { skyFrom: "#1B4332", skyTo: "#2D6A4F", ground: "dark-grass", trees: { variant: "tropical", count: 4 }, weather: "leaves" },
                [
                    ans("guess", "🎲", "เดาๆ เลือกทาง", false),
                    ans("map", "🗺️", "ดูแผนที่ก่อน", true),
                    ans("back", "↩️", "เดินย้อนกลับเสมอ", false),
                ]
            ),
        ],
    },

    // ─── Level 5 — normal, 3 คำถาม ──────────────────────────
    5: {
        level: 5, difficulty: "normal",
        questions: [
            q(
                "โคโค่มองหาแผนที่แต่หาไม่เจอ...",
                "ถ้าแผนที่หาย โคโค่ควรทำอะไร?",
                "🗺️",
                { skyFrom: "#2D3A1E", skyTo: "#3D5227", ground: "grass", trees: { variant: "pine", count: 4 } },
                [
                    ans("panic", "😱", "วิ่งหาทางออกเอง", false),
                    ans("stop", "🛑", "หยุด รอความช่วยเหลือ", true),
                    ans("guess", "🎲", "เดาทิศทางไปเรื่อยๆ", false),
                ]
            ),
            q(
                "เพื่อนของโคโค่ล้มลงเจ็บขา...",
                "ถ้าเพื่อนเจ็บ โคโค่ควรทำอะไร?",
                "🩹",
                { skyFrom: "#3B1A1A", skyTo: "#5C2A2A", ground: "charred", trees: { variant: "bare", count: 2, side: "left" }, props: ["embers"] },
                [
                    ans("leave", "🏃", "วิ่งหนีไปก่อน", false),
                    ans("help", "🤝", "หยุดช่วยเหลือทันที", true),
                    ans("cry", "😢", "ร้องไห้ไม่รู้ทำไง", false),
                ]
            ),
            q(
                "โคโค่เหลือน้ำแค่นิดเดียว...",
                "ถ้าน้ำใกล้หมด โคโค่ควรทำอะไร?",
                "💧",
                { skyFrom: "#1A3A5C", skyTo: "#2A5A8C", ground: "dark-grass", trees: { variant: "tropical", count: 4 }, weather: "rain" },
                [
                    ans("drink", "🚰", "ดื่มน้ำจากลำธารเลย", false),
                    ans("save", "💧", "ประหยัดน้ำที่มีอยู่", true),
                    ans("ignore", "🤷", "ไม่สนใจ เดินต่อ", false),
                ]
            ),
        ],
    },

    // ─── Level 6 — normal, 3 คำถาม ──────────────────────────
    6: {
        level: 6, difficulty: "normal",
        questions: [
            q(
                "อากาศร้อนจัด โคโค่เวียนหัว...",
                "ถ้าร้อนจนเวียนหัว โคโค่ควรทำอะไร?",
                "🥵",
                { skyFrom: "#6B3F00", skyTo: "#A5560A", ground: "sand", trees: { variant: "tropical", count: 2, side: "right" }, weather: "sun" },
                [
                    ans("walk", "🚶", "เดินต่อไปเรื่อยๆ", false),
                    ans("shade", "🌳", "นั่งพักในร่มเงา", true),
                    ans("jump", "🏃", "ออกกำลังกายให้คุ้นชิน", false),
                ]
            ),
            q(
                "โคโค่รอเพื่อนนานมากแต่ยังไม่มา...",
                "ถ้ารอนานมาก โคโค่ควรทำอะไร?",
                "⌛",
                { skyFrom: "#2A2A2A", skyTo: "#3D3D3D", ground: "dark-grass", trees: { variant: "bare", count: 2 }, weather: "stars" },
                [
                    ans("leave", "🚪", "ออกไปก่อนเลย", false),
                    ans("wait", "🧘", "อดทนรอต่อไป", true),
                    ans("shout", "📢", "ตะโกนเรียกดังๆ", false),
                ]
            ),
            q(
                "โคโค่เดินป่าตอนกลางคืน กลัวความมืด...",
                "ถ้ากลัวความมืด โคโค่ควรทำอะไร?",
                "🌑",
                { skyFrom: "#0D1B2A", skyTo: "#1B2A4A", ground: "dark-grass", trees: { variant: "dark-pine", count: 4 }, weather: "stars" },
                [
                    ans("close", "🙈", "หลับตาเดินไป", false),
                    ans("light", "🔦", "เปิดไฟฉายส่องทาง", true),
                    ans("run", "🏃", "วิ่งออกจากป่าทันที", false),
                ]
            ),
        ],
    },

    // ─── Level 7 — hard, 3 คำถาม ────────────────────────────
    7: {
        level: 7, difficulty: "hard",
        questions: [
            q(
                "โคโค่เห็นสัตว์ป่าตัวใหญ่จ้องมอง...",
                "ถ้าเจอสัตว์ป่า โคโค่ควรทำอะไร?",
                "🐗",
                { skyFrom: "#1B4332", skyTo: "#2D6A4F", ground: "dark-grass", trees: { variant: "tropical", count: 4 }, weather: "leaves" },
                [
                    ans("shout", "📢", "ส่งเสียงไล่ไปเลย", false),
                    ans("still", "🧍", "ยืนนิ่ง ไม่ส่งเสียง", true),
                    ans("poke", "👋", "โบกมือทำจังหวะ", false),
                ]
            ),
            q(
                "ฝนตกหนักมาก น้ำเริ่มท่วม...",
                "ถ้าฝนถล่มหนัก โคโค่ควรทำอะไร?",
                "⛈️",
                { skyFrom: "#1A1A2E", skyTo: "#16213E", ground: "grass", trees: { variant: "pine", count: 4 }, weather: "thunder" },
                [
                    ans("cross", "🌊", "ข้ามลำธารซึ่งน้ำไหลแรง", false),
                    ans("high", "⛰️", "ขึ้นที่สูง หลบน้ำท่วม", true),
                    ans("wait", "🧍", "ยืนรอในที่ต่ำ", false),
                ]
            ),
            q(
                "โคโค่เห็นน้ำในลำธาร กลิ่นแปลกมาก...",
                "ถ้าน้ำมีกลิ่นแปลก โคโค่ควรทำอะไร?",
                "🚱",
                { skyFrom: "#1E3A2A", skyTo: "#2D5C3D", ground: "dark-grass", trees: { variant: "tropical", count: 2, side: "right" } },
                [
                    ans("drink", "🚰", "ดื่มเพราะหิวมาก", false),
                    ans("no", "🚫", "ไม่ดื่ม หาน้ำที่ปลอดภัย", true),
                    ans("boil", "🔥", "ต้มก่อนดื่ม (แต่ไม่มีหม้อ)", false),
                ]
            ),
        ],
    },

    // ─── Level 8 — hard, 3 คำถาม ────────────────────────────
    8: {
        level: 8, difficulty: "hard",
        questions: [
            q(
                "เพื่อนนอนร้องไห้คนเดียวในป่า...",
                "ถ้าเพื่อนร้องไห้ โคโค่ควรทำอะไร?",
                "😢",
                { skyFrom: "#3B1A1A", skyTo: "#5C2A2A", ground: "charred", trees: { variant: "bare", count: 4 } },
                [
                    ans("ignore", "🙈", "ทำเป็นไม่เห็น", false),
                    ans("comfort", "🤗", "เข้าไปปลอบใจเพื่อน", true),
                    ans("laugh", "😂", "หัวเราะด้วย", false),
                ]
            ),
            q(
                "โคโค่หลงทางในป่าลึก ไม่รู้ทิศทาง...",
                "ถ้าหลงทาง โคโค่ควรทำอะไร?",
                "🌲",
                { skyFrom: "#1B4332", skyTo: "#2D6A4F", ground: "dark-grass", trees: { variant: "tropical", count: 4 }, weather: "leaves" },
                [
                    ans("run", "🏃", "วิ่งไปทุกทิศเพื่อหาทาง", false),
                    ans("stay", "📍", "อยู่กับที่ ร้องขอความช่วยเหลือ", true),
                    ans("climb", "🌳", "ปีนต้นไม้ดูทิศทาง", false),
                ]
            ),
            q(
                "โคโค่เห็นควันไฟลอยมาจากข้างหน้า...",
                "ถ้าเจอควันไฟ โคโค่ควรทำอะไร?",
                "🔥",
                { skyFrom: "#4A1A00", skyTo: "#8B3A00", ground: "charred", trees: { variant: "bare", count: 2, side: "left" }, props: ["embers"] },
                [
                    ans("look", "👀", "เดินเข้าไปดูว่าอะไร", false),
                    ans("exit", "🚨", "ออกจากพื้นที่ทันที", true),
                    ans("water", "💧", "หาน้ำมาดับไฟ", false),
                ]
            ),
        ],
    },

    // ─── Level 9 — hard, 4 คำถาม ────────────────────────────
    9: {
        level: 9, difficulty: "hard",
        questions: [
            q(
                "โคโค่เจอดงหนามขวางทาง...",
                "ถ้าเจอดงหนาม โคโค่ควรทำอะไร?",
                "🌵",
                { skyFrom: "#2D4A1E", skyTo: "#3D6A2A", ground: "grass", trees: { variant: "pine", count: 4 }, weather: "leaves" },
                [
                    ans("push", "💪", "ฝ่าเข้าไปตรงๆ", false),
                    ans("detour", "↪️", "หาทางอ้อมไป", true),
                    ans("burn", "🔥", "เผาหนามออก", false),
                ]
            ),
            q(
                "อากาศหนาวมาก โคโค่ตัวสั่น...",
                "ถ้าอากาศหนาวจัด โคโค่ควรทำอะไร?",
                "🥶",
                { skyFrom: "#0A1628", skyTo: "#0F2248", ground: "snow", trees: { variant: "snow-pine", count: 4 }, weather: "snow" },
                [
                    ans("strip", "👙", "ถอดเสื้อออก", false),
                    ans("warm", "🧥", "สวมเสื้อให้หนาขึ้น", true),
                    ans("water", "🏊", "ว่ายน้ำให้ร่างกายอุ่น", false),
                ]
            ),
            q(
                "ลมพัดแรงมาก โคโค่เกือบล้ม...",
                "ถ้าลมแรงมาก โคโค่ควรทำอะไร?",
                "🌬️",
                { skyFrom: "#1A1A2E", skyTo: "#16213E", ground: "dark-grass", trees: { variant: "pine", count: 4 }, weather: "thunder" },
                [
                    ans("run", "🏃", "วิ่งสวนลม", false),
                    ans("shelter", "🏕️", "หาที่กำบังจากลม", true),
                    ans("kite", "🪁", "ชักว่าว", false),
                ]
            ),
            q(
                "โคโค่ถึงจุดหมายแล้ว แต่เพื่อนยังตามมาไม่ทัน...",
                "ถ้าเพื่อนยังไม่ถึง โคโค่ควรทำอะไร?",
                "🏁",
                { skyFrom: "#1B3A5C", skyTo: "#2A5C8C", ground: "grass", trees: { variant: "pine", count: 2, side: "right" }, weather: "sun" },
                [
                    ans("leave", "🚪", "เข้าไปก่อนเลย", false),
                    ans("wait", "🤝", "รอเพื่อนและเดินทางด้วยกัน", true),
                    ans("shout", "📢", "ตะโกนบอกว่าถึงแล้ว", false),
                ]
            ),
        ],
    },
};
