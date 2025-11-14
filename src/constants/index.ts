/**
 * Application constants
 */

export const APP_NAME = 'My Next.js App';
export const APP_DESCRIPTION = 'A modern Next.js application';

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  USERS: '/api/users',
  POSTS: '/api/posts',
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'theme',
} as const;

