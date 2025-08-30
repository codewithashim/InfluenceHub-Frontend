"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  influencerName: string
  isDeleting?: boolean
}

export function DeleteDialog({ open, onOpenChange, onConfirm, influencerName, isDeleting = false }: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Influencer</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{influencerName}</strong>? This action cannot be undone and will
            permanently remove the influencer from the directory.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
