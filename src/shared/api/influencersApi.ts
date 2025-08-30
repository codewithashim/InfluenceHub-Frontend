import { env } from '@/shared/config/env.config';
import { API_ENDPOINTS } from '../lib/constants';
import type { Influencer, ListParams, ListResult, Platform } from '../types/types';

export interface CreateInfluencerRequest {
  name: string;
  platform: Platform;
  username: string;
  followers: number;
  engagementRate: number;
  country?: string;
  categories: string[];
  email?: string | null;
}

export interface UpdateInfluencerRequest {
  name?: string;
  platform?: Platform;
  username?: string;
  followers?: number;
  engagementRate?: number;
  country?: string;
  categories?: string[];
  email?: string | null;
}

class InfluencersApiService {
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

    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
      console.error('Influencers API request failed:', error);
      throw error;
    }
  }

  async list(params: ListParams = {}): Promise<ListResult> {
    const searchParams = new URLSearchParams();

    if (params.platform) searchParams.set('platform', params.platform);
    if (params.min_followers) searchParams.set('min_followers', params.min_followers.toString());
    if (params.country) searchParams.set('country', params.country);
    if (params.category) searchParams.set('category', params.category);
    if (params.q) searchParams.set('q', params.q);
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.order) searchParams.set('order', params.order);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.INFLUENCERS.LIST}?${queryString}` : API_ENDPOINTS.INFLUENCERS.LIST;

    return this.request<ListResult>(endpoint);
  }

  async get(id: string): Promise<Influencer> {
    const endpoint = API_ENDPOINTS.INFLUENCERS.DETAIL.replace(':id', id);
    return this.request<Influencer>(endpoint);
  }

  async create(data: CreateInfluencerRequest): Promise<Influencer> {
    const requestData = {
      name: data.name,
      platform: data.platform,
      username: data.username,
      followers: data.followers,
      engagement_rate: data.engagementRate, // Convert to snake_case for backend
      country: data.country,
      categories: data.categories,
      email: data.email,
    };

    return this.request<Influencer>(API_ENDPOINTS.INFLUENCERS.LIST, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async update(id: string, data: UpdateInfluencerRequest): Promise<Influencer> {
    const requestData: {
      name?: string;
      platform?: Platform;
      username?: string;
      followers?: number;
      engagement_rate?: number;
      country?: string;
      categories?: string[];
      email?: string | null;
    } = {};

    if (data.name !== undefined) requestData.name = data.name;
    if (data.platform !== undefined) requestData.platform = data.platform;
    if (data.username !== undefined) requestData.username = data.username;
    if (data.followers !== undefined) requestData.followers = data.followers;
    if (data.engagementRate !== undefined) requestData.engagement_rate = data.engagementRate;
    if (data.country !== undefined) requestData.country = data.country;
    if (data.categories !== undefined) requestData.categories = data.categories;
    if (data.email !== undefined) requestData.email = data.email;

    const endpoint = API_ENDPOINTS.INFLUENCERS.DETAIL.replace(':id', id);
    return this.request<Influencer>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async delete(id: string): Promise<void> {
    const endpoint = API_ENDPOINTS.INFLUENCERS.DETAIL.replace(':id', id);
    await this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const influencersApiService = new InfluencersApiService();
