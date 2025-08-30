"use client"

import { useMemo } from "react"
import { Users, TrendingUp, Globe, Star } from "lucide-react"
import type { ListResult } from "@/shared/types/types"

interface StatsSectionProps {
  result: ListResult
}

export function StatsSection({ result }: StatsSectionProps) {
  const stats = useMemo(() => {
    const influencers = result.data
    const totalFollowers = influencers.reduce((sum: number, inf) => sum + (typeof inf.followers === 'string' ? parseFloat(inf.followers) : inf.followers), 0)
    const avgEngagement = influencers.length > 0
      ? influencers.reduce((sum: number, inf) => sum + (typeof inf.engagementRate === 'string' ? parseFloat(inf.engagementRate) : inf.engagementRate), 0) / influencers.length
      : 0
    const uniqueCountries = new Set(influencers.map((inf) => inf.country).filter(Boolean)).size

    return {
      total: result.total,
      totalFollowers: Math.round(totalFollowers / 1000000),
      avgEngagement: Math.round(avgEngagement * 100) / 100,
      countries: uniqueCountries,
    }
  }, [result])

  return (
    <div className="py-8 px-4">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Influencers */}
          <div className="group bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 transition-all duration-300 hover:from-slate-100 hover:to-slate-200/50">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{stats.total.toLocaleString()}</div>
            <p className="text-slate-600 text-sm font-medium">Total Influencers</p>
          </div>

          {/* Combined Followers */}
          <div className="group bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 transition-all duration-300 hover:from-slate-100 hover:to-slate-200/50">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <TrendingUp className="h-7 w-7 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reach</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{stats.totalFollowers}M</div>
            <p className="text-slate-600 text-sm font-medium">Combined Followers</p>
          </div>

          {/* Average Engagement */}
          <div className="group bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 transition-all duration-300 hover:from-slate-100 hover:to-slate-200/50">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-amber-500/10 rounded-2xl">
                <Star className="h-7 w-7 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{stats.avgEngagement}%</div>
            <p className="text-slate-600 text-sm font-medium">Average Rate</p>
          </div>

          {/* Countries */}
          <div className="group bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 transition-all duration-300 hover:from-slate-100 hover:to-slate-200/50">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-purple-500/10 rounded-2xl">
                <Globe className="h-7 w-7 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Global</span>
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2">{stats.countries}</div>
            <p className="text-slate-600 text-sm font-medium">Countries</p>
          </div>
        </div>
      </div>
    </div>
  )
}
