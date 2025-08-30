"use client"

import { TableCell, TableRow } from "@/shared/components/ui/table"
import { formatNumber, formatPercent } from "@/shared/lib/format"
import { PlatformBadge } from "./PlatformBadge"
import { CategoriesDisplay } from "./CategoriesDisplay"
import { InfluencerTableActions } from "./InfluencerTableActions"
import type { Influencer } from "@/shared/types/types"

interface InfluencerTableRowProps {
  influencer: Influencer
  isAdmin: boolean
  onDeleteClick: (influencer: Influencer) => void
}

export function InfluencerTableRow({ influencer, isAdmin, onDeleteClick }: InfluencerTableRowProps) {
  return (
    <TableRow key={influencer.id}>
      <TableCell className="font-medium">{influencer.name}</TableCell>
      <TableCell>
        <PlatformBadge platform={influencer.platform} />
      </TableCell>
      <TableCell className="font-mono text-sm">@{influencer.username}</TableCell>
      <TableCell className="text-right font-mono">{formatNumber(influencer.followers)}</TableCell>
      <TableCell className="text-right font-mono">{formatPercent(influencer.engagementRate)}</TableCell>
      <TableCell>{influencer.country || "—"}</TableCell>
      <TableCell>
        <CategoriesDisplay categories={influencer.categories} />
      </TableCell>
      <TableCell className="text-right">
        <InfluencerTableActions
          influencer={influencer}
          isAdmin={isAdmin}
          onDeleteClick={onDeleteClick}
        />
      </TableCell>
    </TableRow>
  )
}
