'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to upload page on load
    router.replace('/upload')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecionando...</p>
    </div>
  )
}
