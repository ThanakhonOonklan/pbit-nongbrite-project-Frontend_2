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
        title: "จับคู่เหตุและผล (สัตว์กับอาหาร)",
        leftItems: [
            { id: "cat", emoji: "🐱", label: "ลูกแมวน้อยกำลังหิว", matchId: "fish" },
            { id: "rabbit", emoji: "🐇", label: "กระต่ายน้อยหิวแล้ว", matchId: "carrot" },
            { id: "monkey", emoji: "🐒", label: "ลิงจ๋อกำลังหิว", matchId: "banana" },
        ],
        rightItems: [
            { id: "banana", emoji: "🍌", label: "มันจะปอกกล้วยกิน", },
            { id: "fish", emoji: "🐟", label: "มันจะไปกินปลา", },
            { id: "carrot", emoji: "🥕", label: "มันจะหาแครอทมากิน", },
        ]
    },
    2: {
        level: 2,
        difficulty: "easy",
        title: "จับคู่เหตุและผล (กิจวัตรประจำวัน)",
        leftItems: [
            { id: "rain", emoji: "🌧️", label: "เมฆฝนตั้งเค้าและฝนตก", matchId: "umbrella" },
            { id: "cold", emoji: "🤧", label: "อากาศหนาวและลมแรง", matchId: "jacket" },
            { id: "sleepy", emoji: "🥱", label: "เล่นจนเหนื่อยและรู้สึกง่วง", matchId: "bed" },
        ],
        rightItems: [
            { id: "bed", emoji: "🛏️", label: "เราต้องห่มผ้าและเข้านอน", },
            { id: "umbrella", emoji: "☂️", label: "เราต้องกางร่มกันฝน", },
            { id: "jacket", emoji: "🧥", label: "เราต้องสวมเสื้อกันหนาว", },
        ]
    },
    3: {
        level: 3,
        difficulty: "easy",
        title: "จับคู่เหตุและผล (สัตว์กับที่อยู่)",
        leftItems: [
            { id: "bird", emoji: "🐦", label: "นกน้อยเหนื่อยอยากพักผ่อน", matchId: "nest" },
            { id: "bee", emoji: "🐝", label: "ผึ้งบินหาที่ทำรัง", matchId: "hive" },
            { id: "fish_swim", emoji: "🐟", label: "ปลาตัวใหญ่กำลังหาที่ว่ายน้ำ", matchId: "river" },
        ],
        rightItems: [
            { id: "river", emoji: "🌊", label: "มันจะลงไปว่ายในแม่น้ำที่เย็นฉ่ำ", },
            { id: "nest", emoji: "🪹", label: "มันจะบินกลับไปที่รังบนต้นไม้", },
            { id: "hive", emoji: "🍯", label: "มันจะสร้างรังที่มีน้ำผึ้งแสนหวาน", },
        ]
    },
    4: {
        level: 4,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (ดูแลตัวเอง)",
        leftItems: [
            { id: "dirty_hand", emoji: "🖐️", label: "มือของเราเปื้อนโคลนเต็มไปหมด", matchId: "wash_hand" },
            { id: "toothache", emoji: "🦷", label: "กินขนมเยอะจนปวดฟัน", matchId: "dentist" },
            { id: "sick", emoji: "🤒", label: "ตากฝนจนตัวร้อนไม่สบาย", matchId: "doctor" },
            { id: "thirsty", emoji: "🥵", label: "วิ่งเล่นจนรู้สึกกระหายน้ำ", matchId: "drink" },
        ],
        rightItems: [
            { id: "drink", emoji: "💧", label: "เราต้องดื่มน้ำเปล่าเยอะๆ", },
            { id: "dentist", emoji: "🧑‍⚕️", label: "เราต้องไปให้คุณหมอฟันตรวจดู", },
            { id: "wash_hand", emoji: "🧼", label: "เราต้องล้างมือด้วยสบู่ให้สะอาด", },
            { id: "doctor", emoji: "🏥", label: "เราต้องไปหาคุณหมอที่โรงพยาบาล", },
        ]
    },
    5: {
        level: 5,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (อาชีพและหน้าที่)",
        leftItems: [
            { id: "fire", emoji: "🔥", label: "เกิดเหตุไฟไหม้ที่บ้านหลังใหญ่", matchId: "firetruck" },
            { id: "learn", emoji: "🏫", label: "เด็กๆ อยากเรียนให้เก่งขึ้น", matchId: "teacher" },
            { id: "thief", emoji: "🦹", label: "มีคนร้ายกำลังขโมยของ", matchId: "police" },
            { id: "letter", emoji: "✉️", label: "เราต้องการส่งจดหมายหาเพื่อน", matchId: "postman" },
        ],
        rightItems: [
            { id: "teacher", emoji: "👩‍🏫", label: "คุณครูจะคอยสอนให้ความรู้", },
            { id: "postman", emoji: "📬", label: "บุรุษไปรษณีย์จะนำจดหมายไปส่งให้", },
            { id: "firetruck", emoji: "🚒", label: "เราต้องเรียกรถดับเพลิงมาฉีดน้ำ", },
            { id: "police", emoji: "🚓", label: "คุณตำรวจจะตามไปจับผู้ร้าย", },
        ]
    },
    6: {
        level: 6,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (สิ่งรอบตัว)",
        leftItems: [
            { id: "seed", emoji: "🌱", label: "เราเพิ่งปลูกต้นไม้เล็กลงในดิน", matchId: "water_plant" },
            { id: "dirty_cloth", emoji: "👕", label: "เสื้อผ้าที่เราใส่ไปเล่นนั้นเลอะเทอะ", matchId: "washing" },
            { id: "dark", emoji: "🌑", label: "ท้องฟ้ามืดสนิทจนมองไม่เห็น", matchId: "light" },
            { id: "hungry", emoji: "🤤", label: "ท้องร้องจ๊อกๆ เพราะหิวข้าว", matchId: "rice" },
        ],
        rightItems: [
            { id: "light", emoji: "💡", label: "เราต้องเปิดไฟเพื่อให้มีแสงสว่าง", },
            { id: "rice", emoji: "🍚", label: "เราต้องตักข้าวใส่จานเพื่อกิน", },
            { id: "water_plant", emoji: "🚿", label: "เราต้องรดน้ำทุกวันให้ต้นไม้โต", },
            { id: "washing", emoji: "🧺", label: "เราต้องเอาไปใส่ในเครื่องซักผ้า", },
        ]
    },
    7: {
        level: 7,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (รวมมิตรความรู้)",
        leftItems: [
            { id: "dog", emoji: "🐶", label: "ลูกสุนัขตัวน้อยกำลังหิวโซ", matchId: "bone" },
            { id: "bear", emoji: "🐻", label: "หมีตัวใหญ่รู้สึกหนาว", matchId: "cave" },
            { id: "spider", emoji: "🕷️", label: "แมงมุมกำลังหาที่ดักแมลง", matchId: "web" },
            { id: "panda", emoji: "🐼", label: "แพนด้าอ้วนกำลังอยากกินอาหาร", matchId: "bamboo" },
            { id: "frog", emoji: "🐸", label: "กบตัวเขียวเห็นแมลงวันบินผ่าน", matchId: "tongue" },
            { id: "hen", emoji: "🐔", label: "แม่ไก่อ้วนกำลังเบ่งไข่", matchId: "egg" },
        ],
        rightItems: [
            { id: "tongue", emoji: "👅", label: "มันจะแลบลิ้นยาวๆ ออกมาจับกิน", },
            { id: "web", emoji: "🕸️", label: "มันจะชักใยเพื่อรอจับเหยื่อ", },
            { id: "bone", emoji: "🦴", label: "มันจะคาบกระดูกไปแทะเล่น", },
            { id: "egg", emoji: "🥚", label: "มันจะออกไข่ฟองโตมาให้เรากิน", },
            { id: "cave", emoji: "⛰️", label: "มันจะเดินเข้าไปหลบในถ้ำ", },
            { id: "bamboo", emoji: "🎋", label: "มันจะเคี้ยวใบไผ่กินอย่างอร่อย", },
        ]
    },
    8: {
        level: 8,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (ชีวิตประจำวัน)",
        leftItems: [
            { id: "rain_2", emoji: "🌧️", label: "ฝนเริ่มตกหนักขึ้นเรื่อยๆ", matchId: "umbrella_2" },
            { id: "sleepy_2", emoji: "🥱", label: "ตาจะปิดแล้วเพราะรู้สึกง่วงนอน", matchId: "bed_2" },
            { id: "sick_2", emoji: "🤒", label: "ตัวร้อนและไอค่อกแค่กไม่สบาย", matchId: "doctor_2" },
            { id: "dirty_hand_2", emoji: "🖐️", label: "มือดำปี๋เพราะไปจับดินเลอะเทอะ", matchId: "wash_hand_2" },
            { id: "cold_2", emoji: "🤧", label: "อากาศหนาวจัดจนตัวสั่น", matchId: "jacket_2" },
            { id: "toothache_2", emoji: "🦷", label: "ปวดฟันมากจนร้องไห้งอแง", matchId: "dentist_2" },
        ],
        rightItems: [
            { id: "jacket_2", emoji: "🧥", label: "เราต้องใส่เสื้อกันหนาวให้อุ่น", },
            { id: "dentist_2", emoji: "🧑‍⚕️", label: "เราต้องรีบไปหาคุณหมอฟัน", },
            { id: "umbrella_2", emoji: "☂️", label: "เราต้องรีบกางร่มกันฝน", },
            { id: "wash_hand_2", emoji: "🧼", label: "เราต้องฟอกสบู่และล้างมือให้สะอาด", },
            { id: "bed_2", emoji: "🛏️", label: "เราต้องล้มตัวลงนอนบนเตียงนุ่มๆ", },
            { id: "doctor_2", emoji: "🏥", label: "เราต้องไปตรวจอาการกับคุณหมอ", },
        ]
    },
    9: {
        level: 9,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (ทดสอบความเข้าใจ)",
        leftItems: [
            { id: "fire_3", emoji: "🔥", label: "มีไฟไหม้ควันพุ่งโขมง", matchId: "firetruck_3" },
            { id: "monkey_3", emoji: "🐒", label: "ลิงจ๋อกำลังมองหาผลไม้แสนอร่อย", matchId: "banana_3" },
            { id: "dark_3", emoji: "🌑", label: "ในห้องมืดตึ๊ดตื๋อไม่มีแสงสว่างเลย", matchId: "light_3" },
            { id: "fish_swim_3", emoji: "🐟", label: "ปลาโลมาตัวใหญ่กำลังอยากว่ายน้ำ", matchId: "river_3" },
            { id: "learn_3", emoji: "🏫", label: "เด็กๆ นั่งเรียบร้อยพร้อมเรียนหนังสือ", matchId: "teacher_3" },
            { id: "dirty_cloth_3", emoji: "👕", label: "เสื้อตัวเก่งเลอะคราบสีเต็มไปหมด", matchId: "washing_3" },
        ],
        rightItems: [
            { id: "light_3", emoji: "💡", label: "เราต้องรีบกดสวิตช์เปิดไฟ", },
            { id: "teacher_3", emoji: "👩‍🏫", label: "คุณครูจะเดินเข้ามาสอนหน้าห้อง", },
            { id: "banana_3", emoji: "🍌", label: "มันจะหยิบกล้วยมาปอกเปลือกกิน", },
            { id: "washing_3", emoji: "🧺", label: "เราต้องนำไปซักให้สะอาดหอมฉุย", },
            { id: "firetruck_3", emoji: "🚒", label: "เจ้าหน้าที่จะขับรถดับเพลิงมาช่วย", },
            { id: "river_3", emoji: "🌊", label: "มันจะกระโดดลงไปว่ายในน้ำทะเล", },
        ]
    },
};
