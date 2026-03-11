import apiClient from "@/lib/api-client";

export interface LoginPayload {
  identifier: string;
  password: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface UserProfile {
  id: number;
  userId: number;
  playerName: string;
  icon: string | null; // Can be null if user hasn't selected an icon
  currentRank: number;
  createdAt: string; // e.g. "14/02/2026 13:50"
  updatedAt: string; // e.g. "06/03/2026 14:05"
}

export interface Streaks {
  currentStreak: number;
  longestStreak: number;
}

export interface Life {
  lifeCurrent: number;
}

export interface Stats {
  totalScore: number;
  totalStars: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  profile: UserProfile;
  streaks: Streaks;
  life: Life;
  stats: Stats;
}


export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterStep1Payload {
  username: string;
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
    streaks: Streaks;
    life: Life;
    stats: Stats;
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