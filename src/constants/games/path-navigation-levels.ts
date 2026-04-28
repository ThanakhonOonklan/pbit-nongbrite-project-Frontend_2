
export type Direction = "up" | "down" | "left" | "right";
export type Difficulty = "easy" | "normal" | "hard";

export interface PathTile {
    row: number;
    col: number;
}

export interface PathNavLevelConfig {
    level: number;
    difficulty: Difficulty;
    gridCols: number;
    gridRows: number;
    startPos: PathTile;
    nongBritePos: PathTile;
    homePos: PathTile;
    blockedTiles: PathTile[];
}

// ── Pattern Sets: 4 patterns per level ───────────────────────────────────────
// homePos สุ่มต่างกันแต่ละ pattern / S,N ไม่จำเป็นต้องอยู่มุมเสมอ
// rock count: L1-3=3, L4-6=4, L7=7, L8=8, L9=10
export const PATH_PATTERN_SETS: Record<number, PathNavLevelConfig[]> = {

    1: [
        // A — S bottom-left, N top-right, H bottom-right
        {
            level: 1, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 3, col: 3 },
            startPos: { row: 3, col: 0 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 3, col: 2 }]
        },
        // B — S top-left, N bottom, H top-right
        {
            level: 1, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 0, col: 3 },
            startPos: { row: 0, col: 0 }, nongBritePos: { row: 3, col: 2 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 3 }]
        },
        // C — S top-right, N mid-right, H bottom-left
        {
            level: 1, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 3, col: 0 },
            startPos: { row: 0, col: 1 }, nongBritePos: { row: 2, col: 3 },
            blockedTiles: [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 2 }]
        },
        // D — S bottom-mid, N top-right, H top-left
        {
            level: 1, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 0, col: 0 },
            startPos: { row: 3, col: 1 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 0, col: 2 }, { row: 1, col: 0 }, { row: 2, col: 1 }]
        },
    ],

    2: [
        // A — S top-right, N mid-right, H mid-left
        {
            level: 2, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 1, col: 0 },
            startPos: { row: 0, col: 3 }, nongBritePos: { row: 2, col: 2 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1 }]
        },
        // B — S top-left, N bottom-left, H mid-right
        {
            level: 2, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 1, col: 3 },
            startPos: { row: 0, col: 0 }, nongBritePos: { row: 3, col: 0 },
            blockedTiles: [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 3, col: 1 }]
        },
        // C — S top-left, N bottom-left, H mid-right
        {
            level: 2, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 2, col: 3 },
            startPos: { row: 0, col: 0 }, nongBritePos: { row: 3, col: 0 },
            blockedTiles: [{ row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 }]
        },
        // D — S top-right, N top-mid, H bottom-left
        {
            level: 2, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 3, col: 0 },
            startPos: { row: 0, col: 3 }, nongBritePos: { row: 0, col: 1 },
            blockedTiles: [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 3, col: 2 }]
        },
    ],

    3: [
        // A — S bottom-left, N top-right, H bottom-right
        {
            level: 3, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 3, col: 3 },
            startPos: { row: 3, col: 0 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 1, col: 3 }]
        },
        // B — S bottom-left, N mid-left, H top-right
        {
            level: 3, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 0, col: 3 },
            startPos: { row: 3, col: 0 }, nongBritePos: { row: 1, col: 0 },
            blockedTiles: [{ row: 2, col: 0 }, { row: 0, col: 1 }, { row: 2, col: 2 }]
        },
        // C — S top-right, N mid-left, H mid-right
        {
            level: 3, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 2, col: 3 },
            startPos: { row: 0, col: 3 }, nongBritePos: { row: 2, col: 1 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 0 }, { row: 3, col: 1 }]
        },
        // D — S bottom-right, N top-right, H mid-left
        {
            level: 3, difficulty: "easy", gridCols: 4, gridRows: 4, homePos: { row: 2, col: 1 },
            startPos: { row: 3, col: 3 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 3, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 1 }]
        },
    ],

    4: [
        // A — S bottom-left, N top-mid, H bottom-right (5×5)
        {
            level: 4, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 4, col: 4 },
            startPos: { row: 4, col: 0 }, nongBritePos: { row: 0, col: 2 },
            blockedTiles: [{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 3, col: 2 }]
        },
        // B — S center, N bottom-mid, H top-mid
        {
            level: 4, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 0, col: 2 },
            startPos: { row: 2, col: 2 }, nongBritePos: { row: 4, col: 2 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 1, col: 2 }, { row: 3, col: 2 }, { row: 3, col: 4 }]
        },
        // C — S bottom-mid-right, N top-mid-right, H mid-left
        {
            level: 4, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 2, col: 0 },
            startPos: { row: 4, col: 3 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 1 }]
        },
        // D — S bottom-mid-right, N top-mid-right, H mid-left
        {
            level: 4, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 2, col: 0 },
            startPos: { row: 4, col: 3 }, nongBritePos: { row: 0, col: 3 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 4, col: 1 }]
        },
    ],

    5: [
        // A — S center, N top-left, H bottom-right
        {
            level: 5, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 4, col: 4 },
            startPos: { row: 2, col: 2 }, nongBritePos: { row: 0, col: 0 },
            blockedTiles: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 3, col: 1 }, { row: 3, col: 3 }]
        },
        // B — S bottom-mid, N bottom-right, H top-right
        {
            level: 5, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 0, col: 4 },
            startPos: { row: 4, col: 1 }, nongBritePos: { row: 4, col: 4 },
            blockedTiles: [{ row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 3 }, { row: 4, col: 3 }]
        },
        // C — S center, N mid-right, H bottom-left
        {
            level: 5, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 4, col: 0 },
            startPos: { row: 2, col: 2 }, nongBritePos: { row: 3, col: 4 },
            blockedTiles: [{ row: 1, col: 0 }, { row: 2, col: 3 }, { row: 3, col: 1 }, { row: 4, col: 3 }]
        },
        // D — S top-right, N bottom-mid-left, H top-left
        {
            level: 5, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 0, col: 0 },
            startPos: { row: 0, col: 4 }, nongBritePos: { row: 3, col: 1 },
            blockedTiles: [{ row: 0, col: 3 }, { row: 1, col: 1 }, { row: 3, col: 2 }, { row: 4, col: 1 }]
        },
    ],

    6: [
        // A — S top-mid-right, N bottom-mid-left, H top-left
        {
            level: 6, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 0, col: 0 },
            startPos: { row: 1, col: 3 }, nongBritePos: { row: 4, col: 1 },
            blockedTiles: [{ row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 3 }, { row: 3, col: 1 }]
        },
        // B — S top-mid-left, N bottom-mid-left, H top-right
        {
            level: 6, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 1, col: 4 },
            startPos: { row: 1, col: 1 }, nongBritePos: { row: 4, col: 1 },
            blockedTiles: [{ row: 1, col: 3 }, { row: 2, col: 1 }, { row: 3, col: 2 }, { row: 4, col: 3 }]
        },
        // C — S mid-left, N top-right, H bottom-left
        {
            level: 6, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 4, col: 0 },
            startPos: { row: 1, col: 0 }, nongBritePos: { row: 0, col: 4 },
            blockedTiles: [{ row: 1, col: 1 }, { row: 2, col: 0 }, { row: 2, col: 3 }, { row: 4, col: 2 }]
        },
        // D — S top-mid-left, N bottom-left, H top-right
        {
            level: 6, difficulty: "normal", gridCols: 5, gridRows: 5, homePos: { row: 0, col: 4 },
            startPos: { row: 0, col: 1 }, nongBritePos: { row: 4, col: 0 },
            blockedTiles: [{ row: 0, col: 3 }, { row: 2, col: 3 }, { row: 3, col: 0 }, { row: 3, col: 1 }]
        },
    ],

    7: [
        // A — S bottom-left, N top-right, H bottom-right
        {
            level: 7, difficulty: "hard", gridCols: 6, gridRows: 5, homePos: { row: 4, col: 5 },
            startPos: { row: 4, col: 0 }, nongBritePos: { row: 0, col: 5 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 1, col: 4 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 1 }, { row: 3, col: 4 }, { row: 4, col: 3 }]
        },
        // B — S bottom-left, N mid-interior, H top-right
        {
            level: 7, difficulty: "hard", gridCols: 6, gridRows: 5, homePos: { row: 0, col: 5 },
            startPos: { row: 4, col: 0 }, nongBritePos: { row: 2, col: 3 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 3, col: 2 }, { row: 3, col: 4 }, { row: 4, col: 3 }, { row: 2, col: 5 }]
        },
        // C — S bottom-right, N mid-interior, H top-left
        {
            level: 7, difficulty: "hard", gridCols: 6, gridRows: 5, homePos: { row: 0, col: 0 },
            startPos: { row: 4, col: 5 }, nongBritePos: { row: 2, col: 2 },
            blockedTiles: [{ row: 0, col: 2 }, { row: 0, col: 4 }, { row: 1, col: 2 }, { row: 1, col: 4 }, { row: 3, col: 1 }, { row: 3, col: 5 }, { row: 4, col: 1 }]
        },
        // D — S top-right, N mid-interior, H bottom-left
        {
            level: 7, difficulty: "hard", gridCols: 6, gridRows: 5, homePos: { row: 4, col: 0 },
            startPos: { row: 0, col: 5 }, nongBritePos: { row: 2, col: 3 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 0, col: 3 }, { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 3, col: 0 }, { row: 3, col: 3 }, { row: 4, col: 3 }]
        },
    ],

    8: [
        // A — S bottom-left, N top-right, H bottom-right
        {
            level: 8, difficulty: "hard", gridCols: 6, gridRows: 6, homePos: { row: 5, col: 5 },
            startPos: { row: 5, col: 0 }, nongBritePos: { row: 0, col: 5 },
            blockedTiles: [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 4 }, { row: 2, col: 5 }, { row: 3, col: 1 }, { row: 3, col: 4 }, { row: 4, col: 2 }, { row: 5, col: 2 }]
        },
        // B — S bottom-left, N mid-left, H top-right
        {
            level: 8, difficulty: "hard", gridCols: 6, gridRows: 6, homePos: { row: 0, col: 5 },
            startPos: { row: 5, col: 0 }, nongBritePos: { row: 3, col: 0 },
            blockedTiles: [{ row: 1, col: 2 }, { row: 1, col: 4 }, { row: 2, col: 3 }, { row: 2, col: 5 }, { row: 3, col: 2 }, { row: 4, col: 3 }, { row: 5, col: 2 }, { row: 5, col: 4 }]
        },
        // C — S top-right, N top-mid, H bottom-left
        {
            level: 8, difficulty: "hard", gridCols: 6, gridRows: 6, homePos: { row: 5, col: 0 },
            startPos: { row: 0, col: 5 }, nongBritePos: { row: 0, col: 2 },
            blockedTiles: [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 4 }, { row: 2, col: 4 }, { row: 3, col: 1 }, { row: 3, col: 5 }, { row: 4, col: 1 }, { row: 4, col: 4 }]
        },
        // D — S bottom-right, N bottom-mid, H top-left
        {
            level: 8, difficulty: "hard", gridCols: 6, gridRows: 6, homePos: { row: 0, col: 0 },
            startPos: { row: 5, col: 5 }, nongBritePos: { row: 5, col: 2 },
            blockedTiles: [{ row: 0, col: 3 }, { row: 1, col: 1 }, { row: 1, col: 4 }, { row: 2, col: 4 }, { row: 3, col: 0 }, { row: 3, col: 4 }, { row: 4, col: 1 }, { row: 5, col: 0 }]
        },
    ],

    9: [
        // A — S bottom-left, N top-right, H bottom-right
        {
            level: 9, difficulty: "hard", gridCols: 7, gridRows: 7, homePos: { row: 6, col: 6 },
            startPos: { row: 6, col: 0 }, nongBritePos: { row: 0, col: 6 },
            blockedTiles: [{ row: 1, col: 3 }, { row: 2, col: 0 }, { row: 2, col: 2 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 5, col: 3 }]
        },
        // B — S bottom-left, N mid-interior, H top-right
        {
            level: 9, difficulty: "hard", gridCols: 7, gridRows: 7, homePos: { row: 0, col: 6 },
            startPos: { row: 6, col: 0 }, nongBritePos: { row: 4, col: 3 },
            blockedTiles: [{ row: 1, col: 1 }, { row: 1, col: 5 }, { row: 2, col: 2 }, { row: 2, col: 5 }, { row: 3, col: 0 }, { row: 3, col: 5 }, { row: 5, col: 2 }, { row: 5, col: 4 }, { row: 6, col: 2 }, { row: 6, col: 4 }]
        },
        // C — S top-right, N mid-interior, H bottom-left
        {
            level: 9, difficulty: "hard", gridCols: 7, gridRows: 7, homePos: { row: 6, col: 0 },
            startPos: { row: 0, col: 6 }, nongBritePos: { row: 2, col: 3 },
            blockedTiles: [{ row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 5 }, { row: 2, col: 1 }, { row: 2, col: 5 }, { row: 3, col: 1 }, { row: 4, col: 1 }, { row: 5, col: 1 }, { row: 5, col: 5 }]
        },
        // D — S bottom-right, N mid-interior, H top-left
        {
            level: 9, difficulty: "hard", gridCols: 7, gridRows: 7, homePos: { row: 0, col: 0 },
            startPos: { row: 6, col: 6 }, nongBritePos: { row: 4, col: 3 },
            blockedTiles: [{ row: 1, col: 1 }, { row: 1, col: 5 }, { row: 2, col: 1 }, { row: 2, col: 5 }, { row: 3, col: 0 }, { row: 3, col: 5 }, { row: 5, col: 1 }, { row: 5, col: 5 }, { row: 6, col: 1 }, { row: 6, col: 2 }]
        },
    ],
};

// ── compat stub (ใช้ใน test_components เท่านั้น) ─────────────────────────────
export const pathNavLevels: Record<number, PathNavLevelConfig> = {

    1: {
        level: 1,
        difficulty: "easy",
        gridCols: 4,
        gridRows: 4,
        startPos: { row: 3, col: 0 },
        nongBritePos: { row: 0, col: 3 },
        homePos: { row: 3, col: 3 },
        blockedTiles: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 3, col: 2 },
        ],
    },

    2: {
        level: 2,
        difficulty: "easy",
        gridCols: 4,
        gridRows: 4,
        startPos: { row: 0, col: 3 },
        nongBritePos: { row: 3, col: 1 },
        homePos: { row: 0, col: 0 },
        blockedTiles: [
            { row: 0, col: 2 },
            { row: 1, col: 0 },
            { row: 1, col: 2 },
        ],
    },

    3: {
        // 4×4  easy
        // [ ][ ][ ][N]      Path A: S→↑↑↑→→→ (right side)
        // [ ][ ][ ][ ]      Path B: S→→→→↑↑↑ (top side)
        // [🪨][ ][🪨][ ]   rocks block middle but leave top & right open
        // [S][ ][ ][H]
        level: 3,
        difficulty: "easy",
        gridCols: 4,
        gridRows: 4,
        startPos: { row: 3, col: 0 },
        nongBritePos: { row: 0, col: 3 },
        homePos: { row: 3, col: 3 },
        blockedTiles: [
            { row: 2, col: 0 },
            { row: 2, col: 2 },
        ],
    },

    4: {
        // 5×4  normal
        // [ ][ ][ ][ ][N]   Path A: S→↑↑↑→→→→ (top)
        // [ ][🪨][ ][🪨][ ] Path B: S→→→→→↑↑↑ (right)
        // [ ][ ][🪨][ ][ ]  rocks form an X with gaps top+right
        // [S][ ][ ][ ][H]
        level: 4,
        difficulty: "normal",
        gridCols: 5,
        gridRows: 5,
        startPos: { row: 4, col: 0 },
        nongBritePos: { row: 0, col: 4 },
        homePos: { row: 4, col: 4 },
        blockedTiles: [
            { row: 1, col: 1 },
            { row: 1, col: 3 },
            { row: 2, col: 2 },
            { row: 3, col: 1 },
        ],
    },

    5: {
        // 5×5  normal
        // [ ][ ][ ][ ][N]   Path A: up-column then right
        // [ ][🪨][ ][🪨][ ] Path B: right-row then up
        // [ ][ ][ ][ ][ ]   center row left open as middle route
        // [ ][🪨][ ][🪨][ ] symmetric rocks — 3 paths possible
        // [S][ ][ ][ ][H]
        level: 5,
        difficulty: "normal",
        gridCols: 5,
        gridRows: 5,
        startPos: { row: 4, col: 0 },
        nongBritePos: { row: 0, col: 4 },
        homePos: { row: 4, col: 4 },
        blockedTiles: [
            { row: 1, col: 1 },
            { row: 1, col: 3 },
            { row: 3, col: 1 },
            { row: 3, col: 3 },
        ],
    },

    6: {
        // 5×5  normal  — S corner top-right, N bottom-left, H top-left
        // [H][ ][🪨][ ][S]  multiple paths diagonally
        // [ ][🪨][ ][ ][ ]
        // [ ][ ][ ][🪨][ ]
        // [ ][ ][🪨][ ][ ]
        // [N][ ][ ][ ][ ]
        level: 6,
        difficulty: "normal",
        gridCols: 5,
        gridRows: 5,
        startPos: { row: 0, col: 4 },
        nongBritePos: { row: 4, col: 0 },
        homePos: { row: 0, col: 0 },
        blockedTiles: [
            { row: 0, col: 2 },
            { row: 1, col: 1 },
            { row: 2, col: 3 },
            { row: 3, col: 2 },
        ],
    },

    7: {
        // 6×5  hard
        // [ ][ ][ ][ ][ ][N]  3 paths: top / middle / zigzag
        // [ ][🪨][ ][ ][🪨][ ]
        // [ ][ ][🪨][ ][ ][ ]
        // [ ][🪨][ ][ ][🪨][ ]
        // [S][ ][ ][ ][ ][H]
        level: 7,
        difficulty: "hard",
        gridCols: 6,
        gridRows: 5,
        startPos: { row: 4, col: 0 },
        nongBritePos: { row: 0, col: 5 },
        homePos: { row: 4, col: 5 },
        blockedTiles: [
            { row: 0, col: 1 },
            { row: 1, col: 4 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 3, col: 1 },
            { row: 3, col: 4 },
            { row: 4, col: 3 },
        ],
    },

    8: {
        // 6×6  hard  — S bottom-left, N top-right, H bottom-right
        // [ ][ ][ ][ ][ ][N]  paths: left-wall / right-wall / zigzag
        // [ ][🪨][ ][ ][🪨][ ]
        // [ ][ ][🪨][🪨][ ][ ]
        // [🪨 ][][ ][ ][🪨][ ]
        // [ ][ ][][ ][ ][ ]
        // [S][ ][🪨 ][ ][ ][H]
        level: 8,
        difficulty: "hard",
        gridCols: 6,
        gridRows: 6,
        startPos: { row: 5, col: 0 },
        nongBritePos: { row: 0, col: 5 },
        homePos: { row: 5, col: 5 },
        blockedTiles: [
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 4 },
            { row: 2, col: 5 },
            { row: 3, col: 1 },
            { row: 3, col: 4 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
        ],
    },

    9: {
        // 7×7  hard  — S bottom-left, N top-right, H bottom-right
        // [ ][ ][ ][ ][ ][ ][N]
        // [ ][🪨][ ][ ][ ][🪨][ ]
        // [ ][ ][🪨][ ][🪨][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ]   ← open middle lane
        // [ ][ ][🪨][ ][🪨][ ][ ]
        // [ ][🪨][ ][ ][ ][🪨][ ]
        // [S][ ][ ][ ][ ][ ][H]
        level: 9,
        difficulty: "hard",
        gridCols: 7,
        gridRows: 7,
        startPos: { row: 6, col: 0 },
        nongBritePos: { row: 0, col: 6 },
        homePos: { row: 6, col: 6 },
        blockedTiles: [
            // แถวที่ 1: หินกลาง
            { row: 1, col: 3 },
            // แถวที่ 2: หิน ซ้าย+ขวา (col 1,3,5 เปิด)
            { row: 2, col: 0 },
            { row: 2, col: 2 },
            { row: 2, col: 5 },
            { row: 2, col: 6 },
            // แถวที่ 3: open lane (ไม่มีหิน)
            // แถวที่ 4: หิน ซ้าย+ขวา (col 1,3,5 เปิด)
            { row: 4, col: 1 },
            { row: 4, col: 2 },
            { row: 4, col: 4 },
            { row: 4, col: 5 },
            // แถวที่ 5: หินกลาง
            { row: 5, col: 3 },
        ],
    },
};
