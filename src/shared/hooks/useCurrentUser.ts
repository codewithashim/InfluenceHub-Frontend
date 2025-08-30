"use client";

import { useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { apiService, User } from '@/shared/api/api';

export function useCurrentUser() {
  const { data: user, loading, error, execute } = useApi<User>();

  const fetchUser = useCallback(() => {
    return execute(() => apiService.getCurrentUser());
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
