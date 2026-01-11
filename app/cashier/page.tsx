"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CashierDashboard from "@/components/cashier-dashboard"

export default function CashierPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Loading cashier dashboard...</p>
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <CashierDashboard
      onStartSale={() => console.log("Callback: Start Sale")}
      onCheckInventory={() => console.log("Callback: Check Inventory")}
      onViewMySales={() => console.log("Callback: View My Sales")}
      onLogout={handleLogout}
    />
  )
}
