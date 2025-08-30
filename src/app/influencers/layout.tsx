import type React from "react"
import { DashboardLayout } from "@/features/influencers/Layout/DashboardLayout"
import { AuthGuard } from "@/shared/components"

export default function InfluencersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>
    <AuthGuard>
      {children}
    </AuthGuard>
  </DashboardLayout>
}
