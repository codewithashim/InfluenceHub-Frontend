import { env } from '@/shared/config/env.config';
import { API_ENDPOINTS, AUTH_STORAGE_KEY, USER_ROLES } from '../lib/constants';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

class AuthApiService {
  private baseURL = env.API_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Auth API request failed:', error);
      throw error;
    }
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_STORAGE_KEY);
  }

  private setToken(token: string | null): void {
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem(AUTH_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async signup(credentials: SignupRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request<{ user: User }>(API_ENDPOINTS.AUTH.ME);
    return response.user;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Role-based access methods
  hasRole(user: User | null, requiredRole: UserRole): boolean {
    if (!user) return false;
    return user.role === requiredRole;
  }

  hasAnyRole(user: User | null, requiredRoles: UserRole[]): boolean {
    if (!user) return false;
    return requiredRoles.includes(user.role as UserRole);
  }

  isAdmin(user: User | null): boolean {
    return this.hasRole(user, USER_ROLES.ADMIN);
  }

  isViewer(user: User | null): boolean {
    return this.hasRole(user, USER_ROLES.VIEWER);
  }

  canAccessAdminFeatures(user: User | null): boolean {
    return this.isAdmin(user);
  }

  canAccessViewerFeatures(user: User | null): boolean {
    return this.hasAnyRole(user, [USER_ROLES.ADMIN, USER_ROLES.VIEWER]);
  }
}

export const authApiService = new AuthApiService();
