"use client"

import { Button } from "@/shared/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (total === 0) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {total} results
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number.parseInt(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getVisiblePages().map((pageNum, index) => (
            <Button
              key={index}
              variant={pageNum === page ? "default" : "outline"}
              size="sm"
              onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
              disabled={pageNum === "..."}
              className="min-w-[40px]"
            >
              {pageNum}
            </Button>
          ))}

          <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
