export interface MatchItem {
    id: string;
    emoji: string;
    label: string;     // Text shown in the strip below the card
    matchId?: string;  // Only used for left items to indicate the correct match
}

export interface CondMatchLevelConfig {
    level: number;
    difficulty: "easy" | "normal" | "hard";
    title: string;
    leftItems: MatchItem[];
    rightItems: MatchItem[];
}

export const condMatchLevels: Record<number, CondMatchLevelConfig> = {
    1: {
        level: 1,
        difficulty: "easy",
        title: "สัตว์เหล่านี้กินอะไรนะ?",
        leftItems: [
            { id: "zebra", emoji: "🦓", label: "ม้าลาย", matchId: "leaf" },
            { id: "rooster", emoji: "🐓", label: "ไก่", matchId: "seeds" },
            { id: "cat", emoji: "🐱", label: "แมว", matchId: "fish" },
        ],
        rightItems: [
            { id: "fish", emoji: "🐟", label: "ปลา" },
            { id: "leaf", emoji: "🍃", label: "ใบไม้" },
            { id: "seeds", emoji: "🌾", label: "เมล็ดข้าว" },
        ]
    },
    2: {
        level: 2,
        difficulty: "easy",
        title: "สัตว์พวกนี้อยู่ที่ไหน?",
        leftItems: [
            { id: "bee", emoji: "🐝", label: "ผึ้ง", matchId: "hive" },
            { id: "bird", emoji: "🐦", label: "นก", matchId: "nest" },
            { id: "dog", emoji: "🐶", label: "หมา", matchId: "house" },
        ],
        rightItems: [
            { id: "hive", emoji: "🍯", label: "รังผึ้ง" },
            { id: "nest", emoji: "🪹", label: "รังนก" },
            { id: "house", emoji: "🏠", label: "บ้านหมา" },
        ]
    },
    3: {
        level: 3,
        difficulty: "easy",
        title: "ของเหล่านี้นำมาจากไหน?",
        leftItems: [
            { id: "cow", emoji: "🐄", label: "วัว", matchId: "milk" },
            { id: "hen", emoji: "🐔", label: "แม่ไก่", matchId: "egg" },
            { id: "sheep", emoji: "🐑", label: "แกะ", matchId: "wool" },
        ],
        rightItems: [
            { id: "milk", emoji: "🥛", label: "นมวัว" },
            { id: "egg", emoji: "🥚", label: "ไข่ไก่" },
            { id: "wool", emoji: "🧶", label: "ไหมพรม" },
        ]
    },
    4: {
        level: 4,
        difficulty: "normal",
        title: "ของชิ้นไหนคู่กันนะ?",
        leftItems: [
            { id: "pencil", emoji: "✏️", label: "ดินสอ", matchId: "paper" },
            { id: "rain", emoji: "🌧️", label: "ฝนตก", matchId: "umbrella" },
            { id: "lock", emoji: "🔒", label: "แม่กุญแจ", matchId: "key" },
            { id: "eye", emoji: "👁️", label: "ดวงตา", matchId: "glasses" },
        ],
        rightItems: [
            { id: "paper", emoji: "📄", label: "กระดาษ" },
            { id: "umbrella", emoji: "☂️", label: "ร่ม" },
            { id: "key", emoji: "🔑", label: "ลูกกุญแจ" },
            { id: "glasses", emoji: "👓", label: "แว่นตา" },
        ]
    },
    5: {
        level: 5,
        difficulty: "normal",
        title: "อาชีพไหนใช้เครื่องมือนี้?",
        leftItems: [
            { id: "doctor", emoji: "👨‍⚕️", label: "คุณหมอ", matchId: "steth" },
            { id: "chef", emoji: "👨‍🍳", label: "พ่อครัว", matchId: "pan" },
            { id: "farmer", emoji: "👨‍🌾", label: "ชาวนา", matchId: "tractor" },
            { id: "painter", emoji: "👨‍🎨", label: "ช่างทาสี", matchId: "palette" },
        ],
        rightItems: [
            { id: "steth", emoji: "🩺", label: "หูฟังแพทย์" },
            { id: "pan", emoji: "🍳", label: "กระทะ" },
            { id: "tractor", emoji: "🚜", label: "รถไถ" },
            { id: "palette", emoji: "🎨", label: "จานสี" },
        ]
    },
    6: {
        level: 6,
        difficulty: "normal",
        title: "ยานพาหนะกับสถานที่",
        leftItems: [
            { id: "car", emoji: "🚗", label: "รถยนต์", matchId: "road" },
            { id: "boat", emoji: "⛵", label: "เรือ", matchId: "water" },
            { id: "plane", emoji: "✈️", label: "เครื่องบิน", matchId: "sky" },
            { id: "train", emoji: "🚂", label: "รถไฟ", matchId: "rail" },
        ],
        rightItems: [
            { id: "road", emoji: "🛣️", label: "ถนน" },
            { id: "water", emoji: "🌊", label: "ทะเล" },
            { id: "sky", emoji: "☁️", label: "ท้องฟ้า" },
            { id: "rail", emoji: "🛤️", label: "รางรถไฟ" },
        ]
    },
    7: {
        level: 7,
        difficulty: "hard",
        title: "ใครกินอะไร แล้วอยู่ที่ไหน?",
        leftItems: [
            { id: "monkey", emoji: "🐒", label: "ลิง", matchId: "banana" },
            { id: "rabbit", emoji: "🐰", label: "กระต่าย", matchId: "carrot" },
            { id: "mouse", emoji: "🐭", label: "หนู", matchId: "cheese" },
            { id: "frog", emoji: "🐸", label: "กบ", matchId: "lotus" },
            { id: "bear", emoji: "🐻", label: "หมี", matchId: "honey" },
            { id: "octopus", emoji: "🐙", label: "หมึก", matchId: "ocean" },
        ],
        rightItems: [
            { id: "banana", emoji: "🍌", label: "กล้วย" },
            { id: "carrot", emoji: "🥕", label: "แครอท" },
            { id: "cheese", emoji: "🧀", label: "ชีส" },
            { id: "lotus", emoji: "🪷", label: "ใบบัว" },
            { id: "honey", emoji: "🍯", label: "น้ำผึ้ง" },
            { id: "ocean", emoji: "🌊", label: "ทะเล" },
        ]
    },
    8: {
        level: 8,
        difficulty: "hard",
        title: "จับคู่สิ่งที่ตรงข้ามกัน",
        leftItems: [
            { id: "sun", emoji: "☀️", label: "กลางวัน", matchId: "moon" },
            { id: "fire", emoji: "🔥", label: "ร้อน", matchId: "ice" },
            { id: "rabbit2", emoji: "🐇", label: "เร็ว", matchId: "turtle" },
            { id: "up", emoji: "⬆️", label: "ขึ้น", matchId: "down" },
            { id: "happy", emoji: "😃", label: "ดีใจ", matchId: "sad" },
            { id: "big", emoji: "🐘", label: "ตัวใหญ่", matchId: "small" },
        ],
        rightItems: [
            { id: "moon", emoji: "🌙", label: "กลางคืน" },
            { id: "ice", emoji: "🧊", label: "เย็น" },
            { id: "turtle", emoji: "🐢", label: "ช้า" },
            { id: "down", emoji: "⬇️", label: "ลง" },
            { id: "sad", emoji: "😢", label: "เสียใจ" },
            { id: "small", emoji: "🐜", label: "ตัวเล็ก" },
        ]
    },
    9: {
        level: 9,
        difficulty: "hard",
        title: "งานอดิเรกและเครื่องแต่งกาย",
        leftItems: [
            { id: "football", emoji: "⚽", label: "ฟุตบอล", matchId: "goal" },
            { id: "bed", emoji: "🛏️", label: "นอนหลับ", matchId: "pyjama" },
            { id: "rain2", emoji: "🌧️", label: "ฝนตก", matchId: "boot" },
            { id: "music", emoji: "🎵", label: "ฟังเพลง", matchId: "headphone" },
            { id: "paint", emoji: "🎨", label: "ระบายสี", matchId: "brush" },
            { id: "cold", emoji: "🥶", label: "หนาว", matchId: "coat" },
        ],
        rightItems: [
            { id: "goal", emoji: "🥅", label: "โกล" },
            { id: "pyjama", emoji: "👚", label: "ชุดนอน" },
            { id: "boot", emoji: "👢", label: "รองเท้าบูท" },
            { id: "headphone", emoji: "🎧", label: "หูฟัง" },
            { id: "brush", emoji: "🖌️", label: "พู่กัน" },
            { id: "coat", emoji: "🧥", label: "เสื้อกันหนาว" },
        ]
    },
};
