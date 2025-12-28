import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, type User, type LoginPayload } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(payload);
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          let errorMessage = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
          
          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { 
              response?: { 
                data?: { 
                  message?: string;
                  error?: string;
                };
                status?: number;
              } 
            };
            
            // Try to get error message from response data
            const responseData = axiosError.response?.data;
            if (responseData) {
              // Check multiple possible error message fields
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              } else if (typeof responseData === 'string') {
                errorMessage = responseData;
              }
            }
            
            // If no message found, use status-based messages
            if (errorMessage === "เกิดข้อผิดพลาดในการเข้าสู่ระบบ") {
              const status = axiosError.response?.status;
              if (status === 401) {
                errorMessage = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
              } else if (status === 404) {
                errorMessage = "ไม่พบผู้ใช้";
              } else if (status === 400) {
                errorMessage = "ข้อมูลไม่ถูกต้อง";
              } else if (status === 500) {
                errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
              } else if (status === 403) {
                errorMessage = "ไม่มีสิทธิ์เข้าถึง";
              }
            }
          } else if (error instanceof Error) {
            // If it's a regular Error, use its message
            errorMessage = error.message;
          }
          
          console.error("Login error details:", error);
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

