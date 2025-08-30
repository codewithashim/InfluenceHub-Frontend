
import DashboardPage from "@/features/dashboard/DashboardPage"
import { ProtectedRoute } from "@/shared/components/ProtectedRoute"
import { USER_ROLES } from "@/shared/lib/constants"

export default function Page() {
    return (
        <ProtectedRoute
            requiredRoles={[USER_ROLES.ADMIN, USER_ROLES.VIEWER]}
            requireAuth={true}
        >
            <DashboardPage />
        </ProtectedRoute>
    )
}
