import { useAuth } from '@/shared/context/AuthContext';
import { authApiService, UserRole } from '@/shared/api/authApi';

export function useRoleAccess() {
  const { user } = useAuth();

  const hasRole = (requiredRole: UserRole): boolean => {
    return authApiService.hasRole(user, requiredRole);
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    return authApiService.hasAnyRole(user, requiredRoles);
  };

  const isAdmin = (): boolean => {
    return authApiService.isAdmin(user);
  };

  const isViewer = (): boolean => {
    return authApiService.isViewer(user);
  };

  const canAccessAdminFeatures = (): boolean => {
    return authApiService.canAccessAdminFeatures(user);
  };

  const canAccessViewerFeatures = (): boolean => {
    return authApiService.canAccessViewerFeatures(user);
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    isAdmin,
    isViewer,
    canAccessAdminFeatures,
    canAccessViewerFeatures,
  };
}
