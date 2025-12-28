import apiClient from "@/lib/api-client";

export interface LoginPayload {
  email: string;
  password: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface UserProfile {
  playerName: string;
  icon: string;
  totalScore: number;
  currentRank: number;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  totalStars: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  profile: UserProfile;
}


export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterStep1Payload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterStep1Response {
  success: boolean;
  message: string;
}

export interface RegisterStep2Payload {
  name: string;
  age: number;
  gender: Gender;
}

export interface RegisterStep2Response {
  success: boolean;
  message: string;
  data: {
    userId: number;
    email: string;
    name: string;
    age: number;
    gender: Gender;
    profile: UserProfile;
  };
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  registerStep1: async (payload: RegisterStep1Payload) => {
    const response = await apiClient.post<RegisterStep1Response>(
      '/auth/register/step1',
      payload
    );
    return response.data;
  },

  registerStep2: async (payload: RegisterStep2Payload) => {
    const response = await apiClient.post<RegisterStep2Response>(
      '/auth/register/step2',
      payload
    );
    return response.data;
  },
}