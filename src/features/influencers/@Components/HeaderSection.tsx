"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import type { ListResult } from "@/shared/types/types"

interface HeaderSectionProps {
  result: ListResult
  isAdmin: boolean
}

export function HeaderSection({ result, isAdmin }: HeaderSectionProps) {
  const router = useRouter()

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
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
            <Button
              onClick={() => router.push("/influencers/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-semibold transition-all duration-200 flex items-center gap-3 min-w-fit"
            >
              <Plus className="h-5 w-5" />
              Add Influencer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
