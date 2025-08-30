"use client"

import { useRouter } from "next/navigation"
import { InfluencerCreateForm } from "@/features/influencers/CreateInfluencer/InfluencerCreateForm"
import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Influencer } from "@/shared/types/types"

export default function NewInfluencerPage() {
  const router = useRouter()

  const handleSuccess = (influencer: Influencer) => {
    router.push(`/influencers/${influencer.id}`)
  }

  const handleCancel = () => {
    router.push("/influencers")
  }

  return (
    <section className="min-h-screen bg-background flex flex-col">
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleCancel} className="flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Button>
          <h1 className="text-2xl font-bold">Add New Influencer</h1>
          <p className="text-muted-foreground">Create a new influencer profile in the directory.</p>
        </div>

        <InfluencerCreateForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </main>
    </section>
  )
}
