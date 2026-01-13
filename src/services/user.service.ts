import apiClient from "@/lib/api-client";
import { Gender } from "./auth.service";
import type { User, UserProfile } from "./auth.service";

// Re-export types from auth.service for convenience
export { Gender }; // Enum (value)
export type { User, UserProfile }; // Types

export interface GetProfileResponse {
  success: boolean;
  data: User;
}

export interface UpdateProfilePayload {
  name?: string;
  age?: number; // 1-120
  gender?: Gender; // MALE, FEMALE, OTHER
  icon?: string; // icon filename เช่น "icon_P_Momo.png"
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export const userService = {
  getProfile: async (): Promise<GetProfileResponse> => {
    const response = await apiClient.get<GetProfileResponse>('/user/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
    const response = await apiClient.put<UpdateProfileResponse>('/user/profile', payload);
    return response.data;
  },
};
