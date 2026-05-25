export interface MatchItem {
    id: string;
    emoji: string;
    label: string;
    matchId?: string;
    icon?: string;
}

export interface CondMatchPattern {
    theme: string;
    title: string;
    leftItems: MatchItem[];
    rightItems: MatchItem[];
}

export interface CondMatchLevelConfig {
    level: number;
    difficulty: "easy" | "normal" | "hard";
    title: string;
    leftItems?: MatchItem[];
    rightItems?: MatchItem[];
    patterns?: CondMatchPattern[];
}

export const condMatchLevels: Record<number, CondMatchLevelConfig> = {
    1: {
        level: 1,
        difficulty: "easy",
        title: "จับคู่เหตุและผล (หมวดสัตว์)",
        leftItems: [
            { id: "cat", emoji: "🐱", label: "ถ้าแมวหิว", matchId: "fish" },
            { id: "rabbit", emoji: "🐇", label: "ถ้ากระต่ายหิว", matchId: "carrot" },
            { id: "monkey", emoji: "🐒", label: "ถ้าลิงหิว", matchId: "banana" },
            { id: "panda", emoji: "🐼", label: "ถ้าแพนด้าหิว", matchId: "bamboo" },
        ],
        rightItems: [
            { id: "banana", emoji: "🍌", label: "ให้กินกล้วย" },
            { id: "fish", emoji: "🐟", label: "ให้กินปลา" },
            { id: "bamboo", emoji: "🎋", label: "ให้กินไผ่" },
            { id: "carrot", emoji: "🥕", label: "ให้กินแครอท" },
        ],
        patterns: [
            {
                theme: "jungle", title: "สัตว์ป่ากินอะไร?",
                leftItems: [
                    { id: "p1_cat", emoji: "🐱", label: "ถ้าแมวหิว", matchId: "p1_fish" },
                    { id: "p1_rabbit", emoji: "🐇", label: "ถ้ากระต่ายหิว", matchId: "p1_carrot" },
                    { id: "p1_monkey", emoji: "🐒", label: "ถ้าลิงหิว", matchId: "p1_banana" },
                    { id: "p1_panda", emoji: "🐼", label: "ถ้าแพนด้าหิว", matchId: "p1_bamboo" },
                ],
                rightItems: [
                    { id: "p1_fish", emoji: "🐟", label: "ให้กินปลา" },
                    { id: "p1_carrot", emoji: "🥕", label: "ให้กินแครอท" },
                    { id: "p1_banana", emoji: "🍌", label: "ให้กินกล้วย" },
                    { id: "p1_bamboo", emoji: "🎋", label: "ให้กินไผ่" },
                ],
            },
            {
                theme: "farm", title: "สัตว์ฟาร์มกินอะไร?",
                leftItems: [
                    { id: "p2_cow", emoji: "🐄", label: "ถ้าวัวหิว", matchId: "p2_grass" },
                    { id: "p2_sheep", emoji: "🐑", label: "ถ้าแกะหิว", matchId: "p2_corn" },
                    { id: "p2_pig", emoji: "🐷", label: "ถ้าหมูหิว", matchId: "p2_apple" },
                    { id: "p2_chicken", emoji: "🐔", label: "ถ้าไก่หิว", matchId: "p2_seed" },
                ],
                rightItems: [
                    { id: "p2_grass", emoji: "🥬", label: "ให้กินหญ้า" },
                    { id: "p2_corn", emoji: "🌽", label: "ให้กินข้าวโพด" },
                    { id: "p2_apple", emoji: "🍎", label: "ให้กินแอปเปิ้ล" },
                    { id: "p2_seed", emoji: "🌾", label: "ให้กินเมล็ดข้าว" },
                ],
            },
            {
                theme: "zoo", title: "สัตว์สวนสัตว์กินอะไร?",
                leftItems: [
                    { id: "p3_elephant", emoji: "🐘", label: "ถ้าช้างหิว", matchId: "p3_sugarcane" },
                    { id: "p3_giraffe", emoji: "🦒", label: "ถ้าจิราฟหิว", matchId: "p3_leaf" },
                    { id: "p3_koala", emoji: "🐨", label: "ถ้าโคอาล่าหิว", matchId: "p3_eucalyptus" },
                    { id: "p3_lion", emoji: "🦁", label: "ถ้าสิงโตหิว", matchId: "p3_meat" },
                ],
                rightItems: [
                    { id: "p3_sugarcane", emoji: "🎍", label: "ให้กินอ้อย" },
                    { id: "p3_leaf", emoji: "🍃", label: "ให้กินใบไม้" },
                    { id: "p3_eucalyptus", emoji: "🌿", label: "ให้กินใบยูคาลิปตัส" },
                    { id: "p3_meat", emoji: "🥩", label: "ให้กินเนื้อ" },
                ],
            },
            {
                theme: "sea", title: "สัตว์ทะเลกินอะไร?",
                leftItems: [
                    { id: "p4_shark", emoji: "🦈", label: "ถ้าฉลามหิว", matchId: "p4_squid" },
                    { id: "p4_whale", emoji: "🐋", label: "ถ้าวาฬหิว", matchId: "p4_krill" },
                    { id: "p4_octopus", emoji: "🐙", label: "ถ้าหมึกหิว", matchId: "p4_crab" },
                    { id: "p4_seal", emoji: "🦭", label: "ถ้าแมวน้ำหิว", matchId: "p4_fish" },
                ],
                rightItems: [
                    { id: "p4_squid", emoji: "🦑", label: "ให้กินหมึก" },
                    { id: "p4_krill", emoji: "🦐", label: "ให้กินกุ้งเล็ก" },
                    { id: "p4_crab", emoji: "🦀", label: "ให้กินปู" },
                    { id: "p4_fish", emoji: "🐟", label: "ให้กินปลา" },
                ],
            },
        ],
    },
    2: {
        level: 2,
        difficulty: "easy",
        title: "จับคู่เหตุและผล (หมวดที่อยู่อาศัยสัตว์)",
        patterns: [
            {
                theme: "homes_1", title: "ที่อยู่สัตว์ป่า",
                leftItems: [
                    { id: "l2p1_bird", emoji: "🐦", label: "ถ้านกง่วง", matchId: "l2p1_nest" },
                    { id: "l2p1_bee", emoji: "🐝", label: "ถ้าผึ้งทำรัง", matchId: "l2p1_hive" },
                    { id: "l2p1_fox", emoji: "🦊", label: "ถ้าจิ้งจอกหนาว", matchId: "l2p1_burrow" },
                    { id: "l2p1_bear_sleepy", emoji: "🐻", label: "ถ้าหมีง่วง", matchId: "l2p1_cave2" },
                ],
                rightItems: [
                    { id: "l2p1_cave2", emoji: "⛰️", label: "หลบเข้าถ้ำ", icon: "/images/games/conditional-matching/bear-cave.svg" },
                    { id: "l2p1_nest", emoji: "🪹", label: "กลับไปที่รัง" },
                    { id: "l2p1_burrow", emoji: "🌿", label: "หลบในโพรงดิน", icon: "/images/games/conditional-matching/fox-burrow.svg" },
                    { id: "l2p1_hive", emoji: "🐝", label: "ไปที่รังผึ้ง", icon: "/images/games/conditional-matching/beehive.svg" },
                ],
            },
            {
                theme: "homes_2", title: "บ้านสัตว์เลี้ยง",
                leftItems: [
                    { id: "l2p2_dog", emoji: "🐶", label: "ถ้าหมาง่วง", matchId: "l2p2_doghouse" },
                    { id: "l2p2_horse", emoji: "🐴", label: "ถ้าม้าพักผ่อน", matchId: "l2p2_stable" },
                    { id: "l2p2_pig", emoji: "🐷", label: "ถ้าหมูร้อน", matchId: "l2p2_mud" },
                    { id: "l2p2_chicken", emoji: "🐔", label: "ถ้าไก่นอน", matchId: "l2p2_coop" },
                ],
                rightItems: [
                    { id: "l2p2_doghouse", emoji: "🏠", label: "เข้าบ้านหมา" },
                    { id: "l2p2_stable", emoji: "🛖", label: "กลับเข้าคอก", icon: "/images/games/conditional-matching/horse-stable.svg" },
                    { id: "l2p2_mud", emoji: "♨️", label: "แช่ปลักโคลน", icon: "/images/games/conditional-matching/mud-wallow.svg" },
                    { id: "l2p2_coop", emoji: "🏚️", label: "เข้าเล้าไก่", icon: "/images/games/conditional-matching/chicken-coop.svg" },
                ],
            },
            {
                theme: "homes_3", title: "ที่หลบภัยสัตว์",
                leftItems: [
                    { id: "l2p3_bat", emoji: "🦇", label: "ถ้าค้างคาวนอน", matchId: "l2p3_dark_cave" },
                    { id: "l2p3_squirrel", emoji: "🐿️", label: "ถ้ากระรอกซ่อน", matchId: "l2p3_hole" },
                    { id: "l2p3_rabbit_scared", emoji: "🐇", label: "ถ้ากระต่ายกลัว", matchId: "l2p3_burrow" },
                    { id: "l2p3_spider", emoji: "🕷️", label: "ถ้าแมงมุมอยู่", matchId: "l2p3_web" },
                ],
                rightItems: [
                    { id: "l2p3_dark_cave", emoji: "🦇", label: "ห้อยหัวในถ้ำ", icon: "/images/games/conditional-matching/bat-hanging.svg" },
                    { id: "l2p3_hole", emoji: "🌳", label: "มุดโพรงไม้", icon: "/images/games/conditional-matching/tree-hole.svg" },
                    { id: "l2p3_burrow", emoji: "🕳️", label: "ลงรูใต้ดิน", icon: "/images/games/conditional-matching/rabbit-burrow2.svg" },
                    { id: "l2p3_web", emoji: "🕸️", label: "เกาะบนใย" },
                ],
            },
            {
                theme: "homes_4", title: "บ้านแมลง",
                leftItems: [
                    { id: "l2p4_ant", emoji: "🐜", label: "ถ้ามดกลับบ้าน", matchId: "l2p4_sandhole" },
                    { id: "l2p4_worm", emoji: "🪱", label: "ถ้าไส้เดือนหลบ", matchId: "l2p4_soil" },
                    { id: "l2p4_snail", emoji: "🐌", label: "ถ้าหอยทากตกใจ", matchId: "l2p4_shell" },
                    { id: "l2p4_roach", emoji: "🪳", label: "ถ้าแมลงสาบตกใจ", matchId: "l2p4_crack" },
                ],
                rightItems: [
                    { id: "l2p4_sandhole", emoji: "🏜️", label: "เดินลงโพรงทราย", icon: "/images/games/conditional-matching/sand-hole.svg" },
                    { id: "l2p4_soil", emoji: "🟫", label: "มุดลงดิน", icon: "/images/games/conditional-matching/worm-soil.svg" },
                    { id: "l2p4_shell", emoji: "🐌", label: "หดในเปลือก", icon: "/images/games/conditional-matching/snail-shell2.svg" },
                    { id: "l2p4_crack", emoji: "🚪", label: "ซ่อนในรอยแตก", icon: "/images/games/conditional-matching/wall-crack.svg" },
                ],
            },
        ],
    },
    3: {
        level: 3,
        difficulty: "easy",
        title: "จับคู่เหตุและผล (พฤติกรรมสัตว์)",
        patterns: [
            {
                theme: "actions_1", title: "การกระทำสัตว์ 1",
                leftItems: [
                    { id: "l3p1_dog", emoji: "🐶", label: "ถ้าหมาอยากเล่น", matchId: "l3p1_bone" },
                    { id: "l3p1_spider", emoji: "🕷️", label: "ถ้าแมงมุมสร้างรัง", matchId: "l3p1_web" },
                    { id: "l3p1_frog", emoji: "🐸", label: "ถ้ากบเจอแมลง", matchId: "l3p1_tongue" },
                    { id: "l3p1_hen", emoji: "🐔", label: "ถ้าไก่ออกไข่", matchId: "l3p1_egg" },
                ],
                rightItems: [
                    { id: "l3p1_egg", emoji: "🥚", label: "ก็เก็บไข่" },
                    { id: "l3p1_bone", emoji: "🦴", label: "คาบกระดูก" },
                    { id: "l3p1_tongue", emoji: "👅", label: "จับกิน", icon: "/images/games/conditional-matching/frog-catch.svg" },
                    { id: "l3p1_web", emoji: "🕸️", label: "ชักใย", icon: "/images/games/conditional-matching/spider-web.svg" },
                ],
            },
            {
                theme: "actions_2", title: "อวัยวะสัตว์",
                leftItems: [
                    { id: "l3p2_bird", emoji: "🦅", label: "ถ้านกจะบิน", matchId: "l3p2_wings" },
                    { id: "l3p2_fish_action", emoji: "🐠", label: "ถ้าปลาว่ายน้ำ", matchId: "l3p2_gills" },
                    { id: "l3p2_snake", emoji: "🐍", label: "ถ้างูเลื้อย", matchId: "l3p2_scales" },
                    { id: "l3p2_roo", emoji: "🦘", label: "ถ้ามีลูกน้อย", matchId: "l3p2_pouch" },
                ],
                rightItems: [
                    { id: "l3p2_wings", emoji: "🪽", label: "ใช้ปีก" },
                    { id: "l3p2_gills", emoji: "🐟", label: "ใช้เหงือก", icon: "/images/games/conditional-matching/fish-gills.svg" },
                    { id: "l3p2_scales", emoji: "🐊", label: "ใช้เกล็ด", icon: "/images/games/conditional-matching/snake-scales.svg" },
                    { id: "l3p2_pouch", emoji: "🦘", label: "ใส่ถุงหน้าท้อง", icon: "/images/games/conditional-matching/kangaroo-pouch.svg" },
                ],
            },
            {
                theme: "actions_3", title: "การป้องกันตัว",
                leftItems: [
                    { id: "l3p3_turtle", emoji: "🐢", label: "ถ้าเต่ากลัว", matchId: "l3p3_shell" },
                    { id: "l3p3_skunk", emoji: "🦨", label: "ถ้าสกังก์ตกใจ", matchId: "l3p3_smell" },
                    { id: "l3p3_chameleon", emoji: "🦎", label: "ถ้าจะซ่อนตัว", matchId: "l3p3_color" },
                    { id: "l3p3_porcupine", emoji: "🦔", label: "ถ้าศัตรูมา", matchId: "l3p3_spikes" },
                ],
                rightItems: [
                    { id: "l3p3_shell", emoji: "🐚", label: "หดในกระดอง", icon: "/images/games/conditional-matching/turtle-shell.svg" },
                    { id: "l3p3_smell", emoji: "💨", label: "ปล่อยกลิ่นเหม็น" },
                    { id: "l3p3_color", emoji: "🎨", label: "เปลี่ยนสี", icon: "/images/games/conditional-matching/chameleon-color.svg" },
                    { id: "l3p3_spikes", emoji: "🌵", label: "กางหนาม", icon: "/images/games/conditional-matching/porcupine-spikes.svg" },
                ],
            },
            {
                theme: "animal_sounds", title: "เสียงร้องของสัตว์",
                leftItems: [
                    { id: "l3p4_cow", emoji: "🐄", label: "ถ้าวัวร้อง", matchId: "l3p4_moo" },
                    { id: "l3p4_frog", emoji: "🐸", label: "ถ้ากบร้อง", matchId: "l3p4_ribbit" },
                    { id: "l3p4_cat", emoji: "🐱", label: "ถ้าแมวร้อง", matchId: "l3p4_meow" },
                    { id: "l3p4_wolf", emoji: "🐺", label: "ถ้าหมาป่าร้อง", matchId: "l3p4_howl" },
                ],
                rightItems: [
                    { id: "l3p4_moo", emoji: "💬", label: "เสียง \"มู\"", icon: "/images/games/conditional-matching/sound-moo.svg" },
                    { id: "l3p4_ribbit", emoji: "💬", label: "เสียง \"อ๊บ อ๊บ\"", icon: "/images/games/conditional-matching/sound-ribbit.svg" },
                    { id: "l3p4_meow", emoji: "💬", label: "เสียง \"เมี๊ยว\"", icon: "/images/games/conditional-matching/sound-meow.svg" },
                    { id: "l3p4_howl", emoji: "🌕", label: "เสียง \"โหยหวน\"", icon: "/images/games/conditional-matching/sound-howl.svg" },
                ],
            },
        ],
    },
    4: {
        level: 4,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (หมวดสิ่งของ)",
        patterns: [
            {
                theme: "daily_life", title: "ชีวิตประจำวัน",
                leftItems: [
                    { id: "l4p1_dirty", emoji: "👕", label: "ถ้าเสื้อเลอะ", matchId: "l4p1_wash", icon: "/images/games/conditional-matching/dirty-shirt.svg" },
                    { id: "l4p1_dark", emoji: "🕯️", label: "ถ้าห้องมืด", matchId: "l4p1_light", icon: "/images/games/conditional-matching/dark-room.svg" },
                    { id: "l4p1_hungry", emoji: "🤤", label: "ถ้าหิวข้าว", matchId: "l4p1_rice" },
                    { id: "l4p1_hand", emoji: "🖐️", label: "ถ้ามือเปื้อน", matchId: "l4p1_soap", icon: "/images/games/conditional-matching/dirty-hand.svg" },
                    { id: "l4p1_tooth", emoji: "🦷", label: "ถ้าปวดฟัน", matchId: "l4p1_dentist" },
                ],
                rightItems: [
                    { id: "l4p1_light", emoji: "💡", label: "ต้องเปิดไฟ", icon: "/images/games/conditional-matching/light-bulb.svg" },
                    { id: "l4p1_soap", emoji: "🧼", label: "ต้องล้างมือ" },
                    { id: "l4p1_rice", emoji: "🍚", label: "ต้องกินข้าว" },
                    { id: "l4p1_dentist", emoji: "🧑‍⚕️", label: "ไปหาหมอฟัน", icon: "/images/games/conditional-matching/dentist.svg" },
                    { id: "l4p1_wash", emoji: "🧺", label: "ต้องเอาไปซัก" },
                ],
            },
            {
                theme: "school", title: "ที่โรงเรียน",
                leftItems: [
                    { id: "l4p2_pencil", emoji: "✏️", label: "ถ้าดินสอหัก", matchId: "l4p2_sharpener", icon: "/images/games/conditional-matching/broken-pencil.svg" },
                    { id: "l4p2_mistake", emoji: "❌", label: "ถ้าเขียนผิด", matchId: "l4p2_eraser", icon: "/images/games/conditional-matching/writing-mistake.svg" },
                    { id: "l4p2_paper", emoji: "📄", label: "ถ้ากระดาษขาด", matchId: "l4p2_tape", icon: "/images/games/conditional-matching/torn-paper.svg" },
                    { id: "l4p2_book", emoji: "📚", label: "ถ้าจะเก็บหนังสือ", matchId: "l4p2_shelf" },
                    { id: "l4p2_test", emoji: "📝", label: "ถ้าจะสอบ", matchId: "l4p2_read" },
                ],
                rightItems: [
                    { id: "l4p2_sharpener", emoji: "✂️", label: "เปลี่ยนเเท่งใหม่ ", icon: "/images/games/conditional-matching/sharpener.svg" },
                    { id: "l4p2_eraser", emoji: "🧽", label: "ใช้ยางลบ", icon: "/images/games/conditional-matching/eraser.svg" },
                    { id: "l4p2_tape", emoji: "🩹", label: "ซ่อมกระดาษ" },
                    { id: "l4p2_shelf", emoji: "🗄️", label: "เก็บขึ้นชั้น" },
                    { id: "l4p2_read", emoji: "📖", label: "อ่านหนังสือ" },
                ],
            },
            {
                theme: "cooking", title: "ในห้องครัว",
                leftItems: [
                    { id: "l4p3_hot", emoji: "🥘", label: "ถ้าหม้อร้อน", matchId: "l4p3_glove" },
                    { id: "l4p3_spill", emoji: "💦", label: "ถ้าน้ำหก", matchId: "l4p3_mop" },
                    { id: "l4p3_cut", emoji: "🍎", label: "ถ้าจะหั่น", matchId: "l4p3_knife", icon: "/images/games/conditional-matching/cutting-board.svg" },
                    { id: "l4p3_fry", emoji: "🍳", label: "ถ้าจะทอด", matchId: "l4p3_fire" },
                    { id: "l4p3_smell", emoji: "👃", label: "ถ้าเหม็นคาว", matchId: "l4p3_window", icon: "/images/games/conditional-matching/fishy-smell.svg" },
                ],
                rightItems: [
                    { id: "l4p3_glove", emoji: "🧤", label: "ใส่ถุงมือกันร้อน" },
                    { id: "l4p3_mop", emoji: "🧽", label: "เอาผ้าเช็ด", icon: "/images/games/conditional-matching/wipe-cloth.svg" },
                    { id: "l4p3_knife", emoji: "🔪", label: "หยิบมีด" },
                    { id: "l4p3_fire", emoji: "🔥", label: "เปิดเตา", icon: "/images/games/conditional-matching/stove-fire.svg" },
                    { id: "l4p3_window", emoji: "🪟", label: "เปิดหน้าต่างระบาย" },
                ],
            },
            {
                theme: "bedroom", title: "ในห้องนอน",
                leftItems: [
                    { id: "l4p4_cold", emoji: "🥶", label: "ถ้าแอร์เย็น", matchId: "l4p4_ac", icon: "/images/games/conditional-matching/cold-ac.svg" },
                    { id: "l4p4_dark", emoji: "🌙", label: "ถ้าจะนอน", matchId: "l4p4_light", icon: "/images/games/conditional-matching/sleeping.svg" },
                    { id: "l4p4_messy", emoji: "🧸", label: "ถ้าของเล่นยังไม่เก็บ", matchId: "l4p4_box" },
                    { id: "l4p4_dust", emoji: "💨", label: "ถ้าฝุ่นเยอะ", matchId: "l4p4_mask" },
                    { id: "l4p4_wake", emoji: "⏰", label: "ถ้าต้องตื่นเช้า", matchId: "l4p4_alarm" },
                ],
                rightItems: [
                    { id: "l4p4_ac", emoji: "❄️", label: "ให้เบาแอร์", icon: "/images/games/conditional-matching/turn-down-ac.svg" },
                    { id: "l4p4_light", emoji: "💡", label: "ปิดไฟ" },
                    { id: "l4p4_box", emoji: "📦", label: "เก็บใส่กล่อง" },
                    { id: "l4p4_mask", emoji: "😷", label: "ให้ใส่หน้ากาก" },
                    { id: "l4p4_alarm", emoji: "📱", label: "ตั้งนาฬิกาปลุก" },
                ],
            },
        ],
    },
    5: {
        level: 5,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (หมวดสิ่งของ)",
        patterns: [
            {
                theme: "emergencies", title: "เหตุฉุกเฉิน",
                leftItems: [
                    { id: "l5p1_fire", emoji: "🔥", label: "ถ้าไฟไหม้", matchId: "l5p1_firetruck" },
                    { id: "l5p1_thief", emoji: "🥷", label: "ถ้าเจอขโมย", matchId: "l5p1_191" },
                    { id: "l5p1_drown", emoji: "🌊", label: "ถ้าจมน้ำ", matchId: "l5p1_rescue" },
                    { id: "l5p1_lost", emoji: "😰", label: "ถ้าหลงทาง", matchId: "l5p1_police" },
                    { id: "l5p1_sick", emoji: "🤕", label: "ถ้าไม่สบาย", matchId: "l5p1_doctor" },
                ],
                rightItems: [
                    { id: "l5p1_rescue", emoji: "🆘", label: "ร้องขอความช่วยเหลือ" },
                    { id: "l5p1_police", emoji: "👮", label: "แจ้งคุณตำรวจ" },
                    { id: "l5p1_doctor", emoji: "🏥", label: "ไปหาหมอ" },
                    { id: "l5p1_firetruck", emoji: "🚒", label: "เรียกรถดับเพลิง" },
                    { id: "l5p1_191", emoji: "📞", label: "โทร 191" },
                ],
            },
            {
                theme: "fixing", title: "ซ่อมแซม",
                leftItems: [
                    { id: "l5p2_nail", emoji: "📌", label: "ถ้าตอกตะปู", matchId: "l5p2_hammer", icon: "/images/games/conditional-matching/nail.svg" },
                    { id: "l5p2_screw", emoji: "🔩", label: "ถ้าไขน็อต", matchId: "l5p2_screwdriver" },
                    { id: "l5p2_glue", emoji: "🏺", label: "ถ้าของแตก", matchId: "l5p2_paste", icon: "/images/games/conditional-matching/broken-item.svg" },
                    { id: "l5p2_paint", emoji: "🎨", label: "ถ้าจะทาสี", matchId: "l5p2_brush" },
                    { id: "l5p2_measure", emoji: "📏", label: "ถ้าจะวัดความยาว", matchId: "l5p2_ruler", icon: "/images/games/conditional-matching/measure-length.svg" },
                ],
                rightItems: [
                    { id: "l5p2_hammer", emoji: "🔨", label: "ใช้ค้อน" },
                    { id: "l5p2_screwdriver", emoji: "🪛", label: "ใช้ไขควง" },
                    { id: "l5p2_paste", emoji: "🧴", label: "ทากาว" },
                    { id: "l5p2_brush", emoji: "🖌️", label: "หยิบพู่กัน" },
                    { id: "l5p2_ruler", emoji: "📏", label: "ใช้ไม้บรรทัด" },
                ],
            },
            {
                theme: "travel", title: "การเดินทาง",
                leftItems: [
                    { id: "l5p3_rain", emoji: "🌧️", label: "ถ้าฝนตกหนัก", matchId: "l5p3_umbrella" },
                    { id: "l5p3_far", emoji: "🌍", label: "ถ้าไปต่างประเทศ", matchId: "l5p3_plane" },
                    { id: "l5p3_river", emoji: "🌉", label: "ถ้าข้ามแม่น้ำ", matchId: "l5p3_bridge" },
                    { id: "l5p3_traffic", emoji: "🚦", label: "ถ้ารถติด", matchId: "l5p3_train" },
                    { id: "l5p3_near", emoji: "🚶", label: "ถ้าไปใกล้ๆ", matchId: "l5p3_walk" },
                ],
                rightItems: [
                    { id: "l5p3_umbrella", emoji: "☂️", label: "กางร่ม" },
                    { id: "l5p3_plane", emoji: "✈️", label: "นั่งเครื่องบิน" },
                    { id: "l5p3_bridge", emoji: "🌁", label: "ข้ามสะพาน" },
                    { id: "l5p3_train", emoji: "🚆", label: "ขึ้นรถไฟฟ้า" },
                    { id: "l5p3_walk", emoji: "👟", label: "เดินเท้า" },
                ],
            },
            {
                theme: "cleaning", title: "ทำความสะอาด",
                leftItems: [
                    { id: "l5p4_dust", emoji: "🌬️", label: "ถ้าพื้นมีฝุ่น", matchId: "l5p4_vacuum", icon: "/images/games/conditional-matching/dusty-floor.svg" },
                    { id: "l5p4_stain", emoji: "👟", label: "ถ้ารองเท้าเลอะ", matchId: "l5p4_shoes_clean" },
                    { id: "l5p4_leaves", emoji: "🍂", label: "ถ้าใบไม้เต็มพื้น", matchId: "l5p4_broom", icon: "/images/games/conditional-matching/fallen-leaves.svg" },
                    { id: "l5p4_trash", emoji: "🗑️", label: "ถ้าขยะเต็ม", matchId: "l5p4_bag" },
                    { id: "l5p4_window", emoji: "🪟", label: "ถ้ากระจกมัว", matchId: "l5p4_cloth", icon: "/images/games/conditional-matching/foggy-window.svg" },
                ],
                rightItems: [
                    { id: "l5p4_broom", emoji: "🧹", label: "ใช้ไม้กวาด" },
                    { id: "l5p4_cloth", emoji: "🧽", label: "เอาผ้าชุบน้ำเช็ด", icon: "/images/games/conditional-matching/wet-wipe-cloth.svg" },
                    { id: "l5p4_vacuum", emoji: "🧹", label: "ใช้เครื่องดูดฝุ่น", icon: "/images/games/conditional-matching/vacuum.svg" },
                    { id: "l5p4_bag", emoji: "🛍️", label: "มัดถุงไปทิ้ง", icon: "/images/games/conditional-matching/tie-trash-bag.svg" },
                    { id: "l5p4_shoes_clean", emoji: "🧴", label: "ทำความสะอาดรองเท้า" },
                ],
            },
        ],
    },
    6: {
        level: 6,
        difficulty: "normal",
        title: "จับคู่เหตุและผล (หมวดสิ่งของ)",
        patterns: [
            {
                theme: "needs", title: "ความต้องการพื้นฐาน",
                leftItems: [
                    { id: "l6p1_thirsty", emoji: "🥵", label: "ถ้าหิวน้ำ", matchId: "l6p1_drink" },
                    { id: "l6p1_flat", emoji: "🚲", label: "ถ้ายางแบน", matchId: "l6p1_pump" },
                    { id: "l6p1_trash", emoji: "🗑️", label: "ถ้ามีขยะ", matchId: "l6p1_bin" },
                    { id: "l6p1_write", emoji: "📝", label: "ถ้าจะเขียน", matchId: "l6p1_pencil" },
                    { id: "l6p1_sleepy", emoji: "🥱", label: "ถ้าง่วงนอน", matchId: "l6p1_bed" },
                ],
                rightItems: [
                    { id: "l6p1_pencil", emoji: "✏️", label: "หยิบดินสอ" },
                    { id: "l6p1_drink", emoji: "💧", label: "ต้องดื่มน้ำ" },
                    { id: "l6p1_bed", emoji: "🛏️", label: "ต้องไปนอน" },
                    { id: "l6p1_pump", emoji: "💨", label: "ต้องสูบลม" },
                    { id: "l6p1_bin", emoji: "🚮", label: "ทิ้งลงถัง" },
                ],
            },
            {
                theme: "garden", title: "ในสวน",
                leftItems: [
                    { id: "l6p2_plant", emoji: "🌱", label: "ถ้าต้นไม้แห้ง", matchId: "l6p2_water" },
                    { id: "l6p2_dig", emoji: "🕳️", label: "ถ้าจะขุดดิน", matchId: "l6p2_shovel" },
                    { id: "l6p2_weed", emoji: "🌿", label: "ถ้าหญ้ารก", matchId: "l6p2_cut" },
                    { id: "l6p2_fruit", emoji: "🍎", label: "ถ้าผลไม้สุก", matchId: "l6p2_pick" },
                    { id: "l6p2_bug", emoji: "🐛", label: "ถ้าแมลงกินใบ", matchId: "l6p2_spray" },
                ],
                rightItems: [
                    { id: "l6p2_water", emoji: "🚿", label: "รดน้ำต้นไม้" },
                    { id: "l6p2_shovel", emoji: "⛏️", label: "ใช้พลั่ว" },
                    { id: "l6p2_cut", emoji: "✂️", label: "ตัดหญ้า" },
                    { id: "l6p2_pick", emoji: "🧺", label: "เก็บใส่ตะกร้า" },
                    { id: "l6p2_spray", emoji: "🧴", label: "ฉีดยาไล่แมลง" },
                ],
            },
            {
                theme: "hygiene", title: "สุขอนามัย",
                leftItems: [
                    { id: "l6p3_bath", emoji: "🛁", label: "ถ้าจะอาบน้ำ", matchId: "l6p3_soap" },
                    { id: "l6p3_teeth", emoji: "😬", label: "ถ้าจะแปรงฟัน", matchId: "l6p3_brush" },
                    { id: "l6p3_hair", emoji: "💇", label: "ถ้าผมยาว", matchId: "l6p3_scissors" },
                    { id: "l6p3_nail", emoji: "💅", label: "ถ้าเล็บยาว", matchId: "l6p3_clipper" },
                    { id: "l6p3_wet", emoji: "💦", label: "ถ้าตัวเปียก", matchId: "l6p3_towel" },
                ],
                rightItems: [
                    { id: "l6p3_soap", emoji: "🧼", label: "ฟอกสบู่" },
                    { id: "l6p3_brush", emoji: "🪥", label: "ใช้แปรงสีฟัน" },
                    { id: "l6p3_scissors", emoji: "💈", label: "ตัดผม" },
                    { id: "l6p3_clipper", emoji: "✂️", label: "ตัดเล็บ" },
                    { id: "l6p3_towel", emoji: "🧻", label: "เช็ดตัวให้แห้ง" },
                ],
            },
            {
                theme: "gadgets", title: "อุปกรณ์ไอที",
                leftItems: [
                    { id: "l6p4_batt", emoji: "🔋", label: "ถ้าแบตหมด", matchId: "l6p4_charge" },
                    { id: "l6p4_call", emoji: "📞", label: "ถ้าจะโทรหา", matchId: "l6p4_phone", icon: "/images/games/conditional-matching/phone-call.svg" },
                    { id: "l6p4_photo", emoji: "📸", label: "ถ้าจะถ่ายรูป", matchId: "l6p4_camera" },
                    { id: "l6p4_music", emoji: "🎵", label: "ถ้าอยากฟังเพลง", matchId: "l6p4_headphone", icon: "/images/games/conditional-matching/listen-music.svg" },
                    { id: "l6p4_print", emoji: "🖨️", label: "ถ้าจะปริ้นงาน", matchId: "l6p4_printer" },
                ],
                rightItems: [
                    { id: "l6p4_charge", emoji: "🔌", label: "ชาร์จแบต", icon: "/images/games/conditional-matching/charger.svg" },
                    { id: "l6p4_phone", emoji: "📱", label: "ใช้โทรศัพท์" },
                    { id: "l6p4_camera", emoji: "📷", label: "ใช้กล้องถ่ายรูป", icon: "/images/games/conditional-matching/camera.svg" },
                    { id: "l6p4_headphone", emoji: "🎧", label: "ใส่หูฟัง" },
                    { id: "l6p4_printer", emoji: "📄", label: "ใส่กระดาษ" },
                ],
            },
        ],
    },
    7: {
        level: 7,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (หมวดสภาพอากาศ)",
        patterns: [
            {
                theme: "weather_clothes", title: "สภาพอากาศและการแต่งกาย",
                leftItems: [
                    { id: "l7p1_rain", emoji: "🌧️", label: "ถ้าฝนตก", matchId: "l7p1_umbrella" },
                    { id: "l7p1_cold", emoji: "🤧", label: "ถ้าหนาว", matchId: "l7p1_jacket" },
                    { id: "l7p1_sun", emoji: "☀️", label: "ถ้าแดดร้อน", matchId: "l7p1_hat" },
                    { id: "l7p1_plant", emoji: "🌱", label: "ถ้าปลูกต้นไม้", matchId: "l7p1_water" },
                    { id: "l7p1_wind", emoji: "🌬️", label: "ถ้าลมแรง", matchId: "l7p1_kite" },
                    { id: "l7p1_snow", emoji: "⛄", label: "ถ้าหิมะตก", matchId: "l7p1_glove" },
                ],
                rightItems: [
                    { id: "l7p1_jacket", emoji: "🧥", label: "ใส่เสื้อหนาว" },
                    { id: "l7p1_kite", emoji: "🪁", label: "เล่นว่าว" },
                    { id: "l7p1_hat", emoji: "🧢", label: "ใส่หมวก" },
                    { id: "l7p1_umbrella", emoji: "☂️", label: "ต้องกางร่ม" },
                    { id: "l7p1_glove", emoji: "🧤", label: "ใส่ถุงมือ" },
                    { id: "l7p1_water", emoji: "🚿", label: "รดน้ำต้นไม้" },
                ],
            },
            {
                theme: "weather_activities", title: "กิจกรรมในแต่ละวัน",
                leftItems: [
                    { id: "l7p2_sunny", emoji: "🌞", label: "ถ้าอากาศดี", matchId: "l7p2_park" },
                    { id: "l7p2_rainy", emoji: "⛈️", label: "ถ้าพายุเข้า", matchId: "l7p2_home" },
                    { id: "l7p2_windy", emoji: "🍃", label: "ถ้าลมเย็น", matchId: "l7p2_bike" },
                    { id: "l7p2_snowy", emoji: "❄️", label: "ถ้าหิมะหนา", matchId: "l7p2_snowman" },
                    { id: "l7p2_cloudy", emoji: "☁️", label: "ถ้าครึ้มฟ้า", matchId: "l7p2_hurry" },
                    { id: "l7p2_hot", emoji: "🔥", label: "ถ้าร้อนจัด", matchId: "l7p2_swim" },
                ],
                rightItems: [
                    { id: "l7p2_park", emoji: "🏞️", label: "ไปวิ่งเล่นที่สวน" },
                    { id: "l7p2_home", emoji: "🏠", label: "อยู่บ้านดีกว่า" },
                    { id: "l7p2_bike", emoji: "🚲", label: "ปั่นจักรยาน" },
                    { id: "l7p2_snowman", emoji: "⛄", label: "ปั้นตุ๊กตาหิมะ" },
                    { id: "l7p2_hurry", emoji: "🏃", label: "รีบกลับบ้าน" },
                    { id: "l7p2_swim", emoji: "🏊", label: "ไปว่ายน้ำ" },
                ],
            },
            {
                theme: "nature", title: "ธรรมชาติรอบตัว",
                leftItems: [
                    { id: "l7p3_seed", emoji: "🌰", label: "ถ้ามีเมล็ดพืช", matchId: "l7p3_plant" },
                    { id: "l7p3_flower", emoji: "🌷", label: "ถ้าดอกไม้หอม", matchId: "l7p3_butterfly" },
                    { id: "l7p3_leaf", emoji: "🍂", label: "ถ้าใบไม้ร่วง", matchId: "l7p3_sweep" },
                    { id: "l7p3_mud", emoji: "💧", label: "ถ้าพื้นแฉะ", matchId: "l7p3_boots" },
                    { id: "l7p3_sun", emoji: "🌅", label: "ถ้าพระอาทิตย์ขึ้น", matchId: "l7p3_wake" },
                    { id: "l7p3_moon", emoji: "🌙", label: "ถ้าพระอาทิตย์ตก", matchId: "l7p3_sleep", icon: "/images/games/conditional-matching/sunset.svg" },
                ],
                rightItems: [
                    { id: "l7p3_plant", emoji: "🌱", label: "ปลูกลงดิน" },
                    { id: "l7p3_butterfly", emoji: "🦋", label: "ผีเสื้อบินมา" },
                    { id: "l7p3_sweep", emoji: "🧹", label: "กวาดลานบ้าน" },
                    { id: "l7p3_boots", emoji: "👢", label: "ใส่รองเท้าบูท" },
                    { id: "l7p3_wake", emoji: "🐓", label: "ไก่ขันตอนเช้า" },
                    { id: "l7p3_sleep", emoji: "😴", label: "เข้านอน" },
                ],
            },
            {
                theme: "travel", title: "เตรียมตัวเดินทาง",
                leftItems: [
                    { id: "l7p4_beach", emoji: "🏖️", label: "ถ้าไปทะเล", matchId: "l7p4_swimsuit" },
                    { id: "l7p4_mountain", emoji: "⛰️", label: "ถ้าขึ้นเขา", matchId: "l7p4_shoes" },
                    { id: "l7p4_camping", emoji: "⛺", label: "ถ้าตั้งแคมป์", matchId: "l7p4_tent" },
                    { id: "l7p4_abroad", emoji: "🛫", label: "ถ้าจะขึ้นเครื่องบิน", matchId: "l7p4_passport" },
                    { id: "l7p4_picnic", emoji: "🧺", label: "ถ้าไปปิกนิก", matchId: "l7p4_mat" },
                    { id: "l7p4_roadtrip", emoji: "🚗", label: "ถ้าขับรถไกล", matchId: "l7p4_gas" },
                ],
                rightItems: [
                    { id: "l7p4_swimsuit", emoji: "🩱", label: "เตรียมชุดว่ายน้ำ" },
                    { id: "l7p4_shoes", emoji: "🥾", label: "ใส่รองเท้าปีนเขา" },
                    { id: "l7p4_tent", emoji: "🏕️", label: "กางเต็นท์" },
                    { id: "l7p4_passport", emoji: "🛂", label: "อย่าลืมพาสปอร์ต" },
                    { id: "l7p4_mat", emoji: "🟫", label: "ปูเสื่อ", icon: "/images/games/conditional-matching/picnic-mat.svg" },
                    { id: "l7p4_gas", emoji: "⛽", label: "เติมน้ำมัน" },
                ],
            },
        ],
    },
    8: {
        level: 8,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (หมวดสภาพอากาศ)",
        patterns: [
            {
                theme: "weather_extreme", title: "รับมือสภาพอากาศ",
                leftItems: [
                    { id: "l8p1_storm", emoji: "⚡", label: "ถ้าฟ้าผ่า", matchId: "l8p1_house" },
                    { id: "l8p1_flood", emoji: "🌊", label: "ถ้าน้ำท่วม", matchId: "l8p1_boat" },
                    { id: "l8p1_fog", emoji: "🌫️", label: "ถ้าหมอกลง", matchId: "l8p1_flashlight" },
                    { id: "l8p1_rainbow", emoji: "🌈", label: "ถ้ามีรุ้ง", matchId: "l8p1_camera" },
                    { id: "l8p1_flower", emoji: "🌷", label: "ถ้าดอกไม้บาน", matchId: "l8p1_bee" },
                    { id: "l8p1_leaf", emoji: "🍂", label: "ถ้าลานบ้านรก", matchId: "l8p1_sweep" },
                    { id: "l8p1_camp", emoji: "🏕️", label: "ถ้ากลางคืนเย็น", matchId: "l8p1_fire" },
                ],
                rightItems: [
                    { id: "l8p1_flashlight", emoji: "🔦", label: "เปิดไฟฉาย" },
                    { id: "l8p1_camera", emoji: "📷", label: "ถ่ายรูป" },
                    { id: "l8p1_house", emoji: "🏠", label: "หลบในบ้าน" },
                    { id: "l8p1_bee", emoji: "🐝", label: "ผึ้งมาตอม" },
                    { id: "l8p1_boat", emoji: "🛶", label: "พายเรือ" },
                    { id: "l8p1_fire", emoji: "🔥", label: "ก่อกองไฟ" },
                    { id: "l8p1_sweep", emoji: "🧹", label: "กวาดใบไม้" },
                ],
            },
            {
                theme: "city_life", title: "ชีวิตในเมือง",
                leftItems: [
                    { id: "l8p2_traffic", emoji: "🎢", label: "ถ้าเข้าสวนสนุก", matchId: "l8p2_wait" },
                    { id: "l8p2_subway", emoji: "🚇", label: "ถ้านั่งรถไฟใต้ดิน", matchId: "l8p2_card" },
                    { id: "l8p2_shop", emoji: "🛒", label: "ถ้าไปซื้อของ", matchId: "l8p2_bag" },
                    { id: "l8p2_cross", emoji: "🚶", label: "ถ้าจะข้ามถนน", matchId: "l8p2_bridge" },
                    { id: "l8p2_lost", emoji: "🗺️", label: "ถ้าหลงทาง", matchId: "l8p2_map", icon: "/images/games/conditional-matching/lost-map.svg" },
                    { id: "l8p2_dirty", emoji: "🍱", label: "ถ้ากล่องข้าวหมด", matchId: "l8p2_bin" },
                    { id: "l8p2_noise", emoji: "📢", label: "ถ้าเสียงดัง", matchId: "l8p2_ear" },
                ],
                rightItems: [
                    { id: "l8p2_wait", emoji: "⏳", label: "ต้องรอคิว" },
                    { id: "l8p2_card", emoji: "💳", label: "ใช้บัตรแตะ" },
                    { id: "l8p2_bag", emoji: "🛍️", label: "พกถุงผ้า" },
                    { id: "l8p2_bridge", emoji: "🌉", label: "ขึ้นสะพานลอย" },
                    { id: "l8p2_map", emoji: "📱", label: "เปิดแผนที่", icon: "/images/games/conditional-matching/open-map-app.svg" },
                    { id: "l8p2_bin", emoji: "🗑️", label: "ทิ้งลงถัง" },
                    { id: "l8p2_ear", emoji: "🎧", label: "อุดหู" },
                ],
            },
            {
                theme: "health", title: "ดูแลสุขภาพ",
                leftItems: [
                    { id: "l8p3_sick", emoji: "🤒", label: "ถ้ามีไข้", matchId: "l8p3_medicine", icon: "/images/games/conditional-matching/fever.svg" },
                    { id: "l8p3_cut", emoji: "🩸", label: "ถ้าโดนบาด", matchId: "l8p3_plaster", icon: "/images/games/conditional-matching/wound.svg" },
                    { id: "l8p3_sunburn", emoji: "🥵", label: "ถ้าตากแดด", matchId: "l8p3_lotion", icon: "/images/games/conditional-matching/sunburn.svg" },
                    { id: "l8p3_tired", emoji: "😮‍💨", label: "ถ้าเหนื่อยล้า", matchId: "l8p3_rest", icon: "/images/games/conditional-matching/tired.svg" },
                    { id: "l8p3_dirty_hand", emoji: "🦠", label: "ถ้าเจอเชื้อโรค", matchId: "l8p3_wash", icon: "/images/games/conditional-matching/germs.svg" },
                    { id: "l8p3_cough", emoji: "🤧", label: "ถ้าไอ", matchId: "l8p3_mask", icon: "/images/games/conditional-matching/cough.svg" },
                    { id: "l8p3_tooth", emoji: "🦷", label: "ถ้าฟันผุ", matchId: "l8p3_dentist", icon: "/images/games/conditional-matching/cavity.svg" },
                ],
                rightItems: [
                    { id: "l8p3_medicine", emoji: "💊", label: "กินยา", icon: "/images/games/conditional-matching/medicine.svg" },
                    { id: "l8p3_plaster", emoji: "🩹", label: "ติดพลาสเตอร์", icon: "/images/games/conditional-matching/plaster.svg" },
                    { id: "l8p3_lotion", emoji: "🧴", label: "ทาครีมกันแดด", icon: "/images/games/conditional-matching/sunscreen.svg" },
                    { id: "l8p3_rest", emoji: "�", label: "พักผ่อน", icon: "/images/games/conditional-matching/rest-bed.svg" },
                    { id: "l8p3_wash", emoji: "🧼", label: "ล้างมือ", icon: "/images/games/conditional-matching/hand-wash.svg" },
                    { id: "l8p3_mask", emoji: "😷", label: "ใส่หน้ากาก", icon: "/images/games/conditional-matching/face-mask.svg" },
                    { id: "l8p3_dentist", emoji: "🧑‍⚕️", label: "ไปหาหมอฟัน", icon: "/images/games/conditional-matching/dentist.svg" },
                ],
            },
            {
                theme: "jobs", title: "อาชีพต่างๆ",
                leftItems: [
                    { id: "l8p4_fire", emoji: "⚠️", label: "ถ้าแก๊สรั่ว", matchId: "l8p4_fireman" },
                    { id: "l8p4_sick", emoji: "🤢", label: "ถ้าอาหารเป็นพิษ", matchId: "l8p4_doctor" },
                    { id: "l8p4_learn", emoji: "❓", label: "ถ้าเข้าใจไม่ได้", matchId: "l8p4_teacher" },
                    { id: "l8p4_food", emoji: "🍽️", label: "ถ้าอยู่ร้านอาหาร", matchId: "l8p4_chef" },
                    { id: "l8p4_thief", emoji: "🚨", label: "ถ้าเกิดอุบัติเหตุ", matchId: "l8p4_police" },
                    { id: "l8p4_hair", emoji: "🪞", label: "ถ้าต้องการแต่งผม", matchId: "l8p4_barber" },
                    { id: "l8p4_pipe", emoji: "🚰", label: "ถ้าท่อแตก", matchId: "l8p4_plumber" },
                ],
                rightItems: [
                    { id: "l8p4_fireman", emoji: "🚒", label: "เรียกนักดับเพลิง" },
                    { id: "l8p4_doctor", emoji: "👨‍⚕️", label: "ไปหาหมอ" },
                    { id: "l8p4_teacher", emoji: "👩‍🏫", label: "หาคุณครู" },
                    { id: "l8p4_chef", emoji: "👨‍🍳", label: "สั่งกับพ่อครัว" },
                    { id: "l8p4_police", emoji: "🚓", label: "แจ้งตำรวจ" },
                    { id: "l8p4_barber", emoji: "✂️", label: "ไปร้านตัดผม" },
                    { id: "l8p4_plumber", emoji: "🔧", label: "เรียกช่างประปา" },
                ],
            },
        ],
    },
    9: {
        level: 9,
        difficulty: "hard",
        title: "จับคู่เหตุและผล (หมวดรวม)",
        patterns: [
            {
                theme: "mixed_1", title: "รวมมิตร ชุด 1",
                leftItems: [
                    { id: "l9p1_rain", emoji: "🌧️", label: "ถ้าฝนตก", matchId: "l9p1_umbrella" },
                    { id: "l9p1_cold", emoji: "🤧", label: "ถ้าหนาว", matchId: "l9p1_jacket" },
                    { id: "l9p1_sun", emoji: "☀️", label: "ถ้าแดดร้อน", matchId: "l9p1_hat" },
                    { id: "l9p1_plant", emoji: "🌱", label: "ถ้าปลูกต้นไม้", matchId: "l9p1_water" },
                    { id: "l9p1_wind", emoji: "🌬️", label: "ถ้าลมแรง", matchId: "l9p1_kite" },
                    { id: "l9p1_storm", emoji: "⚡", label: "ถ้าพายุเข้า", matchId: "l9p1_house" },
                    { id: "l9p1_flood", emoji: "🌊", label: "ถ้าน้ำท่วม", matchId: "l9p1_boat" },
                    { id: "l9p1_fog", emoji: "🌫️", label: "ถ้าหมอกลง", matchId: "l9p1_flashlight" },
                ],
                rightItems: [
                    { id: "l9p1_boat", emoji: "🛶", label: "พายเรือ" },
                    { id: "l9p1_hat", emoji: "🧢", label: "ใส่หมวก" },
                    { id: "l9p1_flashlight", emoji: "🔦", label: "เปิดไฟฉาย" },
                    { id: "l9p1_house", emoji: "🏠", label: "หลบในบ้าน" },
                    { id: "l9p1_jacket", emoji: "🧥", label: "ใส่เสื้อหนาว" },
                    { id: "l9p1_kite", emoji: "🪁", label: "เล่นว่าว" },
                    { id: "l9p1_umbrella", emoji: "☂️", label: "ต้องกางร่ม" },
                    { id: "l9p1_water", emoji: "🚿", label: "รดน้ำต้นไม้" },
                ],
            },
            {
                theme: "mixed_2", title: "รวมมิตร ชุด 2",
                leftItems: [
                    { id: "l9p2_dog", emoji: "🐶", label: "ถ้าหมาหิว", matchId: "l9p2_bone" },
                    { id: "l9p2_cat", emoji: "🐱", label: "ถ้าแมวหิว", matchId: "l9p2_fish" },
                    { id: "l9p2_bird", emoji: "🐦", label: "ถ้านกง่วง", matchId: "l9p2_nest" },
                    { id: "l9p2_bee", emoji: "🐝", label: "ถ้าผึ้งทำรัง", matchId: "l9p2_hive" },
                    { id: "l9p2_dirty", emoji: "👕", label: "ถ้าเสื้อเลอะ", matchId: "l9p2_wash" },
                    { id: "l9p2_hungry", emoji: "🤤", label: "ถ้าหิวข้าว", matchId: "l9p2_rice" },
                    { id: "l9p2_fire", emoji: "🔥", label: "ถ้าไฟไหม้", matchId: "l9p2_firetruck" },
                    { id: "l9p2_sick", emoji: "🤕", label: "ถ้าไม่สบาย", matchId: "l9p2_doctor" },
                ],
                rightItems: [
                    { id: "l9p2_bone", emoji: "🦴", label: "ให้กระดูก" },
                    { id: "l9p2_fish", emoji: "🐟", label: "ให้กินปลา" },
                    { id: "l9p2_nest", emoji: "🪹", label: "กลับไปที่รัง" },
                    { id: "l9p2_hive", emoji: "🐝", label: "ไปที่รังผึ้ง", icon: "/images/games/conditional-matching/beehive.svg" },
                    { id: "l9p2_wash", emoji: "🧺", label: "ต้องเอาไปซัก" },
                    { id: "l9p2_rice", emoji: "🍚", label: "ต้องกินข้าว" },
                    { id: "l9p2_firetruck", emoji: "🚒", label: "เรียกรถดับเพลิง" },
                    { id: "l9p2_doctor", emoji: "🏥", label: "ไปหาหมอ" },
                ],
            },
            {
                theme: "mixed_3", title: "รวมมิตร ชุด 3",
                leftItems: [
                    { id: "l9p3_thief", emoji: "🦹", label: "ถ้าเจอขโมย", matchId: "l9p3_police" },
                    { id: "l9p3_letter", emoji: "✉️", label: "ถ้าส่งจดหมาย", matchId: "l9p3_postbox" },
                    { id: "l9p3_learn", emoji: "🏫", label: "ถ้าอยากเก่ง", matchId: "l9p3_teacher" },
                    { id: "l9p3_thirsty", emoji: "🥵", label: "ถ้าหิวน้ำ", matchId: "l9p3_drink" },
                    { id: "l9p3_flat", emoji: "🚲", label: "ถ้ายางแบน", matchId: "l9p3_pump" },
                    { id: "l9p3_trash", emoji: "🗑️", label: "ถ้ามีขยะ", matchId: "l9p3_bin" },
                    { id: "l9p3_write", emoji: "📝", label: "ถ้าจะเขียน", matchId: "l9p3_pencil" },
                    { id: "l9p3_sleepy", emoji: "🥱", label: "ถ้าง่วงนอน", matchId: "l9p3_bed" },
                ],
                rightItems: [
                    { id: "l9p3_police", emoji: "🚓", label: "เรียกตำรวจ" },
                    { id: "l9p3_postbox", emoji: "📬", label: "ไปตู้ไปรษณีย์" },
                    { id: "l9p3_teacher", emoji: "👩‍🏫", label: "ตั้งใจเรียน" },
                    { id: "l9p3_drink", emoji: "💧", label: "ต้องดื่มน้ำ" },
                    { id: "l9p3_pump", emoji: "💨", label: "ต้องสูบลม" },
                    { id: "l9p3_bin", emoji: "🚮", label: "ทิ้งลงถัง" },
                    { id: "l9p3_pencil", emoji: "✏️", label: "หยิบดินสอ" },
                    { id: "l9p3_bed", emoji: "🛏️", label: "ต้องไปนอน" },
                ],
            },
            {
                theme: "mixed_4", title: "รวมมิตร ชุด 4",
                leftItems: [
                    { id: "l9p4_spider", emoji: "🕷️", label: "ถ้าแมงมุมหิว", matchId: "l9p4_web" },
                    { id: "l9p4_frog", emoji: "🐸", label: "ถ้ากบเจอแมลง", matchId: "l9p4_tongue" },
                    { id: "l9p4_hen", emoji: "🐔", label: "ถ้าไก่ออกไข่", matchId: "l9p4_egg" },
                    { id: "l9p4_rabbit", emoji: "🐇", label: "ถ้ากระต่ายหิว", matchId: "l9p4_carrot" },
                    { id: "l9p4_monkey", emoji: "🐒", label: "ถ้าลิงหิว", matchId: "l9p4_banana" },
                    { id: "l9p4_panda", emoji: "🐼", label: "ถ้าแพนด้าหิว", matchId: "l9p4_bamboo" },
                    { id: "l9p4_bear", emoji: "🐻", label: "ถ้าหมีหนาว", matchId: "l9p4_cave" },
                    { id: "l9p4_dolphin", emoji: "🐬", label: "ถ้าปลาอยากว่าย", matchId: "l9p4_ocean" },
                ],
                rightItems: [
                    { id: "l9p4_web", emoji: "🕸️", label: "ก็ชักใย" },
                    { id: "l9p4_tongue", emoji: "👅", label: "แลบลิ้นจับ" },
                    { id: "l9p4_egg", emoji: "🥚", label: "ก็เก็บไข่" },
                    { id: "l9p4_carrot", emoji: "🥕", label: "ให้กินแครอท" },
                    { id: "l9p4_banana", emoji: "🍌", label: "ให้กินกล้วย" },
                    { id: "l9p4_bamboo", emoji: "🎋", label: "ให้กินไผ่" },
                    { id: "l9p4_cave", emoji: "⛰️", label: "หลบในถ้ำ", icon: "/images/games/conditional-matching/cave.svg" },
                    { id: "l9p4_ocean", emoji: "🌊", label: "ไปที่ทะเล" },
                ],
            },
        ],
    },
};
