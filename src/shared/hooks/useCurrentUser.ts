"use client";

import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { authApiService, User } from '@/shared/api/authApi';

export function useCurrentUser() {
  const { data: user, loading, error, execute } = useApi<User>();

  const fetchUser = useCallback(() => {
    return execute(() => authApiService.getCurrentUser());
  }, [execute]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}
