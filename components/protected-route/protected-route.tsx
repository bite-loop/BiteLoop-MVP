import { useAuthStore } from "@/lib/stores/authStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/reset-password']

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Destructure primitives/stable refs only — avoids re-subscribing on every render
  const user = useAuthStore(s => s.user)
  const isLoading = useAuthStore(s => s.isLoading)
  const fetchProfile = useAuthStore(s => s.fetchProfile)

  const [isChecking, setIsChecking] = useState(true)
  const hasFetchedRef = useRef(false)

  // Fetch once on mount — empty dep array, use ref to guard
  useEffect(() => {
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    fetchProfile().finally(() => setIsChecking(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle redirects only after auth check is complete
  useEffect(() => {
    if (isChecking || isLoading) return

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if (!user && !isPublicRoute) {
      router.replace('/login')
      return
    }

    if (user && (pathname === '/login' || pathname === '/signup')) {
      router.replace('/')
    }
  }, [isChecking, isLoading, user, pathname, router])

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0300]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-white mt-4 text-sm">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return null
  }

  return <>{children}</>
}