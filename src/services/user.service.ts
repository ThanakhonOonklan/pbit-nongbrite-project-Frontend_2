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

export interface ReduceLifeResponse {
  success: boolean;
  message: string;
  data: User | { lifeCurrent: number } | any; // Use any as fallback if backend is inconsistent, but at least allow property access
}

export interface GetLifeResponse {
  success: boolean;
  data: {
    current: number;
    max: number;
    lastResetAt: string;
  };
}

export interface UpdateStreakResponse {
  success: boolean;
  data: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
}

export interface UserService {
  getProfile: () => Promise<GetProfileResponse>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<UpdateProfileResponse>;
  reduceLife: () => Promise<ReduceLifeResponse>;
  getLife: () => Promise<GetLifeResponse>;
  updateStreak: () => Promise<UpdateStreakResponse>;
}

export const userService: UserService = {
  getProfile: async (): Promise<GetProfileResponse> => {
    const response = await apiClient.get<GetProfileResponse>('/user/profile');
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
    const response = await apiClient.put<UpdateProfileResponse>('/user/profile', payload);
    return response.data;
  },

  reduceLife: async (): Promise<ReduceLifeResponse> => {
    const response = await apiClient.put<ReduceLifeResponse>('/users/lives');
    return response.data;
    // return { success: true, message: "Mocked", data: { lifeCurrent: 5 } };
  },

  getLife: async (): Promise<GetLifeResponse> => {
    const response = await apiClient.get<GetLifeResponse>('/users/lives');
    return response.data;
  },

  updateStreak: async (): Promise<UpdateStreakResponse> => {
    const response = await apiClient.put<UpdateStreakResponse>('/users/streak/update');
    return response.data;
  },
};

