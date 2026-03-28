export interface SequencingItem {
    id: string;
    content: string;
    isImage: boolean;
    label?: string;   // Thai tooltip label shown on hover
}

export interface SequencingLevelConfig {
    level: number;
    difficulty: "easy" | "normal" | "hard";
    theme: string;
    sequenceTitle: string;
    correctSequence: SequencingItem[];
    timeLimit?: number;
}

export const sequencingLevels: SequencingLevelConfig[] = [
    // ── Level 1 · easy · 4 ขั้นตอน ─────────────────────────────
    {
        level: 1,
        difficulty: "easy",
        theme: "butterfly",
        sequenceTitle: "วงจรชีวิตผีเสื้อ",
        correctSequence: [
            { id: "b1_1", content: "🥚", isImage: false, label: "ไข่" },
            { id: "b1_2", content: "🐛", isImage: false, label: "หนอนผีเสื้อ" },
            { id: "b1_3", content: "🪹", isImage: false, label: "ดักแด้" },
            { id: "b1_4", content: "🦋", isImage: false, label: "ผีเสื้อ" },
        ],
    },
    // ── Level 2 · easy · 4 ขั้นตอน ─────────────────────────────
    {
        level: 2,
        difficulty: "easy",
        theme: "chicken",
        sequenceTitle: "วงจรชีวิตไก่",
        correctSequence: [
            { id: "c2_1", content: "🥚", isImage: false, label: "ไข่" },
            { id: "c2_2", content: "🐣", isImage: false, label: "ฟักไข่" },
            { id: "c2_3", content: "🐥", isImage: false, label: "ลูกไก่" },
            { id: "c2_4", content: "🐓", isImage: false, label: "ไก่โต" },
        ],
    },
    // ── Level 3 · easy · 4 ขั้นตอน ─────────────────────────────
    {
        level: 3,
        difficulty: "easy",
        theme: "tree",
        sequenceTitle: "การเจริญเติบโตของต้นไม้",
        correctSequence: [
            { id: "t3_1", content: "🫘", isImage: false, label: "เมล็ด" },
            { id: "t3_2", content: "🌱", isImage: false, label: "ต้นอ่อน" },
            { id: "t3_3", content: "🌿", isImage: false, label: "ต้นเล็ก" },
            { id: "t3_4", content: "🌳", isImage: false, label: "ต้นใหญ่" },
        ],
    },
    // ── Level 4 · normal · 5 ขั้นตอน ────────────────────────────
    {
        level: 4,
        difficulty: "normal",
        theme: "human",
        sequenceTitle: "การเจริญเติบโตของมนุษย์",
        correctSequence: [
            { id: "h4_1", content: "👶", isImage: false, label: "ทารก" },
            { id: "h4_2", content: "🧒", isImage: false, label: "เด็กเล็ก" },
            { id: "h4_3", content: "🧑", isImage: false, label: "วัยรุ่น" },
            { id: "h4_4", content: "🧔", isImage: false, label: "ผู้ใหญ่" },
            { id: "h4_5", content: "👴", isImage: false, label: "ผู้สูงอายุ" },
        ],
    },
    // ── Level 5 · normal · 5 ขั้นตอน ────────────────────────────
    {
        level: 5,
        difficulty: "normal",
        theme: "apple",
        sequenceTitle: "การเติบโตของต้นแอปเปิ้ล",
        correctSequence: [
            { id: "a5_1", content: "🫘", isImage: false, label: "เมล็ด" },
            { id: "a5_2", content: "🌱", isImage: false, label: "ต้นอ่อน" },
            { id: "a5_3", content: "🌸", isImage: false, label: "ดอกบาน" },
            { id: "a5_4", content: "🍏", isImage: false, label: "ผลอ่อน" },
            { id: "a5_5", content: "🍎", isImage: false, label: "ผลสุก" },
        ],
    },
    // ── Level 6 · normal · 5 ขั้นตอน ────────────────────────────
    {
        level: 6,
        difficulty: "normal",
        theme: "water_cycle",
        sequenceTitle: "วัฏจักรน้ำ",
        correctSequence: [
            { id: "w6_1", content: "☀️", isImage: false, label: "แสงแดด" },
            { id: "w6_2", content: "💧", isImage: false, label: "การระเหย" },
            { id: "w6_3", content: "☁️", isImage: false, label: "เมฆก่อตัว" },
            { id: "w6_4", content: "🌧️", isImage: false, label: "ฝนตก" },
            { id: "w6_5", content: "🌊", isImage: false, label: "น้ำไหลลงทะเล" },
        ],
    },
    // ── Level 7 · hard · 6 ขั้นตอน ──────────────────────────────
    {
        level: 7,
        difficulty: "hard",
        theme: "star",
        sequenceTitle: "วงจรชีวิตของดาวฤกษ์",
        correctSequence: [
            { id: "s7_1", content: "🌫️", isImage: false, label: "กลุ่มแก๊ส (Nebula)" },
            { id: "s7_2", content: "⭐", isImage: false, label: "ดาวเกิดใหม่" },
            { id: "s7_3", content: "🌟", isImage: false, label: "ดาวลุกโชน" },
            { id: "s7_4", content: "🔴", isImage: false, label: "ดาวยักษ์แดง" },
            { id: "s7_5", content: "💥", isImage: false, label: "ซูเปอร์โนวา" },
            { id: "s7_6", content: "⚫", isImage: false, label: "หลุมดำ" },
        ],
    },
    // ── Level 8 · hard · 7 ขั้นตอน ──────────────────────────────
    {
        level: 8,
        difficulty: "hard",
        theme: "bread",
        sequenceTitle: "กระบวนการทำขนมปัง",
        correctSequence: [
            { id: "br8_1", content: "🌾", isImage: false, label: "ข้าวสาลี" },
            { id: "br8_2", content: "🫙", isImage: false, label: "บดเป็นแป้ง" },
            { id: "br8_3", content: "🥣", isImage: false, label: "ผสมส่วนผสม" },
            { id: "br8_4", content: "🤜", isImage: false, label: "นวดแป้ง" },
            { id: "br8_5", content: "⏳", isImage: false, label: "พักให้ขึ้นฟู" },
            { id: "br8_6", content: "🔥", isImage: false, label: "อบในเตา" },
            { id: "br8_7", content: "🍞", isImage: false, label: "ขนมปังสำเร็จ" },
        ],
    },
    // ── Level 9 · hard · 10 ขั้นตอน ─────────────────────────────
    {
        level: 9,
        difficulty: "hard",
        theme: "chocolate",
        sequenceTitle: "กระบวนการผลิตช็อกโกแลต",
        correctSequence: [
            { id: "ch9_1", content: "🌳", isImage: false, label: "ต้นโกโก้" },
            { id: "ch9_2", content: "🌰", isImage: false, label: "ฝักโกโก้" },
            { id: "ch9_3", content: "🫘", isImage: false, label: "เมล็ดโกโก้" },
            { id: "ch9_4", content: "🌞", isImage: false, label: "ตากแดดหมัก" },
            { id: "ch9_5", content: "🔥", isImage: false, label: "คั่วเมล็ด" },
            { id: "ch9_6", content: "⚙️", isImage: false, label: "บดเป็นผง" },
            { id: "ch9_7", content: "🍶", isImage: false, label: "ของเหลวโกโก้" },
            { id: "ch9_8", content: "🍬", isImage: false, label: "ใส่น้ำตาลและนม" },
            { id: "ch9_9", content: "🌡️", isImage: false, label: "ปรับอุณหภูมิ" },
            { id: "ch9_10", content: "🍫", isImage: false, label: "ช็อกโกแลตสำเร็จ" },
        ],
    },
];