export interface SequencingItem {
    id: string;
    content: string;
    isImage: boolean;
    label?: string;   // Thai tooltip label shown on hover / below slot
}

export interface SequencingPattern {
    theme: string;
    sequenceTitle: string;
    correctSequence: SequencingItem[];
}

export interface SequencingLevelConfig {
    level: number;
    difficulty: "easy" | "normal" | "hard";
    patterns: SequencingPattern[];
    timeLimit?: number;
}

export const sequencingLevels: SequencingLevelConfig[] = [

    // ── Level 1 · easy · 4 ขั้นตอน ─────────────────────────────
    // วงจรชีวิตผีเสื้อ: ไข่ → หนอน → ดักแด้ → ผีเสื้อ
    // ── Level 1 · easy · 4 ขั้นตอน ─────────────────────────────
    {
        level: 1,
        difficulty: "easy",
        patterns: [
            // Pattern 1: ผีเสื้อ (ของเดิม)
            {
                theme: "butterfly",
                sequenceTitle: "วงจรชีวิตผีเสื้อ",
                correctSequence: [
                    { id: "b1_1", content: "/images/sequencing/butterfly/egg.svg", isImage: true, label: "ไข่" },
                    { id: "b1_2", content: "/images/sequencing/butterfly/caterpillar.svg", isImage: true, label: "หนอนผีเสื้อ" },
                    { id: "b1_3", content: "/images/sequencing/butterfly/chrysalis.svg", isImage: true, label: "ดักแด้" },
                    { id: "b1_4", content: "/images/sequencing/butterfly/butterfly.svg", isImage: true, label: "ผีเสื้อ" },
                ],
            },
            // Pattern 2: ผึ้ง
            {
                theme: "bee",
                sequenceTitle: "วงจรชีวิตผึ้ง",
                correctSequence: [
                    { id: "be1_1", content: "/images/sequencing/bee/egg.svg", isImage: true, label: "ไข่ผึ้ง" },
                    { id: "be1_2", content: "/images/sequencing/bee/larva.svg", isImage: true, label: "ตัวหนอน" },
                    { id: "be1_3", content: "/images/sequencing/bee/pupa.svg", isImage: true, label: "ดักแด้" },
                    { id: "be1_4", content: "/images/sequencing/bee/bee.svg", isImage: true, label: "ผึ้งโตเต็มวัย" },
                ],
            },
            // Pattern 3: ปู
            {
                theme: "crab",
                sequenceTitle: "วงจรชีวิตปู",
                correctSequence: [
                    { id: "cr1_1", content: "/images/sequencing/crab/egg.svg", isImage: true, label: "ไข่ปู" },
                    { id: "cr1_2", content: "/images/sequencing/crab/zoea.svg", isImage: true, label: "ตัวอ่อน Zoea" },
                    { id: "cr1_3", content: "/images/sequencing/crab/megalopa.svg", isImage: true, label: "ตัวอ่อน Megalopa" },
                    { id: "cr1_4", content: "/images/sequencing/crab/crab.svg", isImage: true, label: "ปูโตเต็มวัย" },
                ],
            },
            // Pattern 4: เต่า
            {
                theme: "turtle",
                sequenceTitle: "วงจรชีวิตเต่า",
                correctSequence: [
                    { id: "tu1_1", content: "/images/sequencing/turtle/egg.svg", isImage: true, label: "ไข่เต่า" },
                    { id: "tu1_2", content: "/images/sequencing/turtle/hatchling.svg", isImage: true, label: "ลูกเต่า" },
                    { id: "tu1_3", content: "/images/sequencing/turtle/juvenile.svg", isImage: true, label: "เต่าวัยรุ่น" },
                    { id: "tu1_4", content: "/images/sequencing/turtle/turtle.svg", isImage: true, label: "เต่าโตเต็มวัย" },
                ],
            }
        ],
    },


    // ── Level 2 · easy · 4 ขั้นตอน ─────────────────────────────
    // วงจรชีวิตไก่: ไข่ → ฟักไข่ → ลูกไก่ → ไก่โต
    // ── Level 2 · easy · 4 ขั้นตอน ─────────────────────────────
    {
        level: 2,
        difficulty: "easy",
        patterns: [
            // Pattern 1: ไก่ (จากของเดิม)
            {
                theme: "chicken",
                sequenceTitle: "วงจรชีวิตไก่",
                correctSequence: [
                    { id: "c2_1", content: "/images/sequencing/chicken/egg.svg", isImage: true, label: "ไข่" },
                    { id: "c2_2", content: "/images/sequencing/chicken/hatching.svg", isImage: true, label: "ฟักไข่" },
                    { id: "c2_3", content: "/images/sequencing/chicken/chick.svg", isImage: true, label: "ลูกไก่" },
                    { id: "c2_4", content: "/images/sequencing/chicken/rooster.svg", isImage: true, label: "ไก่โต" },
                ],
            },
            // Pattern 2: งู
            {
                theme: "snake",
                sequenceTitle: "วงจรชีวิตงู",
                correctSequence: [
                    { id: "sn2_1", content: "/images/sequencing/snake/egg.svg", isImage: true, label: "ไข่งู" },
                    { id: "sn2_2", content: "/images/sequencing/snake/hatchling.svg", isImage: true, label: "ลูกงู" },
                    { id: "sn2_3", content: "/images/sequencing/snake/juvenile.svg", isImage: true, label: "งูวัยรุ่น" },
                    { id: "sn2_4", content: "/images/sequencing/snake/snake.svg", isImage: true, label: "งูโตเต็มวัย" },
                ]
            },
            // Pattern 3: เต่าทอง
            {
                theme: "ladybug",
                sequenceTitle: "วงจรชีวิตเต่าทอง",
                correctSequence: [
                    { id: "lb2_1", content: "/images/sequencing/ladybug/egg.svg", isImage: true, label: "ไข่เต่าทอง" },
                    { id: "lb2_2", content: "/images/sequencing/ladybug/larva.svg", isImage: true, label: "ตัวอ่อนเต่าทอง" },
                    { id: "lb2_3", content: "/images/sequencing/ladybug/pupa.svg", isImage: true, label: "ดักแด้" },
                    { id: "lb2_4", content: "/images/sequencing/ladybug/ladybug.svg", isImage: true, label: "เต่าทอง" },
                ]
            },
            // Pattern 4: ด้วง
            {
                theme: "beetle",
                sequenceTitle: "วงจรชีวิตด้วง",
                correctSequence: [
                    { id: "bt2_1", content: "/images/sequencing/beetle/egg.svg", isImage: true, label: "ไข่ด้วง" },
                    { id: "bt2_2", content: "/images/sequencing/beetle/larva.svg", isImage: true, label: "ตัวหนอน" },
                    { id: "bt2_3", content: "/images/sequencing/beetle/pupa.svg", isImage: true, label: "ดักแด้" },
                    { id: "bt2_4", content: "/images/sequencing/beetle/beetle.svg", isImage: true, label: "ด้วงกว่าง" },
                ]
            }
        ]
    },


    // ── Level 3 · easy · 4 ขั้นตอน ─────────────────────────────
    // การเติบโตของต้นไม้: เมล็ด → ต้นอ่อน → ต้นเล็ก → ต้นใหญ่
    {
        level: 3,
        difficulty: "easy",
        patterns: [
            // Pattern 1: ต้นไม้ (ของเดิม)
            {
                theme: "tree",
                sequenceTitle: "การเติบโตของต้นไม้",
                correctSequence: [
                    { id: "t3_1", content: "/images/sequencing/tree/seed.svg", isImage: true, label: "เมล็ด" },
                    { id: "t3_2", content: "/images/sequencing/tree/sprout.svg", isImage: true, label: "ต้นอ่อน" },
                    { id: "t3_3", content: "/images/sequencing/tree/small-tree.svg", isImage: true, label: "ต้นเล็ก" },
                    { id: "t3_4", content: "/images/sequencing/tree/big-tree.svg", isImage: true, label: "ต้นใหญ่" },
                ],
            },
            // Pattern 2: เห็ด
            {
                theme: "mushroom",
                sequenceTitle: "การเติบโตของเห็ด",
                correctSequence: [
                    { id: "ms3_1", content: "/images/sequencing/mushroom/spores.svg", isImage: true, label: "สปอร์" },
                    { id: "ms3_2", content: "/images/sequencing/mushroom/mycelium.svg", isImage: true, label: "งอกเป็นเส้นใย" },
                    { id: "ms3_3", content: "/images/sequencing/mushroom/pinhead.svg", isImage: true, label: "ดอกเห็ดเล็ก" },
                    { id: "ms3_4", content: "/images/sequencing/mushroom/mushroom.svg", isImage: true, label: "เห็ดโต" },
                ],
            },
            // Pattern 3: สตรอว์เบอร์รี
            {
                theme: "strawberry",
                sequenceTitle: "การเติบโตของสตรอว์เบอร์รี",
                correctSequence: [
                    { id: "sb3_1", content: "/images/sequencing/strawberry/seed.svg", isImage: true, label: "เมล็ด" },
                    { id: "sb3_2", content: "/images/sequencing/strawberry/sprout.svg", isImage: true, label: "งอก" },
                    { id: "sb3_3", content: "/images/sequencing/strawberry/flower.svg", isImage: true, label: "ออกดอก" },
                    { id: "sb3_4", content: "/images/sequencing/strawberry/fruit.svg", isImage: true, label: "ออกผล" },
                ],
            },
            // Pattern 4: กระบองเพชร
            {
                theme: "cactus",
                sequenceTitle: "การเติบโตของกระบองเพชร",
                correctSequence: [
                    { id: "ct3_1", content: "/images/sequencing/cactus/seed.svg", isImage: true, label: "เมล็ด" },
                    { id: "ct3_2", content: "/images/sequencing/cactus/sprout.svg", isImage: true, label: "งอก" },
                    { id: "ct3_3", content: "/images/sequencing/cactus/small-cactus.svg", isImage: true, label: "ต้นเล็ก" },
                    { id: "ct3_4", content: "/images/sequencing/cactus/large-cactus.svg", isImage: true, label: "ต้นใหญ่/มีดอก" },
                ],
            }
        ]
    },

    // ── Level 4 · normal · 5 ขั้นตอน ────────────────────────────
    // วงจรชีวิตปลา: ไข่ปลา → ลูกปลา → ปลาน้อย → ปลากลาง → ปลาโต
    // หมายเหตุ: SVG จะแสดงปลาขนาดเพิ่มขึ้นทีละขั้น พร้อม context (ฟองไข่, ปลาจิ๋ว ฯลฯ)
    {
        level: 4,
        difficulty: "normal",
        patterns: [
            // Pattern 1: ปลา (ของเดิม)
            {
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
            // Pattern 2: ปลาหมึก
            {
                theme: "octopus",
                sequenceTitle: "วงจรชีวิตปลาหมึก",
                correctSequence: [
                    { id: "oc4_1", content: "/images/sequencing/octopus/egg.svg", isImage: true, label: "ไข่" },
                    { id: "oc4_2", content: "/images/sequencing/octopus/larva.svg", isImage: true, label: "ตัวอ่อน" },
                    { id: "oc4_3", content: "/images/sequencing/octopus/small-octopus.svg", isImage: true, label: "หมึกเล็ก" },
                    { id: "oc4_4", content: "/images/sequencing/octopus/juvenile.svg", isImage: true, label: "หมึกวัยรุ่น" },
                    { id: "oc4_5", content: "/images/sequencing/octopus/octopus.svg", isImage: true, label: "หมึกโต" },
                ],
            },
            // Pattern 3: หอยสองฝา
            {
                theme: "clam",
                sequenceTitle: "วงจรชีวิตหอย",
                correctSequence: [
                    { id: "cl4_1", content: "/images/sequencing/clam/egg.svg", isImage: true, label: "ไข่" },
                    { id: "cl4_2", content: "/images/sequencing/clam/larva.svg", isImage: true, label: "ตัวอ่อนลอยน้ำ" },
                    { id: "cl4_3", content: "/images/sequencing/clam/spat.svg", isImage: true, label: "เกาะพื้น" },
                    { id: "cl4_4", content: "/images/sequencing/clam/small-clam.svg", isImage: true, label: "เปลือกเล็ก" },
                    { id: "cl4_5", content: "/images/sequencing/clam/clam.svg", isImage: true, label: "เปลือกใหญ่" },
                ],
            },
            // Pattern 4: กุ้ง
            {
                theme: "shrimp",
                sequenceTitle: "วงจรชีวิตกุ้ง",
                correctSequence: [
                    { id: "sr4_1", content: "/images/sequencing/shrimp/egg.svg", isImage: true, label: "ไข่" },
                    { id: "sr4_2", content: "/images/sequencing/shrimp/larva.svg", isImage: true, label: "ตัวอ่อน" },
                    { id: "sr4_3", content: "/images/sequencing/shrimp/small-shrimp.svg", isImage: true, label: "กุ้งเล็ก" },
                    { id: "sr4_4", content: "/images/sequencing/shrimp/juvenile.svg", isImage: true, label: "กุ้งวัยรุ่น" },
                    { id: "sr4_5", content: "/images/sequencing/shrimp/shrimp.svg", isImage: true, label: "กุ้งโต" },
                ],
            }
        ]
    },

    // ── Level 5 · normal · 5 ขั้นตอน ────────────────────────────
    // วงจรชีวิตกบ: ไข่กบ → ลูกอ๊อด → ลูกอ๊อดมีขา → กบน้อย → กบโต
    // แต่ละขั้นหน้าตาต่างกันชัดมาก เหมาะกับ SVG
    {
        level: 5,
        difficulty: "normal",
        patterns: [
            {
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
            {
                theme: "Dragonfly",
                sequenceTitle: "วงจรชีวิตแมงปอ",
                correctSequence: [
                    { id: "df5_1", content: "/images/sequencing/dragonfly/egg.svg", isImage: true, label: "ไข่แมงปอ" },
                    { id: "df5_2", content: "/images/sequencing/dragonfly/naiad.svg", isImage: true, label: "ตัวอ่อนในน้ำ" },
                    { id: "df5_3", content: "/images/sequencing/dragonfly/climbing.svg", isImage: true, label: "ตัวอ่อนบนต้นไม้" },
                    { id: "df5_4", content: "/images/sequencing/dragonfly/molting.svg", isImage: true, label: "ลอกคราบ" },
                    { id: "df5_5", content: "/images/sequencing/dragonfly/dragonfly.svg", isImage: true, label: "แมงปอบิน" },
                ]
            },
            {
                theme: "ant",
                sequenceTitle: "วงจรชีวิตมด",
                correctSequence: [
                    { id: "ant5_1", content: "/images/sequencing/ant/egg.svg", isImage: true, label: "ไข่" },
                    { id: "ant5_2", content: "/images/sequencing/ant/larva.svg", isImage: true, label: "ตัวอ่อน" },
                    { id: "ant5_3", content: "/images/sequencing/ant/pupa.svg", isImage: true, label: "ดักแด้" },
                    { id: "ant5_4", content: "/images/sequencing/ant/worker.svg", isImage: true, label: "มดงาน" },
                    { id: "ant5_5", content: "/images/sequencing/ant/alate.svg", isImage: true, label: "มดทีปีก" },
                ]
            },
            {
                theme: "salamander",
                sequenceTitle: "วงจรชีวิตซาลาแมนเดอร์",
                correctSequence: [
                    { id: "sa5_1", content: "/images/sequencing/salamander/egg.svg", isImage: true, label: "ไข่" },
                    { id: "sa5_2", content: "/images/sequencing/salamander/gilled-larva.svg", isImage: true, label: "ตัวอ่อนมีเหงือกภายนอก" },
                    { id: "sa5_3", content: "/images/sequencing/salamander/large-larva.svg", isImage: true, label: "ตัวอ่อนโต" },
                    { id: "sa5_4", content: "/images/sequencing/salamander/morphing.svg", isImage: true, label: "เริ่มขึ้นบก/เหงือกลด" },
                    { id: "sa5_5", content: "/images/sequencing/salamander/salamander.svg", isImage: true, label: "ตัวเต็มวัย" },
                ]
            },

        ]
    },

    // ── Level 6 · normal · 5 ขั้นตอน ────────────────────────────
    // ขั้นตอนการล้างมือ: เปิดน้ำ → เปียกมือ → ถูสบู่ → ล้างน้ำออก → เช็ดมือ
    // SVG: ก๊อก / มือใต้น้ำ / มือ+สบู่ / ฟองออก / มือ+ผ้า  ← ต่างกันชัด
    {
        level: 6,
        difficulty: "normal",
        patterns: [
            // Pattern 1: ล้างมือ (ของเดิม)
            {
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
            // Pattern 2: ต้มบะหมี่
            {
                theme: "noodles",
                sequenceTitle: "ขั้นตอนการต้มบะหมี่",
                correctSequence: [
                    { id: "nd6_1", content: "/images/sequencing/noodles/boil-water.svg", isImage: true, label: "ต้มน้ำ" },
                    { id: "nd6_2", content: "/images/sequencing/noodles/add-noodles.svg", isImage: true, label: "ใส่เส้น" },
                    { id: "nd6_3", content: "/images/sequencing/noodles/cook.svg", isImage: true, label: "รอให้สุก" },
                    { id: "nd6_4", content: "/images/sequencing/noodles/add-seasoning.svg", isImage: true, label: "ใส่เครื่องปรุง" },
                    { id: "nd6_5", content: "/images/sequencing/noodles/serve.svg", isImage: true, label: "ตักใส่ชาม" },
                ],
            },
            // Pattern 3: ทำไข่ดาว
            {
                theme: "fried-egg",
                sequenceTitle: "ขั้นตอนการทำไข่ดาว",
                correctSequence: [
                    { id: "fe6_1", content: "/images/sequencing/fried-egg/heat-pan.svg", isImage: true, label: "ตั้งกระทะ" },
                    { id: "fe6_2", content: "/images/sequencing/fried-egg/add-oil.svg", isImage: true, label: "ใสน้ำมัน" },
                    { id: "fe6_3", content: "/images/sequencing/fried-egg/crack-egg.svg", isImage: true, label: "ตอกไข่" },
                    { id: "fe6_4", content: "/images/sequencing/fried-egg/fry-egg.svg", isImage: true, label: "ทอด" },
                    { id: "fe6_5", content: "/images/sequencing/fried-egg/serve-egg.svg", isImage: true, label: "ตักขึ้น" },
                ],
            },
            // Pattern 4: ชงชา
            {
                theme: "tea",
                sequenceTitle: "ขั้นตอนการชงชา",
                correctSequence: [
                    { id: "te6_1", content: "/images/sequencing/tea/boil-water-kettle.svg", isImage: true, label: "ต้มน้ำ" },
                    { id: "te6_2", content: "/images/sequencing/tea/add-tea.svg", isImage: true, label: "ใส่ใบชา/ถุงชา" },
                    { id: "te6_3", content: "/images/sequencing/tea/pour-water.svg", isImage: true, label: "เทน้ำร้อน" },
                    { id: "te6_4", content: "/images/sequencing/tea/steep-tea.svg", isImage: true, label: "รอ" },
                    { id: "te6_5", content: "/images/sequencing/tea/drink-tea.svg", isImage: true, label: "ดื่ม" },
                ],
            }
        ]
    },

    // ── Level 7 · hard · 6 ขั้นตอน ──────────────────────────────
    // การกินแตงโม: แตงโมชิ้นเต็ม → กัดคำแรก → กัดหลายคำ → กินครึ่งชิ้น → เหลือแต่เปลือก → ทิ้งถังขยะ
    {
        level: 7,
        difficulty: "hard",
        patterns: [
            // Pattern 1: การกินแตงโม (ของเดิม)
            {
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
            // Pattern 3: การคาดเข็มขัดนิรภัย
            {
                theme: "seatbelt",
                sequenceTitle: "การคาดเข็มขัดนิรภัย",
                correctSequence: [
                    { id: "sb7_1", content: "/images/sequencing/get-in-car/open-door.svg", isImage: true, label: "เปิดประตู" },
                    { id: "sb7_2", content: "/images/sequencing/get-in-car/get-in.svg", isImage: true, label: "ขึ้นรถ" },
                    { id: "sb7_3", content: "/images/sequencing/get-in-car/sit.svg", isImage: true, label: "นั่ง" },
                    { id: "sb7_4", content: "/images/sequencing/get-in-car/seatbelt.svg", isImage: true, label: "ล็อกเข็มขัด" },
                    { id: "sb7_5", content: "/images/sequencing/get-in-car/drive-off.svg", isImage: true, label: "ขับรถออก" },
                    { id: "sb7_6", content: "/images/sequencing/get-in-car/arrive.svg", isImage: true, label: "ถึงที่หมายอย่างปลอดภัย" },
                ],
            },
            // Pattern 5: ปลูกต้นไม้
            {
                theme: "plant-tree",
                sequenceTitle: "ขั้นตอนการปลูกต้นไม้",
                correctSequence: [
                    { id: "pt7_1", content: "/images/sequencing/plant-tree/plant.svg", isImage: true, label: "ปลูก" },
                    { id: "pt7_2", content: "/images/sequencing/plant-tree/water.svg", isImage: true, label: "รดน้ำ" },
                    { id: "pt7_3", content: "/images/sequencing/plant-tree/grow-1.svg", isImage: true, label: "โต" },
                    { id: "pt7_4", content: "/images/sequencing/plant-tree/grow-2.svg", isImage: true, label: "โตต่อ" },
                    { id: "pt7_5", content: "/images/sequencing/plant-tree/leaves.svg", isImage: true, label: "ออกใบ" },
                    { id: "pt7_6", content: "/images/sequencing/plant-tree/beautiful.svg", isImage: true, label: "สวยงาม" },
                ],
            },
            // Pattern 6: ขึ้นรถ
            {
                theme: "get-in-car",
                sequenceTitle: "การขึ้นรถอย่างปลอดภัย",
                correctSequence: [
                    { id: "gc7_1", content: "/images/sequencing/get-in-car/open-door.svg", isImage: true, label: "เปิดประตู" },
                    { id: "gc7_2", content: "/images/sequencing/get-in-car/get-in.svg", isImage: true, label: "ขึ้นรถ" },
                    { id: "gc7_3", content: "/images/sequencing/get-in-car/sit.svg", isImage: true, label: "นั่ง" },
                    { id: "gc7_4", content: "/images/sequencing/get-in-car/seatbelt.svg", isImage: true, label: "คาดเข็มขัด" },
                    { id: "gc7_5", content: "/images/sequencing/get-in-car/drive-off.svg", isImage: true, label: "รถออก" },
                    { id: "gc7_6", content: "/images/sequencing/get-in-car/arrive.svg", isImage: true, label: "ถึงที่" },
                ],
            },
            // Pattern 7: ซักผ้า
            {
                theme: "laundry",
                sequenceTitle: "ขั้นตอนการซักผ้า",
                correctSequence: [
                    { id: "ld7_1", content: "/images/sequencing/laundry/dirty-shirt.svg", isImage: true, label: "เสื้อสกปรก" },
                    { id: "ld7_2", content: "/images/sequencing/laundry/put-in-machine.svg", isImage: true, label: "ใส่เครื่อง" },
                    { id: "ld7_3", content: "/images/sequencing/laundry/wash.svg", isImage: true, label: "ซัก" },
                    { id: "ld7_4", content: "/images/sequencing/laundry/spin.svg", isImage: true, label: "ปั่น" },
                    { id: "ld7_5", content: "/images/sequencing/laundry/hang-dry.svg", isImage: true, label: "ตาก" },
                    { id: "ld7_6", content: "/images/sequencing/laundry/dry.svg", isImage: true, label: "แห้ง" },
                ],
            }
        ]
    },

    // ── Level 8 · hard · 7 ขั้นตอน ──────────────────────────────
    // ขั้นตอนการทำน้ำผลไม้: เลือก → ล้าง → ปอก → หั่น → ใส่ปั่น → ปั่น → เทใส่แก้ว
    // SVG: ผลไม้ / ผลไม้ใต้น้ำ / มือปอก / หั่น / ปั่น(ปิด) / ปั่น(เปิดใบมีด+ฟอง) / เทลงแก้ว
    {
        level: 8,
        difficulty: "hard",
        patterns: [
            // Pattern 1: ทำน้ำผลไม้ (ของเดิม)
            {
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
            // Pattern 2: วงจรน้ำ
            {
                theme: "water-cycle",
                sequenceTitle: "วงจรน้ำ",
                correctSequence: [
                    { id: "wc8_1", content: "/images/sequencing/water-cycle/water.svg", isImage: true, label: "น้ำ" },
                    { id: "wc8_2", content: "/images/sequencing/water-cycle/evaporate.svg", isImage: true, label: "ระเหย" },
                    { id: "wc8_3", content: "/images/sequencing/water-cycle/vapor.svg", isImage: true, label: "ไอน้ำ" },
                    { id: "wc8_4", content: "/images/sequencing/water-cycle/condense.svg", isImage: true, label: "รวมตัว" },
                    { id: "wc8_5", content: "/images/sequencing/water-cycle/cloud.svg", isImage: true, label: "เมฆ" },
                    { id: "wc8_6", content: "/images/sequencing/water-cycle/rain.svg", isImage: true, label: "ฝนตก" },
                    { id: "wc8_7", content: "/images/sequencing/water-cycle/water-again.svg", isImage: true, label: "น้ำอีกครั้ง" },
                ],
            },
            // Pattern 3: รุ้ง
            {
                theme: "rainbow",
                sequenceTitle: "การเกิดรุ้ง",
                correctSequence: [
                    { id: "rb8_1", content: "/images/sequencing/rainbow/sun.svg", isImage: true, label: "แดด" },
                    { id: "rb8_2", content: "/images/sequencing/rainbow/rain.svg", isImage: true, label: "ฝน" },
                    { id: "rb8_3", content: "/images/sequencing/rainbow/light-thru-water.svg", isImage: true, label: "แสงผ่านน้ำ" },
                    { id: "rb8_4", content: "/images/sequencing/rainbow/refract.svg", isImage: true, label: "หักเห" },
                    { id: "rb8_5", content: "/images/sequencing/rainbow/split-colors.svg", isImage: true, label: "แยกสี" },
                    { id: "rb8_6", content: "/images/sequencing/rainbow/see-rainbow.svg", isImage: true, label: "เห็นรุ้ง" },
                    { id: "rb8_7", content: "/images/sequencing/rainbow/fade.svg", isImage: true, label: "หาย" },
                ],
            },
            // Pattern 4: ไอน้ำกลายเป็นหมอก
            {
                theme: "fog-formation",
                sequenceTitle: "ไอน้ำกลายเป็นหมอก",
                correctSequence: [
                    { id: "ff8_1", content: "/images/sequencing/fog-formation/vapor-rise.svg", isImage: true, label: "ไอ" },
                    { id: "ff8_2", content: "/images/sequencing/fog-formation/float.svg", isImage: true, label: "ลอย" },
                    { id: "ff8_3", content: "/images/sequencing/fog-formation/cool.svg", isImage: true, label: "เย็น" },
                    { id: "ff8_4", content: "/images/sequencing/fog-formation/gather.svg", isImage: true, label: "รวมตัว" },
                    { id: "ff8_5", content: "/images/sequencing/fog-formation/fog.svg", isImage: true, label: "หมอก" },
                    { id: "ff8_6", content: "/images/sequencing/fog-formation/thick-fog.svg", isImage: true, label: "หนา" },
                    { id: "ff8_7", content: "/images/sequencing/fog-formation/fade-fog.svg", isImage: true, label: "จาง" },
                ],
            },
        ]
    },

    // ── Level 9 · hard · 7 ขั้นตอน ──────────────────────────────
    // การเป่าลูกโป่ง: แฟบ → เป่าลม 1 → 2 → 3 → โตเต็มที่ → มัดจุก → ลอยผูกเชือก
    {
        level: 9,
        difficulty: "hard",
        patterns: [
            // Pattern 2: พืชขาดน้ำ
            {
                theme: "plant-dehydration",
                sequenceTitle: "พืชขาดน้ำ",
                correctSequence: [
                    { id: "pd9_1", content: "/images/sequencing/plant-dehydration/fresh.svg", isImage: true, label: "สด" },
                    { id: "pd9_2", content: "/images/sequencing/plant-dehydration/needs-water.svg", isImage: true, label: "ขาดน้ำ" },
                    { id: "pd9_3", content: "/images/sequencing/plant-dehydration/drooping.svg", isImage: true, label: "ใบตก" },
                    { id: "pd9_4", content: "/images/sequencing/plant-dehydration/wilted.svg", isImage: true, label: "เหี่ยว" },
                    { id: "pd9_5", content: "/images/sequencing/plant-dehydration/dry.svg", isImage: true, label: "แห้ง" },
                    { id: "pd9_6", content: "/images/sequencing/plant-dehydration/yellow.svg", isImage: true, label: "เหลือง" },
                    { id: "pd9_7", content: "/images/sequencing/plant-dehydration/dead.svg", isImage: true, label: "ตาย" },
                ],
            },
            // Pattern 3: ใบไม้เปลี่ยนสี
            {
                theme: "leaves-changing",
                sequenceTitle: "ใบไม้เปลี่ยนสี",
                correctSequence: [
                    { id: "lc9_1", content: "/images/sequencing/leaves-changing/green.svg", isImage: true, label: "เขียว" },
                    { id: "lc9_2", content: "/images/sequencing/leaves-changing/light-green.svg", isImage: true, label: "เขียวอ่อน" },
                    { id: "lc9_3", content: "/images/sequencing/leaves-changing/yellow.svg", isImage: true, label: "เหลือง" },
                    { id: "lc9_4", content: "/images/sequencing/leaves-changing/dark-yellow.svg", isImage: true, label: "เหลืองเข้ม" },
                    { id: "lc9_5", content: "/images/sequencing/leaves-changing/dry-brown.svg", isImage: true, label: "แห้ง" },
                    { id: "lc9_6", content: "/images/sequencing/leaves-changing/brown.svg", isImage: true, label: "น้ำตาล" },
                    { id: "lc9_7", content: "/images/sequencing/leaves-changing/fallen.svg", isImage: true, label: "ร่วง" },
                ],
            },
            // Pattern 4: วัฏจักรแอปเปิล (เปลี่ยนจากทำอาหารเพื่อให้มีลำดับชัดเจน 100%)
            {
                theme: "apple-cycle",
                sequenceTitle: "การเจริญเติบโตของแอปเปิล",
                correctSequence: [
                    { id: "ap9_1", content: "/images/sequencing/apple-cycle/seed.svg", isImage: true, label: "เมล็ดแอปเปิล" },
                    { id: "ap9_2", content: "/images/sequencing/apple-cycle/sprout.svg", isImage: true, label: "ต้นอ่อนงอก" },
                    { id: "ap9_3", content: "/images/sequencing/apple-cycle/tree.svg", isImage: true, label: "ต้นไม้โต" },
                    { id: "ap9_4", content: "/images/sequencing/apple-cycle/flowers.svg", isImage: true, label: "ออกดอก" },
                    { id: "ap9_5", content: "/images/sequencing/apple-cycle/green-apples.svg", isImage: true, label: "ผลสีเขียว" },
                    { id: "ap9_6", content: "/images/sequencing/apple-cycle/red-apples.svg", isImage: true, label: "ผลสุกสีแดง" },
                    { id: "ap9_7", content: "/images/sequencing/apple-cycle/eaten-apple.svg", isImage: true, label: "กินแอปเปิล" },
                ],
            },
            // Pattern 5: ฟันผุ
            {
                theme: "tooth-decay",
                sequenceTitle: "กระบวนการฟันผุ",
                correctSequence: [
                    { id: "td9_1", content: "/images/sequencing/tooth-decay/clean-tooth.svg", isImage: true, label: "ฟันสะอาด" },
                    { id: "td9_2", content: "/images/sequencing/tooth-decay/eat-sweets.svg", isImage: true, label: "กินหวาน" },
                    { id: "td9_3", content: "/images/sequencing/tooth-decay/plaque.svg", isImage: true, label: "คราบติด" },
                    { id: "td9_4", content: "/images/sequencing/tooth-decay/accumulate.svg", isImage: true, label: "สะสม" },
                    { id: "td9_5", content: "/images/sequencing/tooth-decay/cavity.svg", isImage: true, label: "เกิดรู" },
                    { id: "td9_6", content: "/images/sequencing/tooth-decay/decay.svg", isImage: true, label: "ผุ" },
                    { id: "td9_7", content: "/images/sequencing/tooth-decay/pain.svg", isImage: true, label: "เจ็บ" },
                ],
            }
        ]

    },

];