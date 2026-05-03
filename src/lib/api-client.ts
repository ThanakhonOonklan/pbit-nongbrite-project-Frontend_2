import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REQUEST_TIMEOUT_MS = 10_000;
const AUTH_ENDPOINT_PREFIX = '/auth/';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isLoggingOut = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isAuthEndpoint = originalRequest.url?.includes(AUTH_ENDPOINT_PREFIX);
    const isUnauthorized = error.response.status === 401;
    const alreadyRetried = originalRequest._retry;

    if (isUnauthorized && !isAuthEndpoint && !alreadyRetried && !isLoggingOut) {
      console.error('[API-Client] 401 Error Detected: Token might be expired. Triggering auto-logout.');

      isLoggingOut = true;
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {

        toast.error('Session expired. Please login again.');

        try {
          await authClient.post('/auth/logout');
        } catch (logoutError) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[AUTH] Logout failed:', logoutError);
          }
        }

        setTimeout(() => {
          // บังคับให้ Zustand ล้าง Auth store ทิ้ง
          window.localStorage.removeItem('auth-storage');
          console.log('[API-Client] auth-storage cleared from local storage');

          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          isLoggingOut = false;
        }, 3000);
      }
    }

    

    return Promise.reject(
      new ApiError(
        error.response.status ?? 0,
        (error.response.data as { message?: string })?.message ?? error.message,
        error.response.data
      )
    );
  }
);

export default apiClient;
