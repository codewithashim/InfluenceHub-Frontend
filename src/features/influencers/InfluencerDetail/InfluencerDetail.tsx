"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Edit, Users, TrendingUp, MapPin, Mail, Calendar, ExternalLink } from "lucide-react"
import { formatNumber, formatPercent, formatDateTime } from "@/shared/lib/format"
import type { Influencer } from "@/shared/types/types"

interface InfluencerDetailProps {
  influencer: Influencer
  isAdmin: boolean
  onEdit: () => void
}

const platformColors = {
  instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  tiktok: "bg-black text-white dark:bg-gray-800 dark:text-gray-200",
  youtube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  x: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

const platformUrls = {
  instagram: (username: string) => `https://instagram.com/${username}`,
  tiktok: (username: string) => `https://tiktok.com/@${username}`,
  youtube: (username: string) => `https://youtube.com/@${username}`,
  x: (username: string) => `https://x.com/${username}`,
}

export function InfluencerDetail({ influencer, isAdmin, onEdit }: InfluencerDetailProps) {
  const platformUrl = platformUrls[influencer.platform](influencer.username)

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{influencer.name}</CardTitle>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={platformColors[influencer.platform]}>
                  {influencer.platform.charAt(0).toUpperCase() + influencer.platform.slice(1)}
                </Badge>
                <a
                  href={platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-mono"
                >
                  @{influencer.username}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {influencer.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {influencer.country}
                  </div>
                )}
                {influencer.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${influencer.email}`} className="hover:text-foreground">
                      {influencer.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (
              <Button onClick={onEdit} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {influencer.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-2xl font-bold font-mono">{formatNumber(influencer.followers)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold font-mono">{formatPercent(influencer.engagementRate)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span>{formatDateTime(influencer.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span>{formatDateTime(influencer.updatedAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
