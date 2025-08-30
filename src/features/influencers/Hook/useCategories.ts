import { useState, useCallback } from 'react'

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const addCategory = useCallback((category: string) => {
    setCategories(prev => {
      if (!prev.includes(category)) {
        const newCategories = [...prev, category]
        if (error) setError('')
        return newCategories
      }
      return prev
    })
  }, [error])

  const removeCategory = useCallback((category: string) => {
    setCategories(prev => {
      const newCategories = prev.filter(c => c !== category)
      if (newCategories.length === 0) {
        setError('At least one category is required')
      }
      return newCategories
    })
  }, [])

  const clearCategories = useCallback(() => {
    setCategories([])
    setError('')
  }, [])

  const validateCategories = useCallback(() => {
    if (categories.length === 0) {
      setError('At least one category is required')
      return false
    }
    setError('')
    return true
  }, [categories.length])

  return {
    categories,
    error,
    addCategory,
    removeCategory,
    clearCategories,
    validateCategories,
  }
}
