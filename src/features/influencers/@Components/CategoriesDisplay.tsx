"use client"

import { Badge } from "@/shared/components/ui/badge"

interface CategoriesDisplayProps {
  categories: string[]
}

export function CategoriesDisplay({ categories }: CategoriesDisplayProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.slice(0, 2).map((cat) => (
        <Badge key={cat} variant="outline" className="text-xs">
          {cat}
        </Badge>
      ))}
      {categories.length > 2 && (
        <Badge variant="outline" className="text-xs">
          +{categories.length - 2}
        </Badge>
      )}
    </div>
  )
}
