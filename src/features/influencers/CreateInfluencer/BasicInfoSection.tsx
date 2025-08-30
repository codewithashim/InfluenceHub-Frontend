import type React from 'react'
import { User, Hash, Users, TrendingUp, MapPin, Mail } from 'lucide-react'
import { FormField } from './FormField'
import { PLATFORMS, COUNTRIES } from '@/shared/lib/constants'
import type { Platform } from '@/shared/types/types'

interface BasicInfoSectionProps {
  formData: {
    name: string
    platform: Platform | ''
    username: string
    followers: string
    engagementRate: string
    country: string
    email: string
  }
  errors: Record<string, string>
  onFieldChange: (field: string, value: string) => void
  onFieldBlur: (field: string) => void
  disabled: boolean
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  errors,
  onFieldChange,
  onFieldBlur,
  disabled,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Basic Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="name"
          label="Name"
          value={formData.name}
          onChange={(value) => onFieldChange('name', value)}
          onBlur={() => onFieldBlur('name')}
          error={errors.name}
          required
          placeholder="Enter full name"
          disabled={disabled}
          icon={<User className="h-4 w-4" />}
        />

        <FormField
          id="platform"
          label="Platform"
          value={formData.platform}
          onChange={(value) => onFieldChange('platform', value)}
          onBlur={() => onFieldBlur('platform')}
          error={errors.platform}
          required
          placeholder="Select platform"
          disabled={disabled}
          icon={<Hash className="h-4 w-4" />}
          options={PLATFORMS.map(p => ({ value: p.value, label: p.label }))}
        />

        <FormField
          id="username"
          label="Username"
          value={formData.username}
          onChange={(value) => onFieldChange('username', value)}
          onBlur={() => onFieldBlur('username')}
          error={errors.username}
          required
          placeholder="@username"
          disabled={disabled}
          icon={<Hash className="h-4 w-4" />}
        />

        <FormField
          id="followers"
          label="Followers"
          value={formData.followers}
          onChange={(value) => onFieldChange('followers', value)}
          onBlur={() => onFieldBlur('followers')}
          error={errors.followers}
          required
          type="number"
          min="0"
          placeholder="0"
          disabled={disabled}
          icon={<Users className="h-4 w-4" />}
        />

        <FormField
          id="engagementRate"
          label="Engagement Rate (%)"
          value={formData.engagementRate}
          onChange={(value) => onFieldChange('engagementRate', value)}
          onBlur={() => onFieldBlur('engagementRate')}
          error={errors.engagementRate}
          required
          type="number"
          min="0"
          max="100"
          step="0.01"
          placeholder="0.00"
          disabled={disabled}
          icon={<TrendingUp className="h-4 w-4" />}
        />

        <FormField
          id="country"
          label="Country"
          value={formData.country}
          onChange={(value) => onFieldChange('country', value === 'none' ? '' : value)}
          onBlur={() => onFieldBlur('country')}
          placeholder="Select country"
          disabled={disabled}
          icon={<MapPin className="h-4 w-4" />}
          options={[
            { value: 'none', label: 'No country' },
            ...COUNTRIES.map(c => ({ value: c.value, label: c.label }))
          ]}
        />

        <div className="md:col-span-2">
          <FormField
            id="email"
            label="Email"
            value={formData.email}
            onChange={(value) => onFieldChange('email', value)}
            onBlur={() => onFieldBlur('email')}
            error={errors.email}
            type="email"
            placeholder="influencer@example.com"
            disabled={disabled}
            icon={<Mail className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  )
}
