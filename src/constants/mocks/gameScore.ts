/**
 * Mock Game Score Submission
 * จำลอง POST /api/game-scores สำหรับบันทึกคะแนนเกม
 * เมื่อเชื่อม API จริง ให้แทนที่ mockSubmitGameScore ด้วย fetch
 */

export interface GameScorePayload {
    levelId: number;
    score: number;
    stars: number;
    playTime: number;
}

/**
 * Simulate POST /api/game-scores
 * @param payload - ข้อมูลคะแนนที่จะบันทึก
 */
export async function mockSubmitGameScore(
    payload: GameScorePayload
): Promise<void> {
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    console.log("[mock] POST /api/game-scores", payload);
}
