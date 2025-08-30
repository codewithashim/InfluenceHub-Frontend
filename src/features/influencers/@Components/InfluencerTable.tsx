"use client"

import { useState } from "react"
import { Table, TableBody } from "@/shared/components/ui/table"
import { DeleteDialog } from "./DeleteDialog"
import { InfluencerTableHeader, InfluencerTableRow } from "."
import { apiService } from "@/shared/api/api"
import { useToast } from "@/shared/hooks/use-toast"
import type { Influencer } from "@/shared/types/types"

interface InfluencerTableProps {
  influencers: Influencer[]
  sortField: "followers" | "engagement_rate"
  sortOrder: "asc" | "desc"
  onSort: (field: "followers" | "engagement_rate") => void
  isAdmin: boolean
}

export function InfluencerTable({ influencers, sortField, sortOrder, onSort, isAdmin }: InfluencerTableProps) {
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
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <InfluencerTableHeader
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <TableBody>
            {influencers.map((influencer) => (
              <InfluencerTableRow
                key={influencer.id}
                influencer={influencer}
                isAdmin={isAdmin}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </TableBody>
        </Table>
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
