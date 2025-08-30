import { authApiService, User, LoginRequest, SignupRequest, AuthResponse } from './authApi';
import { influencersApiService, CreateInfluencerRequest, UpdateInfluencerRequest } from './influencersApi';
import type { Influencer, ListParams, ListResult } from '../types/types';

export { authApiService, influencersApiService };
export type { User, LoginRequest, SignupRequest, AuthResponse, Influencer, ListParams, ListResult, CreateInfluencerRequest, UpdateInfluencerRequest };

export const apiService = {
  auth: authApiService,
  influencers: influencersApiService,
};
