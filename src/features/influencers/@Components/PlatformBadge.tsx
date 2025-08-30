"use client"

import { Badge } from "@/shared/components/ui/badge"

interface PlatformBadgeProps {
  platform: string
}

const platformStyles = {
  instagram: "bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium",
  tiktok: "bg-black text-white font-medium",
  youtube: "bg-red-600 text-white font-medium",
  x: "bg-slate-900 text-white font-medium",
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return (
    <Badge className={`${platformStyles[platform as keyof typeof platformStyles]} px-3 py-1 text-xs uppercase tracking-wide font-semibold`}>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </Badge>
  )
}
