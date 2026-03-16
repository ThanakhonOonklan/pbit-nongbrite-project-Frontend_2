import { create } from "zustand";
import {
  userService,
  type User,
  type UpdateProfilePayload
} from "@/services/user.service";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProfile: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  (set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    fetchProfile: async () => {
      if (get().isLoading) return;
      set({ isLoading: true, error: null });
      try {
        const response = await userService.getProfile();
        set({
          user: response.data,
          isLoading: false,
          error: null,
        });
      } catch (error: unknown) {
        let errorMessage = "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้";

        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
                error?: string;
              } | string;
              status?: number;
            }
          };

          const responseData = axiosError.response?.data;
          const status = axiosError.response?.status;

          if (responseData) {
            if (typeof responseData === 'string') {
              errorMessage = responseData;
            } else if (typeof responseData === 'object') {
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              }
            }
          }

          if (errorMessage === "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้" && status) {
            if (status === 401) {
              errorMessage = "กรุณาเข้าสู่ระบบ";
            } else if (status === 404) {
              errorMessage = "ไม่พบข้อมูลโปรไฟล์";
            } else if (status === 500) {
              errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            }
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error("Fetch profile error:", error);

        set({
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    updateProfile: async (payload: UpdateProfilePayload) => {
      set({ isLoading: true, error: null });
      try {
        const response = await userService.updateProfile(payload);

        // Update user in store
        set({
          user: response.data,
          isLoading: false,
          error: null,
        });
      } catch (error: unknown) {
        let errorMessage = "ไม่สามารถอัพเดตโปรไฟล์ได้";

        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
                error?: string;
              } | string;
              status?: number;
            }
          };

          const responseData = axiosError.response?.data;
          const status = axiosError.response?.status;

          if (responseData) {
            if (typeof responseData === 'string') {
              errorMessage = responseData;
            } else if (typeof responseData === 'object') {
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              }
            }
          }

          if (errorMessage === "ไม่สามารถอัพเดตโปรไฟล์ได้" && status) {
            if (status === 400) {
              errorMessage = "ข้อมูลไม่ถูกต้อง";
            } else if (status === 401) {
              errorMessage = "กรุณาเข้าสู่ระบบ";
            } else if (status === 500) {
              errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            }
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error("Update profile error:", error);

        set({
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    setUser: (user: User | null) => {
      set({ user });
    },

    clearError: () => {
      set({ error: null });
    },
  })
);

