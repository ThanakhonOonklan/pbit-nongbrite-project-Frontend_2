import apiClient from "@/lib/api-client";
import { RankUser } from "@/types";

export interface GetRankingResponse {
  success: boolean;
  data: RankUser[];
}

export const rankService = {
  getRanking: async (): Promise<GetRankingResponse> => {
    const response = await apiClient.get<GetRankingResponse>('/game/ranking');
    return response.data;
  },
};
