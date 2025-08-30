"use client"

import { useAuth } from "@/shared/hooks/useAuth"
import { useMobile } from "@/shared/hooks/useMobile"
import { useInfluencers } from "../Hook/useInfluencers"
import { StatsSection } from "../@Components/StatsSection"
import { HeaderSection } from "../@Components/HeaderSection"
import { ContentSection } from "../@Components/ContentSection"

export default function InfluencersPage() {
  const { isAdmin } = useAuth()
  const isMobile = useMobile()
  const influencersHook = useInfluencers()

  return (
    <div className="min-h-screen bg-slate-50">
      <StatsSection result={influencersHook.result} />
      <HeaderSection result={influencersHook.result} isAdmin={isAdmin} />
      <ContentSection
        {...influencersHook}
        isAdmin={isAdmin}
        isMobile={isMobile}
      />
    </div>
  )
}