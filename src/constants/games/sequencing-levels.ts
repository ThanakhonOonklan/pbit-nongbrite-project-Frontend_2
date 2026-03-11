export interface SequencingItem {
    id: string;      // Unique id for the item
    content: string; // The emoji or image path
    isImage: boolean; // True if content is a path to an image
}

export interface SequencingLevelConfig {
    level: number;
    difficulty: "easy" | "normal" | "hard";
    theme: string;
    sequenceTitle: string;
    // The correct sequence order
    correctSequence: SequencingItem[];
    // Time limit (optional)
    timeLimit?: number;
}

export const sequencingLevels: SequencingLevelConfig[] = [
    {
        level: 1,
        difficulty: "easy",
        theme: "frog",
        sequenceTitle: "วงจรชีวิตกบ",
        correctSequence: [
            { id: "frog_1", content: "🥚", isImage: false },
            { id: "frog_2", content: "🐸", isImage: false },
        ],
    },
    {
        level: 2,
        difficulty: "normal",
        theme: "frog",
        sequenceTitle: "วงจรชีวิตกบ",
        correctSequence: [
            { id: "frog_1", content: "🥚", isImage: false },
            { id: "frog_2", content: "🪱", isImage: false }, // Using worm emoji as tadpole approximation, normally use image here
            { id: "frog_3", content: "🐸", isImage: false },
        ],
    },
    {
        level: 3,
        difficulty: "hard",
        theme: "plant",
        sequenceTitle: "การเจริญเติบโตของต้นไม้",
        correctSequence: [
            { id: "plant_1", content: "🫘", isImage: false }, // Seed
            { id: "plant_2", content: "🌱", isImage: false }, // Sprout
            { id: "plant_3", content: "🌿", isImage: false }, // Plant
            { id: "plant_4", content: "🌳", isImage: false }, // Tree
        ],
    },
    {
        level: 4,
        difficulty: "easy",
        theme: "butterfly",
        sequenceTitle: "วงจรชีวิตผีเสื้อ",
        correctSequence: [
            { id: "butter_1", content: "🥚", isImage: false },
            { id: "butter_2", content: "🐛", isImage: false },
            { id: "butter_3", content: "🦋", isImage: false },
        ],
    },
    {
        level: 5,
        difficulty: "normal",
        theme: "butterfly",
        sequenceTitle: "วงจรชีวิตผีเสื้อ",
        correctSequence: [
            { id: "butter_1", content: "🥚", isImage: false },
            { id: "butter_2", content: "🐛", isImage: false },
            { id: "butter_3", content: "🪹", isImage: false }, // Pupa
            { id: "butter_4", content: "🦋", isImage: false },
        ],
    },
    {
        level: 6,
        difficulty: "hard",
        theme: "chicken",
        sequenceTitle: "วงจรชีวิตไก่",
        correctSequence: [
            { id: "chicken_1", content: "🥚", isImage: false },
            { id: "chicken_2", content: "🐣", isImage: false },
            { id: "chicken_3", content: "🐥", isImage: false },
            { id: "chicken_4", content: "🐓", isImage: false },
        ],
    },
    {
        level: 7,
        difficulty: "easy",
        theme: "apple",
        sequenceTitle: "การเจริญเติบโตของแอปเปิ้ล",
        correctSequence: [
            { id: "apple_1", content: "🫘", isImage: false },
            { id: "apple_2", content: "🌱", isImage: false },
            { id: "apple_3", content: "🍎", isImage: false },
        ],
    },
    {
        level: 8,
        difficulty: "normal",
        theme: "human",
        sequenceTitle: "การเจริญเติบโตของมนุษย์",
        correctSequence: [
            { id: "human_1", content: "👶", isImage: false },
            { id: "human_2", content: "👦", isImage: false },
            { id: "human_3", content: "👨", isImage: false },
            { id: "human_4", content: "👴", isImage: false },
        ],
    },
    {
        level: 9,
        difficulty: "hard",
        theme: "rainbow",
        sequenceTitle: "การเกิดรุ้งกินน้ำ",
        correctSequence: [
            { id: "rb_1", content: "☀️", isImage: false },
            { id: "rb_2", content: "🌧️", isImage: false },
            { id: "rb_3", content: "🌈", isImage: false },
        ],
    },
];