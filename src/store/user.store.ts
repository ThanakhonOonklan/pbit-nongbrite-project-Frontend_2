import { create } from "zustand";
import {
  userService,
  type User,
  type UpdateProfilePayload,
  type GetLifeResponse,
  type UpdateStreakResponse
} from "@/services/user.service";

interface UserState {
  user: User | null;
  lifeDetails: GetLifeResponse['data'] | null;
  streakDetails: UpdateStreakResponse['data'] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProfile: () => Promise<void>;
  fetchLifeDetails: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  reduceLife: () => Promise<void>;
  fetchAndUpdateStreak: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  (set, get) => {
    let isReducingLife = false;
    let lastReduceTime = 0;

    return {
      user: null,
      lifeDetails: null,
      streakDetails: null,
      isLoading: false,
    error: null,

    fetchLifeDetails: async () => {
      try {
        const response = await userService.getLife();
        if (response.success && response.data) {
          set({ lifeDetails: response.data });
        }
      } catch (error) {
        console.error("Failed to fetch life details:", error);
      }
    },

    fetchAndUpdateStreak: async () => {
      try {
        const response = await userService.updateStreak();
        if (response.success && response.data) {
          set({ streakDetails: response.data });
          // Optional: Keep user object aligned if needed, but primary source is streakDetails
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                streaks: response.data,
              },
            });
          }
        }
      } catch (error) {
        console.error("Failed to update streak:", error);
      }
    },

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

    reduceLife: async () => {
      const now = Date.now();
      if (isReducingLife || now - lastReduceTime < 1000) return;

      isReducingLife = true;
      lastReduceTime = now;

      try {
        const response = await userService.reduceLife();
        const currentUser = get().user;
        if (currentUser && response.data) {
          const rd = response.data;
          // Check if it's returning the entire user or just the life object
          if (rd.lifeCurrent !== undefined && rd.id === undefined) {
            set({ user: { ...currentUser, life: { ...currentUser.life, lifeCurrent: rd.lifeCurrent } } });
          } else if (rd.life && rd.life.lifeCurrent !== undefined) {
            set({ user: { ...currentUser, ...rd } });
          } else {
            // Fallback optimistic update just in case backend format is unknown
            const decremented = Math.max(0, currentUser.life.lifeCurrent - 1);
            set({ user: { ...currentUser, life: { ...currentUser.life, lifeCurrent: decremented } } });
          }
        }
      } catch (error) {
        console.error("Failed to reduce life:", error);
      } finally {
        isReducingLife = false;
        lastReduceTime = Date.now();
      }
    },

    setUser: (user: User | null) => {
      set({ user });
    },

    clearError: () => {
      set({ error: null });
    },
  };
});

