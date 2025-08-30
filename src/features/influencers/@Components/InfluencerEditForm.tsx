"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { X } from "lucide-react"
import { apiService } from "@/shared/api/api"
import { useToast } from "@/shared/hooks/use-toast"
import type { Influencer, Platform } from "@/shared/types/types"

interface InfluencerEditFormProps {
  influencer: Influencer
  onSuccess: (influencer: Influencer) => void
  onCancel: () => void
}

const platforms: { value: Platform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X (Twitter)" },
]

const countries = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "BR", label: "Brazil" },
  { value: "MX", label: "Mexico" },
  { value: "AR", label: "Argentina" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "CN", label: "China" },
  { value: "BD", label: "Bangladesh" },
  { value: "PK", label: "Pakistan" },
  { value: "ID", label: "Indonesia" },
  { value: "TH", label: "Thailand" },
  { value: "VN", label: "Vietnam" },
  { value: "PH", label: "Philippines" },
  { value: "MY", label: "Malaysia" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "UAE" },
  { value: "SA", label: "Saudi Arabia" },
]

const availableCategories = [
  "beauty",
  "fitness",
  "fashion",
  "food",
  "travel",
  "tech",
  "gaming",
  "lifestyle",
  "music",
  "art",
  "sports",
  "business",
  "education",
  "comedy",
  "dance",
  "photography",
  "diy",
  "pets",
  "parenting",
  "health",
]

export function InfluencerEditForm({ influencer, onSuccess, onCancel }: InfluencerEditFormProps) {
  const [formData, setFormData] = useState({
    name: influencer.name,
    platform: influencer.platform,
    username: influencer.username,
    followers: influencer.followers.toString(),
    engagementRate: influencer.engagementRate.toString(),
    country: influencer.country || "",
    email: influencer.email || "",
  })
  const [categories, setCategories] = useState<string[]>(influencer.categories)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.followers || Number.parseInt(formData.followers) < 0) {
      newErrors.followers = "Followers must be a positive number"
    }
    if (
      !formData.engagementRate ||
      Number.parseFloat(formData.engagementRate) < 0 ||
      Number.parseFloat(formData.engagementRate) > 100
    ) {
      newErrors.engagementRate = "Engagement rate must be between 0 and 100"
    }
    if (categories.length === 0) newErrors.categories = "At least one category is required"
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const updatedInfluencer = await apiService.influencers.update(influencer.id, {
        name: formData.name.trim(),
        platform: formData.platform,
        username: formData.username.trim(),
        followers: Number.parseInt(formData.followers),
        engagementRate: Number.parseFloat(formData.engagementRate),
        country: formData.country || undefined,
        categories,
        email: formData.email || null,
      })

      toast({
        title: "Success",
        description: "Influencer updated successfully.",
      })
      onSuccess(updatedInfluencer)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update influencer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Influencer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value as Platform })}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isSubmitting}
              />
              {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="followers">Followers *</Label>
              <Input
                id="followers"
                type="number"
                min="0"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                disabled={isSubmitting}
              />
              {errors.followers && <p className="text-sm text-destructive">{errors.followers}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="engagementRate">Engagement Rate (%) *</Label>
              <Input
                id="engagementRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.engagementRate}
                onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
                disabled={isSubmitting}
              />
              {errors.engagementRate && <p className="text-sm text-destructive">{errors.engagementRate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value === "none" ? "" : value })}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No country</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categories *</Label>
            <Select onValueChange={addCategory} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue placeholder="Add category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories
                  .filter((cat) => !categories.includes(cat))
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-1 hover:text-destructive"
                    disabled={isSubmitting}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.categories && <p className="text-sm text-destructive">{errors.categories}</p>}
          </div>

          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Influencer"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
