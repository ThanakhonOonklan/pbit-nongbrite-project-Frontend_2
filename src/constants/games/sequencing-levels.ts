export interface SequencingItem {
    id: string;
    content: string;
    isImage: boolean;
    label?: string;   // Thai tooltip label shown on hover / below slot
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
    // วงจรชีวิตผีเสื้อ: ไข่ → หนอน → ดักแด้ → ผีเสื้อ
    {
        level: 1,
        difficulty: "easy",
        theme: "butterfly",
        sequenceTitle: "วงจรชีวิตผีเสื้อ",
        correctSequence: [
            { id: "b1_1", content: "/images/sequencing/butterfly/egg.svg", isImage: true, label: "ไข่" },
            { id: "b1_2", content: "/images/sequencing/butterfly/caterpillar.svg", isImage: true, label: "หนอนผีเสื้อ" },
            { id: "b1_3", content: "/images/sequencing/butterfly/chrysalis.svg", isImage: true, label: "ดักแด้" },
            { id: "b1_4", content: "/images/sequencing/butterfly/butterfly.svg", isImage: true, label: "ผีเสื้อ" },
        ],
    },

    // ── Level 2 · easy · 4 ขั้นตอน ─────────────────────────────
    // วงจรชีวิตไก่: ไข่ → ฟักไข่ → ลูกไก่ → ไก่โต
    {
        level: 2,
        difficulty: "easy",
        theme: "chicken",
        sequenceTitle: "วงจรชีวิตไก่",
        correctSequence: [
            { id: "c2_1", content: "/images/sequencing/chicken/egg.svg", isImage: true, label: "ไข่" },
            { id: "c2_2", content: "/images/sequencing/chicken/hatching.svg", isImage: true, label: "ฟักไข่" },
            { id: "c2_3", content: "/images/sequencing/chicken/chick.svg", isImage: true, label: "ลูกไก่" },
            { id: "c2_4", content: "/images/sequencing/chicken/rooster.svg", isImage: true, label: "ไก่โต" },
        ],
    },

    // ── Level 3 · easy · 4 ขั้นตอน ─────────────────────────────
    // การเติบโตของต้นไม้: เมล็ด → ต้นอ่อน → ต้นเล็ก → ต้นใหญ่
    {
        level: 3,
        difficulty: "easy",
        theme: "tree",
        sequenceTitle: "การเติบโตของต้นไม้",
        correctSequence: [
            { id: "t3_1", content: "/images/sequencing/tree/seed.svg", isImage: true, label: "เมล็ด" },
            { id: "t3_2", content: "/images/sequencing/tree/sprout.svg", isImage: true, label: "ต้นอ่อน" },
            { id: "t3_3", content: "/images/sequencing/tree/small-tree.svg", isImage: true, label: "ต้นเล็ก" },
            { id: "t3_4", content: "/images/sequencing/tree/big-tree.svg", isImage: true, label: "ต้นใหญ่" },
        ],
    },

    // ── Level 4 · normal · 5 ขั้นตอน ────────────────────────────
    // วงจรชีวิตปลา: ไข่ปลา → ลูกปลา → ปลาน้อย → ปลากลาง → ปลาโต
    // หมายเหตุ: SVG จะแสดงปลาขนาดเพิ่มขึ้นทีละขั้น พร้อม context (ฟองไข่, ปลาจิ๋ว ฯลฯ)
    {
        level: 4,
        difficulty: "normal",
        theme: "fish",
        sequenceTitle: "วงจรชีวิตปลา",
        correctSequence: [
            { id: "f4_1", content: "/images/sequencing/fish/fish-eggs.svg", isImage: true, label: "ไข่ปลา" },
            { id: "f4_2", content: "/images/sequencing/fish/fish-embryo.svg", isImage: true, label: "ลูกปลาในไข่" },
            { id: "f4_3", content: "/images/sequencing/fish/fish-larva.svg", isImage: true, label: "ตัวอ่อน" },
            { id: "f4_4", content: "/images/sequencing/fish/fish-young.svg", isImage: true, label: "ลูกปลา" },
            { id: "f4_5", content: "/images/sequencing/fish/fish-adult.svg", isImage: true, label: "ปลาโต" },
        ],
    },

    // ── Level 5 · normal · 5 ขั้นตอน ────────────────────────────
    // วงจรชีวิตกบ: ไข่กบ → ลูกอ๊อด → ลูกอ๊อดมีขา → กบน้อย → กบโต
    // แต่ละขั้นหน้าตาต่างกันชัดมาก เหมาะกับ SVG
    {
        level: 5,
        difficulty: "normal",
        theme: "frog",
        sequenceTitle: "วงจรชีวิตกบ",
        correctSequence: [
            { id: "fr5_1", content: "/images/sequencing/frog/frog-eggs.svg", isImage: true, label: "ไข่กบ" },
            { id: "fr5_2", content: "/images/sequencing/frog/tadpole.svg", isImage: true, label: "ลูกอ๊อด" },
            { id: "fr5_3", content: "/images/sequencing/frog/tadpole-legs.svg", isImage: true, label: "ลูกอ๊อดมีขา" },
            { id: "fr5_4", content: "/images/sequencing/frog/froglet.svg", isImage: true, label: "กบน้อย" },
            { id: "fr5_5", content: "/images/sequencing/frog/frog-adult.svg", isImage: true, label: "กบโต" },
        ],
    },

    // ── Level 6 · normal · 5 ขั้นตอน ────────────────────────────
    // ขั้นตอนการล้างมือ: เปิดน้ำ → เปียกมือ → ถูสบู่ → ล้างน้ำออก → เช็ดมือ
    // SVG: ก๊อก / มือใต้น้ำ / มือ+สบู่ / ฟองออก / มือ+ผ้า  ← ต่างกันชัด
    {
        level: 6,
        difficulty: "normal",
        theme: "handwash",
        sequenceTitle: "ขั้นตอนการล้างมือ",
        correctSequence: [
            { id: "hw6_1", content: "/images/sequencing/handwash/wet-hands.svg", isImage: true, label: "ล้างน้ำสะอาด" },
            { id: "hw6_2", content: "/images/sequencing/handwash/soap-lather.svg", isImage: true, label: "ฟอกสบู่" },
            { id: "hw6_3", content: "/images/sequencing/handwash/rinse.svg", isImage: true, label: "ล้างฟองสบู่" },
            { id: "hw6_4", content: "/images/sequencing/handwash/dry-hands.svg", isImage: true, label: "เช็ดมือให้แห้ง" },
            { id: "hw6_5", content: "/images/sequencing/handwash/turn-off.svg", isImage: true, label: "ปิดน้ำ" },
        ],
    },

    // ── Level 7 · hard · 6 ขั้นตอน ──────────────────────────────
    // การกินแตงโม: แตงโมชิ้นเต็ม → กัดคำแรก → กัดหลายคำ → กินครึ่งชิ้น → เหลือแต่เปลือก → ทิ้งถังขยะ
    {
        level: 7,
        difficulty: "hard",
        theme: "watermelon",
        sequenceTitle: "การกินแตงโม",
        correctSequence: [
            { id: "wm7_1", content: "/images/sequencing/watermelon/whole.svg", isImage: true, label: "แตงโมชิ้นเต็ม" },
            { id: "wm7_2", content: "/images/sequencing/watermelon/bite1.svg", isImage: true, label: "กัดคำแรก" },
            { id: "wm7_3", content: "/images/sequencing/watermelon/bite2.svg", isImage: true, label: "กัดหลายคำ" },
            { id: "wm7_4", content: "/images/sequencing/watermelon/half.svg", isImage: true, label: "กินครึ่งชิ้น" },
            { id: "wm7_5", content: "/images/sequencing/watermelon/rind.svg", isImage: true, label: "เหลือแต่เปลือก" },
            { id: "wm7_6", content: "/images/sequencing/watermelon/trash.svg", isImage: true, label: "ทิ้งถังขยะ" },
        ],
    },

    // ── Level 8 · hard · 7 ขั้นตอน ──────────────────────────────
    // ขั้นตอนการทำน้ำผลไม้: เลือก → ล้าง → ปอก → หั่น → ใส่ปั่น → ปั่น → เทใส่แก้ว
    // SVG: ผลไม้ / ผลไม้ใต้น้ำ / มือปอก / หั่น / ปั่น(ปิด) / ปั่น(เปิดใบมีด+ฟอง) / เทลงแก้ว
    {
        level: 8,
        difficulty: "hard",
        theme: "juice",
        sequenceTitle: "ขั้นตอนการทำน้ำส้มปั่น",
        correctSequence: [
            { id: "jc8_1", content: "/images/sequencing/juice/orange-basket.svg", isImage: true, label: "เลือกส้ม" },
            { id: "jc8_2", content: "/images/sequencing/juice/wash-orange.svg", isImage: true, label: "ล้างส้ม" },
            { id: "jc8_3", content: "/images/sequencing/juice/peel-orange.svg", isImage: true, label: "ปอกเปลือก" },
            { id: "jc8_4", content: "/images/sequencing/juice/cut-orange.svg", isImage: true, label: "หั่นส้ม" },
            { id: "jc8_5", content: "/images/sequencing/juice/put-blender.svg", isImage: true, label: "ใส่เครื่องปั่น" },
            { id: "jc8_6", content: "/images/sequencing/juice/blend.svg", isImage: true, label: "ปั่นน้ำส้ม" },
            { id: "jc8_7", content: "/images/sequencing/juice/pour-juice.svg", isImage: true, label: "เทใส่แก้ว" },
        ],
    },

    // ── Level 9 · hard · 7 ขั้นตอน ──────────────────────────────
    // การเป่าลูกโป่ง: แฟบ → เป่าลม 1 → 2 → 3 → โตเต็มที่ → มัดจุก → ลอยผูกเชือก
    {
        level: 9,
        difficulty: "hard",
        theme: "balloon",
        sequenceTitle: "การเป่าลูกโป่ง",
        correctSequence: [
            { id: "bl9_1", content: "/images/sequencing/balloon/flat.svg", isImage: true, label: "ลูกโป่งแฟบ" },
            { id: "bl9_2", content: "/images/sequencing/balloon/blow1.svg", isImage: true, label: "เริ่มเป่าลม" },
            { id: "bl9_3", content: "/images/sequencing/balloon/blow2.svg", isImage: true, label: "พองขึ้นนิดนึง" },
            { id: "bl9_4", content: "/images/sequencing/balloon/blow3.svg", isImage: true, label: "พองครึ่งใบ" },
            { id: "bl9_5", content: "/images/sequencing/balloon/blow4.svg", isImage: true, label: "พองเต็มที่" },
            { id: "bl9_6", content: "/images/sequencing/balloon/tied.svg", isImage: true, label: "มัดจุก" },
            { id: "bl9_7", content: "/images/sequencing/balloon/floating.svg", isImage: true, label: "ผูกเชือกลอยได้" },
        ],
    },

];