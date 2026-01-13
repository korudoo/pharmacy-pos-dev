"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (status === "unauthenticated") {
      router.push("/")
      return
    }

    // Redirect non-admin users to unauthorized
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/unauthorized")
    }
  }, [status, session, router])

  // Show loading state while checking authentication and role
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F5F5]">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  // If not authenticated or not admin, don't render children
  if (!session || session.user?.role !== "admin") {
    return null
  }

  // User is authenticated and has admin role
  return <>{children}</>
}
