"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { Platform } from "@/shared/types/types"
import { PLATFORMS, COUNTRIES, CATEGORIES } from "@/shared/lib/constants"
 

interface FilterBarProps {
  platform: Platform | ""
  setPlatform: (platform: Platform | "") => void
  minFollowers: string
  setMinFollowers: (value: string) => void
  country: string
  setCountry: (country: string) => void
  category: string
  setCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onClearFilters: () => void
}



export function FilterBar({
  platform,
  setPlatform,
  minFollowers,
  setMinFollowers,
  country,
  setCountry,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  onClearFilters,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = platform || minFollowers || country || category || searchQuery

  return (
    <div className="bg-card border rounded-lg p-4 mb-6 sticky top-0 z-10">
      <div className="flex flex-col gap-4">
        {/* Search bar - always visible */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1">
                {[platform, minFollowers, country, category].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
        </div>

        {/* Filter controls */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${!isExpanded ? "hidden sm:grid" : ""}`}
        >
          <Select value={platform} onValueChange={(value) => setPlatform(value as Platform | "")}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {PLATFORMS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min followers"
            value={minFollowers}
            onChange={(e) => setMinFollowers(e.target.value)}
            min="0"
          />

          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value} >
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="hidden sm:flex lg:col-span-1 xl:col-span-1">
            {hasActiveFilters && (
              <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
