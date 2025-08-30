"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import {
  User,
  Hash,
  Users,
  TrendingUp,
  MapPin,
  Mail,
  Tag,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { apiService } from "@/shared/api/api"
import { useToast } from "@/shared/hooks/use-toast"
import type { Influencer, Platform } from "@/shared/types/types"
import { PLATFORMS, COUNTRIES, CATEGORIES } from "@/shared/lib/constants"

interface InfluencerCreateFormProps {
  onSuccess: (influencer: Influencer) => void
  onCancel: () => void
}

export function InfluencerCreateForm({ onSuccess, onCancel }: InfluencerCreateFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    platform: "" as Platform | "",
    username: "",
    followers: "",
    engagementRate: "",
    country: "",
    email: "",
  })
  const [categories, setCategories] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required"
        } else {
          delete newErrors.name
        }
        break
      case "platform":
        if (!value) {
          newErrors.platform = "Platform is required"
        } else {
          delete newErrors.platform
        }
        break
      case "username":
        if (!value.trim()) {
          newErrors.username = "Username is required"
        } else {
          delete newErrors.username
        }
        break
      case "followers":
        if (!value || Number.parseInt(value) < 0) {
          newErrors.followers = "Followers must be a positive number"
        } else {
          delete newErrors.followers
        }
        break
      case "engagementRate":
        const rate = Number.parseFloat(value)
        if (!value || rate < 0 || rate > 100) {
          newErrors.engagementRate = "Engagement rate must be between 0 and 100"
        } else {
          delete newErrors.engagementRate
        }
        break
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email format"
        } else {
          delete newErrors.email
        }
        break
    }

    setErrors(newErrors)
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    validateField(field, formData[field as keyof typeof formData] as string)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.platform) newErrors.platform = "Platform is required"
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
      const newInfluencer = await apiService.influencers.create({
        name: formData.name.trim(),
        platform: formData.platform as Platform,
        username: formData.username.trim(),
        followers: Number.parseInt(formData.followers),
        engagementRate: Number.parseFloat(formData.engagementRate),
        country: formData.country || undefined,
        categories,
        email: formData.email || null,
      })

      toast({
        title: "Success",
        description: "Influencer created successfully.",
      })
      onSuccess(newInfluencer)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create influencer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
      // Clear categories error when adding
      if (errors.categories) {
        setErrors({ ...errors, categories: "" })
      }
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
    // Add error if no categories left
    if (categories.length === 1) {
      setErrors({ ...errors, categories: "At least one category is required" })
    }
  }

  return (
    <div className="mx-auto">
      <Card className=" border-0 bg-gradient-to-br from-white to-gray-50/50 p-6">
      
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Name *
                    {formData.name && !errors.name && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    onBlur={() => handleFieldBlur("name")}
                    disabled={isSubmitting}
                    placeholder="Enter full name"
                    className={`h-11 ${formData.name && !errors.name ? 'border-green-500 focus:border-green-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform" className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4" />
                    Platform *
                    {formData.platform && !errors.platform && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => {
                      handleFieldChange("platform", value)
                      setFormData({ ...formData, platform: value as Platform })
                    }}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={`h-11 ${formData.platform && !errors.platform ? 'border-green-500 focus:border-green-500' : ''}`}>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.platform && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.platform}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4" />
                    Username *
                    {formData.username && !errors.username && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleFieldChange("username", e.target.value)}
                    onBlur={() => handleFieldBlur("username")}
                    disabled={isSubmitting}
                    placeholder="@username"
                    className={`h-11 ${formData.username && !errors.username ? 'border-green-500 focus:border-green-500' : ''}`}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followers" className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    Followers *
                    {formData.followers && !errors.followers && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    min="0"
                    value={formData.followers}
                    onChange={(e) => handleFieldChange("followers", e.target.value)}
                    onBlur={() => handleFieldBlur("followers")}
                    disabled={isSubmitting}
                    placeholder="0"
                    className={`h-11 ${formData.followers && !errors.followers ? 'border-green-500 focus:border-green-500' : ''}`}
                  />
                  {errors.followers && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.followers}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engagement_rate" className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    Engagement Rate (%) *
                    {formData.engagementRate && !errors.engagementRate && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="engagement_rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.engagementRate}
                    onChange={(e) => handleFieldChange("engagementRate", e.target.value)}
                    onBlur={() => handleFieldBlur("engagementRate")}
                    disabled={isSubmitting}
                    placeholder="0.00"
                    className={`h-11 ${formData.engagementRate && !errors.engagementRate ? 'border-green-500 focus:border-green-500' : ''}`}
                  />
                  {errors.engagementRate && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.engagementRate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value === "none" ? "" : value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No country</SelectItem>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email
                    {formData.email && !errors.email && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={() => handleFieldBlur("email")}
                    disabled={isSubmitting}
                    placeholder="influencer@example.com"
                    className={`h-11 ${formData.email && !errors.email ? 'border-green-500 focus:border-green-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Categories Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Categories</h3>
                  {categories.length > 0 && !errors.categories && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Add Categories *</Label>
                  <Select onValueChange={addCategory} disabled={isSubmitting}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a category to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES
                        .filter((cat) => !categories.includes(cat))
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {categories.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-secondary/80 transition-colors"
                        >
                          <Tag className="h-3 w-3" />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                          <button
                            type="button"
                            onClick={() => removeCategory(category)}
                            className="ml-1 hover:text-destructive transition-colors"
                            disabled={isSubmitting}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {errors.categories && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.categories}
                  </p>
                )}
              </div>
            </div>

            {/* Error Alert */}
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive" className="border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  Please fix the errors above before submitting.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 text-base font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Influencer...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Influencer
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1 h-12 text-base font-medium"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
