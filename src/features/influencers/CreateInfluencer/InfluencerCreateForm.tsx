"use client"

import type React from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useInfluencerForm } from "../Hook/useInfluencerForm"
import { useCategories } from "../Hook/useCategories"
import { useInfluencerSubmission } from "../Hook/useInfluencerSubmission"
import { BasicInfoSection } from "./BasicInfoSection"
import { CategoriesSection } from "./CategoriesSection"
import type { Influencer, Platform } from "@/shared/types/types"

interface InfluencerCreateFormProps {
  onSuccess: (influencer: Influencer) => void
  onCancel: () => void
}

export function InfluencerCreateForm({ onSuccess, onCancel }: InfluencerCreateFormProps) {
  const { formData, errors, handleFieldChange, handleFieldBlur, validateForm, resetForm } = useInfluencerForm()
  const { categories, error: categoriesError, addCategory, removeCategory } = useCategories()
  const { isSubmitting, submitInfluencer } = useInfluencerSubmission()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm(categories) || !categories.length) return

    const result = await submitInfluencer({
      name: formData.name.trim(),
      platform: formData.platform as Platform,
      username: formData.username.trim(),
      followers: Number.parseInt(formData.followers),
      engagementRate: Number.parseFloat(formData.engagementRate),
      country: formData.country || undefined,
      categories,
      email: formData.email || null,
    })

    if (result) {
      resetForm()
      onSuccess(result)
    }
  }

  return (
    <div className="mx-auto">
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 p-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <BasicInfoSection
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleFieldBlur}
              disabled={isSubmitting}
            />

            <CategoriesSection
              categories={categories}
              onAddCategory={addCategory}
              onRemoveCategory={removeCategory}
              error={categoriesError}
              disabled={isSubmitting}
            />

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
