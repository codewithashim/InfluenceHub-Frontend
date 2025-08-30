"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { InfluencerDetail } from "@/features/influencers/InfluencerDetail/InfluencerDetail"
import { InfluencerEditForm } from "@/features/influencers/@Components/InfluencerEditForm"
import { LoadingSpinner } from "@/shared/components/ui/loading-spinner"
import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/shared/hooks/useAuth"
import { apiService } from "@/shared/api/api"
import type { Influencer } from "@/shared/types/types"

interface InfluencerPageProps {
  params: { id: string }
}

export default function InfluencerPage({ params }: InfluencerPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAdmin } = useAuth()
  const [influencer, setInfluencer] = useState<Influencer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "true")

  useEffect(() => {
    const fetchInfluencer = async () => {
      setIsLoading(true)
      try {
        const data = await apiService.influencers.get(params.id)
        setInfluencer(data)
      } catch (error) {
        console.error("Failed to fetch influencer:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInfluencer()
  }, [params.id])

  const handleEditSuccess = (updatedInfluencer: Influencer) => {
    setInfluencer(updatedInfluencer)
    setIsEditing(false)
    router.replace(`/influencers/${params.id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
  
        <main className="container mx-auto px-4 py-6 flex-1">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </main>
      </div>
    )
  }

  if (!influencer) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        
        <main className="container mx-auto px-4 py-6 flex-1">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Influencer Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The influencer you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => router.push("/influencers")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/influencers")}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Button>
        </div>

        {isEditing && isAdmin ? (
          <InfluencerEditForm
            influencer={influencer}
            onSuccess={handleEditSuccess}
            onCancel={() => {
              setIsEditing(false)
              router.replace(`/influencers/${params.id}`)
            }}
          />
        ) : (
          <InfluencerDetail influencer={influencer} isAdmin={isAdmin} onEdit={() => setIsEditing(true)} />
        )}
      </main>
    </div>
  )
}
