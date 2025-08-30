"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { DeleteDialog } from "./DeleteDialog"
import { Eye, Edit, Trash2, Users, TrendingUp, MapPin } from "lucide-react"
import { formatNumber, formatPercent } from "@/shared/lib/format"
import { apiService } from "@/shared/api/api"
import { useToast } from "@/shared/hooks/use-toast"
import type { Influencer } from "@/shared/types/types"

interface InfluencerCardsProps {
  influencers: Influencer[]
  isAdmin: boolean
}

const platformColors = {
  instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  tiktok: "bg-black text-white dark:bg-gray-800 dark:text-gray-200",
  youtube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  x: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

export function InfluencerCards({ influencers, isAdmin }: InfluencerCardsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    influencer: Influencer | null
    isDeleting: boolean
  }>({
    open: false,
    influencer: null,
    isDeleting: false,
  })

  const handleDeleteClick = (influencer: Influencer) => {
    setDeleteDialog({ open: true, influencer, isDeleting: false })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.influencer) return

    setDeleteDialog((prev) => ({ ...prev, isDeleting: true }))

    try {
      await apiService.influencers.delete(deleteDialog.influencer.id)
      toast({
        title: "Success",
        description: `${deleteDialog.influencer.name} has been deleted.`,
      })
      // Force page refresh to update the list
      window.location.reload()
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: "Error",
        description: "Failed to delete influencer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialog({ open: false, influencer: null, isDeleting: false })
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {influencers.map((influencer) => (
          <Card key={influencer.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{influencer.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">@{influencer.username}</p>
                </div>
                <Badge className={platformColors[influencer.platform]}>
                  {influencer.platform.charAt(0).toUpperCase() + influencer.platform.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{formatNumber(influencer.followers)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{formatPercent(influencer.engagementRate)}</span>
                </div>
              </div>

              {influencer.country && (
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{influencer.country}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {influencer.categories.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/influencers/${influencer.id}`)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                {isAdmin && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/influencers/${influencer.id}?edit=true`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(influencer)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open: boolean) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        influencerName={deleteDialog.influencer?.name || ""}
        isDeleting={deleteDialog.isDeleting}
      />
    </>
  )
}
