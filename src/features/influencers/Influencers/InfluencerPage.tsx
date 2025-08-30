"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FilterBar } from "@/features/influencers/@Components/FilterBar"
import { InfluencerTable } from "@/features/influencers/@Components/InfluencerTable"
import { InfluencerCards } from "@/features/influencers/@Components/InfluencerCards"
import { Pagination } from "@/features/influencers/@Components/Pagination"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Plus, RefreshCw, Users, TrendingUp, Globe, Star } from "lucide-react"
import { useAuth } from "@/shared/hooks/useAuth"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { apiService } from "@/shared/api/api"
import type { ListParams, ListResult, Platform } from "@/shared/types/types"
import { useMobile } from "@/shared/hooks/useMobile"
import { LoadingSpinner } from "@/shared/components/ui/loading-spinner"

export default function InfluencersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAdmin } = useAuth()
  const isMobile = useMobile()

  // Filter states
  const [platform, setPlatform] = useState<Platform | "">((searchParams.get("platform") as Platform) || "")
  const [minFollowers, setMinFollowers] = useState<string>(searchParams.get("min_followers") || "")
  const [country, setCountry] = useState<string>(searchParams.get("country") || "")
  const [category, setCategory] = useState<string>(searchParams.get("category") || "")
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "")
  const [sortField, setSortField] = useState<"followers" | "engagement_rate">(
    (searchParams.get("sort") as "followers" | "engagement_rate") || "followers",
  )
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">((searchParams.get("order") as "asc" | "desc") || "desc")
  const [page, setPage] = useState<number>(Number.parseInt(searchParams.get("page") || "1"))
  const [pageSize, setPageSize] = useState<number>(Number.parseInt(searchParams.get("pageSize") || "25"))

  // UI states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ListResult>({ data: [], page: 1, pageSize: 25, total: 0 })

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 400)

  // Update URL when filters change
  const updateURL = useMemo(() => {
    const params = new URLSearchParams()
    if (platform) params.set("platform", platform)
    if (minFollowers) params.set("min_followers", minFollowers)
    if (country) params.set("country", country)
    if (category) params.set("category", category)
    if (debouncedSearchQuery) params.set("q", debouncedSearchQuery)
    if (sortField !== "followers") params.set("sort", sortField)
    if (sortOrder !== "desc") params.set("order", sortOrder)
    if (page !== 1) params.set("page", page.toString())
    if (pageSize !== 25) params.set("pageSize", pageSize.toString())
    return params.toString()
  }, [platform, minFollowers, country, category, debouncedSearchQuery, sortField, sortOrder, page, pageSize])

  // Update URL
  useEffect(() => {
    const url = updateURL ? `/influencers?${updateURL}` : "/influencers"
    router.replace(url, { scroll: false })
  }, [updateURL, router])

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate random 3% error rate
        if (Math.random() < 0.03) {
          throw new Error("Failed to load influencers. Please try again.")
        }

        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        const params: ListParams = {
          platform: platform || undefined,
          min_followers: minFollowers ? Number.parseInt(minFollowers) : undefined,
          country: country || undefined,
          category: category || undefined,
          q: debouncedSearchQuery || undefined,
          sort: sortField,
          order: sortOrder,
          page,
          pageSize,
        }

        const data = await apiService.influencers.list(params)
        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [platform, minFollowers, country, category, debouncedSearchQuery, sortField, sortOrder, page, pageSize])

  const handleClearFilters = () => {
    setPlatform("")
    setMinFollowers("")
    setCountry("")
    setCategory("")
    setSearchQuery("")
    setSortField("followers")
    setSortOrder("desc")
    setPage(1)
    setPageSize(25)
  }

  const handleRetry = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params: ListParams = {
        platform: platform || undefined,
        min_followers: minFollowers ? Number.parseInt(minFollowers) : undefined,
        country: country || undefined,
        category: category || undefined,
        q: debouncedSearchQuery || undefined,
        sort: sortField,
        order: sortOrder,
        page,
        pageSize,
      }
      const data = await apiService.influencers.list(params)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (field: "followers" | "engagement_rate") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
    setPage(1) // Reset to first page when sorting
  }

  const stats = useMemo(() => {
    const influencers = result.data
    const totalFollowers = influencers.reduce((sum: number, inf) => sum + (typeof inf.followers === 'string' ? parseFloat(inf.followers) : inf.followers), 0)
    const avgEngagement = influencers.length > 0
      ? influencers.reduce((sum: number, inf) => sum + (typeof inf.engagementRate === 'string' ? parseFloat(inf.engagementRate) : inf.engagementRate), 0) / influencers.length
      : 0
    const uniqueCountries = new Set(influencers.map((inf) => inf.country).filter(Boolean)).size

    return {
      total: result.total,
      totalFollowers: Math.round(totalFollowers / 1000000),
      avgEngagement: Math.round(avgEngagement * 100) / 100,
      countries: uniqueCountries,
    }
  }, [result])

  return (
   
      <div className="min-h-screen bg-background flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Influencers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Active profiles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFollowers}M</div>
              <p className="text-xs text-muted-foreground">Combined followers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">Engagement rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.countries}</div>
              <p className="text-xs text-muted-foreground">Global presence</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Influencer Directory</h1>
            <p className="text-muted-foreground">
              {result.total} influencer{result.total !== 1 ? "s" : ""} found
            </p>
          </div>

          {isAdmin && (
            <Button onClick={() => router.push("/influencers/new")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Influencer
            </Button>
          )}
        </div>

        <FilterBar
          platform={platform}
          setPlatform={setPlatform}
          minFollowers={minFollowers}
          setMinFollowers={setMinFollowers}
          country={country}
          setCountry={setCountry}
          category={category}
          setCategory={setCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2 mx-auto bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : result.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No influencers found matching your criteria.</p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {isMobile ? (
              <InfluencerCards influencers={result.data} isAdmin={isAdmin} />
            ) : (
              <InfluencerTable
                influencers={result.data}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
                isAdmin={isAdmin}
              />
            )}

            <Pagination
              page={page}
              pageSize={pageSize}
              total={result.total}
              onPageChange={setPage}
              onPageSizeChange={(newSize: number) => {
                setPageSize(newSize)
                setPage(1)
              }}
            />
          </>
        )}
      </div>
 
  )
}
