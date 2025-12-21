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

export const authService = {
  login: async (payload: LoginPayload) => {

    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    console.log(response.data); 
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
}