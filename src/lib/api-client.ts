import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

//สร้าง Instance หลักสำหรับเรียก API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, //request เกิน 10 วิจะ fail
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Don't redirect for auth endpoints (login, register, etc.)
    // These should handle their own errors
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') || 
                          originalRequest?.url?.includes('/auth/register/step1') ||
                          originalRequest?.url?.includes('/auth/register/step2') ||
                          originalRequest?.url?.includes('/auth/logout');
                          // Note: /auth/refresh removed as backend doesn't support it yet
    
    // Only redirect to login for 401 errors on non-auth endpoints
    if (error.response?.status === 401 && !isAuthEndpoint) {
      console.error("Session expired, redirecting to login...");
      
      if (typeof window !== 'undefined') {
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;