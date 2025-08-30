"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { apiService } from "@/shared/api/api"
import type { ListParams, ListResult, Platform } from "@/shared/types/types"

export interface UseInfluencersReturn {
  // Filter states
  platform: Platform | ""
  setPlatform: (value: Platform | "") => void
  minFollowers: string
  setMinFollowers: (value: string) => void
  country: string
  setCountry: (value: string) => void
  category: string
  setCategory: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  sortField: "followers" | "engagement_rate"
  setSortField: (value: "followers" | "engagement_rate") => void
  sortOrder: "asc" | "desc"
  setSortOrder: (value: "asc" | "desc") => void
  page: number
  setPage: (value: number) => void
  pageSize: number
  setPageSize: (value: number) => void

  // UI states
  isLoading: boolean
  error: string | null
  result: ListResult

  // Handlers
  handleClearFilters: () => void
  handleRetry: () => void
  handleSort: (field: "followers" | "engagement_rate") => void
}

export function useInfluencers(): UseInfluencersReturn {
  const router = useRouter()
  const searchParams = useSearchParams()

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

  return {
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
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    pageSize,
    setPageSize,
    isLoading,
    error,
    result,
    handleClearFilters,
    handleRetry,
    handleSort,
  }
}
