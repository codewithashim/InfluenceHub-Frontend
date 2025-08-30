import { useState, useCallback } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import type { Platform } from '@/shared/types/types'

export interface FormData {
  name: string
  platform: Platform | ''
  username: string
  followers: string
  engagementRate: string
  country: string
  email: string
}

export interface FormErrors {
  [key: string]: string
}

export const useInfluencerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    platform: '',
    username: '',
    followers: '',
    engagementRate: '',
    country: '',
    email: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback((field: string, value: string) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required'
        } else {
          delete newErrors.name
        }
        break
      case 'platform':
        if (!value) {
          newErrors.platform = 'Platform is required'
        } else {
          delete newErrors.platform
        }
        break
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Username is required'
        } else {
          delete newErrors.username
        }
        break
      case 'followers':
        if (!value || Number.parseInt(value) < 0) {
          newErrors.followers = 'Followers must be a positive number'
        } else {
          delete newErrors.followers
        }
        break
      case 'engagementRate':
        const rate = Number.parseFloat(value)
        if (!value || rate < 0 || rate > 100) {
          newErrors.engagementRate = 'Engagement rate must be between 0 and 100'
        } else {
          delete newErrors.engagementRate
        }
        break
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Invalid email format'
        } else {
          delete newErrors.email
        }
        break
    }

    setErrors(newErrors)
  }, [errors])

  const debouncedValidateField = useDebounce(validateField, 300)

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      debouncedValidateField(field, value)
    }
  }, [touched, debouncedValidateField])

  const handleFieldBlur = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field as keyof FormData] as string)
  }, [formData, validateField])

  const validateForm = useCallback((categories: string[]) => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.platform) newErrors.platform = 'Platform is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.followers || Number.parseInt(formData.followers) < 0) {
      newErrors.followers = 'Followers must be a positive number'
    }
    if (!formData.engagementRate || Number.parseFloat(formData.engagementRate) < 0 || Number.parseFloat(formData.engagementRate) > 100) {
      newErrors.engagementRate = 'Engagement rate must be between 0 and 100'
    }
    if (categories.length === 0) newErrors.categories = 'At least one category is required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      platform: '',
      username: '',
      followers: '',
      engagementRate: '',
      country: '',
      email: '',
    })
    setErrors({})
    setTouched({})
  }, [])

  return {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleFieldBlur,
    validateForm,
    resetForm,
  }
}
