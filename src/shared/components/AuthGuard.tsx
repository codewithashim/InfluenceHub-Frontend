"use client"

import { ProtectedRoute } from "@/shared/components/ProtectedRoute"
import { USER_ROLES } from "@/shared/lib/constants"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  return (
    <ProtectedRoute
      requiredRole={requireAdmin ? USER_ROLES.ADMIN : undefined}
      requireAuth={true}
    >
      {children}
    </ProtectedRoute>
  )
}
