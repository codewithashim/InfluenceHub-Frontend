"use client"
import HomePage from '@/features/home/homepage/HomePage'
import { useAuth } from '@/shared/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function HomeWrapper() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return <HomePage />
}

export default function Page() {
  return <HomeWrapper />
}
