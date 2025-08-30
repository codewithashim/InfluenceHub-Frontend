export type Role = "admin" | "viewer"
export type Platform = "instagram" | "tiktok" | "youtube" | "x"

export interface User {
  id: string
  email: string
  role: Role
}

export interface Influencer {
  id: string
  name: string
  platform: Platform
  username: string
  followers: number
  engagementRate: number // 0–100, %
  country?: string // ISO2 like "BD","US"
  categories: string[] // e.g., ["beauty","fitness"]
  email?: string | null
  createdAt: string // ISO
  updatedAt: string // ISO
}

export interface ListParams {
  platform?: Platform
  min_followers?: number
  country?: string
  category?: string
  q?: string // name/username search
  sort?: "followers" | "engagement_rate"
  order?: "asc" | "desc"
  page?: number // 1-based
  pageSize?: number // 10/25/50
}

export interface ListResult {
  data: Influencer[]
  page: number
  pageSize: number
  total: number
}

// Additional types for API integration
export interface CreateInfluencerDto {
  name: string;
  username: string;
  platform: Platform;
  followers: number;
  engagementRate: number;
  country?: string;
  categories: string[];
  email?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
