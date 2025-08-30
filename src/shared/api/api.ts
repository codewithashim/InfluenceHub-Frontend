import { authApiService, User, LoginRequest, SignupRequest, AuthResponse } from './authApi';

export { authApiService };
export type { User, LoginRequest, SignupRequest, AuthResponse };

export const apiService = authApiService;
