import type React from 'react'
import { Tag, X, AlertCircle } from 'lucide-react'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Badge } from '@/shared/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { CATEGORIES } from '@/shared/lib/constants'

interface CategoriesSectionProps {
  categories: string[]
  onAddCategory: (category: string) => void
  onRemoveCategory: (category: string) => void
  error?: string
  disabled: boolean
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onAddCategory,
  onRemoveCategory,
  error,
  disabled,
}) => {
  const hasCategories = categories.length > 0
  const isValid = hasCategories && !error

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Categories</h3>
        {isValid && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Add Categories *</Label>
          <Select onValueChange={onAddCategory} disabled={disabled}>
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

        {hasCategories && (
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
                    onClick={() => onRemoveCategory(category)}
                    className="ml-1 hover:text-destructive transition-colors"
                    disabled={disabled}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
