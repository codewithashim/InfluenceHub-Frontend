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
    <TableRow className="group border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-150">
      <TableCell className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {influencer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm">{influencer.name}</div>
            <div className="text-slate-500 text-xs">ID: {influencer.id.slice(-8)}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <PlatformBadge platform={influencer.platform} />
      </TableCell>
      <TableCell className="px-6 py-4">
        <span className="font-mono text-slate-700 text-sm bg-slate-100 px-2 py-1 rounded">
          @{influencer.username}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        <span className="font-mono font-semibold text-slate-900 text-sm">
          {formatNumber(influencer.followers)}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        <span className="font-mono font-semibold text-emerald-600 text-sm">
          {formatPercent(influencer.engagementRate)}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4">
        <span className="text-slate-700 text-sm font-medium">
          {influencer.country || "—"}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4">
        <CategoriesDisplay categories={influencer.categories} />
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        <InfluencerTableActions
          influencer={influencer}
          isAdmin={isAdmin}
          onDeleteClick={onDeleteClick}
        />
      </TableCell>
    </TableRow>
  )
}
