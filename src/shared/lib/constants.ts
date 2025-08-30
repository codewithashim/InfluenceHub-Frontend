import { env } from '@/shared/config/env.config';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    LIST: '/users',
    PROFILE: '/users/profile',
  },
  INFLUENCERS: {
    LIST: '/influencers',
    DETAIL: '/influencers/:id',
  },
} as const;

export const API_BASE_URL = env.API_URL;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const AUTH_STORAGE_KEY = 'auth_token';

export const USER_ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
} as const;
