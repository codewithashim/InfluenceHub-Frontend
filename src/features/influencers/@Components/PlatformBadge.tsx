"use client"

import { Badge } from "@/shared/components/ui/badge"

interface PlatformBadgeProps {
  platform: string
}

const platformColors = {
  instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  tiktok: "bg-black text-white dark:bg-gray-800 dark:text-gray-200",
  youtube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  x: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return (
    <Badge className={platformColors[platform as keyof typeof platformColors]}>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </Badge>
  )
}
