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
    CREATE: '/influencers',
    UPDATE: '/influencers/:id',
    DELETE: '/influencers/:id',
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

export const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X (Twitter)" },
] as const;

export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "BR", label: "Brazil" },
  { value: "MX", label: "Mexico" },
  { value: "AR", label: "Argentina" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "CN", label: "China" },
  { value: "BD", label: "Bangladesh" },
  { value: "PK", label: "Pakistan" },
  { value: "ID", label: "Indonesia" },
  { value: "TH", label: "Thailand" },
  { value: "VN", label: "Vietnam" },
  { value: "PH", label: "Philippines" },
  { value: "MY", label: "Malaysia" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "UAE" },
  { value: "SA", label: "Saudi Arabia" },
] as const;

export const CATEGORIES = [
  "beauty",
  "fitness",
  "fashion",
  "food",
  "travel",
  "tech",
  "gaming",
  "lifestyle",
  "music",
  "art",
  "sports",
  "business",
  "education",
  "comedy",
  "dance",
  "photography",
  "diy",
  "pets",
  "parenting",
  "health",
] as const;
