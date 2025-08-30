import { useState, useCallback } from 'react'
import { apiService } from '@/shared/api/api'
import { useToast } from '@/shared/hooks/use-toast'
import type { Influencer, Platform } from '@/shared/types/types'

interface SubmissionData {
  name: string
  platform: Platform
  username: string
  followers: number
  engagementRate: number
  country?: string
  categories: string[]
  email?: string | null
}

export const useInfluencerSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const submitInfluencer = useCallback(async (data: SubmissionData): Promise<Influencer | null> => {
    setIsSubmitting(true)
    try {
      const newInfluencer = await apiService.influencers.create({
        name: data.name.trim(),
        platform: data.platform,
        username: data.username.trim(),
        followers: data.followers,
        engagementRate: data.engagementRate,
        country: data.country || undefined,
        categories: data.categories,
        email: data.email || null,
      })

      toast({
        title: 'Success',
        description: 'Influencer created successfully.',
      })

      return newInfluencer
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create influencer.',
        variant: 'destructive',
      })
      return null
    } finally {
      setIsSubmitting(false)
    }
  }, [toast])

  return {
    isSubmitting,
    submitInfluencer,
  }
}
