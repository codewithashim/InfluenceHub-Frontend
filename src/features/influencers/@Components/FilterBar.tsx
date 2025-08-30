"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
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
    <div className="bg-white p-6 mb-8">
      <div className="space-y-6">
        {/* Search bar - always visible */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 text-base bg-slate-50 focus:bg-white transition-colors"
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                {[platform, minFollowers, country, category].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-slate-600 hover:text-slate-900">
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Filter controls */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${!isExpanded ? "hidden sm:grid" : ""}`}
        >
          <Select value={platform} onValueChange={(value) => setPlatform(value as Platform | "")}>
            <SelectTrigger className="bg-slate-50 hover:bg-white transition-colors h-12">
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
            className="bg-slate-50 hover:bg-white transition-colors h-12"
          />

          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="bg-slate-50 hover:bg-white transition-colors h-12">
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
            <SelectTrigger className="bg-slate-50 hover:bg-white transition-colors h-12">
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
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full bg-slate-50 hover:bg-white transition-colors h-12"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
