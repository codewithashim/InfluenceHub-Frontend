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
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Platform</TableHead>
        <TableHead>Username</TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSort("followers")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Followers
            {getSortIcon("followers")}
          </Button>
        </TableHead>
        <TableHead className="text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSort("engagement_rate")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Engagement
            {getSortIcon("engagement_rate")}
          </Button>
        </TableHead>
        <TableHead>Country</TableHead>
        <TableHead>Categories</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
