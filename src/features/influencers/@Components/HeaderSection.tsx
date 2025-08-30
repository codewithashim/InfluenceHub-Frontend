"use client"

import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Button } from "@/shared/components/ui/button"
import { Plus, Upload } from "lucide-react"
import type { ListResult } from "@/shared/types/types"
import { influencersApiService, ImportInfluencersRequest } from "@/shared/api/influencersApi"
import { useToast } from "@/shared/hooks/use-toast"

interface HeaderSectionProps {
  result: ListResult
  isAdmin: boolean
}

export function HeaderSection({ result, isAdmin }: HeaderSectionProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)
  const { toast } = useToast()

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV or Excel file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)
    try {
      const importOptions: ImportInfluencersRequest = {
        mode: 'upsert' // Default to upsert mode
      }

      const result = await influencersApiService.import(file, importOptions)

      toast({
        title: "Import completed",
        description: `Processed ${result.totalProcessed} records. Created: ${result.created}, Updated: ${result.updated}`,
      })

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An error occurred during import.",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              Influencer Directory
            </h1>
            <p className="text-slate-600 text-xl font-medium max-w-2xl">
              Discover and manage {result.total.toLocaleString()} influencer{result.total !== 1 ? "s" : ""} in our network
            </p>
          </div>

          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                onClick={handleImportClick}
                disabled={isImporting}
                variant="outline"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-300 px-8 py-4 text-base font-semibold transition-all duration-200 flex items-center gap-3 min-w-fit"
              >
                <Upload className="h-5 w-5" />
                {isImporting ? "Importing..." : "Import CSV/Excel"}
              </Button>
              <Button
                onClick={() => router.push("/influencers/new")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-semibold transition-all duration-200 flex items-center gap-3 min-w-fit"
              >
                <Plus className="h-5 w-5" />
                Add Influencer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
