
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
    walkableTiles: PathTile[];
    startPos: PathTile;
    nongBritePos: PathTile;
    homePos: PathTile;
}

export const pathNavLevels: Record<number, PathNavLevelConfig> = {

    1: {
        level: 1,
        difficulty: "easy",
        gridCols: 2,
        gridRows: 3,
        startPos: { row: 2, col: 0 },
        nongBritePos: { row: 2, col: 1 },
        homePos: { row: 0, col: 0 },
        walkableTiles: [
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 1, col: 0 },
            { row: 0, col: 0 },
        ],
    },


    2: {
        level: 2,
        difficulty: "easy",
        gridCols: 3,
        gridRows: 2,
        startPos: { row: 1, col: 0 },
        nongBritePos: { row: 1, col: 2 },
        homePos: { row: 0, col: 0 },
        walkableTiles: [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 0, col: 0 },
        ],
    },

    3: {
        level: 3,
        difficulty: "easy",
        gridCols: 3,
        gridRows: 2,
        startPos: { row: 0, col: 0 },
        nongBritePos: { row: 1, col: 2 },
        homePos: { row: 1, col: 0 },
        walkableTiles: [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 1, col: 2 },
            { row: 1, col: 0 },
        ],
    },


    4: {
        level: 4,
        difficulty: "normal",
        gridCols: 3,
        gridRows: 3,
        startPos: { row: 2, col: 0 },
        nongBritePos: { row: 0, col: 2 },
        homePos: { row: 1, col: 0 },
        walkableTiles: [
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 1, col: 0 },
        ],
    },

    5: {
        level: 5,
        difficulty: "normal",
        gridCols: 4,
        gridRows: 2,
        startPos: { row: 0, col: 0 },
        nongBritePos: { row: 1, col: 2 },
        homePos: { row: 1, col: 0 },
        walkableTiles: [
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
            { row: 0, col: 3 },
            { row: 1, col: 2 },
            { row: 1, col: 0 },
        ],
    },

    6: {
        level: 6,
        difficulty: "normal",
        gridCols: 4,
        gridRows: 3,
        startPos: { row: 2, col: 0 },
        nongBritePos: { row: 0, col: 1 },
        homePos: { row: 0, col: 3 },
        walkableTiles: [
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
            { row: 0, col: 1 },
            { row: 0, col: 3 },
        ],
    },


    7: {
        level: 7,
        difficulty: "hard",
        gridCols: 5,
        gridRows: 5,
        startPos: { row: 4, col: 0 },
        nongBritePos: { row: 2, col: 4 },
        homePos: { row: 0, col: 2 },
        walkableTiles: [
            { row: 4, col: 0 },
            { row: 4, col: 1 },
            { row: 4, col: 2 },
            { row: 4, col: 3 },
            { row: 3, col: 2 },
            { row: 2, col: 2 },
            { row: 2, col: 3 },
            { row: 2, col: 4 },
            { row: 1, col: 2 },
            { row: 0, col: 2 },
        ],
    },

    8: {
        level: 8,
        difficulty: "hard",
        gridCols: 5,
        gridRows: 5,
        startPos: { row: 0, col: 3 },
        nongBritePos: { row: 3, col: 0 },
        homePos: { row: 0, col: 4 },
        walkableTiles: [
            { row: 0, col: 3 },
            { row: 0, col: 4 },
            { row: 1, col: 3 },
            { row: 2, col: 3 },
            { row: 2, col: 4 },
            { row: 3, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 4, col: 1 },
            { row: 4, col: 0 },
            { row: 3, col: 0 },
        ],
    },

    9: {
        level: 9,
        difficulty: "hard",
        gridCols: 4,
        gridRows: 6,
        startPos: { row: 0, col: 3 },
        nongBritePos: { row: 5, col: 0 },
        homePos: { row: 1, col: 0 },
        walkableTiles: [
            { row: 0, col: 3 },
            { row: 1, col: 3 },
            { row: 1, col: 2 },
            { row: 1, col: 1 },
            { row: 1, col: 0 },
            { row: 2, col: 1 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 4, col: 2 },
            { row: 5, col: 2 },
            { row: 5, col: 1 },
            { row: 5, col: 0 },
        ],
    },
};
