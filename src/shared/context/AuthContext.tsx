"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { authApiService, User } from '@/shared/api/authApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const isAdmin = user?.role === 'admin';

  const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const setStoredUser = (user: User | null): void => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const refreshUser = useCallback(async () => {
    if (!authApiService.isAuthenticated()) {
      setUser(null);
      setStoredUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const currentUser = await authApiService.getCurrentUser();
      setUser(currentUser);
      setStoredUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApiService.login({ email, password });
      setUser(response.user);
      setStoredUser(response.user);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authApiService.signup({ email, password });
      // After signup, user needs to login
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setStoredUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    // Then refresh from API
    refreshUser();
  }, [refreshUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshUser,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
