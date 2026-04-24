import apiClient from "@/lib/api-client";

export interface SubmitScorePayload {
  levelId: number;
  score: number;
  stars: number;
  playTime: number; // in seconds
}

export interface SubmitScoreResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export const gameService = {
  /**
   * ส่งผลคะแนนของด่านไปยัง Backend
   */
  submitScore: async (payload: SubmitScorePayload): Promise<SubmitScoreResponse> => {
    const response = await apiClient.post<SubmitScoreResponse>('/game/submit', payload);
    return response.data;
  },
};
