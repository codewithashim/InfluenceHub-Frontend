"use client"

import { Button } from "@/shared/components/ui/button"
import { RefreshCw } from "lucide-react"
import { FilterBar } from "./FilterBar"
import { InfluencerTable } from "./InfluencerTable"
import { InfluencerCards } from "./InfluencerCards"
import { Pagination } from "./Pagination"
import { LoadingSpinner } from "@/shared/components/ui/loading-spinner"
import type { UseInfluencersReturn } from "../Hook/useInfluencers"

interface ContentSectionProps extends Pick<UseInfluencersReturn,
  | 'platform'
  | 'setPlatform'
  | 'minFollowers'
  | 'setMinFollowers'
  | 'country'
  | 'setCountry'
  | 'category'
  | 'setCategory'
  | 'searchQuery'
  | 'setSearchQuery'
  | 'sortField'
  | 'sortOrder'
  | 'page'
  | 'pageSize'
  | 'setPage'
  | 'setPageSize'
  | 'isLoading'
  | 'error'
  | 'result'
  | 'handleClearFilters'
  | 'handleRetry'
  | 'handleSort'
> {
  isAdmin: boolean
  isMobile: boolean
}

export function ContentSection({
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
  sortOrder,
  page,
  pageSize,
  setPage,
  setPageSize,
  isLoading,
  error,
  result,
  handleClearFilters,
  handleRetry,
  handleSort,
  isAdmin,
  isMobile,
}: ContentSectionProps) {
  return (
    <div className="flex-1 px-6 pb-12">
      <div className=" mx-auto">
        <div className="mb-8">
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
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Something went wrong</h3>
              <p className="text-slate-600 max-w-md">{error}</p>
            </div>
            <Button
              onClick={handleRetry}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 font-medium flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : result.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No influencers found</h3>
            <p className="text-slate-600 mb-6 max-w-md">We couldn&apos;t find any influencers matching your current filters. Try adjusting your search criteria.</p>
            <Button
              onClick={handleClearFilters}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 font-medium"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white">
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
            </div>

            <div className="flex justify-center">
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
