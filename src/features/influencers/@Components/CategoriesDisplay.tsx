"use client"

import { Badge } from "@/shared/components/ui/badge"

interface CategoriesDisplayProps {
  categories: string[]
}

const categoryColors = [
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-rose-50 text-rose-700 border-rose-200",
]

export function CategoriesDisplay({ categories }: CategoriesDisplayProps) {
  if (!categories || categories.length === 0) {
    return <span className="text-slate-400 text-sm">—</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {categories.slice(0, 2).map((cat, index) => (
        <Badge
          key={cat}
          className={`${categoryColors[index % categoryColors.length]} border text-xs font-medium px-2 py-1`}
        >
          {cat}
        </Badge>
      ))}
      {categories.length > 2 && (
        <Badge className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium px-2 py-1">
          +{categories.length - 2}
        </Badge>
      )}
    </div>
  )
}
