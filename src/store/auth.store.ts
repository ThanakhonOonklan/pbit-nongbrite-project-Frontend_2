import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authService,
  type User,
  type LoginPayload,
  type RegisterStep1Payload,
  type RegisterStep2Payload,
  type ResetPasswordPayload,
  Gender
} from "@/services/auth.service";
import { useUserStore } from "./user.store";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Register state
  registerStep: number;
  registerData: {
    username?: string;
    email?: string;
    password?: string;
  } | null;

  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;

  // Register actions
  registerStep1: (payload: RegisterStep1Payload) => Promise<void>;
  registerStep2: (payload: RegisterStep2Payload) => Promise<void>;
  resetRegister: () => void;

  // Forgot password actions
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
}

const translateAuthError = (message: string): string => {
  const msg = message.toLowerCase();
  if (msg.includes("username already exists") || msg.includes("username_already_exists")) {
    return "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว";
  }
  if (msg.includes("email already exists") || msg.includes("email_already_exists")) {
    return "อีเมลนี้ถูกใช้งานแล้ว";
  }
  if (
    msg.includes("invalid username or password") ||
    msg.includes("invalid identifier or password") ||
    msg.includes("credentials") ||
    msg.includes("unauthorized")
  ) {
    return "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
  if (msg.includes("user not found") || msg.includes("cannot find user")) {
    return "ไม่พบข้อมูลผู้ใช้งาน";
  }
  if (msg.includes("password is incorrect") || msg.includes("incorrect password")) {
    return "รหัสผ่านไม่ถูกต้อง";
  }
  if (
    msg.includes("invalid pin") ||
    msg.includes("invalid otp") ||
    msg.includes("incorrect pin") ||
    msg.includes("incorrect otp") ||
    msg.includes("pin is incorrect")
  ) {
    return "รหัสยืนยันตัวตน (PIN) หรือ OTP ไม่ถูกต้อง";
  }
  if (msg.includes("expired")) {
    return "รหัสยืนยันตัวตน (PIN) หรือ OTP หมดอายุแล้ว";
  }
  if (msg.includes("email not found") || msg.includes("email is not registered")) {
    return "ไม่พบอีเมลนี้ในระบบ";
  }
  return message;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      registerStep: 1,
      registerData: null,

      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(payload);

          // Sync user to user store
          useUserStore.getState().setUser(response.user);

          set({
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

            // Translate error message
            errorMessage = translateAuthError(errorMessage);

            // If no message found, use status-based messages
            if (errorMessage === "เกิดข้อผิดพลาดในการเข้าสู่ระบบ") {
              const status = axiosError.response?.status;
              if (status === 401) {
                errorMessage = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
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

          errorMessage = translateAuthError(errorMessage);

          console.error("Login error details:", error);

          // Clear user from user store on error
          useUserStore.getState().setUser(null);

          set({
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
          // Clear user from user store on logout
          useUserStore.getState().setUser(null);

          set({
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
        // Sync user to user store
        useUserStore.getState().setUser(user);

        set({
          isAuthenticated: !!user,
        });
      },

      registerStep1: async (payload: RegisterStep1Payload) => {
        set({ isLoading: true, error: null });
        try {
          await authService.registerStep1(payload);
          set({
            registerStep: 2,
            registerData: {
              username: payload.username,
              email: payload.email,
              password: payload.password,
            },
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          let errorMessage = "เกิดข้อผิดพลาดในการสมัครสมาชิก";

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

            const responseData = axiosError.response?.data;
            if (responseData) {
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              } else if (typeof responseData === 'string') {
                errorMessage = responseData;
              }
            }

            // Translate error message
            errorMessage = translateAuthError(errorMessage);

            if (errorMessage === "เกิดข้อผิดพลาดในการสมัครสมาชิก") {
              const status = axiosError.response?.status;
              if (status === 400) {
                errorMessage = "ข้อมูลไม่ถูกต้อง";
              } else if (status === 409) {
                errorMessage = "อีเมลนี้ถูกใช้งานแล้ว";
              } else if (status === 500) {
                errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
              }
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          errorMessage = translateAuthError(errorMessage);

          console.error("Register Step 1 error:", error);

          set({
            registerStep: 1,
            registerData: null,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      registerStep2: async (payload: RegisterStep2Payload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.registerStep2(payload);

          // Map response to User type
          const user: User = {
            id: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            age: response.data.age,
            gender: response.data.gender,
            profile: response.data.profile,
            streaks: response.data.streaks,
            life: response.data.life,
            stats: response.data.stats,
          };

          // Sync user to user store
          useUserStore.getState().setUser(user);

          set({
            isAuthenticated: true,
            registerStep: 3,
            registerData: null,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          let errorMessage = "เกิดข้อผิดพลาดในการสมัครสมาชิก";

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

            const responseData = axiosError.response?.data;
            if (responseData) {
              if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = responseData.error;
              } else if (typeof responseData === 'string') {
                errorMessage = responseData;
              }
            }

            // Translate error message
            errorMessage = translateAuthError(errorMessage);

            if (errorMessage === "เกิดข้อผิดพลาดในการสมัครสมาชิก") {
              const status = axiosError.response?.status;
              if (status === 400) {
                errorMessage = "ข้อมูลไม่ถูกต้อง";
              } else if (status === 401) {
                errorMessage = "กรุณาทำการสมัครสมาชิกขั้นตอนที่ 1 ก่อน";
              } else if (status === 500) {
                errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
              }
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          errorMessage = translateAuthError(errorMessage);

          console.error("Register Step 2 error:", error);

          set({
            registerStep: 2,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      resetRegister: () => {
        set({
          registerStep: 1,
          registerData: null,
          error: null,
        });
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authService.forgotPassword(email);
          set({ isLoading: false, error: null });
        } catch (error: unknown) {
          let errorMessage = "เกิดข้อผิดพลาดในการส่งข้อมูล";

          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
              response?: {
                data?: { message?: string; error?: string };
                status?: number;
              }
            };
            const responseData = axiosError.response?.data;
            if (responseData) {
              if (responseData.message) errorMessage = responseData.message;
              else if (responseData.error) errorMessage = responseData.error;
              else if (typeof responseData === 'string') errorMessage = responseData;
            }

            // Translate error message
            errorMessage = translateAuthError(errorMessage);

            if (errorMessage === "เกิดข้อผิดพลาดในการส่งข้อมูล") {
              const status = axiosError.response?.status;
              if (status === 404) errorMessage = "ไม่พบอีเมลในระบบ";
              else if (status === 500) errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          errorMessage = translateAuthError(errorMessage);

          console.error("Forgot Password error:", error);
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      resetPassword: async (payload: ResetPasswordPayload) => {
        set({ isLoading: true, error: null });
        try {
          await authService.resetPassword(payload);
          set({ isLoading: false, error: null });
        } catch (error: unknown) {
          let errorMessage = "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน";

          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
              response?: {
                data?: { message?: string; error?: string };
                status?: number;
              }
            };
            const responseData = axiosError.response?.data;
            if (responseData) {
              if (responseData.message) errorMessage = responseData.message;
              else if (responseData.error) errorMessage = responseData.error;
              else if (typeof responseData === 'string') errorMessage = responseData;
            }

            // Translate error message
            errorMessage = translateAuthError(errorMessage);
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          errorMessage = translateAuthError(errorMessage);

          console.error("Reset Password error:", error);
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

