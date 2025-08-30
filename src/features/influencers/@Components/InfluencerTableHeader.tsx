"use client"

import { TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface InfluencerTableHeaderProps {
  sortField: "followers" | "engagement_rate"
  sortOrder: "asc" | "desc"
  onSort: (field: "followers" | "engagement_rate") => void
}

export function InfluencerTableHeader({ sortField, sortOrder, onSort }: InfluencerTableHeaderProps) {
  const getSortIcon = (field: "followers" | "engagement_rate") => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-slate-400" />
    return sortOrder === "asc" ? <ArrowUp className="h-4 w-4 text-slate-600" /> : <ArrowDown className="h-4 w-4 text-slate-600" />
  }

  return (
    <TableHeader>
      <TableRow className="border-b border-slate-200 hover:bg-slate-50/50">
        <TableHead className="h-12 px-6 text-left align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Influencer
        </TableHead>
        <TableHead className="h-12 px-6 text-left align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Platform
        </TableHead>
        <TableHead className="h-12 px-6 text-left align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Username
        </TableHead>
        <TableHead className="h-12 px-6 text-right align-middle">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSort("followers")}
            className="h-auto p-0 font-semibold text-slate-900 hover:bg-slate-100 hover:text-slate-900 text-sm uppercase tracking-wider"
          >
            Followers
            <span className="ml-2">{getSortIcon("followers")}</span>
          </Button>
        </TableHead>
        <TableHead className="h-12 px-6 text-right align-middle">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSort("engagement_rate")}
            className="h-auto p-0 font-semibold text-slate-900 hover:bg-slate-100 hover:text-slate-900 text-sm uppercase tracking-wider"
          >
            Engagement
            <span className="ml-2">{getSortIcon("engagement_rate")}</span>
          </Button>
        </TableHead>
        <TableHead className="h-12 px-6 text-left align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Country
        </TableHead>
        <TableHead className="h-12 px-6 text-left align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Categories
        </TableHead>
        <TableHead className="h-12 px-6 text-right align-middle font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
