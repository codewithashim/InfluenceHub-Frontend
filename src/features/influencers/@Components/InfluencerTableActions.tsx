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
    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/influencers/${influencer.id}`)}
        className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </Button>
      {isAdmin && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/influencers/${influencer.id}?edit=true`)}
            className="h-8 w-8 p-0 text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
            title="Edit Influencer"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick(influencer)}
            className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            title="Delete Influencer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
