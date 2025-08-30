"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import type { Influencer } from "@/shared/types/types"

interface InfluencerTableActionsProps {
  influencer: Influencer
  isAdmin: boolean
  onDeleteClick: (influencer: Influencer) => void
}

export function InfluencerTableActions({ influencer, isAdmin, onDeleteClick }: InfluencerTableActionsProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="sm" onClick={() => router.push(`/influencers/${influencer.id}`)}>
        <Eye className="h-4 w-4" />
      </Button>
      {isAdmin && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/influencers/${influencer.id}?edit=true`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick(influencer)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
