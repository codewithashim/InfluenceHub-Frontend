"use client";

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export function useAuthActions() {
  const { login, signup, logout, refreshUser, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setError(null);
    setSuccess(null);

    try {
      await login(email, password);
      setSuccess('Login successful!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    }
  }, [login]);

  const handleSignup = useCallback(async (email: string, password: string) => {
    setError(null);
    setSuccess(null);

    try {
      await signup(email, password);
      setSuccess('Account created successfully! Please log in.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    }
  }, [signup]);

  const handleLogout = useCallback(async () => {
    setError(null);
    setSuccess(null);

    try {
      await logout();
      setSuccess('Logged out successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    }
  }, [logout]);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    refreshUser,
    isLoading,
    error,
    success,
    clearMessages,
  };
}
