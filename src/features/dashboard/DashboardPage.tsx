"use client"

import { useAuth, useAuthActions, useRoleAccess } from "@/shared/hooks"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { LogOut, User, Shield } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { handleLogout } = useAuthActions()
  const { isAdmin } = useRoleAccess()

  const handleLogoutClick = async () => {
    try {
      await handleLogout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Influence Hub Dashboard</h1>
            <Button
              onClick={handleLogoutClick}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h2>
            <p className="text-gray-600">
              You are logged in as a {user?.role} user.
            </p>
          </div>

          {/* User Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Information
                </CardTitle>
                <CardDescription>
                  Your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {user?.role}
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {user?.id}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Status
                </CardTitle>
                <CardDescription>
                  Your account permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isAdmin() ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className="capitalize">{user?.role} Access</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {isAdmin()
                      ? 'You have full access to all features and can manage the platform.'
                      : 'You have viewer access to browse and view content.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  View Influencers
                </Button>
                {isAdmin() && (
                  <Button className="w-full" variant="outline">
                    Manage Users
                  </Button>
                )}
                <Button className="w-full" variant="outline">
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Placeholder for future content */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Influencer Directory</CardTitle>
                <CardDescription>
                  Browse and manage influencers (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This section will contain the influencer directory functionality.
                  For now, this is a placeholder to demonstrate the authenticated dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
