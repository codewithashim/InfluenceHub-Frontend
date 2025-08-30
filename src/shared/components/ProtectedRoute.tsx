"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';
import { useRoleAccess } from '@/shared/hooks';
import { UserRole } from '@/shared/api/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  requiredRole,
  requiredRoles,
  requireAuth = true
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole, hasAnyRole } = useRoleAccess();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication if required
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check role-based access
    if (requiredRole && !hasRole(requiredRole)) {
      router.push('/unauthorized');
      return;
    }

    if (requiredRoles && !hasAnyRole(requiredRoles)) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, isLoading, hasRole, hasAnyRole, router, redirectTo, requiredRole, requiredRoles, requireAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
