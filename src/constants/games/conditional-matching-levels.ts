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
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "monkey", emoji: "🐒", label: "ลิงหิว", matchId: "banana" },
            { id: "rabbit", emoji: "🐇", label: "กระต่ายหิว", matchId: "carrot" },
            { id: "cat", emoji: "🐱", label: "แมวหิว", matchId: "fish" },
        ],
        rightItems: [
            { id: "fish", emoji: "🐟", label: "ปลา" },
            { id: "banana", emoji: "🍌", label: "กินกล้วย" },
            { id: "carrot", emoji: "🥕", label: "กินแครอท" },
        ]
    },
    2: {
        level: 2,
        difficulty: "easy",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "bird", emoji: "🐦", label: "นกง่วง", matchId: "nest" },
            { id: "bee", emoji: "🐝", label: "ผึ้งอิ่ม", matchId: "hive" },
            { id: "dog", emoji: "🐶", label: "หมาง่วง", matchId: "house" },
        ],
        rightItems: [
            { id: "hive", emoji: "🍯", label: "รังผึ้ง" },
            { id: "house", emoji: "🏠", label: "บ้านหมา" },
            { id: "nest", emoji: "🪹", label: "รังนก" },
        ]
    },
    3: {
        level: 3,
        difficulty: "easy",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "hen", emoji: "🐔", label: "ไก่ออกไข่", matchId: "egg" },
            { id: "cow", emoji: "🐄", label: "วัวให้นม", matchId: "milk" },
            { id: "spider", emoji: "🕷️", label: "แมงมุม", matchId: "web" },
        ],
        rightItems: [
            { id: "milk", emoji: "🥛", label: "นมวัว" },
            { id: "web", emoji: "🕸️", label: "ใยแมงมุม" },
            { id: "egg", emoji: "🥚", label: "ไข่ไก่" },
        ]
    },
    4: {
        level: 4,
        difficulty: "normal",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "frog", emoji: "🐸", label: "กบหิว", matchId: "tongue" },
            { id: "dog", emoji: "🐕", label: "หมาอยากเล่น", matchId: "bone" },
            { id: "panda", emoji: "🐼", label: "แพนด้าหิว", matchId: "bamboo" },
            { id: "mouse", emoji: "🐭", label: "หนูหิว", matchId: "cheese" },
        ],
        rightItems: [
            { id: "cheese", emoji: "🧀", label: "กินชีส" },
            { id: "tongue", emoji: "👅", label: "แลบลิ้น" },
            { id: "bamboo", emoji: "🎋", label: "ต้นไผ่" },
            { id: "bone", emoji: "🦴", label: "คาบกระดูก" },
        ]
    },
    5: {
        level: 5,
        difficulty: "normal",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "elephant", emoji: "🐘", label: "ช้างร้อน", matchId: "water" },
            { id: "bear", emoji: "🐻", label: "หมีหนาว", matchId: "cave" },
            { id: "beaver", emoji: "🦫", label: "บีเวอร์", matchId: "wood" },
            { id: "penguin", emoji: "🐧", label: "เพนกวิน", matchId: "ice" },
        ],
        rightItems: [
            { id: "cave", emoji: "⛰️", label: "เข้าถ้ำ" },
            { id: "water", emoji: "💦", label: "พ่นน้ำ" },
            { id: "ice", emoji: "🧊", label: "น้ำแข็ง" },
            { id: "wood", emoji: "🪵", label: "ท่อนไม้" },
        ]
    },
    6: {
        level: 6,
        difficulty: "normal",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "camel", emoji: "🐪", label: "อูฐเดิน", matchId: "desert" },
            { id: "dolphin", emoji: "🐬", label: "โลมา", matchId: "sea" },
            { id: "duck", emoji: "🦆", label: "เป็ดว่าย", matchId: "pond" },
            { id: "monkey2", emoji: "🐒", label: "ลิงโหน", matchId: "tree" },
        ],
        rightItems: [
            { id: "sea", emoji: "🌊", label: "น้ำทะเล" },
            { id: "desert", emoji: "🏜️", label: "ทะเลทราย" },
            { id: "tree", emoji: "🌳", label: "ต้นไม้" },
            { id: "pond", emoji: "🏞️", label: "บ่อน้ำ" },
        ]
    },
    7: {
        level: 7,
        difficulty: "hard",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "monkey", emoji: "🐒", label: "ลิงหิว", matchId: "banana" },
            { id: "rabbit", emoji: "🐇", label: "กระต่ายหิว", matchId: "carrot" },
            { id: "bear", emoji: "🐻", label: "หมีหิว", matchId: "honey" },
            { id: "cat", emoji: "🐱", label: "แมวหิว", matchId: "fish" },
            { id: "mouse", emoji: "🐭", label: "หนูหิว", matchId: "cheese" },
            { id: "panda", emoji: "🐼", label: "แพนด้าหิว", matchId: "bamboo" },
        ],
        rightItems: [
            { id: "banana", emoji: "🍌", label: "กล้วย" },
            { id: "honey", emoji: "🍯", label: "น้ำผึ้ง" },
            { id: "carrot", emoji: "🥕", label: "แครอท" },
            { id: "cheese", emoji: "🧀", label: "ชีส" },
            { id: "fish", emoji: "🐟", label: "ปลา" },
            { id: "bamboo", emoji: "🎋", label: "ต้นไผ่" },
        ]
    },
    8: {
        level: 8,
        difficulty: "hard",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "bird", emoji: "🐦", label: "นกง่วง", matchId: "nest" },
            { id: "bee", emoji: "🐝", label: "ผึ้งง่วง", matchId: "hive" },
            { id: "dog", emoji: "🐶", label: "หมาง่วง", matchId: "house" },
            { id: "bearc", emoji: "🐻", label: "หมีหนาว", matchId: "cave" },
            { id: "spider", emoji: "🕷️", label: "แมงมุม", matchId: "web" },
            { id: "fishs", emoji: "🐟", label: "ปลาว่าย", matchId: "river" },
        ],
        rightItems: [
            { id: "house", emoji: "🏠", label: "บ้านหมา" },
            { id: "cave", emoji: "⛰️", label: "เข้าถ้ำ" },
            { id: "hive", emoji: "🍯", label: "รังผึ้ง" },
            { id: "nest", emoji: "🪹", label: "รังนก" },
            { id: "river", emoji: "🌊", label: "แม่น้ำ" },
            { id: "web", emoji: "🕸️", label: "ใยแมงมุม" },
        ]
    },
    9: {
        level: 9,
        difficulty: "hard",
        title: "จับคู่และโยงเส้นให้เชื่อมโยงกัน",
        leftItems: [
            { id: "hen", emoji: "🐔", label: "ไก่ออกไข่", matchId: "egg" },
            { id: "cow", emoji: "🐄", label: "วัวให้นม", matchId: "milk" },
            { id: "elephant", emoji: "🐘", label: "ช้างร้อน", matchId: "water" },
            { id: "frog", emoji: "🐸", label: "กบหิว", matchId: "tongue" },
            { id: "dogp", emoji: "🐕", label: "หมาอยากเล่น", matchId: "bone" },
            { id: "worm", emoji: "🐛", label: "หนอนโตขึ้น", matchId: "butterfly" },
        ],
        rightItems: [
            { id: "butterfly", emoji: "🦋", label: "ผีเสื้อ" },
            { id: "egg", emoji: "🥚", label: "ไข่ไก่" },
            { id: "tongue", emoji: "👅", label: "แลบลิ้น" },
            { id: "bone", emoji: "🦴", label: "คาบกระดูก" },
            { id: "milk", emoji: "🥛", label: "นมวัว" },
            { id: "water", emoji: "💦", label: "พ่นน้ำ" },
        ]
    },
};

